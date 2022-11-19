export type message = {
  id: number;
  fileName: string;
  receiverId: number;
  senderId: number;
  sentTime: Date;
};

export type loginAttempt = {
  attempt_id: number;
  time_of_attempt: Date;
  user_id: number;
};

export type user = {
  id: number;
  login: string;
  password: string;
  salt: string;
  publicKey: string;
  privateKey: string;
  receivedMessages: message[];
  sentMessages: message[];
  userLoginAttempts: loginAttempt[];
};
