import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Student {
  id: string;
  name: string;
  year: string;
  department: string;
  riskLevel: "low" | "moderate" | "high";
}

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // mock data
    setStudents([
      { id: "1", name: "Krithika", year: "2nd", department: "CSE", riskLevel: "low" },
      { id: "2", name: "Rahul Mehta", year: "3rd", department: "Mechanical", riskLevel: "high" },
      { id: "3", name: "Fatima Khan", year: "1st", department: "Psychology", riskLevel: "moderate" },
    ]);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Students</h1>
      <input type="search" placeholder="Search for students"  className="border border-gray-300 w-full rounded-md p-2 outline-none  focus:shadow-xl" />

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Year</th>
              <th className="p-3">Department</th>
              <th className="p-3">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">
                  <Link
                    to={`/admin/students/${s.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {s.name}
                  </Link>
                </td>
                <td className="p-3">{s.year}</td>
                <td className="p-3">{s.department}</td>
                <td
                  className={`p-3 capitalize font-semibold ${
                    s.riskLevel === "high"
                      ? "text-red-600"
                      : s.riskLevel === "moderate"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {s.riskLevel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
