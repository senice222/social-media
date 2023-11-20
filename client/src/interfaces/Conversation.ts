import { User } from "./Auth.ts";

export interface Conv {
  _id: string;
  members: string[];
}

export interface ConversationProps {
  conversation: Conv;
  currentUser: User | null;
}
