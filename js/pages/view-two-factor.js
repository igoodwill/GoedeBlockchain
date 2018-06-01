const m = require('mithril')

module.exports = {
    view: function () {
        return m("div", [
            m("h4", {class: "title"}, "Two-Factor authentication"),
            m("hr"),
            m("pre", [
                "1. Download and open \"Google Authenticator\" on your mobile device, and log in.\n" +
                "2. Press ",
                m("img", {
                    src: "./assets/plus-icon.png",
                    width: "25px"
                }),
                " at the bottom right corner.\n" +
                "3. Choose the \"Scan a barcode\" option and scan the barcode:"
            ]),
            m("div", {class: "row"}, [
                m("img", {src: global.filesystem.otp.qr})
            ]),
            m("pre", [
                "... or choose the \"Enter provided key\" option and input the key:\n",
                m("b", global.filesystem.otp.secret.ascii),
                "\n4. Use the code from the application to log into your Goede Blockchain account."
            ]),
            m("div", {class: "back"}, [
                m("a", {href: "#!/wallet"}, "Back to wallet")
            ])
        ])
    }
}