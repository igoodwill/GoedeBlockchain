const m = require('mithril')

module.exports = {
	username: "",
	setUsername: function (name) {
        this.username = name
    },
    requestPassword: function () {
    	var message = "Ok" // Call here a method that requests the password.
            // It should return "Ok", if the password is requested.
        	// If any error occurred, return the message about this error (note that it will be shown to the user).

        if (message.toLowerCase() === "ok") {
            alert("We sent the password on your e-mail." /* Change it! */)
        } else {
            alert(message)
        }
    },
	view: function () {
    	return m("div[class=\"center\"]", [
    		m("h4", {class: "title"}, "Password Request"),
            m("label", "Username"),
            m("div", {class: "row"}, [
                m("input", {
                    type: "text",
                    name: "code",
                    placeholder: "E-mail / username",
                    oninput: m.withAttr("value", this.setUsername.bind(this)),
                    value: this.username
                })
            ]),
            m("div", {class: "row"}, [
                m("button", {
                    onclick: this.requestPassword.bind(this)
                }, "Request")
            ]),
            m("hr"),
            m("div", {class: "row"}, [
                m("a", {href: "#!/login"}, "Back")
            ])
    	])
	}
}