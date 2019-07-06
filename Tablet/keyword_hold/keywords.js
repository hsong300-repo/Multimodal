

if (annyang) {
    // Let's define a command.
    var commands = {
        'hello': function() { alert('Hello world!'); },
    };

    annyang.interimResults = true;


    annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
        console.log(userSaid); // sample output: 'hello'
        $("#output").text(userSaid);
        console.log(commandText); // sample output: 'hello (there)'
        console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
    });

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    // annyang.start();
}


var recognition = annyang.getSpeechRecognizer();
var final_transcript = '';
recognition.interimResults = true;
// annyang.start();
count = 0;
globX = w / 2;
globY = h / 2;

recognition.onresult = function(event) {
    var interim_transcript = '';
    final_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            // console.log("final_transcript");
            count++;
            $("#log").val(final_transcript);

            // $("#log").text(final_transcript);
            QueryProcess(final_transcript);
            document.getElementById('listen').style.display = "none";
        } else {
            interim_transcript += event.results[i][0].transcript;

        }
    }
    if(interim_transcript!='') {
        console.log('interim transcript',interim_transcript);
        // $("#log").text(interim_transcript);
        $("#log").val(interim_transcript);

    }
};

window.addEventListener('load', function(){

    // var box1 = document.getElementById('box1')
    var box1 = document.getElementById('container');
    var statusdiv = document.getElementById('statusdiv');
    var startx = 0;
    var starty = 0;
    var dist = 0;

    box1.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0] ;// reference first touch point (ie: first finger)
        // startx = parseInt(touchobj.clientX) ;// get x position of touch point relative to left edge of browser
        // startx = parseInt(touchobj.clientX);// get x position of touch point relative to left edge of browser
        // starty = parseInt(touchobj.clientY);
        statusdiv.innerHTML = 'Status: touchstart';

        // globX = startx-250;
        // globY = starty-130;

        // statusdiv.innerHTML = 'Status: touchtracj<br> Client_xy: ' + globX + 'px' + globY + 'px';
        // document.getElementById('listen').style.display = "block";
        $('input.b').addClass("flash");

        e.preventDefault();
        annyang.start();
    }, false);

    box1.addEventListener('touchmove', function(e){
        var touchobj = e.changedTouches[0]; // reference first touch point for this event
        // startx = parseInt(touchobj.clientX);// get x position of touch point relative to left edge of browser
        // starty = parseInt(touchobj.clientY);

        // globX = startx-250;
        // globY = starty-130;

        statusdiv.innerHTML = 'Status: touchmove';
        // document.getElementById('listen').style.display = "block";
        $('input.b').addClass("flash");


        e.preventDefault();
    }, false);

    box1.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]; // reference first touch point for this event
        // startx = parseInt(touchobj.clientX);// get x position of touch point relative to left edge of browser
        // starty = parseInt(touchobj.clientY);

        // globX = startx-250;
        // globY = starty-130;

        statusdiv.innerHTML = 'Status: touchend';
        $("#output").text("Recognition stopped");
        // document.getElementById('listen').style.display = "none";
        $('input.b').removeClass("flash");


        e.preventDefault();
        annyang.abort();
        isDragging = false;

    }, false);

    box1.addEventListener('pointerdown', function(e){
        // var touchobj = e.changedTouches[0] ;// reference first touch point (ie: first finger)
        // startx = parseInt(touchobj.clientX) ;// get x position of touch point relative to left edge of browser
        // startx = e.clientX;// get x position of touch point relative to left edge of browser
        // starty = e.clientY;
        startx = e.pageX;// get x position of touch point relative to left edge of browser
        starty = e.pageY;
        console.log('pointer down tract', startx - box1.offsetLeft, starty - box1.offsetTop);

        globX = startx - box1.offsetLeft-12;
        globY = starty - box1.offsetTop-12;

        // statusdiv.innerHTML = 'Status: touchtracj<br> Client_xy: ' + globX + 'px' + globY + 'px';
        e.preventDefault();
    }, false);

}, false);

document.oncontextmenu = function() {
    return false;
};

//drawing rectangle pre-selected
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("touchRect").click();
});