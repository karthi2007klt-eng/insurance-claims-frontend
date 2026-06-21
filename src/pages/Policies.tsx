import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

interface Policy {
  id: number;
  policy_number: string;
  policy_type: string;
  coverage_amount: string;
  premium_amount: string;
  start_date: string;
  end_date: string;
  status: string;
}

function Policies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/claims/policies/')
      .then((response) => {
        setPolicies(response.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load policies.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Policies</h1>

        {loading && <p className="text-gray-500">Loading policies...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && policies.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-gray-500">
            No policies to show yet.
          </div>
        )}

        {!loading && policies.length > 0 && (
          <div className="space-y-4">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {policy.policy_number} — {policy.policy_type}
                  </h2>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-700">
                    {policy.status}
                  </span>
                </div>
                <div className="flex gap-6 text-sm text-gray-600 mt-3">
                  <span>Coverage: ₹{policy.coverage_amount}</span>
                  <span>Premium: ₹{policy.premium_amount}</span>
                  <span>
                    Valid: {policy.start_date} → {policy.end_date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Policies;