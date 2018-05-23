const m = require('mithril')

function getPublicKey() {
	var publicKey = "YOUR_PUBLIC_KEY" // Call here a method that returns the user's public key.

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
    		m("h4", {class: "title"}, "Welcome!"),
    		m("br"),
    		m("b", getPublicKey()),
    		m("br"),
            m("button", {
            	class: "button-primary",
            	onclick: this.userData.bind(this)
            }, "Your data"),
            m("br"),
            m("button", {
            	class: "button-primary",
            	onclick: this.receivedData.bind(this)
            }, "Received data"),
            m("br"),
            m("button", {
            	class: "button-primary",
            	onclick: this.sendData.bind(this)
            }, "Send data"),
            m("br"),
            m("button", {
            	class: "button-primary",
            	onclick: this.contacts.bind(this)
            }, "Contacts"),
            m("br"),
            m("button", {
            	class: "button-primary",
            	onclick: this.transactions.bind(this)
            }, "Transactions"),
            m("br"),
            m("div", {class: "row"}, [
                m("a", {
                	onclick: this.logout.bind(this),
                	href: "#!/login"
                }, "Logout")
            ])
    	])
	}
}