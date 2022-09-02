import { useMutation } from 'react-query';
import { AuthResponse, CreateRoomInputModel, GetAllRoomResponse, RoomResponse } from '../../models';
import { ApiEndpoints } from '../../shared/config/endpoints';
import api from '../../shared/utils/api';

async function CreateRoom(value: CreateRoomInputModel) {
  const response = (await api.post({
    url: `${ApiEndpoints.CREATE_ROOM}`,
    variables: value,
  })) as RoomResponse;

  return response;
}
async function GetAllRoom() {
  const response = (await api.get({
    url: `${ApiEndpoints.GETALL_ROOM}`,
  })) as GetAllRoomResponse;

  return response;
}

export default {
  // useLoginService: (args: UseMutationOptions) => useMutation(Login),
  useCreateRoomService: () => useMutation(CreateRoom),
  useGetAllRoomService: () => useMutation(GetAllRoom),
};
