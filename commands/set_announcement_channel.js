const { SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction } = require("discord.js")
const { errorEmbed, writeJSON, successEmbed, readJSON } = require("../functions")

module.exports = {
	slash: new SlashCommandBuilder()
		.setName("set_announcement_channel")
		.setDescription("Sets the VC announcement channel to #channel")
		.addChannelOption(channel =>
			channel
				.setName("channel")
				.setDescription("The channel to announce new VC sessions in")
				.setRequired(true)
		)
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	/**
	 * @param {Client} client
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async run(client, interaction) {
		const channel = interaction.options.getChannel("channel", true)

		const missingPermissions = []

		const channelPerms = channel.permissionsFor(interaction.guild.members.me)

		if (!channelPerms.has(PermissionFlagsBits.ViewChannel)) missingPermissions.push("View Channel")
		if (!channelPerms.has(PermissionFlagsBits.SendMessages)) missingPermissions.push("Send Messages")
		if (!channelPerms.has(PermissionFlagsBits.MentionEveryone)) missingPermissions.push("Mention @everyone")

		if (missingPermissions.length > 0) {
			const embed = errorEmbed()
				.setDescription(`The bot is missing the following permissions for ${channel}: ${missingPermissions.map(v => `\`${v}\``).join(", ")}`)

			return interaction.reply({ embeds: [embed], ephemeral: true })
		}

		// could probably be better but this works for the time being
		if (!readJSON("./data/guild.json")[interaction.guild.id]) writeJSON("./data/guild.json", interaction.guild.id, {}, "file[dataPath] = data")

		writeJSON("./data/guild.json", interaction.guild.id, channel.id, "file[dataPath].announcement_channel = data")

		const embed = successEmbed()
			.setDescription(`Successfully set the VC announcement channel to ${channel}.`)

		interaction.reply({ embeds: [embed] })
	}
}