export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          bio: string | null
          location: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          bio?: string | null
          location?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          bio?: string | null
          location?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string
          skill_type: 'offer' | 'want'
          level: 'beginner' | 'intermediate' | 'advanced'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category: string
          skill_type: 'offer' | 'want'
          level?: 'beginner' | 'intermediate' | 'advanced'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string
          skill_type?: 'offer' | 'want'
          level?: 'beginner' | 'intermediate' | 'advanced'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}