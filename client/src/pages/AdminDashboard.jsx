import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatPrice, getStatusColor } from '../utils/helpers';
import toast from 'react-hot-toast';
import {
  FiCalendar, FiUsers, FiDollarSign, FiTrendingUp, FiCheckCircle,
  FiClock, FiXCircle, FiMapPin, FiSettings, FiDownload, FiRefreshCw
} from 'react-icons/fi';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        fetch('/api/bookings/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/bookings?limit=50', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const statsData = await statsRes.json();
      const bookingsData = await bookingsRes.json();
      setStats(statsData);
      setBookings(bookingsData.bookings || []);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const bookingsByMonth = [
    { month: 'Jan', bookings: 320, revenue: 180 },
    { month: 'Feb', bookings: 280, revenue: 165 },
    { month: 'Mar', bookings: 350, revenue: 200 },
    { month: 'Apr', bookings: 420, revenue: 240 },
    { month: 'May', bookings: 310, revenue: 175 },
    { month: 'Jun', bookings: 480, revenue: 270 },
    { month: 'Jul', bookings: 550, revenue: 310 },
    { month: 'Aug', bookings: 620, revenue: 350 },
    { month: 'Sep', bookings: 580, revenue: 330 },
    { month: 'Oct', bookings: 520, revenue: 295 },
    { month: 'Nov', bookings: 460, revenue: 260 },
    { month: 'Dec', bookings: 590, revenue: 335 },
  ];

  const maxBookings = Math.max(...bookingsByMonth.map(d => d.bookings));
  const maxRevenue = Math.max(...bookingsByMonth.map(d => d.revenue));

  if (loading) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24 bg-secondary-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 py-10">
        <div className="section-container flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/70">Overview of bookings and system performance</p>
          </div>
          <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-lg text-sm transition-colors">
            <FiRefreshCw className="w-4 h-4" />
            Refresh Data
          </button>
        </div>
      </div>

      <div className="section-container py-8 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: FiCalendar, color: 'bg-blue-500' },
            { label: 'Total Revenue', value: formatPrice(stats?.totalRevenue || 0), icon: FiDollarSign, color: 'bg-green-500' },
            { label: 'Avg. Booking Value', value: formatPrice(stats?.avgBookingValue || 0), icon: FiTrendingUp, color: 'bg-purple-500' },
            { label: 'Active Bookings', value: (stats?.confirmedBookings || 0) + (stats?.pendingBookings || 0), icon: FiCheckCircle, color: 'bg-accent-500' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl shadow-sm border border-secondary-100 p-5">
              <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-secondary-900">{value}</div>
              <div className="text-sm text-secondary-500">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-secondary-900">Booking Statistics</h2>
              <div className="flex gap-2 text-xs text-secondary-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary-500 rounded"></span> Bookings</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-accent-500 rounded"></span> Revenue (K$)</span>
              </div>
            </div>
            <div className="flex items-end gap-1.5" style={{ height: '200px' }}>
              {bookingsByMonth.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center gap-0.5" style={{ height: '180px' }}>
                    <div
                      className="w-4 sm:w-6 bg-accent-400 rounded-t"
                      style={{ height: `${(data.revenue / maxRevenue) * 80}px` }}
                      title={`Revenue: ${data.revenue}K`}
                    />
                    <div
                      className="w-4 sm:w-6 bg-primary-500 rounded-t"
                      style={{ height: `${(data.bookings / maxBookings) * 100}px` }}
                      title={`Bookings: ${data.bookings}`}
                    />
                  </div>
                  <span className="text-xs text-secondary-500">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Booking Status</h2>
            <div className="space-y-4">
              {[
                { label: 'Confirmed', value: stats?.confirmedBookings || 0, color: 'bg-green-500' },
                { label: 'Pending', value: stats?.pendingBookings || 0, color: 'bg-yellow-500' },
                { label: 'Completed', value: stats?.completedBookings || 0, color: 'bg-blue-500' },
                { label: 'Cancelled', value: stats?.cancelledBookings || 0, color: 'bg-red-500' },
              ].map((item) => {
                const total = stats?.totalBookings || 1;
                const pct = ((item.value / total) * 100).toFixed(0);
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-secondary-600">{item.label}</span>
                      <span className="font-medium text-secondary-900">{item.value} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-secondary-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-600">Occupancy Rate</span>
                <span className="font-semibold text-secondary-900">78.5%</span>
              </div>
              <div className="mt-2 h-2 bg-secondary-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: '78.5%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-secondary-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-secondary-100">
            <div>
              <h2 className="text-lg font-semibold text-secondary-900">Recent Bookings</h2>
              <p className="text-sm text-secondary-500">Latest reservations across all hotels</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn-secondary text-sm flex items-center gap-2">
                <FiDownload className="w-4 h-4" />
                Export
              </button>
              <button className="btn-secondary text-sm flex items-center gap-2">
                <FiSettings className="w-4 h-4" />
                Manage
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-secondary-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Booking Ref</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Hotel</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Guest</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Dates</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 10).map((booking) => (
                  <tr key={booking.id} className="border-t border-secondary-100 hover:bg-secondary-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-secondary-600">LUX-{booking.id.toUpperCase()}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-secondary-900">{booking.hotelName}</div>
                      <div className="text-xs text-secondary-500">{booking.roomName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-600">{booking.guestName}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-secondary-600">{formatDate(booking.checkIn)}</div>
                      <div className="text-xs text-secondary-400">to {formatDate(booking.checkOut)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-secondary-900">{formatPrice(booking.totalPrice)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-secondary-500">No bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
