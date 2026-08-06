import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  FileSpreadsheet,
  Download,
  Trash2,
  Edit,
  Eye,
  Upload,
  QrCode,
  CheckCircle,
  X,
  History,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Student } from '../../types/superadmin';

interface StudentViewProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  departments: { name: string }[];
  courses: { name: string }[];
}

export const StudentManagementView: React.FC<StudentViewProps> = ({
  students,
  setStudents,
  departments,
  courses,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [generatedCardStudent, setGeneratedCardStudent] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Student>>({
    admissionNo: `ADM/2026/${Math.floor(100 + Math.random() * 900)}`,
    rollNo: `26CS${Math.floor(10 + Math.random() * 90)}`,
    regNo: `REG2026${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: '',
    gender: 'Male',
    dob: '2004-01-01',
    email: '',
    phone: '',
    parentName: '',
    parentPhone: '',
    address: '',
    department: departments[0]?.name || 'Computer Science & Engineering',
    course: courses[0]?.name || 'B.Tech Computer Science',
    semester: 'Semester VI',
    section: 'Section A',
    bloodGroup: 'O+',
    nationality: 'American',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    attendancePct: 95.0,
  });

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = !filterDept || s.department === filterDept;
      const matchesStatus = !filterStatus || s.status === filterStatus;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [students, searchTerm, filterDept, filterStatus]);

  // Handle Checkbox Selection
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map((s) => s.id));
    }
  };

  // Bulk Delete
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedIds.length} selected student(s)?`)) {
      setStudents((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
      setSelectedIds([]);
    }
  };

  // Save Student (Add / Edit)
  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert('Full Name and Email are required.');
      return;
    }

    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? ({ ...s, ...formData } as Student) : s))
      );
      setEditingStudent(null);
    } else {
      const newStudent: Student = {
        id: `STU-${Date.now().toString().slice(-4)}`,
        ...(formData as Student),
        history: [{ date: new Date().toISOString().split('T')[0], action: 'Enrolled', note: 'Created by Super Admin' }],
      };
      setStudents((prev) => [newStudent, ...prev]);
      setIsAddModalOpen(false);
    }
  };

  // Export Excel / CSV
  const handleExportCSV = () => {
    const headers = 'AdmissionNo,RollNo,Name,Email,Department,Course,Semester,Phone,Status\n';
    const rows = filteredStudents
      .map((s) => `"${s.admissionNo}","${s.rollNo}","${s.fullName}","${s.email}","${s.department}","${s.course}","${s.semester}","${s.phone}","${s.status}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Students_Export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-cyan-400" />
            <span>Student Management & Directory</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Total Students: <span className="font-bold text-cyan-300">{students.length}</span> | Selected: <span className="font-bold text-indigo-300">{selectedIds.length}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 font-semibold text-xs transition flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          )}

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs transition flex items-center gap-2"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Import Excel</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs transition flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => {
              setFormData({
                admissionNo: `ADM/2026/${Math.floor(100 + Math.random() * 900)}`,
                rollNo: `26CS${Math.floor(10 + Math.random() * 90)}`,
                regNo: `REG2026${Math.floor(1000 + Math.random() * 9000)}`,
                fullName: '',
                gender: 'Male',
                dob: '2004-01-01',
                email: '',
                phone: '',
                parentName: '',
                parentPhone: '',
                address: '',
                department: departments[0]?.name || 'Computer Science & Engineering',
                course: courses[0]?.name || 'B.Tech Computer Science',
                semester: 'Semester VI',
                section: 'Section A',
                bloodGroup: 'O+',
                nationality: 'American',
                status: 'Active',
                photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
                attendancePct: 95.0,
              });
              setEditingStudent(null);
              setIsAddModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Search & Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, roll no, admission no, or email..."
            className="w-full py-2 pl-10 pr-4 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
          <option value="Graduated">Graduated</option>
        </select>
      </div>

      {/* Students Data Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-slate-950/60 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                  />
                </th>
                <th className="p-4">Student</th>
                <th className="p-4">Admission & Roll</th>
                <th className="p-4">Department & Course</th>
                <th className="p-4">Semester</th>
                <th className="p-4">Attendance %</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400 italic">
                    No students matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-white/5 transition">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(student.id)}
                        onChange={() => toggleSelect(student.id)}
                        className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.photoUrl}
                          alt={student.fullName}
                          className="w-10 h-10 rounded-full object-cover border border-cyan-500/30"
                        />
                        <div>
                          <span className="font-bold text-white block">{student.fullName}</span>
                          <span className="text-[11px] text-slate-400 block">{student.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-cyan-300 block">{student.rollNo}</span>
                      <span className="text-[10px] text-slate-400 block">{student.admissionNo}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-200 block">{student.department}</span>
                      <span className="text-[10px] text-slate-400 block">{student.course}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-white/10 text-slate-300 font-semibold">
                        {student.semester} - {student.section}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-bold ${
                          student.attendancePct >= 90
                            ? 'text-emerald-400'
                            : student.attendancePct >= 75
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {student.attendancePct}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                          student.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingStudent(student)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                          title="View Profile & History"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setGeneratedCardStudent(student)}
                          className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300"
                          title="Generate Student ID Card"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingStudent(student);
                            setFormData(student);
                          }}
                          className="p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300"
                          title="Edit Student"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete student ${student.fullName}?`)) {
                              setStudents((prev) => prev.filter((s) => s.id !== student.id));
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300"
                          title="Delete Student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {(isAddModalOpen || editingStudent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">
                {editingStudent ? 'Edit Student Record' : 'Add New Student Record'}
              </h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingStudent(null);
                }}
                className="p-1 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Admission Number</label>
                  <input
                    type="text"
                    value={formData.admissionNo || ''}
                    onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={formData.rollNo || ''}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Registration Number</label>
                  <input
                    type="text"
                    value={formData.regNo || ''}
                    onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    placeholder="john@smartattend.edu"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                  <label className="text-slate-300 font-semibold block mb-1">Course</label>
                  <select
                    value={formData.course || ''}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    {courses.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Semester & Section</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.semester || ''}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className="w-1/2 p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    />
                    <input
                      type="text"
                      value={formData.section || ''}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="w-1/2 p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Parent Name & Phone</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Parent Name"
                      value={formData.parentName || ''}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-1/2 p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Parent Phone"
                      value={formData.parentPhone || ''}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      className="w-1/2 p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={formData.photoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Profile Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Student Academic Profile</span>
              </h2>
              <button onClick={() => setViewingStudent(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <img
                src={viewingStudent.photoUrl}
                alt={viewingStudent.fullName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-500/40"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{viewingStudent.fullName}</h3>
                <p className="text-xs text-cyan-300">{viewingStudent.rollNo} • {viewingStudent.admissionNo}</p>
                <p className="text-xs text-slate-400">{viewingStudent.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block">Course & Semester</span>
                <span className="font-semibold text-white">{viewingStudent.course} ({viewingStudent.semester})</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block">Attendance Score</span>
                <span className="font-bold text-emerald-400 text-sm">{viewingStudent.attendancePct}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block">Parent / Guardian</span>
                <span className="font-semibold text-white">{viewingStudent.parentName} ({viewingStudent.parentPhone})</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block">Contact Info</span>
                <span className="font-semibold text-white">{viewingStudent.phone}</span>
              </div>
            </div>

            {viewingStudent.history && viewingStudent.history.length > 0 && (
              <div className="space-y-2 border-t border-white/10 pt-4">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <History className="w-4 h-4 text-cyan-400" />
                  <span>Academic Audit Trail</span>
                </h4>
                <div className="space-y-1.5">
                  {viewingStudent.history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] p-2 rounded-xl bg-white/5">
                      <span className="text-slate-300">{h.action}: {h.note}</span>
                      <span className="text-slate-500">{h.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generated ID Card Modal */}
      {generatedCardStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-indigo-950 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-6 text-center">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-cyan-400 tracking-wider">OFFICIAL STUDENT ID</span>
              <button onClick={() => setGeneratedCardStudent(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
              <img
                src={generatedCardStudent.photoUrl}
                alt={generatedCardStudent.fullName}
                className="w-24 h-24 rounded-2xl mx-auto object-cover border-2 border-cyan-400 shadow-xl"
              />
              <div>
                <h3 className="text-lg font-black text-white">{generatedCardStudent.fullName}</h3>
                <p className="text-xs text-cyan-300 font-mono">{generatedCardStudent.rollNo}</p>
                <p className="text-[11px] text-slate-400">{generatedCardStudent.department}</p>
              </div>

              <div className="p-3 bg-white rounded-xl inline-block shadow-lg">
                <QrCode className="w-20 h-20 text-slate-900" />
              </div>
              <span className="text-[10px] text-slate-400 block font-mono">REG: {generatedCardStudent.regNo}</span>
            </div>

            <button
              onClick={() => {
                alert(`Digital ID Card for ${generatedCardStudent.fullName} sent to print driver.`);
                setGeneratedCardStudent(null);
              }}
              className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
            >
              Print ID Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
