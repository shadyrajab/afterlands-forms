import { 
    ActionRowBuilder,
    ApplicationCommandOptionType, 
    ButtonBuilder, 
    ButtonStyle, 
    ChannelType, 
    Client, 
    ColorResolvable, 
    CommandInteraction, 
    EmbedBuilder 
} from "discord.js";
import { Command, CommandData } from "@interfaces"
import { config } from "@config"

export const setupCommandData: Partial<CommandData> = {
    name: 'setup',
    description: "Seta a embed principal para a criação de formulários",
    permissions: ["Administrator"],
    options: [{
        name: "channel",
        description: "Escolhe qual canal enviar a Embed",
        required: true,
        type: ApplicationCommandOptionType.Channel
    }],
}

export const setup = async (client: Client): Promise<Command> => {
    const commandData: CommandData = {
        client,
        ...setupCommandData,
        
        execute: async (interaction: CommandInteraction) => {
            const { channel: interactionChannel, guild, user } = interaction

            if (user.id !== guild?.ownerId) return;

            const { defaultColor } = config
            const embed = new EmbedBuilder()
                .setColor(defaultColor as ColorResolvable)
                .addFields([
                    {
                        name: "📝 Criar Formulário",
                        value: "Clique no botão abaixo para criar um formulário",
                        inline: true
                    }
                ])

            if (!interactionChannel?.isSendable()) return;

            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId('create_form')
                    .setLabel('Criar Formulário')
                    .setStyle(ButtonStyle.Primary)
            );

            const category = await guild?.channels.create({
                name: 'Temporary Channels',
                type: ChannelType.GuildCategory,
                reason: "Setup Afterlands Forms system",
            });

            const forum = await guild?.channels.create({
                name: 'Formulários',
                type: ChannelType.GuildForum,
                parent: category,
                reason: "Setup Afterlands Forms system",
            });

            forum?.threads.create({
                name: 'Formulários',
                reason: "Setup Afterlands Forms system",
                message: { content: 'Formulários' }
            });

            await interactionChannel.send({embeds: [embed], components: [row]})
        }       
    }

    return new Command(commandData)
}