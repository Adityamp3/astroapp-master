"use client";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Import useRouter

export default function LogoutButton() {
  const { user } = useAuth();
  const router = useRouter(); // Initialize the router

  if (!user) {
    return <></>;
  }

  return (
    <button
      onClick={async () => {
        if (!confirm("Are you sure?")) return;
        try {
          await toast.promise(signOut(auth), {
            error: (e) => e?.message,
            loading: "Loading...",
            success: "Successfully Logged out",
          });
          router.push("/login"); // Redirect to the dashboard after logging out
        } catch (error) {
          toast.error(error?.message);
        }
      }}
      className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
    >
      <LogOut size={14} />
    </button>
  );
}
