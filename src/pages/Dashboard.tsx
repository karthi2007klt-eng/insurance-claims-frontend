import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white mb-6">
        Welcome to your Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Log Out
      </button>
    </div>
  );
}

export default Dashboard;