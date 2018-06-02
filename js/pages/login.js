const {dialog} = require('electron').remote
const m = require('mithril')
const p2p = require('../partial/p2p.js')

const PASSWORD_PLACEHOLDER = "********"

function isTwoFactorEnabled() {
    return true // Change it! True should be returned if the user have enabled two factor auth, else - false.
}

function requestFolderPath() {
    return dialog.showOpenDialog({
        message: "Choose the account folder, please!",
        properties: ['openDirectory', 'showHiddenFiles']
    })
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
        if (!this.username) {
            alert("Input e-mail / username, please!")
            return
        }

        if (!(global.emailRegex.test(this.username) || global.usernameRegex.test(this.username))) {
            alert("Wrong e-mail / username format!")
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

        global.filesystem.folderPath = requestFolderPath()

        if (!global.filesystem.folderPath) {
            alert("The account folder has to be choosen!")
            return
        }

    	var message = filesystem.unlock(this.username, this.password)
            // Call here a method that authorizes the user.
            // It should return "Ok", if the user is authorized or two factor auth is enabled (and username-password combination is correct).
        	// If any error occurred, return the message about this error (note that it will be shown to the user).

        if (message.toLowerCase() === "ok") {
            if (global.filesystem.otp.enabled)
                m.route.set("/two-factor")
            else {
                global.peer = p2p.createPeer(global.chain.address);
                global.peer.on('connection', p2p.getData);

                m.route.set("/wallet")
            }
        } else {
            alert(message)
        }
    },
    register: function () {
        m.route.set("/register")
    },
    view: function () {
        return m("div[class=\"center\"]", [
            m("h4", {class: "title"}, "Login"),
            m("hr"),
            m("label", "Username"),
            m("div", {class: "row"}, [
                m("input", {
                    type: "text",
                    name: "name",
                    placeholder: "E-mail / username",
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
                	onclick: this.login.bind(this)
                }, "Login")
            ]),
            m("div", {class: "row"}, [
                m("a", {href: "#!/forgot-password"}, "Forgot your password?")
            ]),
            m("hr"),
            m("label", "New user?"),
            m("div", {class: "row"}, [
                m("button", {
                	onclick: this.register
                }, "Register")
            ])
        ])
    }
}