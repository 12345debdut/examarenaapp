const admin=require('firebase-admin');
const serviceAccount=require('../../service-exam.json');
var app=admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://examapp-bb689.firebaseio.com"
},"Exam Arena")
var appauth=app.auth();
var appdatabase=app.database();

exports.appauth=appauth;
exports.appdatabase=appdatabase;