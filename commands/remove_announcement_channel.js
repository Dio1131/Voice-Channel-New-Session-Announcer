const { SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction } = require("discord.js")
const { errorEmbed, writeJSON, successEmbed, readJSON } = require("../functions")

module.exports = {
	slash: new SlashCommandBuilder()
		.setName("remove_announcement_channel")
		.setDescription("Removes the announcement channel data")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	/**
	 * @param {Client} client
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async run(client, interaction) {
		const data = readJSON("./data/guild.json")[interaction.guild.id]

		if (!data?.announcement_channel) {
			const embed = errorEmbed()
				.setDescription("This server doesn't have an announcement channel setup.")

			return interaction.reply({ embeds: [embed], ephemeral: true })
		}

		writeJSON("./data/guild.json", interaction.guild.id, null, "delete file[dataPath].announcement_channel")

		const embed = successEmbed()
			.setDescription(`Successfully removed the VC announcement channel data.\nThe VC announcement channel was previously <#${data.announcement_channel}>.`)

		interaction.reply({ embeds: [embed] })
	}
}