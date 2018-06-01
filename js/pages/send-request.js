const m = require('mithril')
const p2p = require('../partial/p2p.js')

function getContacts() {
    return global.filesystem.data.contacts;
}

const dataTypes = global.dataTypes

module.exports = {
    selectedDataType: 0,
    setDataType: function (id) {
        if (id === this.selectedDataType)
            return

        this.selectedDataType = id

        var nodeList = document.getElementsByName('fieldToRequest')

        for (var i = 0; i < nodeList.length; i++)
            nodeList[i].checked = false
    },
    sendRequest: function() {
        var checkedFields = []
        var nodeList = document.getElementsByName('fieldToRequest')

        var flag = true
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].checked) {
                checkedFields.push(global.dataTypesFieldsNames[this.selectedDataType][i])
                flag = false
            }
        }

        if (flag) {
            alert("Choose at least one field to request, please!")
            return
        }

        nodeList = document.getElementsByName('contact')
        var contactNames = getContacts()

        for (var i = 0; i < nodeList.length; i++)
            if (nodeList[i].checked)
                p2p.sendData(global.peer, contactNames[i], {
                    isRequest: true,
                    data: {
                        dataType: this.selectedDataType,
                        fieldsToRequest: checkedFields
                    }
                })

        m.route.set("/contacts")
    },
    cancel: function() {
        m.route.set("/contacts")
    },
    view: function () {
        return m("div", [
            m("h4", {class: "centered-text"}, "Data request"),
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
                m("label", "Select data type"),
                m("div", {class: "row"}, [
                    m("div", {class: "six columns"}, [
                        m("select", {
                            id: "dataType",
                            class: "u-full-width",
                            onchange: m.withAttr("selectedIndex", this.setDataType.bind(this)),
                        }, dataTypes.map(function(val, id) {
                            return m("option", {
                                value: id
                            }, val)
                        }))
                    ])
                ]),
                global.dataTypesFieldsNames[this.selectedDataType].map(function (value) {
                    return [
                        m("label", {class: "custom-checkbox"}, [
                            m("input", {
                                type: "checkbox",
                                name: "fieldToRequest",
                                style: "float: left;"
                            }),
                            m("span", {class: "custom-checkmark"})
                        ], value),
                    ]
                }),
                m("div", {class: "row"}, [
                    m("button", {
                        style: "margin-right: 10px;",
                        onclick: this.sendRequest.bind(this)
                    }, "Send"),
                    m("button", {
                        onclick: this.cancel.bind(this)
                    }, "Cancel")
                ])
            ])
        ])
    }
}