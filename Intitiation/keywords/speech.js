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
// recognition.interimResults = false;
recognition.interimResults = true;

recognition.maxAlternatives = 1;
recognition.continuous = true;

var recongizing = false;

recognition.onstart = function () {
    recongizing = true;
};

recognition.onend = function () {
    console.log('here');
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

    console.log('Speech recognition has stopped.');
};

//arjun code start
count = 0;

// recognition.start();

let final_transcript = '';
recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
        interim_transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            console.log('final transcript',final_transcript);
            // $("h3").val(final_transcript);
            $("h3").text(final_transcript);

            var temp = final_transcript.split(' ');
            if (count === 0) {
                if(temp[0] === 'system' || temp[0] === "System"){
                    var shape = temp[1];
                    var clr = temp[2];
                    $("#output").text("System is listening");
                }
            } else {
                if(temp[1] === 'system' || temp[1] === "System"){
                    var shape = temp[2];
                    var clr = temp[3];
                    $("#output").text("System is listening");
                }
            }
            count += 1;
            color = clr;


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
                console.log('does it go here?');
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
            // recognition.stop();
            // let query = final_transcript;
            // speechQueryProcessor.process(query,invokedBy);
        }
    }
    if(interim_transcript!='') {
        console.log('interim transcript',interim_transcript);
        $("h3").text(interim_transcript);




        }

};


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








