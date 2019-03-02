const firebase=require('firebase');
var config = {
  apiKey: "AIzaSyDa_1q5XhtB57rC_1yn03Rr5yjYMa7Mk58",
  authDomain: "examapp-bb689.firebaseapp.com",
  databaseURL: "https://examapp-bb689.firebaseio.com",
  projectId: "examapp-bb689",
  storageBucket: "examapp-bb689.appspot.com",
  messagingSenderId: "698677447338"
};
  export const fire=!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()