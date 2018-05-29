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
    		m("div", {class: "centered-text"}, [
                m("h4", "New data")
            ]),
            m("div", {class: "left"}, [
                m("select", {
                    id: "dataType",
                    class: "u-full-width",
                    onchange: m.withAttr("selectedIndex", this.setDataType.bind(this)),
                }, dataTypes.map(function(val, id) {
                    return m(id === this.selectedDataType ? "option[selected]" : "option", {
                        value: id
                    }, val)
                }))
            ]),
            m("div", {class: "right"}, [
                fields[this.selectedDataType],
                m("div", {class: "row"}, [
                    m("button", {
                        style: "margin-right: 10px;",
                        onclick: this.saveData.bind(this)
                    }, "Save"),
                    m("button", {
                        onclick: this.cancel.bind(this)
                    }, "Cancel")
                ])
            ])
    	])
    }
}