import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useSocket } from '../../../application/context/socketContext';
import { CreateRoomInputModel } from '../../../models';
import { useAllUserService } from '../../../services/api/authService';
import roomService from '../../../services/api/roomService';
import { DModal } from '../../../shared/components';
import { EVENTS } from '../../../shared/utils/socketevents';

interface AddRoomProps {
  modalOpen: boolean;
  setModalOpen: Function;
  setRooms: Function;
}
interface Options {
  label: string;
  value: string;
}
const AddRoom: React.FC<AddRoomProps> = ({ modalOpen, setModalOpen, setRooms }) => {
  const { socket } = useSocket();
  const [options, setOptions] = useState<Options[]>();
  const [name, setName] = useState('');
  const [optionChange, setOptionChange] = useState<string[] | undefined>();
  const { mutateAsync: GetAllUsers } = useAllUserService();
  const { mutateAsync: CreateRoom, isLoading } = roomService.useCreateRoomService();
  useEffect(() => {
    (async function () {
      const res = await GetAllUsers();
      res.map((item) => {
        setOptions((prev) =>
          prev
            ? [...prev, { label: item.username, value: item._id }]
            : [{ label: item.username, value: item._id }],
        );
      });
    })();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let values = {
      name,
      users: optionChange,
    } as CreateRoomInputModel;
    const res = await CreateRoom(values);
    if (res) {
      socket?.emit(EVENTS.CLIENT.CREATE_ROOM, { createdRoom: res });
      setModalOpen(false);
      setRooms((prev: []) => (prev ? [...prev] : [...prev]));
    }
  };
  return (
    <DModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <form className="flex flex-col w-80 h-80 justify-center items-center" onSubmit={onSubmit}>
        <div className="mb-3 font-semibold text-sm">Create a Room</div>
        <input
          type={'text'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Room Name"
          className="my-2"
        />
        <Select
          options={options}
          onChange={(val) => {
            const rr = val.map((item) => {
              return item.value;
            });
            console.log(rr);
          }}
          isSearchable
          placeholder="Search Users"
          isMulti
        />
        <button type="submit" className="px-2 py-1 bg-blue-300 hover:bg-blue-600 mt-3">
          {isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </DModal>
  );
};

export default AddRoom;
