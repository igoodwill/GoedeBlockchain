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
    selectedData: 0,
    searchFor: "",
    setDataToSend: function (id) {
        this.selectedData = id
    },
    setSearchFor: function (searchFor) {
        this.searchFor = searchFor
    },
    search: function () {
        this.dataToShow = search(global.filesystem.data.requests[global.filesystem.data.requests.length - 1].dataType, this.searchFor)
    },
    send: function() {  
        if (!this.dataToShow[this.selectedData]) {
            alert("Choose the data to send, please!")
            return
        }

        var stringData = ""
        var nodeList = document.getElementsByName('fieldToSend')

        var flag = true
        for (var i = 0; i < nodeList.length - 1; i++) {
            if (nodeList[i].checked) {
                var id = this.dataToShow[this.selectedData].data.indexOf(global.filesystem.data.requests[global.filesystem.data.requests.length - 1].fieldsToRequest[i])
                var id2 = this.dataToShow[this.selectedData].data.indexOf("\n", id)
                stringData += this.dataToShow[this.selectedData].data.substring(id, id2 + 1);
                flag = false
            }
        }

        if (flag && !nodeList[nodeList.length - 1].checked) {
            alert("Choose at least one field to send, please!")
            return
        }

        var id = this.dataToShow[this.selectedData].data.indexOf(global.filesystem.data.requests[global.filesystem.data.requests.length - 1].fieldsToRequest[nodeList.length - 1])
        var id2 = this.dataToShow[this.selectedData].data.indexOf("\n", id)

        if (id2 === -1)
            stringData += this.dataToShow[this.selectedData].data.substring(id);
        else
            stringData += this.dataToShow[this.selectedData].data.substring(id, id2);

        p2p.sendData(global.peer, global.filesystem.data.requests[global.filesystem.data.requests.length - 1].requestedFrom, {
            isRequest: false,
            data: {
                dataName: this.dataToShow[this.selectedData].dataName,
                dataType: this.dataToShow[this.selectedData].dataType,
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
                    m("div", {class: "row"}, [
                        m("input", {
                            class: "six columns",
                            type: "search",
                            placeholder: "Search",
                            name: "search",
                            oninput: m.withAttr("value", this.setSearchFor.bind(this)),
                            value: this.searchFor
                        })
                    ]),
                    m("div", {class: "row"}, [
                        m("button", {onclick: this.search.bind(this)}, "Search")
                    ]),
                    // TODO Attestation
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
                    m("label", "Requested attributes:"),
                    global.filesystem.data.requests[global.filesystem.data.requests.length - 1].fieldsToRequest.map(function (value, id) {
                        return [
                            m("label", {class: "custom-checkbox"}, [
                                m("input", {
                                    type: "checkbox",
                                    name: "fieldToSend",
                                    style: "float: left;"
                                }),
                                m("span", {class: "custom-checkmark"})
                            ], value),
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