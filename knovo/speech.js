if(!window.webkitSpeechRecognition){
    log('Sorry this will work only in Chrome for now...');
}
const magic_word = 'system';
// initialize our SpeechRecognition object
let recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true;

check_flag = false;


// detect the magic word
recognition.onresult = e => {
    var transcripts  = [].concat.apply([], [...e.results].map(res => [...res].map(alt => alt.transcript)));
    if(transcripts.some(t=>t.indexOf(magic_word)>-1)){
        // log('Say a color');

        console.log('magic word');
        check_flag = true;
        document.getElementById('listen').style.display = "block";
        document.getElementById('say_color').style.display = "block";


    }
    else{
        // log('understood ' + JSON.stringify(transcripts));
        check_flag = true;

        console.log('just anything');


        if(check_flag === true){
            document.getElementById('listen').style.display = "block";
            document.getElementById('say_color').style.display = "block";
        }


        // colour = JSON.stringify(transcripts);
        colour = transcripts.toString();
        colour = colour.toLowerCase();
        // strip the spaces out of it
        colour = colour.replace(/\s/gi,'');
        $('h3').text(colour);

        console.log('color',colour);
        color = colour;


    }
};
// called when we detect silence
function stopSpeech(){
    console.log('no more input');


    setTimeout(function(){recognition.stop();
    },5000);
    setTimeout(function(){document.getElementById('listen').style.display = "none";
    },5000);
    setTimeout(function(){document.getElementById('say_color').style.display = "none";
    },5000);


    // recognition.stop();
    // status_.className = 'inactive';
    // document.getElementById('listen').style.display = "none";

}
// called when we detect sound
function startSpeech(){
    try{ // calling it twice will throw...
        if(check_flag === true){
            speech_flag = true;
            touch_flag = false;
            // status_.className = 'active';

        }
        recognition.start();

    }
    catch(e){}
    // status_.className = 'active';
}
// request a LocalMediaStream
navigator.mediaDevices.getUserMedia({audio:true})
// add our listeners
    .then(stream => detectSilence(stream, stopSpeech, startSpeech))
    .catch(e => log(e.message));


function detectSilence(
    stream,
    onSoundEnd = _=>{},
    onSoundStart = _=>{},
    silence_delay = 500,
    // silence_delay = 500,
    // min_decibels = -80
    min_decibels = -80

) {
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    const streamNode = ctx.createMediaStreamSource(stream);
    streamNode.connect(analyser);
    analyser.minDecibels = min_decibels;

    const data = new Uint8Array(analyser.frequencyBinCount); // will hold our data
    let silence_start = performance.now();
    let triggered = false; // trigger only once per silence event

    function loop(time) {
        requestAnimationFrame(loop); // we'll loop every 60th of a second to check
        analyser.getByteFrequencyData(data); // get current data
        if (data.some(v => v)) { // if there is data above the given db limit
            if(triggered){
                triggered = false;
                onSoundStart();
            }
            silence_start = time; // set it to now
        }
        if (!triggered && time - silence_start > silence_delay) {
            onSoundEnd();
            triggered = true;
        }
    }
    loop();
}
function log(txt){
    log_.textContent += txt + '\n';
}

function EnableSpeech(){

    // recognition.stop();
    // recognition.start();
    speech_flag = true;
    touch_flag = false;
    document.getElementById('say_color').style.display = "block";
    document.getElementById('listen').style.display = "block";

    console.log('speech true');
    check_flag = true;

}

// document.body.onclick = function() {
document.body.onclick = function(event) {
    // recognition.start();
    // recognition.stop();
    // recognition.start();


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

    if( $(event.target).closest("#width").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#height").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#height").length > 0 ) {
        return false;
    }
    //buttons
    if( $(event.target).closest(".button").length > 0 ) {
        return false;
    }





    document.getElementById('say_color').style.display = "block";
    document.getElementById('listen').style.display = "block";

    // document.getElementById('listen').style.display = "block";
    // setTimeout(function(){recognition.stop();
    // },5000);
    // setTimeout(function(){document.getElementById('listen').style.display = "none";
    // },5000);
    // setTimeout(function(){document.getElementById('say_color').style.display = "none";
    // },5000);

    speech_flag = true;
    touch_flag = false;
    check_flag = true;


    console.log('Ready to receive a color command.');
};