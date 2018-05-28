const fs = require('fs')
const bitcore = require("bitcore-lib")
const ECIES = require("bitcore-ecies")
const Mnemonic = require("bitcore-mnemonic")
const PropertiesReader = require('properties-reader');

// Loading properties file
var properties = PropertiesReader('properties.txt');

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
        return fs.existsSync(properties.path().data.file)
    },

    //Loads and decrypts user data using mnemonic
    readData: function(password) {
        if(!this.filesExist || this.seed == "")
            return false;

        var value = new Buffer(this.seed)
        var hash = bitcore.crypto.Hash.sha256(value)
        var bn = bitcore.crypto.BN.fromBuffer(hash)
        var key = new bitcore.PrivateKey(bn)

        var buf = Buffer.from(fs.readFileSync(properties.path().data.file).toString(), 'hex')
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
        fs.writeFileSync(properties.path().data.file, buf.toString('hex'))
    },

    //Tries to load user data using password
    unlock: function(email, password) {
        this.seed = email + password

        if(this.filesExist()) {
            this.readData(password)
            if(this.data.email != email && this.data.name != email) {
                return "Wrong credentials provided"
            }
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
        fs.writeFileSync(properties.path().email.file, buf.toString('hex'))
    },

    decryptEmail: function(username) {
        var value = new Buffer(username)
        var hash = bitcore.crypto.Hash.sha256(value)
        var bn = bitcore.crypto.BN.fromBuffer(hash)
        var key = new bitcore.PrivateKey(bn)

        var buf = Buffer.from(fs.readFileSync(properties.path().email.file).toString(), 'hex')
        var decryptor = ECIES().privateKey(key)
        var decrypted = decryptor.decrypt(buf).toString()

        return decrypted;
    },

    //Creates files with default data for given credentials
    register: function (email, username, password) {
        this.seed = email + password
        this.setData(this.defaultData)
        this.data.email = email
        this.data.name = username
        this.writeData()

        this.encryptMail(username + password, email)

        return "ok"
    }
}

module.exports = filesystem
