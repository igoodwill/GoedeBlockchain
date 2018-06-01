const m = require('mithril')
const p2p = require('../partial/p2p.js')

var data = {
    data: [],
    setData: function(id, val) {
        this.data[id] = val
    },
    clearData: function() {
        this.data = []
    }
}

const dataTypes = global.dataTypes

module.exports = {
    dataName: "",
    setDataName: function (name) {
        this.dataName = name
    },
    send: function() {        
        var flag = true
        var stringData = ""
        for (var i = 0; i < data.data.length - 1; i++) {
            if (data.data[i]) {
                flag = false
                stringData += global.filesystem.data.requests[global.filesystem.data.requests.length - 1].fieldsToRequest[i] + ": " + data.data[i] + "\n"
            }
        }

        if (flag && ! data.data[data.data.length - 1]) {
            alert("Choose at least one field to send, please!")
            return
        }

        stringData += global.filesystem.data.requests[global.filesystem.data.requests.length - 1].fieldsToRequest[data.data.length - 1] + ": " + data.data[data.data.length - 1]

        p2p.sendData(global.peer, global.filesystem.data.requests[global.filesystem.data.requests.length - 1].requestedFrom, {
            isRequest: false,
            data: {
                dataName: this.dataName,
                dataType: global.filesystem.data.requests[global.filesystem.data.requests.length - 1].dataType,
                data: stringData
            }
        })

        global.filesystem.data.requests.pop()
        global.filesystem.writeData()

        m.route.set("/requested-data")
    },
    cancel: function() {
        global.filesystem.data.requests.pop()
        global.filesystem.writeData()

        m.route.set("/requested-data")
    },
    view: function () {
        try {
            return m("div", [
                m("h4", {class: "centered-text"}, "Requested data from contact"),
                m("div[class=\"center\"]", [
                    m("div", {class: "centered-text"}, [
                        m("label", "From contact\n" + global.filesystem.data.requests[global.filesystem.data.requests.length - 1].requestedFrom)
                    ]),
                    m("hr"),
                    m("label", "Requested data: " + dataTypes[global.filesystem.data.requests[global.filesystem.data.requests.length - 1].dataType].toLowerCase()),
                    m("br"),
                    m("label", "Data name"),
                    m("div", {class: "row"}, [
                        m("input", {
                            type: "text",
                            name: "dataName",
                            placeholder: "Data name",
                            oninput: m.withAttr("value", this.setDataName.bind(this)),
                            value: this.dataName
                        })
                    ]),
                    m("label", "Requested attributes:"),
                    global.filesystem.data.requests[global.filesystem.data.requests.length - 1].fieldsToRequest.map(function (value, id) {
                        return [
                            m("label", value),
                            m("div", {class: "row"}, [
                                m("input", {
                                    type: "text",
                                    name: "dataTypeField",
                                    placeholder: value,
                                    oninput: m.withAttr("value", function (val) {
                                        data.setData(id, val)
                                    })
                                })
                            ])
                        ]
                    }),
                    m("div", {class: "row"}, [
                        m("button", {
                            style: "margin-right: 10px;",
                            onclick: this.send.bind(this)
                        }, "Send"),
                        m("button", {
                            onclick: this.cancel.bind(this)
                        }, "Cancel")
                    ]),
                    m("div", {class: "back"}, [
                        m("a", {href: "#!/contacts"}, "Back")
                    ])
                ])
            ])
        } catch (err) {
            if (err.message.indexOf("requestedFrom") !== -1) {
                alert("There is no more data requests...")
                m.route.set("/contacts")
            }
        }
    }
}