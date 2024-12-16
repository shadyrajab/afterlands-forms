import { createFormsEmbed, createFormsEmbedCommandData } from "@commands"

export const interactions = {
    "createFormsEmbed": {
        execute: createFormsEmbed,
        commandData: createFormsEmbedCommandData
    }
}