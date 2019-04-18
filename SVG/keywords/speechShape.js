
function drawShapes(shape, color,count,stroke) {


    function nozoom() {
        d3.event.preventDefault();
    }

    if (shape === "circle" || shape === "circles") {
        if (count) {
            for (i = 0; i < count; i++) {
                cId++;
                svg.append("ellipse")
                    .attr("id","circle_"+cId)
                    .attr("cx", 100 + i * 60)
                    .attr("cy", 100)
                    .attr("rx", 25)
                    .attr("ry", 25)
                    .style("fill", function (d) {
                        if (color) {
                            return color;
                        } else {
                            return "lightblue";
                        }
                    });
            }//for loop
        } else {
            cId++;
            svg.append("ellipse")
                .attr("id","circle_"+cId)
                .attr("cx", 100)
                .attr("cy", 100 + cId * 60)
                .attr("rx", 25)
                .attr("ry", 25)
                .style("fill", function (d) {
                    if (color) {
                        return color;
                    } else {
                        return "lightblue";
                    }
                });
        }
    } else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
        if (count) {
            for (i = 0; i < count; i++) {
                rId++;
                svg.append("rect")
                    .attr("id","rect_"+rId)
                    .attr("x", 100+i*60)
                    .attr("y", 100)
                    .attr("width", 50)
                    .attr("height", 50)
                    .on("click",function(d){
                        console.log('you clicked',svg.attr('id'));
                    })
                    .style("fill", function (d) {
                        if (color) {
                            return color;
                        } else {
                            return "lightblue";
                        }
                    });
            }//for loop
        } else {
            // rId++;
            // svg.append("rect")
            //     .attr("id","rect_"+rId)
            //     .attr("x", 100)
            //     .attr("y", 100 + rId * 60+10)
            //     .attr("width", 50)
            //     .attr("height", 50)
            //
            //     .style("fill", function (d) {
            //         if (color) {
            //             return color;
            //         } else {
            //             return "light";
            //             // return d3.rgb(173,216,230);
            //         }
            //     });
            speechRect();

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
function copyShapes(){
    space++;


    console.log('shapeId',shapeId);

    var tempId = shapeId;
    console.log('tempId',tempId);
    shape = d3.select("#"+tempId);
    var id = idProcess(tempId);

    console.log('shapecolor',shapeColor,tempFill.r, tempFill.g,tempFill.b);
    // console.log('rgb',)
    console.log('shapeStroke',shapeStroke);


    if(id === "circle"){
        svg.append("ellipse")
            .attr("id",shapeId+"_copy")
            .attr("cx", 100+space*60)
            .attr("cy", 50)
            .attr("rx", shapeWidth)
            .attr("ry", shapeHeight)
            .attr("fill",shapeColor)
            .attr("stroke",shapeStroke);

    }else if(id === "rect"){
        svg.append("rect")
            .attr("id",shapeId+"_copy")
            .attr("x", 100+ space*60)
            .attr("y", 50)
            .attr("fill",shapeColor.toString())
            // .attr("fill","green")
            .attr("stroke",shapeStroke)
            .attr("width", shapeWidth)
            .attr("height", shapeHeight);



        // rects.style('fill',shapeColor.toString());

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
    console.log('tempId',tempId);
    shape = d3.select("#"+tempId);
    shapeColor = d3.select("#"+tempId).style("fill");
    shapeStroke = d3.select("#"+tempId).style("stroke");


    var id = idProcess(tempId);
    if(id ==="rect"){
        d3.select("#"+tempId).transition()
            .style("stroke-width", "6px");
        document.getElementById('shapeFormat').style.display = "block";
        // d3.selectAll(".pointC").style("opacity",1);
        shapeColor = d3.select("#"+tempId).style("fill");
        tempFill = d3.rgb(shapeColor);
        shapeStroke = d3.select("#"+tempId).style("stroke");
        shapeWidth = d3.select("#"+tempId).style("width");
        tempStroke = d3.rgb(shapeStroke);
        shapeHeight = d3.select("#"+tempId).style("height");

    }else if(id==="circle"){
        d3.select("#"+tempId).transition()
            .style("stroke-width", "6px");
        document.getElementById('shapeFormat').style.display = "block";
        // d3.selectAll(".pointE").style("opacity",0);
        shapeColor = d3.select("#"+tempId).style("fill");
        shapeStroke = d3.select("#"+tempId).style("stroke");
        shapeWidth = d3.select("#"+tempId).style("rx");
        shapeHeight = d3.select("#"+tempId).style("ry");

    }else{
        d3.selectAll("rect").style('stroke-width',"2px");
        d3.selectAll("ellipse").style('stroke-width',"2px");
        d3.selectAll(".pointC").style("opacity",0);
        d3.selectAll(".pointE").style("opacity",0);

        document.getElementById('shapeFormat').style.display = "none";
    }

    console.log('red in rgv',d3.rgb("red"));



});

document.getElementById('shapeFormat').style.display = "none";

