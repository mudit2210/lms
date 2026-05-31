import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserManagement() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };

  const [activeTab, setActiveTab] = useState('directory'); // directory, bulk, groups, roles, enrolment, tenancy, security, inbox
  
  // Data State with LocalStorage sync
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [pendingRegs, setPendingRegs] = useState([]);
  const [selectedTenantScope, setSelectedTenantScope] = useState('All Organizations');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterTenant, setFilterTenant] = useState('All');
  const [customFieldFilter, setCustomFieldFilter] = useState('');

  // Form States
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'Trainee', status: 'Active', tenant: 'MoSPI', customField: '' });
  const [newGroup, setNewGroup] = useState({ name: '', description: '', members: [] });
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [newTenant, setNewTenant] = useState({ name: '', code: '', adminEmail: '' });
  const [enrolData, setEnrolData] = useState({ userOrGroup: 'user', selectId: '', selectCourse: 'Two-week Training Programme on Time Series Analysis', designateRole: 'Trainee' });

  // Initial Seed Data
  useEffect(() => {
    // 1. Seed Users
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const defaultUsers = [
        { id: 'USR-001', name: 'Mudit Sharma', email: 'mudit.sharma@gov.in', phone: '9876543210', role: 'Trainee', status: 'Active', tenant: 'MoSPI', customField: 'ISS 46th Batch' },
        { id: 'USR-002', name: 'Dr. Ramesh Kumar', email: 'ramesh.kumar@gov.in', phone: '9812345678', role: 'Trainer/Faculty', status: 'Active', tenant: 'MoSPI', customField: 'Senior Advisor' },
        { id: 'USR-003', name: 'Sanjay Deshmukh', email: 'sanjay.d@nic.in', phone: '9898989898', role: 'Admin', status: 'Active', tenant: 'NIC', customField: 'System Administrator' },
        { id: 'USR-004', name: 'Ananya Sen', email: 'ananya.sen@gov.in', phone: '9765432109', role: 'Course-Coordinator', status: 'Active', tenant: 'MoSPI', customField: 'Macroeconomics Dept' },
        { id: 'USR-005', name: 'Vikram Malhotra', email: 'vikram.m@gov.in', phone: '9811223344', role: 'Warden', status: 'Inactive', tenant: 'MoSPI', customField: 'Hostel Admin' }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
      setUsers(defaultUsers);
    }

    // 2. Seed Groups
    const savedGroups = localStorage.getItem('user_groups');
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    } else {
      const defaultGroups = [
        { id: 'GRP-001', name: '46th ISS Probationers', description: 'Indian Statistical Service Officers in training.', members: ['USR-001'] },
        { id: 'GRP-002', name: 'State Statistical Officers', description: 'Officers nominated from various State Departments.', members: [] }
      ];
      localStorage.setItem('user_groups', JSON.stringify(defaultGroups));
      setGroups(defaultGroups);
    }

    // 3. Seed Roles
    const savedRoles = localStorage.getItem('user_roles');
    if (savedRoles) {
      setRoles(JSON.parse(savedRoles));
    } else {
      const defaultRoles = [
        { id: 'ROL-001', name: 'Admin', permissions: ['Create User', 'Delete User', 'Edit Permissions', 'Manage Tenancy', 'Configure SSO'] },
        { id: 'ROL-002', name: 'Course-Coordinator', permissions: ['Enrol Trainees', 'Designate Instructors', 'View Analytics'] },
        { id: 'ROL-003', name: 'Course-Director', permissions: ['Approve Nomination', 'Approve Registration', 'Publish Course'] },
        { id: 'ROL-004', name: 'Trainer/Faculty', permissions: ['Upload Material', 'Grade Assessments', 'Manage Classroom'] },
        { id: 'ROL-005', name: 'Trainee', permissions: ['Access Repository', 'Attend Class', 'Attempt Quiz'] },
        { id: 'ROL-006', name: 'Warden', permissions: ['Manage Hostels', 'Approve Leave'] },
        { id: 'ROL-007', name: 'CMS', permissions: ['Edit Website Content', 'Publish Announcements'] }
      ];
      localStorage.setItem('user_roles', JSON.stringify(defaultRoles));
      setRoles(defaultRoles);
    }

    // 4. Seed Tenants
    const savedTenants = localStorage.getItem('tenants');
    if (savedTenants) {
      setTenants(JSON.parse(savedTenants));
    } else {
      const defaultTenants = [
        { id: 'TEN-001', name: 'MoSPI', code: 'Ministry of Statistics & PI', adminEmail: 'admin@mospi.gov.in' },
        { id: 'TEN-002', name: 'NIC', code: 'National Informatics Centre', adminEmail: 'admin@nic.in' },
        { id: 'TEN-003', name: 'State DES', code: 'Directorate of Economics & Statistics', adminEmail: 'admin@state-des.gov.in' }
      ];
      localStorage.setItem('tenants', JSON.stringify(defaultTenants));
      setTenants(defaultTenants);
    }

    // 5. Load Pending Registrations
    const handleLoadRegs = () => {
      const savedRegs = localStorage.getItem('pending_registrations');
      setPendingRegs(savedRegs ? JSON.parse(savedRegs) : []);
    };
    handleLoadRegs();
    window.addEventListener('storage', handleLoadRegs);
    return () => window.removeEventListener('storage', handleLoadRegs);
  }, []);

  // Save actions
  const saveUsers = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };
  const saveGroups = (updatedGroups) => {
    localStorage.setItem('user_groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
  };
  const saveRoles = (updatedRoles) => {
    localStorage.setItem('user_roles', JSON.stringify(updatedRoles));
    setRoles(updatedRoles);
  };
  const saveTenants = (updatedTenants) => {
    localStorage.setItem('tenants', JSON.stringify(updatedTenants));
    setTenants(updatedTenants);
  };
  const savePendingRegs = (updatedRegs) => {
    localStorage.setItem('pending_registrations', JSON.stringify(updatedRegs));
    setPendingRegs(updatedRegs);
  };

  // Add User
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const u = {
      id: 'USR-' + Date.now(),
      ...newUser
    };
    saveUsers([...users, u]);
    setNewUser({ name: '', email: '', phone: '', role: 'Trainee', status: 'Active', tenant: 'MoSPI', customField: '' });
    alert('User created successfully!');
  };

  // Toggle User Status
  const toggleUserStatus = (id, newStatus) => {
    const updated = users.map((u) => u.id === id ? { ...u, status: newStatus } : u);
    saveUsers(updated);
  };

  // Delete User
  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updated = users.filter((u) => u.id !== id);
      saveUsers(updated);
    }
  };

  // Add Group
  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroup.name) return;
    const g = {
      id: 'GRP-' + Date.now(),
      name: newGroup.name,
      description: newGroup.description,
      members: []
    };
    saveGroups([...groups, g]);
    setNewGroup({ name: '', description: '', members: [] });
    alert('Group created successfully!');
  };

  // Add Member to Group
  const addGroupMember = (groupId, userId) => {
    const updated = groups.map((g) => {
      if (g.id === groupId) {
        if (g.members.includes(userId)) return g;
        return { ...g, members: [...g.members, userId] };
      }
      return g;
    });
    saveGroups(updated);
  };

  // Remove Member from Group
  const removeGroupMember = (groupId, userId) => {
    const updated = groups.map((g) => {
      if (g.id === groupId) {
        return { ...g, members: g.members.filter((m) => m !== userId) };
      }
      return g;
    });
    saveGroups(updated);
  };

  // Add Role
  const handleAddRole = (e) => {
    e.preventDefault();
    if (!newRole.name) return;
    const r = {
      id: 'ROL-' + Date.now(),
      name: newRole.name,
      permissions: newRole.permissions
    };
    saveRoles([...roles, r]);
    setNewRole({ name: '', permissions: [] });
    alert('Role created successfully!');
  };

  // Toggle Permission on Role
  const togglePermission = (roleId, permission) => {
    const updated = roles.map((r) => {
      if (r.id === roleId) {
        const hasPerm = r.permissions.includes(permission);
        const nextPerms = hasPerm
          ? r.permissions.filter((p) => p !== permission)
          : [...r.permissions, permission];
        return { ...r, permissions: nextPerms };
      }
      return r;
    });
    saveRoles(updated);
  };

  // Add Tenant
  const handleAddTenant = (e) => {
    e.preventDefault();
    if (!newTenant.name || !newTenant.code) return;
    const t = {
      id: 'TEN-' + Date.now(),
      ...newTenant
    };
    saveTenants([...tenants, t]);
    setNewTenant({ name: '', code: '', adminEmail: '' });
    alert('Tenant created successfully!');
  };

  // Handle Enrolment
  const handleEnrolSubmit = (e) => {
    e.preventDefault();
    if (!enrolData.selectId) {
      alert('Please select a Trainee or Group.');
      return;
    }
    alert(`Enrolment Successful:\nTarget: ${enrolData.selectId} (${enrolData.userOrGroup})\nCourse: ${enrolData.selectCourse}\nDesignated Role: ${enrolData.designateRole}`);
  };

  // Approve Pending Registration
  const handleApproveRegistration = (reg) => {
    // Add to Users directory
    const u = {
      id: 'USR-' + Date.now(),
      name: reg.fullName,
      email: reg.email,
      phone: reg.phone,
      role: 'Trainee',
      status: 'Active',
      tenant: reg.org.includes('MoSPI') ? 'MoSPI' : 'State DES',
      customField: reg.designation
    };
    saveUsers([...users, u]);
    // Remove from registrations
    const updatedRegs = pendingRegs.filter((r) => r.id !== reg.id);
    savePendingRegs(updatedRegs);
    alert(`Nomination Approved! ${reg.fullName} is now enrolled in the portal.`);
  };

  // Reject Pending Registration
  const handleRejectRegistration = (id) => {
    const updatedRegs = pendingRegs.filter((r) => r.id !== id);
    savePendingRegs(updatedRegs);
    alert('Nomination rejected.');
  };

  // Filtered Users List
  const filteredUsers = users.filter((u) => {
    // Tenancy isolation filter
    if (selectedTenantScope !== 'All Organizations' && u.tenant !== selectedTenantScope) {
      return false;
    }

    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.phone.includes(searchQuery) ||
                          u.customField.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === 'All' || u.role === filterRole;
    const matchesStatus = filterStatus === 'All' || u.status === filterStatus;
    const matchesTenant = filterTenant === 'All' || u.tenant === filterTenant;
    const matchesCustomField = !customFieldFilter || u.customField.toLowerCase().includes(customFieldFilter.toLowerCase());

    return matchesSearch && matchesRole && matchesStatus && matchesTenant && matchesCustomField;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 sm:px-12 select-none animate-fadeIn flex flex-col md:flex-row gap-8">
      
      {/* 1. Left Administration Sidebar Tabs */}
      <aside className="w-full md:w-64 shrink-0 space-y-2">
        <div className="bg-[#08493d] rounded-xl p-4 text-white space-y-1">
          <h2 className="text-sm font-extrabold tracking-wider uppercase opacity-85">Admin Workspace</h2>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold">MoSPI Portal Supervisor</span>
          </div>
          
          {/* Tenant Isolation Selector */}
          <div className="mt-4 pt-4 border-t border-emerald-800 space-y-1.5 text-xs text-slate-100">
            <label className="block font-bold">Scope Tenancy View:</label>
            <select 
              value={selectedTenantScope}
              onChange={(e) => setSelectedTenantScope(e.target.value)}
              className="w-full bg-[#063b31] border border-emerald-800 text-white rounded px-2.5 py-1.5 font-bold focus:outline-none"
            >
              <option value="All Organizations">All Organizations (Super)</option>
              {tenants.map(t => (
                <option key={t.id} value={t.name}>{t.name} - Tenant</option>
              ))}
            </select>
          </div>

          {/* Quick Links */}
          <div className="mt-3.5 pt-3.5 border-t border-emerald-800/60 flex flex-col gap-2.5 text-xs font-bold text-emerald-100">
            <button 
              onClick={() => navigate('/')} 
              className="w-full text-left hover:text-yellow-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Public Site</span>
            </button>
            <button 
              onClick={() => navigate('/admin/e-hostel')} 
              className="w-full text-left hover:text-yellow-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
              </svg>
              <span>e-Hostel Dashboard</span>
            </button>
            <button 
              onClick={handleLogout} 
              className="w-full text-left text-rose-300 hover:text-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <nav className="bg-white rounded-xl border border-gray-150 p-2 space-y-1 text-xs font-bold text-slate-600 shadow-2xs">
          <button
            onClick={() => setActiveTab('directory')}
            className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
              activeTab === 'directory' ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-50'
            }`}
          >
            <span>User Directory</span>
            <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-500 font-normal">
              {filteredUsers.length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('inbox')}
            className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
              activeTab === 'inbox' ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-50'
            }`}
          >
            <span>Nomination Requests</span>
            {pendingRegs.length > 0 && (
              <span className="bg-rose-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                {pendingRegs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('bulk')}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'bulk' ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-50'
            }`}
          >
            Bulk Operations & Import
          </button>

          <button
            onClick={() => setActiveTab('groups')}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'groups' ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-50'
            }`}
          >
            User Groups Manager
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'roles' ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-50'
            }`}
          >
            Roles & Permissions
          </button>

          <button
            onClick={() => setActiveTab('enrolment')}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'enrolment' ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-50'
            }`}
          >
            Course Enrolments
          </button>

          <button
            onClick={() => setActiveTab('tenancy')}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'tenancy' ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-50'
            }`}
          >
            Tenant Organizations
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'security' ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-50'
            }`}
          >
            SSO & Security Config
          </button>
        </nav>
      </aside>

      {/* 2. Right Administration Panel Content */}
      <main className="flex-1 bg-white border border-gray-150 rounded-2xl shadow-sm p-6 sm:p-8 min-h-[60vh] text-xs sm:text-sm">
        
        {/* Tab 1: User Directory */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 mb-4 gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-800">User Directory</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Manage details, roles, permissions, status and access control.</p>
              </div>
            </div>

            {/* Directory Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-gray-100 font-semibold text-slate-600">
              <div className="space-y-1">
                <label>Search Directory</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Name, email, phone..."
                  className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label>Filter by Role</label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                >
                  <option value="All">All Roles</option>
                  {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label>Filter by Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>

              <div className="space-y-1">
                <label>Custom Field Search</label>
                <input
                  type="text"
                  value={customFieldFilter}
                  onChange={(e) => setCustomFieldFilter(e.target.value)}
                  placeholder="e.g. Batch, Dept"
                  className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto border border-gray-150 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-gray-200">
                    <th className="p-3">User Details</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Tenant</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Custom Field</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-semibold text-slate-700">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 font-normal">
                        No directory users match current search criteria or scoped tenancy.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50">
                        <td className="p-3">
                          <p className="font-extrabold text-slate-800">{u.name}</p>
                          <p className="text-[10px] text-slate-400 font-normal">{u.email} | {u.phone}</p>
                        </td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 text-[10px] font-bold uppercase">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 font-extrabold text-slate-500">{u.tenant}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                            u.status === 'Inactive' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                            'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-3 font-normal text-slate-500">{u.customField || '-'}</td>
                        <td className="p-3">
                          <div className="flex justify-center items-center gap-2">
                            <select
                              value={u.status}
                              onChange={(e) => toggleUserStatus(u.id, e.target.value)}
                              className="border border-gray-300 rounded px-1.5 py-0.5 bg-white text-[10px] font-bold focus:outline-none"
                            >
                              <option value="Active">Set Active</option>
                              <option value="Inactive">Set Inactive</option>
                              <option value="Disabled">Set Disabled</option>
                            </select>
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="text-rose-600 hover:text-rose-800 p-1 font-bold text-[10px] uppercase cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick Add User Form */}
            <div className="p-5 border border-gray-150 rounded-xl bg-slate-50/50 space-y-4">
              <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Create New User Profile
              </h4>
              <form onSubmit={handleAddUser} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-semibold text-slate-600">
                <div className="space-y-1">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    placeholder="e.g. Mudit Sharma"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="e.g. user@gov.in"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    placeholder="e.g. 9811223344"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label>Assigned Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label>Tenant Membership</label>
                  <select
                    value={newUser.tenant}
                    onChange={(e) => setNewUser({...newUser, tenant: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {tenants.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label>Custom Field (Batch/Dept)</label>
                  <input
                    type="text"
                    value={newUser.customField}
                    onChange={(e) => setNewUser({...newUser, customField: e.target.value})}
                    placeholder="e.g. Batch 46 ISS"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="md:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Create User Directory Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Nomination Requests (Inbox) */}
        {activeTab === 'inbox' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Nomination & Registration Inbox</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Approve self-registrations and nominations submitted by training participants.</p>
            </div>

            <div className="space-y-4">
              {pendingRegs.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-gray-150 border-dashed text-slate-400 space-y-2">
                  <svg className="w-12 h-12 mx-auto text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5M12 14v-6" />
                  </svg>
                  <p className="font-semibold text-sm">No Pending Registrations</p>
                  <p className="text-xs font-normal">All self-registrations and nomination forms have been processed.</p>
                </div>
              ) : (
                pendingRegs.map((reg) => (
                  <div key={reg.id} className="p-5 border border-gray-200 rounded-xl bg-white shadow-2xs flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-800 text-sm">{reg.fullName}</h4>
                        <span className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-bold uppercase">
                          Pending Approval
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-slate-500">
                        <p><strong>Email:</strong> {reg.email}</p>
                        <p><strong>Phone:</strong> {reg.phone}</p>
                        <p><strong>Organization:</strong> {reg.org}</p>
                        <p><strong>Designation:</strong> {reg.designation}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100 text-xs">
                        <p className="text-emerald-800 font-extrabold">Nominated Course: {reg.course}</p>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Submitted On: {reg.date || 'Today'}</p>
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-end gap-2 shrink-0 md:w-36">
                      <button
                        onClick={() => handleApproveRegistration(reg)}
                        className="flex-1 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg shadow-sm text-xs cursor-pointer text-center"
                      >
                        Approve & Enrol
                      </button>
                      <button
                        onClick={() => handleRejectRegistration(reg.id)}
                        className="flex-1 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold border border-rose-200 rounded-lg text-xs cursor-pointer text-center"
                      >
                        Reject Nomination
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Bulk Operations */}
        {activeTab === 'bulk' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Bulk Import & Data Integration</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Import thousands of learners using batch uploads or synchronize with APIs.</p>
            </div>

            {/* Upload Box Simulation */}
            <div className="p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-slate-50/50 hover:bg-slate-50 text-center space-y-3 transition-colors">
              <svg className="w-12 h-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <h4 className="font-extrabold text-slate-700">Drag and Drop Learner CSV/Excel File</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Upload batch trainee listings (columns: Full Name, Email, Phone, Tenant, Role, Custom Field).</p>
              
              <button 
                onClick={() => {
                  const imported = [
                    { id: 'USR-B1', name: 'Alok Gupta', email: 'alok.g@gov.in', phone: '9888877777', role: 'Trainee', status: 'Active', tenant: 'MoSPI', customField: 'Batch 46 ISS' },
                    { id: 'USR-B2', name: 'Nisha Pillai', email: 'nisha.p@gov.in', phone: '9666655555', role: 'Trainee', status: 'Active', tenant: 'MoSPI', customField: 'Batch 46 ISS' },
                    { id: 'USR-B3', name: 'Priya Nair', email: 'priya.nair@des.gov.in', phone: '9555544444', role: 'Trainee', status: 'Active', tenant: 'State DES', customField: 'Kerala DES' }
                  ];
                  saveUsers([...users, ...imported]);
                  alert('Batch Import Simulated Successfully! Added 3 Trainees to the Directory.');
                }}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg shadow-xs cursor-pointer inline-block"
              >
                Upload & Import Demo CSV
              </button>
            </div>

            {/* API profile synchronization */}
            <div className="p-5 border border-gray-150 rounded-xl space-y-3">
              <h4 className="font-extrabold text-slate-800">Auto-Update Trainee Profiles API</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect the NSSTA Learning Management System to the central MoSPI employee databases. This updates trainee designations, departments, and active statuses automatically every 24 hours.
              </p>
              <button 
                onClick={() => alert('API Synchronization Initiated! Checked 1,250 profile records. 0 changes detected.')}
                className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 border border-gray-300 rounded font-bold text-slate-700 cursor-pointer"
              >
                Trigger Manual Sync API
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: User Groups Manager */}
        {activeTab === 'groups' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">User Groups & Batches</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Group trainees to enrolling them collectively into training programs.</p>
            </div>

            {/* Groups list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map((g) => (
                <div key={g.id} className="p-4 border border-gray-200 rounded-xl bg-white shadow-2xs space-y-3">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">{g.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{g.description}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="font-bold text-[#08493d] mb-1">Group Members ({g.members.length}):</p>
                    <ul className="space-y-1">
                      {g.members.length === 0 ? (
                        <li className="text-slate-400 font-normal italic text-[11px]">No users assigned to this group.</li>
                      ) : (
                        g.members.map((memberId) => {
                          const mUser = users.find(u => u.id === memberId);
                          return (
                            <li key={memberId} className="flex justify-between items-center text-slate-600 bg-slate-50 px-2 py-1 rounded text-[11px]">
                              <span>{mUser ? mUser.name : 'Unknown User'}</span>
                              <button
                                onClick={() => removeGroupMember(g.id, memberId)}
                                className="text-rose-600 hover:text-rose-800 font-bold"
                              >
                                Remove
                              </button>
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </div>

                  {/* Add user to this group */}
                  <div className="pt-2 flex gap-2">
                    <select
                      id={`select-user-group-${g.id}`}
                      className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white text-[11px] font-medium focus:outline-none"
                    >
                      <option value="">Select User to Add...</option>
                      {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        const val = document.getElementById(`select-user-group-${g.id}`).value;
                        if (val) {
                          addGroupMember(g.id, val);
                          document.getElementById(`select-user-group-${g.id}`).value = '';
                        }
                      }}
                      className="bg-emerald-800 text-white font-bold rounded px-2.5 py-1 text-[11px] cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Group Form */}
            <div className="p-5 border border-gray-150 rounded-xl bg-slate-50/50 space-y-4">
              <h4 className="font-extrabold text-slate-800">Create New User Group / Batch</h4>
              <form onSubmit={handleAddGroup} className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-semibold text-slate-600">
                <div className="space-y-1">
                  <label>Group Name</label>
                  <input
                    type="text"
                    required
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    placeholder="e.g. 47th ISS Probationers"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label>Group Description</label>
                  <input
                    type="text"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                    placeholder="e.g. Nominated ISS batch training from Nov 2026"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 5: Roles & Permissions */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Configurable Role-Based Access Control</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Define user permissions for each role. Changes apply globally to all assigned users.</p>
            </div>

            <div className="space-y-4">
              {roles.map((r) => (
                <div key={r.id} className="p-4 border border-gray-200 rounded-xl bg-white shadow-2xs space-y-3">
                  <h4 className="font-extrabold text-slate-800 text-sm border-b border-gray-100 pb-1">{r.name} Role</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-[11px] font-semibold text-slate-600">
                    {['Create User', 'Delete User', 'Edit Permissions', 'Enrol Trainees', 'Designate Instructors', 'Upload Material', 'Grade Assessments', 'Manage Hostels', 'Publish Announcements', 'Manage Tenancy', 'Configure SSO'].map((perm) => {
                      const hasPerm = r.permissions.includes(perm);
                      return (
                        <label key={perm} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hasPerm}
                            onChange={() => togglePermission(r.id, perm)}
                            className="h-3.5 w-3.5 text-[#08493d] focus:ring-emerald-500 rounded border-gray-300"
                          />
                          <span>{perm}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Create Custom Role Form */}
            <div className="p-5 border border-gray-150 rounded-xl bg-slate-50/50 space-y-4">
              <h4 className="font-extrabold text-slate-800">Add New System Role</h4>
              <form onSubmit={handleAddRole} className="flex gap-3 font-semibold text-slate-600">
                <div className="flex-1 space-y-1">
                  <label>Role Name</label>
                  <input
                    type="text"
                    required
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                    placeholder="e.g. Assistant Course Coordinator"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="self-end">
                  <button
                    type="submit"
                    className="py-1.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Add Custom Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 6: Course Enrolments */}
        {activeTab === 'enrolment' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Course Enrolments & Designations</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Enrol individual trainees or groups, and designate course coordinators & instructors.</p>
            </div>

            <form onSubmit={handleEnrolSubmit} className="space-y-4 p-5 border border-gray-150 rounded-xl bg-slate-50/50 font-semibold text-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label>Select Enrolment Target Type</label>
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="targetType"
                        checked={enrolData.userOrGroup === 'user'}
                        onChange={() => setEnrolData({ ...enrolData, userOrGroup: 'user', selectId: '' })}
                        className="text-[#08493d] focus:ring-emerald-500"
                      />
                      <span>Individual User</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="targetType"
                        checked={enrolData.userOrGroup === 'group'}
                        onChange={() => setEnrolData({ ...enrolData, userOrGroup: 'group', selectId: '' })}
                        className="text-[#08493d] focus:ring-emerald-500"
                      />
                      <span>User Group / Batch</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label>Select Target (User / Group)</label>
                  <select
                    value={enrolData.selectId}
                    onChange={(e) => setEnrolData({ ...enrolData, selectId: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  >
                    <option value="">Choose Target...</option>
                    {enrolData.userOrGroup === 'user' ? (
                      users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)
                    ) : (
                      groups.map(g => <option key={g.id} value={g.id}>{g.name} ({g.description})</option>)
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label>Select Training Program Course</label>
                  <select
                    value={enrolData.selectCourse}
                    onChange={(e) => setEnrolData({ ...enrolData, selectCourse: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  >
                    <option value="Two-week Training Programme on Time Series Analysis">Two-week Training Programme on Time Series Analysis</option>
                    <option value="Workshop on Big Data Analytics and Machine Learning in Official Statistics">Workshop on Big Data Analytics and Machine Learning in Official Statistics</option>
                    <option value="International Training Programme on Agricultural Statistics">International Training Programme on Agricultural Statistics</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label>Designate Enrolment Designation Role</label>
                  <select
                    value={enrolData.designateRole}
                    onChange={(e) => setEnrolData({ ...enrolData, designateRole: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  >
                    <option value="Trainee">Trainee / Learner</option>
                    <option value="Trainer/Faculty">Instructor / Faculty</option>
                    <option value="Course-Coordinator">Course Coordinator</option>
                    <option value="Course-Director">Course Director</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors cursor-pointer mt-2"
              >
                Confirm Course Enrolment / Designation
              </button>
            </form>
          </div>
        )}

        {/* Tab 7: Tenancy */}
        {activeTab === 'tenancy' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Multi-Organization Tenancy</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Host multiple departments or organizations in complete database isolation.</p>
            </div>

            <div className="space-y-4">
              {tenants.map((t) => {
                const tenantUserCount = users.filter(u => u.tenant === t.name).length;
                return (
                  <div key={t.id} className="p-4 border border-gray-200 rounded-xl bg-white shadow-2xs flex justify-between items-center">
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm">{t.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{t.code} | Admin: {t.adminEmail}</p>
                    </div>
                    <span className="bg-emerald-50 text-[#08493d] border border-emerald-200 px-3 py-1 rounded text-xs font-bold">
                      {tenantUserCount} Learners Isolated
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Create Tenant Form */}
            <div className="p-5 border border-gray-150 rounded-xl bg-slate-50/50 space-y-4">
              <h4 className="font-extrabold text-slate-800">Add New Isolated Tenant Organization</h4>
              <form onSubmit={handleAddTenant} className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-semibold text-slate-600">
                <div className="space-y-1">
                  <label>Organization Name</label>
                  <input
                    type="text"
                    required
                    value={newTenant.name}
                    onChange={(e) => setNewTenant({...newTenant, name: e.target.value})}
                    placeholder="e.g. UPSC DES"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label>Full Description</label>
                  <input
                    type="text"
                    required
                    value={newTenant.code}
                    onChange={(e) => setNewTenant({...newTenant, code: e.target.value})}
                    placeholder="e.g. Union Public Service Commission"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label>Tenant Admin Email</label>
                  <input
                    type="email"
                    required
                    value={newTenant.adminEmail}
                    onChange={(e) => setNewTenant({...newTenant, adminEmail: e.target.value})}
                    placeholder="e.g. admin@upsc.gov.in"
                    className="w-full border border-gray-300 rounded-md px-2.5 py-1 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Register Isolated Tenant Organization
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 8: Security & SSO Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">SSO & Security Configuration</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Manage authentication, SSO integrations (Parichay/Janparichay), and MFA rules.</p>
            </div>

            {/* Parichay/Janparichay SSO Integration */}
            <div className="p-5 border border-gray-150 rounded-xl bg-slate-50/50 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-800 text-sm">Parichay / Janparichay Single Sign-On (SSO)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
                    When active, government employees can securely authenticate using NIC's Janparichay portal. Toggling off forces email/password logins.
                  </p>
                </div>
                <button
                  onClick={() => alert('Janparichay SSO Integration Configuration saved successfully!')}
                  className="bg-emerald-800 text-white font-bold rounded px-4 py-1.5 text-xs cursor-pointer shadow-xs"
                >
                  Configure
                </button>
              </div>

              <div className="flex gap-4 text-xs font-semibold text-slate-600 pt-2 border-t border-gray-200">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="ssoToggle" defaultChecked className="text-[#08493d] focus:ring-emerald-500" />
                  <span>Enabled (SSO Redirect Active)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="ssoToggle" className="text-[#08493d] focus:ring-emerald-500" />
                  <span>Disabled (Local Portal Database Only)</span>
                </label>
              </div>
            </div>

            {/* Multi-Factor Authentication (MFA) toggle */}
            <div className="p-5 border border-gray-150 rounded-xl bg-slate-50/50 space-y-4">
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">Mandatory Multi-Factor Authentication (MFA)</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Force trainees and coordinators to verify their identity via 6-digit email/SMS codes (OTP) before entering training courses.
                </p>
              </div>

              <div className="flex gap-4 text-xs font-semibold text-slate-600 pt-2 border-t border-gray-200">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="mfaToggle" defaultChecked className="text-[#08493d] focus:ring-emerald-500" />
                  <span>OTP Enabled (All Registrations Verified)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="mfaToggle" className="text-[#08493d] focus:ring-emerald-500" />
                  <span>OTP Disabled (Standard Registration Only)</span>
                </label>
              </div>
            </div>

            {/* Self-registration rule configurations */}
            <div className="p-5 border border-gray-150 rounded-xl bg-slate-50/50 space-y-4">
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">Self-Registration Approval Workflow</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Configure whether self-registrations and nominations are auto-approved, require Admin oversight, or restrict entirely.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 text-xs font-semibold text-slate-600 pt-2 border-t border-gray-200">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="approvalRules" className="text-[#08493d] focus:ring-emerald-500" />
                  <span>Auto-Approve (Instant Access for Trainees)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="approvalRules" defaultChecked className="text-[#08493d] focus:ring-emerald-500" />
                  <span>Admin Approval Required (Inbox Review)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="approvalRules" className="text-[#08493d] focus:ring-emerald-500" />
                  <span>Restrict Registrations beyond Host Organizations</span>
                </label>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
