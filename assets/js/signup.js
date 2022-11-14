// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBw-kigxX_pzNxsn7iUAsoLFOGbQWWOXyE",
    authDomain: "form-6d0a8.firebaseapp.com",
    databaseURL: "https://form-6d0a8-default-rtdb.firebaseio.com",
    projectId: "form-6d0a8",
    storageBucket: "form-6d0a8.appspot.com",
    messagingSenderId: "831577091232",
    appId: "1:831577091232:web:a69d6f8bbfe7d437a42dc5"
  };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Initialize variables
    const auth = firebase.auth()
    const database = firebase.database()
    
    // Set up our register function
    function register () {
      // Get all our input fields
      email = document.getElementById('email').value
      password = document.getElementById('password').value
      full_name = document.getElementById('full_name').value
      user_name = document.getElementById('user_name').value
    
      // Validate input fields
      if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
      }
      if (validate_field(full_name) == false || validate_field(user_name) == false) {
        alert('One or More Extra Fields is Outta Line!!')
        return
      }
     
      // Move on with Auth
      auth.createUserWithEmailAndPassword(email, password)
      .then(function() {
        // Declare user variable
        var user = auth.currentUser
    
        // Add this user to Firebase Database
        var database_ref = database.ref()
    
        // Create User data
        var user_data = {
          email : email,
          full_name : full_name,
          user_name : user_name,
          last_login : Date.now()
        }
    
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)
    
        // DOne
        alert('User Created!!')
      })
      .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message
    
        alert(error_message)
      })
    }

    
    // Validate Functions
    function validate_email(email) {
      expression = /^[^@]+@\w+(\.\w+)+\w$/
      if (expression.test(email) == true) {
        // Email is good
        return true
      } else {
        // Email is not good
        return false
      }
    }
    
    function validate_password(password) {
      // Firebase only accepts lengths greater than 6
      if (password < 6) {
        return false
      } else {
        return true
      }
    }
    
    function validate_field(field) {
      if (field == null) {
        return false
      }
    
      if (field.length <= 0) {
        return false
      } else {
        return true
      }
    }
