//Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//Variables
var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var mouseDbl = false;

// this for selection of the
var selection = null;

//Mousedown
$(canvas).on('mousedown', function(e) {
    last_mousex = parseInt(e.clientX-canvasx);
    last_mousey = parseInt(e.clientY-canvasy);
    mousedown = true;
});

//Mouseup
$(canvas).on('mouseup', function(e) {
    mousedown = false;
});


//Mousemove
$(canvas).on('mousemove', function(e) {
    mousex = parseInt(e.clientX-canvasx);
    mousey = parseInt(e.clientY-canvasy);
    if(mousedown) {
        ctx.clearRect(0,0,canvas.width,canvas.height); //clear canvas
        ctx.beginPath();
        //width and height was initially local
        // var width = mousex-last_mousex;
        // var height = mousey-last_mousey;
        width = mousex-last_mousex;
        height = mousey-last_mousey;
        ctx.rect(last_mousex,last_mousey,width,height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    //Output
    $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);


});

$(canvas).on('dblclick', function(e) {
    // mousex = parseInt(e.clientX-canvasx);
    // mousey = parseInt(e.clientY-canvasy);

    last_mousex = parseInt(e.clientX-canvasx);
    last_mousey = parseInt(e.clientY-canvasy);
    mouseDbl = true;

    // console.log('current',mousex);
    // console.log('last',mousey);
    //
    //
    // ctx.fillStyle = 'lightskyblue';
    // ctx.fillRect(mousex,mousey,width,height);
    //
    // // var mouse = myState.getMouse(e);
    // // ctx.strokeStyle = this.selectionColor;
    // // ctx.lineWidth = this.selectionWidth;
    // // var mySel = this.selection;
    // // ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);

    //Output
});


//event listener to change color
// window.addEventListener('touchend', (e) => {
//     // Let's pick a random color between #000000 and #FFFFFF
//     const color = Math.round(Math.random() * 0xFFFFFF)
//
//     // Let's format the color to fit CSS requirements
//     const fill = '#' + color.toString(16).padStart(6,'0')
//
//     // Let's apply our color in the
//     // element we actually clicked on
//     e.target.style.fill = fill
// })