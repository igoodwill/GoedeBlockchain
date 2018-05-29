const m = require('mithril')

function getAllData() {
    var data = [
        {
            dataType: 0,
            value: "Name 1"
        },
        {
            dataType: 0,
            value: "Name 2"
        },
        {
            dataType: 0,
            value: "Name 3"
        },
        {
            dataType: 0,
            value: "Name 4"
        },
        {
            dataType: 0,
            value: "Name 5"
        },
        {
            dataType: 0,
            value: "Name 6"
        },
        {
            dataType: 0,
            value: "Name 7"
        },
        {
            dataType: 0,
            value: "Name 8"
        },
        {
            dataType: 1,
            value: "234523452"
        },
        {
            dataType: 1,
            value: "876781231"
        },
        {
            dataType: 1,
            value: "567624567"
        },
        {
            dataType: 1,
            value: "123871349"
        },
        {
            dataType: 1,
            value: "195173490"
        },
        {
            dataType: 1,
            value: "194759013"
        },
        {
            dataType: 1,
            value: "629305589"
        },
        {
            dataType: 1,
            value: "105882494"
        }
    ] // Call here a method that returns an array of data objects. A data object must have fields: dataType, value!

    return data;
}

const allData = getAllData()
const dataTypes = global.dataTypes

function search(dataTypeId, value) {
	var dataType = dataTypes[dataTypeId]

	return allData.filter(function (val) {
		return (dataTypeId === val.dataType) && (val.value.toLowerCase().indexOf(value.toLowerCase()) !== -1)
	}).map(function (val) {
		return dataType + ": " + val.value
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
    	m.redraw()
    },
    newData: function () {
        m.route.set("/new-data")
    },
	view: function () {
    	return m("div", [
    		m("h4", {class: "title"}, "Your data"),
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
                        }, val)
                    }))
                ])
            ]),
			m("ul", [
                this.dataToShow.map(function(val) {
                    return m("li", val)
                })
            ]),
			m("div", {class: "row"}, [
                m("button", {
                    class: "small-btn",
                	onclick: this.newData.bind(this)
                }, "New data")
            ]),
            m("div", {class: "back"}, [
                m("a", {href: "#!/wallet"}, "Back to wallet")
            ])
    	])
    }
}