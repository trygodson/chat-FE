import React, { useState, useEffect } from 'react';
import { RoomResponse } from '../../../models';

interface SingleRoomProps {
  room: RoomResponse;
  selectedRoom: RoomResponse | undefined;
  setSelectedRoom: Function;
}
const SingleRoom: React.FC<SingleRoomProps> = ({ room, selectedRoom, setSelectedRoom }) => {
  return (
    <div
      className={`w-full h-14 bg-slate-300 my-2 rounded px-2  overflow-hidden ${
        selectedRoom?._id == room._id && 'border-2 border-orange-400'
      }`}
      onClick={() => setSelectedRoom(room)}
    >
      <div className="flex">
        <div className="font-bold mr-2">Room Name</div>
        <div>{room.name}</div>
      </div>
      <div className="flex">
        <p className="font-bold mr-2">Users</p>
        {room?.users?.map((user) => (
          <span className="mx-1 " key={user._id}>
            {user.username}
          </span>
        ))}
      </div>
    </div>
  );
};

export { SingleRoom };
