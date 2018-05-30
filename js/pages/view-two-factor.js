const m = require('mithril')

module.exports = {
    view: function () {
        return m("div", [
            m("h4", {class: "title"}, "Two-Factor authentication data"),
            m("hr"),
            m("div", {class: "row"}, [
                m("img", {src: global.filesystem.otp.qr})
            ]),
            m("p", global.filesystem.otp.secret.ascii)
        ])
    }
}