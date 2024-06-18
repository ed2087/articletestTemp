// utils/validationErrors.js

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.errors = { message }; // Add errors property to handle messages consistently
  }
}



export const handleValidationErrors = (req, res, error, body, middleware, next, userData) => {

  if (error.name !== 'ValidationError') {
    return next(error);
  }

  const errors = error.errors ? Object.values(error.errors).map(err => err.message) : [error.message];

 
  if (middleware === "registration") {
    return res.status(422).render('includes/registrationPages/register', {
      title: 'Register',
      metaDescription: 'Register for an account',
      errors: [error.message],
      body
    });
  }

  if (middleware === "login") {
    return res.status(422).render('includes/registrationPages/login', {
      title: 'Login',
      metaDescription: 'Login to your account',
      errors : [error.message],
      body
    });
  }

  if (middleware === "verify"){
    return res.status(422).render('includes/registrationPages/verify', {
      title: 'Verify',
      metaDescription: 'Verify your account',
      errors: [error.message],
      userID: userData._id,
      body
    });
  }


  if (middleware === "requestResetPassword") {
    return res.status(422).render('includes/registrationPages/requestPasswordReset', {
      title: 'Reset Password',
      metaDescription: 'Reset your password',
      errors: [error.message],
      body
    });
  }


  //resetPassword
  if (middleware === "resetPassword") {
    console.log(userData)
    return res.status(422).render('includes/registrationPages/resetPassword', {
      title: 'Reset Password',
      metaDescription: 'Reset your password',
      errors: [error.message],
      body,
      userID: userData._id
    });
  }



  // Add more contexts as needed
};







export default ValidationError;