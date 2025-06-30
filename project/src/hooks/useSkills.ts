import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Skill, SkillFormData } from '../types';
import { useAuth } from '../contexts/AuthContext';

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('skills')
        .select(`
          *,
          profiles (
            username,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSkills(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (skillData: SkillFormData) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .insert({
          user_id: user.id,
          title: skillData.title,
          description: skillData.description,
          category: skillData.category,
          skill_type: skillData.skillType,
          level: skillData.level,
        })
        .select(`
          *,
          profiles (
            username,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) {
        throw error;
      }

      setSkills(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add skill');
    }
  };

  const updateSkill = async (id: string, skillData: Partial<SkillFormData>) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .update({
          title: skillData.title,
          description: skillData.description,
          category: skillData.category,
          skill_type: skillData.skillType,
          level: skillData.level,
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select(`
          *,
          profiles (
            username,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) {
        throw error;
      }

      setSkills(prev => prev.map(skill => skill.id === id ? data : skill));
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update skill');
    }
  };

  const deleteSkill = async (id: string) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setSkills(prev => prev.filter(skill => skill.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete skill');
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    skills,
    loading,
    error,
    addSkill,
    updateSkill,
    deleteSkill,
    refetch: fetchSkills,
  };
}