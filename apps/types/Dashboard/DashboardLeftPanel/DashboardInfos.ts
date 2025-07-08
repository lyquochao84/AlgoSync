export interface Follower {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface UserInfo {
  name: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  team: string | null;
  followersCount: number;
  followingsCount: number;
  followersList: Follower[];
  followingsList: Follower[];
  level: number;
  xp: number;
}