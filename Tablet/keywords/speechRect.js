function putRect(color,strokeColor) {
    var self = this, rect, rectData = [], isDown = false, m1, m2, isDrag = false;

        svg.on('touchstart', function() {
            m1 = d3.mouse(this);
            isDrag = true;
            isDown = !isDown;
        })

        .on('touchmove', function() {
            m2 = d3.mouse(this);
            if(isDown && !isDrag) {
                // self.rectData[1] = { x: m2[0], y: m2[1] };
                self.rectData[1] ={x: 105+rId*20, y: 105};
                updateRect();
            }else{
                console.log('here else');
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
        // point1.attr('r', 8)
        point1.attr('r', 15)
            .attr('cx', self.rectData[0].x)
            .attr('cy', self.rectData[0].y);
        var point2 = d3.select(self.pointElement2[0][0]).data(self.rectData);
        // point2.attr('r', 8)
        point2.attr('r', 15)
            .attr('cx', self.rectData[1].x)
            .attr('cy', self.rectData[1].y);
        var point3 = d3.select(self.pointElement3[0][0]).data(self.rectData);
        // point3.attr('r', 8)
        point3.attr('r', 15)
            .attr('cx', self.rectData[1].x)
            .attr('cy', self.rectData[0].y);
        var point3 = d3.select(self.pointElement4[0][0]).data(self.rectData);
        point3.attr('r', 15)
        // point3.attr('r', 8)
            .attr('cx', self.rectData[0].x)
            .attr('cy', self.rectData[1].y);
        // rect.style('stroke-width',"2px");
        // shapeId = "rect_" +rId;
        // console.log('shapeId',shapeId);

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
        // shapeId = "rect_" +rId;
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

    rId++;
    self.rectData = [ { x: 15+rId*20, y: 15 }, { x: 105+rId*20, y: 105 } ];
    self.rectangleElement = d3.select('svg').append('rect').attr("id","rect_"+rId).attr('class', 'rectangle').style("fill",color).style("stroke",strokeColor).style("stroke-width","6px").call(dragR);
    self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointC'+" rect_"+rId).call(dragC1);
    self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointC'+" rect_"+rId).call(dragC2);
    self.pointElement3 = svg.append('circle').attr('class', 'pointC'+" rect_"+rId).call(dragC3);
    self.pointElement4 = svg.append('circle').attr('class', 'pointC'+" rect_"+rId).call(dragC4);
    shapeId = "rect_" +rId;
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


function putRectHere(color,strokeColor) {
    var self = this, rect, rectData = [], isDown = false, m1, m2, isDrag = false;

      svg.on('touchmove', function() {
            m2 = d3.mouse(this);
            if(isDown && !isDrag) {
                self.rectData[1] = { x: m2[0], y: m2[1] };
                // self.rectData[1] ={x: 65+rId*20, y: 65};
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
        // shapeId = "rect_" +rId;
        // console.log('shapeId',shapeId);
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
        // shapeId = "rect_" +rId;
        // console.log('shapeId',shapeId);
    }


    function dragRect() {

        var e = d3.event;
        for(var i = 0; i < self.rectData.length; i++){
            // d3.select(self.rectangleElement[0][0])
            //     .attr('x', self.rectData[i].x += e.dx )
            //     .attr('y', self.rectData[i].y += e.dy );
            d3.select(self.rectangleElement[0][0])
                .attr('x', self.rectData[i].x += e.dx )
                .attr('y', self.rectData[i].y += e.dy );
        }
        rect.style('cursor', 'move');
        // rect.style('stroke-width',"6px");
        updateRect();
    }

    var dragC1 = d3.behavior.drag().on('drag', dragPoint1);
    var dragC2 = d3.behavior.drag().on('drag', dragPoint2);
    var dragC3 = d3.behavior.drag().on('drag', dragPoint3);
    var dragC4 = d3.behavior.drag().on('drag', dragPoint4);

    rId++;
    self.rectData = [ { x: globX, y: globY }, { x: globX + 100, y: globY + 100 } ];
    self.rectangleElement = d3.select('svg').append('rect').attr("id","rect_"+rId).attr('class', 'rectangle').style("fill",color).style("stroke",strokeColor).style("stroke-width","6px").call(dragR);
    self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointC'+" rect_"+rId).call(dragC1);
    self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointC'+" rect_"+rId).call(dragC2);
    self.pointElement3 = svg.append('circle').attr('class', 'pointC'+" rect_"+rId).call(dragC3);
    self.pointElement4 = svg.append('circle').attr('class', 'pointC'+" rect_"+rId).call(dragC4);
    shapeId = "rect_" +rId;
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



