import { ApplicationCommandDataResolvable, Client } from "discord.js";
import { interactionCreate } from '@events'
import { config, interactions } from "@config"

const client = new Client({
    intents: ["GuildMessages"]
});

interactionCreate(client, interactions)

const commands = Object.values(interactions).map(
    interaction => interaction.commandData
) as ApplicationCommandDataResolvable[]

client.on("ready", client => {
    console.log(`Logged in as ${client.user?.tag}`);
    client.application.commands.set(commands);
})

client.login(config.botToken);