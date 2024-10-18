import React from 'react';
import Image from 'next/image';

export default function ProfileCard() {
  return (
    <div className="relative w-[400px] h-auto bg-orange-200 rounded-xl shadow-lg overflow-hidden p-6">
      <Image 
        src="/assets/background.svg" 
        alt="Card background" 
        layout="fill" 
        className="absolute top-0 left-0 object-cover opacity-50" 
      />
      <div className="relative z-10 text-center">
        <div className="absolute top-4 left-4">
          <Image 
            src="/assets/small-logo.svg" 
            alt="Small Logo" 
            width={40} 
            height={40} 
          />
        </div>
        <div className="mt-10">
          <Image 
            src="/assets/profile-picture.svg" 
            alt="Profile Picture" 
            width={150} 
            height={150} 
            className="mx-auto rounded-full border-4 border-white shadow-md" 
          />
        </div>
            
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-900">Joeylene Rivera</h2>
          <p className="text-lg text-gray-700">Web Developer</p>
          <p className="text-base text-gray-900 mt-2">
            A kiddo who uses Bootstrap and Laravel in web development. Currently playing around with design via Figma.
          </p>
        </div>

        <div className="mt-6">
          <button className="bg-orange-500 text-white py-2 px-4 rounded-md">
            joeylenerivera@gmail.com
          </button>
        </div>

        <div className="flex justify-center mt-4 space-x-3 text-2xl text-gray-700">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

// export default ProfileCard;
