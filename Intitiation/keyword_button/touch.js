console.log('read touch.js file');
touch_color = false;
touch_border_color = false;
remove_flag = false;


// $("#color").change(function () {
//     // var select_color = document.getElementById("color");
//     // var fillColor = select_color.options[select_color.selectedIndex].value;
//     fillColor = $("#color option:selected").text();
//     console.log('fillColor',fillColor);
//
//     touch_color = true;
//     remove_flag = false;
//
//
// });
//
// $("#border_color").change(function () {
//     // var select_color = document.getElementById("color");
//     // var fillColor = select_color.options[select_color.selectedIndex].value;
//     border_color = $("#border_color option:selected").text();
//     console.log('border_color',border_color);
//
//     touch_border_color = true;
//     remove_flag = false;
//
// });

function removeShapes(){
    // var shapes = stage.find('.triangle');
    // shapes.visible('false');

    // have to do something

    stage.on('click', function (e) {
        console.log('click the object');
        if (e.target.hasName('triangle') || e.target.hasName('circle') || e.target.hasName('rect')) {
            // var fill = color;
            e.target.visible(false);
            layer.add(e.target);
            layer.draw();
        }
    });


}