import { Command } from "@interfaces";
import { Client, Interaction } from "discord.js";

export const interactionCreate = async (client: Client, interactions: Object) => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            const { commandName } = interaction;
            const interactionCommand = interactions[commandName]

            if (!interactionCommand) return;

            const command = await interactionCommand.getCommand(client) as Command
            await command.execute(interaction)        
        };
    })
};
