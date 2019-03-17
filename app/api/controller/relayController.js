const relayModel = require('../model/relay');

module.exports = {

  relayCreate: function(req, res, next){
    relayModel.create(req.body, function(err, relay){
      if (err){ 
        next(err);
     }else{
        res.json({
          status: "success", 
          message: "Relay added successfully", 
          relay
       });
     }
    })
  },


  relayUpdate: function(req, res, next){
    relayModel.findById(req.params.id, function(err, relay){
      relay.pumpOn = req.body.pumpOn;
      relay.autoPumpOn = req.body.autoPumpOn;
      relay.save();
      // relay.update(req.body);

      if(err){
        next(err)
      }else{
        res.json({
          status: "success",
          message: "relay update",
          relay: relay
        })
      }
    })
  },

  relayDelete: function(req, res, next){
    relayModel.findByIdAndRemove(req.params.id, function(err, relay){
      if(err){
        next(err)
      }else{
        res.json({
          status: "success",
          message: "relay deleted",
          relay: relay
        })
      }
    })	
    },
  
    relayDeleteAll: function(req, res, next){
      relayModel.remove(function(err, relay){
        if(err){
          next(err)
        }else{
          res.json({
            status: "success",
            message: "relay deleted all",
          })
        }
      })	
      },
  
    relayAll: function(req, res, next){
      relayModel.find(function(err, relay){
        if(err){
          next(err)
        }else{
          res.json({
            status: "success",
            message: "relay found",
            relay: relay
          })
        }
      })
      }
}

