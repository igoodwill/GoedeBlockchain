const m = require('mithril')

var data = {
    data: [],
    setData: function(id, val) {
        this.data[id] = val
    },
    clearData: function() {
        this.data = []
    }
}

const dataTypes = global.dataTypes
const fields = global.dataTypesFields

module.exports = {
	selectedDataType: 0,
	setDataType: function (id) {
        if (id === this.selectedDataType)
            return

        this.selectedDataType = id
        data.clearData()
        m.redraw()
    },
    saveData: function () {
        // Call here a method that saves the data.

        m.route.set("/user-data")
    },
    cancel: function() {
        m.route.set("/user-data")
    },
	view: function () {
    	return m("div", [
    		m("h4", {class: "title"}, "New data"),
            m("div", {class: "row"}, [
                m("div", {class: "six columns"}, [
                    m("label", {for: "dataType"}, "Data type"),
                    m("select", {
                        id: "dataType",
                        class: "u-full-width",
                        onchange: m.withAttr("selectedIndex", this.setDataType.bind(this)),
                    }, dataTypes.map(function(val, id) {
                        return m(id === this.selectedDataType ? "option[selected]" : "option", {
                            value: id
                        }, val)
                    }))
                ])
            ]),
            m("br"),
    		fields[this.selectedDataType],
            m("br"),
            m("div", {class: "row"}, [
                m("button", {
                	class: "button-primary",
                	onclick: this.saveData.bind(this)},
                	"Save")
            ]),
            m("div", {class: "row"}, [
                m("button", {
                	class: "button-primary",
                	onclick: this.cancel.bind(this)},
                	"Cancel")
            ]),
            m("div", {class: "row"}, [
                m("a", {href: "#!/user-data"}, "Back")
            ])
    	])
    }
}