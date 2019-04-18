
function drawShapes(shape, color,count,stroke) {
    function nozoom() {
        d3.event.preventDefault();
    }

    if (shape === "circle" || shape === "circles") {
        if (count) {
            for (i = 0; i < count; i++) {
                new putCircle();
            }//for loop
        } else {

            new putCircle();

        }
    } else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
        if (count) {
            for (i = 0; i < count; i++) {
                new putRect();
            }//for loop
        } else {

            new putRect();

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
                    console.log('***red here***');
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
                    console.log('***red here***');
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


    // var shapeColor = d3.select("#"+shapeId).style("fill");
    // var tempFill = d3.rgb(shapeColor);
    // let color = "rgb("+tempFill.r+","+tempFill.g+","+tempFill.b+")";
    // var shapeStroke = d3.select("#"+shapeId).style("stroke");
    // var tempStroke = d3.rgb(shapeStroke);
    // let strokeColor = "rgb("+tempStroke.r+","+tempStroke.g+","+tempStroke.b+")";


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




    // var copies = d3.select("#"+shapeId).node().cloneNode(true);
    // svg.append(copies);


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
    // shapeColor = d3.select("#"+tempId).style("fill");
    // shapeStroke = d3.select("#"+tempId).style("stroke");


    var id = idProcess(tempId);
    if(id ==="rect"){
        d3.select("#"+tempId).transition()
            .style("stroke-width", "6px");
        document.getElementById('shapeFormat').style.display = "block";
        // d3.selectAll(".pointC").style("opacity",1);
        // shapeColor = d3.select("#"+tempId).style("fill");
        // tempFill = d3.rgb(shapeColor);
        // shapeStroke = d3.select("#"+tempId).style("stroke");
        // shapeWidth = d3.select("#"+tempId).style("width");
        // tempStroke = d3.rgb(shapeStroke);
        // shapeHeight = d3.select("#"+tempId).style("height");

    }else if(id==="circle"){
        d3.select("#"+tempId).transition()
            .style("stroke-width", "6px");
        document.getElementById('shapeFormat').style.display = "block";
        // d3.selectAll(".pointE").style("opacity",0);
        // shapeColor = d3.select("#"+tempId).style("fill");
        // shapeStroke = d3.select("#"+tempId).style("stroke");
        // shapeWidth = d3.select("#"+tempId).style("rx");
        // shapeHeight = d3.select("#"+tempId).style("ry");

    }else{
        d3.selectAll("rect").style('stroke-width',"2px");
        d3.selectAll("ellipse").style('stroke-width',"2px");
        d3.selectAll(".pointC").style("opacity",0);
        d3.selectAll(".pointE").style("opacity",0);

        document.getElementById('shapeFormat').style.display = "none";
    }
});

document.getElementById('shapeFormat').style.display = "none";



