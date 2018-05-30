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
const fields = [ // Fields of data types which are displayed to user.
    m("div", [
        m("label", "First name"),
        m("div", {class: "row"}, [
            m("input", {
                type: "text",
                name: "dataTypeField",
                placeholder: "First name",
                oninput: m.withAttr("value", function (val) {
                    data.setData(0, val)
                })
            })
        ]),
        m("label", "Last name"),
        m("div", {class: "row"}, [
            m("input", {
                type: "text",
                name: "dataTypeField",
                placeholder: "Last name",
                oninput: m.withAttr("value", function (val) {
                    data.setData(1, val)
                })
            })
        ])
    ]),

    m("div", [
        m("label", "Phone number"),
        m("div", {class: "row"}, [
            m("input", {
                type: "tel",
                name: "dataTypeField",
                placeholder: "Phone number",
                oninput: m.withAttr("value", function (val) {
                    data.setData(0, val)
                })
            })
        ])
    ])
]

module.exports = {
	selectedDataType: 0,
	setDataType: function (id) {
        if (id === this.selectedDataType)
            return

        this.selectedDataType = id

        var nodeList = document.getElementsByName('dataTypeField')

        for (var i = 0; i < nodeList.length; i++)
            nodeList[i].value = ""
        
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