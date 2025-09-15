import Card from "../components/Card";
import DataTable from "../components/DataTable";
import { useApi } from "../hooks/useApi";

const Dashboard = () => {
  const { summary, appointments } = useApi();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Total Students" value={summary.totalStudents} color="bg-blue-500" />
          <Card title="High Risk" value={summary.highRisk} color="bg-red-500" />
          <Card title="Moderate Risk" value={summary.moderateRisk} color="bg-yellow-500" />
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8">Upcoming Appointments</h2>
      <DataTable appointments={appointments} />
    </div>
  );
};

export default Dashboard;
