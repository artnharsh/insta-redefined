import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, Film, PlusSquare, Compass, 
  MessageCircle, Heart, LayoutDashboard, User, 
  MoreHorizontal, Bookmark, Send, CheckCircle2,
  Lock, Mail, ArrowRight, Grid, PlaySquare, UserCircle,
  Settings, Activity, Moon, Sun, AlertCircle,
  Eye, EyeOff, ChevronLeft,
  Phone, Video, Info, Smile, Image as ImageIcon, Mic, Edit, ChevronDown, Camera, ArrowLeft
} from 'lucide-react';

const FacebookIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.02 4.388 11.01 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.017 1.792-4.685 4.533-4.685 1.312 0 2.686.235 2.686.235v2.963h-1.514c-1.491 0-1.956.927-1.956 1.878v2.255h3.328l-.532 3.49h-2.796V24C19.612 23.083 24 18.093 24 12.073z" />
  </svg>
);

// --- THEME CONTEXT ---
const ThemeContext = createContext();

// --- MOCK DATA ---
const STORIES = [
  { id: 1, user: 'Your Story', image: '/images/user-your-story.svg', isAdd: true },
  { id: 2, user: 'Vistora', image: '/images/user-vistora.svg' },
  { id: 3, user: 'Apple', image: '/images/user-apple.svg' },
  { id: 4, user: 'Adobe', image: '/images/user-adobe.svg' },
  { id: 5, user: 'Figma', image: '/images/user-figma.svg' },
  { id: 6, user: 'Framer', image: '/images/user-framer.svg' },
  { id: 7, user: 'Wix', image: '/images/user-wix.svg' },
  { id: 8, user: 'Rive', image: '/images/user-rive.svg' },
];

const HIGHLIGHTS = [
  { id: 1, title: 'France', image: '/images/highlight-france.svg' },
  { id: 2, title: '#WTMLDN', image: '/images/highlight-wtmldn.svg' },
  { id: 3, title: 'London', image: '/images/highlight-london.svg' },
  { id: 4, title: 'Morocco III', image: '/images/highlight-morocco3.svg' },
  { id: 5, title: 'Morocco II', image: '/images/highlight-morocco2.svg' },
];

const POSTS = [
  {
    id: 1,
    user: { name: 'apple', avatar: '/images/user-apple.svg', verified: true },
    time: '15m',
    content: { type: 'image', image: '/images/home-apple-macbook.jpg' },
    likes: '234.6K',
    comments: '646',
    caption: 'Introducing Apple Vision Pro. The era of spatial computing begins.'
  },
  {
    id: 2,
    user: { name: 'artnharsh', avatar: '/images/user-artnharsh.svg', verified: false },
    time: '2h',
    content: { type: 'image', image: '/images/home-artnharsh-levi.jpg' },
    likes: '12.4K',
    comments: '102',
    caption: 'Perfect Duo ✨ Walking through the memories.'
  }
];

const CURRENT_USER = {
  username: 'artnharsh',
  name: 'Art & Harsh',
  category: 'Content creator',
  avatar: '/images/user-artnharsh.svg',
  bio: '✨ Creating digital memories\n📍 Tech City',
  stats: { posts: 4, followers: 584, following: 464 }
};

// --- MESSAGING MOCK DATA ---
const NOTES = [
  { id: 1, user: 'Vistora', avatar: '/images/user-vistora.svg', note: 'Designing 🎨' },
  { id: 2, user: 'Apple', avatar: '/images/user-apple.svg', note: 'WWDC soon!' },
  { id: 3, user: 'Figma', avatar: '/images/user-figma.svg', note: 'Config 2024 ✨' },
  { id: 4, user: 'Framer', avatar: '/images/user-framer.svg', note: 'Updates live' },
];

const CHATS = [
  { id: 1, name: 'Vistora', avatar: '/images/user-vistora.svg', lastMessage: 'That looks amazing! ✨', time: '1h', unread: 2, isOnline: true },
  { id: 2, name: 'Apple', avatar: '/images/user-apple.svg', lastMessage: 'See you at the keynote.', time: '3h', unread: 0, isOnline: false },
  { id: 3, name: 'Figma', avatar: '/images/user-figma.svg', lastMessage: 'Sent an attachment', time: '5h', unread: 1, isOnline: true },
  { id: 4, name: 'UI/UX Community', avatar: '/images/user-wix.svg', lastMessage: 'John: Great feedback everyone!', time: '1d', unread: 0, isOnline: false },
  { id: 5, name: 'Framer', avatar: '/images/user-framer.svg', lastMessage: 'Loved the recent animation build.', time: '1d', unread: 0, isOnline: true },
];

const CHAT_MESSAGES = [
  { id: 1, sender: 'them', text: 'Hey! Did you see the new design updates?', time: '10:00 AM' },
  { id: 2, sender: 'me', text: 'Yes! They look absolutely stunning. The glassmorphism is spot on.', time: '10:02 AM' },
  { id: 3, sender: 'them', text: 'I know right? It feels so premium and modern.', time: '10:05 AM' },
  { id: 4, sender: 'me', text: 'Exactly. Are we implementing this in the next sprint?', time: '10:10 AM' },
  { id: 5, sender: 'them', text: 'Yes, let\'s get it done! 🚀', time: '10:15 AM' },
];

const REELS = [
  { id: 1, user: 'vistora', avatar: '/images/user-vistora.svg', image: '/images/post-10.jpg', caption: 'A calm gradient motion study.', likes: '18.9K', comments: '210' },
  { id: 2, user: 'figma', avatar: '/images/user-figma.svg', image: '/images/post-11.jpg', caption: 'Micro-interactions that feel alive.', likes: '42.1K', comments: '520' },
  { id: 3, user: 'framer', avatar: '/images/user-framer.svg', image: '/images/post-12.jpg', caption: 'Smooth reveal system in 8 frames.', likes: '30.4K', comments: '396' },
];

const NOTIFICATIONS = [
  { id: 1, user: 'Apple', avatar: '/images/user-apple.svg', text: 'liked your post.', time: '2m', type: 'like' },
  { id: 2, user: 'Vistora', avatar: '/images/user-vistora.svg', text: 'started following you.', time: '8m', type: 'follow' },
  { id: 3, user: 'Figma', avatar: '/images/user-figma.svg', text: 'mentioned you in a comment.', time: '1h', type: 'comment' },
  { id: 4, user: 'Framer', avatar: '/images/user-framer.svg', text: 'shared your reel.', time: '3h', type: 'share' },
  { id: 5, user: 'Adobe', avatar: '/images/user-adobe.svg', text: 'liked your story.', time: '5h', type: 'like' },
];

// --- REUSABLE UI COMPONENTS ---
const Panel = ({ children, className = '' }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className={`transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#151515]/90 backdrop-blur-xl border border-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' 
        : 'bg-white/85 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
    } ${className}`}>
      {children}
    </div>
  );
};

// --- MAIN VIEWS ---

const LoginView = ({ onLogin }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const VALID_IDENTIFIERS = ['artnharsh@tech.com', 'artnharsh', '9999999999'];
  const VALID_PASSWORD = '123123';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsLoading(true);
      setError('');
      setTimeout(() => {
        setIsLoading(false);
        const isIdentifierCorrect = VALID_IDENTIFIERS.includes(email.trim().toLowerCase());
        const isPasswordCorrect = password === VALID_PASSWORD;

        if (isIdentifierCorrect && isPasswordCorrect) {
          onLogin();
        } else {
          setError('Invalid Credentials. Please Try Again.');
        }
      }, 1000);
    }
  };

  const isEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneFormat = /^\+?[\d\s-]{10,}$/.test(email);
  const isUsernameFormat = /^[a-zA-Z0-9_.-]{3,}$/.test(email) && !email.includes('@');
  const isIdentifierFormatValid = isEmailFormat || isPhoneFormat || isUsernameFormat;
  const isValid = isIdentifierFormatValid && password.length >= 6;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm mx-auto z-10 px-4 md:px-0 flex flex-col items-center justify-center h-full min-h-[100dvh]"
    >
      <Panel className="w-full p-8 md:p-10 flex flex-col items-center rounded-3xl mb-4">
        <h1 className={`text-5xl font-serif italic mb-10 tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Instagram</h1>
        
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <div className={`flex items-center rounded-lg px-4 py-3 border transition-colors ${
            error ? 'border-red-500/50 bg-red-500/5' :
            isDarkMode ? 'border-white/10 bg-[#222] focus-within:border-white/30' : 'border-gray-200 bg-gray-50 focus-within:border-gray-400'
          }`}>
            <input 
              type="text" 
              placeholder="Phone number, email or username"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
              className={`bg-transparent text-sm border-none outline-none w-full ${isDarkMode ? 'text-white placeholder-zinc-500' : 'text-black placeholder-gray-500'}`}
            />
          </div>

          <div className={`flex items-center rounded-lg px-4 py-3 border transition-colors ${
             error ? 'border-red-500/50 bg-red-500/5' :
             isDarkMode ? 'border-white/10 bg-[#222] focus-within:border-white/30' : 'border-gray-200 bg-gray-50 focus-within:border-gray-400'
          }`}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (error) setError(''); }}
              className={`bg-transparent text-sm border-none outline-none w-full ${isDarkMode ? 'text-white placeholder-zinc-500' : 'text-black placeholder-gray-500'}`}
            />
            {password.length > 0 && (
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`ml-2 focus:outline-none ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            )}
          </div>

          <motion.button
            whileHover={{ scale: isValid ? 1.02 : 1 }}
            whileTap={{ scale: isValid ? 0.98 : 1 }}
            disabled={!isValid || isLoading}
            className={`w-full py-3 mt-2 rounded-lg font-semibold text-sm flex items-center justify-center transition-all ${
              isValid && !isLoading ? 'bg-[#0095f6] text-white shadow-lg shadow-blue-500/20 hover:bg-[#1877f2]' : 'bg-[#0095f6]/50 text-white/70 cursor-not-allowed'
            }`}
          >
            {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : "Log In"}
          </motion.button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }} className="w-full mt-4 overflow-hidden">
              <p className="text-[#ed4956] text-sm text-center leading-tight">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`mt-4 text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
          Forget your login details? <span className={`cursor-pointer font-semibold ${isDarkMode ? 'text-white' : 'text-[#00376b]'}`}>Get help logging in.</span>
        </div>

        <div className="flex items-center w-full my-6">
          <div className={`flex-1 h-px ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-300'}`}></div>
          <span className={`px-4 text-[13px] font-semibold ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>OR</span>
          <div className={`flex-1 h-px ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-300'}`}></div>
        </div>

        <button className="flex items-center justify-center text-[#385185] font-semibold text-sm hover:text-[#00376b] transition-colors">
          <FacebookIcon className="w-5 h-5 mr-2" /> Log in with Facebook
        </button>
      </Panel>

      <Panel className="w-full py-5 flex items-center justify-center rounded-2xl">
        <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
          Don't have an account? <span className={`font-semibold cursor-pointer ${isDarkMode ? 'text-[#0095f6]' : 'text-[#0095f6]'}`}>Sign up</span>
        </p>
      </Panel>
    </motion.div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMoreOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'reels', icon: Film, label: 'Reels' },
    { id: 'message', icon: MessageCircle, label: 'Messages' },
    { id: 'notifications', icon: Heart, label: 'Notifications' },
    { id: 'create', icon: PlusSquare, label: 'Create' },
    { id: 'profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <Panel className="hidden md:flex w-64 flex-col py-8 px-4 h-[calc(100vh-4rem)] sticky top-8 z-20 rounded-3xl">
      <div className="px-4 mb-10">
        <h1 className={`text-3xl font-serif italic tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Instagram</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center relative py-3 px-4 rounded-xl transition-all group ${
                isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}
            >
              {isActive && (
                <motion.div layoutId="activeIndicator" className={`absolute left-0 w-1 h-8 rounded-r-full ${isDarkMode ? 'bg-white' : 'bg-black'}`} initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              <Icon className={`w-6 h-6 mr-4 transition-colors ${isActive ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-zinc-400 group-hover:text-zinc-200' : 'text-gray-500 group-hover:text-black')}`} />
              <span className={`font-medium transition-colors ${isActive ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-zinc-400 group-hover:text-zinc-200' : 'text-gray-500 group-hover:text-black')}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="relative mt-auto" ref={menuRef}>
        <AnimatePresence>
          {isMoreOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute bottom-full left-0 mb-4 w-[260px] rounded-2xl shadow-2xl overflow-hidden flex flex-col p-2 ${isDarkMode ? 'bg-[#262626] border border-white/10' : 'bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]'}`}
            >
              {[
                { icon: Settings, label: 'Settings' },
                { icon: Activity, label: 'Your activity' },
                { icon: Bookmark, label: 'Saved' },
                { icon: isDarkMode ? Sun : Moon, label: 'Switch appearance', onClick: toggleTheme },
                { icon: AlertCircle, label: 'Report a problem' },
              ].map((item, idx) => (
                <button key={idx} onClick={() => { if (item.onClick) item.onClick(); setIsMoreOpen(false); }} className={`flex items-center px-4 py-3 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
              <div className={`h-[1px] my-1 w-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`} />
              <button onClick={() => setIsMoreOpen(false)} className={`flex items-center px-4 py-3 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}>
                <span className="font-medium text-sm">Switch accounts</span>
              </button>
              <div className={`h-[1px] my-1 w-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`} />
              <button onClick={() => { onLogout(); setIsMoreOpen(false); }} className={`flex items-center px-4 py-3 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}>
                <span className="font-medium text-sm text-red-500">Log out</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setIsMoreOpen(!isMoreOpen)} className={`w-full flex items-center py-3 px-4 rounded-xl transition-all group ${isDarkMode ? 'text-zinc-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'} ${isMoreOpen ? (isDarkMode ? 'font-bold text-white' : 'font-bold text-black') : ''}`}>
          <MoreHorizontal className={`w-6 h-6 mr-4 transition-transform ${isMoreOpen ? 'rotate-90' : ''}`} />
          <span className="font-medium">More</span>
        </button>
      </div>
    </Panel>
  );
};

const MobileBottomNav = ({ activeTab, setActiveTab }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const mobileNavItems = [
    { id: 'home', icon: Home },
    { id: 'search', icon: Search },
    { id: 'create', icon: PlusSquare },
    { id: 'reels', icon: Film },
    { id: 'profile', icon: UserCircle },
  ];

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center py-3 px-4 pb-safe transition-colors ${
      isDarkMode ? 'bg-[#151515]/90 backdrop-blur-xl border-t border-white/10' : 'bg-white/90 backdrop-blur-xl border-t border-gray-200'
    }`}>
      {mobileNavItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        return (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className="p-2 transition-transform active:scale-90">
            <Icon className={`w-7 h-7 ${isActive ? (isDarkMode ? 'text-white stroke-[2.5px]' : 'text-black stroke-[2.5px]') : (isDarkMode ? 'text-zinc-400' : 'text-gray-500')}`} />
          </button>
        );
      })}
    </div>
  );
};

const MobileTopNav = ({ setActiveTab }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className={`md:hidden flex justify-between items-center px-4 py-3 sticky top-0 z-40 transition-colors ${
      isDarkMode ? 'bg-[#151515]/80 backdrop-blur-xl border-b border-white/5' : 'bg-white/80 backdrop-blur-xl border-b border-gray-100'
    }`}>
      <h1 className={`text-2xl font-serif italic tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Instagram</h1>
      <div className="flex items-center gap-5">
        <Heart className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
        <button onClick={() => setActiveTab('message')}>
           <Send className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
        </button>
      </div>
    </div>
  );
};

// --- CHAT / MESSAGE COMPONENT ---

const MessageView = ({ setActiveTab }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState('');

  return (
    <Panel className="flex w-full h-[100dvh] md:h-[calc(100vh-4rem)] md:mt-8 md:rounded-3xl overflow-hidden border-x-0 md:border-x">
      {/* LEFT PANEL: Chat List */}
      <div className={`w-full md:w-[350px] flex-shrink-0 flex flex-col border-r ${
        isDarkMode ? 'border-white/10' : 'border-black/5'
      } ${activeChat ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-safe md:pt-4">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setActiveTab('home')}>
              <ArrowLeft className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
            </button>
            <div className="flex items-center gap-1 cursor-pointer">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{CURRENT_USER.username}</h2>
              <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
            </div>
          </div>
          <button>
            <Edit className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Notes Section */}
          <div className="px-4 py-4 overflow-x-auto scrollbar-hide flex gap-4" style={{ scrollbarWidth: 'none' }}>
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <div className="relative">
                <img src={CURRENT_USER.avatar} alt="You" className="w-16 h-16 rounded-full object-cover" />
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-xl text-xs whitespace-nowrap border ${
                  isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-gray-200 text-gray-600 shadow-sm'
                }`}>
                  Note...
                </div>
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                  isDarkMode ? 'bg-zinc-700 border-[#151515]' : 'bg-gray-200 border-white'
                }`}>
                  <PlusSquare className={`w-3 h-3 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                </div>
              </div>
              <span className={`text-[11px] mt-2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Your note</span>
            </div>
            
            {NOTES.map(note => (
              <div key={note.id} className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="relative">
                  <img src={note.avatar} alt={note.user} className="w-16 h-16 rounded-full object-cover" />
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-2xl text-[11px] font-medium whitespace-nowrap border shadow-sm ${
                    isDarkMode ? 'bg-[#262626] border-zinc-700 text-white' : 'bg-white border-gray-100 text-black'
                  }`}>
                    {note.note}
                  </div>
                </div>
                <span className={`text-[11px] mt-2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{note.user}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center px-4 py-2 mt-2">
             <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Messages</span>
             <span className={`text-sm font-medium ${isDarkMode ? 'text-[#0095f6]' : 'text-blue-500'}`}>Requests</span>
          </div>

          {/* Chat List */}
          <div className="mt-2">
            {CHATS.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)} 
                className={`flex items-center gap-3 p-3 px-4 cursor-pointer transition-colors ${
                  activeChat?.id === chat.id 
                    ? (isDarkMode ? 'bg-white/10' : 'bg-black/5') 
                    : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5')
                }`}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-full object-cover" />
                  {chat.isOnline && (
                    <div className={`absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 ${
                      isDarkMode ? 'border-[#151515]' : 'border-white'
                    }`} />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className={`font-semibold truncate text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{chat.name}</h3>
                  <p className={`text-sm truncate ${
                    chat.unread 
                      ? (isDarkMode ? 'text-white font-bold' : 'text-black font-bold') 
                      : (isDarkMode ? 'text-zinc-500' : 'text-gray-500')
                  }`}>
                    {chat.lastMessage} · {chat.time}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-2.5 h-2.5 bg-[#0095f6] rounded-full flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Chat Detail or Empty State */}
      <div className={`flex-1 flex flex-col ${
        isDarkMode ? 'bg-black/20' : 'bg-white/50'
      } ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
        
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className={`flex items-center justify-between p-4 border-b ${
              isDarkMode ? 'border-white/10 bg-[#151515]/90' : 'border-black/5 bg-white/90'
            } backdrop-blur-md z-10 sticky top-0`}>
              <div className="flex items-center gap-3">
                <button className="md:hidden" onClick={() => setActiveChat(null)}>
                  <ArrowLeft className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                </button>
                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{activeChat.name}</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                    {activeChat.isOnline ? 'Active now' : 'Active 2h ago'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <Phone className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                <Video className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                <Info className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-hide">
              <div className="flex flex-col items-center justify-center py-10">
                <img src={activeChat.avatar} alt={activeChat.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{activeChat.name}</h2>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Instagram</p>
                <button className={`mt-4 px-4 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
                  isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}>View Profile</button>
              </div>
              
              {CHAT_MESSAGES.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender !== 'me' && <img src={activeChat.avatar} alt="User" className="w-7 h-7 rounded-full object-cover mr-2 self-end" />}
                  <div className={`px-4 py-2.5 max-w-[70%] text-sm ${
                    msg.sender === 'me' 
                      ? 'bg-gradient-to-tr from-[#0095f6] to-[#0077c5] text-white rounded-2xl rounded-br-sm shadow-md shadow-blue-500/10' 
                      : isDarkMode 
                        ? 'bg-zinc-800 text-white rounded-2xl rounded-bl-sm border border-white/5' 
                        : 'bg-gray-200 text-black rounded-2xl rounded-bl-sm border border-black/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className={`p-4 ${isDarkMode ? 'bg-[#151515]/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'}`}>
              <div className={`flex items-center gap-3 p-2 px-4 rounded-full border ${
                isDarkMode ? 'border-white/20 bg-black/50' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="bg-[#0095f6] p-1.5 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                  <Camera className="w-5 h-5 text-white fill-current" />
                </div>
                <input 
                  type="text" 
                  placeholder="Message..." 
                  className={`flex-1 bg-transparent border-none outline-none text-sm ${
                    isDarkMode ? 'text-white placeholder-zinc-500' : 'text-black placeholder-gray-500'
                  }`}
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                />
                {messageText ? (
                  <button className="text-[#0095f6] font-semibold text-sm px-2 hover:text-blue-400">Send</button>
                ) : (
                  <div className="flex items-center gap-3">
                    <Mic className={`w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity ${isDarkMode ? 'text-zinc-300' : 'text-gray-600'}`} />
                    <ImageIcon className={`w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity ${isDarkMode ? 'text-zinc-300' : 'text-gray-600'}`} />
                    <Smile className={`w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity ${isDarkMode ? 'text-zinc-300' : 'text-gray-600'}`} />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center w-full h-full">
            <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center mb-4 ${
              isDarkMode ? 'border-white/10' : 'border-black/10'
            }`}>
              <MessageCircle className={`w-12 h-12 ${isDarkMode ? 'text-white' : 'text-black'}`} />
            </div>
            <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Your messages</h2>
            <p className={`text-sm mb-6 text-center max-w-[250px] ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
              Send private photos and messages to a friend or group.
            </p>
            <button className="bg-[#0095f6] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
              Send message
            </button>
          </div>
        )}
      </div>
    </Panel>
  );
};

// ... (Rest of components: Stories, FeedPost, ProfileView remain the same as previous) ...
const Stories = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className="py-4 md:py-5 px-2 md:px-6 mb-2 md:mb-6">
      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide px-2" style={{ scrollbarWidth: 'none' }}>
        {STORIES.map((story) => (
          <div key={story.id} className="flex flex-col items-center flex-shrink-0 cursor-pointer group">
            <div className={`relative p-[2px] md:p-[3px] rounded-full mb-1 md:mb-2 transition-transform duration-300 group-hover:scale-105 ${
              story.isAdd 
                ? (isDarkMode ? 'bg-zinc-800' : 'bg-gray-300') 
                : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600'
            }`}>
              <div className={`p-0.5 md:p-1 rounded-full ${isDarkMode ? 'bg-[#0a0a0a] md:bg-[#151515]' : 'bg-[#f4f5f7] md:bg-white'}`}>
                <img src={story.image} alt={story.user} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover" />
              </div>
              {story.isAdd && (
                <div className={`absolute bottom-0 right-0 bg-[#0095f6] text-white rounded-full p-0.5 border-2 ${
                  isDarkMode ? 'border-[#0a0a0a] md:border-[#151515]' : 'border-[#f4f5f7] md:border-white'
                }`}>
                  <PlusSquare className="w-4 h-4 md:w-4 md:h-4" />
                </div>
              )}
            </div>
            <span className={`text-[11px] md:text-xs font-medium truncate w-16 text-center ${
              isDarkMode ? 'text-zinc-300' : 'text-gray-800'
            }`}>{story.user}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeedPost = ({ post }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <Panel className="mb-6 pb-4 rounded-none md:rounded-3xl border-x-0 md:border-x">
      <div className="flex items-center justify-between p-3 md:p-4">
        <div className="flex items-center cursor-pointer">
          <img src={post.user.avatar} alt={post.user.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mr-3" />
          <div className="flex flex-col md:flex-row md:items-center">
             <div className="flex items-center">
                <span className={`font-semibold text-sm mr-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>{post.user.name}</span>
                {post.user.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#0095f6] mr-2" fill="currentColor" />}
             </div>
             {post.content.type === 'video' ? (
                <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>original audio</span>
             ) : (
                <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>• {post.time}</span>
             )}
          </div>
        </div>
        <button className={`transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className={`w-full aspect-square md:aspect-video relative overflow-hidden group cursor-pointer ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-100'}`}>
        <img src={post.content.image} alt={`${post.user.name} post`} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="p-3 md:p-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <motion.button whileTap={{ scale: 0.8 }} className="text-red-500 flex items-center">
              <Heart className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" />
            </motion.button>
            <button className={`flex items-center transition-colors ${isDarkMode ? 'text-white hover:text-zinc-300' : 'text-black hover:text-gray-600'}`}>
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <button className={`transition-colors ${isDarkMode ? 'text-white hover:text-zinc-300' : 'text-black hover:text-gray-600'}`}>
              <Send className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </div>
          <button className={`transition-colors ${isDarkMode ? 'text-white hover:text-zinc-300' : 'text-black hover:text-gray-600'}`}>
            <Bookmark className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
        <div className="flex items-center mb-2">
           <div className="flex -space-x-1.5 mr-2">
                <img src="/images/user-rive.svg" className="w-5 h-5 rounded-full border border-black" alt="" />
                <img src="/images/user-adobe.svg" className="w-5 h-5 rounded-full border border-black" alt="" />
           </div>
           <span className={`text-xs md:text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
             Liked by <span className="font-bold">user123</span> and <span className="font-bold">others</span>
           </span>
        </div>
        <div className="text-sm">
          <span className={`font-semibold mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{post.user.name}</span>
          {post.user.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#0095f6] inline-block mr-2 -mt-0.5" fill="currentColor" />}
          <span className={isDarkMode ? 'text-zinc-300' : 'text-gray-800'}>{post.caption}</span>
        </div>
      </div>
    </Panel>
  );
};

const ProfileView = ({ onLogout }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-4xl mx-auto relative">
      <div className={`md:hidden flex justify-between items-center px-4 py-3 sticky top-0 z-40 transition-colors ${isDarkMode ? 'bg-[#151515]/80 backdrop-blur-xl border-b border-white/5' : 'bg-white/80 backdrop-blur-xl border-b border-gray-100'}`}>
        <button className={isDarkMode ? 'text-white' : 'text-black'}><ChevronLeft className="w-6 h-6" /></button>
        <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{CURRENT_USER.username}</h1>
        <button className={isDarkMode ? 'text-white' : 'text-black'} onClick={() => setIsMoreMenuOpen(true)}><MoreHorizontal className="w-6 h-6" /></button>
      </div>

      <AnimatePresence>
        {isMoreMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMoreMenuOpen(false)} className="fixed inset-0 bg-black/60 z-[60] md:hidden" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className={`fixed bottom-0 left-0 right-0 z-[70] rounded-t-3xl overflow-hidden md:hidden ${isDarkMode ? 'bg-[#262626]' : 'bg-white'}`}>
              <div className="flex justify-center py-3"><div className={`w-12 h-1.5 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-300'}`} /></div>
              <div className="flex flex-col pb-8">
                {[
                  { icon: Settings, label: 'Settings' },
                  { icon: Activity, label: 'Your activity' },
                  { icon: Bookmark, label: 'Saved' },
                  { icon: isDarkMode ? Sun : Moon, label: 'Switch appearance', onClick: toggleTheme },
                  { icon: AlertCircle, label: 'Report a problem' },
                ].map((item, idx) => (
                  <button key={idx} onClick={() => { if (item.onClick) item.onClick(); setIsMoreMenuOpen(false); }} className={`flex items-center px-4 py-3.5 transition-colors ${isDarkMode ? 'active:bg-white/10 text-white' : 'active:bg-black/5 text-black'}`}>
                    <item.icon className="w-6 h-6 mr-3" />
                    <span className="font-medium text-base">{item.label}</span>
                  </button>
                ))}
                <div className={`h-[1px] my-1 w-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`} />
                <button onClick={() => setIsMoreMenuOpen(false)} className={`flex items-center px-4 py-3.5 transition-colors ${isDarkMode ? 'active:bg-white/10 text-white' : 'active:bg-black/5 text-black'}`}>
                  <span className="font-medium text-base">Switch accounts</span>
                </button>
                <div className={`h-[1px] my-1 w-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`} />
                <button onClick={() => { if (onLogout) onLogout(); setIsMoreMenuOpen(false); }} className={`flex items-center px-4 py-3.5 transition-colors ${isDarkMode ? 'active:bg-white/10 text-white' : 'active:bg-black/5 text-black'}`}>
                  <span className="font-medium text-base text-red-500">Log out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Panel className="p-4 md:p-8 mb-4 md:mb-6 rounded-none md:rounded-3xl border-x-0 md:border-x">
        <div className="flex items-center gap-6 md:gap-10 mb-4 md:mb-8">
          <div className="relative shrink-0">
            <div className={`w-20 h-20 md:w-32 md:h-32 rounded-full p-[3px] ${isDarkMode ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600' : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600'}`}>
              <div className={`p-0.5 rounded-full w-full h-full ${isDarkMode ? 'bg-[#151515]' : 'bg-white'}`}>
                <img src={CURRENT_USER.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-around text-center md:text-left md:justify-start md:gap-10">
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2"><span className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{CURRENT_USER.stats.posts}</span> <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>posts</span></div>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2"><span className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{CURRENT_USER.stats.followers}</span> <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>followers</span></div>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2"><span className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{CURRENT_USER.stats.following}</span> <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>following</span></div>
          </div>
        </div>
        <div className="mb-6 px-1 md:px-0">
          <p className={`font-semibold text-sm md:text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>{CURRENT_USER.name}</p>
          <p className="text-sm text-[#0095f6] mb-1">{CURRENT_USER.category}</p>
          <div className={`text-sm leading-snug mb-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
            {CURRENT_USER.bio.split('\n').map((line, i) => <p key={i}>{line}</p>)}
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Followed by <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>antra_suna</span></p>
        </div>
        <div className="flex gap-2 w-full">
          <button className={`flex-1 py-1.5 rounded-lg font-semibold text-sm transition-colors ${isDarkMode ? 'bg-[#0095f6] text-white hover:bg-blue-600' : 'bg-[#0095f6] text-white hover:bg-blue-600'}`}>Follow</button>
          <button className={`flex-1 py-1.5 rounded-lg font-semibold text-sm transition-colors ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-gray-200 text-black hover:bg-gray-300'}`}>Message</button>
          <button className={`flex-1 py-1.5 rounded-lg font-semibold text-sm transition-colors ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-gray-200 text-black hover:bg-gray-300'}`}>Email</button>
          <button className={`px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-gray-200 text-black hover:bg-gray-300'}`}><UserCircle className="w-5 h-5" /></button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 mt-6 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {HIGHLIGHTS.map((highlight) => (
            <div key={highlight.id} className="flex flex-col items-center flex-shrink-0 cursor-pointer">
              <div className={`p-[2px] rounded-full mb-1 border ${isDarkMode ? 'border-zinc-700' : 'border-gray-300'}`}>
                <div className={`p-0.5 rounded-full ${isDarkMode ? 'bg-[#151515]' : 'bg-white'}`}>
                  <img src={highlight.image} alt={highlight.title} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover" />
                </div>
              </div>
              <span className={`text-[11px] font-medium ${isDarkMode ? 'text-zinc-300' : 'text-gray-800'}`}>{highlight.title}</span>
            </div>
          ))}
        </div>
      </Panel>

      <div className={`flex justify-around border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        <button className={`flex-1 flex justify-center items-center py-3 border-t-2 ${isDarkMode ? 'border-white text-white' : 'border-black text-black'}`}>
          <Grid className="w-6 h-6 md:w-5 md:h-5" /> <span className="hidden md:inline-block ml-2 text-sm font-medium tracking-widest uppercase">Posts</span>
        </button>
        <button className={`flex-1 flex justify-center items-center py-3 border-t-2 border-transparent transition-colors ${isDarkMode ? 'text-zinc-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
          <PlaySquare className="w-6 h-6 md:w-5 md:h-5" /> <span className="hidden md:inline-block ml-2 text-sm font-medium tracking-widest uppercase">Reels</span>
        </button>
        <button className={`flex-1 flex justify-center items-center py-3 border-t-2 border-transparent transition-colors ${isDarkMode ? 'text-zinc-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
          <UserCircle className="w-6 h-6 md:w-5 md:h-5" /> <span className="hidden md:inline-block ml-2 text-sm font-medium tracking-widest uppercase">Tagged</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-0.5 md:gap-1 mt-0.5 md:mt-1 pb-20">
        {[1,2,3,4,5,6,7,8,9].map((i) => (
          <div key={i} className={`aspect-square overflow-hidden group relative cursor-pointer ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-300'}`}>
            <img src={`/images/post-${i}.jpg`} alt={`Post ${i}`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity flex items-center justify-center gap-4">
               <div className="flex items-center text-white font-bold"><Heart className="w-5 h-5 mr-1" fill="currentColor" /> {Math.floor(Math.random() * 1000)}</div>
               <div className="flex items-center text-white font-bold hidden md:flex"><MessageCircle className="w-5 h-5 mr-1" fill="currentColor" /> {Math.floor(Math.random() * 100)}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SearchView = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const recent = ['Design system', 'Motion kit', 'Glass profile UI', 'Vintage reels'];
  const results = STORIES.filter((story) => story.user.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-5xl mx-auto">
      <Panel className="p-4 md:p-6 mb-4 md:mb-6 rounded-none md:rounded-3xl border-x-0 md:border-x">
        <div className={`flex items-center rounded-2xl px-4 py-3 border ${isDarkMode ? 'border-white/10 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
          <Search className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className={`w-full bg-transparent border-none outline-none text-sm ${isDarkMode ? 'text-white placeholder-zinc-500' : 'text-black placeholder-gray-500'}`}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {recent.map((item) => (
            <button key={item} className={`px-3 py-1.5 rounded-full text-xs transition-colors ${isDarkMode ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {item}
            </button>
          ))}
        </div>

        {query && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.length > 0 ? results.map((item) => (
              <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                <img src={item.image} alt={item.user} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.user}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Suggested account</p>
                </div>
              </div>
            )) : (
              <p className={`text-sm ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>No results found.</p>
            )}
          </div>
        )}
      </Panel>

      <div className="grid grid-cols-3 gap-1 md:gap-2 pb-20 md:pb-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <Panel key={i} className="aspect-square rounded-xl overflow-hidden border">
            <div className={`h-full w-full relative ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'}`}>
              <img src={`/images/post-${i + 1}.jpg`} alt={`Explore ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2">
                <span className={`text-[11px] px-2 py-1 rounded-full ${isDarkMode ? 'bg-black/40 text-zinc-200' : 'bg-white/70 text-gray-700'}`}>Explore</span>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </motion.div>
  );
};

const ReelsView = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-xl mx-auto pb-24">
      <div className="space-y-4 md:space-y-6">
        {REELS.map((reel, idx) => (
          <Panel key={reel.id} className="rounded-none md:rounded-3xl overflow-hidden border-x-0 md:border-x">
            <div className="aspect-[9/14] relative">
              <img src={reel.image} alt={`${reel.user} reel`} className="absolute inset-0 w-full h-full object-cover" />
              <div className={`absolute inset-0 ${idx % 2 === 0 ? 'bg-gradient-to-b from-black/20 via-slate-900 to-black' : 'bg-gradient-to-b from-black/20 via-emerald-900 to-black'}`} />
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4),transparent_35%)]" />

              <div className="absolute left-4 bottom-4 right-16">
                <div className="flex items-center gap-2 mb-2">
                  <img src={reel.avatar} alt={reel.user} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-white text-sm font-semibold">{reel.user}</span>
                  <button className="text-xs text-white border border-white/40 px-2 py-1 rounded-md">Follow</button>
                </div>
                <p className="text-white/90 text-sm leading-snug">{reel.caption}</p>
              </div>

              <div className="absolute right-3 bottom-4 flex flex-col items-center gap-4">
                <button className="text-white flex flex-col items-center">
                  <Heart className="w-7 h-7" />
                  <span className="text-[11px] mt-1">{reel.likes}</span>
                </button>
                <button className="text-white flex flex-col items-center">
                  <MessageCircle className="w-7 h-7" />
                  <span className="text-[11px] mt-1">{reel.comments}</span>
                </button>
                <button className="text-white"><Send className="w-7 h-7" /></button>
                <button className="text-white"><Bookmark className="w-7 h-7" /></button>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <p className={`text-center text-xs mt-4 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Reels redesigned for your current aesthetic.</p>
    </motion.div>
  );
};

const NotificationsView = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-2xl mx-auto pb-20">
      <Panel className="rounded-none md:rounded-3xl border-x-0 md:border-x overflow-hidden">
        <div className={`px-4 py-4 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Notifications</h2>
        </div>

        <div className="divide-y divide-black/5 dark:divide-white/10">
          {NOTIFICATIONS.map((item) => (
            <div key={item.id} className="px-4 py-3 flex items-center gap-3">
              <img src={item.avatar} alt={item.user} className="w-12 h-12 rounded-full object-cover" />
              <p className={`text-sm flex-1 ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.user}</span> {item.text}
                <span className={`ml-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{item.time}</span>
              </p>
              {item.type === 'follow' ? (
                <button className="bg-[#0095f6] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors">Follow</button>
              ) : (
                <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`} />
              )}
            </div>
          ))}
        </div>
      </Panel>
    </motion.div>
  );
};

const CreateView = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [caption, setCaption] = useState('');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-3xl mx-auto pb-20">
      <Panel className="rounded-none md:rounded-3xl border-x-0 md:border-x overflow-hidden">
        <div className={`px-4 py-4 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Create new post</h2>
          <button className="text-[#0095f6] text-sm font-semibold hover:text-blue-400">Share</button>
        </div>

        <div className="grid md:grid-cols-2">
          <div className={`aspect-square md:aspect-auto md:min-h-[420px] flex items-center justify-center ${isDarkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
            <div className="text-center px-6">
              <ImageIcon className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-zinc-300' : 'text-gray-500'}`} />
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Drag photos and videos here</p>
              <button className="bg-[#0095f6] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors">Select from computer</button>
            </div>
          </div>

          <div className={`p-4 ${isDarkMode ? 'bg-[#151515]/60' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-4">
              <img src={CURRENT_USER.avatar} alt={CURRENT_USER.username} className="w-8 h-8 rounded-full object-cover" />
              <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{CURRENT_USER.username}</span>
            </div>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              maxLength={2200}
              className={`w-full h-40 resize-none rounded-xl border p-3 text-sm outline-none ${
                isDarkMode
                  ? 'bg-black/30 border-white/10 text-white placeholder-zinc-500'
                  : 'bg-gray-50 border-gray-200 text-black placeholder-gray-500'
              }`}
            />
            <p className={`text-xs text-right mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{caption.length}/2200</p>

            <div className="mt-4 space-y-2">
              {['Add location', 'Accessibility', 'Advanced settings'].map((item) => (
                <button key={item} className={`w-full flex items-center justify-between p-3 rounded-xl text-sm ${isDarkMode ? 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'} transition-colors`}>
                  <span>{item}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </motion.div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`min-h-[100dvh] font-sans selection:bg-[#0095f6]/30 flex flex-col md:flex-row md:items-center justify-center overflow-x-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-[#0a0a0a] text-zinc-200' : 'bg-[#f4f5f7] text-gray-800'
      }`}>
        
        {/* Ambient Lights */}
        {isDarkMode ? (
          <>
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
          </>
        ) : (
          <>
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-200/30 blur-[120px] rounded-full pointer-events-none" />
          </>
        )}

        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <LoginView key="login" onLogin={() => setIsAuthenticated(true)} />
          ) : (
            <motion.div 
              key="app"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-[1400px] h-[100dvh] md:p-8 flex flex-col md:flex-row md:gap-8 relative"
            >
              <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onLogout={() => setIsAuthenticated(false)} 
              />
              
              {activeTab === 'home' && <MobileTopNav setActiveTab={setActiveTab} />}

              {/* Notice the conditional overflow and padding for the messages tab to take up full screen beautifully */}
              <main className={`flex-1 w-full ${
                activeTab === 'message' 
                  ? 'overflow-hidden pb-0' 
                  : 'overflow-y-auto pb-16 md:pb-20 scrollbar-hide md:pr-4'
              }`} style={{ scrollbarWidth: 'none' }}>
                <AnimatePresence mode="wait">
                  {activeTab === 'home' && (
                    <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-2xl mx-auto w-full pt-0 md:pt-0">
                      <Stories />
                      {POSTS.map(post => <FeedPost key={post.id} post={post} />)}
                    </motion.div>
                  )}
                  
                  {activeTab === 'profile' && (
                    <ProfileView key="profile" onLogout={() => setIsAuthenticated(false)} />
                  )}

                  {activeTab === 'message' && (
                    <motion.div key="message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full">
                       <MessageView setActiveTab={setActiveTab} />
                    </motion.div>
                  )}

                  {activeTab === 'search' && <SearchView key="search" />}

                  {activeTab === 'reels' && <ReelsView key="reels" />}

                  {activeTab === 'notifications' && <NotificationsView key="notifications" />}

                  {activeTab === 'create' && <CreateView key="create" />}
                </AnimatePresence>
              </main>

              {/* Hide mobile bottom nav entirely when inside the messages tab */}
              {!['message'].includes(activeTab) && (
                <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}