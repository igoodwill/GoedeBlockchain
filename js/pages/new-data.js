const m = require('mithril')

module.exports = {
	view: function () {
    	return m("div", [
    		m("br"),
            m("div", {class: "row"}, [
                m("a", {href: "#!/user-data"}, "Back")
            ])
    	])
    }
}