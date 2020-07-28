
$(document).ready(function(){    

    // Send something to all of the users instantly.
    // Internet is an issue so theres lag
    // Queue an action, so that, once all the clients receieved the request, a timer of 10 MS is waited until action is executed


});


function unflash(){
    document.querySelector('body').style.backgroundColor = '#fff';
}


function flash(){
    document.querySelector('body').style.backgroundColor = '#54e365';
    setTimeout(unflash, 100);
    setTimeout(flash, 1000);
}

function activateThing(){
    queryGET('/query_get', res=>{
        setTimeout(flash, parseInt(res)-Date.now())
    }, err=>{
        console.log("Error:");
        console.log(err);
    });
}



/*
// SAMPLE GET REQUEST:

queryGET('/query_get', res=>{
    console.log("GET successful:");
    console.log(res);
}, err=>{
    console.log("Error:");
    console.log(err);
});

// SAMPLE POST REQUEST:

queryPOST('/query_post', {name: "Mazin Abubeker", age: 22}, res=>{
    console.log("POST successful:");
    console.log(res);
}, err=>{
    console.log("Error:");
    console.log(err);
});

*/

function queryPOST(url, query, successCallback, errorCallback){
    const options = {method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query)
                };
    fetch(url, options)
    .then(resp => resp.text())
    .then(json=>{
        successCallback(JSON.parse(json));
    })
    .then(err=>{
        if(err){
            errorCallback(err);
        }
    });
}

function queryGET(url, successCallback, errorCallback){
    const options = {method: 'GET',
                    headers: {
                        'Content-Type': 'html/text'
                    },
                };
    fetch(url, options)
    .then(resp => resp.text())
    .then(text=>{
        successCallback(text);
    })
    .then(err=>{
        if(err){
            errorCallback(err);
        }
    });
}