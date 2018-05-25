const m = require('mithril')

module.exports = {
	data: "",
    receiverAddress: "",
    setData: function (val) {
        this.data = val
    },
    setReceiverAddress: function (val) {
        this.receiverAddress = val
    },
    sendData: function () {
        // Call here a method that sends the data.
    },
    view: function () {
        return m("div", [
    		m("h4", {class: "title"}, "Send Data"),
    		m("div", {class: "row"}, [
                m("input", {
                    class: "six columns",
                    type: "text",
                    placeholder: "Data",
                    name: "data",
                    oninput: m.withAttr("value", this.setData.bind(this)),
                    value: this.data
                })
            ]),
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