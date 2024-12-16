import { 
    ActionRowBuilder,
    ApplicationCommandOptionType, 
    ButtonBuilder, 
    ButtonStyle, 
    Client, 
    ColorResolvable, 
    CommandInteraction, 
    EmbedBuilder 
} from "discord.js";
import { Command, CommandData } from "@interfaces"
import { config } from "@config"

export const createFormsEmbedCommandData: Partial<CommandData> = {
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

export const createFormsEmbed = async (client: Client): Promise<Command> => {
    const commandData: CommandData = {
        client,
        ...createFormsEmbedCommandData,
        
        execute: async (interaction: CommandInteraction) => {
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

            if (!interaction.channel?.isSendable()) return;

            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId('create_form')
                    .setLabel('Criar Formulário')
                    .setStyle(ButtonStyle.Primary)
            );

            await interaction.channel.send({embeds: [embed], components: [row]})
        }       
    }

    return new Command(commandData)
}