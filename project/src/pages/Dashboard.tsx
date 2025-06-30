import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSkills } from '../hooks/useSkills';
import Layout from '../components/Layout/Layout';
import SkillCard from '../components/Skills/SkillCard';
import { Plus, BookOpen, Users, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { skills, loading } = useSkills();

  const userSkills = skills.filter(skill => skill.user_id === user?.id);
  const offeredSkills = userSkills.filter(skill => skill.skill_type === 'offer');
  const wantedSkills = userSkills.filter(skill => skill.skill_type === 'want');

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
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.fullName || user?.username}!
          </h1>
          <p className="text-gray-600 mb-6">
            Manage your skills and discover new learning opportunities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{offeredSkills.length}</p>
                  <p className="text-sm text-gray-600">Skills Offered</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{wantedSkills.length}</p>
                  <p className="text-sm text-gray-600">Skills Wanted</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">{skills.length}</p>
                  <p className="text-sm text-gray-600">Total Skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/add-skill"
            className="bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <Plus className="h-8 w-8 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-xl font-semibold">Add New Skill</h3>
                <p className="text-blue-100">Share your expertise or find something to learn</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/skills"
            className="bg-green-600 text-white rounded-lg p-6 hover:bg-green-700 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-xl font-semibold">Browse Skills</h3>
                <p className="text-green-100">Discover skills from the community</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Your Skills */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Skills</h2>
          
          {userSkills.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills yet</h3>
              <p className="text-gray-600 mb-4">
                Start by adding a skill you can teach or something you want to learn.
              </p>
              <Link
                to="/add-skill"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Your First Skill</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}