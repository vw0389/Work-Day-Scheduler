var now = dayjs();
var hours = {};

function todayFormatted() {
    var returning = now.format('dddd, MMMM D');

    var suffex = now.format('DD')
    if (suffex.charAt(1) === '1') {
        returning = returning + "st";
    } else if (suffex.charAt(1) === '2') {
        returning = returning + "nd";
    } else if (suffex.charAt(1) === '3') {
        returning = returning + "rd";
    } else {
        returning = returning + "th";
    }
    return returning;
}

function renderSchedule() {
    for (var i = 9; i < 18; i++) {
        var timeFrame = "";
        // get the AM or PM correct, also 12 hour time instead of 24 hour time
        var currentId = i
        if ( i < 12) {
            currentId = currentId + "am";
        } else if (i === 12) {
            currentId = currentId + "pm";
        } else {
            currentId = (currentId-12) + "pm";
        }
        if (now.hour() > i) {
            timeFrame = "past";
        } else if (now.hour() === i) {
            timeFrame = "present";
        } else {
            timeFrame = "future";
        }
        // Create all elements
        $('<div/>', {
            id: currentId,
            class: "row"
        }).appendTo(".container");
        $('<h4/>', {
            class: "hour col",
            text: currentId
        }).appendTo("#" + currentId);
        $('<textarea/>', {
            class: "col-10 " + timeFrame + " textarea-" + i,
        }).appendTo("#" + currentId);
        $('<button/>', {
            class: "col saveBtn click-" + i,
            text: ""
        }).appendTo("#" + currentId);
        // get tasks from dictionary

        // save task on click
        
        $(".click-"+i).click(function () {
            var classes = $(this).attr("class").split(" ");
            var hour = classes[2].replace("click-","");
            var text = $(".textarea-"+hour).val();
            if (text === ""){
                alert("Please enter a task");
                return;
            } else {
                saveTask(hour,text);
            }
            
        });


    }
    $('.saveBtn').append("<i class=\"fas fa-save\"></i>");
}

function saveTask (hour,text) {
    hours[hour] = text;
    var jsonified = JSON.stringify(hours);
    localStorage.setItem("dict",jsonified);
    // Local storage stuff
}
function loadTasks () {
    var dict = localStorage.getItem("dict");
    if (!dict) {
        return;
    } else {
        hours = JSON.parse(dict);
        for ( var key in hours) {
            $(".textarea-"+key).val(hours[key]);
        }
    }
}
$("#currentDay").text(todayFormatted());
renderSchedule();
loadTasks();