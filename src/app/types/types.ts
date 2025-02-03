export type User = {
  nickname: string;
}

export type DataReactionProps = {
  id: number;
  userId: number;
  postId: number;
  type: string;
  createdAt: Date;
  user: User;
}

export type DataCommentProps = {
  id: number;
  userId: number;
  postId: number;
  message: string;
  createdAt: Date;
  user: User;
}