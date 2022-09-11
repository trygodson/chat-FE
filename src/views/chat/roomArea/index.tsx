import { resolve } from 'path/posix';
import React, { useState, useEffect } from 'react';
import { useSocket } from '../../../application/context/socketContext';
import { GetAllRoomResponse, RoomResponse } from '../../../models';
import roomService from '../../../services/api/roomService';
import { DModal, SingleRoom } from '../../../shared/components';
import { GET_STORAGE_ITEM } from '../../../shared/utils/storage';
import AddRoom from '../addRoom';

interface AllRoomAreasProps {
  // selectedRoom: RoomResponse | undefined;
  // rooms: GetAllRoomResponse | undefined;
  // allRoomLoading: boolean;
  // setSelectedRoom: Function;
  // setRooms: Function;
}
const AllRoomAreas: React.FC<AllRoomAreasProps> = ({}) => {
  const [modalopen, setModalopen] = useState(false);
  const { selectedRoom, setSelectedRoom, rooms, setRooms } = useSocket();

  const {
    mutateAsync: GetAllRoomservice,
    isLoading: AllRoomLoading,
    isSuccess,
  } = roomService.useGetAllRoomService();
  async function getall() {
    const res = await GetAllRoomservice();
    setRooms(res);
  }
  useEffect(() => {
    getall();
  }, []);
  return (
    <>
      <div className={`w-full h-full px-3 py-5 ${'flex justify-center items-center'}`}>
        {AllRoomLoading ? (
          <div>
            <div className="text-gray-600 font-bold text-lg bg-slate-50 px-5 py-3">Loading</div>
          </div>
        ) : rooms?.length! > 0 ? (
          <div className="w-full h-5/5 overflow-y-scroll">
            <div className="w-full h-12 mb-2 flex justify-end">
              <div
                className="bg-cyan-600 cursor-pointer rounded px-2 py-1 text-xs flex justify-center items-center"
                onClick={() => setModalopen(!modalopen)}
              >
                Create More Room
              </div>
            </div>
            {rooms!.map((room) => {
              return (
                <SingleRoom
                  key={room._id}
                  room={room}
                  setSelectedRoom={setSelectedRoom}
                  selectedRoom={selectedRoom}
                />
              );
            })}
          </div>
        ) : (
          <div>
            <button
              className="bg-cyan-600 px-3 py-5 rounded"
              onClick={() => setModalopen(!modalopen)}
            >
              Create Room
            </button>
          </div>
        )}
      </div>
      <AddRoom modalOpen={modalopen} setModalOpen={setModalopen} setRooms={setRooms} />
    </>
  );
};

export default AllRoomAreas;
