import React, { useState } from 'react';
import { ReactComponent as CopyIcon } from './copy-icon.svg'; // Replace with your copy icon SVG

const Dashboard = () => {
  const [showEarningGraph, setShowEarningGraph] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    city: 'New York',
    state: 'New York',
    pincode: '12345',
    bio: 'I am a lifelong learner passionate about programming and technology.',
    referralCode: 'ABCD123',
    pastEarnings: [
      { month: 'Jan', amount: 100 },
      { month: 'Feb', amount: 200 },
      { month: 'Mar', amount: 150 },
      // Add more earnings data as needed
    ],
  };

  const handleReferralCodeClick = () => {
    setShowEarningGraph(true);
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative w-full mx-auto px-4 py-10 bg-white shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="h-40 w-full relative mb-4">
              <img
                className="rounded-t-3xl object-cover h-full w-full"
                src="cover-photo.jpg" // Replace with your cover photo URL
                alt="Cover"
              />
              <div className="absolute inset-0 rounded-t-3xl bg-black opacity-50" />
            </div>
            <div className="flex items-center justify-center -mt-20">
              <div className="relative w-40 h-40">
                <img
                  className="rounded-full object-cover w-full h-full"
                  src="profile-pic.jpg" // Replace with your profile picture URL
                  alt="Profile"
                />
                <div className="absolute inset-0 rounded-full shadow-inner" />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold">Name:</label>
                  <p>{user.name}</p>
                </div>
                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold">Email:</label>
                  <p>{user.email}</p>
                </div>
                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold">Phone:</label>
                  <p>{user.phone}</p>
                </div>
                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold">City:</label>
                  <p>{user.city}</p>
                </div>
                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold">State:</label>
                  <p>{user.state}</p>
                </div>
                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold">Pincode:</label>
                  <p>{user.pincode}</p>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  Referral Code
                  <button
                    className="ml-2 focus:outline-none"
                    onClick={handleCopyReferralCode}
                  >
                    {isCopied ? (
                      <span className="text-green-500">Copied!</span>
                    ) : (
                      <CopyIcon className="w-4 h-4" />
                    )}
                  </button>
                </h2>
                <p
                  className="text-gray-800 cursor-pointer"
                  onClick={handleReferralCodeClick}
                >
                  {user.referralCode}
                </p>
              </div>
              {showEarningGraph && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Earning Graph</h2>
                  {/* Add your earning graph component here */}
                </div>
              )}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Past Earnings</h2>
                <div className="grid grid-cols-3 gap-4 items-end">
                  {user.pastEarnings.map((earnings) => (
                    <div
                      key={earnings.month}
                      className="bg-blue-500 rounded-lg shadow-lg p-4 text-white flex flex-col justify-between"
                      style={{ height: earnings.amount }}
                    >
                      <p className="text-sm font-semibold">{earnings.month}</p>
                      <p className="text-lg font-bold">${earnings.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
