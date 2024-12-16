import { createFormsEmbed, createFormsEmbedCommandData } from "@commands"

export const interactions = {
    "setup": {
        getCommand: createFormsEmbed,
        commandData: createFormsEmbedCommandData
    }
}