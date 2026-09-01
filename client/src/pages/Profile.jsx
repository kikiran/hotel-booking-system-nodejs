import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiCamera } from 'react-icons/fi';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email] = useState(user?.email || '');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ name, phone });
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-20 lg:pt-24 bg-secondary-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 py-10">
        <div className="section-container">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/70">Manage your account information</p>
        </div>
      </div>

      <div className="section-container py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-secondary-100">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <FiUser className="w-10 h-10 text-primary-600" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors border-2 border-white">
                  <FiCamera className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl font-semibold text-secondary-900">{user?.name}</h2>
                <p className="text-secondary-500">{user?.email}</p>
                <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full capitalize">
                    {user?.role}
                  </span>
                  <span className="text-xs font-medium text-secondary-600 bg-secondary-100 px-3 py-1 rounded-full">
                    Member since {formatDate(user?.joinedDate)}
                  </span>
                </div>
              </div>
              {!editing && (
                <button onClick={() => setEditing(true)} className="btn-secondary text-sm flex items-center gap-2 flex-shrink-0">
                  <FiEdit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <h3 className="text-lg font-semibold text-secondary-900">Edit Profile</h3>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-400" />
                    <input type="email" value={email} disabled className="input-field pl-10 bg-secondary-50 text-secondary-500 cursor-not-allowed" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-field pl-10"
                      placeholder="+1-555-000-0000"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button type="button" onClick={() => { setEditing(false); setName(user?.name); setPhone(user?.phone); }} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-secondary-50 rounded-xl p-4">
                  <div className="text-sm text-secondary-500 mb-1">Phone Number</div>
                  <div className="font-medium text-secondary-900">{user?.phone || 'Not provided'}</div>
                </div>
                <div className="bg-secondary-50 rounded-xl p-4">
                  <div className="text-sm text-secondary-500 mb-1">Member Since</div>
                  <div className="font-medium text-secondary-900">{formatDate(user?.joinedDate)}</div>
                </div>
                <div className="bg-secondary-50 rounded-xl p-4">
                  <div className="text-sm text-secondary-500 mb-1">Account Type</div>
                  <div className="font-medium text-secondary-900 capitalize">{user?.role}</div>
                </div>
                <div className="bg-secondary-50 rounded-xl p-4">
                  <div className="text-sm text-secondary-500 mb-1">Total Bookings</div>
                  <div className="font-medium text-secondary-900">View in My Bookings</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
