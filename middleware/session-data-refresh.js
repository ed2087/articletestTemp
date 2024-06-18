const ActiveUser = require('../models/userModel.js');

module.exports = (req, res, next) => {
 
    const user = req.session.userData;

    if(user){
        
        ActiveUser.findById({_id: user._id})
        .then(userD => {        
            req.session.userData = userD;
            req.session.save()
            next();
        })
    }else {
        next()
    }
    

};