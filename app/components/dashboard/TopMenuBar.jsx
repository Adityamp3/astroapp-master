// components/TopMenuBar.jsx
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/context/AuthContext";

export default function TopMenuBar() {
  return (
    <header className="bg-[#FFB38A] fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-8 shadow-md">
      <div className="text-white text-2xl font-bold">
        <Link href="/">AstroArunPandit</Link>
      </div>
      <div className="text-black flex items-center">
        <span className="mx-4">Welcome! Here's Your Dashboard</span>
        <div className="flex items-center space-x-4">
          <span>5000.00</span>
          <img
            src="/assets/credit-card-remove-streamline-plump-remix-png.svg"
            alt="Credit Icon"
            className="w-6 h-6"
          />
          <AuthContextProvider>
            <LogoutButton />
          </AuthContextProvider>
        </div>
      </div>
    </header>
  );
}
