import React, { useState } from 'react';
import {
  Building2,
  BookOpen,
  BookMarked,
  Layers,
  Plus,
  Trash2,
  Edit2,
  X,
  Users,
  Award,
} from 'lucide-react';
import { Department, Course, Subject, ClassGroup, Faculty } from '../../types/admin';

interface AcademicProps {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  classes: ClassGroup[];
  setClasses: React.Dispatch<React.SetStateAction<ClassGroup[]>>;
  faculty: Faculty[];
  initialSubTab?: 'departments' | 'courses' | 'subjects' | 'classes';
}

export const AdminAcademicManagement: React.FC<AcademicProps> = ({
  departments,
  setDepartments,
  courses,
  setCourses,
  subjects,
  setSubjects,
  classes,
  setClasses,
  faculty,
  initialSubTab = 'departments',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'departments' | 'courses' | 'subjects' | 'classes'>(
    initialSubTab
  );

  // Department Modal
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [deptForm, setDeptForm] = useState({ code: '', name: '', hodName: '', description: '' });

  // Course Modal
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({
    code: '',
    name: '',
    durationYears: 4,
    totalSemesters: 8,
    departmentId: departments[0]?.id || '',
    description: '',
  });

  // Subject Modal
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectForm, setSubjectForm] = useState({
    code: '',
    name: '',
    credits: 4,
    semester: 4,
    departmentId: departments[0]?.id || '',
    facultyId: faculty[0]?.id || '',
  });

  // Class Modal
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [classForm, setClassForm] = useState({
    name: '',
    section: 'A',
    batch: '2023-2027',
    departmentId: departments[0]?.id || '',
    courseId: courses[0]?.id || '',
    semester: 4,
    roomNumber: 'Lab B-302',
    advisorFacultyId: faculty[0]?.id || '',
  });

  // Department handlers
  const handleSaveDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const newDept: Department = {
      id: `dept-${Date.now()}`,
      code: deptForm.code || 'DEPT',
      name: deptForm.name || 'New Department',
      hodName: deptForm.hodName || 'HOD Name',
      description: deptForm.description || '',
      studentCount: 0,
      facultyCount: 0,
    };
    setDepartments((prev) => [...prev, newDept]);
    setIsDeptModalOpen(false);
  };

  const handleDeleteDept = (id: string) => {
    if (confirm('Delete this department?')) {
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // Course handlers
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const deptObj = departments.find((d) => d.id === courseForm.departmentId);
    const newCourse: Course = {
      id: `crs-${Date.now()}`,
      code: courseForm.code || 'COURSE',
      name: courseForm.name || 'New Degree Program',
      durationYears: Number(courseForm.durationYears) || 4,
      totalSemesters: Number(courseForm.totalSemesters) || 8,
      departmentId: courseForm.departmentId || departments[0]?.id || '',
      departmentName: deptObj?.name || 'Computer Science',
      description: courseForm.description || '',
    };
    setCourses((prev) => [...prev, newCourse]);
    setIsCourseModalOpen(false);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Delete course program?')) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Subject handlers
  const handleSaveSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const deptObj = departments.find((d) => d.id === subjectForm.departmentId);
    const facObj = faculty.find((f) => f.id === subjectForm.facultyId);

    const newSub: Subject = {
      id: `sub-${Date.now()}`,
      code: subjectForm.code || 'SUB101',
      name: subjectForm.name || 'New Subject',
      credits: Number(subjectForm.credits) || 4,
      semester: Number(subjectForm.semester) || 4,
      departmentId: subjectForm.departmentId || departments[0]?.id || '',
      departmentName: deptObj?.name || 'Computer Science',
      facultyId: subjectForm.facultyId,
      facultyName: facObj?.name,
    };
    setSubjects((prev) => [...prev, newSub]);
    setIsSubjectModalOpen(false);
  };

  const handleDeleteSubject = (id: string) => {
    if (confirm('Delete subject syllabus?')) {
      setSubjects((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Class handlers
  const handleSaveClass = (e: React.FormEvent) => {
    e.preventDefault();
    const deptObj = departments.find((d) => d.id === classForm.departmentId);
    const crsObj = courses.find((c) => c.id === classForm.courseId);
    const facObj = faculty.find((f) => f.id === classForm.advisorFacultyId);

    const newClass: ClassGroup = {
      id: `cls-${Date.now()}`,
      name: classForm.name || 'CSE 4th Sem A',
      section: classForm.section || 'A',
      batch: classForm.batch || '2023-2027',
      departmentId: classForm.departmentId || departments[0]?.id || '',
      departmentName: deptObj?.name || 'Computer Science',
      courseId: classForm.courseId || courses[0]?.id || '',
      courseName: crsObj?.name || 'B.Tech CSE',
      semester: Number(classForm.semester) || 4,
      studentCount: 80,
      roomNumber: classForm.roomNumber || 'Lab B-302',
      advisorFacultyId: classForm.advisorFacultyId,
      advisorFacultyName: facObj?.name,
    };
    setClasses((prev) => [...prev, newClass]);
    setIsClassModalOpen(false);
  };

  const handleDeleteClass = (id: string) => {
    if (confirm('Delete class section?')) {
      setClasses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl">
        {[
          { id: 'departments', label: 'Departments', icon: <Building2 className="w-4 h-4" />, count: departments.length },
          { id: 'courses', label: 'Courses & Programs', icon: <BookOpen className="w-4 h-4" />, count: courses.length },
          { id: 'subjects', label: 'Subjects & Syllabi', icon: <BookMarked className="w-4 h-4" />, count: subjects.length },
          { id: 'classes', label: 'Class Sections', icon: <Layers className="w-4 h-4" />, count: classes.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
              activeSubTab === tab.id
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.5 rounded-md bg-slate-950/40 text-[10px]">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* DEPARTMENTS VIEW */}
      {activeSubTab === 'departments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div>
              <h3 className="font-extrabold text-white text-base">Academic Departments</h3>
              <p className="text-xs text-slate-400">Institutional academic divisions & HOD allocations</p>
            </div>
            <button
              onClick={() => {
                setDeptForm({ code: `DEPT-${Math.floor(100 + Math.random() * 900)}`, name: '', hodName: '', description: '' });
                setIsDeptModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Create Department</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-extrabold border border-cyan-500/30">
                      {d.code}
                    </span>
                    <h4 className="font-black text-white text-base mt-2">{d.name}</h4>
                  </div>
                  <button
                    onClick={() => handleDeleteDept(d.id)}
                    className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                    title="Delete Department"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-300">{d.description}</p>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Head of Department:</span>
                    <span className="font-bold text-white">{d.hodName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COURSES VIEW */}
      {activeSubTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div>
              <h3 className="font-extrabold text-white text-base">Degree Programs & Courses</h3>
              <p className="text-xs text-slate-400">Undergraduate & Postgraduate curriculum tracks</p>
            </div>
            <button
              onClick={() => {
                setCourseForm({
                  code: `BTECH-${Math.floor(100 + Math.random() * 900)}`,
                  name: '',
                  durationYears: 4,
                  totalSemesters: 8,
                  departmentId: departments[0]?.id || '',
                  description: '',
                });
                setIsCourseModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course Program</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] font-extrabold border border-purple-500/30">
                      {c.code}
                    </span>
                    <h4 className="font-black text-white text-base mt-2">{c.name}</h4>
                  </div>
                  <button
                    onClick={() => handleDeleteCourse(c.id)}
                    className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-300">{c.description}</p>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Department:</span>
                    <span className="font-bold text-white">{c.departmentName}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Duration:</span>
                    <span className="font-bold text-cyan-300">
                      {c.durationYears} Years ({c.totalSemesters} Semesters)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBJECTS VIEW */}
      {activeSubTab === 'subjects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div>
              <h3 className="font-extrabold text-white text-base">Subjects & Syllabi</h3>
              <p className="text-xs text-slate-400">Semester course units & assigned subject teachers</p>
            </div>
            <button
              onClick={() => {
                setSubjectForm({
                  code: `CS${Math.floor(100 + Math.random() * 800)}`,
                  name: '',
                  credits: 4,
                  semester: 4,
                  departmentId: departments[0]?.id || '',
                  facultyId: faculty[0]?.id || '',
                });
                setIsSubjectModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Subject</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono text-[10px] font-extrabold border border-pink-500/30">
                      {s.code}
                    </span>
                    <h4 className="font-black text-white text-base mt-2">{s.name}</h4>
                  </div>
                  <button
                    onClick={() => handleDeleteSubject(s.id)}
                    className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Credits & Semester:</span>
                    <span className="font-bold text-amber-300">
                      {s.credits} Credits • Sem {s.semester}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Department:</span>
                    <span className="font-bold text-white">{s.departmentName}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Faculty In-Charge:</span>
                    <span className="font-bold text-cyan-300">{s.facultyName || 'Unassigned'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CLASSES VIEW */}
      {activeSubTab === 'classes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div>
              <h3 className="font-extrabold text-white text-base">Class Sections & Batches</h3>
              <p className="text-xs text-slate-400">Room allocations & Class Advisor Faculty</p>
            </div>
            <button
              onClick={() => {
                setClassForm({
                  name: '',
                  section: 'A',
                  batch: '2023-2027',
                  departmentId: departments[0]?.id || '',
                  courseId: courses[0]?.id || '',
                  semester: 4,
                  roomNumber: 'Lab B-302',
                  advisorFacultyId: faculty[0]?.id || '',
                });
                setIsClassModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Create Class Section</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-extrabold border border-amber-500/30">
                      Batch {cls.batch}
                    </span>
                    <h4 className="font-black text-white text-base mt-2">{cls.name}</h4>
                  </div>
                  <button
                    onClick={() => handleDeleteClass(cls.id)}
                    className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Allocated Room:</span>
                    <span className="font-bold text-cyan-300">{cls.roomNumber}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Enrolled Strength:</span>
                    <span className="font-bold text-white">{cls.studentCount} Students</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Class Advisor:</span>
                    <span className="font-bold text-teal-300">{cls.advisorFacultyName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DEPARTMENT MODAL */}
      {isDeptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-base">New Academic Department</h3>
              <button onClick={() => setIsDeptModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveDepartment} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Code *</label>
                <input
                  type="text"
                  value={deptForm.code}
                  onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })}
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Department Name *</label>
                <input
                  type="text"
                  value={deptForm.name}
                  onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Head of Department (HOD)</label>
                <input
                  type="text"
                  value={deptForm.hodName}
                  onChange={(e) => setDeptForm({ ...deptForm, hodName: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  value={deptForm.description}
                  onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDeptModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COURSE MODAL */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-base">New Degree Program</h3>
              <button onClick={() => setIsCourseModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveCourse} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Course Code *</label>
                <input
                  type="text"
                  value={courseForm.code}
                  onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Program Name *</label>
                <input
                  type="text"
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Department</label>
                <select
                  value={courseForm.departmentId}
                  onChange={(e) => setCourseForm({ ...courseForm, departmentId: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black"
                >
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUBJECT MODAL */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-base">New Subject Syllabus</h3>
              <button onClick={() => setIsSubjectModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveSubject} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Subject Code *</label>
                <input
                  type="text"
                  value={subjectForm.code}
                  onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Subject Name *</label>
                <input
                  type="text"
                  value={subjectForm.name}
                  onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Credits</label>
                  <input
                    type="number"
                    value={subjectForm.credits}
                    onChange={(e) =>
                      setSubjectForm({ ...subjectForm, credits: Number(e.target.value) })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Semester</label>
                  <input
                    type="number"
                    value={subjectForm.semester}
                    onChange={(e) =>
                      setSubjectForm({ ...subjectForm, semester: Number(e.target.value) })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Faculty In-Charge</label>
                <select
                  value={subjectForm.facultyId}
                  onChange={(e) => setSubjectForm({ ...subjectForm, facultyId: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                >
                  {faculty.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.employeeId})
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLASS MODAL */}
      {isClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-base">New Class Section</h3>
              <button onClick={() => setIsClassModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveClass} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Class Section Name *</label>
                <input
                  type="text"
                  value={classForm.name}
                  onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                  placeholder="e.g. CSE 4th Sem A"
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Room Number</label>
                  <input
                    type="text"
                    value={classForm.roomNumber}
                    onChange={(e) => setClassForm({ ...classForm, roomNumber: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Batch Year</label>
                  <input
                    type="text"
                    value={classForm.batch}
                    onChange={(e) => setClassForm({ ...classForm, batch: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Class Advisor Faculty</label>
                <select
                  value={classForm.advisorFacultyId}
                  onChange={(e) => setClassForm({ ...classForm, advisorFacultyId: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                >
                  {faculty.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
