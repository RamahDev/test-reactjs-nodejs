export interface TwitchProfile {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email: string;
  created_at: string;
}

export interface PayloadUser {
  accessToken: string;
  refreshToken: string;
  profile: {
    id: number;
    realId: number;
    username: string;
    displayName: string;
    email: string;
    profileImage: string;
  }
}

export interface PayloadJwt {
  realId: number;
  email: string;
}
