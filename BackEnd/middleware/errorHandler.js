const errorHandler = (err,req,res,next) => {
  const statusCode = res.statusCode || 500
  let message = err.message
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404
    message = 'Resource not found'
  }
  return res.status(statusCode).json({
    success: false,
    message,
    stack: err.stack
  })
}