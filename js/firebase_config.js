// Inicijalizacija Firebase-a
const config= {
  apiKey: "AIzaSyDyERDRNdVhVjD5i-9vB7alijN1dTW7s3o",
  authDomain: "osiguranje-e8be6.firebaseapp.com",
  databaseURL: "https://osiguranje-e8be6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "osiguranje-e8be6",
  storageBucket: "osiguranje-e8be6.appspot.com",
  messagingSenderId: "531352863460",
  appId: "1:531352863460:web:6afb60e13ba645a7e022f1"

};


firebase.initializeApp(config);

// Kreiranje objekta Firebase baze

var oDb = firebase.database();
var auth = firebase.auth();
var oDbKlijent = oDb.ref('klijent');
var oDbAutoOsig = oDb.ref('Auto_osiguranje');
var oDbStambOsig = oDb.ref('Stambeno_osiguranje');
var oDbZivotOsig = oDb.ref('Zivotno_osiguranje');

