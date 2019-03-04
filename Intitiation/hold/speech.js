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
    recongizing = true;
};

recognition.onend = function () {
    document.getElementById('listen').style.display = "none";
    document.getElementById('say_color').style.display = "none";
    recongizing = false;
};

recognition.onerror = function (event) {
    recongizing = false;
};

recognition.onnomatch = function(event) {
    diagnostic.textContent = "I didn't recognise that color.";
    console.log('no match!!!!');
};


diagnostic = document.getElementById('output');

// if (recognizing) {
//     // Do stuff
// }

check_flag = false;
magic_flag = false;

// recognition.start();

recognition.onspeechend = function() {

    recognition.stop();
    document.getElementById('listen').style.display = "none";
    document.getElementById('say_color').style.display = "none";
    console.log('Speech recognition has stopped.');
};

//arjun code start
count = 0;
let final_transcript = '';
recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
        interim_transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            // $("h3").val(final_transcript);
            $("h3").text(final_transcript);
            // recognition.stop();
            // let query = final_transcript;
            // speechQueryProcessor.process(query,invokedBy);
        }
    }
    if(interim_transcript!='') {
        var temp = interim_transcript.split(' ');
        if (count === 0) {
            var shape = temp[0];
            var clr = temp[1]
        } else {
            var shape = temp[1];
            var clr = temp[2]
        }
        count += 1;
        color = clr;

        $("h3").text(interim_transcript);

        if (shape === "all") {
            console.log('all shape change color');
            drawAllShapes();
            $("#output").text("System is listening");
        } else if (shape === "triangle" || shape === "Triangle") {
            drawTriangle();
            $("#output").text("System is listening");

        } else if (shape === "circle" || shape === "Circle") {
            drawCircle();
            $("#output").text("System is listening");

        } else if (shape === "rectangle" || shape === "Rectangle") {
            drawRect();
            $("#output").text("System is listening");

        } else if (shape === "change") {
            color = clr;
            $("#output").text("System is listening");

        } else if (clr === 'peru' || clr === 'salmon' || clr === 'magenta' || clr === 'wheat' || clr === 'violet' || clr === 'plum' || clr === 'tomato' || clr === 'silver' || clr === 'teal' || clr === 'red') {
            color = clr;
            $("#output").text("System is listening");

        } else {
            $("#output").text("Sorry I don't understand");
        }

    }

};
// $('#container').on("touchstart",function(e){
//     console.log('being touchstart');
//     recognition.start();
//
// });

// $('#container').on("touchend",function(e){
//     console.log('touchend');
//     recognition.stop();
//
// });

// var container = document.getElementById("container");
//
// container.addEventListener("touchend", makeTouchEnd, false);
// container.addEventListener("touchcancel", makeTouchEnd, false);
//
//
// function makeTouchEnd(event){
//     console.log('end touch');
//     event.preventDefault();
//     recognition.stop();
//     return false;
// }


// recognition.stop();


// if(!recongizing){
//     recognition.start();
// }

function drawAllShapes(){

    var new_circle = new Konva.Circle({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 30 + Math.random() * 30,
        // fill: 'yellow',
        fill: color,
        name:'rect',
        // stroke: 'black',
        // strokeWidth: 4,
        draggable: true
    });


    layer.add(new_circle);
    layer.draw();

    var new_rect = new Konva.Rect({
        x: Math.random() * width,
        y: Math.random() * height,
        width: 30 + Math.random() * 30,
        height: 30 + Math.random() * 30,
        // fill: 'grey',
        fill: color,
        name: 'rect',
        draggable: true
    });

    layer.add(new_rect);
    layer.draw();

    var new_triangle = new Konva.RegularPolygon({
        x: Math.random() * width,
        y: Math.random() * height,
        sides: 3,
        radius: 50,
        fill: color,
        // fill: '#00D2FF',
        // stroke: 'black',
        // strokeWidth: 4
        name: 'rect',
        draggable: true,
    });

    layer.add(new_triangle);
    layer.draw();

}



// if(globalVars.recognizingSpeech==false){
//     recognizer.start();
// }

//arjun code last

// detect the magic word
// recognition.onresult = e => {
//     var transcripts  = [].concat.apply([], [...e.results].map(res => [...res].map(alt => alt.transcript)));
//
//
//     if(transcripts.some(t=>t.indexOf(magic_word)>-1)){
//
//         console.log('magic word');
//         check_flag = true;
//         document.getElementById('listen').style.display = "block";
//         document.getElementById('say_color').style.display = "block";
//
//         magic_flag = true;
//
//         command = transcripts.toString();
//
//         command = command.replace(/\s/gi,'');
//         $('h3').text(command);
//
//         if(e.results.isFinal){
//             console.log('the end');
//         }
//
//         if(command==="system"){
//             console.log('system called');
//         }else{
//             color = transcripts[1].toString();
//             $('h3').text(color);
//
//             var last = e.results.length - 1;
//             var color_test = e.results[last][0].transcript;
//             // if(e.results[last][0].isFinal){
//             //     console.log('the end');
//             // }
//             var color_test = color_test.toLowerCase();
//             color_test = color_test.replace(/\s/gi,'');
//
//             console.log('color_test',color_test);
//
//             if(color_test === 'peru' || color_test === 'salmon' || color_test === 'magenta' || color_test === 'wheat'|| color_test === 'violet'||color_test === 'plum'||color_test === 'tomato'||color_test === 'silver'||color_test === 'teal'||color_test === 'darkred'){
//                 diagnostic.textContent = 'Result received: ' + color_test + '.';
//
//                 color = color_test;
//             }
//
//
//         }
//
//         if(!recognizing){
//             recognition.start();
//         }
//
//     }
//     else{
//         // log('understood ' + JSON.stringify(transcripts));
//         check_flag = true;
//         console.log('just anything');
//         document.getElementById('listen').style.display = "block";
//         document.getElementById('say_color').style.display = "block";
//
//         // colour = JSON.stringify(transcripts);
//         var colour = transcripts.toString();
//         var colour = colour.toLowerCase();
//         // strip the spaces out of it
//         colour = colour.replace(/\s/gi,'');
//         $('h3').text(colour);
//
//
//         console.log('color',colour);
//         color = colour;
//
//         var last = e.results.length - 1;
//         var color_test = e.results[last][0].transcript;
//         // if(e.results[last][0].isFinal){
//         //     console.log('the end here');
//         // }
//         var color_test = color_test.toLowerCase();
//         color_test = color_test.replace(/\s/gi,'');
//
//         console.log('color_test',color_test);
//
//         if(color_test === 'peru' || color_test === 'salmon' || color_test === 'magenta' || color_test === 'wheat'|| color_test === 'violet'||color_test === 'plum'||color_test === 'tomato'||color_test === 'silver'||color_test === 'teal'||color_test === 'darkred'){
//             diagnostic.textContent = 'Result received: ' + color_test + '.';
//
//             color = color_test;
//
//         }
//
//
//
//
//         // if(!recognizing){
//         //     recognition.start();
//         // }
//         if(!recognizing){
//             recognition.start();
//         }
//
//     }
//
// };







