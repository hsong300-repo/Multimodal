// var svg = d3.select('body').append('svg');
var cId = 0;


d3.select('#touchCircle').on('click', function () {
    // Ellipse();
    new Ellipse();
});

function Ellipse() {
    var self = this;
    var ellipse, eData = [], isDown = false, isDragging = false, m1, m2, radiusX, radiusY, click = 1;

    // svg.on('mousedown', function () {
    svg.on('touchstart', function () {
        console.log('circle touchstart');
        m1 = d3.mouse(this);
        var check = d3.event.target.id;// this is to check if object is being drawn over a shape or on canvas
        if (!isDown && click === 1 && check === "svg") {
        // if (!isDown) {
            if(!isDragging){
                self.eData = [{
                    x1: m1[0],
                    y1: m1[1],
                    x2: m1[0],
                    y2: m1[1],
                    a: 0,
                    b: 0
                }];
                cId++;
                self.ellipseElement = d3.select('svg').append('ellipse').attr("id","circle_" + cId).attr('class', 'ellipse').style("stroke-width","6px").call(dragE);
                self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointE' + " circle_" +cId).call(dragP);
                self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointE' + " circle_" +cId).call(dragP);
                self.pointElement3 = d3.select('svg').append('circle').attr('class', 'pointE'+ " circle_" +cId).call(dragP);
                self.pointElement4 = d3.select('svg').append('circle').attr('class', 'pointE'+ " circle_" +cId).call(dragP);
                shapeId = "circle_" + cId;
                console.log('shapeId',shapeId);
                updateEllipse();
            }
        } else {
            console.log('drag');
            isDragging = true;
        }
        isDown = !isDown;
        click++;
        // cId++;
        console.log('outside');
    })
        .on('touchmove', function () {
        // .on('mousemove', function () {
        //     console.log('circle touchmove');
            m2 = d3.mouse(this);
            // if (isDown && !isDragging) {
            if (isDown && !isDragging && click == 2) {
                self.eData[0].x2 = m2[0];
                self.eData[0].y2 = m2[1];
                self.eData[0].a = Math.abs(m2[0] - m1[0]);
                self.eData[0].b = Math.abs(m2[1] - m1[1]);
                updateEllipse();
            }else{
                // console.log('touch more than two');
            }
        });


    function updateEllipse() {
        console.log("updateEllipses");
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

    // var dragE = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragEllipse);
    // var dragP = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragPoint);

    var dragE = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragEllipse);
    var dragP = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragPoint);

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
        // shapeId = "circle_" + cId;
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




