"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import ProfileCard from '../components/profile/ProfileCard';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
// Import useRouter

export default function Page() {
  const [isOpen, setIsOpen] = useState(true); // Initialize the modal as open
  const router = useRouter(); // Initialize the useRouter hook

  const handleModalClose = () => {
    setIsOpen(false); // Close the modal
    router.push('/dashboard'); // Redirect to the dashboard page
  };

  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta name="description" content="User profile page" />
      </Head>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">User Profile</ModalHeader>
            <ModalBody>
              <ProfileCard />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleModalClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
