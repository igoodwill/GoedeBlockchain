const m = require('mithril')

function getContacts() {
    var contacts = [
        {
            name: "NAME_1",
            totalTransactions: "TOTAL_TRANSACTIONS_1"
        }, {
            name: "NAME_2",
            totalTransactions: "TOTAL_TRANSACTIONS_2"
        }
    ] // Call here a method that returns an array of contacts. A contact must have fields: name, totalTransactions!

    return contacts;
}

const contacts = getContacts()

module.exports = {
	sendRequest: function() {
		m.route.set("/send-request")
	},
	view: function () {
    	return m("div", [
    		m("h4", {class: "title"}, "Contacts"),

            m("table", [
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

            m("button", {
            	class: "button-primary",
            	onclick: this.sendRequest.bind(this)
            }, "Send Request"),
			m("br"),
            m("div", {class: "row"}, [
                m("a", {href: "#!/wallet"}, "Back to wallet")
            ])
    	])
    }
}