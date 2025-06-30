import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import SkillForm from '../components/Skills/SkillForm';
import { useSkills } from '../hooks/useSkills';
import { SkillFormData } from '../types';

export default function AddSkill() {
  const navigate = useNavigate();
  const { addSkill } = useSkills();

  const handleSubmit = async (data: SkillFormData) => {
    await addSkill(data);
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <SkillForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}