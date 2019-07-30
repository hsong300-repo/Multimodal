var count = 0;
function copyCircle() {
    var self = this;
    var ellipse, eData = [], isDown = false, isDragging = false, m1, m2, radiusX, radiusY, click = 1;

    // svg.on('mousedown', function () {
    svg.on('touchstart', function () {
        console.log('circle touchstart');
        m1 = d3.mouse(this);
        isDragging = true;
        isDown = !isDown;
        click++;
    })
        .on('touchmove', function () {
            // .on('mousemove', function () {
            m2 = d3.mouse(this);
            if (isDown && !isDragging) {
                self.eData[0].x2 = m2[0];
                self.eData[0].y2 = m2[1];
                self.eData[0].a = Math.abs(m2[0] - m1[0]);
                self.eData[0].b = Math.abs(m2[1] - m1[1]);
                updateEllipse();
            }else{
                console.log('touch more than two');
            }
        });

    function updateEllipse() {
        ellipse = d3.select(self.ellipseElement[0][0]).data(self.eData);
        ellipse.attr('cx', function (d) { return d.x1; })
            .attr('cy', function (d) { return d.y1; })
            .attr('rx', function (d) { return Math.abs(d.a); })
            .attr('ry', function (d) { return Math.abs(d.b); });
        point1 = d3.select(self.pointElement1[0][0]).data(self.eData);
        point1.attr('id', 1)
            .attr('r', 15)
            .attr('cx', function (d) { return d.x1; })
            .attr('cy', function (d) { return d.y1 - d.b; });
        point2 = d3.select(self.pointElement2[0][0]).data(self.eData);
        point2.attr('id', 2)
            .attr('r', 15)
            .attr('cx', function (d) { return d.x1 + d.a; })
            .attr('cy', function (d) { return d.y1; });
        point3 = d3.select(self.pointElement3[0][0]).data(self.eData);
        point3.attr('id', 3)
            .attr('r', 15)
            .attr('cx', function (d) { return d.x1; })
            .attr('cy', function (d) { return d.y1 + d.b; });
        point4 = d3.select(self.pointElement4[0][0]).data(self.eData);
        point4.attr('id', 4)
            .attr('r', 15)
            .attr('cx', function (d) { return d.x1 - d.a; })
            .attr('cy', function (d) { return d.y1; });


    }

    var dragE = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragEllipse);
    var dragP = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragPoint);

    var shapeWidth = d3.select("#"+shapeId).style("rx");
    var shapeHeight = d3.select("#"+shapeId).style("ry");
    var shapeColor = d3.select("#"+shapeId).style("fill");
    var tempFill = d3.rgb(shapeColor);
    let color = "rgb("+tempFill.r+","+tempFill.g+","+tempFill.b+")";
    var shapeStroke = d3.select("#"+shapeId).style("stroke");
    var tempStroke = d3.rgb(shapeStroke);
    let strokeColor = "rgb("+tempStroke.r+","+tempStroke.g+","+tempStroke.b+")";

    if(!isDragging){
        self.eData = [{
            x1: globX+cId*30,
            y1: globY,
            x2: globX+cId*30,
            y2: globY+cId*30,
            a: parseInt(shapeWidth,10),
            b: parseInt(shapeHeight,10)
        }];
        cId++;
        count++;
        self.ellipseElement = d3.select('svg').append('ellipse').attr("id",shapeId + "_copy"+count).attr('class', 'ellipse').style("fill",color).style("stroke",strokeColor).style("stroke-width","6px").call(dragE);
        self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointE' +" "+shapeId + "_copy"+count).call(dragP);
        self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointE'+" "+shapeId + "_copy"+count).call(dragP);
        self.pointElement3 = d3.select('svg').append('circle').attr('class', 'pointE'+" "+shapeId + "_copy"+count).call(dragP);
        self.pointElement4 = d3.select('svg').append('circle').attr('class', 'pointE'+" "+shapeId + "_copy"+count).call(dragP);
        shapeId = shapeId + "_copy" + count;
        console.log('shapeId',shapeId);
        updateEllipse();
    }

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

    function dragEllipse(d) {
        isDragging = true;
        var e = d3.event;
        d.x1 += e.dx;
        d.y1 += e.dy;
        d.x2 += e.dx;
        d.y2 += e.dy;
        self.ellipseElement.style('cursor', 'move');
        updateEllipse();
    }

    function dragPoint(d) {
        var e = d3.event;
        var id = d3.select(this).attr('id');
        if(id == 3 || id == 4) {
            d.a -= e.dx;
            d.b += e.dy;
        } else {
            d.a += e.dx;
            d.b -= e.dy;
        }
        updateEllipse();
    }

}//end Ellipse




