const { Client, VoiceState } = require("discord.js")
const { readJSON, successEmbed, millisecondsToSeconds } = require("../functions")

module.exports = {
	once: false,

	/**
	 * @param {Client} client
	 * @param {VoiceState} oldState
	 * @param {VoiceState} newState
	 */
	async run(client, oldState, newState) {
		const now = Date.now()

		if (!newState.channel) return

		if (newState.channel.members.size === 1) {
			const data = readJSON("./data/guild.json")[newState.guild.id]

			if (!data?.announcement_channel) return

			const channelId = data.announcement_channel

			const channel = await newState.guild.channels.fetch(channelId)

			const embed = successEmbed()
				.setAuthor({ name: `${newState.member.user.tag} - ${newState.member.id}`, iconURL: newState.member.user.displayAvatarURL({ dynamic: true }) })
				.setTitle("New Voice Channel Session")
				.setDescription(`${newState.channel} | <t:${millisecondsToSeconds(now)}:R>`)
				.addFields({ name: "Started By", value: `${newState.member} (${newState.member.user.tag} - ${newState.member.id})` })

			channel.send({ content: "@everyone", embeds: [embed] })
		}
	}
}