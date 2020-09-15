const functions = require('firebase-functions');
const getTopMatches = require('./getTopMatches.js');

exports.getTopMatches = functions.https.onCall(getTopMatches);
