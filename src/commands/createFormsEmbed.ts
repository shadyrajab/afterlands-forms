import { 
    ApplicationCommandOptionType, 
    Client, 
    ColorResolvable, 
    CommandInteraction, 
    EmbedBuilder 
} from "discord.js";
import { Command, CommandData } from "@interfaces"
import { config } from "@config"

export const createFormsEmbedCommandData: CommandData = {
    name: "createFormsEmbed",
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

            await interaction.channel.send({embeds: [embed]})
        }       
    }

    return new Command(commandData)
}