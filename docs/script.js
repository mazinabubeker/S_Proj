var cur_timeout;
var cur_ip = "";
var new_update = true;
var old_text = "";

var shmold_text = "";
var shmold_locked = false;
var ot = "";
var ol = false;

$(document).ready(()=>{
    $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
        cur_ip = data.split('\n')[2].substring(3);
    }).then(function(){
        document.querySelector('html').style.display = "block";
        document.getElementById('container').classList.add('disabled');

        if(!read()){
            document.getElementById('container').classList.remove('disabled');
            
        }
        old_text = document.getElementById('container').value;
    });


    $('#container').bind('input propertychange', ()=>{
        document.getElementById('container').classList.add('changing');
        write_old(true);
        clearTimeout(cur_timeout);
        document.getElementById('container').style.borderColor = "red";
        cur_timeout = setTimeout(function(){
            document.getElementById('container').classList.remove('changing');
            old_text = document.getElementById('container').value;
            write(false);
        }, 2000);
    });  
});

// DO NOT GO HERE EW

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

function write(lock_status) {
    database.ref("users/" + cur_ip).set({
        text: document.getElementById('container').value,
        locked: lock_status
    }).then(function(){
        if(lock_status == false){
            document.getElementById('container').style.borderColor = "green";
        }
    });
}

function write_old(lock_status) {
    database.ref("users/" + cur_ip).set({
        text: old_text,
        locked: lock_status
    }).then(function(){
        if(lock_status == false){
            document.getElementById('container').style.borderColor = "green";
        }
    });
}

// function write_lock(lock_status) {
//     database.ref("users/" + cur_ip).set({
//         text: document.getElementById('container').value,
//         locked: lock_status
//     }).then(function(){
//         if(lock_status == false){
//             document.getElementById('container').style.borderColor = "green";
//         }
//     });
// }

function read(){
    firebase.database().ref('/users/').once('value').then(snapshot=>{
        snapshot.forEach(function(data){
           if(data.val() == cur_ip){
               return data.child('locked').val();
           }
        });
    }).then(function(){
        return false;
    });
}

var thingy = firebase.database().ref('/users/' + cur_ip);
thingy.on('value', function(snapshot) {
    // ot = shmold_text;
    // ol = shmold_locked;
    // shmold_text = snapshot.child('text').val();
    // shmold_locked = snapshot.child('locked').val();
    // console.log('bruh');
    // if(ol != shmold_locked){

        // console.log("eger");
        var new_status = snapshot.val();
        console.log(new_status);
        if(new_status == true && !document.getElementById('container').classList.contains('changing')){
            document.getElementById('container').classList.add('disabled');
        }
    
        if(new_status == false){
            document.getElementById('container').classList.remove('disabled');
            old_text = document.getElementById('container').value;
        }
    // }
});