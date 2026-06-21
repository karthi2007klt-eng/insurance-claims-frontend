import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [policyCount, setPolicyCount] = useState<number | null>(null);
  const [claimCount, setClaimCount] = useState<number | null>(null);
  const [activeClaimCount, setActiveClaimCount] = useState<number | null>(null);

  useEffect(() => {
    api
      .get('/claims/policies/')
      .then((res) => setPolicyCount(res.data.count))
      .catch(() => setPolicyCount(0));

    api
      .get('/claims/claims/')
      .then((res) => {
        setClaimCount(res.data.count);
        const active = res.data.results.filter(
          (c: { status: string }) => c.status !== 'APPROVED' && c.status !== 'REJECTED'
        ).length;
        setActiveClaimCount(active);
      })
      .catch(() => {
        setClaimCount(0);
        setActiveClaimCount(0);
      });
  }, []);

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="px-6 py-10 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-8">
            Here's a quick overview of your policies and claims.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">Policies</p>
              <p className="mt-3 text-3xl font-semibold text-gray-900">{policyCount ?? '—'}</p>
            </div>
            <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">Total claims</p>
              <p className="mt-3 text-3xl font-semibold text-gray-900">{claimCount ?? '—'}</p>
            </div>
            <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">Active claims</p>
              <p className="mt-3 text-3xl font-semibold text-gray-900">{activeClaimCount ?? '—'}</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;

