"use client";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { createUser } from "@/lib/firestore/user/write";
import { Button } from "@nextui-org/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@nextui-org/react";
import Image from "next/image";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const handleData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      await updateProfile(credential.user, {
        displayName: data?.name,
      });
      const user = credential.user;
      await createUser({
        uid: user?.uid,
        displayName: data?.name,
        photoURL: user?.photoURL,
      });
      toast.success("Successfully Signed Up");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-[#ffd1b0] p-5">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg p-10 max-w-lg m-5 w-full md:w-auto">
        <h1 className="text-4xl font-bold text-[#524c4c] mb-5">Sign Up</h1>
        <p className="text-lg font-medium text-[#524c4c] mb-8">
          Let's get started
        </p>

        {/* Social Sign In Buttons */}
        <div className="flex gap-5 mb-8 flex-col md:flex-row">
          <Button className="flex items-center justify-center">
            <img
              src="/assets/group-26.svg"
              alt="Google"
              className="mr-2"
              width={20}
              height={20}
            />
            <span className="font-medium text-black">Google account</span>
          </Button>

          <Button className="flex items-center justify-center">
            <img
              src="/assets/logos-facebook.svg"
              alt="Facebook"
              className="mr-2"
              width={20}
              height={20}
            />
            <span className="font-medium text-black">Facebook account</span>
          </Button>
        </div>

        {/* Form Fields */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className="flex flex-col gap-5"
        >
          <Input
            clearable
            underlined
            fullWidth
            label="Name"
            placeholder="Enter your full name"
            value={data?.name}
            onChange={(e) => handleData("name", e.target.value)}
          />
          <Input
            clearable
            underlined
            fullWidth
            label="Email"
            type="email"
            placeholder="Please enter your email address"
            value={data?.email}
            onChange={(e) => handleData("email", e.target.value)}
          />
          <Input
            underlined
            fullWidth
            label="Password"
            type="password"
            placeholder="Please enter your password"
            value={data?.password}
            onChange={(e) => handleData("password", e.target.value)}
          />

          <Button
            className="w-full bg-[#FF6700]"
            auto
            isLoading={isLoading}
            isDisabled={isLoading}
            type="submit"
          >
            Sign Up
          </Button>
        </form>

        <div className="flex justify-between mt-5">
          <Link href="/login">
            <button className="font-semibold text-sm text-blue-700">
              Already a user? Sign In
            </button>
          </Link>
        </div>
      </div>

      {/* Decorative Image */}
      <div className="hidden md:block md:w-1/2 mt-8 md:mt-0">
        <Image
          src="/assets/89-e-31-fb-982-e-6-d-87-f-239196-db-2-b-3-e-9-ccc-copy-1.svg"
          alt="Decorative"
          width={674}
          height={593}
          className="object-cover"
        />
      </div>
    </div>
  ); 
}
