const m = require('mithril')

function getTransactions() {
    var transactions = [
        {
            hash: "HASH_1",
            sender: "SENDER_1",
            receiver: "SENDER_1",
            value: "VALUE_1",
            dateTime: "DATE_TIME_1"
        }, {
            hash: "HASH_2",
            sender: "SENDER_2",
            receiver: "SENDER_2",
            value: "VALUE_2",
            dateTime: "DATE_TIME_2"
        }
    ] // Call here a method that returns an array of transactions. A transaction must have fields: hash, sender, receiver, value, dateTime!

    return transactions;
}

module.exports = {
	view: function () {
    	return m("div", [
    		m("h4", {class: "title"}, "Transactions"),

            m("table", [
                m("thead", [m("tr", [
                    m("th", "Hash"),
                    m("th", "Sender"),
                    m("th", "Receiver"),
                    m("th", "Value"),
                    m("th", "DateTime")
                ])]),
              m("tbody", [
                getTransactions().map(function(transaction) {
                  return m("tr", [
                    m("td", transaction.hash),
                    m("td", transaction.sender),
                    m("td", transaction.receiver),
                    m("td", transaction.value),
                    m("td", transaction.dateTime)
                  ])
                })
              ])
            ]),

            m("div", {class: "row"}, [
                m("a", {href: "#!/wallet"}, "Back to wallet")
            ])
    	])
    }
}