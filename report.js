require("dotenv").config();
const { addAttachment } = require("../../../modules/misc/report_attachment");
const { ContextMenuInteraction, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, TextInputBuilder, ModalBuilder } = require("discord.js");

module.exports = {
    name: "report",
    description: "Bir kullanıcıyı Lost Ark Türkiye personeline bildirin",
    access: '', // kaanshu
    cooldown: 60,
    type: ApplicationCommandType.ChatInput,
    usage: `/report [@username] [reason] (imageURL)`,
    options: [
        {
            name: "proof",
            description: "Raporunuzun kanıtını sağlayın",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;

        const attachment = options.getAttachment('proof')

        addAttachment(1, attachment.url);

        const modal = new ModalBuilder()
            .setTitle('Şikayet Formu')
            .setCustomId('report-modal')

        const input1 = new TextInputBuilder()
            .setCustomId('input1')
            .setLabel('Kullanıcı adı / Kimliği')
            .setStyle(1)
            .setPlaceholder('Kullanıcı adı veya ID (örn: kaanshu#0001')
            .setMinLength(1)
            .setMaxLength(54)
            .setRequired(true)

        const input2 = new TextInputBuilder()
            .setCustomId('input2')
            .setLabel('Reason')
            .setStyle(2)
            .setPlaceholder('Dur bakalım! neyden şikayetçisin?')
            .setMinLength(1)
            .setMaxLength(1024)
            .setRequired(true)

        const row1 = new ActionRowBuilder().addComponents([input1]);
        const row2 = new ActionRowBuilder().addComponents([input2]);

        modal.addComponents(row1, row2);

        await interaction.showModal(modal);
    }
};
