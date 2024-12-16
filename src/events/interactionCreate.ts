import { Client, Interaction } from "discord.js";

export const interactionCreate = async (client: Client, commands: Object) => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            const { commandName } = interaction;

            const execute = commands[commandName]
            await execute(interaction)        
        };
    })
};
