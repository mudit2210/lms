import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import 17 Modular Components under MoSPI 3.1.3 Content & Knowledge Management specifications
import ContentRepository from './ContentRepository';
import CourseManagement from './CourseManagement';
import LessonManagement from './LessonManagement';
import TopicManagement from './TopicManagement';
import RichContentEditor from './RichContentEditor';
import FileManagement from './FileManagement';
import VersionControl from './VersionControl';
import MetadataTagging from './MetadataTagging';
import KnowledgeRepository from './KnowledgeRepository';
import DiscussionForums from './DiscussionForums';
import ResourceSharing from './ResourceSharing';
import SearchFiltering from './SearchFiltering';
import ApprovalWorkflow from './ApprovalWorkflow';
import Notifications from './Notifications';
import AnalyticsReporting from './AnalyticsReporting';
import RolePermissionManagement from './RolePermissionManagement';
import AuditLogs from './AuditLogs';
import FilePreviewModal from './FilePreviewModal';
import VersionCompareModal from './VersionCompareModal';
import UploadAssetModal from './UploadAssetModal';
import MetadataDetailModal from './MetadataDetailModal';
import LearnerDashboard from './LearnerDashboard';

export default function KmsHome() {
  const navigate = useNavigate();

  // Dynamic theme state syncing across the ecosystem
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('admin-theme') || 'light';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('admin-theme', nextTheme);
    window.dispatchEvent(new Event('admin-theme-change'));
  };

  useEffect(() => {
    const syncTheme = () => {
      setTheme(localStorage.getItem('admin-theme') || 'light');
    };
    window.addEventListener('admin-theme-change', syncTheme);
    return () => window.removeEventListener('admin-theme-change', syncTheme);
  }, []);

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : { name: 'Admin Administrator', email: 'admin@mospi.gov.in', role: 'admin' };
    } catch {
      return { name: 'Admin Administrator', email: 'admin@mospi.gov.in', role: 'admin' };
    }
  });

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'faculty': return 'Trainer / Faculty';
      case 'student': return 'Trainee / Learner';
      case 'course-director': return 'Course Director';
      case 'course-coordinator': return 'Course Coordinator';
      case 'warden': return 'Warden';
      case 'cms': return 'Content Manager';
      default: return role || 'User';
    }
  };
  
  const getSidebarLinks = (role) => {
    switch (role) {
      case 'Super Admin':
        return [
          { id: 'repository', label: 'Central Drive (LCMS)', desc: 'Store & preview training files' },
          { id: 'courses', label: 'Course Tree Builder', desc: 'Hierarchy & Rich editor page' },
          { id: 'knowledge', label: 'Knowledge Base', desc: 'SOPs, Policies & Resources' },
          { id: 'forum', label: 'Peer Discussion Forum', desc: 'Q&As & resource sharing' },
          { id: 'governance', label: 'Governance Queue', desc: 'Draft approvals workflow' },
          { id: 'analytics', label: 'Reports & Audit Logs', desc: 'Usage metrics & track records' }
        ];
      case 'Content Manager':
        return [
          { id: 'repository', label: 'Central Drive (LCMS)', desc: 'Store & preview training files' },
          { id: 'courses', label: 'Course Tree Builder', desc: 'Hierarchy & Rich editor page' },
          { id: 'knowledge', label: 'Knowledge Base', desc: 'SOPs, Policies & Resources' },
          { id: 'forum', label: 'Peer Discussion Forum', desc: 'Q&As & resource sharing' },
          { id: 'analytics', label: 'Reports & Audit Logs', desc: 'Usage metrics & track records' }
        ];
      case 'Trainer':
        return [
          { id: 'courses', label: 'Course Tree Builder', desc: 'Hierarchy & Rich editor page' },
          { id: 'knowledge', label: 'Knowledge Base', desc: 'SOPs, Policies & Resources' },
          { id: 'forum', label: 'Peer Discussion Forum', desc: 'Q&As & resource sharing' }
        ];
      case 'Reviewer':
        return [
          { id: 'governance', label: 'Governance Queue', desc: 'Draft approvals workflow' },
          { id: 'repository', label: 'Central Drive (LCMS)', desc: 'Store & preview training files' },
          { id: 'knowledge', label: 'Knowledge Base', desc: 'SOPs, Policies & Resources' },
          { id: 'analytics', label: 'Reports & Audit Logs', desc: 'Usage metrics & track records' }
        ];
      case 'Learner':
        return [
          { id: 'learner_dashboard', label: 'My Learning Space', desc: 'Personal training & bookmarks' },
          { id: 'knowledge', label: 'Knowledge Base', desc: 'SOPs, Policies & Resources' },
          { id: 'forum', label: 'Peer Discussion Forum', desc: 'Q&As & resource sharing' }
        ];
      default:
        return [];
    }
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('repository'); // 'repository', 'courses', 'knowledge', 'forum', 'governance', 'analytics'
  const [activeRole, setActiveRole] = useState('Super Admin'); // 'Super Admin', 'Content Manager', 'Trainer', 'Reviewer', 'Learner'

  // Authorization helper checks
  const canEdit = activeRole !== 'Learner';

  // -------------------------------------------------------------
  // CENTRAL REPOSITORY (LCMS) COMPREHENSIVE MOCK DB
  // -------------------------------------------------------------
  const [repoFiles, setRepoFiles] = useState([
    {
      id: 'REP-001',
      name: 'MoSPI National Training Manual 2026.pdf',
      type: 'pdf',
      size: '14.2 MB',
      version: '2.0',
      downloads: 342,
      views: 1204,
      lastAccessed: '2026-05-31 15:40',
      avgViewingTime: '12.4 mins',
      createdBy: 'Dr. Ramesh Kumar',
      modifiedBy: 'Priya Singh',
      approvalStatus: 'Published',
      status: 'Active',
      tags: ['SOP', 'Manual', 'National Statistics'],
      versions: [
        { version: '2.0', date: '2026-05-10', updatedBy: 'Priya Singh', remarks: 'Major update with 2026 economic indicators and survey formats.', size: '14.2 MB', contentSnippet: 'Section 1: General Statistics Framework. Dynamic data collection mandates. Survey standards 2026 update. Quality audit workflows for regional statistical blocks.' },
        { version: '1.1', date: '2026-02-05', updatedBy: 'Dr. Ramesh Kumar', remarks: 'Minor corrections in sample sizes.', size: '13.8 MB', contentSnippet: 'Section 1: General Statistics Framework. Standard data collection formats. Survey standards 2025 version. Core methodologies for national surveys.' },
        { version: '1.0', date: '2025-11-20', updatedBy: 'Dr. Ramesh Kumar', remarks: 'Initial release for training.', size: '13.5 MB', contentSnippet: 'Section 1: General Statistics Framework. Preliminary guidelines for data collection. Basic templates and regional training outlines.' }
      ],
      metadata: {
        description: 'Comprehensive manual detailing MoSPI’s official procedures, statistical methodologies, and data collection frameworks for trainees and field officers.',
        author: 'National Statistical Office (NSO)',
        publisher: 'MoSPI Press',
        creationDate: '2025-11-20',
        lastModifiedDate: '2026-05-10',
        course: 'National Statistical Frameworks',
        lesson: 'Lesson 1: Introduction to Data Standards',
        topic: 'Topic 1.2: Official Statistical Framework',
        difficulty: 'Intermediate',
        duration: '3 hours',
        learningObjective: 'Understand standard methodologies used in national level data aggregation and census scheduling.',
        department: 'Agriculture',
        division: 'Training & Development Wing',
        program: 'Foundation Training Program 2026',
        category: 'Course Material',
        keywords: ['mospi', 'statistics', 'survey', 'field manual', 'data collection'],
        language: 'English'
      }
    },
    {
      id: 'REP-002',
      name: 'Official Procurement Best Practices SOP.docx',
      type: 'docx',
      size: '2.8 MB',
      version: '1.1',
      downloads: 189,
      views: 520,
      lastAccessed: '2026-05-30 11:20',
      avgViewingTime: '6.8 mins',
      createdBy: 'Priya Singh',
      modifiedBy: 'Priya Singh',
      approvalStatus: 'Published',
      status: 'Active',
      tags: ['Procurement', 'Finance', 'SOP', 'Compliance'],
      versions: [
        { version: '1.1', date: '2026-03-12', updatedBy: 'Priya Singh', remarks: 'Aligned with new GeM portal procurement regulations.', size: '2.8 MB', contentSnippet: 'PROCUREMENT PROCESSES AND GEM INTEGRATION GUIDELINES.\n1. Target approval criteria based on Rule 144 of GFR.\n2. Visual documentation requirements for bids exceeding INR 5,00,000.' },
        { version: '1.0', date: '2025-08-15', updatedBy: 'Priya Singh', remarks: 'Initial release.', size: '2.5 MB', contentSnippet: 'PROCUREMENT PROCESSES GUIDELINES.\n1. Standards for offline and online bid procedures.\n2. General Financial Rules (GFR) references.' }
      ],
      metadata: {
        description: 'Standard Operating Procedure outlining purchasing workflows, financial guidelines, and GeM portal integrations for training institutions.',
        author: 'Finance & Purchase Committee',
        publisher: 'Internal Publications',
        creationDate: '2025-08-15',
        lastModifiedDate: '2026-03-12',
        course: 'Administrative Financial Operations',
        lesson: 'Lesson 3: Procurement & Vendor Channels',
        topic: 'Topic 3.1: GeM Integration Rules',
        difficulty: 'Advanced',
        duration: '1.5 hours',
        learningObjective: 'Learn to successfully draft and execute procurement templates in compliance with public audit laws.',
        department: 'Financial Procurement',
        division: 'Internal Audits Group',
        program: 'Administrative Excellence',
        category: 'SOP',
        keywords: ['procurement', 'finance', 'gem portal', 'gfr', 'auditing'],
        language: 'English'
      }
    },
    {
      id: 'REP-003',
      name: 'District-wise Survey Response Rates Q1.xlsx',
      type: 'xlsx',
      size: '1.4 MB',
      version: '1.0',
      downloads: 98,
      views: 210,
      lastAccessed: '2026-05-28 09:15',
      avgViewingTime: '15.2 mins',
      createdBy: 'Amit Kumar Sharma',
      modifiedBy: 'Amit Kumar Sharma',
      approvalStatus: 'Published',
      status: 'Active',
      tags: ['Data Sheet', 'Surveys', 'Excel', 'Quarterly Reports'],
      versions: [
        { version: '1.0', date: '2026-04-18', updatedBy: 'Amit Kumar Sharma', remarks: 'Q1 raw aggregated dataset.', size: '1.4 MB', contentSnippet: 'District Center Targets and Surveys Data.\nDelhi North: Target 500, Response 480 (96%)\nDelhi South: Target 600, Response 520 (86.6%)\nMumbai Central: Target 800, Response 760 (95%)' }
      ],
      metadata: {
        description: 'Aggregated dataset displaying response rates across quarterly economic survey schedules for all state units.',
        author: 'Data Processing Division',
        publisher: 'Internal Server Sync',
        creationDate: '2026-04-18',
        lastModifiedDate: '2026-04-18',
        course: 'Macroeconomics & Survey Aggregation',
        lesson: 'Lesson 4: Field Survey Computations',
        topic: 'Topic 4.3: District Data Verification',
        difficulty: 'Advanced',
        duration: '4 hours',
        learningObjective: 'Analyze spatial and district-level variance in statistical response matrices.',
        department: 'Economic Division',
        division: 'Field Operations Wing',
        program: 'Foundation Training Program 2026',
        category: 'Data Sheet',
        keywords: ['surveys', 'district data', 'xlsx', 'responses', 'statistics'],
        language: 'English'
      }
    },
    {
      id: 'REP-004',
      name: 'Sample Field Training Video Lecture.mp4',
      type: 'mp4',
      size: '48.5 MB',
      version: '1.0',
      downloads: 412,
      views: 2451,
      lastAccessed: '2026-05-31 16:10',
      avgViewingTime: '22.8 mins',
      createdBy: 'Dr. Ramesh Kumar',
      modifiedBy: 'Dr. Ramesh Kumar',
      approvalStatus: 'Published',
      status: 'Active',
      tags: ['Video', 'Lecture', 'Field Orientation'],
      versions: [
        { version: '1.0', date: '2025-10-05', updatedBy: 'Dr. Ramesh Kumar', remarks: 'Initial video release.', size: '48.5 MB', contentSnippet: '[Interactive Video Stream Mockup Canvas]\nOrientation module running at 24fps.\nFocus: Conducting field interviews with high reliability statistics.' }
      ],
      metadata: {
        description: 'Interactive lecture recording demonstrating proper field surveying etiquettes, questioning guidelines, and data entry orientation.',
        author: 'National Training Faculty',
        publisher: 'NSSTA Production Studio',
        creationDate: '2025-10-05',
        lastModifiedDate: '2025-10-05',
        course: 'Field Survey Methodologies',
        lesson: 'Lesson 1: Introduction to Fieldwork',
        topic: 'Topic 1.1: Ethical Participant Engagements',
        difficulty: 'Beginner',
        duration: '1.2 hours',
        learningObjective: 'Observe real-world field survey sessions and avoid standard survey bias errors.',
        department: 'Economic Division',
        division: 'Trainees Orientation Cell',
        program: 'Foundation Training Program 2026',
        category: 'Video Lecture',
        keywords: ['fieldwork', 'video', 'orientation', 'mospi', 'ethical surveying'],
        language: 'Hindi / English'
      }
    },
    {
      id: 'REP-005',
      name: 'Incident Response & Data Security Protocol.pdf',
      type: 'pdf',
      size: '4.2 MB',
      version: '1.2',
      downloads: 24,
      views: 89,
      lastAccessed: '2026-05-31 10:04',
      avgViewingTime: '9.4 mins',
      createdBy: 'Sanjay Deshmukh',
      modifiedBy: 'Sanjay Deshmukh',
      approvalStatus: 'Review',
      status: 'Quarantine',
      tags: ['Security', 'IT', 'IT Policy', 'Compliance'],
      versions: [
        { version: '1.2', date: '2026-05-25', updatedBy: 'Sanjay Deshmukh', remarks: 'Updated to include national cloud security guidelines.', size: '4.2 MB', contentSnippet: 'DATA PROTECTION AND INCIDENT WORKFLOWS.\nAll endpoints must deploy GovThreatGuard agent.\nIncident escalation times set to under 45 minutes.' },
        { version: '1.0', date: '2025-12-01', updatedBy: 'Sanjay Deshmukh', remarks: 'Initial security outline.', size: '3.8 MB', contentSnippet: 'DATA PROTECTION BASICS.\nPassword guidelines and encryption rules.' }
      ],
      metadata: {
        description: 'Critical cyber security procedures and escalation matrices for LMS administrative supervisors and hosting administrators.',
        author: 'IT Security Cell',
        publisher: 'NIC NIC NIC',
        creationDate: '2025-12-01',
        lastModifiedDate: '2026-05-25',
        course: 'Information Security Regulations',
        lesson: 'Lesson 2: Server Security Safeguards',
        topic: 'Topic 2.4: Threat Mitigation Paths',
        difficulty: 'Advanced',
        duration: '2.5 hours',
        learningObjective: 'Implement immediate threat containment protocols in event of credential compromises.',
        department: 'IT Security & Support',
        division: 'Systems Security Division',
        program: 'Administrative Excellence',
        category: 'Policy Document',
        keywords: ['security', 'incidents', 'encryption', 'threat mitigation', 'nic'],
        language: 'English'
      }
    }
  ]);

  // Shared Filter and Modals states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(null);
  const [showMetadataDrawer, setShowMetadataDrawer] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(['REP-001', 'REP-003']);
  const [activeSector, setActiveSector] = useState('All Wings');

  const handleUpdateMetadata = (fileId, updatedFields) => {
    setRepoFiles(prev => prev.map(f => f.id === fileId ? { ...f, ...updatedFields } : f));
  };

  const handleAddVersion = (fileId, nextVer, newRev) => {
    setRepoFiles(prev => prev.map(f => {
      if (f.id === fileId) {
        return {
          ...f,
          version: nextVer,
          versions: [newRev, ...f.versions]
        };
      }
      return f;
    }));
  };

  // -------------------------------------------------------------
  // COURSE-LESSON-TOPIC HIERARCHICAL STRUCTURE
  // -------------------------------------------------------------
  const [coursesData, setCoursesData] = useState([
    {
      id: 'CRS-001',
      code: 'CRS-FTP-26',
      title: 'Foundation Training Program 2026',
      name: 'Foundation Training Program 2026',
      lessons: [
        {
          id: 'LES-101',
          title: 'Lesson 1: Official Statistical Frameworks',
          sequence: 1,
          topics: [
            { id: 'TPC-201', title: '1.1 Principles of Official Statistics', content: '# UN Principles of Official Statistics\n\nOfficial statistics provide an indispensable element in the information system of a democratic society.\n\nRule 1: Impartial compilation and accessibility.' },
            { id: 'TPC-202', title: '1.2 Statutory Survey Mandates', content: '# Statutory Survey Conduct Regulations\n\nUnder the Collection of Statistics Act, 2008, officers possess full authorization.' }
          ]
        }
      ]
    },
    {
      id: 'CRS-002',
      code: 'CRS-GEM-PR',
      title: 'Government Procurement & Financial Audits',
      name: 'Government Procurement & Financial Audits',
      lessons: [
        {
          id: 'LES-201',
          title: 'Lesson 1: General Financial Rules (GFR)',
          sequence: 1,
          topics: [
            { id: 'TPC-301', title: '1.1 Procurement Codes & Rules', content: '# Procurement Codes & Rules\n\nRule 144 compliance framework guidelines.' }
          ]
        }
      ]
    }
  ]);

  const [selectedCourseId, setSelectedCourseId] = useState('CRS-001');
  const [selectedLessonId, setSelectedLessonId] = useState('LES-101');
  const [selectedTopicId, setSelectedTopicId] = useState('TPC-201');
  const [editingTopicContent, setEditingTopicContent] = useState('');

  // Course outline tree action handlers
  const handleAddCourse = () => {
    const newId = `CRS-0${coursesData.length + 1}`;
    const newCourse = {
      id: newId,
      code: `CRS-NEW-${Math.floor(100 + Math.random() * 900)}`,
      title: 'New Course Syllabus ' + (coursesData.length + 1),
      name: 'New Course Syllabus ' + (coursesData.length + 1),
      lessons: []
    };
    setCoursesData([...coursesData, newCourse]);
    setSelectedCourseId(newId);
    setSelectedLessonId('');
    setSelectedTopicId('');
    logAuditAction('Create Course', `Created new Course entity "${newCourse.title}" as Draft.`);
  };

  const handleAddLesson = (courseId) => {
    const activeCourse = coursesData.find(c => c.id === courseId);
    if (!activeCourse) return;
    const newLes = {
      id: `LES-${Math.floor(200 + Math.random() * 900)}`,
      title: `Lesson ${activeCourse.lessons.length + 1}: New Topic Module`,
      sequence: activeCourse.lessons.length + 1,
      topics: []
    };
    const updatedLessons = [...activeCourse.lessons, newLes];
    const updatedCourses = coursesData.map(c => c.id === courseId ? { ...c, lessons: updatedLessons } : c);
    setCoursesData(updatedCourses);
    setSelectedLessonId(newLes.id);
    logAuditAction('Create Lesson', `Added new Lesson node to Course ID: ${courseId}`);
  };

  const handleAddTopic = (courseId, lessonId) => {
    const activeCourse = coursesData.find(c => c.id === courseId);
    if (!activeCourse) return;
    const activeLesson = activeCourse.lessons.find(l => l.id === lessonId);
    if (!activeLesson) return;

    const newTpc = {
      id: `TPC-${Math.floor(1000 + Math.random() * 8000)}`,
      title: `Topic 1.${activeLesson.topics.length + 1}: Draft Syllabus Topic`,
      sequence: activeLesson.topics.length + 1,
      content: ''
    };
    const updatedTopics = [...activeLesson.topics, newTpc];
    const updatedLessons = activeCourse.lessons.map(l => l.id === lessonId ? { ...l, topics: updatedTopics } : l);
    const updatedCourses = coursesData.map(c => c.id === courseId ? { ...c, lessons: updatedLessons } : c);
    setCoursesData(updatedCourses);
    setSelectedTopicId(newTpc.id);
    setEditingTopicContent('');
    logAuditAction('Create Topic', `Added new Topic leave to Lesson ID: ${lessonId}`);
  };

  const handleSaveTopicContent = (courseId, lessonId, topicId) => {
    const updatedCourses = coursesData.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          lessons: c.lessons.map(l => {
            if (l.id === lessonId) {
              return {
                ...l,
                topics: l.topics.map(t => {
                  if (t.id === topicId) {
                    return { ...t, content: editingTopicContent };
                  }
                  return t;
                })
              };
            }
            return l;
          })
        };
      }
      return c;
    });
    setCoursesData(updatedCourses);
    logAuditAction('Topic Content Compile', `Compiled rich layout page inside topic node ID: ${topicId}`);
    alert('Topic content saved successfully!');
  };

  const handleOrderSequence = (courseId, lessonId, topicId, direction) => {
    const activeCourse = coursesData.find(c => c.id === courseId);
    if (!activeCourse) return;

    if (topicId) {
      const activeLesson = activeCourse.lessons.find(l => l.id === lessonId);
      if (!activeLesson) return;
      const index = activeLesson.topics.findIndex(t => t.id === topicId);
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= activeLesson.topics.length) return;

      const updatedTopics = [...activeLesson.topics];
      const temp = updatedTopics[index];
      updatedTopics[index] = updatedTopics[nextIndex];
      updatedTopics[nextIndex] = temp;

      const updatedLessons = activeCourse.lessons.map(l => l.id === lessonId ? { ...l, topics: updatedTopics } : l);
      const updatedCourses = coursesData.map(c => c.id === courseId ? { ...c, lessons: updatedLessons } : c);
      setCoursesData(updatedCourses);
    } else {
      const index = activeCourse.lessons.findIndex(l => l.id === lessonId);
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= activeCourse.lessons.length) return;

      const updatedLessons = [...activeCourse.lessons];
      const temp = updatedLessons[index];
      updatedLessons[index] = updatedLessons[nextIndex];
      updatedLessons[nextIndex] = temp;

      const updatedCourses = coursesData.map(c => c.id === courseId ? { ...c, lessons: updatedLessons } : c);
      setCoursesData(updatedCourses);
    }
  };

  // -------------------------------------------------------------
  // PEER-TO-PEER DISCUSSION FORUM STATE
  // -------------------------------------------------------------
  const [forumThreads, setForumThreads] = useState([
    {
      id: 'THR-001',
      title: 'Simplifying Rule 144 of GFR for State Procurements',
      author: 'Priya Singh',
      role: 'Content Manager',
      authorRole: 'Content Manager',
      content: 'Can someone outline how the new GeM portal revisions impact GFR Rule 144? We need a standardized checklist for regional trainees.',
      date: '2026-05-30',
      category: 'Administrative FAQ',
      isPinned: true,
      isLocked: false,
      replies: [
        {
          id: 'REP-501',
          author: 'Amit Kumar Sharma',
          role: 'Trainer',
          date: '2026-05-31',
          text: 'The primary adjustment is that offline audits are restricted. Everything must be logged live on the portal.'
        }
      ]
    },
    {
      id: 'THR-002',
      title: 'Optimal Strata Sizing inside Agricultural Censuses',
      author: 'Dr. Ramesh Kumar',
      role: 'Trainer',
      authorRole: 'Trainer',
      content: 'We are compiling new data layouts for the agriculture training track. What are the recommended sampling errors margins?',
      date: '2026-05-28',
      category: 'Sampling Methodology',
      isPinned: false,
      isLocked: false,
      replies: []
    }
  ]);

  const [activeForumCategory, setActiveForumCategory] = useState('All Topics');
  const [selectedThreadId, setSelectedThreadId] = useState('');
  const [forumSearchQuery, setForumSearchQuery] = useState('');
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newThreadCategory, setNewThreadCategory] = useState('Sampling Methodology');
  const [newReplyText, setNewReplyText] = useState('');
  const [replyQuoteText, setReplyQuoteText] = useState('');

  const handleTogglePin = (threadId) => {
    setForumThreads(forumThreads.map(t => t.id === threadId ? { ...t, isPinned: !t.isPinned } : t));
    logAuditAction('Forum Pin', `Toggled Pin on Thread ID: ${threadId}`);
  };

  const handleToggleLock = (threadId) => {
    setForumThreads(forumThreads.map(t => t.id === threadId ? { ...t, isLocked: !t.isLocked } : t));
    logAuditAction('Forum Lock', `Toggled Lock on Thread ID: ${threadId}`);
  };

  const handleCreateThread = () => {
    if (!newThreadTitle || !newThreadContent) {
      alert('Please fill out all thread details.');
      return;
    }
    const newThread = {
      id: `THR-0${forumThreads.length + 1}`,
      title: newThreadTitle,
      content: newThreadContent,
      category: newThreadCategory,
      author: activeRole + ' Simulator',
      authorRole: activeRole,
      date: new Date().toISOString().substring(0, 10),
      isPinned: false,
      isLocked: false,
      replies: []
    };
    setForumThreads([newThread, ...forumThreads]);
    setSelectedThreadId(newThread.id);
    setNewThreadTitle('');
    setNewThreadContent('');
    logAuditAction('Forum Thread Create', `Created P2P thread: ${newThreadTitle}`);
  };

  const handlePostReply = (threadId) => {
    if (!newReplyText) return;
    const newReply = {
      id: `REP-${Math.floor(Math.random() * 10000)}`,
      author: activeRole + ' Simulator',
      role: activeRole,
      date: new Date().toISOString().substring(0, 10),
      quote: replyQuoteText || undefined,
      text: newReplyText
    };
    setForumThreads(forumThreads.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          replies: [...t.replies, newReply]
        };
      }
      return t;
    }));
    setNewReplyText('');
    setReplyQuoteText('');
    logAuditAction('Forum Reply Post', `Posted response reply to thread ID: ${threadId}`);
  };

  // -------------------------------------------------------------
  // IMMUTABLE COMPLIANCE AUDIT TRAIL LOGS
  // -------------------------------------------------------------
  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-309', timestamp: '2026-05-31 16:10', operator: 'Priya Singh', role: 'Content Manager', action: 'Upload Document', details: 'Uploaded MoSPI National Training Manual 2026.pdf (v2.0)' },
    { id: 'LOG-308', timestamp: '2026-05-31 15:44', operator: 'Sanjay Deshmukh', role: 'Super Admin', action: 'Governance Review', details: 'Approved Official Procurement Best Practices SOP.docx' },
    { id: 'LOG-307', timestamp: '2026-05-31 14:15', operator: 'Dr. Ramesh Kumar', role: 'Trainer', action: 'Create Course', details: 'Added course Foundations of official statistics 2026' },
    { id: 'LOG-306', timestamp: '2026-05-31 11:20', operator: 'Amit Kumar Sharma', role: 'Trainer', action: 'Topic Content Compile', details: 'Compiled rich text objects inside TPC-201' }
  ]);

  const logAuditAction = (action, details) => {
    const newLog = {
      id: `LOG-${Math.floor(400 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      operator: activeRole + ' Simulator',
      role: activeRole,
      action: action,
      details: details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Bookmarking handler
  const handleToggleBookmark = (fileId) => {
    if (bookmarkedIds.includes(fileId)) {
      setBookmarkedIds(bookmarkedIds.filter(id => id !== fileId));
    } else {
      setBookmarkedIds([...bookmarkedIds, fileId]);
    }
  };

  // Quarantine releasing approval queue
  const handleQuarantineAction = (fileId, action) => {
    if (action === 'approve' || action === 'Active') {
      const updated = repoFiles.map(f => {
        if (f.id === fileId) {
          return { ...f, status: 'Active', approvalStatus: 'Published' };
        }
        return f;
      });
      setRepoFiles(updated);
      logAuditAction('Governance Review', `Released & published quarantined file ID: ${fileId}`);
      alert('Document successfully validated, malware threat-scan signature cleared, and published!');
    } else if (action === 'delete' || action === 'Reject') {
      const updated = repoFiles.filter(f => f.id !== fileId);
      setRepoFiles(updated);
      logAuditAction('Governance Review', `Deleted/Rejected quarantined/draft file ID: ${fileId}`);
      alert('Draft document deleted/rejected successfully.');
    }
  };

  // Upload handler
  const handleUploadSubmit = (formData) => {
    setIsUploading(true);
    setUploadProgress(20);
    setTimeout(() => setUploadProgress(50), 300);
    setTimeout(() => setUploadProgress(85), 600);
    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
      setUploadSuccess(true);

      const newFile = {
        id: `REP-0${100 + repoFiles.length + 1}`,
        name: formData.name + (formData.name.includes('.') ? '' : '.' + formData.type),
        type: formData.type,
        size: '3.4 MB',
        version: '1.0',
        downloads: 0,
        views: 1,
        lastAccessed: 'Just Now',
        avgViewingTime: '0.0 mins',
        createdBy: activeRole,
        modifiedBy: activeRole,
        approvalStatus: 'Review',
        status: 'Quarantine',
        tags: formData.tagsString.split(',').map(s => s.trim()).filter(Boolean),
        versions: [
          { version: '1.0', date: new Date().toISOString().substring(0, 10), updatedBy: activeRole, remarks: 'Initial release.', size: '3.4 MB', contentSnippet: 'Verification and security check draft upload. Scanning complete.' }
        ],
        metadata: {
          description: formData.description || 'No description supplied.',
          author: formData.author || 'NSSTA Scholar',
          publisher: 'LMS Academic Drive',
          creationDate: new Date().toISOString().substring(0, 10),
          lastModifiedDate: new Date().toISOString().substring(0, 10),
          course: formData.course || 'Unassigned Course',
          lesson: 'Lesson 1',
          topic: 'Topic 1',
          difficulty: formData.difficulty || 'Intermediate',
          duration: '1 hour',
          learningObjective: 'General reference reading.',
          department: formData.department || 'Statistics & Surveys',
          division: 'Academic Cell',
          program: 'Standard Trainee Curriculum',
          category: formData.category || 'SOP',
          keywords: ['mospi', 'new upload'],
          language: 'English'
        }
      };

      setRepoFiles([newFile, ...repoFiles]);
      logAuditAction('Upload Document', `Uploaded new asset ${newFile.name} quarantined under scans.`);
    }, 1000);
  };

  // Restore version history handler
  const handleRestoreVersion = (versionStr) => {
    if (!showCompareModal) return;
    const updated = repoFiles.map(file => {
      if (file.id === showCompareModal.id) {
        return { ...file, version: versionStr };
      }
      return file;
    });
    setRepoFiles(updated);
    setShowCompareModal(null);
    logAuditAction('Version Control', `Restored document ${showCompareModal.name} to historical version: ${versionStr}`);
    alert(`Document restored to Version ${versionStr} successfully!`);
  };

  // Simulated download increment
  const handleDownloadFile = (file) => {
    const updated = repoFiles.map(f => {
      if (f.id === file.id) {
        return { ...f, downloads: (f.downloads || 0) + 1 };
      }
      return f;
    });
    setRepoFiles(updated);
    logAuditAction('Download Document', `Downloaded file: ${file.name}`);
    alert(`Simulating local download for: ${file.name}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };

  return (
    <div className={`w-full min-h-screen flex font-sans relative transition-colors duration-200 ${
      theme === 'light' ? 'bg-slate-50/70' : 'bg-slate-100'
    }`}>
      
      {/* 1. Left KMS Dashboard Sidebar Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col select-none shrink-0 border-r transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 h-screen lg:h-auto ${
        theme === 'light'
          ? 'bg-white text-slate-800 border-slate-200/80 shadow-xs'
          : 'bg-[#08493d] text-white border-[#053229]'
      }`}>
        <div className={`p-6 border-b flex justify-between items-center ${
          theme === 'light' ? 'border-slate-100' : 'border-[#053229]/60'
        }`}>
          <div>
            <h2 className={`text-lg font-extrabold tracking-tight flex items-center gap-1.5 ${
              theme === 'light' ? 'text-purple-600' : 'text-yellow-400'
            }`}>
              <svg className={`w-5 h-5 shrink-0 ${theme === 'light' ? 'text-purple-500' : 'text-yellow-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Knowledge System
            </h2>
            <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
              theme === 'light' ? 'text-purple-400' : 'text-emerald-400'
            }`}>LCMS + Central Repository</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className={`lg:hidden hover:text-slate-900 ${
            theme === 'light' ? 'text-slate-450' : 'text-slate-300'
          }`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Account Profile Card embedded beautifully */}
        <div className={`px-5 py-4 mx-4 my-3 rounded-xl border shadow-inner text-left ${
          theme === 'light'
            ? 'bg-slate-50 border-slate-200/80 text-slate-800 shadow-2xs'
            : 'bg-gradient-to-br from-[#063f33]/90 to-[#042d25]/90 border-white/10 text-white'
        }`}>
          <div className="flex items-center gap-3">
            {/* Avatar block with HSL gradient border */}
            <div className={`w-10 h-10 rounded-xl p-0.5 shadow-md flex items-center justify-center shrink-0 bg-gradient-to-tr ${
              theme === 'light' ? 'from-purple-500 to-indigo-500' : 'from-emerald-500 to-blue-500'
            }`}>
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-black text-sm ${
                theme === 'light' ? 'bg-white text-purple-600' : 'bg-[#053229] text-white'
              }`}>
                {user.name?.[0] || 'A'}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className={`font-extrabold text-xs truncate leading-tight ${
                theme === 'light' ? 'text-slate-800' : 'text-white'
              }`}>{user.name}</p>
              <p className={`text-[9px] font-bold truncate mt-0.5 ${
                theme === 'light' ? 'text-purple-650' : 'text-emerald-400/80'
              }`}>{getRoleLabel(user.role)}</p>
            </div>
          </div>
        </div>

        {/* Roles selector swapper simulation */}
        <div className={`mx-4 mt-1 p-3 border rounded-xl space-y-1.5 text-xs text-left ${
          theme === 'light'
            ? 'bg-slate-50 border-slate-200/80 text-slate-700 shadow-2xs'
            : 'bg-[#063b31] border-emerald-800 text-emerald-100'
        }`}>
          <label className="block font-bold">Scope Role Permissions:</label>
          <select 
            value={activeRole} 
            onChange={(e) => {
              const newRole = e.target.value;
              setActiveRole(newRole);
              const links = getSidebarLinks(newRole);
              if (links.length > 0) {
                setActiveTab(links[0].id);
              }
            }}
            className={`w-full border rounded px-2.5 py-1.5 font-bold focus:outline-none transition-colors ${
              theme === 'light'
                ? 'bg-white border-slate-250 text-slate-800 focus:border-purple-400'
                : 'bg-[#053229] border-emerald-800 text-white'
            }`}
          >
            <option value="Super Admin">Super Admin (System Control)</option>
            <option value="Content Manager">Content Manager</option>
            <option value="Trainer">Trainer / Faculty</option>
            <option value="Reviewer">Reviewer (Auditor)</option>
            <option value="Learner">Learner (Read-Only)</option>
          </select>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {getSidebarLinks(activeRole).map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => { setActiveTab(link.id); setIsSidebarOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? theme === 'light'
                      ? 'bg-purple-600 text-white shadow-sm shadow-purple-100'
                      : 'bg-blue-600 text-white shadow-sm'
                    : theme === 'light'
                      ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      : 'text-slate-300 hover:bg-[#053d32]/60 hover:text-white'
                }`}
              >
                <p className="text-xs sm:text-sm leading-tight">{link.label}</p>
                <p className={`text-[9px] font-normal leading-none mt-0.5 ${
                  isActive
                    ? theme === 'light' ? 'text-purple-200' : 'text-blue-200'
                    : theme === 'light' ? 'text-slate-405' : 'text-slate-400'
                }`}>{link.desc}</p>
              </button>
            );
          })}

          <div className={`border-t my-4 pt-4 space-y-2 ${
            theme === 'light' ? 'border-slate-100' : 'border-[#053229]/60'
          }`}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4">Workspace Options</p>
            
            <button onClick={() => navigate('/admin/dashboard')} className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-bold text-left cursor-pointer transition-colors ${
              theme === 'light'
                ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                : 'text-slate-300 hover:bg-[#053d32]/60 hover:text-white'
            }`}>
              <svg className={`w-4 h-4 shrink-0 ${theme === 'light' ? 'text-purple-500' : 'text-blue-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back to Admin Dashboard</span>
            </button>

            <button onClick={() => navigate('/')} className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-bold text-left cursor-pointer transition-colors ${
              theme === 'light'
                ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                : 'text-slate-300 hover:bg-[#053d32]/60 hover:text-white'
            }`}>
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Public Site</span>
            </button>

            <button onClick={() => navigate('/admin/users')} className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-bold text-left cursor-pointer transition-colors ${
              theme === 'light'
                ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                : 'text-slate-300 hover:bg-[#053d32]/60 hover:text-white'
            }`}>
              <svg className={`w-4 h-4 shrink-0 ${theme === 'light' ? 'text-purple-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>User Directory</span>
            </button>

            <button onClick={() => navigate('/admin/e-hostel')} className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-bold text-left cursor-pointer transition-colors ${
              theme === 'light'
                ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                : 'text-slate-300 hover:bg-[#053d32]/60 hover:text-white'
            }`}>
              <svg className={`w-4 h-4 shrink-0 ${theme === 'light' ? 'text-purple-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
              </svg>
              <span>e-Hostel Logistics</span>
            </button>

            <button onClick={handleLogout} className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-bold text-left cursor-pointer transition-colors ${
              theme === 'light'
                ? 'text-rose-600 hover:bg-rose-50'
                : 'text-rose-300 hover:bg-rose-900/30 hover:text-white'
            }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        <div className={`p-4 border-t text-center text-[10px] ${
          theme === 'light'
            ? 'border-slate-100 bg-slate-50 text-slate-500'
            : 'border-[#053229]/60 bg-[#04332b] text-slate-400'
        }`}>
          <span>LMS Knowledge Drive</span>
          <span className="block text-[8px] text-slate-500 mt-0.5">Version 3.2.1 • Active</span>
        </div>
      </aside>

      {/* Backdrop overlay for mobile drawer */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/40 z-30 lg:hidden" />
      )}      {/* 2. Main Portal Panel Container on the Right */}
      <div className="flex-grow flex flex-col min-h-screen overflow-hidden w-full">
              {/* Header bar */}
        <header className={`border-b py-3.5 px-6 sm:px-8 flex justify-between items-center select-none shadow-2xs z-30 transition-all ${
          theme === 'light' ? 'bg-white border-slate-200/80 shadow-3xs' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              title="Back to Admin Dashboard"
              className={`mr-1.5 p-1.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer focus:outline-none inline-flex items-center justify-center shrink-0 border border-transparent hover:border-gray-200 shadow-3xs hover:shadow-xs ${
                theme === 'light' ? 'text-slate-600 hover:text-purple-600' : 'text-slate-650 hover:text-[#08493d]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              LMS Knowledge & Content Portal
              <span className={`hidden sm:inline-block text-[10px] border px-2 py-0.5 rounded-full font-bold uppercase ${
                theme === 'light'
                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {activeRole} Scope
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Dynamic Premium Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all cursor-pointer focus:outline-none border shadow-3xs flex items-center gap-1.5 ${
                theme === 'light'
                  ? 'bg-white hover:bg-slate-50 border-slate-205 text-slate-650 hover:text-slate-900'
                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-550 hover:text-slate-800'
              }`}
              title={`Switch to ${theme === 'light' ? 'Dark Green' : 'Light White'} Theme`}
            >
              {theme === 'light' ? (
                <>
                  <svg className="w-4.5 h-4.5 text-purple-600 transition-transform duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="text-[9px] uppercase font-bold text-slate-700 tracking-wider hidden sm:inline">Dark Green</span>
                </>
              ) : (
                <>
                  <svg className="w-4.5 h-4.5 text-amber-500 transition-transform duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                  <span className="text-[9px] uppercase font-bold text-slate-600 tracking-wider hidden sm:inline">Light White</span>
                </>
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-655 transition-colors relative cursor-pointer focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                  2
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2.5 w-80 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-40 text-xs text-slate-700 animate-fadeIn text-left">
                  <div className="px-4 py-2 border-b border-gray-100 font-extrabold text-slate-800 flex justify-between items-center">
                    <span>Recent Notifications</span>
                    <span className={`text-[10px] hover:underline cursor-pointer ${theme === 'light' ? 'text-purple-800' : 'text-emerald-800'}`}>Clear all</span>
                  </div>
                  <ul className="divide-y divide-gray-50 max-h-64 overflow-y-auto font-medium">
                    <li className="px-4 py-2.5 hover:bg-slate-50 flex items-start gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${theme === 'light' ? 'bg-purple-650' : 'bg-emerald-600'}`}></div>
                      <div>
                        <p className="font-bold">New SOP Document Published</p>
                        <p className="text-[9px] text-slate-400">Just Now</p>
                      </div>
                    </li>
                    <li className="px-4 py-2.5 hover:bg-slate-50 flex items-start gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${theme === 'light' ? 'bg-purple-650' : 'bg-emerald-600'}`}></div>
                      <div>
                        <p className="font-bold">Priya Singh Uploaded training manual</p>
                        <p className="text-[9px] text-slate-400">10 mins ago</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }}
                className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-slate-50 border border-gray-200 rounded-xl transition-all cursor-pointer focus:outline-none select-none shadow-3xs"
              >
                <div className={`w-8 h-8 rounded-full p-0.5 shadow-sm flex items-center justify-center shrink-0 bg-gradient-to-tr ${
                  theme === 'light' ? 'from-purple-500 to-indigo-500' : 'from-emerald-500 to-blue-500'
                }`}>
                  <div className={`w-full h-full rounded-full flex items-center justify-center font-black text-xs ${
                    theme === 'light' ? 'bg-white text-purple-650' : 'bg-white text-[#08493d]'
                  }`}>
                    {user.name?.[0] || 'A'}
                  </div>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-extrabold text-slate-800 leading-tight">{user.name}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none mt-0.5">{getRoleLabel(user.role)}</p>
                </div>
                <svg className={`w-4 h-4 text-slate-500 transform transition-transform duration-150 ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-40 text-xs text-slate-700 font-semibold animate-fadeIn overflow-hidden text-left">
                  <div className="px-4 py-3 border-b border-gray-100 bg-slate-50/50">
                    <p className="font-extrabold text-slate-855 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{user.email}</p>
                  </div>
                  <button onClick={() => navigate('/admin/dashboard')} className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors font-bold flex items-center gap-2 ${
                    theme === 'light' ? 'text-purple-700' : 'text-emerald-800'
                  }`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Admin Dashboard
                  </button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 border-t border-gray-100 text-rose-700 hover:bg-rose-50 font-extrabold transition-colors cursor-pointer flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Core Workspace Panel Scroll Container */}
        <main className="flex-grow p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-70px)]">

          {activeTab === 'learner_dashboard' && (
            <LearnerDashboard
              repoFiles={repoFiles}
              bookmarkedIds={bookmarkedIds}
              setSelectedFile={setSelectedFile}
              coursesData={coursesData}
              onDownload={handleDownloadFile}
              setActiveTab={setActiveTab}
              setSelectedCourseId={setSelectedCourseId}
            />
          )}

                    {activeTab === 'repository' && (
            <div className="space-y-6">
              <SearchFiltering
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterType={filterType}
                setFilterType={setFilterType}
              />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                  <ContentRepository
                    repoFiles={repoFiles}
                    searchQuery={searchQuery}
                    filterType={filterType}
                    activeRole={activeRole}
                    setSelectedFile={setSelectedFile}
                    setShowCompareModal={setShowCompareModal}
                    setShowMetadataDrawer={setShowMetadataDrawer}
                    handleQuarantineAction={handleQuarantineAction}
                    setShowUploadModal={setShowUploadModal}
                    onDownload={handleDownloadFile}
                  />
                </div>
                <div className="lg:col-span-4 space-y-6">
                  <FileManagement
                    activeRole={activeRole}
                    setShowUploadModal={setShowUploadModal}
                    onUploadSuccess={(newFile) => setRepoFiles(prev => [newFile, ...prev])}
                    logAuditAction={logAuditAction}
                  />
                  {selectedFile && (
                    <>
                      <VersionControl
                        activeFile={selectedFile}
                        activeRole={activeRole}
                        onAddVersion={handleAddVersion}
                        logAuditAction={logAuditAction}
                      />
                      <MetadataTagging
                        activeFile={selectedFile}
                        activeRole={activeRole}
                        onUpdateMetadata={handleUpdateMetadata}
                        logAuditAction={logAuditAction}
                      />
                      <ResourceSharing
                        activeFile={selectedFile}
                        activeRole={activeRole}
                        logAuditAction={logAuditAction}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                <CourseManagement
                  coursesData={coursesData}
                  selectedCourseId={selectedCourseId}
                  setSelectedCourseId={setSelectedCourseId}
                  activeRole={activeRole}
                  handleAddCourse={handleAddCourse}
                  handleOrderSequence={(type, innerIdx, index, nextIndex) => {
                    if (type === 'courses') {
                      handleOrderSequence(selectedCourseId, null, null, index < nextIndex ? 'down' : 'up');
                    }
                  }}
                />
                {coursesData.find(c => c.id === selectedCourseId) && (
                  <LessonManagement
                    activeCourse={coursesData.find(c => c.id === selectedCourseId)}
                    selectedLessonId={selectedLessonId}
                    setSelectedLessonId={setSelectedLessonId}
                    activeRole={activeRole}
                    handleAddLesson={() => handleAddLesson(selectedCourseId)}
                    handleOrderSequence={(type, index, nextIndex) => {
                      handleOrderSequence(selectedCourseId, selectedLessonId, null, index < nextIndex ? 'down' : 'up');
                    }}
                  />
                )}
                {coursesData.find(c => c.id === selectedCourseId)?.lessons.find(l => l.id === selectedLessonId) && (
                  <TopicManagement
                    activeLesson={coursesData.find(c => c.id === selectedCourseId).lessons.find(l => l.id === selectedLessonId)}
                    selectedTopicId={selectedTopicId}
                    setSelectedTopicId={(topicId) => {
                      setSelectedTopicId(topicId);
                      const activeTopicObj = coursesData.find(c => c.id === selectedCourseId)?.lessons.find(l => l.id === selectedLessonId)?.topics.find(t => t.id === topicId);
                      if (activeTopicObj) {
                        setEditingTopicContent(activeTopicObj.content);
                      }
                    }}
                    activeRole={activeRole}
                    handleAddTopic={() => handleAddTopic(selectedCourseId, selectedLessonId)}
                    handleOrderSequence={(type, index, nextIndex) => {
                      handleOrderSequence(selectedCourseId, selectedLessonId, selectedTopicId, index < nextIndex ? 'down' : 'up');
                    }}
                  />
                )}
              </div>
              <div className="lg:col-span-8">
                <RichContentEditor
                  activeTopic={coursesData.find(c => c.id === selectedCourseId)?.lessons.find(l => l.id === selectedLessonId)?.topics.find(t => t.id === selectedTopicId)}
                  editingTopicContent={editingTopicContent}
                  setEditingTopicContent={setEditingTopicContent}
                  activeRole={activeRole}
                  handleSaveTopicContent={handleSaveTopicContent}
                />
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <KnowledgeRepository
              repoFiles={repoFiles}
              searchQuery={searchQuery}
              setSelectedFile={setSelectedFile}
              bookmarkedIds={bookmarkedIds}
              handleToggleBookmark={handleToggleBookmark}
              activeSector={activeSector}
              setActiveSector={setActiveSector}
            />
          )}

          {activeTab === 'forum' && (
            <DiscussionForums
              forumThreads={forumThreads}
              setForumThreads={setForumThreads}
              activeForumCategory={activeForumCategory}
              setActiveForumCategory={setActiveForumCategory}
              selectedThreadId={selectedThreadId}
              setSelectedThreadId={setSelectedThreadId}
              activeRole={activeRole}
              user={null}
              forumSearchQuery={forumSearchQuery}
              setForumSearchQuery={setForumSearchQuery}
              handleTogglePin={handleTogglePin}
              handleToggleLock={handleToggleLock}
              newThreadTitle={newThreadTitle}
              setNewThreadTitle={setNewThreadTitle}
              newThreadContent={newThreadContent}
              setNewThreadContent={setNewThreadContent}
              newThreadCategory={newThreadCategory}
              setNewThreadCategory={setNewThreadCategory}
              newReplyText={newReplyText}
              setNewReplyText={setNewReplyText}
              handleCreateThread={handleCreateThread}
              handlePostReply={() => handlePostReply(selectedThreadId)}
              replyQuoteText={replyQuoteText}
              setReplyQuoteText={setReplyQuoteText}
            />
          )}

          {activeTab === 'governance' && (
            <div className="space-y-6">
              <Notifications
                repoFiles={repoFiles}
                forumThreads={forumThreads}
                activeRole={activeRole}
              />
              <ApprovalWorkflow
                repoFiles={repoFiles}
                handleQuarantineAction={handleQuarantineAction}
                activeRole={activeRole}
              />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <AnalyticsReporting
                repoFiles={repoFiles}
                coursesData={coursesData}
                forumThreads={forumThreads}
              />
              <RolePermissionManagement
                activeRole={activeRole}
                setActiveRole={setActiveRole}
              />
              <AuditLogs
                auditLogs={auditLogs}
              />
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-250 py-3.5 px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] sm:text-xs text-slate-400 font-semibold select-none z-30 shadow-inner">
          <span>© 2026 Ministry of Statistics & PI. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-slate-600">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-600">Terms of Use</a>
            <span>•</span>
            <a href="#support" className="hover:text-slate-600">Help & Support</a>
          </div>
        </footer>

      </div>

      {/* Interactive sub-component dialog modals */}
      <FilePreviewModal
        selectedFile={selectedFile}
        onClose={() => setSelectedFile(null)}
        onDownload={handleDownloadFile}
      />

      <VersionCompareModal
        showCompareModal={showCompareModal}
        onClose={() => setShowCompareModal(null)}
        onRestore={handleRestoreVersion}
        canEdit={canEdit}
      />

      <UploadAssetModal
        showUploadModal={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSubmit={handleUploadSubmit}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        uploadSuccess={uploadSuccess}
        setUploadSuccess={setUploadSuccess}
      />

      <MetadataDetailModal
        showMetadataDrawer={showMetadataDrawer}
        onClose={() => setShowMetadataDrawer(null)}
      />

    </div>
  );
}
