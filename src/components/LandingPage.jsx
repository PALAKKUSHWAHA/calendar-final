import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-800">Your Calendar....</div>
        <button
          onClick={() => navigate('/app')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          Launch App
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-between px-10 py-16">
        {/* Text Section */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-blue-800 leading-tight mb-4">
            Organize Your Day with Ease
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your all-in-one dynamic calendar and event scheduling solution.
            Plan smarter. Stay ahead. Never miss a thing.
          </p>
          <button
            onClick={() => navigate('/app')}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-lg transition"
          >
            Get Started
          </button>
        </div>

        {/* Image Section */}
        <div className="mt-10 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhbGVuZGFyfGVufDB8fDB8fHww"
            alt="Calendar illustration"
            className="w-[400px] h-auto"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-600">
        &copy; 2025 Project Bolt. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
