import React, { useState } from 'react';
import {
  HeartHandshake,
  Plus,
  Search,
  Users,
  Edit2,
  Trash2,
  Link,
  Phone,
  Mail,
  MapPin,
  X,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { Parent, Student } from '../../types/admin';

interface ParentProps {
  parents: Parent[];
  setParents: React.Dispatch<React.SetStateAction<Parent[]>>;
  students: Student[];
}

export const AdminParentManagement: React.FC<ParentProps> = ({
  parents,
  setParents,
  students,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [linkingParent, setLinkingParent] = useState<Parent | null>(null);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [formData, setFormData] = useState<Partial<Parent>>({
    parentId: '',
    name: '',
    email: '',
    phone: '',
    occupation: '',
    address: '',
    emergencyContact: '',
  });

  const handleOpenAdd = () => {
    setEditingParent(null);
    setFormData({
      parentId: `PAR-2023-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      email: '',
      phone: '+1 (555) 999-0011',
      occupation: 'Professional / Business',
      address: 'San Jose, CA',
      emergencyContact: '+1 (555) 999-0012',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Parent) => {
    setEditingParent(p);
    setFormData({ ...p });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this parent record?')) {
      setParents((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingParent) {
      setParents((prev) =>
        prev.map((item) =>
          item.id === editingParent.id ? ({ ...item, ...formData } as Parent) : item
        )
      );
    } else {
      const newP: Parent = {
        id: `par-${Date.now()}`,
        parentId: formData.parentId || `PAR-2023-${Date.now()}`,
        name: formData.name || 'New Parent',
        email: formData.email || 'parent@gmail.com',
        phone: formData.phone || '+1 (555) 000-1111',
        occupation: formData.occupation || 'Engineer',
        address: formData.address || 'Address',
        emergencyContact: formData.emergencyContact || '+1 (555) 999-9999',
        linkedStudentIds: [],
      };
      setParents((prev) => [newP, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleToggleLinkStudent = (parentId: string, studentId: string) => {
    setParents((prev) =>
      prev.map((p) => {
        if (p.id !== parentId) return p;
        const current = p.linkedStudentIds || [];
        const exists = current.includes(studentId);
        const next = exists ? current.filter((id) => id !== studentId) : [...current, studentId];
        return { ...p, linkedStudentIds: next };
      })
    );
  };

  const filteredParents = parents.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.parentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-teal-400" />
            <span>Parent & Guardian Management</span>
          </h2>
          <p className="text-xs text-slate-400">
            Link parent accounts to multiple student wards for automated attendance SMS/Email alerts.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Parent Record</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search parent name, guardian ID, phone..."
            className="w-full py-2 pl-10 pr-4 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Parent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredParents.map((p) => {
          const linkedWards = students.filter((s) => (p.linkedStudentIds || []).includes(s.id));
          return (
            <div
              key={p.id}
              className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4 hover:border-teal-500/40 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-white text-sm">{p.name}</h3>
                  <span className="text-[10px] text-teal-400 font-mono">{p.parentId}</span>
                  <p className="text-[11px] text-slate-400">{p.occupation}</p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLinkingParent(p)}
                    className="p-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/20"
                    title="Link Children"
                  >
                    <Link className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 border border-white/10"
                    title="Edit Parent"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                    title="Delete Parent"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Contact info */}
              <div className="p-3 rounded-2xl bg-slate-950/50 border border-white/5 space-y-1 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate text-cyan-300">{p.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{p.phone}</span>
                </div>
              </div>

              {/* Linked Wards Pill List */}
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Linked Children ({linkedWards.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {linkedWards.length === 0 ? (
                    <span className="text-[11px] text-slate-500 italic">No student wards linked</span>
                  ) : (
                    linkedWards.map((w) => (
                      <span
                        key={w.id}
                        className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold"
                      >
                        {w.fullName} ({w.rollNo})
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LINK CHILDREN MODAL */}
      {linkingParent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-black text-white text-base">Link Students to Parent</h3>
                <p className="text-xs text-slate-400">{linkingParent.name}</p>
              </div>
              <button
                onClick={() => setLinkingParent(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {students.map((std) => {
                const isLinked = (linkingParent.linkedStudentIds || []).includes(std.id);
                return (
                  <div
                    key={std.id}
                    onClick={() => handleToggleLinkStudent(linkingParent.id, std.id)}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                      isLinked
                        ? 'bg-teal-500/20 border-teal-500/50 text-teal-200'
                        : 'bg-slate-950/50 border-white/5 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <p className="font-extrabold text-xs">{std.fullName}</p>
                      <p className="text-[10px] text-slate-400">
                        Roll: {std.rollNo} • Sem {std.semester} ({std.departmentName})
                      </p>
                    </div>
                    {isLinked && <Check className="w-4 h-4 text-teal-400" />}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setLinkingParent(null)}
                className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-black text-xs"
              >
                Save Links
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PARENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-base">
                {editingParent ? 'Edit Parent Record' : 'Register Parent / Guardian'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Parent Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Occupation</label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Emergency Contact</label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
                >
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
