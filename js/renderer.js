const m = require('mithril')
global.filesystem = require('./partial/filesystem.js')
global.chain = require('./partial/chain.js')

global.dataTypes = [ // Names of data types which are displayed to user.
    "Name",
    "Phone number"
]

global.dataTypesFields = [ // Fields of data types which are displayed to user.
    m("div", [
        m("label", "First name"),
        m("div", {class: "row"}, [
            m("input", {
                type: "text",
                name: "first",
                placeholder: "First name",
                oninput: m.withAttr("value", function (val) {
                    data.setData(0, val)
                })
            })
        ]),
        m("label", "Last name"),
        m("div", {class: "row"}, [
            m("input", {
                type: "text",
                name: "last",
                placeholder: "Last name",
                oninput: m.withAttr("value", function (val) {
                    data.setData(1, val)
                })
            })
        ])
    ]),

    m("div", [
        m("label", "Phone number"),
        m("div", {class: "row"}, [
            m("input", {
                type: "tel",
                name: "number",
                placeholder: "Phone number",
                oninput: m.withAttr("value", function (val) {
                    data.setData(0, val)
                })
            })
        ])
    ])
]

global.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
global.usernameRegex = /^[a-z](?:[a-z\d]|-(?=[a-z\d])){2,38}$/
global.passwordRegex = /^[a-zA-Z]\w{3,29}$/

const RegisterComponent = require('./pages/register.js')
const LoginComponent = require('./pages/login.js')
const ForgotPasswordComponent = require('./pages/forgot-password.js')
const TwoFactorComponent = require('./pages/two-factor.js')
const WalletComponent = require('./pages/wallet.js')
const UserDataComponent = require('./pages/user-data.js')
const NewDataComponent = require('./pages/new-data.js')
const ReceivedDataComponent = require('./pages/received-data.js')
const SendDataComponent = require('./pages/send-data.js')
const ContactsComponent = require('./pages/contacts.js')
const SendRequestComponent = require('./pages/send-request.js')
const TransactionsComponent = require('./pages/transactions.js')

m.route(root, "/login", {
    "/register": RegisterComponent,
    "/login": LoginComponent,
    "/forgot-password": ForgotPasswordComponent,
    "/two-factor": TwoFactorComponent,
    "/wallet": WalletComponent,
    "/user-data": UserDataComponent,
    "/new-data": NewDataComponent,
    "/received-data": ReceivedDataComponent,
    "/send-data": SendDataComponent,
    "/contacts": ContactsComponent,
    "/send-request": SendRequestComponent,
    "/transactions": TransactionsComponent
})