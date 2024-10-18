'use client';
import { auth } from '@/lib/firebase';
import { Button } from '@nextui-org/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-[#ffd1b0] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl">
        
        {/* Login Form Section */}
        <div className="bg-[#ffffff4d] rounded-2xl shadow-lg overflow-hidden w-full max-w-md mx-auto md:w-1/2 lg:max-w-lg">
          <div className="p-8 md:p-10">
            <div className="mb-8 text-center">
              <div className="text-orange-600 text-lg font-semibold">Your logo</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Login</h1>
            </div>
            <form>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-800">Email</label>
                  <input
                    type="email"
                    placeholder="username@gmail.com"
                    className="w-full px-4 py-3 mt-1 leading-tight text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-800">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-3 mt-1 leading-tight text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                      <Image
                        src="/assets/clarity-eye-hide-line.svg"
                        alt="Show Password"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <Link href="/forget-password" className="text-orange-700">Forgot Password?</Link>
                </div>
                <Button
                  type="submit"
                  className="w-full py-3 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Sign in
                </Button>
              </div>
            </form>
            <div className="my-8 text-center text-gray-800">Or Continue With</div>
            <div className="flex justify-center space-x-4">
              <SignInWithGoogleComponent />
              <SignInWithGitHubComponent />
              <SignInWithFacebookComponent />
            </div>
            <div className="mt-8 text-center">
              <span className="text-gray-800">Don’t have an account yet? </span>
              <Link href="/signup" className="text-orange-700 font-semibold">
                Register for free
              </Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
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
    </div>
  );
}

function SignInWithGoogleComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };
  return (
    <Button
      className="bg-white shadow rounded-full w-12 h-12 flex items-center justify-center"
      onClick={handleLogin}
      isLoading={isLoading} 
      isDisabled={isLoading}
    >
      <Image
        src="/assets/flat-color-icons-google.svg"
        alt="Google"
        width={24}
        height={24}
      />
    </Button>
  );
}

function SignInWithGitHubComponent() {
  const handleGitHubLogin = () => {
    // Add GitHub login logic here
    toast.success('GitHub login not implemented yet.');
  };
  return (
    <Button
      className="bg-white shadow rounded-full w-12 h-12 flex items-center justify-center"
      onClick={handleGitHubLogin}
    >
      <Image
        src="/assets/akar-icons-github-fill.svg"
        alt="GitHub"
        width={24}
        height={24}
      />
    </Button>
  );
}

function SignInWithFacebookComponent() {
  const handleFacebookLogin = () => {
    // Add Facebook login logic here
    toast.success('Facebook login not implemented yet.');
  };
  return (
    <Button
      className="bg-white shadow rounded-full w-12 h-12 flex items-center justify-center"
      onClick={handleFacebookLogin}
    >
      <Image
        src="/assets/bi-facebook.svg"
        alt="Facebook"
        width={24}
        height={24}
      />
    </Button>
  );
}
