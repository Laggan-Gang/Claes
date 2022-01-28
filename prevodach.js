const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

// PLEASE DONT STEAL THIS
// GCP SECRET VALUE ?
const { swekey } = require('./config.json');
var endpoint = 'https://api.cognitive.microsofttranslator.com';

module.exports.swedishToEnglish = async (message) => {
  const translation = await translate(message, ['en']);

  // return only english FOR NOW
  console.log('Här är bara translation ', translation);
  console.log(message);

  return translation[0].translations.find(
    (t) => console.log('Här kommer t', t) || t.to == 'en'
  ).text;
};

async function translate(message, targetLanguages) {
  const request = {
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': swekey,
      // Add your location, also known as region. The default is global.
      // This is required if using a Cognitive Services resource.
      'Ocp-Apim-Subscription-Region': 'westeurope',
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString(),
    },
    params: {
      'api-version': '3.0',
      'to': targetLanguages,
    },
    data: [
      {
        text: message,
      },
    ],
    responseType: 'json',
  };

  try {
    const response = await axios(request);
    return response.data;
  } catch (e) {
    // YELL IN THE CONSOLE FOR NO GOOD REASON :)
    console.error(e);
  }
}
