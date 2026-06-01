import React, { useState } from 'react';

export default function TraineeProfile({ user }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || 'Trainee User',
    email: user?.email || 'trainee@gov.in',
    phone: '+91 98765 43210',
    dob: '1999-04-15',
    gender: 'Male',
    enrollment: 'LMS/2026/041',
    batch: '46th ISS Batch',
    department: 'Department of Statistics, MoSPI',
    address: 'A-14, Sector 62, Noida, Uttar Pradesh – 201301',
    cadre: 'ISS Probationer',
    posting: 'Ministry of Statistics & Programme Implementation',
  });

  const handleChange = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const initials = form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="trainee-page-inner">
      <div className="trainee-profile-layout">
        {/* Left: Avatar & Quick Info */}
        <div className="trainee-profile-sidebar">
          <div className="trainee-profile-avatar-wrap">
            <div className="trainee-profile-avatar">{initials}</div>
            <button className="trainee-avatar-change-btn">Change Photo</button>
          </div>
          <div className="trainee-profile-quick-info">
            <p className="trainee-profile-name">{form.name}</p>
            <p className="trainee-profile-role">Trainee / Learner</p>
            <span className="trainee-badge-green">{form.batch}</span>
            <div className="trainee-profile-quick-grid">
              <div className="trainee-profile-quick-item">
                <p className="trainee-profile-quick-label">Enrollment No.</p>
                <p className="trainee-profile-quick-value">{form.enrollment}</p>
              </div>
              <div className="trainee-profile-quick-item">
                <p className="trainee-profile-quick-label">Cadre</p>
                <p className="trainee-profile-quick-value">{form.cadre}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Details Form */}
        <div className="trainee-profile-main">
          <div className="trainee-card">
            <div className="trainee-card-header">
              <h3 className="trainee-card-title">Personal Information</h3>
              <button
                className={`trainee-btn-primary-sm ${editing ? 'active' : ''}`}
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
            <div className="trainee-profile-fields">
              {[
                { label: 'Full Name', key: 'name', type: 'text' },
                { label: 'Email Address', key: 'email', type: 'email' },
                { label: 'Phone Number', key: 'phone', type: 'tel' },
                { label: 'Date of Birth', key: 'dob', type: 'date' },
                { label: 'Gender', key: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
              ].map(field => (
                <div key={field.key} className="trainee-profile-field">
                  <label className="trainee-field-label">{field.label}</label>
                  {editing ? (
                    field.type === 'select' ? (
                      <select
                        className="trainee-field-input"
                        value={form[field.key]}
                        onChange={e => handleChange(field.key, e.target.value)}
                      >
                        {field.options.map(o => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        className="trainee-field-input"
                        value={form[field.key]}
                        onChange={e => handleChange(field.key, e.target.value)}
                      />
                    )
                  ) : (
                    <p className="trainee-field-value">{form[field.key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="trainee-card" style={{ marginTop: '16px' }}>
            <div className="trainee-card-header">
              <h3 className="trainee-card-title">Academic & Official Details</h3>
            </div>
            <div className="trainee-profile-fields">
              {[
                { label: 'Enrollment Number', key: 'enrollment' },
                { label: 'Batch', key: 'batch' },
                { label: 'Department', key: 'department' },
                { label: 'Current Posting', key: 'posting' },
                { label: 'Residential Address', key: 'address' },
              ].map(field => (
                <div key={field.key} className="trainee-profile-field">
                  <label className="trainee-field-label">{field.label}</label>
                  {editing ? (
                    <input
                      type="text"
                      className="trainee-field-input"
                      value={form[field.key]}
                      onChange={e => handleChange(field.key, e.target.value)}
                    />
                  ) : (
                    <p className="trainee-field-value">{form[field.key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
