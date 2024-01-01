import { User } from "./Auth";

export interface Comment {
  commentText: string;
  userId: User;
  postId: string;
  createdAt: string;
  _id: string;
}
export interface CommentItemProps {
  _id: string;
  username: string;
  commentText: string;
  createdAt: string;
  avatar: string;
}
export interface CreateCommentProps {
  setComment: (comment: string) => void;
  comment: string;
  onCreateComment: () => void;
}

export interface CommentProps {
  _id: string;
}
export interface CommentPaginationProps {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  totalPages: number;
}
