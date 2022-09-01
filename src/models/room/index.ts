export interface CreateRoomInputModel {
  name: string;
  users: string[];
}

export type GetAllRoomResponse = RoomResponse[];

export interface RoomResponse {
  _id: string;
  name: string;
  userId: string;
  users: User[];
}

export interface User {
  _id: string;
  username: string;
  permission: string[];
  email: string;
}
