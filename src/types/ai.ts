export type MLAlgorithm =
  | 'RANDOM_FOREST'
  | 'DECISION_TREE'
  | 'XGBOOST'
  | 'GRADIENT_BOOSTING'
  | 'LOGISTIC_REGRESSION'
  | 'SVM'
  | 'KNN'
  | 'NAIVE_BAYES'
  | 'NEURAL_NETWORK';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type RecommendationType =
  | 'CONTACT_STUDENT'
  | 'SCHEDULE_PARENT_MEETING'
  | 'ISSUE_WARNING'
  | 'ARRANGE_EXTRA_CLASSES'
  | 'COUNSELLING'
  | 'HOLIDAY_IMPACT_ANALYSIS';

export interface HealthScore {
  score: number; // 0 - 100
  trend: 'UP' | 'DOWN' | 'STABLE';
  status: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'CRITICAL';
  factors: string[];
}

export interface AttendanceForecastItem {
  period: string; // e.g., "Mon", "Week 1", "Sep", "Sem 1"
  actualPct?: number;
  predictedPct: number;
  upperBoundPct: number;
  lowerBoundPct: number;
  riskCount: number;
}

export interface RiskStudentItem {
  id: string;
  studentId: string;
  rollNumber: string;
  fullName: string;
  department: string;
  course: string;
  semester: string;
  currentAttendancePct: number;
  predictedAttendancePct: number;
  failRiskProbability: number; // 0 - 100
  riskLevel: RiskLevel;
  primaryRiskReason: string;
  recommendedAction: RecommendationType;
  counsellingRequired: boolean;
  consecutiveAbsences: number;
  guardianPhone: string;
}

export interface FacultyAiAnalysis {
  id: string;
  facultyId: string;
  fullName: string;
  department: string;
  attendanceConsistencyScore: number; // 0-100
  classCompletionRate: number; // 0-100
  avgSubmissionDelayMinutes: number;
  trend: 'IMPROVING' | 'STABLE' | 'DECLINING';
  aiRecommendation: string;
}

export interface DepartmentAiAnalysis {
  departmentCode: string;
  departmentName: string;
  currentAttendancePct: number;
  predictedAttendancePct: number;
  healthScore: number;
  riskRank: number;
  totalRiskStudents: number;
  status: 'HEALTHY' | 'MODERATE' | 'HIGH_RISK';
}

export interface CourseAiAnalysis {
  courseCode: string;
  courseName: string;
  department: string;
  semester: string;
  attendancePct: number;
  predictedDropPct: number;
  subjectComparisonScore: number;
}

export interface AiRecommendationItem {
  id: string;
  type: RecommendationType;
  targetType: 'STUDENT' | 'FACULTY' | 'DEPARTMENT' | 'CLASS';
  targetId: string;
  targetName: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
  status: 'PENDING' | 'ACTIONED' | 'DISMISSED';
  actionUrl?: string;
}

export interface ConfusionMatrix {
  tp: number;
  fp: number;
  tn: number;
  fn: number;
}

export interface MlModelInfo {
  id: string;
  modelName: string;
  algorithm: MLAlgorithm;
  version: string;
  datasetName: string;
  recordsCount: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: ConfusionMatrix;
  trainedAt: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'TRAINING';
}

export interface PredictionHistoryRecord {
  id: string;
  predictionDate: string;
  scope: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SEMESTER' | 'YEARLY' | 'STUDENT_RISK';
  targetName: string;
  predictedResult: string;
  confidenceScore: number;
  algorithmUsed: MLAlgorithm;
  actionTriggered?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: string;
  roleContext: 'student' | 'faculty' | 'admin';
  suggestions?: string[];
  dataPayload?: any;
}

export interface SmartAlertItem {
  id: string;
  title: string;
  description: string;
  severity: 'INFO' | 'WARNING' | 'ALERT' | 'CRITICAL';
  timestamp: string;
  read: boolean;
  category: 'LOW_ATTENDANCE' | 'HIGH_RISK_STUDENT' | 'ATTENDANCE_DROP' | 'FACULTY_DELAY' | 'DEPARTMENT_WARNING';
}
