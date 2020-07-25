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


function clearDatabase(){
    sendRef = database.ref('/');
    sendRef.set({

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
            let elem = `<div class='message'>` + data.val()[key].text + `</div>`;
            
            document.getElementById('message-container').insertAdjacentHTML('beforeend', elem);
        });
    }
    cb();
}
$(document).ready(()=>{
    document.getElementById('container').addEventListener('keypress', e=>{
        if(window.event.keyCode==13){e.preventDefault();}else{return;}
        if(document.getElementById('container').value==''){return;}
        let link = '/messages/'+Date.now();
        sendRef = database.ref(link);
        let cur_val = document.getElementById('container').value;
        enter(cur_val, "maz");
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

