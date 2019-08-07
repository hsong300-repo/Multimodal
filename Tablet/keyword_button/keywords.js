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
}


var recognition = annyang.getSpeechRecognizer();
var final_transcript = '';
recognition.interimResults = true;
count = 0;

recognition.onresult = function(event) {
    var interim_transcript = '';
    final_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            count++;
            // $("#log").text(final_transcript);
            //interim results hard code some of the words
            final_transcript = final_transcript.replace(/france/g,'front');
            final_transcript = final_transcript.replace(/France/g,'front');
            final_transcript = final_transcript.replace(/friends/g,'front');
            final_transcript = final_transcript.replace(/block/g,'black');
            final_transcript = final_transcript.replace(/hair/g,'here');
            final_transcript = final_transcript.replace(/coffee/g,'copy');
            final_transcript = final_transcript.replace(/to/g,'two');
            final_transcript = final_transcript.replace(/things/g,'change');



            $("#log").val(final_transcript);
            QueryProcess(final_transcript);
            // $("#log").removeClass("input.blink");

            $('input.b').removeClass("flash");
            annyang.abort();
        } else {
            interim_transcript += event.results[i][0].transcript;

        }
    }
    if(interim_transcript!='') {
        console.log('interim transcript',interim_transcript);

        interim_transcript = interim_transcript.replace(/france/g,'front');
        interim_transcript = interim_transcript.replace(/France/g,'front');
        interim_transcript = interim_transcript.replace(/friends/g,'front');
        interim_transcript = interim_transcript.replace(/block/g,'black');
        interim_transcript = interim_transcript.replace(/hair/g,'here');
        interim_transcript = interim_transcript.replace(/coffee/g,'copy');
        interim_transcript = interim_transcript.replace(/to/g,'two');
        interim_transcript = interim_transcript.replace(/things/g,'change');



        // $("#log").text(interim_transcript);
        $("#log").val(interim_transcript);


    }

};



function EnableSpeech(){
    annyang.start();
    // document.getElementById('listen').style.display = "block";
    $('input.b').addClass("flash");
    // blink($('#log'));    // $("#log").addClass("input.blink");


    // document.getElementById('log').style.display = "block";
}


// this is to track the position
window.addEventListener('load', function(){

    // var box1 = document.getElementById('box1')
    var box1 = document.getElementById('container');
    var statusdiv = document.getElementById('statusdiv');
    var startx = 0;
    var starty = 0;
    var dist = 0;

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

