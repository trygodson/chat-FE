export const BASE_URL = 'https://chatter-be.herokuapp.com';
// export const BASE_URL = 'http://localhost:5050';

export const ApiEndpoints = {
  //Auth
  LOGIN: `/api/auth/login`,
  REGISTER: `/api/auth/register`,
  ALL_USERS: `/api/auth/allusers`,

  //Room
  CREATE_ROOM: `/api/room/createroom`,
  GETALL_ROOM: `/api/room/getrooms`,

  //Messages
  ADD_MESSAGE: `/api/message/addmessage`,
  GET_MESSAGE: `/api/message/getmessage`,
};
