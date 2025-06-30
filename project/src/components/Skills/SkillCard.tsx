import React from 'react';
import { Skill } from '../../types';
import { User, MapPin, Calendar } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getSkillTypeColor = (type: string) => {
    return type === 'offer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-yellow-100 text-yellow-800';
      case 'intermediate':
        return 'bg-orange-100 text-orange-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{skill.title}</h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillTypeColor(skill.skill_type)}`}>
            {skill.skill_type === 'offer' ? 'Offering' : 'Seeking'}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
            {skill.level}
          </span>
        </div>
      </div>

      {skill.description && (
        <p className="text-gray-600 mb-4">{skill.description}</p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{skill.profiles?.username || 'Anonymous'}</span>
          </div>
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
            {skill.category}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(skill.created_at)}</span>
        </div>
      </div>
    </div>
  );
}