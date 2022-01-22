// # SVARTVITT #
// Har du någonsin lite engelsk text som ligger och skräpar?
// # FÄRG #
// Släng bara in den i eng-till-ipa-2000 så löser vi allt!
// "Hello, how are you?"
// USCH OCH TVI!
// hʌlowˈ hawˈ ɑˈɹ juˈ
// så ska det se ut!

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
        var ord = rader[i].split(/\s+/g);
        EngTillIPA._IPpslAgsverk[ord[0]] = ord[1];
      }

      console.log('EngTillIPA: Kollat klart :-)');
    };
  }

  if (typeof EngTillIPA.laddaUppslagsverk !== 'function') {
    EngTillIPA.laddaUppslagsverk = function () {
      // Väg till ordlistan:
      OrdlistansPlats = './eng_ipa.txt';
      console.log(
        'EngTillIPA: Läser uppslagsverk från ' +
          OrdlistansPlats +
          '... det är ganska tråkigt ...'
      );

      var textFil = new XMLHttpRequest();

      textFil.open('GET', OrdlistansPlats, true);

      textFil.onreadystatechange = function () {
        // If document is ready to parse...
        if (textFil.readyState == 4) {
          // And file is found...
          if (textFil.status == 200 || textFil.status == 0) {
            // Load up the ipa dict
            EngTillIPA._kollaUpp(textFil.responseText.split('\n'));
          }
        }

        textFil.send(null);
      };
      console.log('EngTillIPA: Uppslagsverket är laddat!');
    };
  }

  if (typeof EngToIPA.kollaUpp !== 'function') {
    EngToIPA.kollaUpp = function (ord) {
      // kolla så uppslagsverket är skapat
      if (Object.keys(EngToIPA._IPpslAgsverk).length === 0) {
        console.log(
          'Jag tror inte du har något Uppslagsverk laddat'
        );
      } else {
        //  Öh det här är för att vissa ord inte finns i listan ( typ dom svenska )
        if (typeof EngTillIPA._IPpslAgsverk[ord] != 'undefined') {
          var text = EngTillIPA._IPpslAgsverk[ord];

          return text;

          // Dom orden kan vi slänga tillbaka som dom är
        } else {
          return ord;
        }
      }
    };
  }
})();
