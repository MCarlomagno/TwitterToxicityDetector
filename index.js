import * as toxicity from '@tensorflow-models/toxicity';

const enviroment = 'https://toxicity-classifier-server.herokuapp.com';
const enviromentDev = 'http://localhost:8080';

let model;
let tweetsToSearch = 10;

const classify = async (inputs) => {
  const results = await model.classify(inputs);
  return inputs.map((d, i) => {
    const obj = {'text': d};
    results.forEach((classification) => {
      obj[classification.label] = classification.results[i].match;
    });
    return obj;
  });
};

const notFound = () => {
  var results = document.getElementById("results");
  var element = document.createElement('p');
  element.textContent = 'No toxic tweets found 🤷';
  results.appendChild(element);
}

const onTweetsNumberChange = (e) => {
  tweetsToSearch = e.target.value;

  if(tweetsToSearch > 20) {
    // shows tweet number warning
    document.getElementById("tweets-number-warning").style.display="block";
  } else {
    // hides tweet number warning
    document.getElementById("tweets-number-warning").style.display="none";
  }
}

const fetchTweets = async (text) => {
    console.log(`searching tweets from ${text}`);

    // fetch tweets from server
    const result = await fetch(`${enviroment}/twits/${text}/${tweetsToSearch}`);
    const response = await result.json();

    return response.body;
}

const showResults = (predictions) => {
  let found = false;

  predictions.map((p) => {
    if(p.toxicity !== false) {
      found = true;
      var results = document.getElementById("results");
      var element = document.createElement('p');
      element.textContent = p.text;
      results.appendChild(element);
    }
  });

  if(!found) {
    notFound();
  }
}

const viewOnLoading = () => {
    document.getElementById("results-title").style.visibility = "hidden";
    document.getElementById("loader").style.display="block";
    document.getElementById("results").innerHTML = "";
}

const viewOnFinish = () => {
    document.getElementById("results-title").style.visibility = "hidden";
    document.getElementById("loader").style.display="block";
    document.getElementById("results").innerHTML = "";
}

const startUp = async () => {
  document.getElementById("loader").style.display="block";  

  model = await toxicity.load(0.7, ['toxicity']);

  // hides loader and shows main
  document.getElementById("loader").style.display="none";

  document.getElementById('select').onchange = onTweetsNumberChange;
  
  // listen the search event and fetchs twits
  document.querySelector('#search-button')
      .addEventListener('click', async (e) => {

        // takes the value of the text field
        const text = document.querySelector('#twitter-user-input').value;

        if(text.length > 0) {

          // shows loader and hides results
          viewOnLoading();

          const tweets = await fetchTweets(text);

          // shows warning
          document.getElementById("warning").style.display="block";
  
  
          let predictions = [];
          predictions = await classify(tweets);

          // shows loader and hides results
          viewOnFinish();
  
          showResults(predictions)
        }

      });
};

startUp();