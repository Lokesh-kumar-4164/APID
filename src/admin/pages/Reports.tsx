import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Trend {
  month: string;
  stress: number;
  anxiety: number;
  depression: number;
}

interface Distribution {
  name: string;
  value: number;
}

const Reports = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [distribution, setDistribution] = useState<Distribution[]>([]);

  const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981"]; // blue, red, yellow, green

  useEffect(() => {
    // 📈 Mock monthly trend data
    setTrends([
      { month: "Jan", stress: 40, anxiety: 25, depression: 15 },
      { month: "Feb", stress: 50, anxiety: 30, depression: 20 },
      { month: "Mar", stress: 60, anxiety: 45, depression: 25 },
      { month: "Apr", stress: 55, anxiety: 35, depression: 30 },
    ]);

    // 🥧 Mock distribution data (replace with DB query later)
    setDistribution([
      { name: "Depressed", value: 120 },
      { name: "Stressed", value: 180 },
      { name: "Anxiety", value: 90 },
      { name: "Non-Depressed", value: 810 },
    ]);
  }, []);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Reports</h1>

      {/* 📈 Stress, Anxiety & Depression Trends */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Stress, Anxiety & Depression Trends
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="stress" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="anxiety" stroke="#dc2626" strokeWidth={2} />
            <Line type="monotone" dataKey="depression" stroke="#9333ea" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Mental Health Distribution */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Mental Health Distribution - Mens Hostel 1
        </h2>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
