if (annyang) {
    // Let's define a command.
    var commands = {
        'hello': function() { alert('Hello world!'); },
        'system':function(){alert('system called');}
    };

    annyang.interimResults = true;

    annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
        console.log(userSaid); // sample output: 'hello'
        $("#output").text(userSaid);
        console.log(commandText); // sample output: 'hello (there)'
        console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
        console.log('result match printout');
    });

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    // annyang.start();
}

var recognition = annyang.getSpeechRecognizer();
var final_transcript = '';
var track = '';
recognition.interimResults = true;

annyang.start();
count = 0;
command_flag = false;
system_flag = false;
givePass = false;
pass_count = 0;

recognition.onresult = function(event) {
    var interim_transcript = '';
    final_transcript = '';
    var ret = '';
    // var system_flag = '';
    var temp_flag = system_flag;

    console.log('track before', track, track.length);

    if((track[0] === "system" && track.length === 1) || (track[1] === "system" && track.length === 2)){// system was called ready to listen
        console.log('system true');
        system_flag = true;

        pass_count = -1;
        command_flag = true;
        givePass = true;
        $("#log").val(ret);

        // $('input.b').addClass("flash");
        // $("#output").text("Listening").css("color","red");
    }else{// saying something else
        system_flag = false;

    }

    console.log('givePass', givePass);
    //it should be executed while true, false change to true,

    // final_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        console.log('####results');
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            console.log("***final_transcript:::",final_transcript);
            count++;
            pass_count++;
            console.log('count',count);
            if(command_flag === true){
                if(pass_count === 0 ){
                    console.log('=======pass count 0',final_transcript);
                    final_transcript = final_transcript.replace(/system/g,'');
                    final_transcript = final_transcript.replace(/france/g,'front');
                    final_transcript = final_transcript.replace(/France/g,'front');
                    final_transcript = final_transcript.replace(/friends/g,'front');
                    final_transcript = final_transcript.replace(/block/g,'black');
                    final_transcript = final_transcript.replace(/hair/g,'here');
                    final_transcript = final_transcript.replace(/year/g,'here');
                    final_transcript = final_transcript.replace(/coffee/g,'copy');
                    final_transcript = final_transcript.replace(/to/g,'two');
                    final_transcript = final_transcript.replace(/things/g,'change');
                    // $("#log").val(final_transcript);
                    // QueryProcess(final_transcript);

                    // $('input.b').removeClass("flash");// I think this is a problem
                    // if(track[0] && track.length!== "system" && track[1] !== "system"){
                    //     $('input.b').removeClass("flash");// I think this is a problem
                    // }
                    if((track[0] === "system" && track.length === 1) || (track[1] === "system" && track.length === 2)){
                        console.log('=======pass count 0 *** system');
                        $('input.b').addClass("flash");
                        $("#output").text("Listening").css("color","red");
                        //this is the case only when system is called
                    }else{
                        // final_transcript = final_transcript.replace(/system/g,'');
                        console.log('=======pass count 0 *** not',final_transcript);
                        $("#log").val(final_transcript);
                        QueryProcess(final_transcript);

                        console.log('system+pause+command');
                        $('input.b').removeClass("flash");// I think this is a problem
                    }
                    givePass = false;
                } else{// this case is system and command continus
                    console.log('=======pass count **not0',final_transcript);
                    $("#log").val(final_transcript);
                    QueryProcess(final_transcript);

                    console.log('system+command');
                    givePass = false;
                    $('input.b').removeClass("flash");// I think this is a problem
                }
            }
        } else {// not final
            if(givePass === true){
                interim_transcript += event.results[i][0].transcript;
                console.log('givePass interim',interim_transcript);
                // command_flag = true;
            }else{// saying something else
                interim_transcript += event.results[i][0].transcript;
                console.log('not givePass interim',interim_transcript);
                var trueStr = interim_transcript.split(" ");
                if(trueStr[0] === "system"){
                    command_flag = true;
                    // $('input.b').addClass("flash");
                }else if(trueStr[1] === "system"){
                    command_flag = true;
                    // $('input.b').addClass("flash");
                }else{
                    command_flag = false;
                }
            }

        }//end of else
    }// end of for loop

    if(interim_transcript!='') {
        console.log('######interim_transcript',interim_transcript);
        console.log('system flag',system_flag,"temp_flag", temp_flag,"command_flag",command_flag);
        var trueStr = interim_transcript.split(" ");
        track = trueStr;
        interim_transcript = interim_transcript.replace(/france/g,'front');
        interim_transcript = interim_transcript.replace(/France/g,'front');
        interim_transcript = interim_transcript.replace(/friends/g,'front');
        interim_transcript = interim_transcript.replace(/block/g,'black');
        interim_transcript = interim_transcript.replace(/hair/g,'here');
        interim_transcript = interim_transcript.replace(/year/g,'here');
        interim_transcript = interim_transcript.replace(/coffee/g,'copy');
        interim_transcript = interim_transcript.replace(/to/g,'two');
        interim_transcript = interim_transcript.replace(/things/g,'change');
        var temp = interim_transcript;
        ret = temp.replace(/system/g,'');
        if(command_flag === true){
            // $('input.b').addClass("flash");
            // $("#output").text("Listening").css("color","red");
            // $('input.b').addClass("flash");
            $("#log").val(ret);
        }
    }else{
        console.log('#####end of sentence');
    }

};


// this is to track the position
window.addEventListener('load', function(){
    var box1 = document.getElementById('container');
    var startx = 0;
    var starty = 0;

    box1.addEventListener('pointerdown', function(e){
        startx = e.pageX;// get x position of touch point relative to left edge of browser
        starty = e.pageY;
        console.log('pointer down tract', startx - box1.offsetLeft, starty - box1.offsetTop);

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

