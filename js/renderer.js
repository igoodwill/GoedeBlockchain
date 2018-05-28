const m = require('mithril')
global.filesystem = require('./partial/filesystem.js')
global.chain = require('./partial/chain.js')

global.dataTypes = [ // Names of data types which are displayed to user.
    "Name",
    "Phone number"
]

global.dataTypesFields = [ // Fields of data types which are displayed to user.
    m("div", [
        m("b", "First name"),
        m("br"),
        m("input", {
            type: "text",
            name: "first",
            placeholder: "First name",
            oninput: m.withAttr("value", function (val) {
                data.setData(0, val)
            })
        }),
        m("br"),
        m("b", "Last name"),
        m("br"),
        m("input", {
            type: "text",
            name: "last",
            placeholder: "Last name",
            oninput: m.withAttr("value", function (val) {
                data.setData(1, val)
            })
        })
    ]),

    m("div", [
        m("b", "Phone number"),
        m("br"),
        m("input", {
            type: "tel",
            name: "number",
            placeholder: "Phone number",
            oninput: m.withAttr("value", function (val) {
                data.setData(0, val)
            })
        })
    ])
]

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