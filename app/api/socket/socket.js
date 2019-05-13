module.exports = function(io){
  var userSocket = 0;

  io.on('connection', function(socket){
    userSocket++;
    console.log("user: ", userSocket);
      
    socket.on('statusWater', (data)=>{
        console.log('relay: ',data.msg);
        io.emit('statusWater',{msg: data.msg});
    });

    socket.on('readSensor', function(data){
        console.log('agriculture sensor: ', data);
        io.emit('readSensor', data);
    });

    socket.on('disconnect',function(){
        userSocket--;
        console.log("disconnect");
        console.log("user: ", userSocket);
    });
  });
}