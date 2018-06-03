const m = require('mithril')
const SHA256 = require("crypto-js/sha256")

const dataTypes = global.dataTypes

function search(dataTypeId, value, minAttestationsNumber) {
	var allData = global.filesystem.data.receivedData

    return Promise.all(allData.map(function (val) {
        return global.chain.retrieveData(SHA256(val.dataName).toString(), val.address).then(function (result) {
            val.attestationsNumber = parseInt(result.data.split("\n")[1])
            return val
        })
    })).then(function (all) {
        return all.filter(function (val) {
            return (dataTypeId === val.dataType) && (val.dataName.toLowerCase().indexOf(value.toLowerCase()) !== -1)
            && (val.attestationsNumber >= minAttestationsNumber)
        })
    })
}

module.exports = {
	dataToShow: [],
	selectedDataType: 0,
	searchFor: "",
    minAttestationsNumber: 0,
	setDataType: function (id) {
        this.selectedDataType = id
    },
	setSearchFor: function (searchFor) {
		this.searchFor = searchFor
	},
    setMinAttestationsNumber: function (min) {
        this.minAttestationsNumber = min
    },
	search: function () {
    	search(this.selectedDataType, this.searchFor, this.minAttestationsNumber).then(function (result) {
            this.dataToShow = result
            m.redraw()
        }.bind(this))
    },
	view: function () {
    	return m("div", [
    		m("h4", {class: "title"}, "Received data"),
    		m("div", {class: "row"}, [
                m("input", {
                    class: "six columns",
                    type: "search",
                    placeholder: "Search",
                    name: "search",
                    oninput: m.withAttr("value", this.setSearchFor.bind(this)),
                    value: this.searchFor
                }),
                m("button", {
                    class: "small-btn",
                    style: "margin-left: 130px;",
                    onclick: this.search.bind(this)
                }, "Search")
            ]),
            m("div", {class: "row"}, [
                m("input", {
                    type: "number",
                    name: "numberOfAttestations",
                    placeholder: "How much attestations",
                    oninput: m.withAttr("value", this.setMinAttestationsNumber.bind(this)),
                    value: this.minAttestationsNumber
                })
            ]),
            m("div", {class: "row"}, [
                m("div", {class: "six columns"}, [
                    m("select", {
                        id: "dataType",
                        class: "u-full-width",
                        onchange: m.withAttr("selectedIndex", this.setDataType.bind(this)),
                    }, dataTypes.map(function(val, id) {
                        return m(id === this.selectedDataType ? "option[selected]" : "option", {
                            value: id
                        }, val)
                    }))
                ])
            ]),
			m("ul", [
                this.dataToShow.map(function(val, id) {
                    return m("li", {class: "spoiler"}, [
                            m("label", {
                                class: "spoiler",
                                for: id
                            }, [
                                m("input", {
                                    type: "checkbox",
                                    id: id
                                }),
                                m("span", {class: "spoiler-icon"}),
                                m("pre[class=\"spoiler-data\"]", val.data + "\nNumber of attestations: " + val.attestationsNumber)
                            ], val.dataName)
                    ])
                })
            ]),
            m("div", {class: "back"}, [
                m("a", {href: "#!/wallet"}, "Back to wallet")
            ])
    	])
    }
}