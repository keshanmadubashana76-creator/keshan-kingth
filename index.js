const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')
    const sock = makeWASocket({ auth: state, printQRInTerminal: true, browser: ["Keshan King", "Chrome", "1.0"] })
    sock.ev.on('creds.update', saveCreds)
    console.log("Bot Started!")

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0]
        if (!msg.message || msg.key.fromMe) return
        const from = msg.key.remoteJid
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
        if (!body.startsWith(".")) return

        const args = body.slice(1).trim().split(/ +/)
        const command = args.shift().toLowerCase()
        const q = args.join(" ")

        if (command === "menu") {
            return sock.sendMessage(from, { text: "*KESHAN KING BOT* 🔥\n\n.csong <yt link>,<channel jid>\n.ai <prashnaya>\n.save\n.alive" })
        }
        if (command === "alive") {
            return sock.sendMessage(from, { text: "✅ BOT ONLINE!" })
        }
        if (command === "csong") {
            if (!q.includes(",")) return sock.sendMessage(from, { text: "Use:.csong https://youtu.be/xxx, 1203630xxx@newsletter" })
            let [link, jid] = q.split(",").map(a=>a.trim())
            await sock.sendMessage(from, { text: "Channel ekata danawa..." })
            await sock.sendMessage(jid, { audio: { url: link }, mimetype: 'audio/mp4', caption: "By KESAN KING BOT" })
            await sock.sendMessage(from, { text: "✅ Damma!" })
        }
        if (command === "ai") {
            return sock.sendMessage(from, { text: `*AI* 🤖\n\nOya: ${q}\n\nMama oyage Sinhala AI. Thawa ahanna!` })
        }
    })
}
startBot()
