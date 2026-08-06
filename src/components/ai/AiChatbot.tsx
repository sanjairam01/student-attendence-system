import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  RefreshCw,
  HelpCircle,
  FileText,
  Calendar,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import { ChatMessage } from '../../types/ai';

interface AiChatbotProps {
  userRole?: 'student' | 'faculty' | 'admin';
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ userRole = 'student' }) => {
  const [activeRole, setActiveRole] = useState<'student' | 'faculty' | 'admin'>(userRole);
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'AI',
      text: `Hello! I am your AI Attendance Intelligence Assistant. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      roleContext: activeRole,
      suggestions:
        activeRole === 'student'
          ? ['What is my attendance percentage?', 'Show my class timetable', 'What is my leave application status?']
          : activeRole === 'faculty'
          ? ['Show today\'s scheduled classes', 'Which students are below 75% attendance?', 'Generate attendance summary report']
          : ['Give me department health statistics', 'Show attendance forecast trends', 'Generate monthly institutional report'],
    },
  ]);

  const handleRoleChange = (role: 'student' | 'faculty' | 'admin') => {
    setActiveRole(role);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'AI',
        text: `Switched context to ${role.toUpperCase()} AI Assistant mode. Ask me anything regarding your schedule, attendance percentage, or reports.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roleContext: role,
        suggestions:
          role === 'student'
            ? ['What is my attendance percentage?', 'Show my class timetable', 'What is my leave application status?']
            : role === 'faculty'
            ? ['Show today\'s scheduled classes', 'Which students are below 75% attendance?', 'Generate attendance summary report']
            : ['Give me department health statistics', 'Show attendance forecast trends', 'Generate monthly institutional report'],
      },
    ]);
  };

  const generateBotReply = (query: string): string => {
    const q = query.toLowerCase();

    if (activeRole === 'student') {
      if (q.includes('attendance') || q.includes('percentage') || q.includes('my attendance')) {
        return `📊 **Your Current Attendance Summary:**\n- **Overall Attendance:** 88.4%\n- **Distributed Systems:** 91.2% (Eligible)\n- **Machine Learning:** 84.0% (Eligible)\n- **Database Systems:** 72.5% (🚨 At Risk - below 75% threshold).\n\n*Recommendation:* Attend the next 3 Database Systems lectures to raise your percentage above 75%.`;
      }
      if (q.includes('timetable') || q.includes('class')) {
        return `📅 **Today's Class Schedule (Aug 5, 2026):**\n1. 09:00 AM - 10:00 AM: Machine Learning (Hall 302)\n2. 10:15 AM - 11:15 AM: Distributed Systems (Lab 4)\n3. 02:00 PM - 04:00 PM: Project Review (Seminar Hall B)`;
      }
      if (q.includes('leave') || q.includes('status')) {
        return `📝 **Leave Request Status:**\n- **Application ID:** #LV-2026-881\n- **Type:** Medical Leave (2 Days)\n- **Status:** ✅ Approved by Dr. Aris Thorne (HOD, CSE) on Aug 4, 2026.`;
      }
      return `I analyzed your student profile. Your overall attendance is 88.4%. You are on track for end-of-semester exam eligibility.`;
    }

    if (activeRole === 'faculty') {
      if (q.includes('today') || q.includes('classes')) {
        return `👨‍🏫 **Your Schedule Today (Dr. Aris Thorne):**\n- 09:00 AM: B.Tech CSE Sem VI - Machine Learning (38 Enrolled)\n- 11:30 AM: B.Tech CSE Sem IV - Data Structures (42 Enrolled)\n- 03:00 PM: Post-Graduate Research Seminar`;
      }
      if (q.includes('below') || q.includes('defaulter') || q.includes('75%') || q.includes('limit')) {
        return `⚠️ **Students Below 75% Cutoff in your subjects:**\n1. Rahul Varma (21CS042) - 62.4% (5 Consecutive Absences)\n2. Priya Sundaram (21IT005) - 73.2% (Medical threshold warning)\n\n*Auto-action:* Warning notifications generated and ready for dispatch.`;
      }
      if (q.includes('report') || q.includes('summary')) {
        return `📈 **Attendance Summary Report Generated:**\n- Total Classes Conducted: 42\n- Average Class Attendance: 89.2%\n- Submission Promptness: 98.5% (Exemplary)`;
      }
      return `I can help you review class attendance records, log today's class, or flag students requiring academic counselling.`;
    }

    // Admin role
    if (q.includes('department') || q.includes('statistics')) {
      return `🏛️ **Department Health Breakdown:**\n1. **CSE:** 88.4% Avg Attendance (Health Score: 92/100)\n2. **IT:** 86.1% Avg Attendance (Health Score: 88/100)\n3. **ECE:** 81.5% Avg Attendance (Health Score: 76/100)\n4. **ME:** 74.2% Avg Attendance (⚠️ Health Score: 61/100 - High Risk)`;
    }
    if (q.includes('trend') || q.includes('forecast')) {
      return `🔮 **AI Attendance Forecast:**\n- **Next Week:** Projected 84.5% overall attendance.\n- **Potential Dip:** Friday afternoon lectures estimated to experience an 11% drop due to upcoming festival holiday.`;
    }
    return `Enterprise AI Administrative Engine active. All 4 department nodes responding normally.`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'USER',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      roleContext: activeRole,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const replyText = generateBotReply(query);
      const botMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roleContext: activeRole,
        suggestions:
          activeRole === 'student'
            ? ['Show my subject attendance breakdown', 'Download attendance certificate']
            : activeRole === 'faculty'
            ? ['Send parent alert to defaulters', 'View department logs']
            : ['Download full monthly PDF report', 'Recalculate AI forecast models'],
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4 max-w-4xl mx-auto shadow-2xl">
      {/* Header & Role Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Smart Attendance AI Chat Assistant</h2>
            <p className="text-xs text-slate-400">Context-aware conversational intelligence</p>
          </div>
        </div>

        {/* Role toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-white/10">
          {(['student', 'faculty', 'admin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChange(r)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                activeRole === r
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Stream */}
      <div className="h-96 overflow-y-auto space-y-4 pr-2 text-xs">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${msg.sender === 'USER' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${
                msg.sender === 'USER'
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                  : 'bg-gradient-to-br from-cyan-500 to-purple-600'
              }`}
            >
              {msg.sender === 'USER' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] space-y-2`}>
              <div
                className={`p-4 rounded-2xl border backdrop-blur-md ${
                  msg.sender === 'USER'
                    ? 'bg-cyan-600/20 border-cyan-500/30 text-white'
                    : 'bg-slate-950/80 border-white/10 text-slate-200'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                <div className="text-[10px] text-slate-500 mt-2 text-right">{msg.timestamp}</div>
              </div>

              {/* Quick suggestions */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-500/20 text-cyan-300 border border-white/10 text-[11px] transition-all cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
        <input
          type="text"
          placeholder={`Ask about attendance %, timetable, defaulters, or reports...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
        />
        <button
          onClick={() => handleSend()}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:opacity-90 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
