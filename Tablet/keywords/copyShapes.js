var count = 0;
function copyRect() {
    var self = this, rect, rectData = [], isDown = false, m1, m2, isDrag = false,click = 1;

    svg.on('touchstart', function() {
        m1 = d3.mouse(this);
        isDrag = true;
        isDown = !isDown;
        click++;

    })

        .on('touchmove', function() {
            m2 = d3.mouse(this);
            if(isDown && !isDrag && click == 2) {
                self.rectData[1] = { x: m2[0], y: m2[1] };
                updateRect();
            }
        });

    function updateRect() {
        rect = d3.select(self.rectangleElement[0][0]);
        rect.attr({
            x: self.rectData[1].x - self.rectData[0].x > 0 ? self.rectData[0].x :  self.rectData[1].x,
            y: self.rectData[1].y - self.rectData[0].y > 0 ? self.rectData[0].y :  self.rectData[1].y,
            width: Math.abs(self.rectData[1].x - self.rectData[0].x),
            height: Math.abs(self.rectData[1].y - self.rectData[0].y)
        });

        var point1 = d3.select(self.pointElement1[0][0]).data(self.rectData);
        point1.attr('r', 15)
            .attr('cx', self.rectData[0].x)
            .attr('cy', self.rectData[0].y);
        var point2 = d3.select(self.pointElement2[0][0]).data(self.rectData);
        point2.attr('r', 15)
            .attr('cx', self.rectData[1].x)
            .attr('cy', self.rectData[1].y);
        var point3 = d3.select(self.pointElement3[0][0]).data(self.rectData);
        point3.attr('r', 15)
            .attr('cx', self.rectData[1].x)
            .attr('cy', self.rectData[0].y);
        var point3 = d3.select(self.pointElement4[0][0]).data(self.rectData);
        point3.attr('r', 15)
            .attr('cx', self.rectData[0].x)
            .attr('cy', self.rectData[1].y);
    }

    // var dragR = d3.behavior.drag().on('drag', dragRect);
    var dragR = d3.behavior.drag().on('dragstart',dragStart).on('dragend',dragEnd).on('drag', dragRect);

    function dragStart(d) {
        isDown = false;
        isDragging = true;
        d3.select(this).transition()
            .style("stroke-width", "6px");

    }

    function dragEnd(d) {
        isDown = isDragging = false;
        d3.select(this).transition()
            .style("stroke-width", "2px");
        // shapeId = shapeId + "_copy" + count;
        // console.log('shapeId',shapeId);
    }

    function dragRect() {
        var e = d3.event;
        for(var i = 0; i < self.rectData.length; i++){
            d3.select(self.rectangleElement[0][0])
                .attr('x', self.rectData[i].x += e.dx )
                .attr('y', self.rectData[i].y += e.dy );
        }
        rect.style('cursor', 'move');
        updateRect();
    }

    var dragC1 = d3.behavior.drag().on('drag', dragPoint1);
    var dragC2 = d3.behavior.drag().on('drag', dragPoint2);
    var dragC3 = d3.behavior.drag().on('drag', dragPoint3);
    var dragC4 = d3.behavior.drag().on('drag', dragPoint4);

    var shapeColor = d3.select("#"+shapeId).style("fill");
    var tempFill = d3.rgb(shapeColor);
    let color = "rgb("+tempFill.r+","+tempFill.g+","+tempFill.b+")";
    var shapeStroke = d3.select("#"+shapeId).style("stroke");
    var tempStroke = d3.rgb(shapeStroke);
    let strokeColor = "rgb("+tempStroke.r+","+tempStroke.g+","+tempStroke.b+")";
    var shapeWidth = d3.select("#"+shapeId).style("width");
    var shapeHeight = d3.select("#"+shapeId).style("height");
    // console.log('shpaeHeight',shapeHeight);
    // console.log('shpaeWidth',shapeWidth);

    rId++;
    count++;
    self.rectData = [{x: globX + rId * 10, y: globY}, {
        x: globX + rId * 10 + parseInt(shapeWidth, 10),
        y: globY + parseInt(shapeHeight, 10)
    }];
    self.rectangleElement = d3.select('svg').append('rect').attr("id", shapeId + "_copy" + count).attr('class', 'rectangle').style("fill", color)
        .style("stroke", strokeColor).style("stroke-width","6px").attr("width", shapeWidth).attr("height", shapeHeight).call(dragR);
    self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointC' + " " + shapeId + "_copy" + count).call(dragC1);
    self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointC' + " " + shapeId + "_copy" + count).call(dragC2);
    self.pointElement3 = svg.append('circle').attr('class', 'pointC' + " " + shapeId + "_copy" + count).call(dragC3);
    self.pointElement4 = svg.append('circle').attr('class', 'pointC' + " " + shapeId + "_copy" + count).call(dragC4);
    shapeId = shapeId + "_copy" + count;
    console.log('shapeId',shapeId);
    updateRect();

    function dragPoint1() {
        var e = d3.event;
        d3.select(self.pointElement1[0][0])
            .attr('cx', function(d) { return d.x += e.dx })
            .attr('cy', function(d) { return d.y += e.dy });
        updateRect();
    }

    function dragPoint2() {
        var e = d3.event;
        d3.select(self.pointElement2[0][0])
            .attr('cx', self.rectData[1].x += e.dx )
            .attr('cy', self.rectData[1].y += e.dy );
        updateRect();
    }

    function dragPoint3() {
        var e = d3.event;
        d3.select(self.pointElement3[0][0])
            .attr('cx', self.rectData[1].x += e.dx )
            .attr('cy', self.rectData[0].y += e.dy );
        updateRect();
    }

    function dragPoint4() {
        var e = d3.event;
        d3.select(self.pointElement4[0][0])
            .attr('cx', self.rectData[0].x += e.dx )
            .attr('cy', self.rectData[1].y += e.dy );
        updateRect();
    }

}//end Rectangle


