var p2p = {
    createPeer: function (id) {
        peer = new global.Peer(id, {
            host: 'bozhko.net',
            port: '9000'
        })
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
            global.filesystem.data.receivedData[global.filesystem.data.receivedData.length] = data
            global.filesystem.writeData()
        });
    }
}

module.exports = p2p