import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

var email = $("#email")
var password = $("#password")

const auth = firebase.auth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });



