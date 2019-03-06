if (annyang) {
    // Let's define a command.
    var commands = {
        'hello': function() { alert('Hello world!'); },
        'system draw (a) circle': drawCircle,
        'system draw (a) rectangle': drawRect,
        'system draw (a) triangle': drawTriangle,
        'system draw (a) :color circle': drawCircle,
        'system draw (a) :color rectangle': drawRect,
        'system draw (a) :color triangle': drawTriangle,
        'system remove (all) triangles': removeTriangle,
        'system remove (all) rectangles': removeRect,
        'system remove (all) circles': removeCircle,
        'system change (color) to :color': changeColor,
    };

    annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
        console.log(userSaid); // sample output: 'hello'
        $("h3").text(userSaid);
        console.log(commandText); // sample output: 'hello (there)'
        console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
    });



    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
}