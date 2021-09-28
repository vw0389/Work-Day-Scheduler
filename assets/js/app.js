var now = dayjs();
var hours = [];

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

//  add current date to id=currentDay
$("#currentDay").text(todayFormatted());

function renderSchedule() {

    for ( var i = 9; i < 13; i++) {
        var timeFrame = ""
        if ( i === 12){
            var currentID = i + "pm";
        } else {
            var currentID = i + "am";
        }
        if (now.hour() > i){
            timeFrame = "past";
        } else if (now.hour() === i) {
            timeFrame = "present";
        } else {
            timeFrame = "future";
        }
        $('<div/>', {
            id: currentID,
            class: "row"
        }).appendTo(".container");
        $('<h3/>', {
            class: "hour col",
            text: currentID
        }).appendTo("#" + currentID);
        $('<textarea/>', {
            class: "col-10 " + timeFrame,
        }).appendTo("#" + currentID);
        $('<button/>', {
            class: "col saveBtn",
            text: ""
        }).appendTo("#" + currentID);
    }
    for ( var i = 1; i < 6; i++) {
        
        var currentID = i + "pm";
        if (now.hour() > i+12){
            timeFrame = "past";
        } else if (now.hour() === i+12) {
            timeFrame = "present";
        } else {
            timeFrame = "future";
        }
        $('<div/>', {
            id: currentID,
            class: "row"
        }).appendTo(".container");
        $('<h3/>', {
            class: "hour col",
            text: currentID
        }).appendTo("#" + currentID);
        $('<textarea/>', {
            class: "col-10 " + timeFrame,
        }).appendTo("#" + currentID);
        $('<button/>', {
            class: "col saveBtn",
            
        }).appendTo("#" + currentID);
        
    }
    $('.saveBtn').append("<i class=\"fas fa-save\"></i>");
}
renderSchedule();