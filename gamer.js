const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const STEN = "✊"
const SAX = "✌"
const PÅSE = "✋"
const KRYSS = ["❌","🙅","❎"]
const CIRKEL = ["🔴","🟡","🟢"]
const KVADRAT = "⬜"
let matchID = 0

module.exports = {
  förstå: async (något) => {
    console.log("GAMING ANALYSIS: ENGAGED")
    let hurGårDet = {
      jättebra: false,
      meddelande:
        'Du är inte ens ett något',
      matchid: 0,
      vinnare: undefined,
    }; 
    // {}.toString.call(något) 
    if(typeof(något) == "object"){
      if(typeof(något.content) == "string"){
        // Hit kommer alla meddelanden!

	      console.log("Det här verkar vara ett något!")
        const vadJagSkaGöra = något.content.toLocaleLowerCase().split(' ');
        const utmanad = vadJagSkaGöra[1];
        const spel = vadJagSkaGöra[2];
        
        matchID += 1;

        console.log(spel)
  
        switch (spel) {
          case 'treirad':
          case 'tictactoe':
          case 'ttt':
          case 'tir':
            hurGårDet = await treIRad(hurGårDet,något.author,något.mentions.users.at(0));
            console.log("Nu är det färdigtreiradat.")
            break;
          case 'stensaxpåse':
          case 'rockpaperscissors':
          case 'ssp':
          case 'rps':
          case 'stenpåsesax':
          case 'stensaxpapper':
          case 'rockscissorspaper':
            hurGårDet = await stensaxpåse(hurGårDet,något.author,något.mentions.users.at(0));
            console.log("Nu har stenarna saxpåsats.")
            break;
          case undefined:
            hurGårDet = await förklaraVadChallengeGörIEttFintMeddelande(hurGårDet,något)
            console.log("Nu har jag förklarat vad meningen med livet är.")
            break;
  	    }
      }
    } else if(Array.isArray(något)){
      if(något[0] == "asd");
        console.log("Öh va? Det här borde aldrig hända...")
    };
    return hurGårDet;
  },
};


async function förklaraVadChallengeGörIEttFintMeddelande(hurGårDet,något){
  // Den här embedden görs längst ned för att inte ta en massa plats här
  ingosad = förklaraVadUtmanaGörIEttFintMeddelandeIngos
  embed = explainWhatChallengeDoesInAPrettyMessageEmbed
  try {
    if(något.content.includes('utman')){
      något.channel.send({embeds: [ingosad]})
    } else {
      något.channel.send({embeds: [embed]})
    }
    hurGårDet.jättebra = true
  } catch (error) {
    hurGårDet.jättebra = false
    console.error(error)
  }
  return hurGårDet
}
 
// TRE I RAD!!1
    
async function treIRad(hurGårDet,utmanare,utmanad,igen = false) {
  plan = [ [0,0,0],[0,0,0],[0,0,0] ]
  rundaDelatPåTvå = 0 // Det blir ju max 9 rundor = 8 rundor + en som är tvingad = 4*2 rundor
  över = false
  console.log("Börjar ny tre-i-rad-match.")
  while(!över){ //Loopa här tills någon vinner
    plan = await skickaTreIRadUtmaning(plan,KRYSS,utmanare, igen)
    över = harNågonVunnitPåDenHärPlanenNuEllerSkaViKanskeKöraEnRundaTill(plan)
    hurGårDet.vinnare = utmanare
    if(!över){
      plan = await skickaTreIRadUtmaning(plan,CIRKEL,utmanad,igen)  
      över = harNågonVunnitPåDenHärPlanenNuEllerSkaViKanskeKöraEnRundaTill(plan)
      hurGårDet.vinnare = utmanad
    }
    rundaDelatPåTvå += 1
    if(!över && rundaDelatPåTvå > 3){
      över = true
      // Gör det sista draget automatiskt och kolla ifall någon vann
      for (let i = 0; i < 3; i++){
        if(plan[i].includes(0)){
          plan[i][plan[i].indexOf(0)] = 1 //1 börjar alltid så hen har sista draget
        }
      }
      console.log(plan)
      if(harNågonVunnitPåDenHärPlanenNuEllerSkaViKanskeKöraEnRundaTill(plan)){
        hurGårDet.vinnare = utmanare
      } else {
        utmanad.send("Rats! It's a tie. Here's the final board:")
        utmanare.send("Rats! It's a tie. Here's the final board:")
        sändPlan(plan,utmanad)
        sändPlan(plan,utmanare)
        hurGårDet.vinnare = undefined
      }
    }
  }
  hurGårDet.jättebra = true
  hurGårDet.meddelande = "Rätt bra faktiskt!"
  if(hurGårDet.vinnare != undefined){
    if(hurGårDet.vinnare == utmanare){
      utmanare.send("Number one victory real B)")
      utmanare.send("Here's the final board:")
      utmanad.send("You lost... but they probably cheated anyways.")
      utmanad.send("Here's the final board:")
      sändPlan(plan,utmanad)
      sändPlan(plan,utmanare)
    } else {
      utmanad.send("Number one victory real B)")
      utmanad.send("Here's the final board:")
      utmanare.send("You lost... but they probably cheated anyways.")
      utmanare.send("Here's the final board:")
      sändPlan(plan,utmanad)
      sändPlan(plan,utmanare)
    }
    hurGårDet.vinnare.send("You won! Congratulations :)")
  }
  return hurGårDet 
}

async function sändPlan(plan,kämpe){
  poängEmoji = {
    "-1": CIRKEL,
    "0":  KVADRAT,
    "1":  KRYSS,
  }
  
  sträng = ["","",""]
  for (let i=0; i < 3; i++){
    sträng[i] = ""
    for (let j=0; j < 3; j++){
      sträng[i] += poängEmoji[plan[i][j]][0]
    }
  }
  await kämpe.send(sträng[0])
  await kämpe.send(sträng[1])
  await kämpe.send(sträng[2])
};


async function skickaTreIRadUtmaning( plan, EMOJI, kämpe, score, igen = false){
  const jagLovarPåHederOchSamvete = new Promise(async (jagKirrar, jagBajsar) => {
    
    poängEmoji = {
      "-1": CIRKEL,
      "0":  KVADRAT,
      "1":  KRYSS,
    }

    if(EMOJI == KRYSS){
      score = 1
    } else {
      score = -1
    }

    sträng = ["","",""]
    for (let i=0; i < 3; i++){
      sträng[i] = ""
      for (let j=0; j < 3; j++){
        sträng[i] += poängEmoji[plan[i][j]][0]
      }
    }
    
    console.log(sträng)
    
    const sänt0 = await kämpe.send(sträng[0])
    const sänt1 = await kämpe.send(sträng[1])
    const sänt2 = await kämpe.send(sträng[2])
    const reaktionsSamlare0 = sänt0.createReactionCollector({ time: 40_000 });
    const reaktionsSamlare1 = sänt1.createReactionCollector({ time: 40_000 });
    const reaktionsSamlare2 = sänt2.createReactionCollector({ time: 40_000 });
    reaktionsSamlare0.on('collect', (reaction, user) => {
      if(reaction.count == 2){
        index = EMOJI.indexOf(reaction._emoji.name)
        if (plan[0][index] == 0){
          plan[0][index] = score
          reaktionsSamlare0.stop();
          reaktionsSamlare1.stop();
          reaktionsSamlare2.stop();
          jagKirrar(plan);
        };
      };
    });
    reaktionsSamlare1.on('collect', (reaction, user) => {
      if(reaction.count == 2){
        index = EMOJI.indexOf(reaction._emoji.name)
        if (plan[1][index] == 0){
          plan[1][index] = score
          reaktionsSamlare0.stop();
          reaktionsSamlare1.stop();
          reaktionsSamlare2.stop();
          jagKirrar(plan);
        };
      };
    });
    reaktionsSamlare2.on('collect', (reaction, user) => {
      if(reaction.count == 2){
        index = EMOJI.indexOf(reaction._emoji.name)
        if (plan[2][index] == 0){
          plan[2][index] = score
          reaktionsSamlare0.stop();
          reaktionsSamlare1.stop();
          reaktionsSamlare2.stop();
          jagKirrar(plan);
        };
      };
    });
    for (let i = 0; i<3; i++){
      sänt0.react(EMOJI[i]);
      sänt1.react(EMOJI[i]);
      sänt2.react(EMOJI[i]);
    }
  });
  return jagLovarPåHederOchSamvete
};

function harNågonVunnitPåDenHärPlanenNuEllerSkaViKanskeKöraEnRundaTill(plan){
  let kolonnsummor = [0,0,0]
  let radsummor = [0,0,0]
  let diagonalsummor = [0,0]
  for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
          kolonnsummor[j] += plan[i][j]
          radsummor[i] += plan[i][j]
          if(i==j){ diagonalsummor[0] += plan[i][j] }
          if(i==2-j){ diagonalsummor[1] += plan[i][j] }     
      }
  }
  console.log("HÄR ÄR SUMMORNA")
  console.log(kolonnsummor,radsummor,diagonalsummor)
  // Max of abs of array
  kolonnsumma = Math.max.apply(null, kolonnsummor.map(Math.abs));
  radsumma = Math.max.apply(null, radsummor.map(Math.abs));
  diagonalsumma = Math.max.apply(null, diagonalsummor.map(Math.abs));
  return Math.max(kolonnsumma, radsumma, diagonalsumma) > 2
}
	
// STEN SAX PÅSE!!1
    
async function stensaxpåse(hurGårDet,utmanare,utmanad,igen = false) {
  console.log("Börjar ny stensaxpåse-match.")
  const [spelareEtt, spelareTvå] = await Promise.all([skickaUtmaning(utmanare,igen), skickaUtmaning(utmanad,igen)])  
  if (spelareEtt != undefined || spelareTvå != undefined){
    if (spelareEtt == spelareTvå) {
      console.log("Det blev lika!")
      hurGårDet = await stensaxpåse(hurGårDet,utmanare,utmanad,true)
      return hurGårDet
    } else {
    switch(spelareEtt){
      case STEN:
        if(spelareTvå == SAX){
          hurGårDet["vinnare"] = utmanare
        } else {
          hurGårDet["vinnare"] = utmanad
        }
        break;
      case SAX:
        if(spelareTvå == PÅSE){
          hurGårDet["vinnare"] = utmanare
        } else {
          hurGårDet["vinnare"] = utmanad
        }
        break;
      case PÅSE:
        if(spelareTvå == STEN){
          hurGårDet["vinnare"] = utmanare
        } else {
          hurGårDet["vinnare"] = utmanad
        }
        break;
    }
    hurGårDet.jättebra = true
    hurGårDet.meddelande = "Rätt bra faktiskt!"
    hurGårDet.vinnare.send("You won! Congratulations :)")
    return hurGårDet 
    }
  } else {
  hurGårDet.jättebra = false
  return hurGårDet
  }
}
async function skickaUtmaning(kämpe, igen = false){
  const jagLovarPåHederOchSamvete = new Promise(async (jagKirrar, jagBajsar) => {
    let pick = undefined
    const filter = (reaction, user) => (reaction.emoji.name == STEN) || (reaction.emoji.name == SAX) || (reaction.emoji.name == PÅSE)
    
    if(igen) {
      sträng = "hoppsan, det blev visst lika! Vi försöker igen :)"
    } else {
      sträng = "YOU HAVE BEEN CHALLENGED TO A GAME OF ROCK PAPER SCISSORS! REACT WITH YOUR PICK BELOW!!!1"
    }
    
    const sänt = await kämpe.send(sträng)
    const reaktionsSamlare = sänt.createReactionCollector({ filter, time: 20_000 });
    reaktionsSamlare.on('collect', (reaction, user) => {
      if(reaction.count == 2){
        console.log(reaction._emoji.name)
        pick = reaction._emoji.name;
        reaktionsSamlare.stop();
      };
    });
    reaktionsSamlare.on('end', (reaction, user) => {
      //return fast async??
      jagKirrar(pick);
    });
    sänt.react(PÅSE);
    sänt.react(STEN);
    sänt.react(SAX);
  });
  return jagLovarPåHederOchSamvete
};


// EMBEDS OCH ANNAT SKIT

const förklaraVadUtmanaGörIEttFintMeddelandeIngos = new MessageEmbed()
  .setColor('#20993f')
  .setTitle('G4M3R M0D3 4C71V473!')
  .setURL('https://youtube.com/c/CircuzFunPants')
  .setAuthor({ name: 'CL435 7H3 G4M3R', iconURL: "https://raw.githubusercontent.com/Laggan-Gang/Claes/main/gamer_pfp.png", url: 'https://youtube.com/c/CircuzFunPants'})
  .setDescription('Åh ja... DET HÄR är gamerläge.')
  .addFields(
    { name: 'Sten sax påse', value: `För att utmana någon i sten sax påse, skriv \n'!utmana @[DERAS ANVÄNDARNAMN] stensaxpåse'.`},
  )
  .setFooter({ text: "Om du kan läsa det här står du för nära."})

const explainWhatChallengeDoesInAPrettyMessageEmbed = new MessageEmbed()
  .setColor('#20993f')
  .setTitle('G4M3R M0D3 4C71V473!')
  .setURL('https://youtube.com/c/CircuzFunPants')
  .setAuthor({ name: 'CL435 7H3 G4M3R', iconURL: "https://raw.githubusercontent.com/Laggan-Gang/Claes/main/gamer_pfp.png", url: 'https://youtube.com/c/CircuzFunPants'})
  .setDescription('Oh yeah... THIS is gamer mode.')
  .addFields(
    { name: 'Rock paper scissors', value: `To challenge someone for a game of rock paper scissors, type \n'!challenge @[THEIR USERNAME] rockpaperscissors'.`},
  )
  .setFooter({ text: "If you're reading this, you're a n00b"})
