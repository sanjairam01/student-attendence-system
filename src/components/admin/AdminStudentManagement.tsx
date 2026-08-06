import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit2,
  Trash2,
  Eye,
  X,
  Check,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle,
  Award,
  Sparkles,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Student, Department, Course } from '../../types/admin';

interface StudentProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  departments: Department[];
  courses: Course[];
}

export const AdminStudentManagement: React.FC<StudentProps> = ({
  students,
  setStudents,
  departments,
  courses,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [selectedSemester, setSelectedSemester] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Drawer / Modal states
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<Partial<Student>>({
    admissionNo: '',
    rollNo: '',
    registerNo: '',
    fullName: '',
    gender: 'Male',
    dob: '2004-01-01',
    bloodGroup: 'O+',
    departmentId: departments[0]?.id || '',
    courseId: courses[0]?.id || '',
    semester: 4,
    section: 'A',
    email: '',
    phone: '',
    address: '',
    parentName: '',
    parentPhone: '',
    emergencyContact: '',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  });

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    const newRoll = `23CSE${Math.floor(100 + Math.random() * 800)}`;
    setFormData({
      admissionNo: `ADM-2023-${Math.floor(1000 + Math.random() * 9000)}`,
      rollNo: newRoll,
      registerNo: `710023104${Math.floor(100 + Math.random() * 800)}`,
      fullName: '',
      gender: 'Male',
      dob: '2004-05-15',
      bloodGroup: 'O+',
      departmentId: departments[0]?.id || '',
      courseId: courses[0]?.id || '',
      semester: 4,
      section: 'A',
      email: '',
      phone: '',
      address: '',
      parentName: '',
      parentPhone: '',
      emergencyContact: '',
      status: 'Active',
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    });
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (student: Student) => {
    setEditingStudent(student);
    setFormData({ ...student });
    setIsAddEditModalOpen(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student record?')) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const deptObj = departments.find((d) => d.id === formData.departmentId);
    const crsObj = courses.find((c) => c.id === formData.courseId);

    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id
            ? ({
                ...s,
                ...formData,
                departmentName: deptObj?.name || s.departmentName,
                courseName: crsObj?.name || s.courseName,
              } as Student)
            : s
        )
      );
    } else {
      const newStudent: Student = {
        id: `std-${Date.now()}`,
        admissionNo: formData.admissionNo || `ADM-2023-${Date.now()}`,
        rollNo: formData.rollNo || '23CSE999',
        registerNo: formData.registerNo || '710023104999',
        fullName: formData.fullName || 'New Student',
        photoUrl:
          formData.photoUrl ||
          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
        gender: (formData.gender as any) || 'Male',
        dob: formData.dob || '2004-01-01',
        bloodGroup: formData.bloodGroup || 'O+',
        departmentId: formData.departmentId || departments[0]?.id || '',
        departmentName: deptObj?.name || 'Computer Science & Engineering',
        courseId: formData.courseId || courses[0]?.id || '',
        courseName: crsObj?.name || 'B.Tech Computer Science',
        semester: Number(formData.semester) || 4,
        section: formData.section || 'A',
        email: formData.email || 'student@apex.edu',
        phone: formData.phone || '+1 (555) 000-1122',
        address: formData.address || 'San Jose, CA',
        parentName: formData.parentName || 'Guardian Name',
        parentPhone: formData.parentPhone || '+1 (555) 999-0000',
        emergencyContact: formData.emergencyContact || '+1 (555) 999-0001',
        status: (formData.status as any) || 'Active',
        attendancePct: 92.5,
        academicGpa: 3.75,
      };
      setStudents((prev) => [newStudent, ...prev]);
    }
    setIsAddEditModalOpen(false);
  };

  // Bulk Export CSV
  const handleExportCSV = () => {
    const headers = [
      'AdmissionNo',
      'RollNo',
      'RegisterNo',
      'FullName',
      'Email',
      'Department',
      'Course',
      'Semester',
      'Section',
      'AttendancePct',
      'Status',
    ];
    const rows = filteredStudents.map((s) => [
      s.admissionNo,
      s.rollNo,
      s.registerNo,
      `"${s.fullName}"`,
      s.email,
      `"${s.departmentName || s.departmentId}"`,
      `"${s.courseName || s.courseId}"`,
      s.semester,
      s.section,
      s.attendancePct,
      s.status,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `apex_students_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === 'ALL' || s.departmentId === selectedDepartment;
    const matchesSem = selectedSemester === 'ALL' || String(s.semester) === selectedSemester;
    const matchesStatus = selectedStatus === 'ALL' || s.status === selectedStatus;
    return matchesSearch && matchesDept && matchesSem && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <span>Student Information System (SIS)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Manage complete student lifecycle, academic status, and attendance profiles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, roll no, email..."
            className="w-full py-2 pl-10 pr-4 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Dept Filter */}
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="ALL">All Departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Semester Filter */}
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="ALL">All Semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={String(sem)}>
              Semester {sem}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Graduated">Graduated</option>
        </select>
      </div>

      {/* Student List Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 uppercase text-[10px] font-extrabold text-slate-400 border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Roll / Reg No</th>
                <th className="py-3.5 px-4">Department & Class</th>
                <th className="py-3.5 px-4">Attendance %</th>
                <th className="py-3.5 px-4">GPA</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400 italic">
                    No students match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.photoUrl}
                          alt={s.fullName}
                          className="w-10 h-10 rounded-2xl object-cover ring-2 ring-cyan-500/20 shadow"
                        />
                        <div>
                          <p className="font-extrabold text-white">{s.fullName}</p>
                          <p className="text-[10px] text-slate-400">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-200">
                      <div>{s.rollNo}</div>
                      <div className="text-[10px] text-slate-400">{s.admissionNo}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-white font-bold">{s.departmentName || s.departmentId}</p>
                      <p className="text-[10px] text-slate-400">
                        Sem {s.semester} - Section {s.section}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black ${
                            s.attendancePct < 75 ? 'text-rose-400 font-extrabold' : 'text-emerald-400'
                          }`}
                        >
                          {s.attendancePct}%
                        </span>
                        {s.attendancePct < 75 && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold">
                            Defaulter
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-amber-300">{s.academicGpa}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                          s.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : s.status === 'Graduated'
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewStudent(s)}
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-white/10"
                          title="View Profile Drawer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(s)}
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 border border-white/10"
                          title="Edit Student"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(s.id)}
                          className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
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

      {/* STUDENT PROFILE DRAWER */}
      {viewStudent && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border-l border-white/10 h-full overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Student Academic Dossier</span>
              </h3>
              <button
                onClick={() => setViewStudent(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Header */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 flex items-center gap-4">
              <img
                src={viewStudent.photoUrl}
                alt={viewStudent.fullName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500 shadow-xl"
              />
              <div>
                <h4 className="text-lg font-black text-white">{viewStudent.fullName}</h4>
                <p className="text-xs text-cyan-400 font-bold">{viewStudent.rollNo}</p>
                <p className="text-[11px] text-slate-400">{viewStudent.departmentName}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Attendance Rate</span>
                <p className="text-xl font-black text-emerald-400">{viewStudent.attendancePct}%</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Cumulative GPA</span>
                <p className="text-xl font-black text-amber-400">{viewStudent.academicGpa} / 4.0</p>
              </div>
            </div>

            {/* Personal & Academic Details */}
            <div className="space-y-3 text-xs">
              <h5 className="font-extrabold text-slate-200 uppercase text-[10px] tracking-wider">
                Demographics & Contacts
              </h5>
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Admission No:</span>
                  <span className="font-bold text-white">{viewStudent.admissionNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Register No:</span>
                  <span className="font-bold text-white">{viewStudent.registerNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-bold text-cyan-300">{viewStudent.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span>{viewStudent.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gender / DOB:</span>
                  <span>
                    {viewStudent.gender} ({viewStudent.dob})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Blood Group:</span>
                  <span className="font-bold text-rose-400">{viewStudent.bloodGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Parent / Guardian:</span>
                  <span>
                    {viewStudent.parentName} ({viewStudent.parentPhone})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Emergency Contact:</span>
                  <span className="font-bold text-amber-400">{viewStudent.emergencyContact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Address:</span>
                  <span>{viewStudent.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT STUDENT MODAL */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl my-8 p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-black text-white">
                {editingStudent ? 'Edit Student Record' : 'Register New Student'}
              </h3>
              <button
                onClick={() => setIsAddEditModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Institutional Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Roll Number *</label>
                  <input
                    type="text"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    required
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Admission Number *</label>
                  <input
                    type="text"
                    value={formData.admissionNo}
                    onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                    required
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Department *</label>
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

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Course / Program *</label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Semester & Section</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                      className="w-1/2 py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <option key={s} value={s}>
                          Sem {s}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      placeholder="Section (A/B)"
                      className="w-1/2 py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Parent Name & Phone</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="Parent Name"
                      className="w-1/2 py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="text"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      placeholder="Parent Phone"
                      className="w-1/2 py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
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

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
