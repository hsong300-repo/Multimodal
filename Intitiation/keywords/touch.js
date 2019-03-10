console.log('read touch.js file');


$("#color").change(function () {
    // var select_color = document.getElementById("color");
    // var fillColor = select_color.options[select_color.selectedIndex].value;
    fillColor = $("#color option:selected").text();
    console.log('fillColor',fillColor);

    touch_color = true;

});