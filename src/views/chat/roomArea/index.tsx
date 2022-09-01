import { resolve } from 'path/posix';
import React, { useState, useEffect } from 'react';
import { GetAllRoomResponse, RoomResponse } from '../../../models';
import roomService from '../../../services/api/roomService';
import { DModal, SingleRoom } from '../../../shared/components';
import { GET_STORAGE_ITEM } from '../../../shared/utils/storage';
import AddRoom from '../addRoom';

interface AllRoomAreasProps {
  selectedRoom: RoomResponse | undefined;
  setSelectedRoom: Function;
}
const AllRoomAreas: React.FC<AllRoomAreasProps> = ({ selectedRoom, setSelectedRoom }) => {
  const [rooms, setRooms] = useState<GetAllRoomResponse>([]);
  const [modalopen, setModalopen] = useState(false);
  const { mutateAsync: GetAllRoomservice, isLoading } = roomService.useGetAllRoomService();
  useEffect(() => {
    (async function () {
      const res = await GetAllRoomservice();
      setRooms(res);
    })();
  }, []);

  return (
    <>
      <div className={`w-full h-full px-3 py-5 ${'flex justify-center items-center'}`}>
        {isLoading ? (
          <div>
            <div className="text-gray-600 font-bold text-lg bg-slate-50 px-5 py-3">Loading</div>
          </div>
        ) : rooms?.length > 0 ? (
          <div className="w-full h-full">
            <div className="w-full h-12 mb-2 flex justify-end">
              <div
                className="bg-cyan-600 cursor-pointer rounded px-2 py-1 text-xs flex justify-center items-center"
                onClick={() => setModalopen(!modalopen)}
              >
                Create More Room
              </div>
            </div>
            {rooms.map((room) => {
              return (
                <SingleRoom
                  room={room}
                  key={room._id}
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
