import React from 'react';
import Layout from '../components/Layout/Layout';
import ProfileForm from '../components/Profile/ProfileForm';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, MapPin, Calendar } from 'lucide-react';

export default function Profile() {
  const { user, profile } = useAuth();

  if (!user || !profile) {
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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start space-x-6">
            <div className="bg-blue-100 rounded-full p-4">
              <User className="h-16 w-16 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profile.full_name || profile.username}
              </h1>
              <p className="text-gray-600 mb-4">@{profile.username}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                
                {profile.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              {profile.bio && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600">{profile.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <ProfileForm />
      </div>
    </Layout>
  );
}