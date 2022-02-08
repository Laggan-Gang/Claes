const maakepCall = require('./bajs.js');
const { DiscordAPIError, MessageEmbed } = require('discord.js');

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
  console.log('Modrader är nu ' + modRader.length);
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
    trängningsMeddelande.delete();
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
    console.log('Nooben i fråga har ett ID ', noob.id);
    return noob.id;
  } else {
    console.log('Nooben har inte ett id ' + noob.namn);
    console.log(noob);
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
    if (gubbLängdsKollare.length == 6) {
      const lastItem = gubbLängdsKollare.pop();
      const newTimeout = parseInt(lastItem, 10);
      console.log(gubbLängdsKollare.length);

      if (isNaN(newTimeout)) {
        meddelande.reply(
          `I don't know what this ${lastItem} is but it ain't a number for sure 🤔. Using standard ${
            LAGGAN_APPROVED_TARDYNESS / 1000
          }s of delay.`
        );
      } else {
        LAGGAN_APPROVED_TARDYNESS = newTimeout;

        if (newTimeout / 1000 < 1) {
          meddelande.reply(
            `I like your style. Using ${
              newTimeout / 1000
            }s of delay. Better go quick 🦾🦾🦾`
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
      let trådNamn = `The ${meddelande.member.displayName} party`;

      let i = 0;
      let dummyArray = await maakepCall.maakepCall(gubbLängdsKollare.join(' '));
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
        console.log('Logging, ', dummy);
        modMeddelande += `${kapitalisera(dummy.namn)}...\n`;
        console.log('modMeddelande: ' + modMeddelande);
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
      const emojiSiffror = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];
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

      searchAndDestroy(dummyArray, 199);

      const collector = trådMeddelande.createReactionCollector({
        filter: (_, user) => !user.bot,
        time: 360_000,
        max: 100,
      });
      //Den här stannar pga rollKoll
      function skufflaPreferens() {
        let slumpadeEmojis = shuffleArray(emojiSiffror);
        for (emoji in slumpadeEmojis) {
          if (rollKoll(slumpadeEmojis[emoji]) == 'vanlig') {
            return slumpadeEmojis[emoji];
          }
        }
      }
      //Den här stannar eftersom den använder rollKoll
      function hittaOchKollaPreferens(noobs) {
        //kolla om vår noob har en preferens, har den det så nice
        switch (true) {
          case pickladeRoller.length == 4:
            console.log(
              'Picklade roller säger att det bara finns 1 roll kvar så fuck this'
            );
            break;
          case noobs[i].preferences !== undefined:
            console.log(
              'Vi hittade preferenser för ' + noobs[i] + ' de ser ut såhär',
              noobs[i].preferences
            );
            let preferenser = noobs[i].preferences;
            for (föredragen of preferenser) {
              if (rollKoll(emojiSiffror[föredragen - 1]) == 'vanlig') {
                console.log('Vi hittade preferensen ' + föredragen);
                console.log(
                  'Så emojin vi skickar är ' + emojiSiffror[föredragen - 1]
                );
                //Vi använder roll-koll för att hitta vad som räknas som en "vanlig" pick och sen tjongar vi iväg den. Det är funky när vi översätter preferens till emojiSiffror eftersom
                //Den ena börjar på 0 och den andra på 1 men det verkar funka :)
                return emojiSiffror[föredragen - 1];
              }
            }
            return '<:fill:935684531023925299>';
        }
        console.log('Vi shufflar personens preferens pga yolo');
        return skufflaPreferens();
      }
      //Den här kör finska fighten bla så den måste stanna
      async function autoPicker(reaktion, noobs) {
        console.log(
          'Nu kör vi automatiska versionen! Först kollar vi om vi fått fill'
        );
        if (reaktion == 'fill' || reaktion == '<:fill:935684531023925299>') {
          console.log(reaktion + 'är fill! Vi kör fillBoys');
          fillBoysNeedFilling(noobs);
        } else {
          console.log(
            'Det är inte fill, så auto picker låter ' +
              noobs[i] +
              ' picka ' +
              reaktion
          );
          await standardPick(reaktion, noobs, LAGGAN_APPROVED_TARDYNESS / 1000);
          console.log('Sen hämta nästa noob!');
          await finskaFighten(noobs);
        }
      }
      //Den här använder Hittaochkollapreferens som använder roll koll
      async function searchAndDestroy(noobs, row) {
        //destroy the last message
        try {
          await pingMeddelande.delete();
        } catch (error) {
          console.error('Failed to delete the message: ', error);
        }
        //seach for new guy
        try {
          let föredragen = hittaOchKollaPreferens(noobs);
          let pingNoob = vadKallasDu(aktivaNoobs[i]);
          pingMeddelande = await tråden.send(
            `${pingNoob}, your turn to pick. If you do not pick within 60 seconds you will be assigned ${föredragen}`
          );
          console.log(
            `${pingNoob} kommer asignas ${föredragen} om ${
              LAGGAN_APPROVED_TARDYNESS / 1000
            } sekunder, ${row}`
          );
          //Vi sätter en äggklocka, men ser först till att vi avslutar den tidigare (om det finns någon)
          snooze(äggKlockan);

          console.log('Timern är just nu på: ' + LAGGAN_APPROVED_TARDYNESS);
          äggKlockan = setTimeout(async function () {
            await autoPicker(föredragen, aktivaNoobs);
          }, LAGGAN_APPROVED_TARDYNESS);
        } catch (error) {
          console.error('Failed to send the message: ', error);
        }
      }
      //Den här behöver en lokal picklade roller, så den måste stanna
      function rollKoll(reaktion) {
        let vanligPick = emojiSiffror.includes(reaktion);
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
      async function standardPick(reaktion, noobs, timeToPick) {
        let riktigReact;

        const start = performance.now();

        console.log('Kolla om vår reaktion har ett namn ');
        if (reaktion.emoji) {
          console.log("'Den har ett namn!", reaktion.emoji.name);
          riktigReact = reaktion.emoji.name;
        } else {
          console.log('Den har inte ett namn!', reaktion);
          riktigReact = reaktion;
        }
        if (rollKoll(riktigReact) == 'vanlig') {
          pickladeRoller.push(riktigReact);
          console.log('Picklade roller just nu är: ', pickladeRoller);
        }

        const end = performance.now();
        const elapsedTime =
          timeToPick || parseFloat(end - start).toFixed(2) * 1000;

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
      async function finskaFighten(noobs) {
        //snooze(äggKlockan);
        if (!modFull(modMeddelande)) {
          console.log(
            'Alla noobs har inte valt roll eller fill, vi behöver fler'
          );
          await searchAndDestroy(noobs, 340);
        } else {
          console.log(
            'Alla har pickat roll eller fill, nu ska vi kolla om vi behöver byta array'
          );
          if (fillBoys.length > 0) {
            console.log(
              'Vi har boys i fill boys, vi switchar aktiv array, återställer i och kallar på nästa boy'
            );
            if (pickladeRoller.length === 5) {
              console.log(
                'Vi har alla roller pickade, rollerna är ',
                pickladeRoller
              );
              console.log('Alltså kan vi avsluta');
              //snooze(äggKlockan);
              collector.stop();
            } else {
              console.log('Nu ska vi kolla om aktiva noobs är dummy array:');
              console.log(aktivaNoobs == dummyArray);
              if (aktivaNoobs == dummyArray) {
                aktivaNoobs = dummyArray.concat(fillBoys);
                console.log(
                  'Nu försöker vi tjonga in fillBoys i aktivaNoobs, aktiva noobs ser ut såhär: '
                );
                console.log(aktivaNoobs);
                console.log('Index ligger på: ' + i);
                //i = 0;
              }
              console.log('Nu ska vi börja tjonga fill boys, och i = ' + i);
              //aktivaNoobs = fillBoys;
              //console.log('Här är fill boys: ');
              //console.log(fillBoys[i]);
              await searchAndDestroy(aktivaNoobs, 361);
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
        if (modRader.length >= 6) {
          console.log(
            'Nu är modrader för lång, nu får man inte fill och nu kommer mobbningen'
          );
          await skojareTillrättavisaren(noobs[i], tråden);
        } else {
          //Vi fyller fillBoys med boys looking to fill. Sen hämtar vi nästa person som ska rakas
          console.log('Någon har valt fill, så vi sätter hen i fillboys');
          fillBoys.unshift(dummyArray[i]);
          await standardPick('<:fill:935684531023925299>', noobs);
          await searchAndDestroy(noobs, 419);
        }
      }

      collector.on('collect', async (reaction, user) => {
        console.log(
          'Vi har fått en react och ska nu utvärdera om den är vanlig, dublett eller fill'
        );
        let kolladReaktion = rollKoll(reaction.emoji.name);
        switch (true) {
          case kolladReaktion == 'vanlig':
            console.log(
              'Picken är vanlig, så vi kör standardPick. Efter det här utvärderar vi om vi behöver fler noobs eller inte.'
            );
            //om det är en standard pick
            await standardPick(reaction, aktivaNoobs);
            //Avsluta det hela genom att kalla nya noobs, men bara om vi behöver fler noobs (dvs om modFull inte är full)
            await finskaFighten(aktivaNoobs);
            break;

          case kolladReaktion == 'ogiltig':
            //Ogiltig roll (mobba!)
            console.log('Någon har gjort funny business, så vi mobbar');
            await dublettTillrättavisaren(aktivaNoobs[i], reaction, tråden);
            break;

          case kolladReaktion == 'fill':
            fillBoysNeedFilling(aktivaNoobs);
            break;
        }
      });

      collector.on('end', async (collected) => {
        console.log('NU ÄR VI FÖRMODLIGEN KLARA');
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
          return `${aOchO[0]} ${emojiDic[aOchO.pop()]}`;
        }
        for (rad of modRader) {
          if (
            rad.includes(emojiSiffror[0]) ||
            rad.includes(emojiSiffror[1]) ||
            rad.includes(emojiSiffror[2]) ||
            rad.includes(emojiSiffror[3]) ||
            rad.includes(emojiSiffror[4])
          ) {
            finsktMeddelande += `${aOchO(rad)} `;
            console.log('Den här raden tjongar vi in i aOchO ', rad);
          }
        }
        await embedMaker(modMeddelande, finsktMeddelande, trådNamn, tråden);
      });
    } else {
      meddelande.reply('Wrong amount of dudes, dude!');
    }
  },
};

async function embedMaker(modMeddelande, finsktMeddelande, trådNamn, tråden) {
  console.log(modMeddelande);
  const exampleEmbed = new MessageEmbed()
    .setColor('#ff60cc')
    .setTitle(`${trådNamn}`)
    .setDescription(`These are the fates you chose`)
    .setFooter({ text: `${finsktMeddelande}` });

  exampleEmbed.addField('Your picks, sirs...', modMeddelande, false);

  await tråden.send({ embeds: [exampleEmbed] });
}

//BELOW THIS LINE IS AUTHENTIC MAAKEP CODE, DO NOT MAKE ANY CHANGES AS IT IS THE ENGINE WHICH DRIVES THE ENTIRE PROJECT\\

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//ABOVE THIS LINE IS AUTHENTIC MAAKEP CODE, DO NOT MAKE ANY CHANGES AS IT IS THE ENGINE WHICH DRIVES THE ENTIRE PROJECT\\
