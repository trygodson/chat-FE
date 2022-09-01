import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import {
  AllMessageResponse,
  CreateMessageInputModel,
  GetMessageInputModel,
  RoomResponse,
} from '../../../models';
import messageService from '../../../services/api/messageService';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../../../shared/config/endpoints';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useAppSelector } from '../../../application/store';
import { EVENTS } from '../../../shared/utils/socketevents';

interface ChatAreaProps {
  selectedRoom: RoomResponse | undefined;
}
const ChatArea: React.FC<ChatAreaProps> = ({ selectedRoom }) => {
  const { user } = useAppSelector((state) => state.login);
  const scrollRef = useRef<any>();
  let socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const [messages, setMessages] = useState<AllMessageResponse>();
  const [newmessage, setNewmessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { mutateAsync: GetAllMessages, isLoading } = messageService.useGetAllMessageService();
  const { mutateAsync: SendAMessage, isLoading: SendAMessageLoading } =
    messageService.useAddMessageService();

  const randomcolor = () => {
    const colors = [
      'text-blue-600, text-cyan-800, text-red-600',
      'text-orange-700',
      'text-cyan-800',
    ];
    return colors[Math.floor(Math.random() * 5)];
  };

  useEffect(() => {
    socket.current = io(BASE_URL);
    socket.current.emit('room', selectedRoom?._id);
  }, [selectedRoom]);
  useEffect(() => {
    (async function () {
      let room = { toroom: selectedRoom?._id } as GetMessageInputModel;
      const res = await GetAllMessages(room);
      setMessages(res);
    })();
  }, [selectedRoom]);
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage(msg);
      });
    }
  }, [socket.current]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => (prev ? [...prev, arrivalMessage] : [arrivalMessage]));
  }, [arrivalMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      message: newmessage,
      toroom: selectedRoom?._id,
    } as CreateMessageInputModel;
    const res = await SendAMessage(payload);

    if (res.message === 'sent') {
      socket.current!.emit('send-msg', {
        to: selectedRoom?._id,
        messages: newmessage,
      });
      const msgs = [...messages!];
      msgs.push({ message: { text: newmessage }, sender: { username: user.username } });
      setMessages(msgs);
      setNewmessage('');
    }
  };

  return (
    <div className="w-full h-full px-4 py-1">
      {!selectedRoom ? (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className="font-bold text-orange-500 text-xl">Hey No Chat Selected</div>
          <p className="font-italic text-white ">Please Select a Chat</p>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full justify-between items-center">
          <div className="h-5/6 w-full pt-3 pb-2 overflow-y-scroll">
            {messages && (
              <div>
                {messages.map((message, i) => {
                  return (
                    <div
                      ref={scrollRef}
                      className={`w-full flex ${
                        message.sender.username === user.username && 'justify-end'
                      }`}
                    >
                      <div className="flex bg-slate-100 my-1 rounded pl-2 pr-1 w-1/2" key={i}>
                        <span className={`mr-2 ${randomcolor()}`}>{message.sender.username}</span>
                        <span>{message.message.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="h-1/6 w-full ">
            <form className="flex w-full " onSubmit={handleSubmit}>
              <input
                type={'text'}
                value={newmessage}
                onChange={(e) => setNewmessage(e.target.value)}
                className="w-4/5"
                placeholder="Typing Message"
              />
              <button type="submit" className="text-sm bg-blue-500 px-2 py-1 w-1/5">
                {SendAMessageLoading ? 'Sending' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;