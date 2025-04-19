const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const util = require("util");
const { getAnti, setAnti, initializeAntiDeleteSettings } = require('../data/antidel');

initializeAntiDeleteSettings();

cmd({
    pattern: "antidelete",
    alias: ['antidel', 'ad'],
    desc: "Sets up the Antidelete",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply, q, text, isOwner, fromMe }) => {
    if (!isOwner) return reply('*📛 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ᴏɴʟʏ ғᴏʀ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ*');
    try {
        const command = q?.toLowerCase();

        switch (command) {
            case 'off':
                await setAnti('gc', false);
                await setAnti('dm', false);
                return reply('*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ɪs ɴᴏᴡ ᴏғғ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ᴀɴᴅ ᴅɪʀᴇᴄᴛ ᴍᴇssᴀɢᴇs.*');

            case 'off gc':
                await setAnti('gc', false);
                return reply('*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*');

            case 'off dm':
                await setAnti('dm', false);
                return reply('*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ᴅɪʀᴇᴄᴛ ᴍᴇssᴀɢᴇs ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*');

            case 'gc':
                const gcStatus = await getAnti('gc');
                await setAnti('gc', !gcStatus);
                return reply(`*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ${!gcStatus ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪsᴀʙʟᴇᴅ'}.*`);

            case 'dm':
                const dmStatus = await getAnti('dm');
                await setAnti('dm', !dmStatus);
                return reply(`*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ᴅɪʀᴇᴄᴛ ᴍᴇssᴀɢᴇs ${!dmStatus ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪsᴀʙʟᴇᴅ'}.*`);

            case 'on':
                await setAnti('gc', true);
                await setAnti('dm', true);
                return reply('*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴍᴇsɢ sᴇᴛ ғᴏʀ ᴀʟʟ ᴄʜᴀᴛs.*');

            case 'status':
                const currentDmStatus = await getAnti('dm');
                const currentGcStatus = await getAnti('gc');
                return reply(`*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ sᴛᴀᴛᴜs*\n\n*ᴅᴍ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ:* ${currentDmStatus ? '*ᴇɴᴀʙʟᴇᴅ*' : '*ᴅɪsᴀʙʟᴇᴅ*'}\n*ɢʀᴏᴜᴘ ᴄʜᴀᴛ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ:* ${currentGcStatus ? '*ᴇɴᴀʙʟᴇᴅ*' : '*ᴅɪsᴀʙʟᴇᴅ*'}`);

            default:
                const helpMessage = `*╭───━━━━───━━━━──┉┈⚆*\n*│ీ𝐀𝐍𝐓𝐈𝐃𝐄𝐋𝐄𝐓𝐄 𝐂𝐌𝐃 𝐆𝐔𝐈𝐃𝐄ీ*\n*│• ANTIDELETE ON:*\n*│☇ ᴇɴᴀʙʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴀʟʟ ᴄʜᴀᴛs*\n*│• ANTIDELETE OFF:*\n*│☇ ᴅɪsᴀʙʟᴇᴅ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴀʟʟ ᴄʜᴀᴛs*\n*│• ANTIDELETE SET GC:*\n*│☇ ᴛᴏ ᴇɴᴀʙʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ɢᴄ ᴄʜᴀᴛ*\n*│• ANTIDELETE SET DM:*\n*│☇ ᴛᴏ ᴇɴᴀʙʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴅᴍ ᴄʜᴀᴛs*\n*│• ANTIDELETE OFF GC:*\n*│☇ ᴅɪsᴀʙʟᴇᴅ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ɢᴄ ᴄʜᴀᴛs*\n*│• ANTIDELETE OFF DM:*\n*│☇ ᴅɪsᴀʙʟᴇᴅ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ᴘᴍ ᴍᴇsɢ*\n*┗───━━━━───━━━━──┉┈⚆*`;

                return reply(helpMessage);
        }
    } catch (e) {
        console.error("Error in antidelete command:", e);
        return reply("An error occurred while processing your request.");
    }
});


