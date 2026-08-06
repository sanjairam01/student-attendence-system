import { ParentProfile, ChildSummary, ParentNotification } from '../types/parent';

export const LOGGED_IN_PARENT_PROFILE: ParentProfile = {
  id: 'par-9001',
  parentName: 'Robert Vance',
  email: 'robert.vance@example.com',
  phone: '+1 (555) 987-6543',
  address: '450 Tech Avenue, Innovation Heights, Suite 102, Metro City',
  linkedChildrenCount: 1,
  emergencyContact: '+1 (555) 911-0000',
};

export const LINKED_CHILDREN: ChildSummary[] = [
  {
    id: 'std-2023-001',
    studentId: 'STU-98421',
    rollNumber: '2023-CSE-001',
    registerNumber: 'REG-312223104001',
    admissionNumber: 'ADM-2023-4011',
    fullName: 'Alexander Vance',
    department: 'Computer Science & Engineering',
    course: 'B.Tech Computer Science',
    semester: '4th Semester',
    section: 'Section A',
    attendancePct: 94.2,
    todayStatus: 'Present',
    totalClasses: 134,
    presentDays: 127,
    absentDays: 4,
    lateDays: 3,
    leaveDays: 0,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    gender: 'Male',
    dob: '2004-05-14',
    bloodGroup: 'O+ Positive',
    advisorName: 'Dr. Evelyn Reed',
    advisorPhone: '+1 (555) 432-1098',
  },
];

export const INITIAL_PARENT_NOTIFICATIONS: ParentNotification[] = [
  {
    id: 'notif-par-01',
    title: 'Daily Attendance Status: Present',
    message: 'Alexander Vance attended Data Structures & Algorithms today at 09:00 AM.',
    timestamp: 'Today, 09:05 AM',
    read: false,
    type: 'Announcement',
  },
  {
    id: 'notif-par-02',
    title: 'Medical Leave Application Approved',
    message: 'Alexander Vance’s medical leave request (July 10 - July 12) was verified and approved.',
    timestamp: '2 weeks ago',
    read: true,
    type: 'Leave Approval',
  },
  {
    id: 'notif-par-03',
    title: 'Overall Attendance Compliant (94.2%)',
    message: 'Your child’s attendance meets institutional criteria (>75%).',
    timestamp: 'Aug 01, 2026',
    read: true,
    type: 'Announcement',
  },
];
