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
    selectedDataType: 0,
    dataName: "",
    receiverAddress: "",
    setDataType: function (id) {
        if (id === this.selectedDataType)
            return

        this.selectedDataType = id

        var nodeList = document.getElementsByName('dataTypeField')

        for (var i = 0; i < nodeList.length; i++)
            nodeList[i].value = ""

        data.clearData()
    },
    setDataName: function (name) {
        this.dataName = name
    },
    setReceiverAddress: function (address) {
        this.receiverAddress = address
    },
    sendData: function () {
        if (!this.dataName) {
            alert("Input data name, please!")
            return
        }

        var nodeList = document.getElementsByName('dataTypeField')

        for (var i = 0; i < nodeList.length; i++)
            if (!nodeList[i].value) {
                alert("Input all data fields, please!")
                return
            }

        if (!this.receiverAddress) {
            alert("Input receiver's public key, please!")
            return
        }

        var stringData = ""
        for (var i = 0; i < data.data.length - 1; i++)
            stringData += global.dataTypesFieldsNames[this.selectedDataType][i] + ": " + data.data[i] + "\n"
        stringData += global.dataTypesFieldsNames[this.selectedDataType][data.data.length - 1] + ": " + data.data[data.data.length - 1]

        p2p.sendData(global.peer, this.receiverAddress, {
            isRequest: false,
            data: {
                dataName: this.dataName,
                dataType: this.selectedDataType,
                data: stringData
            }
        })

        m.route.set("/wallet")
    },
    cancel: function() {
        m.route.set("/wallet")
    },
    view: function () {
        return m("div", [
    		m("div", {class: "centered-text"}, [
                m("h4", "Send data")
            ]),
            m("div", {class: "left"}, [
                m("select", {
                    id: "dataType",
                    class: "u-full-width",
                    onchange: m.withAttr("selectedIndex", this.setDataType.bind(this)),
                }, dataTypes.map(function(val, id) {
                    return m(id === this.selectedDataType ? "option[selected]" : "option", {
                        value: id
                    }, val)
                }))
            ]),
            m("div", {class: "right"}, [
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
                global.dataTypesFieldsNames[this.selectedDataType].map(function (value, id) {
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
                m("label", "Send to:"),
                m("div", {class: "row"}, [
                    m("input", {
                        type: "text",
                        name: "receiver",
                        placeholder: "Receiver's public key",
                        name: "receiverAddress",
                        oninput: m.withAttr("value", this.setReceiverAddress.bind(this))
                    })
                ]),
                m("div", {class: "row"}, [
                    m("button", {
                        style: "margin-right: 10px;",
                        onclick: this.sendData.bind(this)
                    }, "Send"),
                    m("button", {
                        onclick: this.cancel.bind(this)
                    }, "Cancel")
                ])
            ])
    	])
    }
}