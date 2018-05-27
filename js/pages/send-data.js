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
        m("b", "First name"),
        m("br"),
        m("input", {
            type: "text",
            name: "first",
            placeholder: "First name",
            oninput: m.withAttr("value", function (val) {
                data.setData(0, val)
            }),
            value: data.data[0]
        }),
        m("br"),
        m("b", "Last name"),
        m("br"),
        m("input", {
            type: "text",
            name: "last",
            placeholder: "Last name",
            oninput: m.withAttr("value", function (val) {
                data.setData(1, val)
            }),
            value: data.data[1]
        })
    ]),

    m("div", [
        m("b", "Phone number"),
        m("br"),
        m("input", {
            type: "tel",
            name: "number",
            placeholder: "Phone number",
            oninput: m.withAttr("value", function (val) {
                data.setData(0, val)
            }),
            value: data.data[0]
        })
    ])
]

module.exports = {
    selectedDataType: 0,
    receiverAddress: "",
    setDataType: function (id) {
        if (id === this.selectedDataType)
            return

        this.selectedDataType = id
        data.clearData()
        m.redraw()
    },
    setReceiverAddress: function (address) {
        this.receiverAddress = address
    },
    sendData: function () {
        // Call here a method that sends the data.

        m.route.set("/wallet")
    },
    view: function () {
        return m("div", [
    		m("h4", {class: "title"}, "Send Data"),
            m("div", {class: "row"}, [
                m("div", {class: "six columns"}, [
                    m("label", {for: "dataType"}, "Data Type"),
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
                m("input", {
                    class: "six columns",
                    type: "email",
                    placeholder: "Send to",
                    name: "receiverAddress",
                    oninput: m.withAttr("value", this.setReceiverAddress.bind(this)),
                    value: this.receiverAddress
                })
            ]),
            m("div", {class: "row"}, [
                m("button", {
                	class: "button-primary",
                	onclick: this.sendData.bind(this)},
                	"Send")
            ]),
            m("div", {class: "row"}, [
                m("a", {href: "#!/wallet"}, "Back to wallet")
            ])
    	])
    }
}