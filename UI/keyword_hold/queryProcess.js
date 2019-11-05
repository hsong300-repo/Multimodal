// commands modes
const drawCommands = ["draw","insert","create","put","generate","make","add"];
const copyCommands = ["copy","duplicate","paste","copies","copied","duplicated"];
const deleteCommands = ["remove","delete","clear","removed"];
const allCommands = ["all","every"];
const updateCommands = ["change","update","apply","fill","set","color"];
const makeCommands = ["make"];

//shapes
const shapes = ["circle","rectangle","square","circles","rectangles","squares"];
//colors
const colors = ["red","brown","green","yellow","orange","pink","blue","purple","gray","grey","white","pink","black","wheat","violet","plum","tomato","silver","yellow","aqua"];
//counts
const counts = ["one","two","three","four","five","six","seven","eight","nine","ten","1","2","3","4","5","6","7","8","9","10"];
const order = ["front","raise","top","up"];
const orderBack = ["back","low","lower","below","backwards","bottom"];
var all_flag = false;

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
        var This_flag = true;
    }else{
        var deleteThis= false;
        var This_flag = false;
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
        console.log('-----tokenStr',tokenStr);

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

        console.log('shape, color,count,n',shape,color,count,n);
    }

    // let andStr = splitAnd(myStr); // this one is added for applying stroke color and fillcolor
    // let tokenStr = myStr.split(" ");
    //make it all lower case
    console.log('tokenizedStr',tokenStr);
    // console.log('shape',shape,typeof(shape),shape[0],typeof(shape[0]),shape.length);
    // var result = ["remove","insert","create","put","generate"].filter(function(n) {
    //     return tokenStr.indexOf(n) > -1;
    // });

    if(copyCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0) {
        console.log('copy');
        copyShapes(n,shape[0],color[0]);
    }else if(makeCommands.filter(n=>tokenStr.indexOf(n)>-1).length>0){
        if(This_flag === true && color !== "none" && !shape[0]){
            // console.log('------change color 1');
            updateShapes(color[0],strokeColor[0]);
        }else if(This_flag === true && color !== "none" && shape[0]){
            // console.log('------change color 2');
            updateShapes(color[0],strokeColor[0]);
        }else if(This_flag === false && color !== "none" && !shape[0]){
            // console.log('------change color, make blue');
            updateShapes(color[0],strokeColor[0]);
        }else if(This_flag === false && color === "none" && shape[0]){
            // console.log('------draw shapes 1');
            drawShapes(shape[0],color[0],n,strokeColor[0],here);
        }else if(This_flag === false && color !== "none" && shape[0]){
            // console.log('------draw shapes 2');
            drawShapes(shape[0],color[0],n,strokeColor[0],here);
        }

    } else if(drawCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){

        drawShapes(shape[0],color[0],n,strokeColor[0],here);
        // putRect();
    }else if(deleteCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('delete');

        if(allCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){
            all_flag = true;
        }else{
            all_flag = false;
        }

        if(deleteThis === true){
            removeThisShape(shape[0],color[0],strokeColor[0]);
        }else if(deleteThis === false){
            removeShapes(shape[0],color[0],strokeColor[0],tokenStr);
        }

    }else if(updateCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        final_transcript = final_transcript.replace(/two/g,'to');
        $("#log").val(final_transcript);
        updateShapes(color[0],strokeColor[0]);
    }else if(order.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('order');
        final_transcript = final_transcript.replace(/two/g,'to');
        $("#log").val(final_transcript);
        orderShape();
    }else if(orderBack.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('order');
        final_transcript = final_transcript.replace(/two/g,'to');
        $("#log").val(final_transcript);
        orderShapeBack();
    }
}


