import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  last_updated: string;
  policy: number;
  claimant: number;
  assigned_adjuster: number;
}

function ClaimDetail() {
  const { id } = useParams();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/claims/claims/${id}/`)
      .then((response) => {
        setClaim(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load claim details.');
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-6 py-10 max-w-2xl mx-auto">
        <Link to="/claims" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Claims
        </Link>

        {loading && <p className="text-gray-500">Loading claim...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {claim && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mt-2">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {claim.claim_number} — {claim.title}
              </h1>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                {claim.status}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{claim.description}</p>

            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-gray-400">Incident Date</p>
                <p className="text-gray-800 font-medium">{claim.incident_date}</p>
              </div>
              <div>
                <p className="text-gray-400">Date Filed</p>
                <p className="text-gray-800 font-medium">
                  {new Date(claim.date_filed).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Amount Claimed</p>
                <p className="text-gray-800 font-medium">₹{claim.amount_claimed}</p>
              </div>
              <div>
                <p className="text-gray-400">Amount Approved</p>
                <p className="text-gray-800 font-medium">₹{claim.amount_approved}</p>
              </div>
              <div>
                <p className="text-gray-400">Last Updated</p>
                <p className="text-gray-800 font-medium">
                  {new Date(claim.last_updated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClaimDetail;