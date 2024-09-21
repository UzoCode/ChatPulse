import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [meetingCode, setMeetingCode] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/meeting');
  };

  const handleJoinMeeting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/meeting/${meetingCode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">VideoMeet Pro</h1>
          <p className="text-gray-600">Professional video conferencing for teams</p>
        </div>
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email or phone
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter your email or phone"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleJoinMeeting}>
          <div>
            <label htmlFor="meetingCode" className="block text-sm font-medium text-gray-700">
              Meeting Code
            </label>
            <input
              type="text"
              id="meetingCode"
              name="meetingCode"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter meeting code"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Join Meeting
          </button>
        </form>
        <div className="text-center">
          <Link to="/create-account" className="text-sm text-blue-600 hover:text-blue-800">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;