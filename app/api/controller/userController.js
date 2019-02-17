const userModel = require('../model/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports = {
 	register: function(req, res, next) {
	userModel.create({ name: req.body.name, email: req.body.email, 
		password: req.body.password }, function (err, user) {
      if (err){ 
       	next(err);
			}else{
       	res.json({
					 status: "success", 
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
				const token = jwt.sign({id: user._id}, 
					req.app.get('secretKey'), { expiresIn: '1h' });
				res.json({
					status: "success", 
					message: "user found", 
					user: user, 
					api_token: token
					});
			}else{
				res.json({
					status: "error", 
					message: "invalid email or password!",
					user: null
				});
			}
		}
	});
	},

	userUpdate: function(req, res, next){
		var name = req.body.name;
		var role = req.body.role;
	userModel.findByIdAndUpdate(req.params.id, {$set: {'name': name, 'role': role}}, 
	function(err, user){
		if(err){
			next(err)
		}else{
			res.json({
				status: "success",
				message: "user update",
				user: user
			})
		}
	})
	},
	
	userDetail: function(req, res, next){
	userModel.findById(req.params.id, function(err, user){
		if(err){
			next(err)
		}else{
			res.json({
				status: "success",
				message: "user found",
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
			res.json({
				status: "success",
				message: "user found",
				user: user
			})
		}
	})
	}

}