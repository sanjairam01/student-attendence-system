import React, { useState } from 'react';
import { UserCheck, Plus, Search, Trash2, Edit, Eye, Phone, Mail, GraduationCap, X } from 'lucide-react';
import { Parent, Student } from '../../types/superadmin';

interface ParentViewProps {
  parents: Parent[];
  setParents: React.Dispatch<React.SetStateAction<Parent[]>>;
  students: Student[];
}

export const ParentManagementView: React.FC<ParentViewProps> = ({ parents, setParents, students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);

  const [formData, setFormData] = useState<Partial<Parent>>({
    fullName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    address: '',
    children: [],
  });

  const filteredParents = parents.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm)
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    if (editingParent) {
      setParents((prev) =>
        prev.map((p) => (p.id === editingParent.id ? ({ ...p, ...formData } as Parent) : p))
      );
      setEditingParent(null);
    } else {
      const newParent: Parent = {
        id: `PAR-${Date.now().toString().slice(-3)}`,
        ...(formData as Parent),
        children: formData.children || [],
      };
      setParents((prev) => [newParent, ...prev]);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-emerald-400" />
            <span>Parent & Guardian Registry</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Registered Parents: <span className="font-bold text-emerald-300">{parents.length}</span> (Multiple Children Linked)
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({ fullName: '', email: '', phone: '', emergencyContact: '', address: '', children: [] });
            setEditingParent(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Link Parent / Guardian</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by parent name, phone, or email..."
            className="w-full py-2 pl-10 pr-4 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredParents.map((parent) => (
          <div key={parent.id} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{parent.fullName}</h3>
                <span className="text-xs text-emerald-400 font-semibold">{parent.phone}</span>
                <span className="text-[11px] text-slate-400 block">{parent.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setEditingParent(parent);
                    setFormData(parent);
                  }}
                  className="p-2 rounded-xl bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove parent ${parent.fullName}?`)) {
                      setParents((prev) => prev.filter((p) => p.id !== parent.id));
                    }
                  }}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold block">
                Emergency Contact & Address
              </span>
              <p className="text-slate-200">
                <span className="font-semibold text-rose-400">Emergency:</span> {parent.emergencyContact || 'N/A'}
              </p>
              <p className="text-slate-300 truncate">{parent.address}</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold block flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Linked Wards ({parent.children.length})</span>
              </span>
              <div className="space-y-1">
                {parent.children.map((child, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="font-semibold text-white">{child.studentName} ({child.rollNo})</span>
                    <span className="text-[10px] text-cyan-300">{child.department}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Parent Modal */}
      {(isModalOpen || editingParent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-white">
                {editingParent ? 'Edit Parent Profile' : 'Link New Parent'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingParent(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Parent Full Name</label>
                <input
                  type="text"
                  value={formData.fullName || ''}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Emergency Contact</label>
                  <input
                    type="text"
                    value={formData.emergencyContact || ''}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingParent(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold">
                  Save Parent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
