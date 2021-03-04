const fs = require("fs")
const path = require("path")
class Doc {
	//   apisText = "";
	//   viewsText = "";
	//   componentsText = "";
	// genName
	genName(p) {
		let _p = p.replace(/\\/g, "/")
		let lastIndex = _p.lastIndexOf("/")
		let name = _p.substring(lastIndex + 1)
		if (p.indexOf("mock" !== -1)) {
			return name.replace(".js", "")
		}
		return name.replace(".vue", "")
	}
	// getInfo
	getInfo(p) {
		let data = fs.readFileSync(p, "utf-8")
		if (p.indexOf("mock") !== -1) return data
		let startIndex = data.indexOf("<script>")
		let endIndex = data.indexOf("export default")
		if (startIndex === -1) return []
		data = data.substring(startIndex + 8, endIndex)
		// 获取块注释
		const descs = data.match(
			/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g
		)
		return descs || []
	}
	// genFiles
	genFiles() {
		const _self = this
		const recursion = function(p) {
			const stat = fs.statSync(p)
			if (stat.isDirectory()) {
				let dirs = fs.readdirSync(p)
				if (p.indexOf("mock") === -1) {
					dirs = dirs.filter((item) => !/\.js$/.test(item))
				}
				dirs = dirs.filter((item) => item.indexOf(".DS_Store") === -1)
				dirs = dirs.map((item) => {
					let _path = path.join(p, item)
					return {
						path: _path,
						label: _self.genName(_path),
					}
				})
				dirs.forEach((item) => {
					const stat = fs.statSync(item.path)
					if (stat.isDirectory()) {
						item.dir = true
						item.component = false
						item.children = recursion(item.path)
					} else {
						item.children = []
						item.desc = _self.getInfo(item.path)
						item.component = item.path.indexOf("components") !== -1
					}
				})
				return dirs
			} else {
				if (p.indexOf("mock") !== -1 || /\.vue$/.test(p)) {
					return {
						path: p,
						desc: _self.getInfo(p),
						label: _self.genName(p),
						component: p.indexOf("components") !== -1,
					}
				}
			}
		}
		const apis = recursion("./mock")
		const views = recursion("./src/views")
		const components = recursion("./src/components")
		return { apis, views, components }
	}
	// 生成
	gen() {
		const { apis, views, components } = this.genFiles()
		const apisText = JSON.stringify(apis)
		const viewsText = JSON.stringify(views)
		const componentsText = JSON.stringify(components)
		try {
			fs.mkdirSync("./docs")
			// eslint-disable-next-line no-empty
		} catch (e) {}
		if (this.apisText !== apisText) {
			this.apisText = apisText
			fs.writeFileSync("./docs/apis.json", apisText, "utf-8")
		}
		if (this.viewsText !== viewsText) {
			this.viewsText = viewsText
			fs.writeFileSync("./docs/view.json", viewsText, "utf-8")
		}
		if (this.componentsText !== componentsText) {
			this.componentsText = componentsText
			fs.writeFileSync("./docs/components.json", componentsText, "utf-8")
		}
	}
}
module.exports = new Doc()
