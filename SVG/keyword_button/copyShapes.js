var count = 0;
function copyRect() {
    var self = this, rect, rectData = [], isDown = false, m1, m2, isDrag = false;

    svg.on('touchstart', function() {
        m1 = d3.mouse(this);
        if (!isDown && !isDrag) {
            console.log('touchstart');
            // self.rectData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
            // self.rectangleElement = d3.select('svg').append('rect').attr("id","rect_"+rId).attr('class', 'rectangle').call(dragR);
            // self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointC').call(dragC1);
            // self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointC').call(dragC2);
            // self.pointElement3 = svg.append('circle').attr('class', 'pointC').call(dragC3);
            // self.pointElement4 = svg.append('circle').attr('class', 'pointC').call(dragC4);
            // updateRect();
            isDrag = false;
        } else {
            console.log('drag');
            isDrag = true;
        }
        isDown = !isDown;
    })

        .on('touchmove', function() {
            m2 = d3.mouse(this);
            if(isDown && !isDrag) {
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
        point1.attr('r', 8)
            .attr('cx', self.rectData[0].x)
            .attr('cy', self.rectData[0].y);
        var point2 = d3.select(self.pointElement2[0][0]).data(self.rectData);
        point2.attr('r', 8)
            .attr('cx', self.rectData[1].x)
            .attr('cy', self.rectData[1].y);
        var point3 = d3.select(self.pointElement3[0][0]).data(self.rectData);
        point3.attr('r', 8)
            .attr('cx', self.rectData[1].x)
            .attr('cy', self.rectData[0].y);
        var point3 = d3.select(self.pointElement4[0][0]).data(self.rectData);
        point3.attr('r', 8)
            .attr('cx', self.rectData[0].x)
            .attr('cy', self.rectData[1].y);
    }

    var dragR = d3.behavior.drag().on('drag', dragRect);

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
    console.log('shpaeHeight',shapeHeight);
    console.log('shpaeWidth',shapeWidth);


    // console.log('shapeWidth',shapeWidth,shapeHeight,parseInt(shapeWidth,10),parseInt(shapeWidth,10));

    // .style("fill",color)
    // .style("stroke",strokeColor)
    // .attr("width", shapeWidth)
    // .attr("height", shapeHeight);

    // self.rectData = [ { x: 15+rId*10, y: 15 }, { x: 15+rId*10+parseInt(shapeWidth,10), y: 15+parseInt(shapeWidth,10) } ];
    // self.rectData = [ { x: 100+rId*10, y: 100+rId*30 }, { x: 100+rId*10+parseInt(shapeWidth,10), y: 100+rId*30+parseInt(shapeWidth,10) } ];
    rId++;
    count++;
    self.rectData = [ { x: 15+rId*10, y: 15 }, { x: 15+rId*10+parseInt(shapeWidth,10), y: 15+parseInt(shapeHeight,10) } ];
    self.rectangleElement = d3.select('svg').append('rect').attr("id",shapeId+"_copy"+count).attr('class', 'rectangle').style("fill",color)
        .style("stroke",strokeColor).attr("width", shapeWidth).attr("height", shapeHeight).call(dragR);
    // self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointC').call(dragC1);
    // self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointC').call(dragC2);
    // self.pointElement3 = svg.append('circle').attr('class', 'pointC').call(dragC3);
    // self.pointElement4 = svg.append('circle').attr('class', 'pointC').call(dragC4);
    self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointC'+" "+shapeId+"_copy"+count).call(dragC1);
    self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointC'+" "+shapeId+"_copy"+count).call(dragC2);
    self.pointElement3 = svg.append('circle').attr('class', 'pointC'+" "+shapeId+"_copy"+count).call(dragC3);
    self.pointElement4 = svg.append('circle').attr('class', 'pointC'+" "+shapeId+"_copy"+count).call(dragC4);
    // rId++;
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


