import { ApplicationCommandOptionType, Client, CommandInteraction, PermissionResolvable } from "discord.js";

export type CommandOptions = {
    name: string
    description: string,
    required: boolean,
    type: ApplicationCommandOptionType
}
export interface CommandData {
    client?: Client;
    name?: string;
    description?: string;
    permissions?: PermissionResolvable[]
    direct?: boolean;
    options?: CommandOptions[];
    execute: (interaction: CommandInteraction) => void;
}

export class Command {
    constructor(private commandData: CommandData) {}

    async execute(interaction: CommandInteraction) {
        this.commandData.execute(interaction)
    };
}

export interface CommandMapping {
    getCommand: Command,
    commandData: CommandData
}