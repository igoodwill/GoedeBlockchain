const m = require('mithril')

function getPublicKey() {
    global.chain.loadKeyFromSeed(global.filesystem.seed)
	var publicKey = global.chain.address.toString() // Call here a method that returns the user's public key.

	return publicKey;
}

module.exports = {
	logout: function() {
		alert("Logged out") // Call here a method that logs out the user, if any actions should be done.
	},
	userData: function() {
		m.route.set("/user-data")
	},
	receivedData: function() {
		m.route.set("/received-data")
	},
	sendData: function() {
		m.route.set("/send-data")
	},
	contacts: function() {
		m.route.set("/contacts")
	},
	transactions: function() {
		m.route.set("/transactions")
	},
	view: function () {
    	return m("div", [
            m("div", {class: "centered-text"}, [
                m("h4", "Welcome!")
            ]),
            m("div", {class: "centered-text"}, [
                m("label", getPublicKey())
            ]),
            m("div", {class: "centered-text"}, [
                m("button", {
                	onclick: this.userData.bind(this)
                }, "Your data")
            ]),
            m("div", {class: "centered-text"}, [
                m("button", {
                	onclick: this.receivedData.bind(this)
                }, "Received data")
            ]),
            m("div", {class: "centered-text"}, [
                m("button", {
                	onclick: this.sendData.bind(this)
                }, "Send data")
            ]),
            m("div", {class: "centered-text"}, [
                m("button", {
                	onclick: this.contacts.bind(this)
                }, "Contacts")
            ]),
            m("div", {class: "centered-text"}, [
                m("button", {
                	onclick: this.transactions.bind(this)
                }, "Transactions")
            ]),
            m("div", {class: "back"}, [
                m("a", {
                	onclick: this.logout.bind(this),
                	href: "#!/login"
                }, "Logout")
            ])
    	])
	}
}