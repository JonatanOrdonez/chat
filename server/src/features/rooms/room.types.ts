export interface Creator {
  userName: string;
  email: string;
}

export interface Room {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
}

export interface RoomWithCreator {
  id: string;
  name: string;
  created_at: string;
  created_by: Creator;
}

export interface Message {
  id: string;
  content: string;
  room_id: string;
  created_by: string;
  created_at: string;
}

export interface MessageWithCreator {
  id: string;
  content: string;
  room_id: string;
  created_at: string;
  created_by: Creator;
}
