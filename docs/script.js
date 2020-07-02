

let currentSpace = '';

$(document).ready(()=>{
    console.log("S_Proj v1.0 loaded.");
    currentSpace = 'Dashboard';
    document.getElementById('current-space-label').innerHTML = currentSpace;
    // database.ref('main/').set({});
    console.log(quickRead());

    // for(var i = 0; i < quickRead(); i++){
    //     let tile_element = `<div class='content-tile'></div>`;
    //     document.getElementById('content-container').insertAdjacentHTML('beforeend', tile_element);
    // }

}); 

function navigate(key){
    if(key == 'dash'){
        currentSpace = 'Dashboard';
    }else if(key == 'settings'){
        currentSpace = 'Settings';
    }
    document.getElementById('current-space-label').innerHTML = currentSpace;
}

function addTile(){
    let tile_element = `<div class='content-tile'></div>`;
    document.getElementById('content-container').insertAdjacentHTML('beforeend', tile_element);
    read();
}






// Firebase shit

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

function write(key, value) {
    database.ref('main/' + key).set({
        value: value
    });
}

function read(){
    firebase.database().ref('/main/').once('value').then(snapshot=>{
        if(snapshot.numChildren() == 0){
            console.log("Empty. Creating variable equal to 1.");
            write(0, 1);
        }else{
            let new_val;
            snapshot.forEach(function(data){
                console.log("HEY I WORK");
                new_val = 1 + data.child('value').val();
            });
            console.log("Adding 1.");
            write(0, new_val);
            console.log(new_val)
        }
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