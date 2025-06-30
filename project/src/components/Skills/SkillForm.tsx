import React, { useState } from 'react';
import { SkillFormData } from '../../types';

interface SkillFormProps {
  onSubmit: (data: SkillFormData) => Promise<void>;
  initialData?: Partial<SkillFormData>;
  submitLabel?: string;
}

const categories = [
  'Programming',
  'Design',
  'Marketing',
  'Writing',
  'Music',
  'Languages',
  'Cooking',
  'Photography',
  'Fitness',
  'Business',
  'Other'
];

export default function SkillForm({ onSubmit, initialData, submitLabel = 'Add Skill' }: SkillFormProps) {
  const [formData, setFormData] = useState<SkillFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    skillType: initialData?.skillType || 'offer',
    level: initialData?.level || 'beginner',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      if (!initialData) {
        // Reset form only if it's a new skill
        setFormData({
          title: '',
          description: '',
          category: '',
          skillType: 'offer',
          level: 'beginner',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof SkillFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {initialData ? 'Edit Skill' : 'Add New Skill'}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Skill Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="e.g., React Development, Guitar Lessons, Spanish Tutoring"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your skill, experience level, what you can teach or what you want to learn..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="skillType" className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <select
              id="skillType"
              value={formData.skillType}
              onChange={(e) => handleChange('skillType', e.target.value as 'offer' | 'want')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="offer">I can teach this</option>
              <option value="want">I want to learn this</option>
            </select>
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
              Level *
            </label>
            <select
              id="level"
              value={formData.level}
              onChange={(e) => handleChange('level', e.target.value as 'beginner' | 'intermediate' | 'advanced')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium"
        >
          {loading ? 'Saving...' : submitLabel}
        </button>
      </form>
    </div>
  );
}