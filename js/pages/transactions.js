const m = require('mithril')

var transactions = []

function updateTransactions() {
    global.chain.retrieveData("transactions", global.chain.address).then(function (result) {
        if (result.data === null)
            return

        var transactionsFromBlockchain = result.data.split("\n")
        for (var i = 0; i < transactionsFromBlockchain.length / 2; i++) {
            var fields = transactionsFromBlockchain[2 * i].split(" ")
            transactions[i] = {
                hash: fields[0],
                sender: fields[1],
                receiver: fields[2],
                value: fields[3],
                dateTime: new Date(transactionsFromBlockchain[2 * i + 1]).toLocaleDateString("en-US", {
                    month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
                })
            }
        }

        m.redraw()
    })
}

module.exports = {
    oncreate: function() {
        updateTransactions()
    },
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
              m("tbody", {class: "transactions"}, [
                transactions.map(function(transaction) {
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
            m("div", {class: "back"}, [
                m("a", {href: "#!/wallet"}, "Back to wallet")
            ])
    	])
    }
}