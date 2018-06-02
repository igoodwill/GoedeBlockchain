const m = require('mithril')

function getPublicKey() {
	var publicKey = global.chain.address.toString()

	return publicKey;
}

module.exports = {
	logout: function() {
		global.filesystem.data = undefined
        global.filesystem.seed = ""
        global.filesystem.folderPath = ""
        global.peer.destroy()
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
    switch2fa: function() {
	    if(global.filesystem.data.otpenabled) {
	        global.filesystem.data.otpenabled = false
            global.filesystem.otp.enabled = false
            global.filesystem.writeData()
        } else {
            global.filesystem.data.otpenabled = true
            global.filesystem.otp.enabled = true
            global.filesystem.writeData()

            m.route.set("/view-two-factor")
        }
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
            m("div", {class: "centered-text"}, [
                m("button", {
                    onclick: this.switch2fa.bind(this)
                }, (global.filesystem.otp.enabled ? "Disable 2FA" : "Enable 2FA"))
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