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
            $("#log").val(final_transcript);
            QueryProcess(final_transcript);
            document.getElementById('listen').style.display = "none";
            annyang.abort();
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

function EnableSpeech(){

    annyang.start();
    document.getElementById('listen').style.display = "block";


}

