export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
}

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  skill_type: 'offer' | 'want';
  level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export interface SkillFormData {
  title: string;
  description: string;
  category: string;
  skillType: 'offer' | 'want';
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}