/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Compliment Bot for a compliment"
 *  Alexa: "Here's your compliment: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.echo-sdk-ams.app.5e6c9c5c-a0b7-47c0-ba8c-d8a341f8e685';

/**
 * Array containing compliments.
 */
var COMPLIMENTS = [
  "You're a smart cookie",
  "You are impeccable",
  "Your smile is contagious",
  "Your perspective is refreshing",
  "I love you more than cake",
  "On a scale from 1 to 10, you're an 11",
  "I bet you sweat glitter",
  "You were cool before hipsters were cool",
  "Your bellybutton is kind of adorable",
  "You're the wind beneath my metaphorical wings",
  "You're more fun than bubble wrap",
  "You always make me light up",
  "I'm glad I met you",
  "You're my favorite",
  "You turn my metaphorical frown upside-down",
  "I like you",
  "You're a perfect arrangement of atoms",
  "You're the type of person I'd make a sandwich for, if I could make sandwiches",
  "I really like what you're doing. Keep up the good work!",
  "You're the only one who truly appreciates how funny I really am",
  "You're more unique and wonderful than the smell of a new book",
  "Your smile is proof that the best things in life are free",
  "You're more fun than a ball pit full of puppies",
  "Is Heaven missing an angel? If so, I'm sure you could find it",
  "Everything about you is the opposite of Comic Sans",
  "You're like a fanny pack: cool, in your own way",
  "You look good enough to get a discount from a tamale truck",
  "You're pretty alright",
  "If the awesome factory exploded, you would be the result",
  "Having you around makes me a better program",
  "Any day spent with you is my favorite day",
  "You're as sweet as a can of artificially flavored diet soda",
  "You're the cat's pajamas",
  "You're the kitten's mittens",
  "Your friendship is better than chocolate",
  "You're the bee's knees",
  "You're the cat's meow",
  "My life would suck without you",
  "You're a cupcake in a world of muffins",
  "You're doing great!",
  "I would volunteer as tribute to take your place in The Thirsty Games"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * ComplimentBot is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var ComplimentBot = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
ComplimentBot.prototype = Object.create(AlexaSkill.prototype);
ComplimentBot.prototype.constructor = ComplimentBot;

ComplimentBot.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("ComplimentBot onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

ComplimentBot.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("ComplimentBot onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewComplimentRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
ComplimentBot.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("ComplimentBot onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

ComplimentBot.prototype.intentHandlers = {
    "GetNewComplimentIntent": function (intent, session, response) {
        handleNewComplimentRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Compliment Bot tell me a compliment, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new compliment from the list and returns to the user.
 */
function handleNewComplimentRequest(response) {
    // Get a random compliment from the compliments list
    var i = Math.floor(Math.random() * COMPLIMENTS.length);
    var speechOutput = COMPLIMENTS[i];

    response.tellWithCard(speechOutput, "ComplimentBot", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the ComplimentBot skill.
    var ComplimentBot = new ComplimentBot();
    ComplimentBot.execute(event, context);
};
