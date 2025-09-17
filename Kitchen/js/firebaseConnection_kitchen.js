// const { getDatabase } = require("firebase/database");
const firebaseConfig = {
  apiKey: "AIzaSyDlqNMzVsqHNTVzLAYSrsn4SjuUhZyOELc",
  authDomain: "e-restaurant-23034.firebaseapp.com",
  projectId: "e-restaurant-23034",
  storageBucket: "e-restaurant-23034.appspot.com",
  messagingSenderId: "411328100739",
  appId: "1:411328100739:web:ba4eb93d5f6828017f5eb6",
  measurementId: "G-WSW44TGVTM",
  databaseURL: "https://e-restaurant.firebaseio.com",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();



$('#loginform').on('submit', (e) => {
  e.preventDefault();
  var email = $('#email').val();
  var password = $('#password').val();

  // Create user with email and password

  db.collection("users").get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // Access the data of each user document
        var user = doc.data();
        if (user.email == email && user.password == password) {
          if (user.role == "kitchen") {
            sessionStorage.setItem('user', JSON.stringify(user));
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Logged in successfully!',
              showConfirmButton: false,
              timer: 3000,
            }).then(window.location.href = "./KitchenHP.html");
          }
        }
        // console.log(user.email == email);
        console.log(user.email == email && user.password == password);
        console.log(user.role == "kitchen");
      });
    })
    .catch(function (error) {
      console.error("Error getting users: ", error);
      var errorCode = error.code;
      var errorMessage = error.message;
      Swal.fire(errorMessage, {
        icon: "error",
        title: 'error',
        showConfirmButton: false,
        timer: 3000,
      })
      console.error("Error creating user:", errorMessage);
    });

  // auth.signInWithEmailAndPassword(email,password)
  // .then(async(userCredential)=>{
  //   var user=userCredential.user;
  //   sessionStorage.setItem('user',JSON.stringify(user));
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Success',
  //     text: 'Logged in successfully!',
  //     showConfirmButton: false,
  //     timer: 3000,
  //   }).then(window.location.href="./KitchenHP.html");
  // })
  //   .catch((error) => {
  //     // User creation failed
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     Swal.fire(errorMessage,{
  //         icon:"error",
  //         title:'error',
  //         showConfirmButton:false,
  //         timer:3000,
  //     })
  //     console.error("Error creating user:", errorMessage);
  //     // Handle the error or display an error message to the user
  //   });
});

