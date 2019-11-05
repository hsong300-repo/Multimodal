
function drawShapes(shape, color,count,stroke,here) {
    var single_count = false;
    if(count === 1){
        console.log('single count true');
        single_count = true
    }else{
        single_count = false;
    }
    if (shape === "circle" || shape === "circles") {
        console.log('circle count and type',count, typeof count);
        // count type is number
        if (count) {
            for (var i = 0; i < count; i++) {
                new putCircleHere(color,stroke,single_count,i);
            }//for loop

            $("#output").text("Added circle(s) to the canvas.").css("color","white");

        } else {
            single_count = true;
            count = 0;
            new putCircleHere(color,stroke,single_count,count);

            $("#output").text("Added 1 circle to the canvas.").css("color","white");
        }
    } else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
        if (count) {
            for (var i = 0; i < count; i++) {
                new putRectHere(color,stroke,single_count,i);
            }//for loop
            $("#output").text("Added square(s) to the canvas.").css("color","white");
        } else {
            single_count = true;
            count = 0;
            new putRectHere(color,stroke,single_count,count);

            $("#output").text("Added 1 square to the canvas.").css("color","white");
        }

    }else{
        $("#output").text("I am not sure I understand, please try saying it again.").css("color","white");
    }//else if rect
}

function pointEProcess(id){
    var concatId = ".pointE." + id;

    return concatId;
}

function pointCProcess(id){
    var concatId = ".pointC." + id;

    return concatId;
}

function removeShapes(shape, color,stroke) {
    if (colors.indexOf(color) >= 0) {
        var color_flag = true;
    }else{
        var color_flag = false;
    }

    if(colors.indexOf(stroke) >=0){
        var stroke_flag = true;

    }else{
        var stroke_flag = false;
    }

    if(stroke_flag === false && color_flag === false && all_flag === false){// "delete" command delete the selected shape
        removeThisShape();
        return;
    }

    if (shape === "circle" || shape === "circles") {
        if(color && stroke === "n"){// when specify color and shape
            var inColor = d3.rgb(color);
            var checkColor = false;

            console.log('her color check');
            d3.selectAll('ellipse').each(function(d,i){
                var elt = d3.select(this);

                var color = d3.rgb(elt.style("fill"));
                if(color.r === inColor.r && color.g === inColor.g && color.b === inColor.b){
                    checkColor = true;
                    var temp = d3.select(this);
                    var tempId = pointEProcess(temp.attr("id"));
                    temp.remove();
                    d3.selectAll(tempId).remove();
                    // d3.select(this).remove();
                    // d3.selectAll(".pointE").remove(); //testing
                }
            });// iterate on ellipses
            if(checkColor === false){
                $("#output").text("Sorry, there is no matching object with that color.").css("color","white");
            }else if(checkColor === true){
                $("#output").text("Deleted.").css("color","white");
            }
            // $("#output").text("Removal completed").css("color","black");
        }else if(stroke_flag === false && color_flag === false && all_flag === true){
            console.log('***remove all circles');
            d3.selectAll("ellipse").remove();
            d3.selectAll(".pointE").remove();

            $("#output").text("Deleted.").css("color","white");
        } else{// when specify shape
            console.log('***remove all circles');
            d3.selectAll("ellipse").remove();
            d3.selectAll(".pointE").remove();

            $("#output").text("Deleted.").css("color","white");
        }
    }else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
        if(color && stroke === "n"){// when specify color and shape
            console.log('***color ');
            var inColor = d3.rgb(color);
            var checkColor = false;

            console.log('her color check');
            d3.selectAll('rect').each(function(d,i){
                var elt = d3.select(this);
                console.log(elt.style("fill"));
                var color = d3.rgb(elt.style("fill"));
                if(color.r === inColor.r && color.g === inColor.g && color.b === inColor.b){
                    checkColor = true;

                    var temp = d3.select(this);
                    var tempId = pointCProcess(temp.attr("id"));
                    temp.remove();
                    d3.selectAll(tempId).remove();
                }
            });// iterate on ellipses
            if(checkColor === false){
                $("#output").text("Sorry, there is no matching object with that color.").css("color","white");
            }else if(checkColor === true){
                $("#output").text("Deleted.").css("color","white");
            }

        }else if(stroke_flag === false && color_flag === false && all_flag === true){
            d3.selectAll("rect").remove();
            d3.selectAll(".pointC").remove();

            $("#output").text("Deleted.").css("color","white");

        } else{
            d3.selectAll("rect").remove();
            d3.selectAll(".pointC").remove();

            $("#output").text("Deleted.").css("color","white");

        }

    }else{
        if(color){
            $("#output").text("Specify a shape (circle,square) to remove.").css("color","white");
        }else if(shape){
            $("#output").text("Specify a color to remove.").css("color","white");
        }else{
            $("#output").text("I am not sure I understand, please try saying it again.").css("color","white");
        }
    }
}// end of remove shapes

function removeThisShape(){
    console.log("remove this id",shapeId);

    var tempId = shapeId;
    var id = idProcess(tempId);
    console.log('remove shape',id);

    if(id === "rect"){
        d3.selectAll("rect").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId) {
                var temp  = d3.select(this);
                temp.remove();
                var tempId = pointCProcess(temp.attr("id"));
                temp.remove();
                d3.selectAll(tempId).remove();
            }
        });

        $("#output").text("Deleted.").css("color","white");
        shapeId= "svg";

    }else if(id === "circle"){
        d3.selectAll("ellipse").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId) {
                var temp  = d3.select(this);
                temp.remove();
                var tempId = pointEProcess(temp.attr("id"));
                temp.remove();
                d3.selectAll(tempId).remove();            }
        });

        $("#output").text("Deleted.").css("color","white");
        shapeId= "svg";

    }else if(typeof id === "undefined"){
        $("#output").text("To remove, please select an object to remove or specify a color.").css("color","white");
    }

}

d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};

d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) { this.parentNode.insertBefore(this, firstChild);
        }
    });
};

function orderShape(){
    var tempId = shapeId;
    var id = idProcess(tempId);
    console.log('remove shape',id);

    if(id === "rect"){
        d3.selectAll("rect").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId) {
                var temp  = d3.select(this);
                temp.moveToFront();
                var tempId = pointCProcess(temp.attr("id"));
                d3.selectAll(tempId).moveToFront();
            }
        });

        $("#output").text("Object is brought to front.").css("color","white");

    }else if(id === "circle"){
        d3.selectAll("ellipse").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId) {
                var temp  = d3.select(this);
                temp.moveToFront();
                var tempId = pointEProcess(temp.attr("id"));
                d3.selectAll(tempId).moveToFront();
            }
        });
        $("#output").text("Object is brought to front.").css("color","white");

    }else{
        $("#output").text("I am not sure I understand, please try saying it again.").css("color","white");
    }
}

function orderShapeBack(){
    var tempId = shapeId;
    var id = idProcess(tempId);
    console.log('remove shape',id);

    if(id === "rect"){
        d3.selectAll("rect").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId) {
                var temp  = d3.select(this);
                // temp.moveToBack();
                var tempId = pointCProcess(temp.attr("id"));
                d3.selectAll(tempId).moveToBack();
                temp.moveToBack();

            }
        });
        $("#output").text("Object is sent to back.").css("color","white");

    }else if(id === "circle"){
        d3.selectAll("ellipse").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId) {
                var temp  = d3.select(this);
                // temp.moveToBack();
                var tempId = pointEProcess(temp.attr("id"));
                d3.selectAll(tempId).moveToBack();
                temp.moveToBack();

            }
        });
        $("#output").text("Object is sent to back.").css("color","white");
    }else{
        $("#output").text("I am not sure I understand, please try saying it again.").css("color","white");
    }
}

function updateShapes(color, stroke){
    if (colors.indexOf(color) >= 0) {
        var color_flag = true;
    }else{
        var color_flag = false;
    }

    if(colors.indexOf(stroke) >=0){
        var stroke_flag = true;

    }else{
        var stroke_flag = false;
    }

    console.log('update color shape');
    var tempId = shapeId;
    var id = idProcess(tempId);
    console.log('remove shape',id);

    if(id === "rect"){
        if(color_flag === false && stroke_flag == false){
            $("#output").text("Specify a color.");
        }else{
            d3.selectAll("rect").each(function(d,i){
                var elt = d3.select(this);
                if(elt.attr("id") === shapeId) {
                    elt.style("fill",color);
                    elt.style("stroke",stroke);
                }
            });

            $("#output").text("Color updated.").css("color","white");
        }
    }else if(id === "circle"){
        if(color_flag === false && stroke_flag == false){
            $("#output").text("Specify a color.");

        }else{
            d3.selectAll("ellipse").each(function(d,i){
                var elt = d3.select(this);
                if(elt.attr("id") === shapeId) {
                    elt.style("fill",color);
                    elt.style("stroke",stroke);
                }
            });
            $("#output").text("Color updated.").css("color","white");
        }
    }else{
        if(color_flag === true){
            $("#output").text("Select an object to change a color.").css("color","white");
        }else{
            $("#output").text("I am not sure I understand, please try saying it again.").css("color","white");
        }
    }
}

// function NoSelectCopy(count, shape, color){
//     if (shape === "circle" || shape === "circles") {
//         console.log('circle');
//         if(color){// when specify color and shape
//             var inColor = d3.rgb(color);
//             var checkColor = false;
//
//             console.log('her color check');
//             d3.selectAll('ellipse').each(function(d,i){
//                 var elt = d3.select(this);
//                 var color = d3.rgb(elt.style("fill"));
//                 if(color.r === inColor.r && color.g === inColor.g && color.b === inColor.b){
//                     checkColor = true;
//                     var temp = d3.select(this);
//                     shapeId = temp.attr("id");
//
//                 }
//             });// iterate on ellipses
//
//             if(checkColor === false){
//                 $("#output").text("Sorry, there is no matching color.").css("color","white");
//             }else if(checkColor === true){
//                 if (count) {
//                     for (i = 0; i < count; i++) {
//                         new copyCircle();
//                     }//for loop
//                     $("#output").text("Copied.").css("color","white");
//                     shapeId = "svg";
//
//                 } else {
//                     new copyCircle();
//                     $("#output").text("Copied.").css("color","white");
//                     shapeId = "svg";
//                 }
//             }
//         }else if(color === undefined){
//             // $("#output").text("Specify a color of shape to copy or select and copy").css("color","green");
//             d3.selectAll('ellipse').each(function(d,i){
//                 var elt = d3.select(this);
//                 shapeId = elt.attr("id");
//             });// iterate on ellipses
//
//             if (count) {
//                 for (i = 0; i < count; i++) {
//                     new copyCircle();
//                 }//for loop
//                 $("#output").text("Copied.").css("color","white");
//                 shapeId = "svg";
//
//             } else {
//                 new copyCircle();
//                 $("#output").text("Copied.").css("color","white");
//                 shapeId = "svg";
//             }
//         }
//     } else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
//         if(color){// when specify color and shape
//             var inColor = d3.rgb(color);
//             var checkColor = false;
//
//             d3.selectAll('rect').each(function(d,i){
//                 var elt = d3.select(this);
//                 var color = d3.rgb(elt.style("fill"));
//                 if(color.r === inColor.r && color.g === inColor.g && color.b === inColor.b){
//                     checkColor = true;
//                     var temp = d3.select(this);
//                     shapeId = temp.attr("id");
//
//                     // new copyRect();
//                     // $("#output").text("Copied");
//                 }
//             });// iterate on ellipses
//
//             if(checkColor === false){
//                 $("#output").text("Sorry, there is no matching color squares.").css("color","red");
//
//             }else if(checkColor === true){
//                 if (count) {
//                     for (i = 0; i < count; i++) {
//                         new copyRect();
//                     }//for loop
//                     $("#output").text("Copied.").css("color","white");
//                     shapeId = "svg";
//                 } else {
//                     new copyRect();
//                     $("#output").text("Copied.").css("color","white");
//                     shapeId = "svg";
//                 }
//             }
//         }else if(color === undefined){
//             // $("#output").text("Specify a color of shape to copy or select and copy").css("color","green");
//             d3.selectAll('rect').each(function(d,i){
//                 var elt = d3.select(this);
//                 shapeId = elt.attr("id");
//             });// iterate on ellipses
//
//             if (count) {
//                 for (i = 0; i < count; i++) {
//                     new copyRect();
//                 }//for loop
//                 $("#output").text("Copied.").css("color","white");
//                 shapeId = "svg";
//             } else {
//                 new copyRect();
//                 $("#output").text("Copied.").css("color","white");
//                 shapeId = "svg";
//             }
//         }
//     } else{
//         $("#output").text("Sorry, select an object to copy.").css("color","white");
//     }
//
// }

function SelectCopy(count, shape, color){

    var tempId = shapeId;
    console.log('tempId',tempId);
    shape = d3.select("#"+tempId);
    var id = idProcess(tempId);

    if(id === "circle"){
        if (count) {
            for (i = 0; i < count; i++) {
                new copyCircle();
            }//for loop
            $("#output").text("Copied.").css("color","white");
            shapeId = "svg";

        } else {
            new copyCircle();
            $("#output").text("Copied.").css("color","white");
            shapeId = "svg";

        }
    }else if(id === "rect"){
        if (count) {
            for (i = 0; i < count; i++) {
                new copyRect();
            }//for loop
            $("#output").text("Copied.").css("color","white");
            shapeId = "svg";

        } else {
            new copyRect();
            $("#output").text("Copied.").css("color","white");
            shapeId = "svg";
        }

    }else{
        $("#output").text("Select an object to copy.").css("color","white");
    }

}

function copyShapes(count,shape,color){
    console.log('shapeId',shapeId);
    console.log('###function count,color,shape',count, color,shape);

    // if(shapeId === "svg"){// shape not select
    //     NoSelectCopy(count, shape, color);
    // }else{// shape selected
    //     SelectCopy(count, shape, color);
    // }
    if(shapeId === "svg"){
        $("#output").text("Select an object to copy.").css("color","white");
    }else{
        SelectCopy(count, shape, color);
    }

}

function idProcess(script){
    let myStr = script.toLowerCase();
    let tokenStr = myStr.split("_");
    //make it all lower case
    console.log('tokenizedStr',tokenStr);

    if(["rect"].filter(n => tokenStr.indexOf(n) > -1).length > 0){
        return "rect";
    }else if(["circle","duplicate","paste"].filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('copy');
        return "circle";
    }
}


//when click on a object those objects will have thicker width
// d3.select('svg').on('pointerdown', function(d, i) {
d3.select('svg').on('touchend', function(d, i) {
    // if (d3.event.defaultPrevented) return; // dragged
    // Somehow console.log the ID of the circle clicked on (if any).
    // console.log("Clicked ID: " + d3.event.target.id);
    var check = d3.event.target.id;
    console.log('check', typeof check, check.length, check);
    if(check.length === 0){// when clicked on small circles for rect
        console.log("small circle click for rect");
        return;
    }else if(check === "1" || check === "2" || check === "3" || check === "4"){// when click on small circles for ellipses
        console.log("small circle click for ellipse");
        return;
    }else if(check === "svg"){
        console.log('*svg');
        console.log('circle button',circle_button);
        if(circle_button === true){
            new Ellipse();
        }else if(rect_button === true){
            new Rectangle();
        }
        d3.selectAll("rect").style('stroke-width',"2px");
        d3.selectAll("ellipse").style('stroke-width',"2px");
        d3.selectAll("circle").style("opacity",0);
        // shapeId = "svg";

        return;
    }else{
        shapeId = d3.event.target.id;

        console.log("shapeId click",shapeId);

        var tempId = d3.event.target.id;
        shape = d3.select("#"+tempId);

        var id = idProcess(tempId);
        if(id ==="rect"){
            console.log('*rect');
            // d3.select("#"+tempId).transition()
            //     .style("stroke-width", "6px");

            d3.selectAll("rect").each(function(d,i){
                var elt = d3.select(this);
                if(elt.attr("id") === shapeId){
                    d3.select(this).transition()
                        .style("stroke-width", "6px");
                }else{
                    d3.select(this).transition()
                        .style("stroke-width", "2px");
                }
            });
            d3.selectAll(".pointC").style("opacity",0);
            d3.selectAll(".pointC").filter("."+shapeId).style("opacity",1);

            //ellipse part
            d3.selectAll(".pointE").style("opacity",0);
            d3.selectAll("ellipse").style("stroke-width","2px");

        }else if(id==="circle"){
            console.log("*circle");
            // d3.select("#"+tempId).transition()
            //     .style("stroke-width", "6px");

            d3.selectAll("ellipse").each(function(d,i){
                var elt = d3.select(this);
                if(elt.attr("id") === shapeId){
                    d3.select(this).transition()
                        .style("stroke-width", "6px");
                }else{
                    d3.select(this).transition()
                        .style("stroke-width", "2px");
                }
            });

            d3.selectAll(".pointE").style("opacity",0);
            d3.selectAll(".pointE").filter("."+shapeId).style("opacity",1);
            // ellipses

            d3.selectAll(".pointC").style("opacity",0);
            d3.selectAll("rect").style("stroke-width","2px");

        }

    }


});




