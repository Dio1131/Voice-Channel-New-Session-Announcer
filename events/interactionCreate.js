const { Client, Interaction, ChatInputCommandInteraction } = require("discord.js")

/**
 * @param {Client} client
 * @param {ChatInputCommandInteraction} interaction
 */
async function slashCommandHandler(client, interaction) {
	const command = client.commands.get(interaction.commandName)

	command.run(client, interaction)
}

module.exports = {
	once: false,

	/**
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	async run(client, interaction) {
		if (interaction.isChatInputCommand()) slashCommandHandler(client, interaction)
	}
}