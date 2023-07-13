const errorHandler = (err, req, res, next) => {
    
    console.error(err); // Log the error for debugging purposes
  
    // Handling different king of errors
    if (err.name === 'ValidationError') {
        // Mongoose validation error
        const errors = Object.values(err.errors).map((error) => error.message);
        return res.status(400).json({success: false, error: errors });
      }
    
      if (err.name === 'CastError') {
        // Mongoose cast error (e.g., invalid ObjectId)
        return res.status(400).json({success: false, error: 'Invalid parameter value' });
      }
  
    // Handle other types of errors
    res.status(500).json({
      success: false,
      error: 'Internal Server Error' 
    });
  };
  
  module.exports = errorHandler;