const m = require('mithril')
const SHA256 = require("crypto-js/sha256")
const p2p = require('../partial/p2p.js')

var dataToShow = []

function getContacts() {
    return global.filesystem.data.contacts;
}

function search(dataTypeId, value, minAttestationsNumber) {
    var allData = global.filesystem.data.userData

    Promise.all(allData.map(function (val) {
        return global.chain.retrieveData(SHA256(val.dataName).toString(), global.chain.address).then(function (result) {
            val.attestationsNumber = parseInt(result.data.split("\n")[1])
            return val
        })
    })).then(function (all) {
        return all.filter(function (val) {
            return (dataTypeId === val.dataType) && (val.dataName.toLowerCase().indexOf(value.toLowerCase()) !== -1)
            && (val.attestationsNumber >= minAttestationsNumber)
        })
    }).then(function (result) {
        dataToShow = result
        m.redraw()
    })
}

const dataTypes = global.dataTypes

module.exports = {
    selectedDataType: 0,
    selectedData: 0,
    searchFor: "",
    minAttestationsNumber: 0,
    setDataType: function (id) {
        if (id === this.selectedDataType)
            return

        this.selectedDataType = id

        var nodeList = document.getElementsByName('fieldToRequest')

        for (var i = 0; i < nodeList.length; i++)
            nodeList[i].checked = false
    },
    setDataToAttest: function (id) {
        this.selectedData = id
    },
    setSearchFor: function (searchFor) {
        this.searchFor = searchFor
    },
    setMinAttestationsNumber: function (min) {
        this.minAttestationsNumber = min
    },
    search: function () {
        search(this.selectedDataType, this.searchFor, this.minAttestationsNumber)
    },
    oncreate: function() {
        search(0, "", 0)
    },
    sendRequest: function() {
        if (!dataToShow[this.selectedData]) {
            alert("Choose the data to send, please!")
            return
        }

        var nodeList = document.getElementsByName('contact')
        var contactNames = getContacts()

        for (var i = 0; i < nodeList.length; i++)
            if (nodeList[i].checked)
                p2p.sendData(global.peer, contactNames[i], {
                    isRequest: true,
                    data: dataToShow[this.selectedData]
                })

        m.route.set("/contacts")
    },
    cancel: function() {
        m.route.set("/contacts")
    },
    view: function () {
        return m("div", [
            m("h4", {class: "centered-text"}, "Attestation request"),
            m("div[class=\"center\"]", [
                m("label", "Select contact(s)"),
                m("ul", [
                    getContacts().map(function(contact, id) {
                        return m("li", [
                            m("label", {
                                class: "custom-checkbox",
                                for: id
                            }, [
                                m("input", {
                                    type: "checkbox",
                                    id: id,
                                    name: "contact"
                                }),
                                m("span", {class: "custom-checkmark"})
                            ], contact)
                        ])
                    })
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
                        style: "margin-left: 50px;",
                        onclick: this.search.bind(this)
                    }, "Search")
                ]),
                m("div", {class: "row"}, [
                    m("input", {
                        class: "six columns",
                        type: "number",
                        name: "numberOfAttestations",
                        placeholder: "How much attestations",
                        oninput: m.withAttr("value", this.setMinAttestationsNumber.bind(this)),
                        value: this.minAttestationsNumber
                    })
                ]),
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
                m("label", "Data to attest:"),
                m("div", {class: "row"}, [
                    m("div", {class: "six columns"}, [
                        m("select", {
                            id: "data",
                            class: "u-full-width",
                            onchange: m.withAttr("selectedIndex", this.setDataToAttest.bind(this)),
                        }, dataToShow.map(function(val, id) {
                            return m(id === this.selectedData ? "option[selected]" : "option", {
                                value: id
                            }, val.dataName)
                        }))
                    ])
                ]),
                m("div", {class: "row"}, [
                    m("button", {
                        style: "margin-right: 10px;",
                        onclick: this.sendRequest.bind(this)
                    }, "Attest"),
                    m("button", {
                        onclick: this.cancel.bind(this)
                    }, "Cancel")
                ])
            ])
        ])
    }
}