function drawShapes(shape, color,count,stroke) {

    if (shape === "circle" || shape === "circles") {
        if (count) {
            for (i = 0; i < count; i++) {
                svg.append("ellipse")
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
            svg.append("ellipse")
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
                svg.append("rect")
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
            svg.append("rect")
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