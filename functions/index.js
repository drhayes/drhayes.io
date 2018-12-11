const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.getStarredEmail = functions.https.onRequest((request, response) => {
  console.log(request.body.body);
  response.send(200);
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
