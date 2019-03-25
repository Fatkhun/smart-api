const dataModel = require('../model/data');

module.exports = {
  dataCreate: function(req, res, next){
    dataModel.create(req.body, function (err, data) {
        if (err){
          res.json({
            status: false, 
            message: "Data added failed"
          }); 
           next(err);
        }else{
           res.json({
             status: true, 
             message: "Data added successfully", 
             data
          });
        }
      });
  },

  dataDelete: function(req, res, next){
  dataModel.findByIdAndRemove(req.params.id, function(err, data){
    if(err){
      res.json({
        status: false,
        message: "data deleted failed"
      })
      next(err)
    }else{
      res.json({
        status: true,
        message: "data deleted",
        data: data
      })
    }
  })	
  },

  dataDetailAll: function(req, res, next){
    var format = "%Y-%m-%d %H:%M"; // minute
    dataModel.find(function(err, data){
        dataModel.aggregate([
          {
            $group: {
              _id: { $dateToString: { format: format, date: "$time" }},
              avgTemp: {
                $avg: '$temp'
              },
              avgHumidity: {
                $avg: '$humidity'
              },
              avgSoilMoisture: {
                $avg: '$soilMoisture'
              },
              avgWater: {
                $avg: '$waterVolume'
              }
            }
          }
        ], function(err, result){
          if(err){
            next(err)
          }else{
            res.json(result)
          }
        })
    })
  },

  dataDeleteAll: function(req, res, next){
    dataModel.remove(function(err, data){
      if(err){
        res.json({
          status: false,
          message: "data deleted failed",
        })
        next(err)
      }else{
        res.json({
          status: true,
          message: "data deleted all",
        })
      }
    })	
    },

  dataAll: function(req, res, next){
    var limit = parseInt(req.params.limit) || 5
    dataModel.find(function(err, data){
      if(err){
        next(err)
      }else{
        res.json(data)
      }
    }).sort({_id: -1}).limit(limit)
    }
}