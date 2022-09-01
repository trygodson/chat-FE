import { useMutation } from 'react-query';
import {
  AllMessageResponse,
  CreateMessageInputModel,
  GetAllRoomResponse,
  GetMessageInputModel,
  MessageResponse,
} from '../../models';
import { ApiEndpoints } from '../../shared/config/endpoints';
import api from '../../shared/utils/api';

async function AddMessage(value: CreateMessageInputModel) {
  const response = (await api.post({
    url: `${ApiEndpoints.ADD_MESSAGE}`,
    variables: value,
  })) as any;

  return response;
}
async function GetAllMessages(value: GetMessageInputModel) {
  const response = (await api.post({
    url: `${ApiEndpoints.GET_MESSAGE}`,
    variables: value,
  })) as AllMessageResponse;

  return response;
}

export default {
  // useLoginService: (args: UseMutationOptions) => useMutation(Login),
  useAddMessageService: () => useMutation(AddMessage),
  useGetAllMessageService: () => useMutation(GetAllMessages),
};
