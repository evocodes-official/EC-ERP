import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  DollarSign,
  Share2,
  TrendingUp,
  MoveRight,
  Clock,
  MessageSquare,
  AlertTriangle,
  Mail,
  FileText,
  Gavel,
  X,
  Calendar,
  Building2,
  Tag,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import api from '../api';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80';

// Demo fallback used until the API responds (or if the API is unreachable)
const initialCards = [
  // Leads
  { id: 1, stage: 'leads', title: 'Starlight Analytics', value: 12000, owner: DEFAULT_AVATAR, time: '2d ago', comments: 4, priority: false, details: 'Starlight Analytics is a data analytics firm looking for enterprise solutions. Contact: Sarah Johnson, VP of Operations.' },
  { id: 2, stage: 'leads', title: 'Nexus Logic Inc.', value: 45500, owner: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80', time: '5h ago', comments: 0, priority: true, details: 'Nexus Logic Inc. is evaluating our platform for their infrastructure needs. Urgent follow-up required. Contact: Michael Chen, CTO.' },
  // Qualification
  { id: 3, stage: 'qualification', title: 'Global Trade Partners', value: 128000, owner: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', time: '3d ago', fit: '85%', followUp: true, details: 'Global Trade Partners is a logistics company. They require custom integrations. 85% fit with our solution. Contact: David Kim, Director of Operations.' },
  // Proposal
  { id: 4, stage: 'proposal', title: 'Aura Cloud Systems', value: 340000, owner: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', time: '1d ago', hot: true, file: 'proposal_v3.pdf', details: 'Aura Cloud Systems is a major cloud provider. High-value deal. Proposal v3 sent for review. Contact: Emily Watson, Head of Partnerships.' },
  { id: 5, stage: 'proposal', title: 'Vertex Industries', value: 92000, owner: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80', time: '1w ago', hot: false, details: 'Vertex Industries is a manufacturing company. Standard proposal sent. Awaiting feedback. Contact: Robert Brown, Procurement Manager.' },
  // Negotiation
  { id: 6, stage: 'negotiation', title: 'Zenith Holdings', value: 2100000, owner: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', time: '1d ago', status: 'Finalizing contract', details: 'Zenith Holdings is a large investment firm. Finalizing contract terms. Legal review in progress. Contact: Lisa Anderson, General Counsel.' },
];

const DEMO_STAGES = [
  { key: 'leads', label: 'Leads', color: 'bg-gray-400', borderColor: 'border-l-gray-400' },
  { key: 'qualification', label: 'Qualification', color: 'bg-amber-500', borderColor: 'border-l-amber-500' },
  { key: 'proposal', label: 'Proposal', color: 'bg-blue-600', borderColor: 'border-l-blue-600' },
  { key: 'negotiation', label: 'Negotiation', color: 'bg-indigo-600', borderColor: 'border-l-indigo-600' },
];

// Map backend footer icon names to lucide components
const FOOTER_ICONS = {
  mail: Mail,
  email: Mail,
  file: FileText,
  filetext: FileText,
  text: FileText,
  gavel: Gavel,
  clock: Clock,
  alert: AlertTriangle,
  alerttriangle: AlertTriangle,
};
const getFooterIcon = (name) =>
  FOOTER_ICONS[String(name || '').toLowerCase().replace(/[^a-z]/g, '')] || FileText;

// Map backend tag themes to Tailwind classes
const TAG_THEMES = {
  amber: 'text-amber-600 bg-amber-50',
  blue: 'text-blue-600 bg-blue-50',
  green: 'text-emerald-600 bg-emerald-50',
  rose: 'text-rose-600 bg-rose-50',
  purple: 'text-purple-600 bg-purple-50',
  gray: 'text-gray-600 bg-gray-100',
};
const getTagTheme = (theme) => TAG_THEMES[String(theme || '').toLowerCase()] || 'text-gray-600 bg-gray-100';

// "5h ago" style relative timestamps from an ISO date
const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (Number.isNaN(seconds)) return '';
  const units = [['w', 604800], ['d', 86400], ['h', 3600], ['m', 60]];
  for (const [suffix, secs] of units) {
    if (seconds >= secs) return `${Math.floor(seconds / secs)}${suffix} ago`;
  }
  return 'Just now';
};

// Stage colors come from the DB (hex strings); demo stages use Tailwind classes
const StageDot = ({ color, size = 'w-2.5 h-2.5' }) => {
  const isHex = typeof color === 'string' && color.startsWith('#');
  return (
    <span
      className={`${size} rounded-full ${isHex ? '' : color || 'bg-gray-400'}`}
      style={isHex ? { backgroundColor: color } : undefined}
    ></span>
  );
};

const CRMContent = () => {
  const [cards, setCards] = useState(initialCards);
  const [stages, setStages] = useState(DEMO_STAGES);
  const [useDemo, setUseDemo] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [actionError, setActionError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [editingCard, setEditingCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddForm, setShowAddForm] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [newCard, setNewCard] = useState({ title: '', value: '', details: '' });
  const [editCardData, setEditCardData] = useState({ title: '', value: '', details: '' });

  // Debounce the search box, then let the backend filter (GET /api/board?search=...)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Fetch the live board. Search & sort are applied server-side by the CRM controller.
  const fetchBoard = useCallback(async () => {
    try {
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (['oldest', 'value-high', 'value-low'].includes(sortBy)) params.sort = sortBy;

      const res = await api.get('/board', { params });
      const board = res.data?.board || res.data?.data?.board;

      // An empty board is still a valid API response (e.g. no stages seeded yet) —
      // only a failed request should fall back to demo mode.
      if (Array.isArray(board)) {
        setStages(
          board.map((s) => ({ key: String(s.id), label: s.name, color: s.color, count: s.count }))
        );
        setCards(
          board.flatMap((s) =>
            (s.deals || []).map((d) => ({
              id: d.id,
              stage: String(s.id),
              stageLabel: s.name,
              title: d.companyName,
              value: Number(d.amount) || 0,
              owner: d.assignee?.avatarUrl || DEFAULT_AVATAR,
              comments: d.commentCount,
              time: d.updatedAt ? timeAgo(d.updatedAt) : '',
              footer: d.footer || null,
              tag: d.tag || null,
              details: '',
            }))
          )
        );
        setUseDemo(false);
        setFetchError('');
      }
    } catch (err) {
      // Keep demo data visible when the API is unavailable
      console.error('Failed to load CRM board:', err?.response?.data || err.message);
      setUseDemo(true);
      setFetchError('Live data unavailable — showing sample data.');
    }
  }, [debouncedSearch, sortBy]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  // Filtered and sorted cards
  const filteredAndSortedCards = useMemo(() => {
    let list = cards;
    if (useDemo) {
      list = cards.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.value.toString().includes(searchQuery)
      );
    }
    if (sortBy === 'name') return [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [cards, searchQuery, sortBy, useDemo]);

  const getCardsByStage = (stageKey) => {
    return filteredAndSortedCards.filter((card) => card.stage === stageKey);
  };

  const getStageCount = (stageKey) => {
    if (!useDemo) return stages.find((s) => s.key === stageKey)?.count ?? 0;
    return cards.filter((card) => card.stage === stageKey).length;
  };

  const handleAddCard = async (stageKey) => {
    setActionError('');
    try {
      if (useDemo) {
        const newId = Math.max(...cards.map((c) => c.id), 0) + 1;
        const card = {
          id: newId,
          stage: stageKey,
          title: newCard.title || 'New Deal',
          value: parseFloat(newCard.value) || 0,
          owner: DEFAULT_AVATAR,
          time: 'Just now',
          comments: 0,
          priority: false,
          details: newCard.details || '',
          createdAt: new Date().toISOString(),
        };
        setCards([...cards, card]);
      } else {
        await api.post('/deals', {
          companyName: newCard.title || 'New Deal',
          amount: parseFloat(newCard.value) || 0,
          description: newCard.details || '',
          stageId: stageKey,
        });
        await fetchBoard();
      }
      setShowAddForm(null);
      setNewCard({ title: '', value: '', details: '' });
    } catch (err) {
      console.error('Failed to create deal:', err?.response?.data || err.message);
      setActionError(err?.response?.data?.error || 'Failed to create deal');
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (useDemo) {
      setCards(cards.filter((c) => c.id !== cardId));
      if (selectedCard && selectedCard.id === cardId) {
        setIsModalOpen(false);
        setSelectedCard(null);
      }
      return;
    }
    setActionError('');
    try {
      await api.delete(`/deals/${cardId}`);
      if (selectedCard && selectedCard.id === cardId) {
        setIsModalOpen(false);
        setSelectedCard(null);
      }
      await fetchBoard();
    } catch (err) {
      console.error('Failed to delete deal:', err?.response?.data || err.message);
      setActionError(err?.response?.data?.error || 'Failed to delete deal');
    }
  };

  const handleEditCard = (card) => {
    setEditCardData({ title: card.title, value: card.value.toString(), details: card.details || '' });
    setEditingCard(card.id);
  };

  const handleSaveEdit = async (cardId) => {
    if (useDemo) {
      setCards(cards.map((c) =>
        c.id === cardId
          ? { ...c, title: editCardData.title || c.title, value: parseFloat(editCardData.value) || c.value, details: editCardData.details || c.details }
          : c
      ));
      setEditingCard(null);
      setEditCardData({ title: '', value: '', details: '' });
      return;
    }
    setActionError('');
    try {
      await api.put(`/deals/${cardId}`, {
        companyName: editCardData.title || undefined,
        amount: editCardData.value !== '' ? parseFloat(editCardData.value) : undefined,
        description: editCardData.details,
      });
      setEditingCard(null);
      setEditCardData({ title: '', value: '', details: '' });
      await fetchBoard();
    } catch (err) {
      console.error('Failed to update deal:', err?.response?.data || err.message);
      setActionError(err?.response?.data?.error || 'Failed to update deal');
    }
  };

  const openDetailModal = async (card) => {
    if (useDemo) {
      setSelectedCard({ ...card, details: card.details || 'No additional details provided.' });
      setIsModalOpen(true);
      return;
    }
    // The board payload has no description — fetch the full deal for the modal
    setSelectedCard({ ...card, details: 'Loading details...' });
    setIsModalOpen(true);
    try {
      const res = await api.get(`/deals/${card.id}`);
      const d = res.data;
      setSelectedCard((prev) => (prev && prev.id === card.id
        ? {
            ...prev,
            title: d.companyName ?? prev.title,
            value: d.amount != null ? Number(d.amount) : prev.value,
            details: d.description || 'No additional details provided.',
            stage: d.stage?.id ? String(d.stage.id) : prev.stage,
            stageLabel: d.stage?.name || prev.stageLabel,
            time: d.lastActivity ? timeAgo(d.lastActivity) : prev.time,
            comments: d.commentCount ?? prev.comments,
            assignee: d.assignee || null,
            footer: d.footer || prev.footer,
            tag: d.tag || prev.tag,
          }
        : prev));
    } catch (err) {
      console.error('Failed to fetch deal details:', err?.response?.data || err.message);
      setSelectedCard((prev) => (prev && prev.id === card.id && prev.details === 'Loading details...'
        ? { ...prev, details: 'No additional details provided.' }
        : prev));
    }
  };

  const closeDetailModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const renderCard = (card) => {
    const isEditing = editingCard === card.id;

    if (isEditing) {
      return (
        <div key={card.id} className="bg-white p-4 rounded-xl border border-blue-300 shadow-sm border-l-4 border-l-blue-500 space-y-2">
          <input
            type="text"
            value={editCardData.title}
            onChange={(e) => setEditCardData({ ...editCardData, title: e.target.value })}
            className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Deal title"
          />
          <input
            type="number"
            value={editCardData.value}
            onChange={(e) => setEditCardData({ ...editCardData, value: e.target.value })}
            className="w-full text-sm font-bold text-blue-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Value"
          />
          <textarea
            value={editCardData.details}
            onChange={(e) => setEditCardData({ ...editCardData, details: e.target.value })}
            className="w-full text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Details"
            rows={2}
          />
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => handleSaveEdit(card.id)}
              className="text-xs font-bold bg-blue-600 text-white px-3.5 py-1.5 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => setEditingCard(null)}
              className="text-xs font-bold bg-gray-100 text-gray-600 px-3.5 py-1.5 rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        key={card.id}
        className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative group cursor-pointer"
        onClick={() => openDetailModal(card)}
      >
        <div className="absolute top-2.5 right-2.5 flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/90 backdrop-blur-sm p-1 rounded-lg shadow-xs border border-gray-100">
          <button
            onClick={(e) => { e.stopPropagation(); handleEditCard(card); }}
            className="p-1 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-md transition-colors cursor-pointer"
            title="Edit"
          >
            <Edit size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id); }}
            className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-md transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>

        <div className="flex justify-between items-start pr-12">
          <div>
            <h5 className="font-bold text-gray-900 text-xs">{card.title}</h5>
            <p className="text-blue-600 font-extrabold text-sm mt-1">${card.value.toLocaleString()}</p>
          </div>
          <img
            src={card.owner}
            alt="Owner"
            className="w-7 h-7 rounded-full object-cover border border-gray-200 shrink-0"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
          <span className="flex items-center gap-1 shrink-0">
            <Clock size={12} /> {card.time}
          </span>
          <div className="flex items-center gap-1.5 min-w-0">
            {card.comments !== undefined && (
              <span className="flex items-center gap-1">
                <MessageSquare size={12} /> {card.comments}
              </span>
            )}
            {card.stage === 'leads' && card.priority && (
              <span className="flex items-center gap-1 text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                <AlertTriangle size={11} /> Priority
              </span>
            )}
            {card.stage === 'qualification' && card.followUp && (
              <span className="flex items-center gap-1">
                <Mail size={12} /> Follow up
              </span>
            )}
            {card.stage === 'qualification' && card.fit && (
              <span className="font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                {card.fit} Fit
              </span>
            )}
            {card.stage === 'proposal' && (
              <span className="flex items-center gap-1">
                <FileText size={12} /> {card.file || 'Proposal sent'}
              </span>
            )}
            {card.stage === 'negotiation' && !card.footer && (
              <span className="flex items-center gap-1 truncate max-w-[180px]">
                <Gavel size={12} /> {card.status || 'In negotiation'}
              </span>
            )}
            {card.footer && (
              <span className="flex items-center gap-1 truncate max-w-[160px]">
                {React.createElement(getFooterIcon(card.footer.icon), { size: 12 })}
                {card.footer.text}
              </span>
            )}
            {card.tag && (
              <span className={`font-bold px-1.5 py-0.5 rounded shrink-0 ${getTagTheme(card.tag.theme)}`}>
                {card.tag.label}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAddForm = (stageKey) => {
    if (showAddForm !== stageKey) return null;
    return (
      <div className="bg-white p-4 rounded-2xl border border-blue-300 shadow-sm border-l-4 border-l-blue-500 space-y-2.5">
        <input
          type="text"
          value={newCard.title}
          onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
          className="w-full text-xs font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="Deal title"
          autoFocus
        />
        <input
          type="number"
          value={newCard.value}
          onChange={(e) => setNewCard({ ...newCard, value: e.target.value })}
          className="w-full text-sm font-bold text-blue-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="Deal value"
        />
        <textarea
          value={newCard.details}
          onChange={(e) => setNewCard({ ...newCard, details: e.target.value })}
          className="w-full text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="Details / notes"
          rows={2}
        />
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => handleAddCard(stageKey)}
            className="text-xs font-bold bg-blue-600 text-white px-3.5 py-1.5 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Add Deal
          </button>
          <button
            onClick={() => { setShowAddForm(null); setNewCard({ title: '', value: '', details: '' }); }}
            className="text-xs font-bold bg-gray-100 text-gray-600 px-3.5 py-1.5 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-120px)] pb-12 w-full px-4 sm:px-6 py-6">
      {fetchError && (
        <div className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 w-fit">
          {fetchError}
        </div>
      )}
      {actionError && (
        <div className="flex items-center gap-2 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2 w-fit">
          <span>{actionError}</span>
          <button onClick={() => setActionError('')} className="hover:text-red-800 cursor-pointer" title="Dismiss">
            <X size={12} />
          </button>
        </div>
      )}

      {/* 1. TOP KPI METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Deal Value
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-2">
              ${cards.reduce((sum, c) => sum + c.value, 0).toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-emerald-600 mt-2.5 flex items-center gap-1">
              <TrendingUp size={13} />
              <span>+12.5% from last month</span>
            </p>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Active Deals
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{cards.length}</h3>
            <p className="text-xs font-semibold text-emerald-600 mt-2.5 flex items-center gap-1">
              <TrendingUp size={13} />
              <span>Across all stages</span>
            </p>
          </div>
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl border border-teal-100">
            <Share2 size={18} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Win Rate
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-2">64%</h3>
            <p className="text-xs font-semibold text-amber-500 mt-2.5 flex items-center gap-1">
              <MoveRight size={13} />
              <span>Stable performance</span>
            </p>
          </div>
        </div>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deals by name, value, or details..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none w-full sm:w-auto pl-9 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer shadow-sm"
          >
            <option value="newest">Newest First</option>
            <option value="value-high">Value: High to Low</option>
            <option value="value-low">Value: Low to High</option>
            <option value="name">Name: A-Z</option>
          </select>
          <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {!useDemo && stages.length === 0 && (
        <div className="bg-white border border-amber-100 rounded-2xl p-8 text-center shadow-sm">
          <p className="text-sm font-bold text-gray-800">Connected, but no pipeline stages exist yet</p>
          <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
            Your Stage collection is empty, so deals can't be added (each deal needs a stageId).
            Seed a few stages — e.g. Leads, Qualification, Proposal, Negotiation (with sortOrder 1-4) — and refresh.
          </p>
        </div>
      )}

      {/* 2. KANBAN DEAL PIPELINE STAGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto pb-4 items-start">
        {stages.map((stage) => (
          <div key={stage.key} className="space-y-3.5 min-w-[280px] bg-slate-50/70 p-4.5 rounded-2xl border border-gray-200/60 shadow-xs">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center space-x-2">
                <StageDot color={stage.color} />
                <h4 className="font-bold text-gray-900 text-sm">{stage.label}</h4>
                <span className="bg-white text-gray-600 text-xs font-bold px-2 py-0.5 rounded-md border border-gray-200/80 shadow-2xs">
                  {getStageCount(stage.key)}
                </span>
              </div>
              <button
                onClick={() => setShowAddForm(showAddForm === stage.key ? null : stage.key)}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all cursor-pointer shadow-2xs"
                title={`Add to ${stage.label}`}
              >
                <Plus size={16} />
              </button>
            </div>

            {renderAddForm(stage.key)}

            <div className="space-y-3">
              {getCardsByStage(stage.key).map((card) => renderCard(card))}
            </div>

            {getCardsByStage(stage.key).length === 0 && showAddForm !== stage.key && (
              <div className="text-center py-8 text-gray-400 text-xs italic">
                No deals in {stage.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeDetailModal}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 my-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{selectedCard.title}</h3>
                  <p className="text-xs text-gray-500">Deal Details</p>
                </div>
              </div>
              <button
                onClick={closeDetailModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Deal Value</p>
                  <p className="text-2xl font-extrabold text-blue-600">${selectedCard.value.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Stage</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StageDot color={stages.find((s) => s.key === selectedCard.stage)?.color} />
                    <p className="font-bold text-gray-800 capitalize">{selectedCard.stageLabel || selectedCard.stage}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                  <FileText size={13} /> Description
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-2xl p-4 leading-relaxed border border-gray-100">
                  {selectedCard.details || 'No additional details provided.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {selectedCard.assignee?.name && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <img
                      src={selectedCard.assignee.avatarUrl || DEFAULT_AVATAR}
                      alt={selectedCard.assignee.name}
                      className="w-5 h-5 rounded-full object-cover border border-gray-200"
                    />
                    <span>Owner: <span className="font-semibold text-gray-800">{selectedCard.assignee.name}</span></span>
                  </div>
                )}
                {selectedCard.time && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} className="text-gray-400" />
                    <span>Last activity: <span className="font-semibold text-gray-800">{selectedCard.time}</span></span>
                  </div>
                )}
                {selectedCard.footer && (
                  <div className="flex items-center gap-2 text-gray-600">
                    {React.createElement(getFooterIcon(selectedCard.footer.icon), { size: 14, className: 'text-gray-400' })}
                    <span><span className="font-semibold text-gray-800">{selectedCard.footer.text}</span></span>
                  </div>
                )}
                {selectedCard.tag && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag size={14} className="text-gray-400" />
                    <span>Tag: <span className={`font-semibold px-1.5 py-0.5 rounded ${getTagTheme(selectedCard.tag.theme)}`}>{selectedCard.tag.label}</span></span>
                  </div>
                )}
                {selectedCard.fit && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag size={14} className="text-gray-400" />
                    <span>Fit: <span className="font-semibold text-purple-600">{selectedCard.fit}</span></span>
                  </div>
                )}
                {selectedCard.priority && (
                  <div className="flex items-center gap-2 text-amber-600 font-semibold">
                    <AlertTriangle size={14} />
                    <span>Priority deal</span>
                  </div>
                )}
                {selectedCard.hot && (
                  <div className="flex items-center gap-2 text-rose-600 font-semibold">
                    <AlertTriangle size={14} />
                    <span>HOT deal</span>
                  </div>
                )}
                {selectedCard.comments !== undefined && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageSquare size={14} className="text-gray-400" />
                    <span>{selectedCard.comments} comments</span>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 rounded-b-2xl flex justify-end gap-2.5">
              <button
                onClick={() => { handleEditCard(selectedCard); closeDetailModal(); }}
                className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 bg-white border border-blue-200 px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-all shadow-2xs cursor-pointer"
              >
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={() => { handleDeleteCard(selectedCard.id); closeDetailModal(); }}
                className="flex items-center gap-1.5 text-sm font-semibold text-red-600 bg-white border border-red-200 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-all shadow-2xs cursor-pointer"
              >
                <Trash2 size={14} /> Delete
              </button>
              <button
                onClick={closeDetailModal}
                className="text-sm font-semibold text-gray-600 bg-gray-200/70 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <button 
        onClick={() => setShowAddForm(stages[0]?.key ?? null)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-20 cursor-pointer"
        title="Add New Deal"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default CRMContent;