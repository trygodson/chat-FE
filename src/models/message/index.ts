export interface CreateMessageInputModel {
  message: string;
  toroom: string;
}
export interface GetMessageInputModel {
  toroom: string;
}

export type AllMessageResponse = MessageResponse[];

export interface MessageResponse {
  message: Message;
  sender: Sender;
}

export interface Message {
  text: string;
}

export interface Sender {
  username: string;
}
