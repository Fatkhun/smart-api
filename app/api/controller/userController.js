const userModel = require('../model/user');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
 	register: function(req, res, next) {
	userModel.create({ name: req.body.name, email: req.body.email, 
		password: req.body.password }, function (err, user) {
      if (err){
				res.json({
					status: false, 
					message: "User added failed"
			 	}); 
       	next(err);
			}else{
       	res.json({
					 status: true, 
					 message: "User added successfully", 
					 user
				});
			}
    });
	 },
	 
	 login: function(req, res, next) {
		userModel.findOne({ email: req.body.email}, function(err, user){
			if (err) {
				next(err);
			} else {
				if(bcrypt.compareSync(req.body.password, user.password)) {
					const token = jwt.sign({id: user.id, email: user.email},
						config.secret, { expiresIn: '1h' });
						req.session = user;
						res.json({
							status: true, 
							message: "login success", 
							user: user, 
							api_token: token
						});
				}else{
					res.json({
						status: false, 
						message: "invalid email or password!",
						user: null
					});
				}
			}
		});
		},

	userLogout: function(req, res, next){
		userModel.findById(req.params.id,function(err){
			var sess = req.session;
			if(err){
				res.json({status: false,message: 'logged out failed!'})
				next(err)
			}else{
				if(sess)
					req.session = null;
					res.json({status: true,message: 'User logged out successfully!'})
			}
		})
	},

	userUpdate: function(req, res, next){
	userModel.findById(req.params.id, function(err, user){
		user.name = req.body.name;
		user.save();

		if(err){
			next(err)
		}else{
			res.json({
				status: true,
				message: "user update",
				user: user
			})
		}
	})
	},

	userDelete: function(req, res, next){
	userModel.findByIdAndRemove(req.params.id, function(err, user){
		if(err){
			next(err)
		}else{
			res.json({
				status: true,
				message: "user deleted",
				user: user
			})
		}
	})	
	},

	userAll: function(req, res, next){
	userModel.find(function(err, user){
		if(err){
			next(err)
		}else{
			res.json(user)
		}
	})
	}

}