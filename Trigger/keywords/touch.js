console.log('read touch.js file');
touch_color = false;
touch_border_color = false;
remove_flag = false;

touch_rect = false;
touch_circle = false;
touch_triangle = false;



$("#color").change(function () {
    // var select_color = document.getElementById("color");
    // var fillColor = select_color.options[select_color.selectedIndex].value;
    var fillColor = $("#color option:selected").text();
    console.log('fillColor',fillColor);

    if(rect_flag=== true){
        changeRect(fillColor);
    }else if(circle_flag === true){
        changeCircle(fillColor);
    }else if(triangle_flag === true){
        changeTriangle(fillColor);
    }
});

$("#border_color").change(function () {
    // var select_color = document.getElementById("color");
    // var fillColor = select_color.options[select_color.selectedIndex].value;
    var borderColor = $("#border_color option:selected").text();
    // console.log('border_color',border_color);

    if(rect_stroke=== true){
        changeRectStroke(borderColor);
    }else if(circle_stroke === true){
        changeCircleStroke(borderColor);
    }else if(triangle_stroke === true){
        changeTriangleStroke(borderColor);
    }

    // touch_border_color = true;
    // remove_flag = false;

});

document.getElementById("touchCircle_").onclick = function draw() {
    touch_rect = false;
    touch_circle = true;
    touch_triangle = false;
    touchDraw();
};

document.getElementById("touchRect_").onclick = function draw() {
    touch_rect = true;
    touch_circle = false;
    touch_triangle = false;
    touchDraw();
};

document.getElementById("touchTriangle_").onclick = function draw() {
    touch_rect = false;
    touch_circle = false;
    touch_triangle = true;
    touchDraw();
};



function touchDraw(){
    // draw a rectangle to be used as the rubber area
    if(touch_rect === true){
        alert('rect');
        var r2 = new Konva.Rect({x: 0, y: 0, width: 0, height: 0, stroke: 'red', dash: [2,2]});
        r2.listening(false); // stop r2 catching our mouse events.
        layer.add(r2);

        // layer.draw();
        stage.draw(); // First draw of canvas.
        var posStart;
        var posNow;
        var mode = '';

        function startDrag(posIn){
            posStart = {x: posIn.x, y: posIn.y};
            posNow = {x: posIn.x, y: posIn.y};
        }

        function updateDrag(posIn){

            // update rubber rect position
            posNow = {x: posIn.x, y: posIn.y};
            var posRect = reverse(posStart,posNow);
            r2.x(posRect.x1);
            r2.y(posRect.y1);
            r2.width(posRect.x2 - posRect.x1);
            r2.height(posRect.y2 - posRect.y1);
            r2.visible(true);

            stage.draw(); // redraw any changes.
            // layer.draw(); // redraw any changes.


        }
    }else if(touch_circle === true){
        alert('circle');
        var r2 = new Konva.Circle({x: 0, y: 0, width: 0, height: 0, stroke: 'red', dash: [2,2]});
        r2.listening(false); // stop r2 catching our mouse events.
        layer.add(r2);

        // layer.draw();
        stage.draw(); // First draw of canvas.
        var posStart;
        var posNow;
        var mode = '';

        function startDrag(posIn){
            posStart = {x: posIn.x, y: posIn.y};
            posNow = {x: posIn.x, y: posIn.y};
        }

        function updateDrag(posIn){

            // update rubber rect position
            posNow = {x: posIn.x, y: posIn.y};
            var posRect = reverse(posStart,posNow);
            r2.x(posRect.x1);
            r2.y(posRect.y1);
            r2.width(posRect.x2 - posRect.x1);
            r2.height(posRect.y2 - posRect.y1);
            r2.visible(true);

            stage.draw(); // redraw any changes.
            // layer.draw(); // redraw any changes.

        }
    }else if(touch_triangle === true){
        alert('triangle');
        var r2 = new Konva.RegularPolygon({x: 0, y: 0, width: 0, height: 0, stroke: 'red', dash: [2,2]});
        r2.listening(false); // stop r2 catching our mouse events.
        layer.add(r2);

        // layer.draw();
        stage.draw(); // First draw of canvas.
        var posStart;
        var posNow;
        var mode = '';

        function startDrag(posIn){
            posStart = {x: posIn.x, y: posIn.y};
            posNow = {x: posIn.x, y: posIn.y};
        }

        function updateDrag(posIn){

            // update rubber rect position
            posNow = {x: posIn.x, y: posIn.y};
            var posRect = reverse(posStart,posNow);
            r2.x(posRect.x1);
            r2.y(posRect.y1);
            r2.width(posRect.x2 - posRect.x1);
            r2.height(posRect.y2 - posRect.y1);
            r2.visible(true);

            stage.draw(); // redraw any changes.
            // layer.draw(); // redraw any changes.


        }
    }
    // r2.listening(false); // stop r2 catching our mouse events.
    // layer.add(r2);
    //
    // // layer.draw();
    // stage.draw(); // First draw of canvas.
    // var posStart;
    // var posNow;
    // var mode = '';
    //
    // function startDrag(posIn){
    //     posStart = {x: posIn.x, y: posIn.y};
    //     posNow = {x: posIn.x, y: posIn.y};
    // }
    //
    // function updateDrag(posIn){
    //
    //     // update rubber rect position
    //     posNow = {x: posIn.x, y: posIn.y};
    //     var posRect = reverse(posStart,posNow);
    //     r2.x(posRect.x1);
    //     r2.y(posRect.y1);
    //     r2.width(posRect.x2 - posRect.x1);
    //     r2.height(posRect.y2 - posRect.y1);
    //     r2.visible(true);
    //
    //     stage.draw(); // redraw any changes.
    //     // layer.draw(); // redraw any changes.
    //
    //
    // }

// start the rubber drawing on mouse down.
    r1.on('mousedown touchstart', function(e){
        mode = 'drawing';
        // mode = 'rect';
        startDrag({x: e.evt.layerX, y: e.evt.layerY})
    });

// update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
    r1.on('mousemove touchmove', function(e){
        if (mode === 'drawing'){
            // if (mode === 'rect'){
            updateDrag({x: e.evt.layerX, y: e.evt.layerY})
        }
    });

// here we create the new rect using the location and dimensions of the drawing rect.
    r1.on('mouseup touchend', function(e){
        mode = '';
        r2.visible(false);
        if(touch_rect === true){
            var newRect = new Konva.Rect({
                x: r2.x(),
                y: r2.y(),
                width: r2.width(),
                height: r2.height(),
                fill: 'red',
                name: 'rect',
                stroke: 'black',
                strokeWidth: 4,
                // draggable:true,
                listening: true
            });
            layer.add(newRect);
            // layer.draw();
            stage.draw();
        }else if(touch_circle === true){
            var newCircle = new Konva.Circle({
                x: r2.x(),
                y: r2.y(),
                // radius: 30 + Math.random() * 30,
                radius: r2.width()/2,
                // fill: 'yellow',
                fill: 'red',
                name:'circle',
                stroke: 'black',
                strokeWidth: 4,
                listening:true
                // draggable: true
            });
            layer.add(newCircle);
            // layer.draw(); // redraw any changes.

            stage.draw();
        }else if(touch_triangle === true){
            var newTriangle = new Konva.RegularPolygon({
                x: r2.x(),
                y: r2.y(),
                sides: 3,
                radius: r2.width()/2,
                fill: 'red',
                // fill: '#00D2FF',
                stroke: 'black',
                // stroke: stroke_color,
                strokeWidth: 4,
                name: 'triangle',
                listening: true,
                // draggable: true
            });
            layer.add(newTriangle);
            stage.draw();
        }

    });



}

function touchRect(){

    alert("rectangle");

    touch_rect = true;
    if(touch_rect === true){
        // draw a rectangle to be used as the rubber area
        var r2 = new Konva.Rect({x: 0, y: 0, width: 0, height: 0, stroke: 'red', dash: [2,2]});
        r2.listening(false); // stop r2 catching our mouse events.
        layer.add(r2);

        // layer.draw();
        stage.draw(); // First draw of canvas.
        var posStart;
        var posNow;
        var mode = '';

        function startDrag(posIn){
            posStart = {x: posIn.x, y: posIn.y};
            posNow = {x: posIn.x, y: posIn.y};
        }

        function updateDrag(posIn){

            // update rubber rect position
            posNow = {x: posIn.x, y: posIn.y};
            var posRect = reverse(posStart,posNow);
            r2.x(posRect.x1);
            r2.y(posRect.y1);
            r2.width(posRect.x2 - posRect.x1);
            r2.height(posRect.y2 - posRect.y1);
            r2.visible(true);

            stage.draw(); // redraw any changes.
            // layer.draw(); // redraw any changes.


        }

// start the rubber drawing on mouse down.
        r1.on('mousedown touchstart', function(e){
            mode = 'drawing';
            // mode = 'rect';
            startDrag({x: e.evt.layerX, y: e.evt.layerY})
        });

// update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
        r1.on('mousemove touchmove', function(e){
            if (mode === 'drawing'){
                // if (mode === 'rect'){
                updateDrag({x: e.evt.layerX, y: e.evt.layerY})
            }
        });

// here we create the new rect using the location and dimensions of the drawing rect.
        r1.on('mouseup touchend', function(e){
            mode = '';
            r2.visible(false);
            var newRect = new Konva.Rect({
                x: r2.x(),
                y: r2.y(),
                width: r2.width(),
                height: r2.height(),
                fill: 'red',
                name: 'rect',
                // draggable:true,
                listening: false
            });
            layer.add(newRect);
            // layer.draw();
            stage.draw();
        });

    }// end of it

    touch_rect = false;


}

function touchCircle(){

    touch_circle = true;
    alert("Circle");

    if(touch_circle === true){
        // draw a rectangle to be used as the rubber area
        var r2 = new Konva.Circle({x: 0, y: 0, width: 0, height: 0, stroke: 'red', dash: [2,2]});
        r2.listening(false); // stop r2 catching our mouse events.
        layer.add(r2);

        // layer.draw();
        stage.draw(); // First draw of canvas.
        var posStart;
        var posNow;
        var mode = '';
        function startDrag(posIn){
            posStart = {x: posIn.x, y: posIn.y};
            posNow = {x: posIn.x, y: posIn.y};
        }

        function updateDrag(posIn){

            // update rubber rect position
            posNow = {x: posIn.x, y: posIn.y};
            var posRect = reverse(posStart,posNow);
            r2.x(posRect.x1);
            r2.y(posRect.y1);
            r2.width(posRect.x2 - posRect.x1);
            r2.height(posRect.y2 - posRect.y1);
            r2.visible(true);

            // stage.draw(); // redraw any changes.
            layer.draw(); // redraw any changes.


        }

// start the rubber drawing on mouse down.
        r1.on('mousedown', function(e){
            mode = 'drawing';
            // mode = 'circle';
            startDrag({x: e.evt.layerX, y: e.evt.layerY})
        });

// update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
        r1.on('mousemove', function(e){
            if (mode === 'drawing'){
                // if (mode === 'circle'){
                updateDrag({x: e.evt.layerX, y: e.evt.layerY})
            }
        });

// here we create the new rect using the location and dimensions of the drawing rect.
        r1.on('mouseup', function(e){
            mode = '';
            r2.visible(false);
            var newCircle = new Konva.Circle({
                x: r2.x(),
                y: r2.y(),
                // radius: 30 + Math.random() * 30,
                radius: r2.width()/2,
                // fill: 'yellow',
                fill: 'red',
                name:'circle',
                // stroke: 'black',
                // stroke: stroke_color,
                strokeWidth: 4,
                listening:false
                // draggable: true
            });
            layer.add(newCircle);
            // layer.draw(); // redraw any changes.

            stage.draw();
        });
    }// end of it

    touch_circle = false;

}

function touchTriangle(){

    touch_triangle = true;
    alert("Triangle");


    if(touch_triangle === true){
        // draw a rectangle to be used as the rubber area
        var r2 = new Konva.RegularPolygon({x: 0, y: 0, width: 0, height: 0, sides: 3, stroke: 'red', dash: [2,2]});
        r2.listening(false); // stop r2 catching our mouse events.
        layer.add(r2);


        stage.draw(); // First draw of canvas.
        var posStart;
        var posNow;
        var mode = '';
        function startDrag(posIn){
            posStart = {x: posIn.x, y: posIn.y};
            posNow = {x: posIn.x, y: posIn.y};
        }

        function updateDrag(posIn){

            // update rubber rect position
            posNow = {x: posIn.x, y: posIn.y};
            var posRect = reverse(posStart,posNow);
            r2.x(posRect.x1);
            r2.y(posRect.y1);
            r2.width(posRect.x2 - posRect.x1);
            r2.height(posRect.y2 - posRect.y1);
            r2.visible(true);

            stage.draw(); // redraw any changes.

        }

// start the rubber drawing on mouse down.
        r1.on('mousedown', function(e){
            mode = 'drawing';
            startDrag({x: e.evt.layerX, y: e.evt.layerY})
        });

// update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
        r1.on('mousemove', function(e){
            if (mode === 'drawing'){
                updateDrag({x: e.evt.layerX, y: e.evt.layerY})
            }
        });

// here we create the new rect using the location and dimensions of the drawing rect.
        r1.on('mouseup', function(e){
            mode = '';
            r2.visible(false);
            var newTriangle = new Konva.RegularPolygon({
                x: r2.x(),
                y: r2.y(),
                sides: 3,
                radius: r2.width()/2,
                fill: 'red',
                // fill: '#00D2FF',
                // stroke: 'black',
                // stroke: stroke_color,
                // strokeWidth: 4,
                name: 'triangle',
                listening: false,
                // draggable: true
            });
            layer.add(newTriangle);
            stage.draw();
        });

    } // end of if

    touch_triangle = false;

}

// reverse co-ords if user drags left / up
function reverse(r1, r2){
    var r1x = r1.x, r1y = r1.y, r2x = r2.x,  r2y = r2.y, d;
    if (r1x > r2x ){
        d = Math.abs(r1x - r2x);
        r1x = r2x; r2x = r1x + d;
    }
    if (r1y > r2y ){
        d = Math.abs(r1y - r2y);
        r1y = r2y; r2y = r1y + d;
    }
    return ({x1: r1x, y1: r1y, x2: r2x, y2: r2y}); // return the corrected rect.
}

function removeShapes(){
    // var shapes = stage.find('.triangle');
    // shapes.visible('false');

    // have to do something

    stage.on('click', function (e) {
        console.log('click the object');
        if (e.target.hasName('triangle') || e.target.hasName('circle') || e.target.hasName('rect')) {
            // var fill = color;
            e.target.visible(false);
            layer.add(e.target);
            layer.draw();
        }
    });


}