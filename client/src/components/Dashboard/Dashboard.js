import React, { useState, useEffect } from 'react';
import { ReactComponent as CopyIcon } from './copy-icon.svg'; // Replace with your copy icon SVG
import axios from 'axios';
import logoutImg from './logout.svg'
const Dashboard = ({ handleLogout, data }) => {
  const [showEarningGraph, setShowEarningGraph] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      axios
        .post('/api/profile/picture', formData)
        .then((response) => {
          console.log(response.data);
          // Handle success, e.g., show a success message or update user data
        })
        .catch((error) => {
          console.error(error);
          // Handle error, e.g., show an error message
        });
    }
  };

  const user = {
    name:data.name,
    email:data.email,
    phone:data.phone,
    city:data.city,
    state:data.state,
    pincode:data.pincode,
    bio: 'I am a lifelong learner passionate about programming and technology.',
    referralCode:data.refer,
    pastEarnings: [
      { month: 'Jan', amount: 100 },
      { month: 'Feb', amount: 200 },
      { month: 'Mar', amount: 150 },
      // Add more earnings data as needed
    ],
  };

  const handleReferralCodeClick = () => {
    setShowEarningGraph(true);
  }
  const handleCopyReferralCode = () => {
    let text = 'http://localhost:3000/reg?refer=' + user.referralCode
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  const Edit=()=>{
    return(
    <>
    <div>hello</div>
    </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative w-full mx-auto px-4 py-10 bg-white shadow rounded-3xl sm:p-10">
          <div className='flex justify-end'>
        <button className='relative  pt-3 ' >EDIT</button>
        <button className='relative  pt-3 ' onClick={handleLogout}><img src={logoutImg} className=' h-6 bg-red-600 color'/></button>
        </div>
          <div className="max-w-md mx-auto">
          
            <div className="h-40 w-full relative mb-4">
              <img
                className="rounded-t-3xl object-cover h-full w-full"
                src="cover-photo.jpg" // Replace with your cover photo URLS
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
                  Referral link
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
                  http://localhost:3000/reg?refer={user.referralCode}
                </p>
              </div>
        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
