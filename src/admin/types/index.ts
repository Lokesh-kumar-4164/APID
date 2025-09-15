export interface ScreeningSummary {
  totalStudents: number;
  highRisk: number;
  moderateRisk: number;
  lowRisk: number;
}

export interface Appointment {
  id: string;
  studentName: string;
  counsellorName: string;
  date: string;
  status: "pending" | "completed" | "cancelled";
}
