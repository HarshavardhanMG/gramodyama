import { useState } from 'react';
import { officerAPI } from '../../services/api';
import '../../styles/SkillsDevelopment.css';

const BookingModal = ({ open, onClose, officer, selectedDate }) => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [error, setError] = useState('');

    if (!open) return null;

    const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    const isSlotBooked = (slot) => {
      return officer.bookedSlots?.some(
        booking => booking.date === selectedDate.toISOString().split('T')[0] 
                   && booking.time === slot
      );
    };

    const handleBooking = async () => {
      if (!selectedTimeSlot) {
        setError('Please select a time slot');
        return;
      }

      try {
        await officerAPI.bookAppointment({
          officerId: officer._id,
          date: selectedDate.toISOString().split('T')[0],
          timeSlot: selectedTimeSlot,
          userId: 'current-user-id' // Replace with actual user ID from auth
        });
      
        onClose();
      } catch (error) {
        setError('Failed to book appointment');
      }
    };

    return (
      <div className="booking-modal">
        <h3>Book Appointment with {officer.name}</h3>
        <p>Date: {selectedDate.toLocaleDateString()}</p>
      
        <div className="time-slots">
          {timeSlots.map(slot => (
            <button
              key={slot}
              className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''} 
                         ${isSlotBooked(slot) ? 'booked' : ''}`}
              onClick={() => !isSlotBooked(slot) && setSelectedTimeSlot(slot)}
              disabled={isSlotBooked(slot)}
            >
              {slot}
            </button>
          ))}
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="booking-actions">
          <button className="booking-btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="booking-btn confirm-btn" onClick={handleBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
    );
};

export default BookingModal;