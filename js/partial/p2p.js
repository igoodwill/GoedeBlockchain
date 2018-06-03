const SHA256 = require("crypto-js/sha256")

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
            else {
                global.chain.retrieveData(SHA256(data.data.dataName).toString(), connection.peer).then(function (result) {
                    var recievedDataHash = SHA256(this.data.data).toString();

                    if (result.data !== recievedDataHash) {
                        alert("Wrong data hash!")
                        return
                    }

                    global.filesystem.data.receivedData.push(this.data)
                    global.filesystem.writeData()
                }.bind(data))
            }
        });
    }
}

module.exports = p2p