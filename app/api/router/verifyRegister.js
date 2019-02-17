const User = require('../model/user');
 
checkDuplicateUserEmail = (req, res, next) => {
    // cek email 
		User.findOne({ email: req.body.email })
		.exec((err, user) => {
			if (err && err.kind !== 'ObjectId'){
				res.status(500).send({
					status: "error",
					message: "Error retrieving User with Email = " + req.body.email
				});                
				return;
			}
	
			if(user){
				res.status(400).send({
					status: "error",
          message: "Email is already in use!"
        });
				return;
			}
 
			next();
		});
}
 
const registerVerify = {};
registerVerify.checkDuplicateUserEmail = checkDuplicateUserEmail;
 
module.exports = registerVerify;