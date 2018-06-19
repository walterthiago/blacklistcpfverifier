module.exports = exports = (error, res) => {
  if (error._statusCode) {
    res.status(error._statusCode).json({
      error: error._message
    });
  } else {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};