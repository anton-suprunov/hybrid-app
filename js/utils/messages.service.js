var _ = require('underscore');

function Messages() {}

_.extend(Messages.prototype, {
    show : function(message) {
        console.log(message);
        window.plugins.toast.showWithOptions(
            {
                message: message,
                duration: 3000, // ms
                position: "center",
                //addPixelsY: -40,  // (optional) added a negative value to move it up a bit (default 0)
                data: {'foo':'bar'}, // (optional) pass in a JSON object here (it will be sent back in the success callback below)
                styling: {
                    //opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                    //backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
                    //textColor: '#FFFF00', // Ditto. Default #FFFFFF
                    //textSize: 20.5, // Default is approx. 13.
                    //cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                    //horizontalPadding: 20, // iOS default 16, Android default 50
                    //verticalPadding: 16 // iOS default 12, Android default 30
                }
            },
            function(result) {
                if (result && result.event) {
                    //console.log("The toast was tapped");
                    //console.log("Event: " + result.event); // will be defined, with a value of "touch" when it was tapped by the user
                    //console.log("Message: " + result.message); // will be equal to the message you passed in
                    //console.log("data.foo: " + result.data.foo); // .. retrieve passed in data here
                } else {
                    //console.log("The toast has been shown");
                }
            }
        );
    }
});

module.exports = new Messages();