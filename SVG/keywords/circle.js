// var svg = d3.select('body').append('svg');

d3.select('#touchCircle').on('click', function () {
    new Ellipse();
});

function Ellipse() {
    var self = this;
    var ellipse, eData = [], isDown = false, isDragging = false, m1, m2, radiusX, radiusY, click = 1;

    // svg.on('mousedown', function () {
    svg.on('touchstart', function () {
            m1 = d3.mouse(this);
        if (!isDown && click == 1) {
            if(!isDragging){
                self.eData = [{
                    x1: m1[0],
                    y1: m1[1],
                    x2: m1[0],
                    y2: m1[1],
                    a: 0,
                    b: 0
                }];
                self.ellipseElement = d3.select('svg').append('ellipse').attr('class', 'ellipse').call(dragE);
                self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
                self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
                self.pointElement3 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
                self.pointElement4 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
                updateEllipse();
            }
        } else {
            isDragging = true;
        }
        isDown = !isDown;
        click++;
    })
        .on('touchmove', function () {
        // .on('mousemove', function () {
            m2 = d3.mouse(this);
            if (isDown && !isDragging && click == 2) {
                self.eData[0].x2 = m2[0];
                self.eData[0].y2 = m2[1];
                self.eData[0].a = Math.abs(m2[0] - m1[0]);
                self.eData[0].b = Math.abs(m2[1] - m1[1]);
                updateEllipse();
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
            .attr('r', 5)
            .attr('cx', function (d) { return d.x1; })
            .attr('cy', function (d) { return d.y1 - d.b; });
        point2 = d3.select(self.pointElement2[0][0]).data(self.eData);
        point2.attr('id', 2)
            .attr('r', 5)
            .attr('cx', function (d) { return d.x1 + d.a; })
            .attr('cy', function (d) { return d.y1; });
        point3 = d3.select(self.pointElement3[0][0]).data(self.eData);
        point3.attr('id', 3)
            .attr('r', 5)
            .attr('cx', function (d) { return d.x1; })
            .attr('cy', function (d) { return d.y1 + d.b; });
        point4 = d3.select(self.pointElement4[0][0]).data(self.eData);
        point4.attr('id', 4)
            .attr('r', 5)
            .attr('cx', function (d) { return d.x1 - d.a; })
            .attr('cy', function (d) { return d.y1; });
    }

    var dragE = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragEllipse);
    var dragP = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragPoint);

    function dragStart(d) {
        isDown = false;
        isDragging = true;
        d3.event.sourceEvent.stopPropagation();
        d3.event.sourceEvent.preventDefault();
    }

    function dragEnd(d) {
        isDown = isDragging = false;
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