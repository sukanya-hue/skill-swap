import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, Profile, AuthContextType } from '../types';
import { User as SupabaseUser, Session, AuthError, AuthChangeEvent } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: Setting up auth listener...');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }: { data: { session: Session | null }, error: AuthError | null }) => {
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }
      
      if (session?.user) {
        console.log('AuthProvider: Found existing session');
        handleAuthUser(session.user);
      } else {
        console.log('AuthProvider: No existing session');
        setLoading(false);
      }
    }).catch((error: unknown) => {
      console.error('Error in getSession:', error);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('AuthProvider: Auth state changed:', event);
        if (session?.user) {
          await handleAuthUser(session.user);
        } else {
          setUser(null);
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      console.log('AuthProvider: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthUser = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('AuthProvider: Handling auth user:', supabaseUser.id);
      
      // Get or create profile
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        throw error;
      }

      if (profileData) {
        console.log('AuthProvider: Profile found');
        setProfile(profileData);
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          username: profileData.username,
          fullName: profileData.full_name || '',
          bio: profileData.bio || '',
          location: profileData.location || '',
          avatarUrl: profileData.avatar_url || '',
        });
      } else {
        console.log('AuthProvider: No profile found');
      }
    } catch (error: unknown) {
      console.error('Error handling auth user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('AuthProvider: Signing in...');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string, fullName: string) => {
    console.log('AuthProvider: Signing up...');
    
    // Check if username is already taken
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingProfile) {
      throw new Error('Username is already taken');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Sign up error:', error);
      throw error;
    }

    if (data.user) {
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          username,
          full_name: fullName,
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }
    }
  };

  const signOut = async () => {
    console.log('AuthProvider: Signing out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };

  console.log('AuthProvider: Rendering with loading:', loading, 'user:', !!user);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}