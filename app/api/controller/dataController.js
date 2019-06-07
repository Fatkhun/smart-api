const dataModel = require('../model/data');

module.exports = {
  dataCreate: function(req, res, next){
    dataModel.create(req.body, function (err, sensor) {
        if (err){
          res.json({
            status: false, 
            message: "Data added failed"
          }); 
           next(err);
        }else{
           res.json({sensor});
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
   // var format = "%Y-%m-%d %H"; // 1 hour
   // var format = "%Y-%m-%d"; // 1 day
    dataModel.find(function(err, data){
        dataModel.aggregate([
	{
            $group: {
              _id: { $dateToString: { format: format, date: "$createdAt" }},
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

  dataDetailItem: function(req, res, next){
    dataModel.findById(req.params.id, function(err, data){
      if(err){
        res.json({
          message: "not found"
        })
        next(err)
      }else{
        res.json(data)
      }
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
    },

  dataAllItemByDate: function(req, res, next){
    var startTime = req.params.startTime;
    var endTime = req.params.endTime;
    dataModel.find({createdAt: {
      $gte: startTime,
      $lte: endTime
  } },function(err, data){
      if(err){
        next(err)
      }else{
        res.json(data)
      }
    }).sort({_id: -1})
    },

    dataAllItem: function(req, res, next){
      dataModel.find(function(err, data){
        if(err){
          next(err)
        }else{
          res.json(data)
        }
      }).sort({_id: -1})
      }
}
