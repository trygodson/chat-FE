import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { GetAllRoomResponse, RoomResponse } from '../../models';
import { BASE_URL } from '../../shared/config/endpoints';
import { EVENTS } from '../../shared/utils/socketevents';

interface ContextProps {
  socket?: Socket;
  selectedRoom: RoomResponse | undefined;
  setSelectedRoom: Function;
  rooms: GetAllRoomResponse | undefined;
  setRooms: Function;
}

const socket = io(BASE_URL);

const SocketContext = createContext<ContextProps>({
  socket,
  selectedRoom: undefined,
  setSelectedRoom: () => null,
  rooms: [],
  setRooms: () => null,
});

const SocketProvider: React.FC = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomResponse>();
  const [rooms, setRooms] = useState<GetAllRoomResponse>([]);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms((prev) => (prev ? [...prev, value] : [value]));
  });
  return (
    <SocketContext.Provider value={{ socket, selectedRoom, setSelectedRoom, rooms, setRooms }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
