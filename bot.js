const Discord = require("discord.js")
const bot = new Discord.Client({disableMentions: 'everyone'})
const config = require("./config.json")


bot.on("ready", () => {
    console.log("Loaded up!")
});

bot.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username}'s commands`)
            .setDescription(`**Prefix:** ${config.prefix}`)
            .addField(`\`ping\``, `Check ping`)
            .addField(`\`kick\``, `Cách dùng: **${config.prefix}kick [@User]**\n**${config.prefix}kick [@User][Reason]**`)
            .addField(`\`ban\``, `Usage: **${config.prefix}ban [@User]**\n**${config.prefix}ban [@User][Reason]**`)
            // .addField(`\`add\``, `Adds a role to a user \nUsage: **${config.prefix}add [@User] [Role]**`)
            // .addField(`\`remove\``, `Removes a role from a user \nUsage: **${config.prefix}remove [@User] [Role]**`)
            .addField(`\`purge\``, `Xóa 2-100 tin nhắn \nUsage: **${config.prefix}purge [number]**`)
            // .addField(`\`rps\``, `Play rock paper scissors`)
            .addField(`\`say\``, `Cho Eris-chwan nói gì đó ( ͡❛ ‿ ͡❛)`)
        message.channel.send(helpEmbed)
    }

    if (command === "ping") {
        message.channel.send(`Pong **(${Date.now() - message.createdTimestamp}ms)**`)
    }

    if (command === "kick") {
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send("Ai cho? láo (ง︡'-'︠)ง").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("Kick ai?").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.kickable)
            return message.channel.send("Khôm đấm được (╥︣﹏᷅╥)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} đã bị sút không vì lí do gì cả, adios. （っ＾▿＾）`);
            })

            if (reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} đã bị sút vì ${reason}`);
            })
        }
    }

    if (command === "ban") {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send("Ai cấp quyền? (ง︡'-'︠)ง").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("Ban ai?").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.bannable)
            return message.channel.send("Không đấm được (╥︣﹏᷅╥)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.ban().then(member => {
                message.channel.send(`${member.user.tag} đã bị ban không vì lí do gì cả （っ＾▿＾）`);
            })

            if (reason) return member.ban(reason).then(member => {
                message.channel.send(`${member.user.tag} đã bị ban vì ${reason}`);
            })
        }
    }

    // if (command === "add") {
    //     if (!message.member.hasPermission('MANAGE_ROLES'))
    //         return message.channel.send("Ai cấp quyền?").then(msg => {
    //     msg.delete({ timeout: 30000 })
    // })
    //     const member = message.mentions.members.first()
    //     if (!member)
    //         return message.channel.send("Add role cho ai?").then(msg => {
    //     msg.delete({ timeout: 30000 })
    // })
    //     const add = args.slice(1).join(" ")
    //     if (!add)
    //         return message.channel.send("Role gì?").then(msg => {
    //     msg.delete({ timeout: 30000 })
    // })
    //     const roleAdd = message.guild.roles.cache.find(role => role.name === add)
    //     if (!roleAdd)
    //         return message.channel.send("Không có role này").then(msg => {
    //     msg.delete({ timeout: 30000 })
    // })
    //     if (member.roles.cache.get(roleAdd.id))
    //         return message.channel.send(`Đã có role ${add}`).then(msg => {
    //     msg.delete({ timeout: 30000 })
    // })
    //     member.roles.add(roleAdd.id).then((member) => {
    //         message.channel.send(`${add} đã được add cho ${member.displayName}`)
    //     })
    // }

    // if (command === "remove") {
    //     if (!message.member.hasPermission('MANAGE_ROLES'))
    //         return message.channel.send("Insufficient permissions (Requires permission `Manage roles`)").then(msg => {
    //     msg.delete({ timeout: 30000 })
    // })
    //     const member = message.mentions.members.first()
    //     if (!member)
    //         return message.channel.send("You have not mentioned a user").then(msg => {
    //     msg.delete({ timeout: 30000 })
    // })
    //     const remove = args.slice(1).join(" ")
    //     if (!remove)
    //         return message.channel.send("You have not specified a role").then(msg => {
    //     msg.delete({ timeout: 30000 })
    // })
    //     const roleRemove = message.guild.roles.cache.find(role => role.name === remove)
    //     if (!roleRemove)
    //         return message.channel.send("This role does not exist").then(msg => {
    //     msg.delete({ timeout: 30000 })
    // })
    //     if (!member.roles.cache.get(roleRemove.id))
    //         return message.channel.send(`This user does not have the ${remove} role`).then(msg => {
    //     msg.delete({ timeout: 30000 })
    // })
    //     member.roles.remove(roleRemove.id).then((member) => {
    //         message.channel.send(`${remove} removed from ${member.displayName}`)
    //     })
    // }

    if (command === "say") {
    const text = args.join(" ")
    if(!text) return message.channel.send("Nói j? ( ˘︹˘ )").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    message.channel.send(text)
    
    }
   
    if (command === "purge") {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Không em").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    const number = args.join(" ")
    if(!number) return message.channel.send("Xóa bao nhiêu tin? ơ? hello? (ㆆ_ㆆ)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
   message.channel.bulkDelete(number).catch(console.error)
   
   }
});

bot.login(config.token)
