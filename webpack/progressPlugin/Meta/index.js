const fs = require("fs")
const path = require("path")

class Meta {
	// metaTxt = ""
	// genTxt
	genTxt() {
		const metas = {}
		const paths = this.genFiles()
		for (let i = 0; i < paths.length; i++) {
			let count = 0
			let dataObj = {}
			let data = fs.readFileSync(paths[i], "utf-8")
			let startIndex = data.indexOf("export default")
			let endIndex = data.indexOf("</script>")
			if (startIndex === -1) continue
			// 截取export default 的代码块
			data = data.substring(startIndex + 14, endIndex)
			// 截取掉以 { 之前的文本
			data = data.substring(data.indexOf("{"))
			// 删除注释行
			data = data.replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, "")
			// 删除注释块
			data = data.replace(
				/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g,
				""
			)
			// 删除空格、制表符、换行符【非name和meta的删除对代码没有影响】
			data = data.replace(/[\n|\r|\t|' ']/g, "")
			/* ============================================= */
			for (let j = 0; j < data.length; j++) {
				if (data[j] === "{") count++
				if (data[j] === "}") count--
				if (count === 1) {
					const key = this.sliceKey(data, j)
					const val = this.sliceVal(data, j, key)
					if (j === 0) {
						j = j + key.length + 2 + val.length
					} else if (/\)/.test(key)) {
						j = j + key.length + val.length
					} else {
						j = j + key.length + 1 + val.length
					}
					dataObj[key] = val
				}
				if (count === 0 || j === data.length - 2) break
			}
			try {
				let _path = paths[i].replace("src", "@")
				_path = _path.replace(/\\/g, "/")
				metas[_path] = {
					name: dataObj.name ? eval(dataObj.name) : "",
					meta: dataObj.meta ? eval("(" + dataObj.meta + ")") : {},
				}
			} catch (e) {
				console.log(e)
			}
		}
		return JSON.stringify(metas)
	}
	// genFiles
	genFiles() {
		const recursion = function(arr, p) {
			const stat = fs.statSync(p)
			if (stat.isDirectory()) {
				const dirs = fs.readdirSync(p)
				dirs.forEach((item) => {
					recursion(arr, path.join(p, item))
				})
			} else {
				if (/\.vue$/.test(p) && p.indexOf("components") === -1) {
					arr.push(p)
				}
			}
		}
		const paths = []
		recursion(paths, "./src/views")
		return paths
	}
	// sliceKey
	sliceKey(str, index) {
		// 由于读取的文本内容已经包含了export default 的 { ,所以如果索引为0则加1
		index = index === 0 ? 1 : index
		let _str = str.substring(index)
		let indexColon = _str.indexOf(":")
		let indexBrackets = _str.indexOf(")")
		indexColon = indexColon !== -1 ? indexColon : 999999999
		indexBrackets = indexBrackets !== -1 ? indexBrackets : 999999999
		const _index =
			indexColon < indexBrackets ? indexColon : indexBrackets + 1
		return _str.substring(0, _index)
	}
	// sliceVal
	sliceVal(str, index, key) {
		let count = 0
		str = str.substring(index + key.length)
		// 第一项偏移0，后续非简写函数则偏移2
		if (index === 0) {
			str = str.substring(2)
		} else if (!/^{/.test(str)) {
			str = str.substring(1)
		}
		// 对象
		if (/^\{/.test(str)) {
			for (let i = 0; i < str.length; i++) {
				if (str[i] === "{") count++
				if (str[i] === "}") count--
				if (count === 0) {
					return str.substring(0, i + 1)
				}
			}
		}
		// 数组
		else if (/^\[/.test(str)) {
			for (let i = 0; i < str.length; i++) {
				if (str[i] === "[") count++
				if (str[i] === "]") count--
				if (count === 0) {
					return str.substring(0, i + 1)
				}
			}
		}
		// 字符串
		else if (/^"/.test(str)) {
			return str.substring(0, str.indexOf('",') + 1)
		}
		// 函数
		else if (/^function/.test(str)) {
			// 这个函数的最后一个花括号
		}
		// 变量
		else {
			return str.substring(0, str.indexOf(","))
		}
	}
	// 生成
	gen() {
		const txt = this.genTxt()
		if (txt === this.metaText) return
		this.metaText = txt
		fs.writeFileSync("./src/router/meta.json", txt, "utf-8")
	}
}

module.exports = new Meta()
