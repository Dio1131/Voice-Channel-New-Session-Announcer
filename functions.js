const { EmbedBuilder } = require("discord.js")
const { readFileSync, writeFileSync } = require("fs")

module.exports = {
	readJSON(filePath) {
		const file = readFileSync(filePath, "utf-8")

		const json = JSON.parse(file)

		return json
	},

	// most of this function is practically living on a prayer, we're half way there though
	writeJSON(filePath, dataPath, data, codeToRun = "file[dataPath] = data") {
		const file = module.exports.readJSON(filePath)

		eval(codeToRun)

		const newJSON = JSON.stringify(file, null, "\t")

		writeFileSync(filePath, newJSON)
	},

	/** @returns {EmbedBuilder} */
	successEmbed() {
		return new EmbedBuilder().setColor(resolveColor("57f287"))
	},

	/** @returns {EmbedBuilder} */
	errorEmbed() {
		return new EmbedBuilder().setColor(resolveColor("ed4245"))
	},

	millisecondsToSeconds(milliseconds) {
		return parseInt(milliseconds / 1000)
	}
}
