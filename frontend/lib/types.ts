export interface Post {
  id: number;
  title: string;
  content: string;
  tags: Tag[];
  author: {
    id: string;
    name: string;
  };
  status: boolean;
  likeCount: number;
  createdAt: string;
  likeByMe: boolean;
  commentCount: number;
}

export interface Comment {
  id: number;
  content: string;
  author: {
    id: string;
    name: string;
  };
  likeCount: number;
  likeByMe: boolean;
  createdAt: string;
}

export interface Tag {
  id: number;
  name: string;
}