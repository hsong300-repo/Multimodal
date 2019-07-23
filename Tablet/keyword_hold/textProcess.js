// commands modes


function splitAnd(script){
    if(["and"].filter(n => script.indexOf(n) > -1).length > 0){
        var tokenStr = script.split("and");
    }else{
        var tokenStr = script.split("with");
    }

    // let tokenStr = script.split("and");
    let first = tokenStr[0];
    let second = tokenStr[1];

    let fStr = first.split(" ");
    let sStr = second.split(" ");

    return [fStr, sStr];
}

var input = document.getElementById("log");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submit").click();
    }
});

// this is the function that process query that detects keywords and lead to certain function
function textProcess(){
    var script = $("#log").val();
    let myStr = script.toLowerCase();
    // there should be a case only when there is

    if(["here","there"].filter(n=> myStr.indexOf(n) > -1).length > 0){
        var here = true;
    }else{
        var here = false;
    }
    if(["this"].filter(n=> myStr.indexOf(n) > -1).length > 0){
        var deleteThis = true;
    }else{
        var deleteThis= false;
    }
    if(["and","with"].filter(n => myStr.indexOf(n) > -1).length > 0){
        console.log('and with');
        var tokenStr = myStr.split(" ");

        var andStr = splitAnd(myStr);
        // console.log('after and split function',andStr[0],andStr[1]);

        var shape = shapes.filter(function(n) {
            return andStr[0].indexOf(n) > -1;
        });

        var color = colors.filter(function(n) {
            return andStr[0].indexOf(n) > -1;
        });

        var count = counts.filter(function(n) {
            return andStr[0].indexOf(n) > -1;
        });
        var n = mapToNumber(count[0]);

        if(["stroke","line","border","width"].filter(n => andStr[1].indexOf(n) > -1).length > 0){
            var strokeColor = colors.filter(function(n) {
                return andStr[1].indexOf(n) > -1;
            });
        }

        // console.log('stroke color',strokeColor);

    }else{
        console.log('normal');
        var tokenStr = myStr.split(" ");

        var shape = shapes.filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });

        var color = colors.filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });

        var count = counts.filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });

        if(["stroke","line","border","width"].filter(n => tokenStr.indexOf(n) > -1).length > 0){ // weird
            var strokeColor = colors.filter(function(n) {
                return tokenStr.indexOf(n) > -1;
            });
            var color = "none";
        }else{
            var strokeColor = "none"; // dafault
        }

        console.log('stroke color normal',strokeColor);
        var n = mapToNumber(count[0]);
    }

    // let andStr = splitAnd(myStr); // this one is added for applying stroke color and fillcolor
    // let tokenStr = myStr.split(" ");
    //make it all lower case
    console.log('tokenizedStr',tokenStr);
    // var result = ["remove","insert","create","put","generate"].filter(function(n) {
    //     return tokenStr.indexOf(n) > -1;
    // });

    if(copyCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0) {
        console.log('copy');

        copyShapes(n);
    }else if(drawCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){

        drawShapes(shape[0],color[0],n,strokeColor[0],here);
        // putRect();
    }else if(deleteCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('delete');

        if(deleteThis === true){
            removeThisShape(shape[0],color[0],strokeColor[0]);
        }else if(deleteThis === false){
            removeShapes(shape[0],color[0],strokeColor[0]);
        }

    }else if(updateCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        updateShapes(color[0],strokeColor[0]);
    }else if(order.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('order');
        orderShape();
    }else if(orderBack.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('order');
        orderShapeBack();
    }else{
        $("#output").text("A command did not work. Try again.");
    }
}

function mapToNumber(str){
    if(isNaN(str)){// str
        switch(str){
            case "one":
                return 1;
            case "two":
                return 2;
            case "three":
                return 3;
            case "four":
                return 4;
            case "five":
                return 5;
            case "six":
                return 6;
            case "seven":
                return 7;
            case "eight":
                return 8;
            case "nine":
                return 9;
            case "ten":
                return 10;
            case "1":
                return 1;
            case "2":
                return 2;
            case "3":
                return 3;
            case "4":
                return 4;
            case "5":
                return 5;
            case "6":
                return 6;
            case "7":
                return 7;
            case "8":
                return 8;
            case "9":
                return 9;
            case "10":
                return 10;
        }// end of switch
    }else{
        return str;
    }


}

