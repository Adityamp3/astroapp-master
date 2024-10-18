import "../globals.css";
import Dashboard from "../components/dashboard/Dashboard";
import Sidebar from "../components/dashboard/Sidebar";
import TopMenuBar from "../components/dashboard/TopMenuBar";

export default function Page() {
  return (
    <div className="flex">
      <Sidebar className="mr-4" /> {/* Add margin-right to the Sidebar */}
      <div className="flex flex-col w-full">
        <TopMenuBar className="mb-4" /> {/* Add margin-bottom to the TopMenuBar */}
        <Dashboard />
      </div>
    </div>
  );
}
