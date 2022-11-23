(function(){
    firebase.auth().onAuthStateChanged(user => {
        if(user)
        {
         
        }
        else
        {
           var newURL = window.location.origin + "/Osiguranje/login.html"
           if(window.location.origin == "null")
           {
            window.location.replace("login.html");
           }else
           {
            window.location.replace(newURL);
           };
             
        }
    });
    
})();


function Odjava() 
{
  firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  
}