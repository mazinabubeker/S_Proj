let s = 79;
let l = 67;

$(document).ready(()=>{
    let bubble_elements = document.getElementsByClassName('color-bubble');
    for(var i = 0; i < bubble_elements.length; i++){
        bubble_elements[i].addEventListener('contextmenu', e=>{
            e.preventDefault();
            alert('yerr');
        }, false);
    }

    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 20; j++){
            color_bubble_element = document.createElement("div");
            color_bubble_element.classList.add('color-bubble');
            color_bubble_element.style.backgroundColor = getHSLFromValues([Math.floor(Math.random()*360),s,l]);
            document.getElementById('container').append(color_bubble_element);
        }
    }

    document.querySelector('html').style.display = "block";
});





function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getHSLFromValues(hsl_array){
    return "hsl(" + hsl_array[0] + ", " + hsl_array[1] + "%, " + hsl_array[2] + "%)";
}