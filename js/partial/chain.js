var openchain = require("openchain");
var bitcore = require("bitcore-lib");
var Mnemonic = require("bitcore-mnemonic");

//TODO Implement state system
var chain = {
    client: new openchain.ApiClient(global.blockchainServer),
    state: 0,
    baseKey: "",
    address: "",
    pubAddress: "",
    signer: "",
    dataPath: "",
    derivedKey: "",
    loadKeyFromSeed: function (seed) {
        // Load a private key from a seed
        this.baseKey = bitcore.HDPrivateKey.fromSeed(bitcore.crypto.Hash.sha256(new Buffer(seed)), "openchain");
        this.derivedKey = this.baseKey.derive(44, true).derive(64, true).derive(0, true).derive(0).derive(0);
        this.loadKeyData();
    },
    loadKeyFromMnemonic: function (mnemonic) {
        if(Mnemonic.isValid(mnemonic)) {
            var code = new Mnemonic(mnemonic);
            this.baseKey = new bitcore.HDPrivateKey(code.toHDPrivateKey(null, "livenet").xprivkey);
            this.baseKey.network = bitcore.Networks.get("openchain");
            this.derivedKey = this.baseKey.derive(44, true).derive(64, true).derive(0, true).derive(0).derive(0);
            this.loadKeyData();
            return true;
        }
        return false;
    },
    loadKeyData: function() {
        this.address = this.derivedKey.privateKey.toAddress();
        this.pubAddress = this.derivedKey.publicKey.toAddress();
        // Calculate the accounts corresponding to the private key
        this.dataPath = "/asset/p2pkh/" + this.pubAddress + "/metadata/";

        this.signer = new openchain.MutationSigner(this.derivedKey);
    },
    getAssetKey: function(index) {
        return this.baseKey.derive(44, true).derive(64, true).derive(1, true).derive(0).derive(index);
    },
    storeData: function(key, value) {
        this.client.initialize().then(function() {
            return this.client.getDataRecord(this.dataPath, key)
        }.bind(this)).then(function(dataRecord) {
            console.log(dataRecord)
            var newValue = openchain.encoding.encodeString(value)
            return new openchain.TransactionBuilder(this.client)
            .addSigningKey(this.signer)
            .addRecord(dataRecord.key, newValue, dataRecord.version)
            .submit()
        }.bind(this))
    },
    retrieveData:  function(key, address) {
        var path = "/asset/p2pkh/" + address + "/metadata/";
        return this.client.getDataRecord(path, key)
    }
}

module.exports = chain
