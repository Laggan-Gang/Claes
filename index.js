//TABLE OF CONTENTS
// Around line 15 Preface
// Around line 28 Introduction
// Around line 80 Chapter One: Boring Functions
// Around line 114 Chapter Two: The Key to the Mystery
// Around line 120 Chapter Three: Call & Response
// Around line 126 Chapter Four: The art of Bullying
// Around line 157 Chapter Five: There are Only Dumb Questions
// Around line 164 Chapter Six: The Team
// Around line 305 Chapter Seven: The Mystery to the Key
// ARound line 321 Chapter Eight: The End

//PREFACE:
//Boring stuff that I don't care about but it's about using other people's code to do things no one should go

// Require the necessary discord.js classes "klient" är alltså botten pretty much
const { Client, Intents, MessageAttachment } = require("discord.js");
const { token } = require("./config.json");
const Canvas = require("canvas");
const dotaPrefs = require("./dota-prefs-api.js");

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
} = require("@discordjs/voice");

// INTRODUCTION:
// This is also boring stuff that's "required" for things to "work"

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Claes is online");

  //const pinns = '873614838692192286'
  //const kanalen = client.channels.cache.get(pinns);
  //kanalen.guild.members.fetch().then(gubbar => {
  //	let gobbar = gubbar.map(gubbe => ({
  //		gobbe: gubbe.user.username,
  //		diminutiver: gubbe.displayName,
  //		gäjmertagg: gubbe.user.discriminator,
  //		ackolader: gubbe.roles.cache.filter(ackolad => ackolad.name != '@everyone').map(ackolad => ({ designation: ackolad.name })),
  //	}));
  //	console.log(gobbar)
  //	//let gobbGänget = JSON.stringify(gobbar, null, "\t");
  //	//filGöraren.appendFile('BigGgobbar.json', gobbGänget, 'utf8', function (whoops) {
  //	//	if (whoops) throw whoops
  //	//	console.log('najs');
  //	//})
  //})
  //
  //
  //kanalen.messages.fetch({ limit: 100 }).then(messages => {
  //	let telegram = messages.map(meddelande => ({ //Deklarar en funktion som input till messages.map //Två paranteser säger att den här kommer direkt bli en grej jag vill
  //		litteratör: meddelande?.embeds[0]?.author?.name, //kommatecken avgränsar mellan två fält i det jag returnar
  //		dikt: meddelande?.embeds[0]?.description, //frågetecken gör att min funktion inte skiter på sig, jag använder dem eftersom jag inte får göra if satser
  //		hypertavellänk: meddelande?.embeds[0]?.image?.url,
  //		hyperhopplänk: meddelande?.embeds[0]?.fields[0]?.value?.match(/\(([^\)]+)/i)[1],
  //		hyperövrigbonuslänkar: meddelande?.embeds[0]?.fields?.slice(1)?.map(
  //			hyperfält => hyperfält?.value?.match(/\(([^\)]+)/i)[1]),
  //	}))
  //
  //	let rensad = telegram.filter(t => t.litteratör && t.hyperhopplänk)
  //	let JAAAAYSOOOOOon = JSON.stringify(rensad, null, "\t");
  //	//filGöraren.appendFile('Bigpinns.json', JAAAAYSOOOOOon, 'utf8', function (whoops) {
  //	//	if (whoops) throw whoops;
  //	//	console.log('najs');
  //	//}); DEN HÄR SKA AKTIVERAS SEN NÄR BOTTEN ÄR REDO FÖR RIKTIG BUSINESS
  //
  //	console.log(rensad)
  //
  //
  //
  //
  //
  //
  //})
});

//CHAPTER ONE: Boring Functions
//These are boring functions that are mostly stolen

function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}

//important function for bullying
var svampbob = (harang) => {
  var chars = harang.toLowerCase().split("");
  for (var i = 0; i < chars.length; i += 2) {
    chars[i] = chars[i].toUpperCase();
  }
  return chars.join("");
};

//supposedly fits text to size of image for use with canvas, not sure what's really going on
const dymo = (canvas, text) => {
  const context = canvas.getContext("2d");

  // Declare a base size of the font
  let fontSize = 400;

  do {
    // Assign the font to the context and decrement it so it can be measured again
    context.font = `${(fontSize -= 10)}px `;
    // Compare pixel width of the text to the canvas minus the approximate avatar size
  } while (context.measureText(text).width > canvas.width);

  // Return the result to use in the actual canvas
  return context.font;
};

function löftesKollaren(player) {
  const ed = new Promise((resolve, reject) => {
    player.on(AudioPlayerStatus.Idle, function filibuster() {
      resolve();
    });
  });
  return ed;
}

//And here is a self-made one (it's NOT recursive!) ;)
async function spelaungefärljudetavenbokstav(meddelande, bokstäver) {
  bokstavsBegynnelseTid = 1000;
  bokstavsTid = 500;
  let vänteTid = 2000 + bokstavsBegynnelseTid + bokstavsTid * bokstäver.length;
  let channel = meddelande.member.voice.channel;
  const player = createAudioPlayer();
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  console.log("Nu är vi utanför loopen :(" + player.state.status);
  const subscription = connection.subscribe(player);
  for (let i = 0; i < bokstäver.length; i++) {
    console.log(bokstäver[i]);
    let resurs = createAudioResource(
      "/home/hugo/Claes/bokstäver/" + bokstäver[i] + ".wav"
    );
    await löftesKollaren(player);
    //setTimeout(() => player.play(resurs), bokstavsTid * i);
    player.play(resurs);
    //setTimeout(() => player.stop(), (bokstavsBegynnelseTid + bokstavsTid * i))
    console.log("Nu är vi i loopen :)" + player.state.status);
  }
  console.log("Nu har jag spelat klart! :)");
  if (subscription) {
    setTimeout(() => subscription.unsubscribe(), vänteTid);
    setTimeout(() => connection.destroy(), vänteTid);
  }
}

//CHAPTER TWO: The Key to the Mystery
//The key is "hej" and the mystery is where pee is stored

//this is only for asking where pee is stored

//CHAPTER THREE: Call & Response
//This is where things happen babyyyyyyy!

client.on("messageCreate", async (meddelande) => {
  //if (meddelande.channelId == pinns && meddelande.author.id == "873614862578769940" && meddelande.embeds[0]) { den här är sparad eftersom den har NQN botten

  //CHAPTER FOUR: Bullying is An Art

  //the die is cast is very important for determining what's going on
  var aleaIactaEst = Math.floor(Math.random() * 50);
  console.log("Tärningen är kastad! " + aleaIactaEst);
  //if we get bully crit then we bully
  if (aleaIactaEst == 18 && meddelande.author.id !== "745345949295181886") {
    //make the webhook that impersonates the bullyee
    let jamesCameron =
      "https://cdn.discordapp.com/avatars/" +
      meddelande.author.id +
      "/" +
      meddelande.author.avatar;
    async function webbKrok() {
      try {
        const channel = client.channels.cache.get(meddelande.channel.id);
        var webhook = await channel.createWebhook(
          '"' + svampbob(meddelande.member.displayName) + '"',
          {
            avatar: jamesCameron,
          }
        );

        await webhook.send({
          content: "**" + svampbob(meddelande.content) + "**",
          username: '"' + svampbob(meddelande.member.displayName) + '"',
          avatarURL: jamesCameron,
        });
        webhook.delete();
      } catch (whoops) {
        console.error("Här sket det sig: ", whoops);
      }
    }
    webbKrok();
  }
  let dravel = meddelande.content.toLowerCase();

  //CHAPTER FIVE: There are Only Dumb Questions
  //cursed regex and then some more crit-based bullying
  if (
    /.+\?([\n\r\t !]|$)/gi.test(dravel) &&
    aleaIactaEst < 7 &&
    meddelande.author.id !== "745345949295181886"
  )
    meddelande.reply("Bra fråga, återkommer :)");
  //a proper greeting gets a proper response
  if (dravel === "hey guys") {
    meddelande.reply("https://www.youtube.com/watch?v=fqoM2BJ6_-8");
  }

  //CHAPTER SIX: The Team
  //code to help dota nerds win games
  else if (dravel.endsWith("maakep happen")) {
    // bunch of stuff to play audio in voice
    if (meddelande.member.voice.channel !== null) {
      let ljudfil = "bow bow.wav";
      let vänteTid = 5_000;

      switch (true) {
        case inRange(aleaIactaEst, 0, 5):
          ljudfil = "mitchyapos.wav";
          vänteTid = 7_000;
          console.log("mitchyapos");
          break;
        case inRange(aleaIactaEst, 6, 11):
          ljudfil = "hugoyapos.wav";
          console.log("hugo");
          break;
        case inRange(aleaIactaEst, 12, 17):
          ljudfil = "claesyapos.wav";
          vänteTid = 20_000;
          console.log("claes");
          break;
        case inRange(aleaIactaEst, 18, 23):
          ljudfil = "edwinyapos.wav";
          vänteTid = 9_000;
          console.log("edwin");
          break;
        case inRange(aleaIactaEst, 24, 29):
          ljudfil = "sarayapos.wav";
          vänteTid = 24_000;
          console.log("sara");
          break;
        case inRange(aleaIactaEst, 30, 35):
          ljudfil = "densetsuyapos.wav";
          vänteTid = 26_000;
          console.log("Laggan gaiden");
          break;
        case inRange(aleaIactaEst, 36, 41):
          ljudfil = "sarayapos2.wav";
          vänteTid = 17_000;
          console.log("sara");
          break;

        case inRange(aleaIactaEst, 42, 47):
          ljudfil = "onyourmarksyapos.wav";
          vänteTid = 10_000;
          console.log("On your marks");
          break;

        default:
          console.log("default");
          break;
      }

      let channel = meddelande.member.voice.channel;
      const player = createAudioPlayer();
      let resource = createAudioResource(
        "/home/hugo/Claes/ljudklipp/" + ljudfil
      );
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      player.play(resource);
      const subscription = connection.subscribe(player);
      if (subscription) {
        setTimeout(() => subscription.unsubscribe(), vänteTid);
        setTimeout(() => connection.destroy(), vänteTid);
        setTimeout(() => player.stop(), vänteTid);
      }
    }
    //make an array that is exactly 5 long to fit 5 bozos
    const minusMaakep = dravel.slice(0, -14);
    var behållare = ["", "", "", "", ""];
    var spelareLista = minusMaakep.split(" ", 5);
    for (var i of spelareLista) {
      behållare.push(i);
      behållare.shift();
    }
    console.log(behållare);
    console.log(spelareLista);

    //BELOW THIS LINE IS AUTHENTIC MAAKEP CODE, DO NOT MAKE ANY CHANGES AS IT IS THE ENGINE WHICH DRIVES THE ENTIRE PROJECT\\

    // Loop through the array and switch places
    //with a random position for every item in array
    function shuffleArray(arr) {
      const array = [...arr];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    //ABOVE THIS LINE IS AUTHENTIC MAAKEP CODE, DO NOT MAKE ANY CHANGES AS IT IS THE ENGINE WHICH DRIVES THE ENTIRE PROJECT\\

    //Set up a bunch of canvas shit that I don't know what's going on with but the tutorials says to do it
    const { registerFont } = require("canvas");
    registerFont("ComicMono.ttf", { family: "Comic Mono" });

    //the canvas size is completely arbitrary, it's used in the tutorial so I haven't been arsed to change it
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext("2d");
    //get the dumb image and draw the dumb image
    const background = await Canvas.loadImage("/home/hugo/Claes/maakep.png");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    //do the hoyl and mix up the bag of bozos
    const omSkuffadSamling = shuffleArray(behållare);
    let överText = [];
    let subText = [];

    //i'm a baby so i write baby code
    överText.push(omSkuffadSamling[0]);
    överText.push(omSkuffadSamling[1]);
    subText.push(omSkuffadSamling[2]);
    subText.push(omSkuffadSamling[3]);
    subText.push(omSkuffadSamling[4]);

    //establish hierarchy and bully
    let rubrik = överText.join(" > ");
    rubrik = svampbob(rubrik);
    let underText = subText.join(" > ");
    underText = svampbob(underText);

    //2 lines below aren't really used
    const prioriteringar = omSkuffadSamling.join(" > ");

    //make canvas type the words on the image time babyyyyyy, the values for .filltext shit is arbitrary and could probably be improved but who cares it looks nice and jank
    context.font = `${dymo(canvas, `${rubrik}`)}"Comic Mono"`;
    context.fillStyle = "#ffffff";
    context.fillText(`${rubrik}`, 0, canvas.height / 4.0);

    context.font = `${dymo(canvas, `${underText}`)}"Comic Mono"`;
    context.fillStyle = "#ffffff";
    context.fillText(`v`, 0, canvas.height / 2.0);

    context.font = `${dymo(canvas, `${underText}`)}"Comic Mono"`;
    context.fillStyle = "#ffffff";
    context.fillText(`${underText}`, 0, canvas.height / 1.5);

    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      "maakepHappen.png"
    );
    //meddelande.edit(`${svampPrio}`) det är illegal att göra detta tydligen
    meddelande.reply({ files: [attachment] });
  } else if (dravel.startsWith("!dota")) {
    const res = await dotaPrefs.parseMessage(dravel);
    meddelande.reply(svampbob(`${res}`));
  }

  //CHAPTER SEVEN: The Mystery to the Key
  //below is legacy code that is important for ceremonial reasons
  if (dravel === "hej claes") {
    //blabla om command är hej bla bla

    meddelande.reply(`PEE IS STORED IN BALLS`);
  }

  //CHAPTER EIGHT: The Endless River
  //Have you ever had a dream that you, um, you had, your, you- you could, you’ll do, you- you wants, you, you could do so, you- you’ll do, you could- you, you want, you want them to do you so much you could do anything?
  if (meddelande.member.voice.channel != undefined) {
    if (meddelande.content.startsWith("säg ")) {
      attsäga = meddelande.cleanContent.substring(3).toLowerCase();
      spelaungefärljudetavenbokstav(meddelande, attsäga);
    }
  }
});

//CHAPTER NINE: The End
//You have to do this
client.login(token);
