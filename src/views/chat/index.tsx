import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useAppSelector } from '../../application/store';
import { RoomResponse } from '../../models';
import roomService from '../../services/api/roomService';
import ChatArea from './chatArea';
import AllRoomAreas from './roomArea';

interface ChatProps extends RouteComponentProps {}

const Chat: React.FC<ChatProps> = ({ history }) => {
  const { loading, errors, user } = useAppSelector((state) => state.login);
  const [selectedRoom, setSelectedRoom] = useState<RoomResponse>();
  return (
    <div className="w-screen h-screen bg-[#131324] flex justify-center items-center">
      <div className="w-4/5 h-4/5 bg-[#00000076] grid grid-cols-12 gap-3 relative">
        <div className="col-span-3 md:col-span-4">
          <AllRoomAreas selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
        </div>
        <div className="col-span-9 md:col-span-8">
          <ChatArea selectedRoom={selectedRoom} />
        </div>
        <div className="absolute bottom-0.5 left-0.5">
          <div
            className="bg-red-400 px-2 py-1 cursor-pointer rounded shadow "
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
