const dotaPrefs = require('./dota-prefs-api.js');
const { shuffleArray, random } = require('./helpers.js');
const { DiscordAPIError, MessageEmbed } = require('discord.js');

const FILL_EMOJI = '<:fill:935684531023925299>';

function snooze(timer) {
  if (timer) {
    clearTimeout(timer);
    timer = 0;
  }
}

function modFull(modFull) {
  let modRader = modFull.split('picked');
  //this number is very good
  const expectedNumberOfNewLines = 6;
  return modRader.length >= expectedNumberOfNewLines;
}

function kapitalisera(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function dublettTillrättavisaren(noob, reaction, tråden) {
  let trängningsMeddelande = await tråden.send(
    `${kapitalisera(noob.namn)} ${
      reaction.emoji.name
    } has already been picked, please pick another role!`
  );
  setTimeout(() => {
    try {
      trängningsMeddelande.delete();
    } catch (e) {
      console.error(e);
    }
  }, 5_000);
}

async function skojareTillrättavisaren(noob, tråden) {
  try {
    let skojareMeddelande = await tråden.send(
      `${kapitalisera(
        noob.namn
      )} you are not allowed to fill when you are last pick >:(`
    );
    setTimeout(() => {
      skojareMeddelande.delete();
    }, 5_000);
  } catch (error) {
    console.error(error);
  }
}

function vadKallasDu(noob) {
  if (noob.id) {
    return `<@${noob.id}>`;
  } else {
    return kapitalisera(noob.namn);
  }
}

function ROLLCALL(noobs) {
  let whoYouGonnaCall = [];
  for (const noob of noobs) {
    whoYouGonnaCall.push(vadKallasDu(noob));
  }
  return `${whoYouGonnaCall.join(' ')}, get ready to pick!`;
}

module.exports = {
  spinnRock: async (meddelande) => {
    const väntaNuHurMångaGubbarÄrDet = meddelande.content.split(' ');
    const gubbLängdsKollare = väntaNuHurMångaGubbarÄrDet.slice(1);
    let LAGGAN_APPROVED_TARDYNESS = 60_000;
    let start;
    if (gubbLängdsKollare.length == 6) {
      const lastItem = gubbLängdsKollare.pop();
      const newTimeout = parseInt(lastItem, 10);

      if (isNaN(newTimeout)) {
        meddelande.reply(
          `I don't know what this ${lastItem} is but it ain't a number for sure 🤔. Time to pick is set to standard ${
            LAGGAN_APPROVED_TARDYNESS / 1000
          } seconds.`
        );
      } else {
        LAGGAN_APPROVED_TARDYNESS = newTimeout;

        if (newTimeout < 1000) {
          meddelande.reply(
            `I like your style. Time to pick is ${newTimeout} milliseconds. Better go quick 🦾🦾🦾`
          );
        } else {
          meddelande.reply(
            `You have chosen to change the flow of time for your party - now each medlem has ${
              newTimeout / 1000
            }s to pick their role.`
          );
        }
      }
    }

    if (gubbLängdsKollare.length == 5) {
      let trådNamn = `The ${adjective()} ${
        meddelande.member.displayName
      } ${subjective()}`;

      let i = 0;
      let dummyArray = await dotaPrefs.fetchPreferencesForGamers(
        gubbLängdsKollare
      );
      const tråden = await meddelande.channel.threads.create({
        name: trådNamn,
        autoArchiveDuration: 60,
        reason: 'Time to set up your dota party!',
      });
      //const tråden = meddelande.channel.threads.cache.find((x) => {
      //  return x.name === trådNamn;
      //});
      if (tråden.joinable) await tråden.join();

      let trådMeddelande = await tråden.send(
        `Please wait for the bot to set up :)`
      );
      let modMeddelande = '';

      for (dummy of dummyArray) {
        modMeddelande += `\`Then it's time for ${kapitalisera(
          dummy.namn
        )}...\`\n`;
      }
      //GLÖM INTE TA MED INTENTS
      await trådMeddelande.react('1️⃣');
      await trådMeddelande.react('2️⃣');
      await trådMeddelande.react('3️⃣');
      await trådMeddelande.react('4️⃣');
      await trådMeddelande.react('5️⃣');
      await trådMeddelande.react('935684531023925299');
      trådMeddelande.edit(modMeddelande);
      let pickladeRoller = [];
      const emojiSiffror = {
        fill: FILL_EMOJI,
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
      };
      const emojiDic = {
        '1️⃣': '1',
        '2️⃣': '2',
        '3️⃣': '3',
        '4️⃣': '4',
        '5️⃣': '5',
      };
      let fillBoys = [];
      let aktivaNoobs = dummyArray;
      let äggKlockan;
      let pingMeddelande;

      pingMeddelande = await tråden.send(ROLLCALL(dummyArray));

      searchAndDestroy();

      const collector = trådMeddelande.createReactionCollector({
        filter: (_, user) => !user.bot,
        time: 360_000,
        max: 100,
      });
      //Den här stannar pga rollKoll
      function skufflaPreferens() {
        let slumpadeEmojis = shuffleArray(
          Object.values(emojiSiffror).slice(1) // slice away the fill option
        );

        for (emoji in slumpadeEmojis) {
          if (rollKoll(slumpadeEmojis[emoji]) == 'vanlig') {
            return slumpadeEmojis[emoji];
          }
        }
      }

      function hittaOchKollaPreferens(noob, isLastPick) {
        for (const föredragen of noob?.preferences || []) {
          if (isLastPick && föredragen == 'fill') {
            continue;
          }

          if (rollKoll(emojiSiffror[föredragen]) == 'vanlig') {
            return emojiSiffror[föredragen];
          }
        }

        return skufflaPreferens();
      }
      //Den här kör finska fighten bla så den måste stanna
      async function autoPicker(reaktion, noobs) {
        if (reaktion == 'fill' || reaktion == FILL_EMOJI) {
          fillBoysNeedFilling(noobs);
        } else {
          await standardPick(reaktion, noobs, LAGGAN_APPROVED_TARDYNESS / 1000);
          await finskaFighten();
        }
      }
      //Den här använder Hittaochkollapreferens som använder roll koll
      async function searchAndDestroy() {
        try {
          //destroy the last message
          await pingMeddelande.delete();
        } catch (error) {
          console.error('Failed to delete the message: ', error);
        }
        //seach for new guy
        try {
          let modRader = modMeddelande.split('\n');
          modRader[i] = `**${kapitalisera(
            aktivaNoobs[i].namn
          )} is now picking...**`;

          const isLastPick = i > 3;

          await trådMeddelande.edit(modRader.join('\n'));

          let föredragen = hittaOchKollaPreferens(aktivaNoobs[i], isLastPick);

          let pingNoob = vadKallasDu(aktivaNoobs[i]);
          pingMeddelande = await tråden.send(
            `${pingNoob}, your turn to pick. If you do not pick within 60 seconds you will be assigned ${föredragen}`
          );

          //Testing to fuck around with this
          start = performance.now();
          //Vi sätter en äggklocka, men ser först till att vi avslutar den tidigare (om det finns någon)
          snooze(äggKlockan);

          äggKlockan = setTimeout(async function () {
            await autoPicker(föredragen, aktivaNoobs);
          }, LAGGAN_APPROVED_TARDYNESS);
        } catch (error) {
          console.error('Failed to send the message: ', error);
        }
      }
      //Den här behöver en lokal picklade roller, så den måste stanna
      function rollKoll(reaktion) {
        let vanligPick = Object.values(emojiSiffror).includes(reaktion);
        if (vanligPick) {
          if (pickladeRoller.includes(reaktion)) {
            return 'ogiltig';
          } else {
            return 'vanlig';
          }
        } else {
          return 'fill';
        }
      }
      //Den här behöver rollkoll så den måste stanna
      async function standardPick(reaktion, noobs) {
        let riktigReact;

        console.log('Kolla om vår reaktion har ett namn ');
        if (reaktion.emoji) {
          console.log("'Den har ett namn!", reaktion.emoji.name);
          riktigReact = reaktion.emoji.name;
        } else {
          console.log('Den har inte ett namn!', reaktion);
          riktigReact = reaktion;
        }
        if (rollKoll(riktigReact) == 'vanlig' && riktigReact != FILL_EMOJI) {
          pickladeRoller.push(riktigReact);
          console.log('Picklade roller just nu är: ', pickladeRoller);
        }

        const end = performance.now();
        const elapsedTime = Math.trunc(end - start);

        let modRader = modMeddelande.split('\n');

        modRader[i] = `${kapitalisera(
          noobs[i].namn
        )} \`[${elapsedTime}ms]\` has picked ${riktigReact}!`;
        modMeddelande = modRader.join('\n');
        try {
          await trådMeddelande.edit(modMeddelande);
        } catch (error) {
          console.error('Failed to edit the message: ', error);
        }
        i++;
      }
      //Den här måste stanna punkt slut
      async function finskaFighten() {
        if (!modFull(modMeddelande)) {
          console.log(
            'Alla noobs har inte valt roll eller fill, vi behöver fler'
          );
          await searchAndDestroy();
        } else {
          console.log(
            'Alla har pickat roll eller fill, nu ska vi kolla om vi behöver byta array'
          );
          if (fillBoys.length > 0) {
            console.log(
              'Vi har boys i fill boys, vi switchar aktiv array, återställer i och kallar på nästa boy'
            );
            if (pickladeRoller.length === 5) {
              collector.stop();
            } else {
              console.log('Nu ska vi kolla om aktiva noobs är dummy array:');
              if (aktivaNoobs == dummyArray) {
                aktivaNoobs = dummyArray.concat(fillBoys);
              }
              await searchAndDestroy();
            }
          } else {
            console.log(
              'Fillboys är tom, vi behöver inte byta och avslutar...'
            );
            snooze(äggKlockan);
            collector.stop();
          }
        }
      }
      //Den här behöver SearchAndDestroy, den stannar
      async function fillBoysNeedFilling(noobs) {
        let modRader = modMeddelande.split('picked');
        if (modRader.length >= 5) {
          await skojareTillrättavisaren(noobs[i], tråden);
        } else {
          //Vi fyller fillBoys med boys looking to fill. Sen hämtar vi nästa person som ska rakas
          console.log('Någon har valt fill, så vi sätter hen i fillboys');
          fillBoys.unshift(dummyArray[i]);
          await standardPick(FILL_EMOJI, noobs);
          await searchAndDestroy();
        }
      }

      collector.on('collect', async (reaction, user) => {
        let kolladReaktion = rollKoll(reaction.emoji.name);

        switch (kolladReaktion) {
          case 'vanlig':
            await standardPick(reaction, aktivaNoobs);
            //Avsluta det hela genom att kalla nya noobs, men bara om vi behöver fler noobs (dvs om modFull inte är full)
            await finskaFighten();
            break;

          case 'ogiltig':
            //Ogiltig roll (mobba!)
            console.log('Någon har gjort funny business, så vi mobbar');
            await dublettTillrättavisaren(aktivaNoobs[i], reaction, tråden);
            break;

          case 'fill':
            fillBoysNeedFilling(aktivaNoobs);
            break;
        }
      });

      collector.on('end', async (collected) => {
        //Stäng av klockan och plocka bort pingmeddelande om det finns
        snooze(äggKlockan);
        if (pingMeddelande) {
          try {
            pingMeddelande.delete();
          } catch (error) {
            console.error(error);
          }
        }
        //Formatera om översta posten
        let modRader = modMeddelande.split('\n');
        let finsktMeddelande = '';
        function aOchO(sträng) {
          console.log(sträng);
          let nySträng = sträng.replace('!', '');
          let aOchO = nySträng.split(' ');
          return `${aOchO[0]} ${emojiDic[aOchO.pop()]} | `;
        }
        for (rad of modRader) {
          if (
            rad.includes(emojiSiffror['1']) ||
            rad.includes(emojiSiffror['2']) ||
            rad.includes(emojiSiffror['3']) ||
            rad.includes(emojiSiffror['4']) ||
            rad.includes(emojiSiffror['5'])
          ) {
            finsktMeddelande += `${aOchO(rad)} `;
            console.log('Den här raden tjongar vi in i aOchO ', rad);
          }
        }
        await embedMaker(
          modMeddelande,
          finsktMeddelande.slice(0, -2),
          trådNamn,
          tråden
        );
      });
    } else {
      meddelande.reply('Wrong amount of dudes, dude!');
    }
  },
};

async function embedMaker(modMeddelande, finsktMeddelande, trådNamn, tråden) {
  const exampleEmbed = new MessageEmbed()
    .setColor('#ff60cc')
    .setTitle(`${trådNamn}`)
    .setDescription(`These are the fates you chose`)
    .setFooter({ text: `${finsktMeddelande}` });

  exampleEmbed.addField('Your picks, sirs...', modMeddelande, false);

  await tråden.send({ embeds: [exampleEmbed] });
}

function adjective() {
  return random([
    'Wholesome',
    'Ruthless',
    'Cringe',
    'Based',
    'Amazing',
    'POGGERS',
    'Neat',
    '1337',
    'Big',
    'Mediocre',
    'Throwing',
    'Nerdy',
    'Stunless',
    'Dramatic',
    'Clowny',
    'Clueless',
    'Gungho',
    'Gamba',
    'Kawaii',
    'Glorious',
    'Farming',
    'Marvelous',
    'AFKing',
    'Filling',
    'Tea-making',
    'Coffee-making',
    'Cocktail-making',
    'friends and ',
    'good players and ',
    'handsome gamers and ',
    'Lame',
    'losers and ',
  ]);
}

function subjective() {
  return random([
    'Party',
    'Gathering',
    'Assembly',
    'Meeting',
    'Meet',
    'Convention',
    'Rally',
    'Congress',
    'Convocation',
    'Conclave',
    'Council',
    'Forum',
    'Get-together',
    'Political Campaign',
    'Number Clicker Gang',
    'Gang',
  ]);
}
