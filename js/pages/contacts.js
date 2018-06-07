const m = require('mithril')

var contacts = []

function updateContacts() {
    Promise.all(global.filesystem.data.contacts.map(function (val) {
        return {
            name: val,
            totalTransactions: 0
        }
    }).map(function (val) {
        return global.chain.retrieveData("transactions", val.name).then(function (result) {
            if (result.data)
                val.totalTransactions = result.data.split("\n").length / 2
            else
                val.totalTransactions = 0

            return val
        })
    })).then(function (result) {
        contacts = result
        m.redraw()
    })
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
        if (!this.newContactAddress) {
            alert("Input new contact's address, please!")
            return
        }

        global.filesystem.data.contacts[global.filesystem.data.contacts.length] = this.newContactAddress
        global.filesystem.writeData()

        this.newContactAddress = ""
        updateContacts()
    },
    oncreate: function() {
        updateContacts()
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
                    contacts.map(function(contact) {
                        return m("tr", [
                            m("td", contact.name),
                            m("td", contact.totalTransactions)
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