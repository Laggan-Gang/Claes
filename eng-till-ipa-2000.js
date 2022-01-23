// # SVARTVITT #
// Har du någonsin lite engelsk text som ligger och skräpar?
// # FÄRG #
// Släng bara in den i eng-till-ipa-2000 så löser vi allt!
// "Hello, how are you?"
// USCH OCH TVI!
// hʌlowˈ hawˈ ɑˈɹ juˈ
// så ska det se ut!

const fs = require("fs")

if (typeof EngTillIPA !== 'object') {
  EngTillIPA = {};
}

(function () {
  'use strict';

  if (typeof EngTillIPA._IPpslAgsverk !== 'object') {
    EngTillIPA._IPpslAgsverk = {};
  }

  if (typeof EngTillIPA._kollaUpp !== 'function') {
    EngTillIPA._kollaUpp = function (rader) {
      console.log('EngTillIPA: Börjar kolla upp i uppslagsverket...');

      for (var i in rader) {
        var ord = rader[i].split(",");
        EngTillIPA._IPpslAgsverk[ord[0]] = ord[1];
      }

      console.log('EngTillIPA: Kollat klart :-)');
    };
  }

  if (typeof EngTillIPA.laddaUppslagsverk !== 'function') {
    EngTillIPA.laddaUppslagsverk = function () {
      // Väg till ordlistan:
      var OrdlistansPlats = "./eng_ipa.txt";
      console.log(
        'EngTillIPA: Läser uppslagsverk från ' +
          OrdlistansPlats +
          '... det är ganska tråkigt ...'
      );
      var textFil = fs.readFileSync(OrdlistansPlats, 'utf-8');
      EngTillIPA._kollaUpp(textFil.split('\n'));
      console.log('EngTillIPA: Uppslagsverket är laddat!');
    };
  }

  if (typeof EngTillIPA.kollaUpp !== 'function') {
    EngTillIPA.kollaUpp = function (ord) {
      // kolla så uppslagsverket är skapat
      if (Object.keys(EngTillIPA._IPpslAgsverk).length === 0) {
        console.log('Jag tror inte du har något Uppslagsverk laddat');
      } else {
	//console.log(EngTillIPA._IPpslAgsverk)
        //  Öh det här är för att vissa ord inte finns i listan ( typ dom svenska )
        if (typeof EngTillIPA._IPpslAgsverk[ord] != 'undefined') {
          var text = EngTillIPA._IPpslAgsverk[ord];

          //console.log("jag returnar"  + text + ".")
          return text.trim();

        // Dom orden kan vi slänga tillbaka som dom är
        } else {
          return ord;
        }
      }
    };
  }
})();

module.exports.ladda = () => { 
  EngTillIPA.laddaUppslagsverk()
};
module.exports.kolla = (ord) => { 
  return EngTillIPA.kollaUpp(ord) 
};
