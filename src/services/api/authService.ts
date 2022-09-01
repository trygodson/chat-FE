import { useMutation } from 'react-query';
import { AuthResponse, LoginModel, RegisterModel } from '../../models';
import { ApiEndpoints } from '../../shared/config/endpoints';
import api from '../../shared/utils/api';

interface TempUsers {
  username: string;
  _id: string;
}

export async function LoginService(value: LoginModel) {
  const response = (await api.post({
    url: `${ApiEndpoints.LOGIN}`,
    variables: value,
  })) as AuthResponse;

  return response;
}
export async function RegisterService(value: RegisterModel) {
  const response = (await api.post({
    url: `${ApiEndpoints.REGISTER}`,
    variables: value,
  })) as AuthResponse;

  return response;
}
export async function GetAllUsers() {
  const response = (await api.get({
    url: `${ApiEndpoints.ALL_USERS}`,
  })) as TempUsers[];

  return response;
}

export const useAllUserService = () => useMutation(GetAllUsers);
// export default {
//   useLoginService: () => useMutation(Login),
//   // useLoginService: (args: UseMutationOptions) => useMutation(Login),
// };
