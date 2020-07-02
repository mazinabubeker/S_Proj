let currentSpace = '';

$(document).ready(()=>{
    console.log("S_Proj v1.0 loaded.");
    currentSpace = 'Admin';
    document.getElementById('current-space-label').innerHTML = currentSpace;

});

function navigate(s){
    if(s == 'admin'){
        currentSpace = 'Admin';
    }else if(s == 'settings'){
        currentSpace = 'Settings';
    }else if(s == 'profiles'){
        currentSpace = 'Profiles';
    }
    document.getElementById('current-space-label').innerHTML = currentSpace;
}