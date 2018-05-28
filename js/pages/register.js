const m = require('mithril')

const PASSWORD_PLACEHOLDER = "********"

module.exports = {
    email: "",
    username: "",
    password: "",
    setEmail: function (email) {
        this.email = email
    },
    setUsername: function (name) {
        this.username = name
    },
    setPassword: function (pwd) {
        this.password = pwd
    },
    register: function () {
        var message = filesystem.register(this.email, this.username, this.password) // Call here a method that registers and authorizes the user.
            // It should return "Ok", if the user is authorized.
        	// If any error occurred, return the message about this error (note that it will be shown to the user).

        if (message.toLowerCase() === "ok") {
            m.route.set("/wallet")
        } else {
            alert(message)
        }
    },
    login: function () {
        m.route.set("/login")
    },
    view: function () {
        return m("div[class=\"center\"]", [
            m("h4", {class: "title"}, "Registration"),
            m("hr"),
            m("label", "Email"),
            m("div", {class: "row"}, [
                m("input", {
                    type: "email",
                    name: "email",
                    placeholder: "Email",
                    oninput: m.withAttr("value", this.setEmail.bind(this)),
                    value: this.email
                })
            ]),
            m("label", "Username"),
            m("div", {class: "row"}, [
                m("input", {
                    type: "text",
                    name: "name",
                    placeholder: "Username",
                    oninput: m.withAttr("value", this.setUsername.bind(this)),
                    value: this.username
                })
            ]),
            m("label", "Password"),
            m("div", {class: "row"}, [
                m("input", {
                    type: "password",
                    name: "pwd",
                    placeholder: PASSWORD_PLACEHOLDER,
                    oninput: m.withAttr("value", this.setPassword.bind(this)),
                    value: this.password
                })
            ]),
            m("div", {class: "row"}, [
                m("button", {
                	onclick: this.register.bind(this)
                }, "Register")
            ]),
            m("hr"),
            m("label", "Already registered?"),
                m("div", {class: "row"}, [
                m("button", {
                	onclick: this.login.bind(this)
                }, "Login")
            ])
        ])
    }
}