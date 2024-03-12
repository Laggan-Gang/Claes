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
const {
  Client,
  Intents,
  Message,
  Channel,
  TextChannel,
  MessageAttachment,
  MessageEmbed,
} = require('discord.js');
const { token } = require('./config.json');
const Canvas = require('canvas');
const dotaPrefs = require('./dota-prefs-api.js');
const EngTillIPA = require('./eng-till-ipa-2000.js');
const prevodach = require('./prevodach.js');
const spinnRock = require('./spinnRock.js');
const xXG4M3RXx = require('./gamer.js');
const { shuffleArray } = require('./helpers.js');
const falskt = false;
const sant = true;

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    /*

      var a = ['hej', 'bajs', 'kiss']
      
      var b = a.map(x => {
        return x + "wowo"
      }) 

      b -> ['hejwowo', 'bajswowo', 'kisswowo']

      - - - - - 
      
      var a = [1, 2, 3]

      var b = a.reduce((accumulated, current) => {
        return accumulated + current;
      }, 0);

      b -> 6


      - - - - - 

      var a = ['bicc', 'thicc', 'boi']

      var b = a.filter(x => {
        return x.endsWith("icc");
      });

      b -> ['bicc', 'thicc']

    */
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, //ASVIKTIG!!!
  ],
});
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
} = require('@discordjs/voice');

// INTRODUCTION:
// This is also boring stuff that's "required" for things to "work"

// When the client is ready, run this code (only once)
client.once('ready', () => {
  EngTillIPA.ladda();
  console.log('Claes is online');

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

var upptagen = falskt;

function kapitalisera(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}

//important function for bullying
const svampbob = (harang = '') => {
  var chars = harang.toLowerCase().split('');
  const svampbobbifieradeBokstäver = chars.map((char) =>
    Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
  );
  return svampbobbifieradeBokstäver.join('');
};

//supposedly fits text to size of image for use with canvas, not sure what's really going on
const dymo = (canvas, text) => {
  const context = canvas.getContext('2d');

  // Declare a base size of the font
  let fontSize = 800;

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

async function ljudGöraren(meddelande, aleaIactaEst) {
  let ljudfil = 'bow bow.wav';
  switch (sant) {
    case inRange(aleaIactaEst, 0, 0):
      ljudfil = 'IASID.wav';
      console.log('IASID');
      break;
    case inRange(aleaIactaEst, 1, 5):
      ljudfil = 'mitchyapos.wav';
      console.log('mitchyapos');
      break;
    case inRange(aleaIactaEst, 6, 10):
      ljudfil = 'hugoyapos.wav';
      console.log('hugo');
      break;
    case inRange(aleaIactaEst, 11, 15):
      ljudfil = 'claesyapos.wav';
      console.log('claes');
      break;
    case inRange(aleaIactaEst, 16, 20):
      ljudfil = 'edwinyapos.wav';
      console.log('edwin');
      break;
    case inRange(aleaIactaEst, 21, 25):
      ljudfil = 'sarayapos.wav';
      console.log('sara');
      break;
    case inRange(aleaIactaEst, 26, 30):
      ljudfil = 'densetsuyapos.wav';
      console.log('Laggan gaiden');
      break;
    case inRange(aleaIactaEst, 31, 35):
      ljudfil = 'sarayapos2.wav';
      console.log('sara');
      break;
    case inRange(aleaIactaEst, 36, 40):
      ljudfil = 'onyourmarksyapos.wav';
      console.log('On your marks');
      break;
    case inRange(aleaIactaEst, 41, 45):
      ljudfil = 'garboyapos.wav';
      console.log('woof woof');
      break;

    default:
      console.log('default');
      break;
  }
  let channel = meddelande.member.voice.channel;

  if (channel == undefined) {
    return;
  }

  const player = createAudioPlayer();
  let resource = createAudioResource('./ljudklipp/' + ljudfil);
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
  const subscription = connection.subscribe(player);
  player.play(resource);
  await löftesKollaren(player);
  if (subscription) {
    subscription.unsubscribe();
    connection.destroy();
    player.stop();
  }
  return console.log('Eftersom jag retrurnar har jag tänkt på det');
}

//And here is a self-made one (it's NOT recursive!) ;)
async function spelaungefärljudetavenbokstav(meddelande, bokstäver) {
  skiljetecken = {
    '!': 'utropstecken',
    '$': 'dollartecken',
    '%': 'procenttecken',
    '&': 'ampersand',
    '/': 'snedstreck',
    '{': 'startkrullparentes',
    '}': 'slutkrullparentes',
    '[': 'startkantparentes',
    ']': 'slutkantparentes',
    '(': 'startparentes',
    ')': 'slutparentes',
    '=': 'likamedtecken',
    '+': 'plustecken',
    '?': 'frågetecken',
    ',': 'kommatecken',
    '.': 'punkttecken',
    '~': 'simtecken',
    '-': 'bindestreck',
    '_': 'understreck',
    ';': 'semikolontecken',
    ':': 'kolontecken',
    '<': 'mindreäntecken',
    '>': 'störreäntecken',
    '|': 'piptecken',
  };

  for (let i = 0; i < bokstäver.length; i++) {
    if (!" 'abcdefghijklmnopqrtstuvxyzåäö".includes(bokstäver[i])) {
      bokstäver = bokstäver.slice(0, i) + ' ' + bokstäver.slice(i);
      i++; // Annars skjuter den fram skiljetecknet och lägger in oändligt många " "
    }
  }
  ord = bokstäver.split(' ');
  var IPAbokstäver = '';
  for (let i = 0; i < ord.length; i++) {
    if (i != 0 && !'{}[]~!.,-()=+_<>?|'.includes(ord[i])) {
      IPAbokstäver += ' ';
    }
    IPAbokstäver += EngTillIPA.kolla(ord[i]);
  }

  let channel = meddelande.member.voice.channel;
  const player = createAudioPlayer();
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  const subscription = connection.subscribe(player);
  for (let i = 0; i < IPAbokstäver.length; i++) {
    if ('~!$%&/{}[]()=+?,.-_;:<>|'.includes(IPAbokstäver[i])) {
      ljudfilsomjagtyckerattvikanskebordespelanu =
        skiljetecken[IPAbokstäver[i]];
    } else {
      ljudfilsomjagtyckerattvikanskebordespelanu = IPAbokstäver[i];
    }
    let resurs = createAudioResource(
      './bokstäver/IPA/' + ljudfilsomjagtyckerattvikanskebordespelanu + '.wav'
    );
    player.play(resurs);
    await löftesKollaren(player);
  }
  if (subscription) {
    subscription.unsubscribe();
  }
  if (connection) {
    connection.destroy();
  }
}

//CHAPTER TWO: The Key to the Mystery
//The key is "hej" and the mystery is where pee is stored
//The mystery is also what happened to "hej"

//this is only for asking where pee is stored

//CHAPTER THREE: Call & Response
//This is where things happen babyyyyyyy!

client.on('messageCreate', async (meddelande) => {
  //if (meddelande.channelId == pinns && meddelande.author.id == "873614862578769940" && meddelande.embeds[0]) { den här är sparad eftersom den har NQN botten

  //CHAPTER FOUR: Bullying is An Art

  //the die is cast is very important for determining what's going on
  var aleaIactaEst = Math.floor(Math.random() * 50);
  //if we get bully crit then we bully
  if (
    meddelande.author.id !== '745345949295181886' &&
    ((aleaIactaEst == 18 && meddelande.author.id !== '1011640018479091722') ||
      (/regex/.test(meddelande.content) && aleaIactaEst > 5))
  ) {
    //make the webhook that impersonates the bullyee
    let jamesCameron =
      'https://cdn.discordapp.com/avatars/' +
      meddelande.author.id +
      '/' +
      meddelande.author.avatar;
    async function webbKrok() {
      //switch (sant) {
      //  case client.channels.cache.get(meddelande.channel.id):
      //    break;
      //}
      try {
        const channel = client.channels.cache.get(meddelande.channel.id);
        var webhook = await channel.createWebhook(
          '"' + svampbob(meddelande.member.displayName) + '"',
          {
            avatar: jamesCameron,
          }
        );

        await webhook.send({
          content: '**' + svampbob(meddelande.content) + '**',
          username: '"' + svampbob(meddelande.member.displayName) + '"',
          avatarURL: jamesCameron,
        });
        webhook.delete();
      } catch (whoops) {
        console.error('Här sket det sig: ', whoops);
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
    meddelande.author.id !== '745345949295181886' &&
    meddelande.author.id !== '1011640018479091722'
  ) {
    // Test if the message is in english using the translation (works!)
    // testMessage = meddelande.content;
    // translatedTestMessage = await(prevodach.swedishToEnglish(testMessage))
    // if (testMessage == translatedTestMessage) {
    //   meddelande.reply("Good question, I'll get back to you :)");
    // } else {
    //   meddelande.reply('Bra fråga, återkommer :)');
    // }

    // Test if the message is in english using the IPA lookup (works?)
    splitMessage = meddelande.content.replace('?', '').split(' ');
    denSakenSomBlirMindreInEnglish = 0;
    for (const Ord of splitMessage) {
      ord = Ord.toLowerCase();
      IPAOrd = EngTillIPA.kolla(ord);
      if (IPAOrd != ord) {
        denSakenSomBlirMindreInEnglish -= 1;
      } else {
        denSakenSomBlirMindreInEnglish += 1;
      }
    }
    if (denSakenSomBlirMindreInEnglish < 0) {
      meddelande.reply("Good question, I'll get back to you :)");
    } else {
      meddelande.reply('Bra fråga, återkommer :)');
    }
  }
  //a proper thank you gets a proper response
  if (
    dravel.startsWith('tack mig') ||
    dravel.startsWith('tack mej') ||
    dravel.startsWith('thanks me')
  ) {
    if (meddelande.author.id == '207974495393153024') {
      // CLAES
      //if (meddelande.author.id == '199914493570973697') { // AUGUST för att testa
      meddelande.reply({ files: ['./spiderman.jpg'] });
    }
  }
  if (dravel.includes('tack claes') || dravel.includes('tack rdc')) {
    switch (sant) {
      case inRange(aleaIactaEst, 41, 50):
        meddelande.reply('Inga problem!');
        break;
      case inRange(aleaIactaEst, 31, 40):
        meddelande.reply('Tack själv!');
        break;
      case inRange(aleaIactaEst, 21, 30):
        meddelande.reply('Det var så lite!');
        break;
      case inRange(aleaIactaEst, 11, 20):
        meddelande.reply('Du behöver inte tacka mig!');
        break;
      case inRange(aleaIactaEst, 2, 10):
        meddelande.reply('Var så god!');
        break;
      default:
        meddelande.reply(
          'Tacka för det här!*vänder sig om och drar ned byxorna* (du kan se att Claes has bajsat på sig)'
        );
        break;
    }
    if (
      dravel.includes('helt rätt claes') ||
      dravel.includes('helt rätt rdc') ||
      dravel.includes('damn right claes') ||
      dravel.includes('damn right rdc')
    ) {
      meddelande.reply('😎👉👉');
    }
  }
  if (dravel.includes('thanks claes') || dravel.includes('thanks rdc')) {
    switch (sant) {
      case inRange(aleaIactaEst, 41, 50):
        meddelande.reply('No problem!');
        break;
      case inRange(aleaIactaEst, 31, 40):
        meddelande.reply('No, thank YOU!');
        break;
      case inRange(aleaIactaEst, 21, 30):
        meddelande.reply("Oh it's nothing!");
        break;
      case inRange(aleaIactaEst, 11, 20):
        meddelande.reply('No need to thank me!');
        break;
      case inRange(aleaIactaEst, 2, 10):
        meddelande.reply("You're welcome!");
        break;
      default:
        meddelande.reply(
          'Say thank you to this!*turns around and drops his pants* (you can see Claes has pooped himself)'
        );
        break;
    }
  }
  //a proper greeting gets a proper response
  if (dravel === 'hey guys') {
    meddelande.reply('https://www.youtube.com/watch?v=fqoM2BJ6_-8');
  }

  if (
    !['1011640018479091722', '745345949295181886'].includes(
      meddelande.author.id
    ) &&
    dravel.replace(/[,.?!]+/g, '').endsWith('er') &&
    aleaIactaEst < 16 && // Gör det till 30% av gångerna
    dravel.length < 200
  ) {
    var meddelandeUtanGrammatik = meddelande.content.replace(/[,.?!]+/g, '');
    var meddelandeBindestreck = meddelandeUtanGrammatik.replace(/\s+/g, '-');

    meddelande.reply(
      `${meddelandeBindestreck.substring(
        0,
        meddelandeBindestreck.length - 2
      )} 'er? I hardly know her!`
    );
  }

  const chrisOrden = ['chris', 'clam', 'christopher', 'lambert'];
  const doktorOrden = ['dr', 'doktor', 'doctor'];
  const dravelUtanGrammatik = dravel
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\?]/g, '')
    .toLowerCase();
  const dravelOrd = dravelUtanGrammatik.split(' ');
  const chrisTaggas = meddelande.mentions.users.some(
    (omtaladAnvandare) => omtaladAnvandare.id === '224953719945560066'
  );
  const chrisFinns = chrisOrden.some((chrisOrd) =>
    dravelOrd.includes(chrisOrd.toLowerCase())
  );
  const chrisHarTituleratsKorrekt = doktorOrden.some((doktorOrd) =>
    dravelOrd.includes(doktorOrd.toLowerCase())
  );
  const chrisHarDisrespekterats =
    !chrisHarTituleratsKorrekt && (chrisTaggas || chrisFinns);

  if (
    ![
      '1011640018479091722',
      '745345949295181886',
      '1109079876713066518',
      '224953719945560066',
    ].includes(meddelande.author.id) && //???, Rainbowdashclaes, Shortstack, Clam
    chrisHarDisrespekterats
  ) {
    meddelande.reply("It's Dr. Lambert to you");
  }
  //spreading the truth

  if (!meddelande.author.bot && dravel.includes('matthew broderick')) {
    meddelande.reply(
      `On August 5, 1987, while driving a rented BMW in Enniskillen, Northern Ireland, Matthew Broderick crossed into the wrong lane and collided head-on with a Volvo driven by Anna Gallagher, 30, accompanied by her mother, Margaret Doherty, 63, killing both instantly. He was vacationing with Jennifer Grey, whom he began dating in semi-secrecy during the filming of Ferris Bueller's Day Off; the crash publicly revealing their relationship. He had a fractured leg and ribs, a concussion, and a collapsed lung. Grey received minor injuries, including whiplash. Broderick told police he had no recollection of the crash and did not know why he was in the wrong lane: "I don't remember the day. I don't remember even getting up in the morning. I don't remember making my bed. What I first remember is waking up in the hospital, with a very strange feeling going on in my leg." He was charged with causing death by dangerous driving and faced up to five years in prison, but was later convicted of the lesser charge of careless driving and fined $175.`
    );
  }
  //CHAPTER SIX: The Team
  //code to help dota nerds win games
  else if (dravel.endsWith('maakep happen')) {
    // bunch of stuff to play audio in voice
    if (meddelande.member.voice.channel !== null) {
      ljudGöraren(meddelande, aleaIactaEst);
    }
    //make an array that is exactly 5 long to fit 5 bozos
    const minusMaakep = dravel.slice(0, -14);
    var behållare = ['', '', '', '', ''];
    var spelareLista = minusMaakep.split(' ', 5);
    for (var i of spelareLista) {
      behållare.push(i);
      behållare.shift();
    }
    console.log(behållare);
    console.log(spelareLista);

    //Set up a bunch of canvas shit that I don't know what's going on with but the tutorials says to do it
    const { registerFont } = require('canvas');
    registerFont('ComicMono.ttf', { family: 'Comic Mono' });
    registerFont('Textile Regular.ttf', { family: 'Textile Regular' });
    const omSkuffadSamling = shuffleArray(behållare);

    //For commentary on this stuff just look at the else shit below I can't be arsed, it's the same
    if (aleaIactaEst === 25) {
      let förstaFyran = [];
      for (let i = 0; i < 4; i++) {
        let kapitaliserad = kapitalisera(omSkuffadSamling[i]);
        förstaFyran.push(kapitaliserad);
      }
      let strängBoys =
        '"' +
        förstaFyran.join(', ') +
        ' & ' +
        kapitalisera(omSkuffadSamling[4]) +
        ' \nthrow a game of Dota 2"';

      const canvas = Canvas.createCanvas(420, 260);
      const context = canvas.getContext('2d');
      context.fillStyle = 'black';
      context.fillRect(0, 0, 420, 260);

      context.textAlign = 'center';
      context.font = `${dymo(canvas, `${strängBoys}`)}"Textile Regular"`;
      context.fillStyle = '#ffffff';
      context.fillText(
        `${strängBoys}`,
        canvas.width / 2.0,
        canvas.height / 2.0
      );

      const attachment = new MessageAttachment(canvas.toBuffer(), 'iasid.png');
      meddelande.reply({ files: [attachment] });
    } else {
      //the canvas size is completely arbitrary, it's used in the tutorial so I haven't been arsed to change it
      const canvas = Canvas.createCanvas(700, 250);
      const context = canvas.getContext('2d');
      //get the dumb image and draw the dumb image
      const background = await Canvas.loadImage('./maakep.png');
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      //do the hoyl and mix up the bag of bozos
      let överText = [];
      let subText = [];

      //i'm a baby so i write baby code
      överText.push(omSkuffadSamling[0]);
      överText.push(omSkuffadSamling[1]);
      subText.push(omSkuffadSamling[2]);
      subText.push(omSkuffadSamling[3]);
      subText.push(omSkuffadSamling[4]);

      //establish hierarchy and bully
      let rubrik = överText.join(' > ');
      rubrik = svampbob(rubrik);
      let underText = subText.join(' > ');
      underText = svampbob(underText);

      //2 lines below aren't really used
      const prioriteringar = omSkuffadSamling.join(' > ');

      //make canvas type the words on the image time babyyyyyy, the values for .filltext shit is arbitrary and could probably be improved but who cares it looks nice and jank
      context.font = `${dymo(canvas, `${rubrik}`)}"Comic Mono"`;
      context.fillStyle = '#ffffff';
      context.fillText(`${rubrik}`, 0, canvas.height / 4.0);

      context.font = `${dymo(canvas, `${underText}`)}"Comic Mono"`;
      context.fillStyle = '#ffffff';
      context.fillText(`v`, 0, canvas.height / 2.0);

      context.font = `${dymo(canvas, `${underText}`)}"Comic Mono"`;
      context.fillStyle = '#ffffff';
      context.fillText(`${underText}`, 0, canvas.height / 1.5);

      const attachment = new MessageAttachment(
        canvas.toBuffer(),
        'maakepHappen.png'
      );
      //meddelande.edit(`${svampPrio}`) det är illegal att göra detta tydligen
      meddelande.reply({ files: [attachment] });
    }
  } else if (dravel.startsWith('!dota')) {
    const res = await dotaPrefs.parseMessage(meddelande);
    meddelande.react(res.success ? '899414250492166174' : '703784231893073922');
    if (res.message) {
      meddelande.reply(res.message);
    }
  } else if (dravel.startsWith('!profile')) {
    meddelande.reply(
      `https://profile-l7v5yabica-ew.a.run.app/id/${meddelande.author.id}`
    );
  } else if (dravel.startsWith('!challeng') || dravel.startsWith('!utman')) {
    let hurGårDet = await xXG4M3RXx.förstå(meddelande);
    if (hurGårDet.vinnare != undefined) {
      console.log(`Spelet är över! ${hurGårDet.vinnare.username} vann.`);
      meddelande.channel.send(
        `${hurGårDet.vinnare} WON! Because they're not a NOOB! XD`
      );
    }
  }
  //CHAPTER SEVEN: The Mystery to the Key
  //below is legacy code that is important for ceremonial reasons
  if (dravel === 'hej claes') {
    //blabla om command är hej bla bla

    meddelande.reply(`PEE IS STORED IN BALLS`);
  }

  //CHAPTER EIGHT: The Endless River
  //Have you ever had a dream that you, um, you had, your, you- you could, you’ll do, you- you wants, you, you could do so, you- you’ll do, you could- you, you want, you want them to do you so much you could do anything?
  if (
    meddelande.content.toLowerCase().startsWith('säg ') ||
    meddelande.content.toLowerCase().startsWith('say ')
  ) {
    if (meddelande.member.voice.channel !== null) {
      if (upptagen !== sant) {
        upptagen = sant;
        attsäga = meddelande.cleanContent.substring(4).toLowerCase();
        spelaungefärljudetavenbokstav(meddelande, attsäga);
        upptagen = falskt;
      } else {
        meddelande.reply('Jag är upptagen');
      }
    } else {
      meddelande.reply('Joina voice först');
    }
  }
  if (meddelande.author.id == '199914493570973697' && aleaIactaEst < 1) {
    meddelande.reply('This you?');
    meddelande.channel.send({ files: ['august.png'] });
  }
  if (/^(prevedi|преведи)/.test(meddelande.content)) {
    //h e l p
    let strängToTranslate = meddelande.content.replace(
      /^(prevedi|преведи)/,
      ''
    );

    if (strängToTranslate != strängToTranslate.toLowerCase()) {
      console.log(strängToTranslate);

      //CamelCase checker.
      let översättningsKaraktär = 0;
      while (översättningsKaraktär < strängToTranslate.length) {
        // Check if upper case letter
        if (
          strängToTranslate[översättningsKaraktär] !=
          strängToTranslate[översättningsKaraktär].toLowerCase()
        ) {
          // add a space before it if it is
          strängToTranslate =
            strängToTranslate.slice(0, översättningsKaraktär) +
            ' ' +
            strängToTranslate.slice(översättningsKaraktär);
          översättningsKaraktär++; // This is double skip to skip the capital letter
        }
        översättningsKaraktär++;
      }
    }
    let funnyRetort = await prevodach.swedishToEnglish(strängToTranslate);
    meddelande.reply(svampbob(funnyRetort));
  } else if (meddelande.content.startsWith('yarn')) {
    ljudGöraren(meddelande, aleaIactaEst);
    await spinnRock.spinnRock(meddelande);
  } else if (meddelande.content.startsWith('fastyarn')) {
    ljudGöraren(meddelande, aleaIactaEst);
    await spinnRock.spinnRock(meddelande, sant);
  }
  if (meddelande.content.match(/^p.*di/) && !meddelande.author.bot) {
    meddelande.reply('did you mean prevedi?');
  }
  if (
    meddelande.content.match('gif?') &&
    !meddelande.author.bot &&
    !meddelande.content == 'oh my, what are the codes for these gifs?'
  ) {
    meddelande.reply(
      "did you mean 'oh my, what are the codes for these gifs?'"
    );
  }
});

//CHAPTER NINE: The End
//You have to do this
client.login(token);
