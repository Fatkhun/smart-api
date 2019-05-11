const userModel = require('../model/user');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const FCM = require('fcm-node');
var serverKey="AAAA8aGOjPI:APA91bGeldSPNowh8zwH0Vji1rdSk-kNYXAA2lkrKMjRMBY5D5UPfFmE9R7WmFK4kiaDBU3OD1qcYC1-MoWi6nzUea5VddpQcR_rQ8UVSOjoiJmQocROUnHn6hfVBoiHMs1opddDegrB";
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
						const token = jwt.sign({id: user.id, email: user.email},
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
		userModel.findById(req.params.id,function(err){
			if(err){
				res.json({status: false,message: 'logged out failed!'})
				next(err)
			}else{
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
	},

	userNotif: function(req, res, next){
    var message = "Hey! you got this notification.";
    var title = "Watering Notification";
    var token = "dXbQQuvcttQ:APA91bF41_6nzAzXKpFT7Nd_yE3O4jkxur4cacYvZkwA_kp-2EEHA9Advibq50SRf3rW1K7rApPfRiJc_B4S6rzRW6AKXpFa1ksF8RHNhS4CnXXBDrMtGOuEnMR78AygjIHGUo_-MX1-";
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