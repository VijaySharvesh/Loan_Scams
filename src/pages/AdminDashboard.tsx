import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Users, Activity, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminStats {
  totalLenders: number;
  totalScams: number;
  pendingReports: number;
  activeUsers: number;
}

interface Lender {
  id: string;
  name: string;
  rbi_number: string;
  image_url: string;
  approval_date: string;
  status: 'pending' | 'verified' | 'rejected';
}

interface ScamReport {
  id: string;
  lender_name: string;
  warning_type: string;
  status: 'pending' | 'approved' | 'rejected';
  report_count: number;
}

export function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const [stats] = useState<AdminStats>({
    totalLenders: 10,
    totalScams: 5,
    pendingReports: 3,
    activeUsers: 100,
  });
  const [lenders] = useState<Lender[]>([
    {
      id: '1',
      name: 'Example Bank',
      rbi_number: 'RBI123',
      image_url: 'https://example.com/bank.jpg',
      approval_date: '2024-02-15',
      status: 'pending'
    }
  ]);
  const [scamReports] = useState<ScamReport[]>([
    {
      id: '1',
      lender_name: 'Scam Bank',
      warning_type: 'Unauthorized Operations',
      status: 'pending',
      report_count: 5
    }
  ]);
  const [isAddingLender, setIsAddingLender] = useState(false);
  const [newLender, setNewLender] = useState({
    name: '',
    rbi_number: '',
    image_url: '',
    approval_date: '',
  });

  const addLender = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation would go here
    setIsAddingLender(false);
    setNewLender({ name: '', rbi_number: '', image_url: '', approval_date: '' });
  };

  const updateLenderStatus = (id: string, status: 'verified' | 'rejected') => {
    // Implementation would go here
    console.log('Updating lender status:', id, status);
  };

  const updateScamReportStatus = (id: string, status: 'approved' | 'rejected') => {
    // Implementation would go here
    console.log('Updating scam report status:', id, status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage lenders, reports, and system data</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Total Lenders</h3>
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalLenders}</p>
            <p className="text-sm text-gray-500 mt-2">Verified institutions</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Reported Scams</h3>
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalScams}</p>
            <p className="text-sm text-gray-500 mt-2">Identified fraudulent entities</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Pending Reports</h3>
              <Activity className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.pendingReports}</p>
            <p className="text-sm text-gray-500 mt-2">Awaiting review</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
            <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
          </div>
        </div>

        {/* Lender Management */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Lender Management</h3>
            <button
              onClick={() => setIsAddingLender(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Lender
            </button>
          </div>

          {isAddingLender && (
            <form onSubmit={addLender} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <input
                  type="text"
                  placeholder="Lender Name"
                  value={newLender.name}
                  onChange={(e) => setNewLender({ ...newLender, name: e.target.value })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="RBI Number"
                  value={newLender.rbi_number}
                  onChange={(e) => setNewLender({ ...newLender, rbi_number: e.target.value })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={newLender.image_url}
                  onChange={(e) => setNewLender({ ...newLender, image_url: e.target.value })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <input
                  type="date"
                  value={newLender.approval_date}
                  onChange={(e) => setNewLender({ ...newLender, approval_date: e.target.value })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingLender(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Lender
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    RBI Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lenders.map((lender) => (
                  <tr key={lender.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={lender.image_url}
                        alt={lender.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lender.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lender.rbi_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        lender.status === 'verified'
                          ? 'bg-green-100 text-green-800'
                          : lender.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lender.status.charAt(0).toUpperCase() + lender.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lender.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateLenderStatus(lender.id, 'verified')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => updateLenderStatus(lender.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scam Reports */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Pending Scam Reports</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lender Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Warning Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reports
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scamReports
                  .filter(report => report.status === 'pending')
                  .map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.lender_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.warning_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.report_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateScamReportStatus(report.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateScamReportStatus(report.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}