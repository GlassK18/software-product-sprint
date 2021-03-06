// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['I love to create characters.', 'I am writing a web comic.', 'I have a twin sister.', 'I love the Lightning Thief Musical.', 'Doctor Who is my favorite show ever.'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function addDataContent(){
  console.log('Fetching content.');

  // The fetch() function returns a Promise because the request is asynchronous.
  const responsePromise = fetch('/data');

  // When the request is complete, pass the response into handleResponse().
  responsePromise.then(handleResponse);
}

function handleResponse(response) {
  console.log('Handling the response.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  const textPromise = response.text();

  // When the response is converted to text, pass the result into the
  // addQuoteToDom() function.
  textPromise.then(addDataToDom);
}

/** Adds a random quote to the DOM. */
function addDataToDom(data) {
  console.log('Adding quote to dom: ' + data);

  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = data;
}

function createComment(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

async function getComment() {
  const visibility = document.getElementById("hideorshow");
  const hidelogin = document.getElementById("hidelogin");
  const showlogout = document.getElementById("showlogout");
  const login = await fetch('/Login');
  const loginstatus = await login.text();
  const loginName = loginstatus.split("<p");
  if(loginName[0].includes("sign in to leave a comment.")){
      visibility.style.display = "none";
      hidelogin.style.display = "block";
      showlogout.style.display ="none";
  }else{
   showlogout.style.display= "block";
   hidelogin.style.display= "none";
   visibility.style.display = "block";
  const response = await fetch('/data');
  const comments = await response.json();
  const historyEl = document.getElementById('history');
  for(let i = 0; i < comments.length; i++){
    historyEl.appendChild(createListElement(comments[i]));
  }

  }  
}

async function loginIn() {
  const response = await fetch('/Login');
  const user = await response.text();
  const username = user.split("<p");
  const infoEl = document.getElementById('logininfo');
  infoEl.appendChild(createListElement(username[0])); 
}


/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}