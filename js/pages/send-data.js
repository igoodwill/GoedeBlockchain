const m = require('mithril')

module.exports = {
	view: function () {
    	return m("div", [
    		m("h4", {class: "title"}, "Send Data"),
    		m("br"),
            m("div", {class: "row"}, [
                m("a", {href: "#!/wallet"}, "Back to wallet")
            ])
    	])
    }
}