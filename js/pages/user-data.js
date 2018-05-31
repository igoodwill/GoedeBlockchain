const m = require('mithril')

const dataTypes = global.dataTypes

function search(dataTypeId, value) {
    var allData = global.filesystem.data.userData

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
                this.dataToShow.map(function(val, id) {
                    return m("li", [
                            m("label", {
                                class: "spoiler",
                                for: id
                            }, [
                                m("input", {
                                    type: "checkbox",
                                    id: id
                                }),
                                m("span", {class: "spoiler-icon"}),
                                m("pre[class=\"spoiler-data\"]", val.data)
                            ], val.dataName)
                    ])
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