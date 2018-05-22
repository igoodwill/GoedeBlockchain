const m = require('mithril')

const RegisterComponent = require('./pages/register.js')
const LoginComponent = require('./pages/login.js')
const ForgotPasswordComponent = require('./pages/forgot-password.js')
const TwoFactorComponent = require('./pages/two-factor.js')
const WalletComponent = require('./pages/wallet.js')

m.route(root, "/login", {
    "/register": RegisterComponent,
    "/login": LoginComponent,
    "/forgot-password": ForgotPasswordComponent,
    "/two-factor": TwoFactorComponent,
    "/wallet": WalletComponent
})