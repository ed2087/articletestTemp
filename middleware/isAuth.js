export const isAuth = (req, res, next) => {
    // Define paths
    const allowedIfNotActive = ['/login', '/register', '/verify', '/resetPassword', '/verification'];
    const notAllowedIfActive = ['/login', '/register', '/verify', '/resetPassword', '/verification'];
    const path = req.path;

    // Treat undefined userIsActive as not active
    const userIsActive = req.session.user || false;
    console.log('userIsActive:', userIsActive);
    if (userIsActive) {
        // Redirect active users away from pages intended for non-active users
        if (notAllowedIfActive.includes(path)) {
            return res.redirect('/');
        }
    }
    
    next();
};
