const m = require('mithril')
const SHA256 = require("crypto-js/sha256")

var data = {
    data: [],
    setData: function(id, val) {
        this.data[id] = val
    },
    clearData: function() {
        this.data = []
    }
}

const dataTypes = global.dataTypes

module.exports = {
	selectedDataType: 0,
    dataName: "",
	setDataType: function (id) {
        if (id === this.selectedDataType)
            return

        this.selectedDataType = id

        var nodeList = document.getElementsByName('dataTypeField')

        for (var i = 0; i < nodeList.length; i++)
            nodeList[i].value = ""
        
        data.clearData()
    },
    setDataName: function (name) {
        this.dataName = name
    },
    saveData: function () {
        if (!this.dataName) {
            alert("Input data name, please!")
            return
        }

        var nodeList = document.getElementsByName('dataTypeField')

        for (var i = 0; i < nodeList.length; i++)
            if (!nodeList[i].value) {
                alert("Input all data fields, please!")
                return
            }

        global.chain.retrieveData(SHA256(this.dataName).toString(), global.chain.pubAddress).then(function (result) {
            console.log(result.data)
            if(result.data !== null) {
                alert("The data with this data name already exists!")
                return
            }

            var stringData = ""

            for (var i = 0; i < data.data.length - 1; i++)
                stringData += global.dataTypesFieldsNames[this.selectedDataType][i] + ": " + data.data[i] + "\n"
            stringData += global.dataTypesFieldsNames[this.selectedDataType][data.data.length - 1] + ": " + data.data[data.data.length - 1]

            global.filesystem.data.userData[global.filesystem.data.userData.length] = {
                dataName: this.dataName,
                dataType: this.selectedDataType,
                data: stringData
            }

            global.filesystem.writeData()

            global.chain.storeData(SHA256(this.dataName).toString(), SHA256(stringData).toString() + "\n0")

            m.route.set("/user-data")
        }.bind(this))
    },
    cancel: function() {
        m.route.set("/user-data")
    },
	view: function () {
    	return m("div", [
    		m("div", {class: "centered-text"}, [
                m("h4", "New data")
            ]),
            m("div", {class: "left"}, [
                m("select", {
                    id: "dataType",
                    class: "u-full-width",
                    onchange: m.withAttr("selectedIndex", this.setDataType.bind(this)),
                }, dataTypes.map(function(val, id) {
                    return m(id === this.selectedDataType ? "option[selected]" : "option", {
                        value: id
                    }, val)
                }))
            ]),
            m("div", {class: "right"}, [
                m("label", "Data name"),
                m("div", {class: "row"}, [
                    m("input", {
                        type: "text",
                        name: "dataName",
                        placeholder: "Data name",
                        oninput: m.withAttr("value", this.setDataName.bind(this))
                    })
                ]),
                global.dataTypesFieldsNames[this.selectedDataType].map(function (value, id) {
                    return [
                        m("label", value),
                        m("div", {class: "row"}, [
                            m("input", {
                                type: "text",
                                name: "dataTypeField",
                                placeholder: value,
                                oninput: m.withAttr("value", function (val) {
                                    data.setData(id, val)
                                })
                            })
                        ])
                    ]
                }),
                m("div", {class: "row"}, [
                    m("button", {
                        style: "margin-right: 10px;",
                        onclick: this.saveData.bind(this)
                    }, "Save"),
                    m("button", {
                        onclick: this.cancel.bind(this)
                    }, "Cancel")
                ])
            ])
    	])
    }
}