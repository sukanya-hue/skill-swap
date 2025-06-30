import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onToggleMode: () => void;
}

export default function RegisterForm({ onToggleMode }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    console.log('Registration attempt:', { email, username, fullName });

    try {
      await signUp(email, password, username, fullName);
      setSuccess('Account created successfully! You can now sign in.');
      console.log('Registration successful');
      
      // Clear form
      setEmail('');
      setPassword('');
      setUsername('');
      setFullName('');
      
      // Auto-switch to login after 2 seconds
      setTimeout(() => {
        onToggleMode();
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      let errorMessage = 'Failed to create account';
      
      if (err instanceof Error) {
        if (err.message.includes('already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (err.message.includes('Username is already taken')) {
          errorMessage = 'This username is already taken. Please choose a different one.';
        } else if (err.message.includes('Password should be at least')) {
          errorMessage = 'Password must be at least 6 characters long.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="username"
            pattern="[a-z0-9_]+"
            title="Username can only contain lowercase letters, numbers, and underscores"
          />
          <p className="text-xs text-gray-500 mt-1">Only lowercase letters, numbers, and underscores allowed</p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength={6}
            autoComplete="new-password"
          />
          <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters long</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={onToggleMode}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}