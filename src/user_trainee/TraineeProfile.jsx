import React, { useState, useEffect } from 'react';

export default function TraineeProfile() {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('trainee_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const seed = {
        name: user.name || 'Trainee User',
        email: user.email || 'trainee@gov.in',
        phone: '9876543210',
        enrollmentNo: 'NSSTA/2026/ISS/041',
        batch: '46th ISS Probationers',
        designation: 'Assistant Director (ISS)',
        organization: 'Ministry of Statistics & Programme Implementation',
        joiningDate: '2026-03-01',
        state: 'Delhi',
        bloodGroup: 'B+',
        emergencyContact: '9812345678',
        address: 'NSSTA Campus, Greater Noida, Uttar Pradesh - 201310',
        qualifications: 'M.Stat (ISI Kolkata), B.Sc Mathematics (DU)',
        languages: 'English, Hindi',
      };
      localStorage.setItem('trainee_profile', JSON.stringify(seed));
      setProfile(seed);
    }
  }, []);

  const handleEdit = () => {
    setEditData({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem('trainee_profile', JSON.stringify(editData));
    setProfile(editData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">My Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">View and manage your personal and enrollment details.</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-[10px] rounded-lg shadow transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 text-slate-700 font-bold text-[10px] rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-[10px] rounded-lg shadow transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-150 shadow-2xs overflow-hidden">
        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-[#08493d] to-emerald-800 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-extrabold border-2 border-white/30">
              {profile.name?.charAt(0) || 'T'}
            </div>
            <div>
              <h2 className="text-lg font-extrabold">{profile.name}</h2>
              <p className="text-xs text-emerald-200 font-medium">{profile.designation}</p>
              <p className="text-[10px] text-emerald-300 mt-0.5">{profile.enrollmentNo} • {profile.batch}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-gray-100 pb-2">Personal Information</h3>
              
              <ProfileField label="Full Name" value={profile.name} editing={isEditing} editValue={editData.name} onChange={(v) => setEditData({...editData, name: v})} />
              <ProfileField label="Email Address" value={profile.email} editing={isEditing} editValue={editData.email} onChange={(v) => setEditData({...editData, email: v})} />
              <ProfileField label="Phone Number" value={profile.phone} editing={isEditing} editValue={editData.phone} onChange={(v) => setEditData({...editData, phone: v})} />
              <ProfileField label="Blood Group" value={profile.bloodGroup} editing={isEditing} editValue={editData.bloodGroup} onChange={(v) => setEditData({...editData, bloodGroup: v})} />
              <ProfileField label="Emergency Contact" value={profile.emergencyContact} editing={isEditing} editValue={editData.emergencyContact} onChange={(v) => setEditData({...editData, emergencyContact: v})} />
              <ProfileField label="Languages" value={profile.languages} editing={isEditing} editValue={editData.languages} onChange={(v) => setEditData({...editData, languages: v})} />
            </div>

            {/* Official Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-gray-100 pb-2">Official Information</h3>
              
              <ProfileField label="Enrollment Number" value={profile.enrollmentNo} editing={false} />
              <ProfileField label="Batch" value={profile.batch} editing={false} />
              <ProfileField label="Designation" value={profile.designation} editing={isEditing} editValue={editData.designation} onChange={(v) => setEditData({...editData, designation: v})} />
              <ProfileField label="Organization" value={profile.organization} editing={isEditing} editValue={editData.organization} onChange={(v) => setEditData({...editData, organization: v})} />
              <ProfileField label="Joining Date" value={profile.joiningDate} editing={false} />
              <ProfileField label="State" value={profile.state} editing={isEditing} editValue={editData.state} onChange={(v) => setEditData({...editData, state: v})} />
              <ProfileField label="Qualifications" value={profile.qualifications} editing={isEditing} editValue={editData.qualifications} onChange={(v) => setEditData({...editData, qualifications: v})} />
              <ProfileField label="Address" value={profile.address} editing={isEditing} editValue={editData.address} onChange={(v) => setEditData({...editData, address: v})} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, editing, editValue, onChange }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
      {editing && onChange ? (
        <input
          type="text"
          value={editValue || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      ) : (
        <p className="text-xs font-semibold text-slate-700">{value || '-'}</p>
      )}
    </div>
  );
}
