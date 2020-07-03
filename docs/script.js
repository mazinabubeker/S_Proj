let cur_panel = 0;
let max_panel = 2;
let logged_in = false;
let current_user = "";
let email_temp = "";
let fullname_temp = "";
let is_creating = false;

$(document).ready(()=>{
    document.getElementById('dashboard').getElementsByTagName('iframe')[cur_panel].classList.add('selected-panel');
}); 


// Pretty loading
$(window).on("load", ()=>{
    document.querySelector("html").classList.add("html_visible");
});

function post_db(){
    console.log(current_user);
    // write();
}

function firebase_create_account(){
    let email = document.getElementById('c-email').value;
    let password = document.getElementById('c-pass').value;
    let password_confirm = document.getElementById('c-pass-confirm').value;
    console.log(email, password);
    let success = true;
    if(password == password_confirm){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            success = false;
            var errorCode = error.code;
            var errorMessage = error.message;
            // Set status message to errorMessage
            document.getElementById('create-account-status').innerHTML = errorMessage;
            
        }).then(()=>{
            if(success){

                email_temp = document.getElementById('c-user').value
                fullname_temp = document.getElementById('c-email').value
                is_creating = true;
                
                document.getElementById('create-account-form').style.display = "none";
                document.getElementById('login-container').style.display = "flex";
            }else{
                console.log("Failed to create account");
            }
        });
    }else{
        // Set status message to 'passwords do not match'
        document.getElementById('create-account-status').innerHTML = "Passwords do not match";
    }
}

function login(){
    let email = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    let success = true;
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        success = false;
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // Set status message to errorMessage
        document.getElementById('login-account-status').innerHTML = errorMessage;
    }).then(()=>{
        if(success){
            // Login success
        }else{
            // Login failure
        }
    });
    
}

function create_account(){
    document.getElementById('login-container').style.display = "none";
    let form = `<div id='create-account-form'>
                    <div id='back-to-login' onclick='back_to_login()'><</div>
                    <input type = "text"
                    id = "c-user"
                    class='create-account-form-input' placeholder='Full name'/>
                    <input type = "text"
                    id = "c-email"
                    class='create-account-form-input' placeholder='Email'/>
                    <input type = "password"
                    id = "c-pass"
                    class='create-account-form-input' placeholder='Password'/>
                    <input type = "password"
                    id = "c-pass-confirm"
                    class='create-account-form-input' placeholder='Confirm password'/>
                    <button class='create-button' onclick='firebase_create_account()'>CREATE</button>
                    <div id='create-account-status'></div>
                </div>`;
    document.getElementById('login-container').insertAdjacentHTML('afterend', form);
                    
                     
}

function back_to_login(){
    document.getElementById('login-container').style.display = "flex";
    document.getElementById('create-account-form').style.display = "none";
}

function navigate(key){
    if(key == 'dash'){
        document.getElementById('dashboard').style.display = "flex";
        document.getElementById('settings').style.display = "none";
    }else if(key == 'settings'){
        document.getElementById('dashboard').style.display = "none";
        document.getElementById('settings').style.display = "flex";
    }else if(key == 'logout'){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }
}

function switch_panel(p){
    if(p == 'l'){
        if(cur_panel > 0){
            cur_panel -= 1;
        }
        
    }else if(p == 'r'){
        if(cur_panel < max_panel){
            cur_panel += 1;
        }
    }
    document.getElementById('panel-count').getElementsByTagName('div')[cur_panel].classList.add('selected');
    for(var i = 0; i < max_panel+1; i++){
        if(i != cur_panel){
            document.getElementById('panel-count').getElementsByTagName('div')[i].classList.remove('selected');
        }
    }
    document.getElementById('content-container').getElementsByTagName('iframe')[cur_panel].classList.add('selected-panel');
    for(var i = 0; i < max_panel+1; i++){
        if(i != cur_panel){
            document.getElementById('content-container').getElementsByTagName('iframe')[i].classList.remove('selected-panel');
        }
    }

}



// Firebase shit
// Clear database: database.ref('main/').set({});

var firebaseConfig = {
    apiKey: "AIzaSyAwkKz5wfNKzF1sYUNmOQilNoMjkY28c98",
    authDomain: "jsbs-ea361.firebaseapp.com",
    databaseURL: "https://jsbs-ea361.firebaseio.com",
    projectId: "jsbs-ea361",
    storageBucket: "",
    messagingSenderId: "295792961619",
    appId: "1:295792961619:web:c29231b25f6e85e0"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function write() {
    database.ref("users/" + current_user).set({
        fullname: document.getElementById('c-user').value,
        email: document.getElementById('c-email').value
    }).then(read);

    // database.ref("users/" + current_user).set({
    //     ok: "hi",
    //     ok2: "hello"
    // });
}

function read(){
    firebase.database().ref('/users/').once('value').then(snapshot=>{
        snapshot.forEach(function(data){
           if(data.val() == current_user){
               document.getElementsByClassName('nothing-here')[0].innerHTML = data.child('fullname').val();
           }
        });
    });
}

function quickRead(){
    var final = 0;
    firebase.database().ref('/main/').once('value').then(snapshot=>{
        snapshot.forEach(function(data){
            return data.child('value').val(); 
        });
    });
    
}

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        logged_in = true;
        current_user = user.uid;
        if(is_creating){
            write();
        }
        document.getElementById('main-container').style.display = 'flex';
        document.getElementById('login-container').style.display = 'none';
        // read();
    }else{
        logged_in = false;
        current_user = "";
        document.getElementById('main-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'flex';
    }
});