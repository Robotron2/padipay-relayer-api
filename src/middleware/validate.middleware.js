/**
 * Reusable middleware to validate required fields in the request body.
 * @param {string[]} requiredFields - Array of required field names.
 */
const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];

    requiredFields.forEach((field) => {
      if (req.body[field] === undefined) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
      error.statusCode = 400;
      error.code = 'VALIDATION_ERROR';
      return next(error);
    }

    next();
  };
};

module.exports = { validateBody };
