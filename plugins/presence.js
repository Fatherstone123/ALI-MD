const fs = require('fs');
const path = require('path');
const config = require('../config')
const {cmd , commands} = require('../command')


//auto recording

cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {       
 if (config.AUTO_RECORDING === 'true') {
                await conn.sendPresenceUpdate('recording', from);
            }
         } 
   );

//auto_voice

cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../data/autovoice.json');

    // File existence & JSON error handle karein
    if (!fs.existsSync(filePath) || fs.readFileSync(filePath, "utf8").trim() === "") {
        fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    }

    let data = {};
    try {
        data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
        console.error("JSON Parsing Error in autovoice.json:", error);
        return;
    }

    console.log("Received Body:", body);
    console.log("Loaded Data from JSON:", data);

    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            if (config.AUTO_VOICE === 'true') {
                await conn.sendPresenceUpdate('recording', from);
                if (data[text]) {  // Ensure ke value exist karti hai
                    await conn.sendMessage(from, { 
                        audio: { url: data[text] }, 
                        mimetype: 'audio/mpeg', 
                        ptt: true 
                    }, { quoted: mek });
                } else {
                    console.error("Audio file not found for:", text);
                }
            }
        }
    }                
});

//auto sticker

cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../data/autosticker.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            
            if (config.AUTO_STICKER === 'true') {
                //if (isOwner) return;        
                await conn.sendMessage(from,{sticker: { url : data[text]},package: 'ALI-MD'},{ quoted: mek })   
            
            }
        }
    }                
});

//auto reply 

cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../data/autoreply.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            
            if (config.AUTO_REPLY === 'true') {
                //if (isOwner) return;        
                await m.reply(data[text])
            
            }
        }
    }                
});

// Composing (Auto Typing)

cmd({
    on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    if (config.AUTO_TYPING === 'true') {
        await conn.sendPresenceUpdate('composing', from); // send typing 
    }
});
