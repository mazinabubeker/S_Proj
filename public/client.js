
$(document).ready(function(){
    document.getElementsByTagName('p')[0].style.color = "red";
    let query = {name: "maz", age: "25"};
    const options = {method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query)
                };
    fetch('/query', options)
    .then(resp => resp.text())
    .then(json=>{
        console.log(JSON.parse(json));
    })
    .then(err=>{
        if(err){
            console.log("Error: " + err);
        }
    });
});

// function queryServer(query){
//     const options = {method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(query)
//                 };
//     fetch('/query', options)
//     .then(resp => resp.text())
//     .then(json=>{
//         return JSON.parse(json);
//     })
//     .then(err=>{
//         if(err){
//             console.log("Error: " + err);
//         }
//     });
// }