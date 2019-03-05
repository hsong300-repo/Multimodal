if (annyang) {
    // Let's define a command.
    var commands = {
        'hello': function() { alert('Hello world!'); },
        'draw (a green) circle': drawCircle,
        'draw (a green) rectangle': drawRect,
        'draw (a green) triangle': drawTriangle,
        'draw (a) :color circle': drawCircle,
        'draw (a) :color rectangle': drawRect,
        'draw (a) :color triangle': drawTriangle,
        'remove (all) triangles': removeTriangle,
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