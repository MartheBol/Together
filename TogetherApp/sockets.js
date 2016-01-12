/**
 * Created by Nikita on 11/01/2016.
 */

module.exports = function (io) {
    var clients = [];

    io.sockets.on('connection', function (socket) {

        console.log("sockets connected on", socket.port);

        socket.on('message', function (data) {
            socket.emit('serverMessage', 'The client said: ' + data);
            // socket.emit('serverMessage', { hello: 'world' }); //sturen van object
            console.log(data);
            //doorsturen naar de DB!!

            var socketReceiver = clients[data.receiver];
            if(socketReceiver != null && socketReceiver!== undefined){
                socketReceiver.emit("message_receiver", { "message": data.text, "sender": data.user });
                //io.in(data.user.username).emit("message_receiver", { "message": data.message, "sender": data.user });
            }

        });

        socket.on("newUser", function(username){
            clients.push(username);
            console.log(clients);
            //socket.broadcast.emit("user_connected",username)

        });

        socket.on("halloNikita", function(){
            console.log("rodric zegt hey");
            socket.emit("Rodric zegt hey");
        });
    });
};