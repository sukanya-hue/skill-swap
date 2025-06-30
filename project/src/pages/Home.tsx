import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import { Users, ArrowRight, Star, Shield, Zap } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <Users className="h-12 w-12 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">SkillSwap</h1>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                Exchange Skills, Build Connections, Grow Together
              </h2>
              <p className="text-xl text-gray-600">
                Connect with people who want to learn what you know, and learn from those who have the skills you want to develop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <Star className="h-6 w-6 text-yellow-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Share Your Expertise</h3>
                  <p className="text-sm text-gray-600">Teach others what you're passionate about</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Learn New Skills</h3>
                  <p className="text-sm text-gray-600">Discover and master new abilities</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Safe Community</h3>
                  <p className="text-sm text-gray-600">Connect in a trusted environment</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-blue-600">
              <span className="font-medium">Ready to start your skill journey?</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>

          {/* Auth Forms */}
          <div className="w-full max-w-md mx-auto">
            {isLogin ? (
              <LoginForm onToggleMode={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onToggleMode={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}