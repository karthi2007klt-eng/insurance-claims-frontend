import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/token/', { username, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };




return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-6">Log in to manage your insurance claims</p>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-sm mb-4">
            {error}
          </p>
        )}

        <label className="block text-gray-700 text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;