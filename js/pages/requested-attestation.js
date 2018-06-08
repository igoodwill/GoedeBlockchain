const m = require('mithril')
const SHA256 = require("crypto-js/sha256")
const p2p = require('../partial/p2p.js')

const dataTypes = global.dataTypes

module.exports = {
    attest: function() {
        var transaction = SHA256(global.chain.address.toString() + global.filesystem.data.requests[global.filesystem.data.requests.length - 1].requestedFrom
            + /* Value */ 10 + new Date().toString()).toString()
            + " " + global.chain.address.toString() + " " + global.filesystem.data.requests[global.filesystem.data.requests.length - 1].requestedFrom
            + " " + /* Value */ 10 + "\n" + new Date().toString()

        global.chain.retrieveData("transactions", global.chain.address).then(function (result) {
            if (result.data)
                global.chain.storeData("transactions", result.data + "\n" + transaction)
            else
                global.chain.storeData("transactions", transaction)
        })

        p2p.sendData(global.peer, global.filesystem.data.requests[global.filesystem.data.requests.length - 1].requestedFrom, {
            key: SHA256(global.filesystem.data.requests[global.filesystem.data.requests.length - 1].dataName).toString(),
            transaction: transaction
        })

        global.filesystem.data.requests.pop()
        global.filesystem.writeData()

        m.route.set("/requested-attestation")
    },
    cancel: function() {
        global.filesystem.data.requests.pop()
        global.filesystem.writeData()

        m.route.set("/requested-attestation")
    },
    view: function () {
        try {
            return m("div", [
                m("h4", {class: "centered-text"}, "Requested attestation from contact"),
                m("div[class=\"center\"]", [
                    m("div", {class: "centered-text"}, [
                        m("label", "From contact\n" + global.filesystem.data.requests[global.filesystem.data.requests.length - 1].requestedFrom)
                    ]),
                    m("hr"),
                    m("label", "Data to attest:"),
                    m("div", {class: "row"}, [
                        m("pre", global.filesystem.data.requests[global.filesystem.data.requests.length - 1].data)
                    ]),
                    m("div", {class: "row"}, [
                        m("button", {
                            style: "margin-right: 10px;",
                            onclick: this.attest.bind(this)
                        }, "Attest"),
                        m("button", {
                            onclick: this.cancel.bind(this)
                        }, "Cancel")
                    ])
                ])
            ])
        } catch (err) {
            if (err.message.indexOf("requestedFrom") !== -1) {
                alert("There is no more attestation requests...")
                m.route.set("/contacts")
            }
        }
    }
}