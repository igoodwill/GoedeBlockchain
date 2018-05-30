const fs = require('fs')
const bitcore = require("bitcore-lib")
const ECIES = require("bitcore-ecies")
const Mnemonic = require("bitcore-mnemonic")
const speakeasy = require('speakeasy')
const QRCode = require('qrcode')

var filesystem = {
    data: undefined,

    setData: function(data) {
        this.data = data
        this.writeData()
    },

    defaultData:  {
        name: "",
        email: ""
    },

    seed: "",

    //Checks the availability of all the files required
    filesExist: function() {
        return fs.existsSync('data.txt')
    },

    //Loads and decrypts user data using mnemonic
    readData: function(password) {
        if(!this.filesExist || this.seed == "")
            return false;

        var value = new Buffer(this.seed)
        var hash = bitcore.crypto.Hash.sha256(value)
        var bn = bitcore.crypto.BN.fromBuffer(hash)
        var key = new bitcore.PrivateKey(bn)

        var buf = Buffer.from(fs.readFileSync('data.txt').toString(), 'hex')
        var decryptor = ECIES().privateKey(key)

        try {
            var decrypted = decryptor.decrypt(buf).toString()
            this.data = JSON.parse(decrypted);
        } catch(e) {
            if(password != "") {
                try {
                    var mail = this.decryptEmail(this.seed)
                    this.seed = mail + password
                    this.readData("")
                    return;
                } catch (e) {

                }
            }

            this.setData(this.defaultData)
            console.log("Couldn't restore data from JSON")
        }
    },

    //Encrypts and loads user data using mnemonic
    writeData: function() {
        var value = new Buffer(this.seed)
        var hash = bitcore.crypto.Hash.sha256(value)
        var bn = bitcore.crypto.BN.fromBuffer(hash)
        var key = new bitcore.PrivateKey(bn)

        var encryptor = ECIES().privateKey(key).publicKey(key.publicKey)
        var buf = encryptor.encrypt(JSON.stringify(this.data));
        fs.writeFileSync('data.txt', buf.toString('hex'))
    },

    //Tries to load user data using password
    unlock: function(email, password) {
        this.seed = email + password

        if(this.filesExist()) {
            this.readData(password)
            if(this.data.email != email && this.data.name != email) {
                return "Wrong credentials provided"
            }

            //Post-login code
            this.initOtp()

            return "ok"
        } else {
            return "Could not decrypt user data"
        }
    },

    encryptMail: function (seed, email) {
        var value = new Buffer(seed)
        var hash = bitcore.crypto.Hash.sha256(value)
        var bn = bitcore.crypto.BN.fromBuffer(hash)
        var key = new bitcore.PrivateKey(bn)

        var encryptor = ECIES().privateKey(key).publicKey(key.publicKey)
        var buf = encryptor.encrypt(email);
        fs.writeFileSync('mail.txt', buf.toString('hex'))
    },

    decryptEmail: function(username) {
        var value = new Buffer(username)
        var hash = bitcore.crypto.Hash.sha256(value)
        var bn = bitcore.crypto.BN.fromBuffer(hash)
        var key = new bitcore.PrivateKey(bn)

        var buf = Buffer.from(fs.readFileSync('mail.txt').toString(), 'hex')
        var decryptor = ECIES().privateKey(key)
        var decrypted = decryptor.decrypt(buf).toString()

        return decrypted;
    },

    initOtp: function() {
        this.otp = {}
        this.otp.secret = this.data.otpsecret
        this.otp.enabled = this.data.otpenabled

        QRCode.toDataURL(this.data.otpsecret.otpauth_url, this.saveQr.bind(this))
    },

    checkOtpCode: function(code) {
        return speakeasy.totp.verify({
            secret: filesystem.otp.secret.base32,
            encoding: 'base32',
            token: code
        })  ? "Ok" : "Wrong TOTP code!"
    },

    saveQr: function(err, data_url) {
        this.otp.qr = data_url
    },

    //Creates files with default data for given credentials
    register: function (email, username, password) {
        this.seed = email + password
        this.setData(this.defaultData)
        this.data.email = email
        this.data.name = username
        this.data.otpsecret = speakeasy.generateSecret()
        this.data.otpenabled = false

        this.initOtp()

        this.writeData()

        this.encryptMail(username + password, email)

        return "ok"
    }
}

module.exports = filesystem
