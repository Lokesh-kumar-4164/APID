import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Assessment {
  date: string;
  stress: number;
  anxiety: number;
  depression: number;
}

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [studentName, setStudentName] = useState("");
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  const profile = {
      id: "u123",
      name: "Krithika",
      year: "2nd Year",
      department: "Computer Science",
      gender: "Female",
      hostel: "A-Block",
    }
  useEffect(() => {
    // 📌 Mock student name (replace with API call)
    if (id === "1") setStudentName("Alice Johnson");
    if (id === "2") setStudentName("Rahul Mehta");
    if (id === "3") setStudentName("Fatima Khan");

    // 📊 Mock assessment data (replace with API call)
    setAssessments([
      { date: "2025-01-10", stress: 20, anxiety: 15, depression: 10 },
      { date: "2025-02-05", stress: 35, anxiety: 25, depression: 15 },
      { date: "2025-03-12", stress: 40, anxiety: 30, depression: 20 },
      { date: "2025-04-02", stress: 30, anxiety: 20, depression: 15 },
    ]);
  }, [id]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">
        {studentName ? `${studentName}'s Mental Health` : "Loading..."}
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-medium">Name:</span> {profile.name}</p>
          <p><span className="font-medium">Year:</span> {profile.year}</p>
          <p><span className="font-medium">Department:</span> {profile.department}</p>
          <p><span className="font-medium">Gender:</span> {profile.gender}</p>
          <p><span className="font-medium">Hostel:</span> {profile.hostel}</p>
        </div>
      </div>

      {/* 📊 Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Assessment Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={assessments}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="stress" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="anxiety" stroke="#dc2626" strokeWidth={2} />
            <Line type="monotone" dataKey="depression" stroke="#9333ea" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentDetails;
