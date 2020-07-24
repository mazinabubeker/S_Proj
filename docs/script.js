// ---------------  Firebase    ---------------
var firebaseConfig = {apiKey: "AIzaSyAwkKz5wfNKzF1sYUNmOQilNoMjkY28c98",authDomain: "jsbs-ea361.firebaseapp.com",
                    databaseURL: "https://jsbs-ea361.firebaseio.com",storageBucket: "",messagingSenderId: "295792961619"};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var ref;
var current_text = "";
var current_locked = false;

function updateDataSuccess(data){
    if(!data.exists()){
        enter("",false);
        container_element.classList.remove('disabled');
        return;
    }
    let container_element = document.getElementById('container');
    let text = data.val().text;
    let locked = data.val().locked;
    current_text = text;
    current_locked = locked;

    if(locked == false){
        container_element.classList.remove('disabled');
        container_element.value = text;
    }
    if(locked == true && !container_element.classList.contains('changing')){
        container_element.classList.add('disabled');
    }
}   

function updateDataError(err){
    console.log("Error:");
    console.log(err);
}

function enter(text, status, turnGreen){
    ref.set({
        text: text,
        locked: status
    }).then(function(){
        if(turnGreen){
            document.getElementById('container').style.borderColor = "green";
        }
    });
}

// --------------------------------------------

var cur_timeout;
var cur_ip = "";
var change_status = true;

$(document).ready(()=>{
    $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
        cur_ip = data.split('\n')[2].substring(3);
    }).then(function(){
        document.querySelector('html').style.display = "block";
        document.getElementById('container').classList.add('disabled');
        ref = database.ref('/users/'+cur_ip);
        ref.on('value', updateDataSuccess, updateDataError);
    });

    $('#container').bind('input propertychange', ()=>{
        clearTimeout(cur_timeout);
        document.getElementById('container').classList.add('changing');
        document.getElementById('container').style.borderColor = "red";
        if(change_status == true){
            enter(current_text, true, false);
            change_status = false;
        }
        cur_timeout = setTimeout(function(){
            document.getElementById('container').classList.remove('changing');
            change_status = true;
            enter(document.getElementById('container').value, false, true);
        }, 200);
    });  
});