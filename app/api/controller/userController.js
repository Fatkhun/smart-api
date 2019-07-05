const userModel = require('../model/user');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const FCM = require('fcm-node');
var serverKey="AAAA8aGOjPI:APA91bG7XAqtIYWuNy_lP3zay8QYcCkbJpmLnT6C9aOlMtTTnWvaCRgnOhnxOFfNpBA5gapQ73h9AJA8NO_-IIiA7iDypqcnfKeopNemYXIbbLtZ6tueseR0aTWYGVkZBDBGQwVnuMie";
const fcm = new FCM(serverKey);


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
				if(req.body.password != null && user.password != null){
					if(bcrypt.compareSync(req.body.password, user.password)) {
						const token = jwt.sign({id: user._id, email: user.email},
						config.secret, { expiresIn: '1h' });
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
		userModel.findById(req.params.id,function(err, user){
			if(err){
				res.json({status: false, message: 'logged out failed!'})
				next(err)
			}else{
				res.json({status: true, message: 'User logged out successfully!'})
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
	},

	userNotif: function(req, res, next){
    var message = "Hey! you got this notification.";
    var title = "Watering Notification";
    var token = "fz-L55klm-0:APA91bFKes_OX0kllm59vq7TpVGE-LjsGd1tnUcHk5l0_H26Rr7LXsF_AAjwBL9Dq4WYE03KHOyoUnqwho6HWVdi5_iIyfrQWF4UFC9Ms7YvibaWM8sxrQEhFLU7Tjo3CnG8hm-9yPQm";
		var messages = { 
			to: token, 
			notification: {
					title: title, //title of notification 
					body: message, //content of the notification
					sound: "default",
					icon: "ic_launcher" //default notification icon
			},
			headers: {
				"Authorization": "",
				"Content-Type": "application/json; charset=utf-8",
			}
		};
		fcm.send(messages, function(err, notif){
			try {
				if (err) {
					res.json("error")
				} else {
					res.json("succes" + notif)
				}
			} catch (error) {
				next(error)
			}
			
		});
	}

}
