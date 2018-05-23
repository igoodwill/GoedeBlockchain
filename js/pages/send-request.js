const m = require('mithril')

function getContactsNames() {
    var contactsNames = [
        "NAME_1", "NAME_2"
    ] // Call here a method that returns an array of contacts' names.

    return contactsNames;
}

module.exports = {
    sendRequest: function() {
        // Call here a method that sends the request.
        m.route.set("/contacts")
    },
    cancel: function() {
        m.route.set("/contacts")
    },
    view: function () {
        return m("div", [
            m("h4", {class: "title"}, "Data Request"),

            // TODO List

            // TODO Fields

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