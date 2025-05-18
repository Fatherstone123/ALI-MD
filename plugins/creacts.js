const { cmd } = require('../command');

cmd({
    pattern: "reactionch",
    alias: ["reactch"],
    react: "❤️", // Default reaction when command is triggered
    desc: "React to a WhatsApp channel message with an emoji",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { text, args, from, reply }) => {
    try {
        if (!text || !args[0]) {
            return reply('Usage:\n.reactch <channel link> <emoji>\nExample:\n.reactch https://whatsapp.com/channel/xxx/yyy ❤️');
        }

        const link = args[0];
        if (!link.startsWith('https://whatsapp.com/channel/')) {
            return reply('Invalid channel link.');
        }

        const parts = link.split('/');
        if (parts.length < 6) {
            return reply('Incomplete link. Please include the full message link.');
        }

        const channelCode = parts[4];
        const messageId = parts[5];

        if (!channelCode || !messageId) {
            return reply('Failed to parse link.');
        }

        // Emoji
        const emoji = text.replace(link, '').trim();
        if (!emoji) {
            return reply('Please provide an emoji after the link.');
        }

        // Get channel metadata
        const metadata = await conn.newsletterMetadata('invite', channelCode);
        await conn.newsletterReactMessage(metadata.id, messageId, emoji);

        return reply(`Successfully reacted with ${emoji} to channel: ${metadata.name}`);
    } catch (err) {
        console.error('Reaction Error:', err);
        return reply('Reaction failed. Check the link and emoji, or try again later.');
    }
});
