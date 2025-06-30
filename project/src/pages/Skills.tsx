import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout/Layout';
import SkillCard from '../components/Skills/SkillCard';
import SkillFilters from '../components/Skills/SkillFilters';
import { useSkills } from '../hooks/useSkills';
import { Search } from 'lucide-react';

export default function Skills() {
  const { skills, loading } = useSkills();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(skills.map(skill => skill.category))];
    return uniqueCategories.sort();
  }, [skills]);

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || skill.category === selectedCategory;
      const matchesType = !selectedType || skill.skill_type === selectedType;
      const matchesLevel = !selectedLevel || skill.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesType && matchesLevel;
    });
  }, [skills, searchTerm, selectedCategory, selectedType, selectedLevel]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Browse Skills</h1>
          <p className="text-gray-600 mt-2 md:mt-0">
            {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search skills, descriptions, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <SkillFilters
          categories={categories}
          selectedCategory={selectedCategory}
          selectedType={selectedType}
          selectedLevel={selectedLevel}
          onCategoryChange={setSelectedCategory}
          onTypeChange={setSelectedType}
          onLevelChange={setSelectedLevel}
        />

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more skills.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}