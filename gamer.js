const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const STEN  = "✊"
const SAX = "✌"
const PÅSE = "✋"
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
