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