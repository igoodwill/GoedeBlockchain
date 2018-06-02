const m = require('mithril')
const p2p = require('../partial/p2p.js')

function search(dataTypeId, value) {
    var allData = global.filesystem.data.userData

    return allData.filter(function (val) {
        return (dataTypeId === val.dataType) && (val.dataName.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    })
}

const dataTypes = global.dataTypes

module.exports = {
    dataToShow: [],
    selectedDataType: 0,
    selectedData: 0,
    searchFor: "",
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
    setDataToSend: function (id) {
        this.selectedData = id
    },
    setSearchFor: function (searchFor) {
        this.searchFor = searchFor
    },
    search: function () {
        this.dataToShow = search(this.selectedDataType, this.searchFor)
    },
    setReceiverAddress: function (address) {
        this.receiverAddress = address
    },
    sendData: function () {
        if (!this.dataToShow[this.selectedData]) {
            alert("Choose the data to send, please!")
            return
        }

        if (!this.receiverAddress) {
            alert("Input receiver's public key, please!")
            return
        }

        p2p.sendData(global.peer, this.receiverAddress, {
            isRequest: false,
            data: this.dataToShow[this.selectedData]
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
            m("div", {class: "row"}, [
                m("input", {
                    class: "six columns",
                    type: "search",
                    placeholder: "Search",
                    name: "search",
                    oninput: m.withAttr("value", this.setSearchFor.bind(this)),
                    value: this.searchFor
                }),
                m("button", {
                    class: "small-btn",
                    style: "margin-left: 130px;",
                    onclick: this.search.bind(this)
                }, "Search")
            ]),
            // TODO Attestation
            m("div", {class: "row"}, [
                m("div", {class: "six columns"}, [
                    m("select", {
                        id: "dataType",
                        class: "u-full-width",
                        onchange: m.withAttr("selectedIndex", this.setDataType.bind(this)),
                    }, dataTypes.map(function(val, id) {
                        return m(id === this.selectedDataType ? "option[selected]" : "option", {
                            value: id
                        }, val)
                    }))
                ])
            ]),
            m("label", "Data to send:"),
            m("div", {class: "row"}, [
                m("div", {class: "six columns"}, [
                    m("select", {
                        id: "data",
                        class: "u-full-width",
                        onchange: m.withAttr("selectedIndex", this.setDataToSend.bind(this)),
                    }, this.dataToShow.map(function(val, id) {
                        return m(id === this.selectedData ? "option[selected]" : "option", {
                            value: id
                        }, val.dataName)
                    }))
                ])
            ]),
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
    }
}