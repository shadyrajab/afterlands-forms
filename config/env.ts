require('dotenv').config();

export const config = {
    defaultColor: "#96879d",
    botToken: process.env.TOKEN,
    formChannelId: 0,
    masterUserId: process.env.MASTER_USER_ID
}
