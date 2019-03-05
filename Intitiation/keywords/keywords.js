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
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
}