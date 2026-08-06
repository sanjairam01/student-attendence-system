import React, { useState } from 'react';
import { Building2, BookOpen, BookMarked, Layers, Plus, Edit, Trash2, Users, X } from 'lucide-react';
import { Department, Course, Subject, ClassItem } from '../../types/superadmin';

interface AcademicViewProps {
  activeSection: 'departments' | 'courses' | 'subjects' | 'classes';
  setActiveSection: (section: 'departments' | 'courses' | 'subjects' | 'classes') => void;
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  classes: ClassItem[];
  setClasses: React.Dispatch<React.SetStateAction<ClassItem[]>>;
  facultyList: { fullName: string }[];
}

export const AcademicManagementView: React.FC<AcademicViewProps> = ({
  activeSection,
  setActiveSection,
  departments,
  setDepartments,
  courses,
  setCourses,
  subjects,
  setSubjects,
  classes,
  setClasses,
  facultyList,
}) => {
  const [modalType, setModalType] = useState<string | null>(null);

  // Form states
  const [deptForm, setDeptForm] = useState<Partial<Department>>({ name: '', code: '', head: '', description: '', studentCount: 0, facultyCount: 0 });
  const [courseForm, setCourseForm] = useState<Partial<Course>>({ name: '', code: '', duration: '4 Years', semesterCount: 8, department: departments[0]?.name || '', description: '' });
  const [subjectForm, setSubjectForm] = useState<Partial<Subject>>({ name: '', code: '', credits: 3, semester: 'Semester I', department: departments[0]?.name || '', course: courses[0]?.name || '', assignedFaculty: facultyList[0]?.fullName || '' });
  const [classForm, setClassForm] = useState<Partial<ClassItem>>({ name: '', batch: 'Batch 2023-2027', academicYear: '2025-2026', semester: 'Semester VI', section: 'Section A', roomNumber: 'Hall 101', assignedFaculty: facultyList[0]?.fullName || '', studentCount: 60 });

  return (
    <div className="space-y-6">
      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        {[
          { id: 'departments', label: 'Departments', icon: <Building2 className="w-4 h-4" /> },
          { id: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'subjects', label: 'Subjects', icon: <BookMarked className="w-4 h-4" /> },
          { id: 'classes', label: 'Classes / Sections', icon: <Layers className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs transition ${
              activeSection === tab.id
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* DEPARTMENTS TAB */}
      {activeSection === 'departments' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Academic Departments</h2>
            <button
              onClick={() => {
                setDeptForm({ name: '', code: '', head: facultyList[0]?.fullName || 'Dr. Miller', description: '', studentCount: 100, facultyCount: 10 });
                setModalType('add_dept');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Department</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((d) => (
              <div key={d.id} className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white">{d.name} ({d.code})</h3>
                    <p className="text-xs text-cyan-300">HOD: {d.head}</p>
                  </div>
                  <button
                    onClick={() => setDepartments((prev) => prev.filter((item) => item.id !== d.id))}
                    className="text-rose-400 hover:text-rose-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">{d.description}</p>
                <div className="flex gap-4 pt-2 border-t border-white/10 text-xs">
                  <span className="text-emerald-400 font-semibold">{d.studentCount} Students</span>
                  <span className="text-indigo-400 font-semibold">{d.facultyCount} Faculty</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COURSES TAB */}
      {activeSection === 'courses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Academic Courses & Programs</h2>
            <button
              onClick={() => {
                setCourseForm({ name: '', code: '', duration: '4 Years', semesterCount: 8, department: departments[0]?.name || '', description: '' });
                setModalType('add_course');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((c) => (
              <div key={c.id} className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white">{c.name} ({c.code})</h3>
                    <p className="text-xs text-cyan-300">{c.department}</p>
                  </div>
                  <button
                    onClick={() => setCourses((prev) => prev.filter((item) => item.id !== c.id))}
                    className="text-rose-400 hover:text-rose-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300">{c.description}</p>
                <div className="flex gap-4 pt-2 border-t border-white/10 text-xs font-semibold text-slate-300">
                  <span>Duration: {c.duration}</span>
                  <span>Semesters: {c.semesterCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBJECTS TAB */}
      {activeSection === 'subjects' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Curriculum Subjects</h2>
            <button
              onClick={() => {
                setSubjectForm({ name: '', code: '', credits: 4, semester: 'Semester VI', department: departments[0]?.name || '', course: courses[0]?.name || '', assignedFaculty: facultyList[0]?.fullName || '' });
                setModalType('add_subject');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Subject</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subjects.map((s) => (
              <div key={s.id} className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                      {s.code}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">{s.name}</h3>
                  </div>
                  <button
                    onClick={() => setSubjects((prev) => prev.filter((item) => item.id !== s.id))}
                    className="text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1 text-xs text-slate-300">
                  <p>Credits: <span className="font-bold text-white">{s.credits}</span></p>
                  <p>Semester: <span className="font-bold text-white">{s.semester}</span></p>
                  <p>Faculty: <span className="font-bold text-indigo-300">{s.assignedFaculty}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CLASSES TAB */}
      {activeSection === 'classes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Class Sections & Batch Rooms</h2>
            <button
              onClick={() => {
                setClassForm({ name: '', batch: 'Batch 2023-2027', academicYear: '2025-2026', semester: 'Semester VI', section: 'Section A', roomNumber: 'Hall 402', assignedFaculty: facultyList[0]?.fullName || '', studentCount: 65 });
                setModalType('add_class');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Class Section</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((cls) => (
              <div key={cls.id} className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white">{cls.name}</h3>
                    <p className="text-xs text-cyan-300">{cls.batch} • {cls.academicYear}</p>
                  </div>
                  <button
                    onClick={() => setClasses((prev) => prev.filter((item) => item.id !== cls.id))}
                    className="text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                  <p>Room: <span className="font-bold text-white">{cls.roomNumber}</span></p>
                  <p>Students: <span className="font-bold text-emerald-400">{cls.studentCount}</span></p>
                  <p className="col-span-2">Advisor: <span className="font-bold text-indigo-300">{cls.assignedFaculty}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                {modalType.replace('add_', 'Add ')}
              </h3>
              <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalType === 'add_dept' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!deptForm.name) return;
                  setDepartments((prev) => [
                    { id: `DEP-${Date.now().toString().slice(-2)}`, ...(deptForm as Department) },
                    ...prev,
                  ]);
                  setModalType(null);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Department Name</label>
                  <input
                    type="text"
                    value={deptForm.name || ''}
                    onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Code</label>
                  <input
                    type="text"
                    value={deptForm.code || ''}
                    onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Description</label>
                  <textarea
                    value={deptForm.description || ''}
                    onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white h-20"
                  />
                </div>
                <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold">
                  Save Department
                </button>
              </form>
            )}

            {modalType === 'add_course' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!courseForm.name) return;
                  setCourses((prev) => [
                    { id: `CRS-${Date.now().toString().slice(-2)}`, ...(courseForm as Course) },
                    ...prev,
                  ]);
                  setModalType(null);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Course Name</label>
                  <input
                    type="text"
                    value={courseForm.name || ''}
                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Course Code</label>
                  <input
                    type="text"
                    value={courseForm.code || ''}
                    onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold">
                  Save Course
                </button>
              </form>
            )}

            {modalType === 'add_subject' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!subjectForm.name) return;
                  setSubjects((prev) => [
                    { id: `SUB-${Date.now().toString().slice(-3)}`, ...(subjectForm as Subject) },
                    ...prev,
                  ]);
                  setModalType(null);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Subject Name</label>
                  <input
                    type="text"
                    value={subjectForm.name || ''}
                    onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Subject Code</label>
                  <input
                    type="text"
                    value={subjectForm.code || ''}
                    onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold">
                  Save Subject
                </button>
              </form>
            )}

            {modalType === 'add_class' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!classForm.name) return;
                  setClasses((prev) => [
                    { id: `CLS-${Date.now().toString().slice(-2)}`, ...(classForm as ClassItem) },
                    ...prev,
                  ]);
                  setModalType(null);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Class Section Name</label>
                  <input
                    type="text"
                    value={classForm.name || ''}
                    onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Room Number</label>
                  <input
                    type="text"
                    value={classForm.roomNumber || ''}
                    onChange={(e) => setClassForm({ ...classForm, roomNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                    required
                  />
                </div>
                <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold">
                  Save Class Section
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
