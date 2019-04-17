var cId = 0;

function drawShapes(shape, color,count,stroke) {

    if (shape === "circle" || shape === "circles") {
        if (count) {
            for (i = 0; i < count; i++) {
                cId++;
                svg.append("ellipse")
                    .attr("id","circle_"+cId)
                    .attr("cx", 100 + i * 10)
                    .attr("cy", 100 + i * 10)
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
    } else if (shape === "rectangle" || shape === "square" || shape === "rectanlges" || shape === "squares") {
        if (count) {
            for (i = 0; i < count; i++) {
                rId++;
                svg.append("rect")
                    .attr("id","rect_"+rId)
                    .attr("x", 100+i*10)
                    .attr("y", 100+i*10)
                    .attr("width", 50)
                    .attr("height", 50)
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
