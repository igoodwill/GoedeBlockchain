const m = require('mithril')

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