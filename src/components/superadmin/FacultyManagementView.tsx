import React, { useState, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  Download,
  Trash2,
  Edit,
  Eye,
  BookOpen,
  Layers,
  Award,
  Briefcase,
  X,
  Phone,
  Mail,
  Building2,
} from 'lucide-react';
import { Faculty } from '../../types/superadmin';

interface FacultyViewProps {
  faculty: Faculty[];
  setFaculty: React.Dispatch<React.SetStateAction<Faculty[]>>;
  departments: { name: string }[];
  subjects: { name: string }[];
  classes: { name: string }[];
}

export const FacultyManagementView: React.FC<FacultyViewProps> = ({
  faculty,
  setFaculty,
  departments,
  subjects,
  classes,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [viewingFaculty, setViewingFaculty] = useState<Faculty | null>(null);

  const [formData, setFormData] = useState<Partial<Faculty>>({
    fullName: '',
    email: '',
    phone: '',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    department: departments[0]?.name || 'Computer Science & Engineering',
    qualification: 'Ph.D. in Computer Science',
    experience: '8 Years',
    employmentStatus: 'Active',
    assignedSubjects: [],
    assignedClasses: [],
  });

  const filteredFaculty = useMemo(() => {
    return faculty.filter((f) => {
      const matchesSearch =
        f.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.qualification.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = !filterDept || f.department === filterDept;
      return matchesSearch && matchesDept;
    });
  }, [faculty, searchTerm, filterDept]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    if (editingFaculty) {
      setFaculty((prev) =>
        prev.map((f) => (f.id === editingFaculty.id ? ({ ...f, ...formData } as Faculty) : f))
      );
      setEditingFaculty(null);
    } else {
      const newFac: Faculty = {
        id: `FAC-${Date.now().toString().slice(-3)}`,
        ...(formData as Faculty),
      };
      setFaculty((prev) => [newFac, ...prev]);
      setIsModalOpen(false);
    }
  };

  const handleExportCSV = () => {
    const headers = 'ID,Name,Email,Department,Qualification,Experience,Status\n';
    const rows = filteredFaculty
      .map((f) => `"${f.id}","${f.fullName}","${f.email}","${f.department}","${f.qualification}","${f.experience}","${f.employmentStatus}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Faculty_List_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-indigo-400" />
            <span>Faculty & Academic Staff Directory</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Total Professors & Lecturers: <span className="font-bold text-indigo-300">{faculty.length}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs transition flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Faculty CSV</span>
          </button>
          <button
            onClick={() => {
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
                department: departments[0]?.name || 'Computer Science & Engineering',
                qualification: 'Ph.D. in Computer Science',
                experience: '8 Years',
                employmentStatus: 'Active',
                assignedSubjects: [],
                assignedClasses: [],
              });
              setEditingFaculty(null);
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Faculty</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by faculty name, qualification, or email..."
            className="w-full py-2 pl-10 pr-4 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((f) => (
          <div
            key={f.id}
            className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4 hover:border-indigo-500/40 transition duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={f.photoUrl}
                    alt={f.fullName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/30"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{f.fullName}</h3>
                    <span className="text-[11px] text-indigo-300 block">{f.department}</span>
                    <span className="text-[10px] text-slate-400 block">{f.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-slate-300">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{f.qualification}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{f.experience} Experience</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    {f.assignedSubjects.length > 0 ? f.assignedSubjects.join(', ') : 'No subjects assigned'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {f.employmentStatus}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewingFaculty(f)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setEditingFaculty(f);
                    setFormData(f);
                  }}
                  className="p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove faculty record for ${f.fullName}?`)) {
                      setFaculty((prev) => prev.filter((item) => item.id !== f.id));
                    }
                  }}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Faculty Modal */}
      {(isModalOpen || editingFaculty) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-white">
                {editingFaculty ? 'Edit Faculty Member' : 'Add Faculty Member'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingFaculty(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
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
                  <label className="text-slate-300 font-semibold block mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Department</label>
                  <select
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    {departments.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience || ''}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Qualification</label>
                <input
                  type="text"
                  value={formData.qualification || ''}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingFaculty(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-500 text-white font-bold">
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
