const SHA256 = require("crypto-js/sha256")

function onData(data, connection) {
    if (data.key !== undefined) {
        global.chain.retrieveData(data.key, global.chain.address).then(function (result) {
            values = result.data.split("\n")
            global.chain.storeData(data.key, values[0] + "\n" + (parseInt(values[1]) + 1))
        })

        global.chain.retrieveData("transactions", global.chain.address).then(function (res) {
            if (res.data)
                global.chain.storeData("transactions", res.data + "\n" + data.transaction)
            else
                global.chain.storeData("transactions", data.transaction)
        })
    } else if (data.isRequest) {
        data.data.requestedFrom = connection.peer
        global.filesystem.data.requests.push(data.data)
        console.log(data)
    } else {
        this.data = data.data
        this.address = connection.peer
        this.key = SHA256(this.data.dataName).toString()

        global.chain.retrieveData(this.key, this.address).then(function (result) {
            var recievedDataHash = SHA256(this.data.data).toString();

            if (result.data.split("\n")[0] !== recievedDataHash) {
                alert("Wrong data hash!")
                return
            }

            this.data.address = this.address
            global.filesystem.data.receivedData.push(this.data)
            global.filesystem.writeData()

            var transaction = SHA256(this.address + global.chain.address.toString() + /* Value */ 10 + new Date().toString()).toString() + " " +
                        this.address + " " + global.chain.address.toString() + " " + /* Value */ 10 + 
                        "\n" + new Date().toString()

            connection.send({
                key: this.key,
                transaction: transaction
            })

            global.chain.retrieveData("transactions", global.chain.address).then(function (res) {
                if (res.data)
                    global.chain.storeData("transactions", res.data + "\n" + transaction)
                else
                    global.chain.storeData("transactions", transaction)
            })
        }.bind(this))
    }
}

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
            connection.on('data', function (data) {
                onData(data, connection)
            })
            console.log('Send:', data)
        })
    },
    getData: function (connection) {
        connection.on('data', function (data) {
            onData(data, connection)
        })
    }
}

module.exports = p2p