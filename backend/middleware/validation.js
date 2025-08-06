// Validation middleware for chat messages
function validateMessage(req, res, next) {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Message is required and must be a string'
    });
  }

  if (message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Message cannot be empty'
    });
  }

  if (message.length > 1000) {
    return res.status(400).json({
      success: false,
      error: 'Message is too long (maximum 1000 characters)'
    });
  }

  // Sanitize message (basic XSS prevention)
  req.body.message = message.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  next();
}

// Validation middleware for appointment data
function validateAppointmentData(req, res, next) {
  const {
    customerName,
    customerEmail,
    projectDescription,
    preferredDate,
    preferredTime
  } = req.body;

  const errors = [];

  // Validate customer name
  if (!customerName || typeof customerName !== 'string' || customerName.trim().length === 0) {
    errors.push('Customer name is required');
  } else if (customerName.length > 100) {
    errors.push('Customer name is too long (maximum 100 characters)');
  }

  // Validate email
  if (!customerEmail || typeof customerEmail !== 'string') {
    errors.push('Customer email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      errors.push('Invalid email format');
    }
  }

  // Validate project description
  if (!projectDescription || typeof projectDescription !== 'string' || projectDescription.trim().length === 0) {
    errors.push('Project description is required');
  } else if (projectDescription.length > 2000) {
    errors.push('Project description is too long (maximum 2000 characters)');
  }

  // Validate preferred date
  if (!preferredDate || typeof preferredDate !== 'string') {
    errors.push('Preferred date is required');
  } else {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(preferredDate)) {
      errors.push('Invalid date format (use YYYY-MM-DD)');
    } else {
      const selectedDate = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.push('Preferred date cannot be in the past');
      }
    }
  }

  // Validate preferred time
  if (!preferredTime || typeof preferredTime !== 'string') {
    errors.push('Preferred time is required');
  } else {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/;
    if (!timeRegex.test(preferredTime)) {
      errors.push('Invalid time format (use HH:MM AM/PM)');
    }
  }

  // Validate phone number (optional)
  if (req.body.customerPhone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(req.body.customerPhone.replace(/[\s\-\(\)]/g, ''))) {
      errors.push('Invalid phone number format');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  // Sanitize data
  req.body.customerName = customerName.trim();
  req.body.customerEmail = customerEmail.trim().toLowerCase();
  req.body.projectDescription = projectDescription.trim();
  req.body.preferredDate = preferredDate;
  req.body.preferredTime = preferredTime;
  
  if (req.body.customerPhone) {
    req.body.customerPhone = req.body.customerPhone.trim();
  }

  next();
}

// Validation middleware for session data
function validateSession(req, res, next) {
  const { sessionId } = req.body;

  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Session ID is required'
    });
  }

  if (sessionId.length > 100) {
    return res.status(400).json({
      success: false,
      error: 'Session ID is too long'
    });
  }

  next();
}

// Rate limiting validation
function validateRateLimit(req, res, next) {
  // This would typically integrate with a rate limiting library
  // For now, we'll just pass through
  next();
}

// Sanitize input data
function sanitizeInput(req, res, next) {
  // Recursively sanitize all string values in req.body
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      return obj.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }
    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    }
    if (typeof obj === 'object' && obj !== null) {
      const sanitized = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitize(value);
      }
      return sanitized;
    }
    return obj;
  };

  req.body = sanitize(req.body);
  next();
}

export {
  validateMessage,
  validateAppointmentData,
  validateSession,
  validateRateLimit,
  sanitizeInput
}; 