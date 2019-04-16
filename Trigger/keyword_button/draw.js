// var width = window.innerWidth;
// var height = window.innerHeight;
rect_flag = false;
circle_flag= false;
triangle_flag = false;

rect_stroke = false;
circle_stroke= false;
triangle_stroke = false;


var width = 800;
var height = 600;

var stage = new Konva.Stage({
    container: 'container',
    // width: width,
    // height: height
    width: 800,
    height: 600
});

// var group = new Konva.Group({
//     x: Math.random() * width,
//     y: Math.random() * height,
//     draggable: true
// });

var layer = new Konva.Layer({draggable: false});
stage.add(layer);

// draw a background rect to catch events.
var r1 = new Konva.Rect({x: 0, y: 0, width: 800, height: 600, fill: 'silver' });
layer.add(r1);



document.getElementById('shapeFormat').style.display = "block";
// document.getElementById('color').addEventListener('change', shapeFill);
// document.getElementById('border_color').addEventListener('change', strokeFill);


stage.on('click tap', function (e) {
    // console.log('here change in position');
    // if click on empty area - remove all transformers
    if (e.target === stage) {
        stage.find('Transformer').destroy();
        layer.draw();
        return;
    }
    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('rect') && !e.target.hasName('circle') && !e.target.hasName('triangle')) {
        console.log('rect here');
        return;
    }

    if(e.target.hasName('rect')){
        rect_flag = true;
        circle_flag= false;
        triangle_flag = false;

        rect_stroke = true;
        circle_stroke= false;
        triangle_stroke = false;

        // changeRect(color);
    }else if(e.target.hasName('circle')){
        rect_flag = false;
        circle_flag= true;
        triangle_flag = false;

        rect_stroke = false;
        circle_stroke= true;
        triangle_stroke = false;

        // changeCircle(color);
    }else if(e.target.hasName('triangle')){
        rect_flag = false;
        circle_flag= false;
        triangle_flag = true;

        rect_stroke = false;
        circle_stroke= false;
        triangle_stroke = true;

        // changeTriangle(color);
    }

    // remove old transformers
    // TODO: we can skip it if current rect is already selected
    stage.find('Transformer').destroy();

    // create new transformer
    var tr = new Konva.Transformer({
        anchorSize:20,
    });
    layer.add(tr);
    tr.attachTo(e.target);
    layer.draw();

});

// function drawGroupCircle(color){
//     console.log(color);
//
//     if(color == null){
//         color = "black";
//     }
//
//     group = new Konva.Group({
//         x: Math.random() * width,
//         y: Math.random() * height,
//         draggable: true
//     });
//
//     var shape = new Konva.Circle({
//         width: 30 + Math.random() * 30,
//         height: 30 + Math.random() * 30,
//         fill: 'grey',
//         rotation: 360 * Math.random(),
//         name: 'circle'
//     });
//     group.add(shape);
//
//     // new_circle = new Konva.Circle({
//     //     x: Math.random() * width,
//     //     y: Math.random() * height,
//     //     // radius: 30 + Math.random() * 30,
//     //     radius: 30,
//     //     // fill: 'yellow',
//     //     fill: color,
//     //     name:'circle',
//     //     // stroke: 'black',
//     //     // strokeWidth: 4,
//     //     draggable: true
//     // });
//
//
//     layer.add(group);
//     layer.draw();
// }

function drawCircle(color){

    if(color == null){
        color = "silver";
    }

    if(touch_color === true){
        color = fillColor;
    }

    if(touch_border_color === true){
        stroke_color = border_color;
    }else{
        stroke_color = 'black';
    }

    new_circle = new Konva.Circle({
        x: Math.random() * width,
        y: Math.random() * height,
        // radius: 30 + Math.random() * 30,
        radius: 30,
        // fill: 'yellow',
        fill: color,
        name:'circle',
        // stroke: 'black',
        stroke: stroke_color,
        strokeWidth: 4,
        draggable: true
    });

    layer.add(new_circle);
    layer.draw();

    touch_color = false;
    touch_border_color = false;
}

function drawRect(color){


    if(color == null){
        color = "silver";
    }

    if(touch_color === true){
        color = fillColor;
    }

    if(touch_border_color === true){
        stroke_color = border_color;
    }else{
        stroke_color = 'black';
    }

    new_rect = new Konva.Rect({
        x: Math.random() * width,
        y: Math.random() * height,
        width: 50,
        height: 50,
        // width: 30 + Math.random() * 30,
        // height: 30 + Math.random() * 30,
        // fill: 'grey',
        fill: color,
        name: 'rect',
        // stroke: 'black',
        stroke: stroke_color,
        strokeWidth: 4,
        draggable: true
    });

    layer.add(new_rect);
    layer.draw();

    touch_color = false;
    touch_border_color = false;
}

function drawTriangle(color){


    if(color == null){
        color = "silver";
    }

    if(touch_color === true){
        color = fillColor;
    }


    if(touch_border_color === true){
        stroke_color = border_color;
    }else{
        stroke_color = 'black';
    }

    new_triangle = new Konva.RegularPolygon({
        x: Math.random() * width,
        y: Math.random() * height,
        sides: 3,
        radius: 50,
        fill: color,
        // fill: '#00D2FF',
        // stroke: 'black',
        stroke: stroke_color,
        strokeWidth: 4,
        name: 'triangle',
        draggable: true,
    });

    layer.add(new_triangle);
    layer.draw();

    touch_color = false;
    touch_border_color = false;
}



function removeTriangle(){

    var shapes = stage.find('.triangle');

    var tweens = [];

    for (var n=0; n<tweens.length; n++) {
        tweens[n].destroy();
    }

    shapes.each(function(shape) {
        tweens.push(new Konva.Tween({
            node: shape,
            // fill:'red',
            opacity:0,
            // easing: Konva.Easings.ElasticEaseOut
        }).play());

    });

    layer.add(shapes);
    layer.draw();
}

function removeLastTriangle(){

    var shapes = stage.find('.triangle');


    shapes.visible(false);

    layer.add(shapes);
    layer.draw();
}

function removeLastRect(){

    var shapes = stage.findOne('.rect');

    shapes.visible(false);

    layer.add(shapes);
    layer.draw();
}

function removeLastCircle(){

    var shapes = stage.findOne('.circle');

    shapes.visible(false);

    layer.add(shapes);
    layer.draw();
}

function removeCircle(){

    var shapes = stage.find('.circle');

    var tweens = [];

    for (var n=0; n<tweens.length; n++) {
        tweens[n].destroy();
    }

    shapes.each(function(shape) {
        tweens.push(new Konva.Tween({
            node: shape,
            // fill:'red',
            opacity:0,
            // easing: Konva.Easings.ElasticEaseOut
        }).play());

    });

    layer.add(shapes);
    layer.draw();

    // layer.find('.circle').remove();
    //
    // layer.find('.circle').hide();


    // console.log("all circles",layer.find('Circle'));
    //
    // stage.on('click', function (e) {
    //     console.log('click the object');
    //
    //     if (e.target.hasName('circle')) {
    //         // var fill = color;
    //         e.target.visible(false);
    //
    //         layer.add(e.target);
    //         layer.draw();
    //
    //     }
    //
    // });

}

function removeRect(){

    var shapes = stage.find('.rect');

    var tweens = [];

    for (var n=0; n<tweens.length; n++) {
        tweens[n].destroy();
    }

    shapes.each(function(shape) {
        tweens.push(new Konva.Tween({
            node: shape,
            // fill:'red',
            opacity:0,
            // easing: Konva.Easings.ElasticEaseOut
        }).play());

    });

    layer.add(shapes);
    layer.draw();


}

function changeRect(color){

    if(color == null){
        color = "black";
    }

    var shapes = stage.find('.rect');

    var tweens = [];

    for (var n=0; n<tweens.length; n++) {
        tweens[n].destroy();
    }

    shapes.each(function(shape) {
        tweens.push(new Konva.Tween({
            node: shape,
            fill:color,
            // opacity:0,
            // easing: Konva.Easings.ElasticEaseOut
        }).play());

    });

    layer.add(shapes);
    layer.draw();
}

function changeCircle(color){

    if(color == null){
        color = "black";
    }

    var shapes = stage.find('.circle');

    var tweens = [];

    for (var n=0; n<tweens.length; n++) {
        tweens[n].destroy();
    }

    shapes.each(function(shape) {
        tweens.push(new Konva.Tween({
            node: shape,
            fill:color,
            // opacity:0,
            // easing: Konva.Easings.ElasticEaseOut
        }).play());

    });

    layer.add(shapes);
    layer.draw();
}

function changeTriangle(color){

    if(color == null){
        color = "black";
    }

    var shapes = stage.find('.triangle');

    var tweens = [];

    for (var n=0; n<tweens.length; n++) {
        tweens[n].destroy();
    }

    shapes.each(function(shape) {
        tweens.push(new Konva.Tween({
            node: shape,
            fill:color,
            // opacity:0,
            // easing: Konva.Easings.ElasticEaseOut
        }).play());

    });

    layer.add(shapes);
    layer.draw();
}

function changeRectStroke(color){

    if(color == null){
        color = "black";
    }

    var shapes = stage.find('.rect');

    var tweens = [];

    for (var n=0; n<tweens.length; n++) {
        tweens[n].destroy();
    }

    shapes.each(function(shape) {
        tweens.push(new Konva.Tween({
            node: shape,
            stroke:color,
            // opacity:0,
            // easing: Konva.Easings.ElasticEaseOut
        }).play());

    });

    layer.add(shapes);
    layer.draw();
}

function changeCircleStroke(color){

    if(color == null){
        color = "black";
    }

    var shapes = stage.find('.circle');

    var tweens = [];

    for (var n=0; n<tweens.length; n++) {
        tweens[n].destroy();
    }

    shapes.each(function(shape) {
        tweens.push(new Konva.Tween({
            node: shape,
            stroke:color,
            // opacity:0,
            // easing: Konva.Easings.ElasticEaseOut
        }).play());

    });

    layer.add(shapes);
    layer.draw();
}

function changeTriangleStroke(color){

    if(color == null){
        color = "black";
    }

    var shapes = stage.find('.triangle');

    var tweens = [];

    for (var n=0; n<tweens.length; n++) {
        tweens[n].destroy();
    }

    shapes.each(function(shape) {
        tweens.push(new Konva.Tween({
            node: shape,
            stroke:color,
            // opacity:0,
            // easing: Konva.Easings.ElasticEaseOut
        }).play());

    });

    layer.add(shapes);
    layer.draw();
}


function changeColor(color){

    stage.on('click', function (e) {
        console.log('click the object');

        if (e.target.hasName('rect') || e.target.hasName('circle') || e.target.hasName('triangle')) {
            // var fill = color;
            e.target.fill(color);

            layer.add(e.target);
            layer.draw();

        }

    });


}


diagnostic = document.getElementById('output');


$("button").click(function() {

    var fired_button = $(this).val();

    // alert(fired_button);
    check_flag = false;


    color = fired_button;
    diagnostic.textContent = 'Result received: ' + fired_button + '.';

});
