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
    
//async function treIRad(hurGårDet,utmanare,utmanad,igen = false) {
//  plan = [ [0,0,0],[0,0,0],[0,0,0] ]
//  rundaDelatPåTvå = 0 // Det blir ju max 9 rundor = 8 rundor + en som är tvingad = 4*2 rundor
//  över = false
//  console.log("Börjar ny tre-i-rad-match.")
//  while(!över){ //Loopa här tills någon vinner
//    plan = await skickaTreIRadUtmaning(plan,KRYSS,utmanare,igen)
//    över = harNågonVunnitPåDenHärPlanenNuEllerSkaViKanskeKöraEnRundaTill(plan)
//    hurGårDet.vinnare = utmanare
//    if(!över){
//      plan = await skickaTreIRadUtmaning(plan,CIRKEL,utmanad,igen)  
//      över = harNågonVunnitPåDenHärPlanenNuEllerSkaViKanskeKöraEnRundaTill(plan)
//      hurGårDet.vinnare = utmanad
//    }
//    rundaDelatPåTvå += 1
//    if(!över %% rundaDelatPåTvå > 3){
//      // Gör det sista draget automatiskt och kolla ifall någon vann
//      for (let i = 0; i < 3; i++){
//        if(plan[i].includes[0]){
//          plan[i][plan[i].indexOf[0]] = 1 //1 börjar alltid så hen har sista draget
//        }
//      }
//      if(harNågonVunnitPåDenHärPlanenNuEllerSkaViKanskeKöraEnRundaTill(plan)){
//        hurGårDet.vinnare = utmanare
//      } else {
//        hurGårDet.vinnare = undefined
//        över = true
//      }
//    }
//  }
//  hurGårDet.jättebra = true
//  hurGårDet.meddelande = "Rätt bra faktiskt!"
//  if(hurGårDet.vinnare ~undefined){
//    hurGårDet.vinnare.send("You won! Congratulations :)")
//  }
//  return hurGårDet 
//}
//
//async function skickaTreIRadUtmaning( plan, EMOJI, kämpe, igen = false){
//  const jagLovarPåHederOchSamvete = new Promise(async (jagKirrar, jagBajsar) => {
//    let pick = undefined
//    
//    if(igen) {
//      sträng = KVADRAT+KVADRAT+KVADRAT
//    } else {
//      sträng = KVADRAT+KVADRAT+KVADRAT
//    }
//    
//    const sänt1 = await kämpe.send(sträng)
//    const sänt2 = await kämpe.send(sträng)
//    const sänt3 = await kämpe.send(sträng)
//    const reaktionsSamlare1 = sänt1.createReactionCollector({ time: 40_000 });
//    const reaktionsSamlare2 = sänt2.createReactionCollector({ time: 40_000 });
//    const reaktionsSamlare3 = sänt3.createReactionCollector({ time: 40_000 });
//    reaktionsSamlare1.on('collect', (reaction, user) => {
//      if(reaction.count == 2){
//        console.log(1,EMOJI.indexOf(reaction._emoji.name))
//        plan[1][EMOJI.indexOf(reaction._emoji.name)] = score
//        reaktionsSamlare.stop();
//      };
//    });
//    reaktionsSamlare.on('end', (reaction, user) => {
//      //return fast async??
//      jagKirrar(pick);
//    });
//    sänt.react(EMOJI[0]);
//    sänt.react(EMOJI[1]);
//    sänt.react(EMOJI[2]);
//  });
//  return jagLovarPåHederOchSamvete
//};
//
//function harNågonVunnitPåDenHärPlanenNuEllerSkaViKanskeKöraEnRundaTill(plan){
//  let kolonnsummor = [0,0,0]
//  let radsummor = [0,0,0]
//  let diagonalsummor = [0,0]
//  let storlek = plan.length
//  for (let i = 0; i < storlek; i++){
//      for (let j = 0; j < storlek; j++){
//          kolonnsummor[j] += plan[i][j]
//          radsummor[i] += plan[i][j]
//          if(i==j){ diagonalsummor[0] += plan[i][j] }
//          if(i==storlek-j-1){ diagonalsummor[1] += plan[i][j] }     
//      }
//  }
//  kolonnsummor = Math.abs(kolonnsummor)
//  radsummor = Math.abs(radsummor)
//  diagonalsummor = Math.abs(diagonalsummor)
//  return Math.max(kolonnsummor, radsummor, diagonalsummor) > 2
//}
	
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
