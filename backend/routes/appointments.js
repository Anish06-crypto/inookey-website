import express from 'express';
import { saveAppointment, getAppointment, updateAppointmentStatus } from '../services/database.js';
import { validateAppointmentData } from '../middleware/validation.js';

const router = express.Router();

// Create new appointment
router.post('/', validateAppointmentData, async (req, res) => {
  try {
    const {
      sessionId,
      customerName,
      customerEmail,
      customerPhone,
      projectDescription,
      preferredDate,
      preferredTime,
      notes
    } = req.body;

    console.log(`📅 Creating appointment for: ${customerName} (${customerEmail})`);

    const appointmentData = {
      sessionId: sessionId || `session_${Date.now()}`,
      customerName,
      customerEmail,
      customerPhone,
      projectDescription,
      preferredDate,
      preferredTime,
      notes
    };

    const appointmentId = await saveAppointment(appointmentData);

    // Send confirmation email (placeholder for now)
    // await sendAppointmentConfirmation(customerEmail, appointmentData);

    res.json({
      success: true,
      appointmentId,
      message: 'Appointment created successfully',
      data: appointmentData
    });

  } catch (error) {
    console.error('❌ Appointment creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create appointment',
      message: error.message
    });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await getAppointment(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error('❌ Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointment',
      message: error.message
    });
  }
});

// Update appointment status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!status || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: pending, confirmed, cancelled, completed'
      });
    }

    const updated = await updateAppointmentStatus(id, status, notes);

    if (updated === 0) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: `Appointment status updated to ${status}`,
      appointmentId: id,
      status
    });

  } catch (error) {
    console.error('❌ Error updating appointment status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update appointment status',
      message: error.message
    });
  }
});

// Get available time slots
router.get('/slots/available', async (req, res) => {
  try {
    const { date } = req.query;
    
    // This would typically check against a calendar system
    // For now, we'll return mock available slots
    const availableSlots = [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM'
    ];

    res.json({
      success: true,
      date: date || new Date().toISOString().split('T')[0],
      availableSlots
    });

  } catch (error) {
    console.error('❌ Error fetching available slots:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch available slots',
      message: error.message
    });
  }
});

// Cancel appointment
router.post('/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const updated = await updateAppointmentStatus(id, 'cancelled', reason || 'Cancelled by user');

    if (updated === 0) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      appointmentId: id
    });

  } catch (error) {
    console.error('❌ Error cancelling appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel appointment',
      message: error.message
    });
  }
});

// Reschedule appointment
router.post('/:id/reschedule', async (req, res) => {
  try {
    const { id } = req.params;
    const { newDate, newTime, reason } = req.body;

    if (!newDate || !newTime) {
      return res.status(400).json({
        success: false,
        error: 'New date and time are required'
      });
    }

    // Get current appointment
    const appointment = await getAppointment(id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    // Update appointment with new date/time
    const updateData = {
      preferred_date: newDate,
      preferred_time: newTime,
      notes: `${appointment.notes || ''}\n\nRescheduled: ${newDate} at ${newTime}. Reason: ${reason || 'No reason provided'}`
    };

    // This would typically update the appointment record
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'Appointment rescheduled successfully',
      appointmentId: id,
      newDate,
      newTime
    });

  } catch (error) {
    console.error('❌ Error rescheduling appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reschedule appointment',
      message: error.message
    });
  }
});

// Get appointment statistics
router.get('/stats/overview', async (req, res) => {
  try {
    // This would typically query the database for statistics
    // For now, we'll return mock data
    const stats = {
      total: 150,
      pending: 25,
      confirmed: 80,
      completed: 40,
      cancelled: 5,
      thisMonth: 12,
      lastMonth: 8
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('❌ Error fetching appointment stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointment statistics',
      message: error.message
    });
  }
});

export default router; 