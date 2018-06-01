const m = require('mithril')

function getContacts() {
    return global.filesystem.data.contacts;
}

function getTotalTransactionsByAddress(address) {
    return 44 // TODO
}

module.exports = {
    newContactAddress: "",
	sendRequest: function() {
		m.route.set("/send-request")
	},
    requestedData: function() {
        m.route.set("/requested-data")
    },
    setNewContactAddress: function(address) {
        this.newContactAddress = address
    },
    addContact: function() {
        global.filesystem.data.contacts[global.filesystem.data.contacts.length] = this.newContactAddress
        global.filesystem.writeData()

        this.newContactAddress = ""
    },
	view: function () {
    	return m("div", [
    		m("h4", {class: "title"}, "Contacts"),
            m("table", {style: "width: 75%;float:left;"}, [
                m("thead", [m("tr", [
                    m("th", "Name"),
                    m("th", "Total Transactions")
                ])]),
                m("tbody", [
                    getContacts().map(function(contact) {
                        return m("tr", [
                            m("td", contact),
                            m("td", getTotalTransactionsByAddress(contact))
                        ])
                    })
                ])
            ]),
            m("div", {class: "row"}, [
                m("button", {
                    class: "small-btn",
                    style: "margin-left: 5px;float:right;",
                    onclick: this.sendRequest.bind(this),
                }, "Send Request"),
                m("button", {
                    class: "small-btn",
                    style: "margin-left: 5px;float:right;",
                    onclick: this.requestedData.bind(this),
                }, "Requested data")
            ]),
            m("input", {
                type: "text",
                name: "address",
                placeholder: "New contact's address",
                name: "newContactAddress",
                oninput: m.withAttr("value", this.setNewContactAddress.bind(this)),
                value: this.newContactAddress
            }),
            m("button", {onclick: this.addContact.bind(this)}, "Add"),
            m("div", {class: "back"}, [
                m("a", {href: "#!/wallet"}, "Back to wallet")
            ])
    	])
    }
}