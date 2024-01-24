import { User } from "./Auth";
import {Dispatch, SetStateAction} from "react";

export interface Conv {
  _id: string;
  members: string[];
}

export interface ConversationProps {
  conversation: Conv;
  currentUser?: User | null;
}
export interface ConversationItemProps {
  conversation: Conv[];
  setCurrentChat: Dispatch<SetStateAction<Conv | undefined>>
  currentUser?: User | null
}
