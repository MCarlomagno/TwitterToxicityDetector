import * as toxicity from '@tensorflow-models/toxicity';

const enviroment = 'https://toxicity-classifier-server.herokuapp.com';
const enviromentDev = 'http://localhost:3000';

let model;

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

const startUp = async () => {
  // shows loader and hides main
  document.getElementById("loader").style.display="block";  

  // loads the model
  model = await toxicity.load(0.7, ['toxicity']);

  // hides loader and shows main
  document.getElementById("loader").style.display="none"; 
  
  // listen the search event and fetchs twits
  document.querySelector('#search-button')
      .addEventListener('click', async (e) => {

        // shows loader and hides results
        document.getElementById("results-title").style.visibility = "hidden";
        document.getElementById("loader").style.display="block";
        document.getElementById("results").innerHTML = "";
        
        // takes the value of the text field
        const text = document.querySelector('#twitter-user-input').value;
        console.log(`searching tweets from ${text}`);
        
        // fetch tweets from server
        const result = await fetch(`${enviroment}/twits/${text}/100`);

        console.log('data fetched');
        const response = await result.json();
        const tweets = response.body;


        // shows the bubbles animation on the bottom
        console.log(tweets);

        console.log('starting predictions');

        // shows warning
        document.getElementById("warning").style.display="block";
        const start = Date.now();

        let predictions = [];
        predictions = await classify(tweets);

        // hides loader and shows results
        document.getElementById("loader").style.display="none";
        document.getElementById("results-title").style.visibility = "visible";
        // hides warning
        document.getElementById("warning").style.display="none";

        console.log(predictions);

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
       
       const millis = Date.now() - start;
       console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
      });
};

startUp();