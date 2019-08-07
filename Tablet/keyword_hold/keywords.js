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
var query = '';
var endSentence = false;
var interimSentence = false;
recognition.interimResults = true;
// annyang.start();
count = 0;
globX = w / 2;
globY = h / 2;
var command = '';

recognition.onresult = function(event) {
    var interim_transcript = '';
    final_transcript = '';
    query = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            console.log('final &&', final_transcript);
            final_transcript = final_transcript.replace(/france/g,'front');
            final_transcript = final_transcript.replace(/France/g,'front');
            final_transcript = final_transcript.replace(/friends/g,'front');
            final_transcript = final_transcript.replace(/block/g,'black');
            final_transcript = final_transcript.replace(/hair/g,'here');
            final_transcript = final_transcript.replace(/year/g,'here');
            final_transcript = final_transcript.replace(/coffee/g,'copy');
            final_transcript = final_transcript.replace(/to/g,'two');
            final_transcript = final_transcript.replace(/things/g,'change');

            query = final_transcript;
            $("#log").val(final_transcript);
            // command = final_transcript;
            endSentence = true;
            $("#output").text("Query understood").css("color","black");
            // query process was here
            // QueryProcess(final_transcript);
            // $('input.b').removeClass("flash");
        } else {
            interim_transcript += event.results[i][0].transcript;
            query += event.results[i][0].transcript;

        }
    }
    if(interim_transcript!='') {
        console.log('interim transcript',interim_transcript);
        interim_transcript = interim_transcript.replace(/france/g,'front');
        interim_transcript = interim_transcript.replace(/France/g,'front');
        interim_transcript = interim_transcript.replace(/friends/g,'front');
        interim_transcript = interim_transcript.replace(/block/g,'black');
        interim_transcript = interim_transcript.replace(/hair/g,'here');
        interim_transcript = interim_transcript.replace(/year/g,'here');
        interim_transcript = interim_transcript.replace(/coffee/g,'copy');
        interim_transcript = interim_transcript.replace(/to/g,'two');
        interim_transcript = interim_transcript.replace(/things/g,'change');

        $("#log").val(interim_transcript);

        // $("#log").val(final_transcript);
    }else{//end of sentence

    }
};


window.addEventListener('load', function(){
    var box1 = document.getElementById('container');
    var statusdiv = document.getElementById('statusdiv');
    var startx = 0;
    var starty = 0;
    var dist = 0;

    box1.addEventListener('touchstart', function(e){
        annyang.start();
        statusdiv.innerHTML = 'Status: touchstart';
        $("#output").text("Recognition active").css("color","black");


        $('input.b').addClass("flash");

        e.preventDefault();



    }, false);

    box1.addEventListener('touchmove', function(e){
        statusdiv.innerHTML = 'Status: touchmove';
        $("#output").text("Recognition active").css("color","black");;

        $('input.b').addClass("flash");

        e.preventDefault();

    }, false);

    box1.addEventListener('touchend', function(e){
        statusdiv.innerHTML = 'Status: touchend';
        $("#output").text("Recognition stopped").css("color","black");
        // QueryProcess(final_transcript);
        console.log('touchend endSentence', endSentence);
        console.log('touchend final trancript',final_transcript);

        QueryProcess(query);
        query ='';
        // if(endSentence === true){// detecting end of sentence is hard
        //     QueryProcess(final_transcript);
        // }
        // endSentence = false;

        // command=" ";
        $('input.b').removeClass("flash");
        e.preventDefault();
        annyang.abort();

        isDragging = false;
    }, false);

    box1.addEventListener('pointerdown', function(e){
        startx = e.pageX;// get x position of touch point relative to left edge of browser
        starty = e.pageY;

        globX = startx - box1.offsetLeft-12;
        globY = starty - box1.offsetTop-12;

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