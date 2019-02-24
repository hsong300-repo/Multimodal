// var width = window.innerWidth;
// var height = window.innerHeight;


var width = 800;
var height = 600;

var stage = new Konva.Stage({
    container: 'container',
    // width: width,
    // height: height
    width: 800,
    height: 600
});

var layer = new Konva.Layer();
stage.add(layer);

// var rect1 = new Konva.Rect({
//     x: 60,
//     y: 60,
//     width: 100,
//     height: 90,
//     fill: 'red',
//     name: 'rect',
//     draggable: true
// });
// layer.add(rect1);
//
// var rect2 = new Konva.Rect({
//     x: 250,
//     y: 100,
//     width: 150,
//     height: 90,
//     fill: 'green',
//     name: 'rect',
//     draggable: true
// });
// layer.add(rect2);
// layer.draw();

stage.on('click tap', function (e) {
    // if click on empty area - remove all transformers
    if (e.target === stage) {
        stage.find('Transformer').destroy();
        layer.draw();
        return;
    }
    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('rect')) {
        return;
    }
    // remove old transformers
    // TODO: we can skip it if current rect is already selected
    stage.find('Transformer').destroy();

    // create new transformer
    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(e.target);
    layer.draw();
});


function drawCircle(){
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
}

function drawRect(){
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

}

function drawTriangle(){

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

$("button").click(function() {
    var fired_button = $(this).val();
    alert(fired_button);

    color = fired_button;
});
