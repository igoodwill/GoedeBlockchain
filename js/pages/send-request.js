const m = require('mithril')

function getContactsNames() {
    var contactsNames = [
        "Name 1", "Name 2", "Name 3", "Name 4", "Name 5", "Name 6"
    ] // Call here a method that returns an array of contacts' names.

    return contactsNames;
}

const fieldsToRequest = [ // Fields of data types which are displayed to user.
    m("div", [
        m("label", {class: "custom-checkbox"}, [
            m("input", {
                type: "checkbox",
                name: "fieldToRequest",
                style: "float: left;"
            }),
            m("span", {class: "custom-checkmark"})
        ], "First name"),
        m("label", {class: "custom-checkbox"}, [
            m("input", {
                type: "checkbox",
                name: "fieldToRequest",
                style: "float: left;"
            }),
            m("span", {class: "custom-checkmark"})
        ], "Second name")
    ]),

    m("div", [
        m("label", {class: "custom-checkbox"}, [
            m("input", {
                type: "checkbox",
                name: "fieldToRequest",
                style: "float: left;"
            }),
            m("span", {class: "custom-checkmark"})
        ], "Phone number")
    ])
]

const dataTypes = global.dataTypes
const contactsNames = getContactsNames()

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
        var checkedContacts = []
        var nodeList = document.getElementsByName('contact')

        for (var i = 0; i < nodeList.length; i++)
            checkedContacts[i] = nodeList[i].checked

        var checkedFields = []
        nodeList = document.getElementsByName('fieldToRequest')

        for (var i = 0; i < nodeList.length; i++)
            checkedFields[i] = nodeList[i].checked

        alert(checkedContacts + "\n" + checkedFields + "\n" + this.selectedDataType)// Call here a method that sends the request.

        m.route.set("/contacts")
    },
    cancel: function() {
        this.checkedContacts = []
        m.route.set("/contacts")
    },
    view: function () {
        return m("div", [
            m("h4", {class: "centered-text"}, "Data request"),
            m("div[class=\"center\"]", [
                m("label", "Select contact(s)"),
                m("ul", [
                    contactsNames.map(function(contactName, id) {
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
                            ], contactName)
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
                fieldsToRequest[this.selectedDataType],
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