const m = require('mithril')

module.exports = {
	code: "",
	setCode: function (code) {
        this.code = code
    },
    login: function () {
    	var message = "Ok" // Call here a method that authorizes the user.
            // It should return "Ok", if the user is authorized.
        	// If any error occurred, return the message about this error (note that it will be shown to the user).

        if (message.toLowerCase() === "ok") {
            m.route.set("/wallet")
        } else {
            alert(message)
        }
    },
	view: function () {
    	return m("div[class=\"center\"]", [
    		m("h4", {class: "title"}, "Login"),
            m("hr"),
            m("label", "Enter the code below"),
            m("div", {class: "row"}, [
                m("input", {
                    type: "number",
                    name: "code",
                    placeholder: "Code",
                    oninput: m.withAttr("value", this.setCode.bind(this)),
                    value: this.code
                })
            ]),
            m("div", {class: "row"}, [
                m("button", {
                    onclick: this.login.bind(this)
                }, "Login")
            ]),
            m("hr"),
            m("div", {class: "row"}, [
                m("a", {href: "#!/login"}, "Back")
            ])
    	])
	}
}