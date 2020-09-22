# Twitter Toxicity Detector
Web app written in Vanilla JS and Tensorflow.js that detects toxicity in the last tweets from the given user.

## Technologies

### HTML + CSS + Javascript
This application is written in vanilla js with HTML and CSS without any framework, using yarn as dependency manager.

A few resources about HTML+CSS+JS: https://www.w3schools.com/
How to use Yarn: https://classic.yarnpkg.com/en/docs/managing-dependencies/

### Tensorflow.js
TensorFlow.js is a library for machine learning in JavaScript.

A few resourses to [get started with Tensorflow.js](https://www.tensorflow.org/js/tutorials).

### Toxicity Classifier
The toxicity model detects whether text contains toxic content such as threatening language, insults, obscenities, identity-based hate, or sexually explicit language. The model was trained on the civil comments dataset: https://figshare.com/articles/data_json/7376747 which contains ~2 million comments labeled for toxicity. The model is built on top of the [Universal Sentence Encoder](https://arxiv.org/pdf/1803.11175.pdf).

For more info visit [the repo](https://github.com/tensorflow/tfjs-models/tree/master/toxicity).

## Setup

Install dependencies and prepare the build directory:

```sh
yarn
```

To watch files for changes, and launch a dev server:

```sh
yarn watch
```

## Screenshot
<div align="center">
  <img src="https://raw.githubusercontent.com/MCarlomagno/assets/master/TwitterToxicityDetectorScreenshot.png" alt="Face recognition auth"/>
</div>

## Demo
https://mcarlomagno.github.io/TwitterToxicityDetector/

## Licence
https://opensource.org/licenses/BSD-3-Clause
