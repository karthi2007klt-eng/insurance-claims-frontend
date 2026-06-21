import Navbar from '../components/Navbar';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to your Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your policies and claims here
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


