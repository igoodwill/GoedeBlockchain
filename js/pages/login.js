const m = require('mithril')

const PASSWORD_PLACEHOLDER = "********"

function isTwoFactorEnabled() {
    return true // Change it! True should be returned if the user have enabled two factor auth, else - false.
}

module.exports = {
	username: "",
    password: "",
    setUsername: function (name) {
        this.username = name
    },
    setPassword: function (pwd) {
        this.password = pwd
    },
    login: function () {
    	var message = "Ok" // Call here a method that authorizes the user.
            // It should return "Ok", if the user is authorized or two factor auth is enabled (and username-password combination is correct).
        	// If any error occurred, return the message about this error (note that it will be shown to the user).

        if (message.toLowerCase() === "ok") {
            if (isTwoFactorEnabled())
                m.route.set("/two-factor")
            else
                m.route.set("/wallet")
        } else {
            alert(message)
        }
    },
    register: function () {
        m.route.set("/register")
    },
    view: function () {
        return m("div", [
            m("h4", {class: "title"}, "Login"),
            m("hr"),
            m("b", "Username"),
            m("br"),
            m("input", {
                type: "text",
                name: "name",
                placeholder: "E-mail / username",
                oninput: m.withAttr("value", this.setUsername.bind(this)),
                value: this.username
            }),
            m("br"),
            m("b", "Password"),
            m("br"),
            m("input", {
                type: "password",
                name: "pwd",
                placeholder: PASSWORD_PLACEHOLDER,
                oninput: m.withAttr("value", this.setPassword.bind(this)),
                value: this.password
            }),
            m("br"),
            m("button", {
            	class: "button-primary",
            	onclick: this.login.bind(this)
            }, "Login"),
            m("br"),
            m("div", {class: "row"}, [
                m("a", {href: "#!/forgot-password"}, "Forgot your password?")
            ]),
            m("hr"),
            m("b", "New user?"),
            m("br"),
            m("button", {
            	class: "button-primary",
            	onclick: this.register
            }, "Register")
        ])
    }
}