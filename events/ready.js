const { Client } = require("discord.js")

module.exports = {
	once: false,

	/**
	 * @param {Client} client
	 */
	async run(client) {
		console.log(`Connected to ${client.user.tag}`)

		const slashCommandData = client.commands.map(v => v.slash)

		client.guilds.cache.get("1006116453214335046").commands.set(slashCommandData)
		// client.application.commands.set(slashCommandData)
	}
}