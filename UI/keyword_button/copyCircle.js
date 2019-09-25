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
            console.log('circle touchmove');
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
        console.log('***first but not dragging');
        console.log('****copy cId*****',cId);
        var xPosition = parseInt(d3.select("#"+shapeId).attr("cx"));
        var yPosition = parseInt(d3.select("#"+shapeId).attr("cy"));

        console.log("glob x Y and xPosition and yPosition",globX,globY,xPosition,yPosition);

        self.eData = [{
            // x1: globX+cId*30,
            // y1: globY,
            // x2: globX+cId*30,
            // y2: globY+cId*30,
            x1: xPosition+cId*7,
            y1: yPosition,
            x2: xPosition+cId*7,
            y2: yPosition+cId*7,
            a: parseInt(shapeWidth,10),
            b: parseInt(shapeHeight,10)

        }];
        console.log('$$data position', self.eData.x1,self.eData.y1,self.eData.x2,self.eData.y2);
        cId++;
        count++;
        self.ellipseElement = d3.select('svg').append('ellipse').attr("id",shapeId + "_copy"+count).attr('class', 'ellipse').style("fill",color).style("stroke",strokeColor).style("stroke-width","2px").call(dragE);
        self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointE' +" "+shapeId + "_copy"+count).call(dragP);
        self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointE'+" "+shapeId + "_copy"+count).call(dragP);
        self.pointElement3 = d3.select('svg').append('circle').attr('class', 'pointE'+" "+shapeId + "_copy"+count).call(dragP);
        self.pointElement4 = d3.select('svg').append('circle').attr('class', 'pointE'+" "+shapeId + "_copy"+count).call(dragP);

        //deselect the object original as well
        d3.select('#'+shapeId).style("stroke-width","2px");
        d3.selectAll(".pointE").style("opacity",0);

        shapeId = shapeId + "_copy" + count;
        console.log('shapeId',shapeId);
        updateEllipse();
    }

    function dragStart(d) {
        console.log('dragstart');
        isDown = false;
        isDragging = true;
        // d3.select(this).transition()
        //     .style("stroke-width", "6px");

        var check =  d3.select(this).attr("id");

        if(check.length === 0){// when clicked on small circles for rect
            console.log("small circle click for rect");
            return;
        }else if(check === "1" || check === "2" || check === "3" || check === "4"){// when click on small circles for ellipses
            console.log("small circle click for ellipse");
            return;
        }else{
            shapeId = check;

            d3.selectAll("rect").style("stroke-width","2px");
            d3.selectAll(".pointC").style("opacity",0);
            // d3.selectAll(".pointC").filter("."+shapeId).style("opacity",1);

            //ellipse part
            d3.selectAll(".pointE").style("opacity",0);
            d3.selectAll("ellipse").style("stroke-width","2px");

            d3.select(this).transition()
                .style("stroke-width", "6px");

        }

    }

    function dragEnd(d) {
        console.log('dragend');
        isDown = isDragging = false;
        d3.select(this).transition()
            .style("stroke-width", "2px");
        // shapeId = shapeId + "_copy" + count;
        // console.log('shapeId',shapeId);

    }

    function dragEllipse(d) {
        console.log('dragelipse');
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
        console.log('drag point');
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




