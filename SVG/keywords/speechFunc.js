
function drawShapes(shape, color,count,stroke) {
    function nozoom() {
        d3.event.preventDefault();
    }


    if (shape === "circle" || shape === "circles") {
        if (count) {
            for (i = 0; i < count; i++) {
                new putCircle(color);
            }//for loop
        } else {

            new putCircle(color);

        }
    } else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
        if (count) {
            for (i = 0; i < count; i++) {
                new putRect(color);
            }//for loop
        } else {

            new putRect(color);

        }

    }//else if rect
}

function removeShapes(shape, color,count,stroke) {

    if (shape === "circle" || shape === "circles") {
        if(color){
            var inColor = d3.rgb(color);

            //check if same color
            console.log('her color check');
            d3.selectAll('ellipse').each(function(d,i){
                var elt = d3.select(this);
                console.log(elt.style("fill"));
                var color = d3.rgb(elt.style("fill"));
                if(color.r === inColor.r && color.g === inColor.g && color.b === inColor.b){
                    d3.select(this).remove();
                }else{
                    console.log('light blue');
                }
                // console.log(elt.attr("style"));
            })
        }else {
            d3.selectAll("ellipse").remove();
            d3.selectAll(".pointE").remove();
        }
    } else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
        // d3.selectAll("rect").remove();
        // d3.selectAll(".pointC").remove();

        if(color){
            var inColor = d3.rgb(color);

            //check if same color
            console.log('her color check');
            d3.selectAll('rect').each(function(d,i){
                var elt = d3.select(this);
                console.log(elt.style("fill"));
                var color = d3.rgb(elt.style("fill"));
                if(color.r === inColor.r && color.g === inColor.g && color.b === inColor.b){
                    d3.select(this).remove();
                }else{
                    console.log('light blue');
                }
                // console.log(elt.attr("style"));
            })
        }else {
            d3.selectAll("rect").remove();
            d3.selectAll(".pointC").remove();
        }


    }//else if rect
}

var space = 0;
function copyShapes(count){
    space++;

    console.log('shapeId',shapeId);

    var tempId = shapeId;
    console.log('tempId',tempId);
    shape = d3.select("#"+tempId);
    var id = idProcess(tempId);

    if(id === "circle"){
        if (count) {
            for (i = 0; i < count; i++) {
                new copyCircle();
            }//for loop
        } else {
            new copyCircle();

        }
    }else if(id === "rect"){
        if (count) {
            for (i = 0; i < count; i++) {
                new copyRect();
            }//for loop
        } else {
            new copyRect();
        }
    }

}

function shapeFill(){
    console.log('shape fill');
    var fillColor = $("#color option:selected").text();

    return fillColor;

}

function strokeFill(){
    var fillColor = $("#border_color option:selected").text();

    return fillColor;
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

document.getElementById('shapeFormat').style.display = "block";
$("#color").change(function () {
    console.log("id colorchange",shape);
    let fill = shapeFill();
    shape.style("fill",fill);
});
$("#border_color").change(function () {
    let stroke = strokeFill();
    shape.style("stroke",stroke);

});

d3.select('svg').on('click', function(d, i) {
    // if (d3.event.defaultPrevented) return; // dragged

    // Somehow console.log the ID of the circle clicked on (if any).
    console.log("Clicked ID: " + d3.event.target.id);
    shapeId = d3.event.target.id;
    console.log("shapeId click",shapeId);

    var tempId = d3.event.target.id;
    shape = d3.select("#"+tempId);


    var id = idProcess(tempId);
    if(id ==="rect"){
        // d3.select("#"+tempId).transition()
        //     .style("stroke-width", "6px");
        document.getElementById('shapeFormat').style.display = "block";

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

    }else if(id==="circle"){
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



        document.getElementById('shapeFormat').style.display = "block";

    }else{
        d3.selectAll("rect").style('stroke-width',"2px");
        d3.selectAll("ellipse").style('stroke-width',"2px");
        d3.selectAll(".pointC").style("opacity",0);
        d3.selectAll(".pointE").style("opacity",0);

        document.getElementById('shapeFormat').style.display = "none";
    }
});

document.getElementById('shapeFormat').style.display = "none";



