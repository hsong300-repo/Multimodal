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

// var group = new Konva.Group({
//     x: Math.random() * width,
//     y: Math.random() * height,
//     draggable: true
// });

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
    console.log('here change in position');
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

    // if (!e.target.hasName('circle')) {
    //     console.log('circle here');
    //     return;
    // }
    //
    // if (!e.target.hasName('triangle')) {
    //     console.log('triangle here');
    //     return;
    // }
    // remove old transformers
    // TODO: we can skip it if current rect is already selected
    stage.find('Transformer').destroy();

    // create new transformer
    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(e.target);
    layer.draw();
});

//when click the object
// stage.on('click', function (e) {
//     console.log('click the object');
//     // if click on empty area - remove all transformers
//     // if (e.target === stage) {
//     //     stage.find('Transformer').destroy();
//     //     layer.draw();
//     //     return;
//     // }
//     // do nothing if clicked NOT on our rectangles
//     if (e.target.hasName('rect')) {
//         var fill = color;
//         e.target.fill(fill);
//
//         layer.add(e.target);
//         layer.draw();
//
//         // stage.add(layer);
//         // return;
//     }
//
//     if (e.target.hasName('circle')) {
//         var fill = color;
//         e.target.fill(fill);
//
//         layer.add(e.target);
//         layer.draw();
//
//         // stage.add(layer);
//         // return;
//     }
//
//     if (e.target.hasName('triangle')) {
//         var fill = color;
//         e.target.fill(fill);
//
//         layer.add(e.target);
//         layer.draw();
//
//         // stage.add(layer);
//         // return;
//     }
//     // remove old transformers
//     // TODO: we can skip it if current rect is already selected
//
// });




function drawCircle(color){
    console.log(color);

    if(color == null){
        color = "black";
    }

    if(touch_color === true){
        color = fillColor;
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
        // strokeWidth: 4,
        draggable: true
    });

    layer.add(new_circle);
    layer.draw();

    touch_color = false;
}

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

function drawRect(color){

    if(color == null){
        color = "black";
    }

    if(touch_color === true){
        color = fillColor;
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
        draggable: true
    });

    layer.add(new_rect);
    layer.draw();

    touch_color = false;

}

function drawTriangle(color){

    if(color == null){
        color = "black";
    }

    if(touch_color === true){
        color = fillColor;
    }


    new_triangle = new Konva.RegularPolygon({
        x: Math.random() * width,
        y: Math.random() * height,
        sides: 3,
        radius: 50,
        fill: color,
        // fill: '#00D2FF',
        // stroke: 'black',
        // strokeWidth: 4
        name: 'triangle',
        draggable: true,
    });

    layer.add(new_triangle);
    layer.draw();

    touch_color = false;

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


    // shapes.visible('false');


    stage.on('click', function (e) {
        console.log('click the object');

        if (e.target.hasName('triangle')) {
            // var fill = color;
            e.target.visible(false);

            layer.add(e.target);
            layer.draw();

        }

    });

    layer.add(shapes);
    layer.draw();
}

function removeLastRect(){

    var shapes = stage.findOne('.rect');

    // shapes.visible('false');

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

function removeLastCircle(){

    var shapes = stage.findOne('.circle');

    // shapes.visible('false');

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

function removeCircle(){

    // group.findOne('.circle').remove();
    // layer.add(group);
    // layer.draw();



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

