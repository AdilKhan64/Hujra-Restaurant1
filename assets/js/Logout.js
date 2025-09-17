function LogOut() {
  console.log("logout ")
  var userSession = sessionStorage.getItem('user')
  if(userSession){
    sessionStorage.removeItem('user');
  //   auth.signOut();
  }
  window.location.href="./HTML/log-in.html";
}

console.log("file connected")