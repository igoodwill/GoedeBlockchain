var p2p = {
    createPeer: function (id) {
        peer = new global.Peer(id, global.peerServer)
        return peer
    },
    sendData: function (from_peer, to_peer_id, data) {
        console.log("Waiting connection.");
        var connection = from_peer.connect(to_peer_id)
        console.log("Waiting open.");
        connection.on('open', function () {
            connection.send(data)
            console.log('Send:', data)
        })
    },
    getData: function (connection) {
        connection.on('data', function (data) {
            if (data.isRequest) {
                data.data.requestedFrom = connection.peer
                global.filesystem.data.requests.push(data.data)
            }
            else
                global.filesystem.data.receivedData.push(data.data)
            
            global.filesystem.writeData()
        });
    }
}

module.exports = p2p