// Post Types
export type PostType = "text" | "photo" | "video" | "poll" | "code";

export interface Post {
  id: string;
  user: {
    avatar: string;
    username: string;
  };
  time: string;
  type: PostType;
  text?: string;
  photos?: string[];
  video?: PostVideoData;
  poll?: PostPollData;
  code?: string;
}

// Video
export interface PostVideoData {
  thumbnail: string;
  title: string;
  source: string;
  link: string;
}

// Poll
export interface PollOption {
  option: string;
  votes: number;
}

export interface PostPollData {
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOption?: string;
}

// Layout Props
export interface PostHeaderProps {
  user: {
    avatar: string;
    username: string;
  };
  time: string;
}

export interface PostFooterProps {
  postId: string;
}

// Post Type Component Props
export interface PostTextProps {
  text: string;
  expanded: boolean;
  onExpand: () => void;
}

export interface PostPhotoProps {
  photos: string[];
}

export interface PostVideoProps {
  video: PostVideoData;
}

export interface PostPollProps {
  poll: PostPollData;
}

export interface PostCodeProps {
  code: string;
}

// Item and Feed Props
export interface PostProps {
  post: Post;
}

export interface DashboardPostContentProps {
  posts: Post[];
  refreshKey: number;
}
