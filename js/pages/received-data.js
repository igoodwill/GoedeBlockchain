const m = require('mithril')

const dataTypes = global.dataTypes

function search(dataTypeId, value) {
	var allData = global.filesystem.data.receivedData

    return allData.filter(function (val) {
        return (dataTypeId === val.dataType) && (val.dataName.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    })
}

module.exports = {
	dataToShow: [],
	selectedDataType: 0,
	searchFor: "",
	setDataType: function (id) {
        this.selectedDataType = id
    },
	setSearchFor: function (searchFor) {
		this.searchFor = searchFor
	},
	search: function () {
    	this.dataToShow = search(this.selectedDataType, this.searchFor)
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
            // TODO Attestation
            m("div", {class: "row"}, [
                m("div", {class: "six columns"}, [
                    m("select", {
                        id: "dataType",
                        class: "u-full-width",
                        onchange: m.withAttr("selectedIndex", this.setDataType.bind(this)),
                    }, dataTypes.map(function(val, id) {
                        return m(id === this.selectedDataType ? "option[selected]" : "option", {
                            value: id
                        }, val.dataName)
                    }))
                ])
            ]),
			m("ul", [
                this.dataToShow.map(function(val) {
                    return m("li", val)
                })
            ]),
            m("div", {class: "back"}, [
                m("a", {href: "#!/wallet"}, "Back to wallet")
            ])
    	])
    }
}