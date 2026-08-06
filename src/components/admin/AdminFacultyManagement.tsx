import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  BookMarked,
  Edit2,
  Trash2,
  Eye,
  X,
  Award,
  BookOpen,
  Download,
  Mail,
  Phone,
  Check,
  Building2,
} from 'lucide-react';
import { Faculty, Department, Subject } from '../../types/admin';

interface FacultyProps {
  faculty: Faculty[];
  setFaculty: React.Dispatch<React.SetStateAction<Faculty[]>>;
  departments: Department[];
  subjects: Subject[];
}

export const AdminFacultyManagement: React.FC<FacultyProps> = ({
  faculty,
  setFaculty,
  departments,
  subjects,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [viewFaculty, setViewFaculty] = useState<Faculty | null>(null);
  const [assignModalFaculty, setAssignModalFaculty] = useState<Faculty | null>(null);

  // Add/Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState<Partial<Faculty>>({
    employeeId: '',
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experienceYears: 5,
    departmentId: departments[0]?.id || '',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  });

  const handleOpenAdd = () => {
    setEditingFaculty(null);
    setFormData({
      employeeId: `FAC-2023-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      email: '',
      phone: '+1 (555) 123-4567',
      qualification: 'Ph.D. Computer Science',
      experienceYears: 6,
      departmentId: departments[0]?.id || '',
      status: 'Active',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: Faculty) => {
    setEditingFaculty(f);
    setFormData({ ...f });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this faculty member?')) {
      setFaculty((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const deptObj = departments.find((d) => d.id === formData.departmentId);

    if (editingFaculty) {
      setFaculty((prev) =>
        prev.map((item) =>
          item.id === editingFaculty.id
            ? ({
                ...item,
                ...formData,
                departmentName: deptObj?.name || item.departmentName,
              } as Faculty)
            : item
        )
      );
    } else {
      const newFaculty: Faculty = {
        id: `fac-${Date.now()}`,
        employeeId: formData.employeeId || `FAC-2023-${Date.now()}`,
        name: formData.name || 'Dr. New Faculty',
        email: formData.email || 'faculty@apex.edu',
        phone: formData.phone || '+1 (555) 000-0000',
        qualification: formData.qualification || 'M.Tech / Ph.D.',
        experienceYears: Number(formData.experienceYears) || 5,
        departmentId: formData.departmentId || departments[0]?.id || '',
        departmentName: deptObj?.name || 'Computer Science & Engineering',
        assignedSubjectIds: [],
        assignedClassIds: [],
        status: (formData.status as any) || 'Active',
        photoUrl:
          formData.photoUrl ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      };
      setFaculty((prev) => [newFaculty, ...prev]);
    }
    setIsModalOpen(false);
  };

  // Assign Subject Toggle
  const handleToggleSubjectAssignment = (facId: string, subjectId: string) => {
    setFaculty((prev) =>
      prev.map((f) => {
        if (f.id !== facId) return f;
        const current = f.assignedSubjectIds || [];
        const exists = current.includes(subjectId);
        const next = exists ? current.filter((s) => s !== subjectId) : [...current, subjectId];
        return { ...f, assignedSubjectIds: next };
      })
    );
  };

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || f.departmentId === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span>Faculty & Academic Staff Management</span>
          </h2>
          <p className="text-xs text-slate-400">
            Manage institutional teaching faculty, credentials, subject workloads, and class assignments.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search faculty name, employee ID, email..."
            className="w-full py-2 pl-10 pr-4 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="ALL">All Departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFaculty.map((f) => (
          <div
            key={f.id}
            className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4 hover:border-cyan-500/40 transition group relative"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={f.photoUrl}
                  alt={f.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-cyan-500/30 shadow-lg"
                />
                <div>
                  <h3 className="font-extrabold text-white text-sm group-hover:text-cyan-300 transition">
                    {f.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">{f.employeeId}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[9px] font-black border ${
                      f.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {f.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setAssignModalFaculty(f)}
                  className="p-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20"
                  title="Assign Subjects"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenEdit(f)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 border border-white/10"
                  title="Edit Faculty"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                  title="Delete Faculty"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/50 border border-white/5 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{f.departmentName || f.departmentId}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate">{f.qualification}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate text-cyan-300">{f.email}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Exp: {f.experienceYears} Years</span>
              <span className="font-bold text-white">
                {f.assignedSubjectIds?.length || 0} Assigned Subject(s)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ASSIGN SUBJECTS MODAL */}
      {assignModalFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-black text-white text-base">
                  Assign Teaching Subjects
                </h3>
                <p className="text-xs text-slate-400">{assignModalFaculty.name}</p>
              </div>
              <button
                onClick={() => setAssignModalFaculty(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {subjects.map((sub) => {
                const isAssigned = (
                  assignModalFaculty.assignedSubjectIds || []
                ).includes(sub.id);
                return (
                  <div
                    key={sub.id}
                    onClick={() =>
                      handleToggleSubjectAssignment(assignModalFaculty.id, sub.id)
                    }
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                      isAssigned
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-950/50 border-white/5 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <p className="font-extrabold text-xs">{sub.name}</p>
                      <p className="text-[10px] text-slate-400">
                        {sub.code} • {sub.credits} Credits • Sem {sub.semester}
                      </p>
                    </div>
                    {isAssigned && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setAssignModalFaculty(null)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT FACULTY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-base">
                {editingFaculty ? 'Edit Faculty Details' : 'Add New Faculty Member'}
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
                <label className="text-slate-300 font-bold block mb-1">Faculty Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Employee ID *</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    required
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Department</label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Qualification</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Years Experience</label>
                  <input
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) =>
                      setFormData({ ...formData, experienceYears: Number(e.target.value) })
                    }
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
