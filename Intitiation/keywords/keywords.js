if (annyang) {
    // Let's define a command.
    var commands = {
        'hello': function() { alert('Hello world!'); },
        'system draw (a) circle': drawCircle,
        // 'system draw (a) circle': drawGroupCircle,
        'system draw (a) rectangle': drawRect,
        'system draw (a) triangle': drawTriangle,
        'system draw (a) :color circle': drawCircle,
        'system draw (a) :color rectangle': drawRect,
        'system draw (a) :color triangle': drawTriangle,
        'system remove (all) triangles': removeTriangle,
        'system remove (all) rectangles': removeRect,
        'system remove (all) circles': removeCircle,
        // 'system remove (a) last (drawn) triangle': removeLastTriangle,
        // 'system remove (a) last (drawn) rectangle': removeLastRect,
        // 'system remove (a) last (drawn) circle': removeLastCircle,
        'system change triangles (to) :color': changeTriangle,
        'system change rectangles (to) :color': changeRect,
        'system change circles (to) :color': changeCircle,
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
annyang.start();
count = 0;

recognition.onresult = function(event) {
    var interim_transcript = '';
    final_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            // console.log("final_transcript");
            // console.log('final',final_transcript);
            count++;
            annyang.trigger(final_transcript); //If the sentence is "final" for the Web Speech API, we can try to trigger the sentence
        } else {
            interim_transcript += event.results[i][0].transcript;
            var magic_word = interim_transcript.split(' ');
            command_flag = false;
            if(count === 0){
                if(magic_word[0] === "system" || magic_word[0] === " system"){
                    console.log('first system');
                    command_flag =true;
                    // $("#log").text(interim_transcript);
                }else{
                    console.log('first system');
                    command_flag =false;
                }
            }else{
                if(magic_word[1] === "system" || magic_word[1] === " system" ){
                    console.log('second system');
                    command_flag =true;
                    // $("#log").text(interim_transcript);
                }else{
                    command_flag =false;
                }
            }
            // console.log("*interim_transcript", interim_transcript, event.results[0][0].transcript);
            // console.log("**interim_transcript", event.results[0][0].transcript);

            // console.log(interim_transcript);
        }
    }
    if(interim_transcript!='') {
        if(command_flag === true){
            document.getElementById('listen').style.display = "block";
            $("#log").text(interim_transcript);
        }else{
            document.getElementById('listen').style.display = "none";
        }


    }
    // final_transcript = capitalize(final_transcript);
    // final_span.innerHTML = linebreak(final_transcript);
    // interim_span.innerHTML = linebreak(interim_transcript);
};