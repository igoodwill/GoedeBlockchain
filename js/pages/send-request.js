const m = require('mithril')

function getContactsNames() {
    var contactsNames = [
        "NAME_1", "NAME_2"
    ] // Call here a method that returns an array of contacts' names.

    return contactsNames;
}

const dataTypes = global.dataTypes
const contactsNames = getContactsNames()

module.exports = {
    selectedDataType: 0,
    setDataType: function (id) {
        this.selectedDataType = id
    },
    sendRequest: function() {
        var checkedContacts = []
        var nodeList = document.getElementsByName('contact')

        for (var i = 0; i < nodeList.length; i++)
            checkedContacts[i] = nodeList[i].checked

        alert(checkedContacts + "\n" + this.selectedDataType)// Call here a method that sends the request.

        m.route.set("/contacts")
    },
    cancel: function() {
        this.checkedContacts = []
        m.route.set("/contacts")
    },
    view: function () {
        return m("div", [
            m("h4", {class: "title"}, "Data Request"),
            m("br"),
            m("b", "Select contact(s)"),
            m("ul", [
                contactsNames.map(function(contactName, id) {
                    return m("li", [
                        m("b", {for: id}, contactName),
                        m("input", {
                            type: "checkbox",
                            id: id,
                            name: "contact"
                        })
                    ])
                })
            ]),
            m("b", "Select data type"),
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
            m("button", {
                class: "button-primary",
                onclick: this.sendRequest.bind(this)
            }, "Send"),
            m("br"),
            m("button", {
                class: "button-primary",
                onclick: this.cancel.bind(this)
            }, "Cancel")
        ])
    }
}