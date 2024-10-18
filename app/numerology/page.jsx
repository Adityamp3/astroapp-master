import Sidebar from "../components/dashboard/Sidebar";
import TopMenuBar from "../components/dashboard/TopMenuBar";
import Form from "../components/Form";
export default function Page() {
  return (
    <div className="flex">
      <TopMenuBar />
      <Sidebar />
      <Form />
    </div>
  );
}
