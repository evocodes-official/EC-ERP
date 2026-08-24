import React, { useState } from 'react';
import {
  Search,
  HelpCircle,
  BookOpen,
  Mail,
  MessageSquare,
  FileText,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Users,
  Briefcase,
  Wallet,
  FolderKanban,
  ShieldCheck,
  Download,
  Play,
  Clock,
  Headphones,
  ThumbsUp,
  LifeBuoy,
} from 'lucide-react';

const faqs = [
  {
    category: 'Getting Started',
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    questions: [
      {
        q: 'How do I create a new employee record in HR?',
        a: 'Navigate to the HR module from the sidebar. Click the "Add Employee" button in the top-right corner of the Employee Directory section. Fill in the employee details (name, email, department, role, attendance status) and click "Add Employee". The new employee will appear in the directory immediately.',
      },
      {
        q: 'How do I add a new deal in CRM?',
        a: 'Go to the CRM module. Click the Plus (+) icon next to any stage header (Leads, Qualification, Proposal, or Negotiation). A form will appear where you can enter the deal title, value, and details. Click "Add" to create the deal card. You can also click on any card to view/edit its details in a modal.',
      },
      {
        q: 'How do I create a new project task?',
        a: 'Open the Projects module. Click the "Create Task" button in the toolbar above the Kanban board. Fill in the task title, category, due date, and assignee. The task will be added to the "To Do" column. You can drag and drop tasks between columns to update their status.',
      },
      {
        q: 'How do I create an invoice in Finance?',
        a: 'In the Finance module, click the "Create Invoice" button in the top-right corner. A modal will open where you can enter invoice details including client name, amount, and due date. The invoice will appear in the invoices table with a "Pending" status.',
      },
    ],
  },
  {
    category: 'Account & Security',
    icon: ShieldCheck,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    questions: [
      {
        q: 'How do I reset my password?',
        a: 'Go to Settings > Security & Access tab. Scroll to the "Change Admin Master Password" section. Enter your current password and the new password, then click Save. Password changes take effect immediately and you will be logged out of all active sessions.',
      },
      {
        q: 'How do I enable two-factor authentication (2FA)?',
        a: 'Navigate to Settings > Security & Access tab. Find the "Enforce Two-Factor Authentication (2FA)" toggle and switch it on. This will require all team members to authenticate via an OTP app when logging in.',
      },
      {
        q: 'How do I manage API keys for integrations?',
        a: 'Go to Settings > Integrations & API tab. Here you can view and copy your Production Secret Token. You can also see connected external tools like QuickBooks and Salesforce. Use the "Connect" button to link new services.',
      },
    ],
  },
  {
    category: 'CRM & Sales Pipeline',
    icon: Briefcase,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    questions: [
      {
        q: 'How does the Kanban pipeline work?',
        a: 'The CRM pipeline has four stages: Leads, Qualification, Proposal, and Negotiation. Deals move from left to right as they progress. You can edit deal details, add comments, and track deal values. The total deal value and active deal counts update automatically in the KPI cards.',
      },
      {
        q: 'How do I search and sort deals?',
        a: 'Use the search bar above the Kanban board to filter deals by name, value, or details. Use the sort dropdown to order deals by newest first, value (high to low or low to high), or alphabetically by name.',
      },
      {
        q: 'How do I delete or edit a deal card?',
        a: 'Hover over any deal card to reveal the Edit (pencil) and Delete (trash) icons in the top-right corner. Click Edit to modify the deal inline, or click Delete to remove it. You can also click on a card to open a detailed modal with Edit and Delete options.',
      },
    ],
  },
  {
    category: 'Projects & Tasks',
    icon: FolderKanban,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    questions: [
      {
        q: 'How do I move tasks between columns?',
        a: 'Simply drag and drop any task card from one column to another. Tasks can be moved from To Do → In Progress → In Review → Done. The system will update the task status automatically.',
      },
      {
        q: 'How do I view project analytics?',
        a: 'Click the "Analytics" button in the project header to open the analytics modal. It shows total tasks, completion rate, done tasks count, and a column-by-column breakdown of task distribution.',
      },
      {
        q: 'How do I edit or delete a task?',
        a: 'Hover over any task card. Edit and Delete icons will appear in the top-right corner. Click Edit to modify the task details in a modal, or click Delete to remove the task permanently.',
      },
    ],
  },
  {
    category: 'HR & People Management',
    icon: Users,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    questions: [
      {
        q: 'How do I filter employees by department?',
        a: 'In the HR module, use the "All Departments" filter button next to the search bar. Click it to select a specific department. The table will update to show only employees from that department.',
      },
      {
        q: 'How do I export employee data to Excel?',
        a: 'Click the "Export" button in the HR module toolbar. The system will download an Excel file containing all employee records with their name, email, department, role, attendance, performance, and joined date.',
      },
      {
        q: 'How do I view detailed employee information?',
        a: 'Click on any employee row in the table to open the Employee Details modal. It shows their full profile including avatar, department, role, attendance status, email, performance score, and joined date.',
      },
    ],
  },
  {
    category: 'Finance & Invoicing',
    icon: Wallet,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    questions: [
      {
        q: 'How do I track invoice statuses?',
        a: 'The Finance module displays all invoices with their status (Paid, Pending, Overdue). Use the tab navigation to switch between Invoices, Expenses, and Payments views. The KPI cards at the top show revenue, expenses, net profit, and tax overview.',
      },
      {
        q: 'How do I export financial reports?',
        a: 'Go to the Reports module to view comprehensive analytics. Use the "Export All" button to download reports. You can filter by date range and parameter before exporting to get customized reports.',
      },
    ],
  },
];

const guides = [
  {
    title: 'Getting Started with EVO ERP',
    description: 'A comprehensive walkthrough of the platform for new users.',
    duration: '10 min read',
    icon: Play,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'CRM Pipeline Management Guide',
    description: 'Learn how to manage your sales pipeline from lead to close.',
    duration: '8 min read',
    icon: FileText,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    title: 'HR Employee Lifecycle',
    description: 'Complete guide to managing employees from onboarding to offboarding.',
    duration: '12 min read',
    icon: Users,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    title: 'Financial Reporting Best Practices',
    description: 'Tips and tricks for generating accurate financial reports.',
    duration: '6 min read',
    icon: Download,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
];

const HelpContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleFaq = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedFaqs(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isFaqExpanded = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    return expandedFaqs[key] || false;
  };

  // Filter FAQs based on search
  const filteredFaqs = faqs.map((category, _catIdx) => ({
    ...category,
    questions: category.questions.filter(
      (faq) =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => 
    activeCategory === 'all' || 
    category.category.toLowerCase().includes(activeCategory.toLowerCase())
  );

  // Filter guides
  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support Center</h1>
          <p className="text-sm text-gray-500 mt-0.5">Find answers, guides, and support resources for EVO ERP.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors w-fit">
          <Headphones size={15} />
          <span>Contact Support</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for answers, guides, or topics..."
          className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
        />
      </div>

      {/* Quick Support Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit mb-3 group-hover:bg-blue-100 transition-colors">
            <LifeBuoy size={20} />
          </div>
          <h3 className="font-bold text-gray-900 text-sm mb-1">24/7 Support</h3>
          <p className="text-xs text-gray-500">Get help from our support team anytime, day or night.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl w-fit mb-3 group-hover:bg-purple-100 transition-colors">
            <BookOpen size={20} />
          </div>
          <h3 className="font-bold text-gray-900 text-sm mb-1">Documentation</h3>
          <p className="text-xs text-gray-500">Browse our comprehensive product documentation library.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl w-fit mb-3 group-hover:bg-amber-100 transition-colors">
            <MessageSquare size={20} />
          </div>
          <h3 className="font-bold text-gray-900 text-sm mb-1">Community Forum</h3>
          <p className="text-xs text-gray-500">Connect with other EVO ERP users and share knowledge.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-3 group-hover:bg-emerald-100 transition-colors">
            <ThumbsUp size={20} />
          </div>
          <h3 className="font-bold text-gray-900 text-sm mb-1">Feature Requests</h3>
          <p className="text-xs text-gray-500">Suggest and vote on new features for the platform.</p>
        </div>
      </div>

      {/* FAQ Category Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeCategory === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          All Topics
        </button>
        {faqs.map((category) => (
          <button
            key={category.category}
            onClick={() => setActiveCategory(category.category.toLowerCase())}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeCategory === category.category.toLowerCase()
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <category.icon size={13} />
            {category.category}
          </button>
        ))}
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <HelpCircle size={20} className="text-blue-600" />
          Frequently Asked Questions
        </h2>

        {filteredFaqs.map((category, catIdx) => (
          <div key={category.category} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Category Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${category.bgColor}`}>
                <category.icon size={18} className={category.color} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{category.category}</h3>
                <p className="text-xs text-gray-500">{category.questions.length} questions</p>
              </div>
            </div>

            {/* Questions */}
            <div className="divide-y divide-gray-50">
              {category.questions.map((faq, qIdx) => {
                const isExpanded = isFaqExpanded(catIdx, qIdx);
                return (
                  <div key={qIdx} className="transition-colors">
                    <button
                      onClick={() => toggleFaq(catIdx, qIdx)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50/50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-800 pr-4">{faq.q}</span>
                      {isExpanded ? (
                        <ChevronDown size={16} className="text-gray-400 shrink-0" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-400 shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-6 pb-4 pt-0">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {category.questions.length === 0 && (
                <div className="px-6 py-8 text-center">
                  <p className="text-sm text-gray-400">No matching questions found.</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredFaqs.every(c => c.questions.length === 0) && (
          <div className="text-center py-12">
            <Search size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm font-semibold text-gray-500">No results found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search terms or browse by category.</p>
          </div>
        )}
      </div>

      {/* Guides & Documentation */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <BookOpen size={20} className="text-purple-600" />
          Guides & Documentation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGuides.map((guide, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className={`p-2.5 rounded-xl w-fit mb-3 ${guide.bgColor} group-hover:opacity-80 transition-opacity`}>
                <guide.icon size={18} className={guide.color} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{guide.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{guide.description}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={12} />
                <span>{guide.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-xl font-bold mb-2">Still need help?</h2>
            <p className="text-sm text-blue-100 max-w-md">
              Our support team is available 24/7 to assist you with any questions or issues you may have.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-all shadow-md">
              <Mail size={16} />
              Email Support
            </button>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-400 transition-all border border-blue-400 shadow-md">
              <MessageSquare size={16} />
              Live Chat
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-500/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-blue-100">
            <Mail size={14} />
            <span>support@evo-erp.com</span>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <Headphones size={14} />
            <span>+1 (800) 555-0199</span>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <Clock size={14} />
            <span>{'Response time: < 2 hours'}</span>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <p className="font-bold text-gray-900 text-sm">All Systems Operational</p>
            <p className="text-xs text-gray-500">No reported issues. Last checked 2 minutes ago.</p>
          </div>
        </div>
        <button className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
          Status Page <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
};

export default HelpContent;