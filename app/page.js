import Image from "next/image";
import Sidebar from "./components/dashboard/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import TopMenuBar from "./components/dashboard/TopMenuBar";
export default function Home() {
  return (
    <div className="flex">
      <TopMenuBar/>
      <Sidebar/>
      <Dashboard />
    </div>
  );
}
