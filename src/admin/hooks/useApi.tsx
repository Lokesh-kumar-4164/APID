import { useEffect, useState } from "react";
import { ScreeningSummary, Appointment } from "../types";

export const useApi = () => {
  const [summary, setSummary] = useState<ScreeningSummary | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // mock data
    setSummary({
      totalStudents: 1200,
      highRisk: 120,
      moderateRisk: 300,
      lowRisk: 780,
    });

    setAppointments([
      { id: "1", studentName: "Anuj Sharma", counsellorName:"Dr Aswathy",date: "2025-09-14", status: "pending" },
      { id: "2", studentName: "Satish Kumar",  counsellorName:"Dr Ravikanth", date: "2025-09-15", status: "completed" },
    ]);
  }, []);

  return { summary, appointments };
};
