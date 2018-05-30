const m = require('mithril')
const p2p = require('../partial/p2p.js')

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
        if (!this.email) {
            alert("Input e-mail, please!")
            return
        }

        if (!global.emailRegex.test(this.email)) {
            alert("Wrong e-mail format!")
            return
        }

        if (!this.username) {
            alert("Input username, please!")
            return
        }

        if (!global.usernameRegex.test(this.username)) {
            alert("Wrong e-mail format!")
            return
        }

        if (!this.password) {
            alert("Input password, please!")
            return
        }

        if (!global.passwordRegex.test(this.password)) {
            alert("Wrong password format!")
            return
        }

        var message = filesystem.register(this.email, this.username, this.password) // Call here a method that registers and authorizes the user.
            // It should return "Ok", if the user is authorized.
        	// If any error occurred, return the message about this error (note that it will be shown to the user).

        if (message.toLowerCase() === "ok") {
            global.chain.loadKeyFromSeed(global.filesystem.seed)
            global.peer = p2p.createPeer(global.chain.address);
            global.peer.on('connection', p2p.getData);

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