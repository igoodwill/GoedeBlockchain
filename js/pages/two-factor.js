const m = require('mithril')
const p2p = require('../partial/p2p.js')

module.exports = {
	code: "",
	setCode: function (code) {
        this.code = code
    },
    login: function () {
        if (!this.code) {
            alert("Input code, please!")
            return
        }

        if (!/^\d{6}$/.test(this.code)) {
            alert("Wrong code format!")
            return
        }

    	var message = global.filesystem.checkOtpCode(this.code) // Call here a method that authorizes the user.
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
	view: function () {
    	return m("div[class=\"center\"]", [
    		m("h4", {class: "title"}, "Login"),
            m("hr"),
            m("label", "Enter the code below"),
            m("div", {class: "row"}, [
                m("input", {
                    type: "text",
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