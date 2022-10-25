$(function() {
    //declare variable
    var myArray;
    var inputLength;
    var reading = false;
    var counter;
    var action;
    var frequency = 200;
    $("#new").hide()
    $("#resume").hide()
    $("#pause").hide()
    $("#controls").hide()
    $("#result").hide()
    $("#error").hide()
        //click on start button
    $("#start").click(function() {
        // get text and split it into words inside an array
        //\s match spaces tabs new lines etc
        myArray = $("#userInput").val().split(/\s+/);
        inputLength = myArray.length;
        if (inputLength > 1) {
            //there is enough input
            reading = true;
            //hide startbutton error message and userinput
            //show new pause and resume ==controls
            $("#start").hide()
            $("#error").hide()
            $("#userInput").hide()
            $("#new").show()
                // $("#resume").show()
            $("#pause").show()
            $("#controls").show()

            //progress slider max
            $("#progressslider").attr("max", inputLength - 1)
                //start the counter to zero
            counter = 0;
            //show the reading box with first word
            $("#result").show()
            $("#result").text(myArray[counter])
                //start reading from first word
            action = setInterval(read, frequency)
        } else {
            //not enough input
            $("#error").show()
        }
        //click new button
        $("#new").click(function() {

                //reload page
                location.reload()
            })
            //click pause button
        $("#pause").click(function() {

                //stop reading and swtich to non reading mode
                clearInterval(action)
                reading = false
                    //hide pause button and show resume button
                $("#pause").hide()
                $("#resume").show()
            })
            //click resume button
        $("#resume").click(function() {

                //start reading and swtich to  reading mode
                action = setInterval(read, frequency)
                reading = true
                    //hide resume button and show pause button
                $("#pause").show()
                $("#resume").hide()
            })
            //change font size
        $("#fontsizeslider").on("slidestop", function(event, ui) {
            //refresh the slider
            $("#fontsizeslider").slider("refresh");

            //get the value of slider
            var slidervalue = parseInt($("#fontsizeslider").val());

            $("#result").css("fontSize", slidervalue);
            $("#fontsize").text(slidervalue);
        });
        //change the speed of reader
        $("#speedslider").on("slidestop", function(event, ui) {

            //refresh the slider
            $("#speedslider").slider("refresh");

            //get the value of slider
            var slidervalue = parseInt($("#speedslider").val());

            $("#speed").text(slidervalue);

            //stop reading
            clearInterval(action);

            //change frequency
            frequency = 60000 / slidervalue;

            //resume reading if we are in reading mode
            if (reading) {
                action = setInterval(read, frequency);
            }
        });
        //progress slider
        $("#progressslider").on("slidestop", function(event, ui) {

            //refresh the slider
            $("#progressslider").slider("refresh");

            //get the value of slider
            var slidervalue =
                parseInt($("#progressslider").val());

            //stop reading
            clearInterval(action);

            //change counter
            counter = slidervalue;

            //change word
            $("#result").text(myArray[counter]);

            //change value of progress

            $("#percentage").text(Math.floor(counter / (inputLength - 1) * 100));

            //resume reading if we are in reading mode
            if (reading) {
                action = setInterval(read, frequency);
            }
        });
        //Functions
        function read() {
            if (counter == inputLength - 1) {
                //last word
                clearInterval(action)
                reading = false //no more words
                $("#pause").hide()
            } else {
                //increase counter by one
                counter++
                //get word
                $("#result").text(myArray[counter])
                    //change progress slider value and refresh
                $("#progressslider").val(counter).slider('refresh')
                    //change text percentage
                $("#percentage").text(Math.floor(counter / (inputLength - 1) * 100))
            }
        }
    })
    ``
})