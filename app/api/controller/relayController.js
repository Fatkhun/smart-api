const relayModel = require('../model/relay');

module.exports = {

  relayCreate: function(req, res, next){
    relayModel.create(req.body, function(err, relay){
      if (err){ 
        res.json({
          status: false, 
          message: "Relay added failed"
       });
        next(err);
     }else{
        res.json({
          status: true, 
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
        res.json({
          status: false,
          message: "relay update failed"
        })
        next(err)
      }else{
        res.json(relay)
      }
    })
  },

  relayDetail: function(req, res, next){
    relayModel.findById(req.params.id, function(err, relay){
      if(err){
        res.json({
          status: false,
          message: "relay failed",
        })
        next(err)
      }else{
        res.json(relay)
      }
    })
  },

  relayDelete: function(req, res, next){
    relayModel.findByIdAndRemove(req.params.id, function(err, relay){
      if(err){
        res.json({
          status: false,
          message: "relay deleted failed",
        })
        next(err)
      }else{
        res.json({
          status: true,
          message: "relay deleted",
          relay: relay
        })
      }
    })	
    },
  
    relayDeleteAll: function(req, res, next){
      relayModel.remove(function(err, relay){
        if(err){
          res.json({
            status: false,
            message: "relay deleted failed",
          })
          next(err)
        }else{
          res.json({
            status: true,
            message: "relay deleted all",
          })
        }
      })	
      },
  
    relayAll: function(req, res, next){
      relayModel.find(function(err, relay){
        if(err){
          res.json({
            status: false,
            message: "relay not found",
          })
          next(err)
        }else{
          res.json({
            status: true,
            message: "relay found",
            relay: relay
          })
        }
      })
      }
}

