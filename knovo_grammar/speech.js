var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'peru' , 'salmon' , 'magenta', 'wheat', 'violet', 'plum', 'tomato', 'silver', 'teal', 'darkred'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'




if(!window.webkitSpeechRecognition){
    log('Sorry this will work only in Chrome for now...');
}
const magic_word = 'system';
// initialize our SpeechRecognition object
let recognition = new webkitSpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;

recognition.lang = 'en-US';
recognition.interimResults = false;
// recognition.interimResults = true;

recognition.maxAlternatives = 1;
recognition.continuous = true;

var recongizing = false;

recognition.onstart = function () {
    recognizing = true;
};

recognition.onend = function () {
    recognizing = false;
};

recognition.onerror = function (event) {
    recognizing = false;
};

recognition.onnomatch = function(event) {
    diagnostic.textContent = "I didn't recognise that color.";
};


diagnostic = document.getElementById('output');

// if (recognizing) {
//     // Do stuff
// }

check_flag = false;
magic_flag = false;

recognition.start();

recognition.onspeechend = function() {
    recognition.stop();
    document.getElementById('listen').style.display = "none";
    document.getElementById('say_color').style.display = "none";
    console.log('Speech recognition has stopped.');
};

// detect the magic word
recognition.onresult = e => {
    var transcripts  = [].concat.apply([], [...e.results].map(res => [...res].map(alt => alt.transcript)));
    if(transcripts.some(t=>t.indexOf(magic_word)>-1)){

        console.log('magic word');
        check_flag = true;
        document.getElementById('listen').style.display = "block";
        document.getElementById('say_color').style.display = "block";

        magic_flag = true;

        command = transcripts.toString();

        command = command.replace(/\s/gi,'');
        $('h3').text(command);

        if(command==="system"){
            console.log('system called');
        }else{
            color = transcripts[1].toString();
            $('h3').text(color);

            var last = e.results.length - 1;
            var color_test = e.results[last][0].transcript;
            color = color_test;

            diagnostic.textContent = 'Result received: ' + color_test + '.';


        }

        if(!recognizing){
            recognition.start();
        }

    }
    else{
        // log('understood ' + JSON.stringify(transcripts));
        check_flag = true;
        console.log('just anything');
        document.getElementById('listen').style.display = "block";
        document.getElementById('say_color').style.display = "block";

        // colour = JSON.stringify(transcripts);
        var colour = transcripts.toString();
        var colour = colour.toLowerCase();
        // strip the spaces out of it
        colour = colour.replace(/\s/gi,'');
        $('h3').text(colour);


        console.log('color',colour);
        color = colour;

        var last = e.results.length - 1;
        var color_test = e.results[last][0].transcript;

        diagnostic.textContent = 'Result received: ' + color_test + '.';

        color = color_test;


        // if(!recognizing){
        //     recognition.start();
        // }
        if(!recognizing){
            recognition.start();
        }

    }

};


function EnableSpeech(){
    speech_flag = true;
    touch_flag = false;
    document.getElementById('say_color').style.display = "block";
    document.getElementById('listen').style.display = "block";

    console.log('speech true');
    check_flag = true;

    if(!recognizing){
        recognition.start();
    }

}

// document.body.onclick = function() {
document.body.onclick = function(event) {
    console.log('Ready to receive a color command.');

    if( $(event.target).closest("#speech").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#rect").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#circle").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#triangle").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#container").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#say_color").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#content").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#listen").length > 0 ) {
        return false;
    }
    //buttons
    if( $(event.target).closest(".button").length > 0 ) {
        return false;
    }

    if(!recognizing){
        recognition.start();
    }

    document.getElementById('say_color').style.display = "block";
    document.getElementById('listen').style.display = "block";

    speech_flag = true;
    touch_flag = false;
    check_flag = true;


};


//temporarily removed
// called when we detect silence
function stopSpeech(){

    console.log('no input');

    recognition.stop();
    document.getElementById('listen').style.display = "none";
    document.getElementById('say_color').style.display = "none";


    // setTimeout(function(){document.getElementById('listen').style.display = "none";
    // },3000);
    // setTimeout(function(){document.getElementById('say_color').style.display = "none";
    // },3000);
    // setTimeout(function(){recognition.stop();
    // },3000);


    // recognition.stop();
    // status_.className = 'inactive';
    // document.getElementById('listen').style.display = "none";

}
// called when we detect sound
function startSpeech(){

    recognition.start();

    console.log('recognition start');

    try{ // calling it twice will throw...
        if(check_flag === true){
            speech_flag = true;
            touch_flag = false;
            // status_.className = 'active';

        }

        recognition.start();

    }
    catch(e){
        console.log('does this gets called?');
    }
    status_.className = 'active';
}
// request a LocalMediaStream
// navigator.mediaDevices.getUserMedia({audio:true})
// // add our listeners
//     .then(stream => detectSilence(stream, stopSpeech, startSpeech))
//     .catch(e => log(e.message));
//
//
// function detectSilence(
//     stream,
//     onSoundEnd = _=>{},
//     onSoundStart = _=>{},
//     // silence_delay = 500,
//     // silence_delay = 5000,
//     silence_delay = 500,
//     // min_decibels = -80
//     min_decibels = -80
//
// ) {
//     const ctx = new AudioContext();
//     const analyser = ctx.createAnalyser();
//     const streamNode = ctx.createMediaStreamSource(stream);
//     streamNode.connect(analyser);
//     analyser.minDecibels = min_decibels;
//
//     const data = new Uint8Array(analyser.frequencyBinCount); // will hold our data
//     let silence_start = performance.now();
//     let triggered = false; // trigger only once per silence event
//
//     function loop(time) {
//         requestAnimationFrame(loop); // we'll loop every 60th of a second to check
//         analyser.getByteFrequencyData(data); // get current data
//         if (data.some(v => v)) { // if there is data above the given db limit
//             if(triggered){
//                 console.log('onSoundStart');
//                 triggered = false;
//                 onSoundStart();
//             }
//             silence_start = time; // set it to now
//         }
//         if (!triggered && time - silence_start > silence_delay) {
//             onSoundEnd();
//             triggered = true;
//             console.log('onSoundEnd');
//
//         }
//     }
//     loop();
// }
//
// function log(txt){
//     log_.textContent += txt + '\n';
// }