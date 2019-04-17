var cId = 0;

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
                    .attr("cx", 100 + i * 10)
                    .attr("cy", 100 + i * 10)
                    .attr("rx", 25)
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
        }
    } else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
        if (count) {
            for (i = 0; i < count; i++) {
                rId++;
                svg.append("rect")
                    .attr("id","rect_"+rId)
                    .attr("x", 100+i*10)
                    .attr("y", 100+i*10)
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
            rId++;
            svg.append("rect")
                .attr("id","rect_"+rId)
                .attr("x", 100)
                .attr("y", 100)
                .attr("width", 50)
                .attr("height", 50)

                .style("fill", function (d) {
                    if (color) {
                        return color;
                    } else {
                        return "lightblue";
                    }
                });

        }

    }//else if rect
}

function removeShapes(shape, color,count,stroke) {

    if (shape === "circle" || shape === "circles") {
        d3.selectAll("ellipse").remove();
        d3.selectAll(".pointE").remove();


    } else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
        d3.selectAll("rect").remove();
        d3.selectAll(".pointC").remove();


    }//else if rect
}

d3.select('svg').on('click', function(d, i) {
    // Somehow console.log the ID of the circle clicked on (if any).
    console.log("Clicked ID: " + d3.event.target.id);
    var tempId = d3.event.target.id;
    if(!tempId){
        d3.selectAll("rect").style('stroke-width',"2px");
        d3.selectAll("ellipse").style('stroke-width',"2px");
        d3.selectAll(".pointC").style("opacity",0);
        d3.selectAll(".pointE").style("opacity",0);

    }
});
