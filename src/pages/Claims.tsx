import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

interface Claim {
  id: number;
  claim_number: string;
  title: string;
  description: string;
  incident_date: string;
  amount_claimed: string;
  amount_approved: string;
  status: string;
  date_filed: string;
}

function Claims() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/claims/claims/')
      .then((response) => {
        setClaims(response.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load claims.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Claims</h1>

        {loading && <p className="text-gray-500">Loading claims...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && claims.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-gray-500">
            No claims to show yet.
          </div>
        )}

        {!loading && claims.length > 0 && (
          <div className="space-y-4">
            {claims.map((claim) => (
              <Link
                to={`/claims/${claim.id}`}
                key={claim.id}
                className="block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {claim.claim_number} — {claim.title}
                  </h2>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                    {claim.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-3">{claim.description}</p>
                <div className="flex gap-6 text-sm text-gray-600">
                  <span>Incident: {claim.incident_date}</span>
                  <span>Claimed: ₹{claim.amount_claimed}</span>
                  <span>Approved: ₹{claim.amount_approved}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



export default Claims;