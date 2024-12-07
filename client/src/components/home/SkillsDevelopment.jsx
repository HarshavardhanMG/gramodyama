import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
    CalendarToday,
    LocationOn,
    Mic,
    VideoCall,
    Person,
    Book
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { karnatakaDistricts } from '../../data/officers';
import BookingModal from '../appointments/BookingModal';
import { officerAPI } from '../../services/api';
import { expertAPI } from '../../services/api';

const SkillsDevelopment = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDistricts, setShowDistricts] = useState(false);
    const [availableOfficers, setAvailableOfficers] = useState([]);
    const [selectedOfficer, setSelectedOfficer] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [experts, setExperts] = useState([]);
    const [loadingExperts, setLoadingExperts] = useState(true);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const data = await expertAPI.getAllExperts('all');
                setExperts(data);
            } catch (error) {
                console.error('Error fetching experts:', error);
            } finally {
                setLoadingExperts(false);
            }
        };

        fetchExperts();
    }, []);

    const handleExpertNavigation = (expertType) => {
        navigate(`/experts/${expertType}`);
      };

    // Appointment booking related handlers
    const handleDateClick = () => {
        setShowDatePicker(!showDatePicker);
        setShowDistricts(false);
    };

    const handleLocationClick = () => {
        setShowDistricts(!showDistricts);
        setShowDatePicker(false);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowDatePicker(false);
    };

    const handleLocationSelect = (district) => {
        setSelectedLocation(district);
        setShowDistricts(false);
    };

    const handleCheck = async () => {        if (!selectedDate || !selectedLocation) return;
      
        try {
            const dateString = selectedDate.toISOString().split('T')[0];
            console.log('Checking availability:', { dateString, selectedLocation });

            const officers = await officerAPI.getAvailableOfficers(dateString, selectedLocation);
            console.log('Officers received:', officers);

            setAvailableOfficers(officers);
            console.log('State updated:', officers.length);
        } catch (err) {
            console.error('Error:', err);
            setAvailableOfficers([]);
        }
    };

    const handleBookingClick = (officer) => {
        setSelectedOfficer(officer);
        setShowBookingModal(true);
    };

    return (
        <div className="skills-content">
            <section className="appointment-section">
                <h3>ಸರ್ಕಾರಿ ಅಧಿಕಾರಿ ಭೇಟಿ</h3>
                <div className="search-controls">
                    <div className="date-picker-container">
                        <button 
                            className={`control-btn ${selectedDate ? 'selected' : ''}`}
                            onClick={handleDateClick}
                        >
                            <CalendarToday /> 
                            {selectedDate ? selectedDate.toLocaleDateString() : 'ದಿನಾಂಕ'}
                        </button>
                        {showDatePicker && (
                            <div className="date-picker-wrapper">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateSelect}
                                    inline
                                    minDate={new Date()}
                                />
                            </div>
                        )}
                    </div>
                    
                    <div className="location-picker-container">
                        <button 
                            className={`control-btn ${selectedLocation ? 'selected' : ''}`}
                            onClick={handleLocationClick}
                        >
                            <LocationOn />
                            {selectedLocation || 'ಸ್ಥಳ'}
                        </button>
                        {showDistricts && (
                            <div className="districts-dropdown">
                                {karnatakaDistricts.map(district => (
                                    <div 
                                        key={district}
                                        onClick={() => handleLocationSelect(district)}
                                        className="district-item"
                                    >
                                        {district}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button 
                        className="check-btn"
                        onClick={handleCheck}
                        disabled={!selectedDate || !selectedLocation}
                    >
                        ಪರಿಶೀಲಿಸಿ
                    </button>
                </div>
                {availableOfficers.length > 0 && (
                    <div className="available-officers">
                        {availableOfficers.map(officer => (
                            <div key={officer._id} className="officer-card">
                                <h4>{officer.name}</h4>
                                <p>{officer.designation}</p>
                                <button 
                                    className="book-btn"
                                    onClick={() => handleBookingClick(officer)}
                                >
                                    ಭೇಟಿ ಕಾದಿರಿಸಿ
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {availableOfficers.length === 0 && selectedDate && selectedLocation && (
                    <div className="no-officers-message">
                        <h4>ಈ ದಿನಾಂಕ ಮತ್ತು ಸ್ಥಳದಲ್ಲಿ ಯಾವುದೇ ಅಧಿಕಾರಿಗಳು ಲಭ್ಯವಿಲ್ಲ</h4>
                        <p>ದಯವಿಟ್ಟು ಬೇರೆ ದಿನಾಂಕ ಅಥವಾ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ</p>
                    </div>
                )}
            </section>

            <section className="expert-section">
                <h3>ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ</h3>
                <div className="expert-grid">
                    {loadingExperts ? (
                        <div>Loading experts...</div>
                    ) : (
                        experts.length > 0 ? (
                            experts.map(expert => (
                                <button 
                                    key={expert.id}
                                    className="expert-card"
                                    onClick={() => handleExpertNavigation(expert.type)}
                                >
                                    <VideoCall />
                                    <p>{expert.name}</p>
                                </button>
                            ))
                        ) : (
                            <div>No experts available</div>
                        )
                    )}
                </div>
            </section>

            <section className="library-section">
                <h3>ಸಂಪನ್ಮೂಲ ಗ್ರಂಥಾಲಯ</h3>
                <div className="expert-grid">
                    <button 
                        className="expert-card"
                        onClick={() => navigate('/library/videos')}
                    >
                        <VideoCall />
                        <p>ವಿಡಿಯೋಗಳು</p>
                    </button>
                    <button 
                        className="expert-card"
                        onClick={() => navigate('/library/articles')}
                    >
                        <Book />
                        <p>ದಾಖಲೆಗಳು</p>
                    </button>
                    <button 
                        className="expert-card training-card"
                        onClick={() => navigate('/courses')}
                    >
                        <Book />
                        <p>ಹೊಸ ತರಬೇತಿಗಳು</p>
                    </button>
                    <button 
                        className="expert-card training-card"
                        onClick={() => navigate('/my-courses')}
                    >
                        <Book />
                        <p>ನನ್ನ ತರಬೇತಿಗಳು</p>
                    </button>
                </div>
            </section>          
            <BookingModal
                open={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                officer={selectedOfficer}
                selectedDate={selectedDate}
            />
        </div>
    );
};

export default SkillsDevelopment;
