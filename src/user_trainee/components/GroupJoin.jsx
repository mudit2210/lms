import React, { useState } from 'react';

const INITIAL_GROUPS = [
  { id: 1, name: 'National Accounts Deep-Dive', lead: 'Priya Sharma (ISS-45)', members: 12, category: 'Economics', desc: 'Focusing on Gross Value Added (GVA) calculations and United Nations SNA guidelines.', joined: false },
  { id: 2, name: 'R Statistical Computation Hub', lead: 'Aniket Verma (ISS-46)', members: 24, category: 'Coding', desc: 'Active peer forum discussing linear regressions, custom visualizations, and datasets audits.', joined: true },
  { id: 3, name: 'Survey Design & Field Operations', lead: 'Amit Deshmukh (Faculty)', members: 18, category: 'Surveys', desc: 'Formulating optimal stratifications, sampling designs, and survey listings registers.', joined: false },
  { id: 4, name: 'Sustainable Development Indicators', lead: 'Rohan Gupta (ISS-46)', members: 9, category: 'Policy', desc: 'Mapping and reviews compilation for MoSPI sustainable development indices tracking.', joined: false },
];

export default function GroupJoin() {
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [successMsg, setSuccessMsg] = useState('');

  const toggleJoin = (groupId) => {
    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        const nextState = !group.joined;
        setSuccessMsg(nextState ? `Successfully joined "${group.name}" study circle!` : `Left "${group.name}" group.`);
        setTimeout(() => setSuccessMsg(''), 3000);
        return { ...group, joined: nextState, members: nextState ? group.members + 1 : group.members - 1 };
      }
      return group;
    }));
  };

  return (
    <div className="trainee-page-inner animate-fadeIn">
      {successMsg && (
        <div style={{
          background: '#059669',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '14px',
          fontSize: '12px',
          fontWeight: 700,
          marginBottom: '16px',
          boxShadow: '0 10px 20px -8px rgba(5,150,105,0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }} className="animate-scaleUp">
          <span>🎉 {successMsg}</span>
          <button style={{ background: 'none', border: 'none', color: 'white', fontWeight: 900, cursor: 'pointer' }} onClick={() => setSuccessMsg('')}>×</button>
        </div>
      )}

      <div className="trainee-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#064e3b', margin: '0 0 4px' }}>Study Groups & Peer Circles</h3>
        <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 20px' }}>Collaborate on official statistical research, programming challenges, and syllabus reviews</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {groups.map(group => (
            <div
              key={group.id}
              style={{
                border: '1px solid #eef2f1',
                borderRadius: '20px',
                padding: '20px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 20px -8px rgba(8, 73, 61, 0.04)'
              }}
              className="group-join-card"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '3px 8px',
                    borderRadius: '100px',
                    background: '#ecfdf5',
                    color: '#059669'
                  }}>{group.category}</span>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>👥 {group.members} Members</span>
                </div>
                
                <h4 style={{ fontSize: '13px', fontWeight: 850, color: '#0f172a', margin: '0 0 6px' }}>{group.name}</h4>
                <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 14px', lineHeight: 1.5 }}>{group.desc}</p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #f8faf9',
                marginTop: '10px'
              }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>
                  Lead: <span style={{ color: '#475569', fontWeight: 700 }}>{group.lead}</span>
                </div>
                
                <button
                  onClick={() => toggleJoin(group.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: group.joined ? '1px solid #ef4444' : 'none',
                    background: group.joined ? '#fef2f2' : 'linear-gradient(135deg, #10b981, #059669)',
                    color: group.joined ? '#ef4444' : 'white',
                    boxShadow: group.joined ? 'none' : '0 4px 10px rgba(5,150,105,0.2)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {group.joined ? 'Leave Group' : 'Join Peer Circle'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
