const errorHandler = (err,req,res,next) => {
  let message = err
  const statusCode = res.statusCode || 500
  
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.CODE_ENV === 'developers'?err.stack: null
  })
}

export { errorHandler}