// commands modes
const drawCommands = ["draw","insert","create","put","generate","add"];
const copyCommands = ["copy","duplicate","paste","copies"];
const deleteCommands = ["remove","delete","clear"];
const updateCommands = ["change","update","apply","fill","set","make","color"];

//shapes
const shapes = ["circle","rectangle","square","circles","rectangles","squares"];
//colors
const colors = ["red","brown","green","yellow","pink","blue","purple","gray","grey","white","pink","black","wheat","violet","plum","tomato","silver","yellow","aqua"];
//counts
const counts = ["one","two","three","four","five","six","seven","eight","nine","ten","1","2","3","4","5","6","7","8","9","10"];
const order = ["front","raise","bring"];


// this is the function that process query that detects keywords and lead to certain function
function QueryProcess(script){
    let myStr = script.toLowerCase();
    // let tokenStr = myStr.split(" ");

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
        var tokenStr = myStr.split(" ");

        var andStr = splitAnd(myStr);

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


    }else{
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

        var n = mapToNumber(count[0]);
    }

    // let andStr = splitAnd(myStr); // this one is added for applying stroke color and fillcolor
    // let tokenStr = myStr.split(" ");
    //make it all lower case
    // var result = ["remove","insert","create","put","generate"].filter(function(n) {
    //     return tokenStr.indexOf(n) > -1;
    // });

    if(drawCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){

        drawShapes(shape[0],color[0],n,strokeColor[0],here);
        // putRect();
    }else if(copyCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){

        copyShapes(n);

    }else if(deleteCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){

        if(deleteThis === true){
            removeThisShape(shape[0],color[0],strokeColor[0]);
        }else if(deleteThis === false){
            removeShapes(shape[0],color[0],strokeColor[0]);
        }

    }else if(updateCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        updateShapes(color[0],strokeColor[0]);
    }else if(order.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        orderShape();
    }else{
        $("#output").text("A command did not work. Try again.");
    }
}


