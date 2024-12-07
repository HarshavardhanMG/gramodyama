
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import SkillsDevelopment from '../components/home/SkillsDevelopment';
import Resources from '../components/home/Resources';
import '../styles/home.css';
import demoVideo from '../assets/demo.mp4'; // Import the video file

const Home = () => {
  const [activeSegment, setActiveSegment] = useState('skills');
  const { logout } = useAuth(); // Access the logout function from AuthContext

  const handleLogout = () => {
    logout();
    // Optionally redirect the user to the login page
    window.location.href = '/login';
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        {/* Logout Button */}
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

        <div className="header-segments">
          <div
            className={`segment ${activeSegment === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveSegment('skills')}
          >
            <h2>ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ</h2>
          </div>
          <div
            className={`segment ${activeSegment === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveSegment('resources')}
          >
            <h2>ಸಂಪನ್ಮೂಲಗಳು</h2>
          </div>
        </div>
      </header>

      {/* Content Section */}
      {activeSegment === 'skills' ? <SkillsDevelopment /> : <Resources />}

      {/* New Container Section */}
      <div className="new-container">
        {/* Subsections */}
        <div className="subsections">
          <div className="subsection">
            <video
              src={demoVideo}
              autoPlay
              loop
              muted
              className="subsection-video"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
