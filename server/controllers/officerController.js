const Officer = require('../models/Officer');

// Get all officers
exports.getOfficers = async (req, res) => {
  try {
    const officers = await Officer.find({ active: true });
    res.json(officers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get available officers by date and location
exports.getAvailableOfficers = async (req, res) => {
  try {
    const { date, location } = req.query;
    console.log('Query params:', { date, location });

    const officers = await Officer.find({
      location: location,
      active: true,
      'bookedSlots.date': { $ne: date }
    });

    console.log('Found officers:', officers);
    res.json(officers);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Add new officer
exports.addOfficer = async (req, res) => {
  try {
    const newOfficer = new Officer(req.body);
    await newOfficer.save();
    res.status(201).json(newOfficer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}; 

exports.getAvailableOfficers = async (req, res) => {
  try {
    const { date, location } = req.query;
    
    // Find officers who:
    // - Match the location
    // - Are active
    // - Don't have this date in their bookedSlots
    const officers = await Officer.find({
      location: location,
      active: true,
      bookedSlots: {
        $not: {
          $elemMatch: { date: date }
        }
      }
    });

    res.json(officers);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { officerId, date, time, userId } = req.body;
    
    // Check if slot is already booked
    const officer = await Officer.findById(officerId);
    const isSlotBooked = officer.bookedSlots.some(
      slot => slot.date === date && slot.time === time
    );

    if (isSlotBooked) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    // Add new booking
    officer.bookedSlots.push({ date, time, userId });
    await officer.save();

    res.json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};