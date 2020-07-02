let currentSpace = '';

$(document).ready(()=>{
    console.log("S_Proj v1.0 loaded.");
    currentSpace = 'Dashboard';
    document.getElementById('current-space-label').innerHTML = currentSpace;

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
    document.getElementById('content-container').innerHTML += `<div class='content-tile'></div>`;
}