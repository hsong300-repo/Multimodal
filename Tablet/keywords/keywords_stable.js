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
    var ret = '';
    // var system_flag = '';
    var temp_flag = system_flag;

    console.log('track before', track, track.length);

    if((track[0] === "system" && track.length === 1) || (track[1] === "system" && track.length === 2)){
        console.log('system true');
        system_flag = true;

        pass_count = -1;
        command_flag = true;
        givePass = true;
    }else{
        system_flag = false;

    }

    console.log('givePass', givePass);
    //it should be executed while true, false change to true,

    final_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        console.log('results');
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            console.log("***final_transcript:::",final_transcript);
            count++;
            pass_count++;
            console.log('count',count);
            if(command_flag === true){
                if(pass_count === 0 ){
                    final_transcript = final_transcript.replace(/system/g,'');
                    // $("#log").val(final_transcript);
                    // QueryProcess(final_transcript);

                    // $('input.b').removeClass("flash");// I think this is a problem
                    // if(track[0] && track.length!== "system" && track[1] !== "system"){
                    //     $('input.b').removeClass("flash");// I think this is a problem
                    // }
                    if((track[0] === "system" && track.length === 1) || (track[1] === "system" && track.length === 2)){
                        //this is the case only when system is called
                        console.log('system is called and move on');
                    }else{
                        // final_transcript = final_transcript.replace(/system/g,'');
                        $("#log").val(final_transcript);
                        QueryProcess(final_transcript);

                        console.log('system+pause+command');
                        $('input.b').removeClass("flash");// I think this is a problem
                    }
                    givePass = false;
                } else{// this case is system and command continus
                    $("#log").val(final_transcript);
                    QueryProcess(final_transcript);

                    console.log('system+command');
                    givePass = false;
                    $('input.b').removeClass("flash");// I think this is a problem
                }
            }
        } else {
            if(givePass === true){
                interim_transcript += event.results[i][0].transcript;
                // command_flag = true;
            }else{
                // console.log('flag track',command_flag);
                interim_transcript += event.results[i][0].transcript;
                var trueStr = interim_transcript.split(" ");
                // track = trueStr;
                // console.log('track',track);
                console.log("trueStr",trueStr);
                console.log("here first and second",trueStr[0],trueStr[1]);
                if(trueStr[0] === "system"){
                    command_flag = true;
                }else if(trueStr[1] === "system"){
                    command_flag = true;
                }else{
                    command_flag = false;
                }
            }


        }//end of else
    }// end of for loop

    if(interim_transcript!='') {
        console.log('interim_transcript',interim_transcript);
        console.log('system flag',system_flag,"temp_flag", temp_flag,"command_flag",command_flag);

        // console.log('interim transcript typeof',typeof interim_transcript);
        var trueStr = interim_transcript.split(" ");
        track = trueStr;
        var temp = interim_transcript;
        ret = temp.replace(/system/g,'');
        if(command_flag === true){
            $("#log").val(ret);
            $('input.b').addClass("flash");
        }


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

