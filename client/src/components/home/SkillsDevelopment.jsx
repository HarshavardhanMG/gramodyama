import {
    CalendarToday,
    LocationOn,
    Mic,
    VideoCall,
    Person,
    Book
  } from '@mui/icons-material';
  
  const SkillsDevelopment = () => {
    return (
      <div className="skills-content">
        <section className="appointment-section">
          <h3>ಸರ್ಕಾರಿ ಅಧಿಕಾರಿ ಭೇಟಿ</h3>
          <div className="search-controls">
            <button className="control-btn">
              <CalendarToday /> ದಿನಾಂಕ
            </button>
            <button className="control-btn">
              <LocationOn /> ಸ್ಥಳ
            </button>
            <button className="voice-btn">
              <Mic />
            </button>
          </div>
        </section>
  
        <section className="expert-section">
          <h3>ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ</h3>
          <div className="expert-grid">
            <div className="expert-card">
              <VideoCall />
              <p>ಕೃಷಿ ತಜ್ಞರು</p>
            </div>
            <div className="expert-card">
              <VideoCall />
              <p>ಮಾರುಕಟ್ಟೆ ತಜ್ಞರು</p>
            </div>
            <div className="expert-card">
              <VideoCall />
              <p>ವ್ಯಾಪಾರ ಸಲಹೆಗಾರರು</p>
            </div>
          </div>
        </section>
  
        <section className="library-section">
          <h3>ಸಂಪನ್ಮೂಲ ಗ್ರಂಥಾಲಯ</h3>
          <div className="library-grid">
            <div className="library-card">
              <VideoCall />
              <p>ವಿಡಿಯೋಗಳು</p>
            </div>
            <div className="library-card">
              <Book />
              <p>ದಾಖಲೆಗಳು</p>
            </div>
            <div className="library-card">
              <Book />
              <p>ತರಬೇತಿ</p>
            </div>
            <div className="library-card">
              <Person />
              <p>ಚಾಟ್‌ಬಾಟ್</p>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default SkillsDevelopment;