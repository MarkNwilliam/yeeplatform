"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "onAuthStateChanged", {
  enumerable: true,
  get: function get() {
    return _auth.onAuthStateChanged;
  }
});
Object.defineProperty(exports, "signInWithEmailAndPassword", {
  enumerable: true,
  get: function get() {
    return _auth.signInWithEmailAndPassword;
  }
});
Object.defineProperty(exports, "GoogleAuthProvider", {
  enumerable: true,
  get: function get() {
    return _auth.GoogleAuthProvider;
  }
});
Object.defineProperty(exports, "signInWithPopup", {
  enumerable: true,
  get: function get() {
    return _auth.signInWithPopup;
  }
});
exports.storage = exports.firestore = exports.database = exports.auth = void 0;

var _app = require("firebase/app");

var _analytics = require("firebase/analytics");

var _auth = require("firebase/auth");

var _database = require("firebase/database");

var _firestore = require("firebase/firestore");

var _storage = require("firebase/storage");

// Add this import statement
// Add this import statement
var firebaseConfig = {
  apiKey: "AIzaSyBXS56tIro9cd-Sd4ySn5AwLw3T6cnMHr0",
  authDomain: "yeeplatform.firebaseapp.com",
  projectId: "yeeplatform",
  storageBucket: "yeeplatform.appspot.com",
  messagingSenderId: "272587831821",
  appId: "1:272587831821:web:b612b427ff43968f33f344",
  measurementId: "G-YZV03469PP"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
var analytics = (0, _analytics.getAnalytics)(app); // Add console.log statement to check Firebase connection

console.log("Firebase connected successfully");
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;
var database = (0, _database.getDatabase)(app);
exports.database = database;
var firestore = (0, _firestore.getFirestore)(app);
exports.firestore = firestore;
var storage = (0, _storage.getStorage)(app); // Add this export statement

exports.storage = storage;