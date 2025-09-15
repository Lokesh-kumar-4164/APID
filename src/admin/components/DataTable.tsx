import { Appointment } from "../types";

interface Props {
  appointments: Appointment[];
}

const DataTable = ({ appointments }: Props) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Student</th>
            <th className="p-3">Counsellor</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id} className="border-t">
              <td className="p-3">{appt.studentName}</td>
              <td className="p-3">{appt.counsellorName}</td>
              <td className="p-3">{appt.date}</td>
              <td className="p-3 capitalize">{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
