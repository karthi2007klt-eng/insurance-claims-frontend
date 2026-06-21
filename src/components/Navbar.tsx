import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const linkClass = (path: string) =>
    `text-sm font-medium ${
      location.pathname === path
        ? 'text-blue-700 font-semibold'
        : 'text-gray-600 hover:text-blue-600'
    } transition`;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <h2 className="text-lg font-bold text-blue-700">Insurance Claims</h2>
        <div className="flex gap-6">
          <Link to="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
          <Link to="/policies" className={linkClass('/policies')}>Policies</Link>
          <Link to="/claims" className={linkClass('/claims')}>Claims</Link>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="text-sm font-medium text-gray-600 hover:text-red-600 transition"
      >
        Log Out
      </button>
    </div>
  );
}

export default Navbar;