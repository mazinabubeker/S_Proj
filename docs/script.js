
var to_display = "kill yourself retard kill yourself retard kill yourself retard kill yourself retard kill yourself retard";
var index = 1;

$(document).ready(()=>{
    //var container_element = document.getElementById('container');
    // $('#container_element').bind('input propertychange', (e)=>{
    //     e.preventDefault();
    //     container_element.innerHTML = to_display.substring(0, index);
    //     index++;
    // });

    document.addEventListener('keypress', e=>{
        e.preventDefault();
        document.getElementById('container').value = to_display.substring(0, index);
        index++;
    });
});

