// ---------------  Firebase    ---------------
var firebaseConfig = {apiKey: "AIzaSyAwkKz5wfNKzF1sYUNmOQilNoMjkY28c98",authDomain: "jsbs-ea361.firebaseapp.com",
                    databaseURL: "https://jsbs-ea361.firebaseio.com",storageBucket: "",messagingSenderId: "295792961619"};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var sendRef;
var receiveRef;


function updateDataError(err){
    console.log(err);
}

function enter(text, sender){
    sendRef.set({
        text: text,
        sender: sender
    });
}

function enterUser(username){
    sendRef.set({
        username: username
    }).then(function(){
        cur_username = username;
        document.getElementById('logged-in-as').innerHTML = "Logged in as: <b>" + cur_username + "</b>";
        document.getElementById('app-container').classList.remove('disabled');
        document.getElementById('username-container').classList.add('hidden');
    });
}

function enterUsername(newDat, isNew, oldDat){
    if(isNew){
        sendRef.set({
            dat: newDat
        });
    }else{
        sendRef.set({
            dat: oldDat + " " + newDat
        });
    }
    
}


function clearDatabase(){
    sendRef = database.ref('/messages/');
    sendRef.set({

    }).then(function(){
        location.reload();
    });
}

function logout(){
    receiveRef = database.ref('/users/allusers');
    receiveRef.once('value', data=>{
        let usernames = data.val().dat.split(' ');
        console.log(usernames);
        let index_of_cur_username = usernames.indexOf(cur_username);
        console.log(cur_username)
        console.log(index_of_cur_username);
        usernames.splice(index_of_cur_username,1);
        console.log(usernames);
        let new_usernames = '';
        usernames.forEach(u=>{
            new_usernames += u + ' ';
        });
        sendRef = database.ref('/users/allusers');
        enterUsername(new_usernames, true, "");
    });


    sendRef = database.ref('/users/' + cur_ip);
    sendRef.set({

    }).then(function(){
        location.reload();
    });
}
// --------------------------------------------

var counter = 0;
// var d = new Date;
function onUpdate(data, cb){
    document.getElementById('message-container').innerHTML = "";
    if(data.exists()){
        let keys = Object.keys(data.val());
        keys.forEach(key=>{
            let elem = `<div class='message'><b>` + data.val()[key].sender + "</b>: " + data.val()[key].text + `</div>`;
            
            document.getElementById('message-container').insertAdjacentHTML('beforeend', elem);
        });
    }
    cb();
}
var cur_ip = "";
var cur_username = "";
$(document).ready(()=>{
    $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
        cur_ip = data.split('\n')[2].substring(3);
    }).then(function(){
        console.log("IP Retrieved: " + cur_ip);
        document.querySelector('html').style.display = "block";
        receiveRef = database.ref('/users/' + cur_ip);
        receiveRef.once('value', data=>{
            if(!data.exists()){                
                document.getElementById('username-container').classList.remove('hidden');
                document.getElementById('username-input').addEventListener('keypress', e=>{
                    if(window.event.keyCode==13){e.preventDefault();}else{return;}
                    if(document.getElementById('username-input').value==''){alert('Enter a username.'); return;}
                    if(document.getElementById('username-input').value.includes(' ')){alert('No spaces!'); return;}

                    receiveRef = database.ref('/users/allusers');
                    receiveRef.once('value', data=>{
                        sendRef = database.ref('/users/allusers');
                        if(!data.exists()){
                            enterUsername(document.getElementById('username-input').value, true, "");
                        }else{
                            let taken_usernames = data.val().dat.split(' ');
                            if(!taken_usernames.includes(document.getElementById('username-input').value)){
                                enterUsername(document.getElementById('username-input').value, false, data.val().dat);
                            }else{
                                alert("Username is taken.");
                                return;
                            }
                        }
                        sendRef = database.ref('/users/' + cur_ip);
                        enterUser(document.getElementById('username-input').value);
                    });
                });
            }else{
                document.getElementById('app-container').classList.remove('disabled');
                cur_username = data.val().username;
                document.getElementById('logged-in-as').innerHTML = "Logged in as: <b>" + cur_username + "</b>";
            }
        });


        document.getElementById('container').addEventListener('keypress', e=>{
            if(window.event.keyCode==13){e.preventDefault();}else{return;}
            if(document.getElementById('container').value==''){return;}
            let link = '/messages/'+Date.now();
            sendRef = database.ref(link);
            let cur_val = document.getElementById('container').value;
            enter(cur_val, cur_username);
            let container_element = document.getElementById('container');
            container_element.value = "";
        });



        receiveRef = database.ref('/messages/');
        receiveRef.on('value', data=>{
            let ce = document.getElementById('message-container');
            onUpdate(data, function(){
                (ce.scrollTop = ce.scrollHeight);
            }, updateDataError);
        });
    });
});


