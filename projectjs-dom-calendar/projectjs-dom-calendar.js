var createCalendar = function (PeteJsLibrary, isDatepicker = false){
    var listOfEvents = [];
    var calendar = function(deleteElements = true, month, year){
        var date = new Date();
        if(month === undefined) {
            month = date.getMonth();
        }
        if(year === undefined) {
            year = date.getFullYear();
        }
        var day = date.getDate();
    
        var februaryDays=28;
        //Check if year is leaping
        if (month == 1){
            if ( (year%100!=0) && (year%4==0) || (year%400==0)){
                februaryDays = 29;
            }
        }
        
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        var daysOfmonth = [31, februaryDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var body = document.body;
    
        var nextMonth = month + 1;
        var previousMonth = month - 1;
    
        var daysCounter = 1;
        var nextDate = new Date(nextMonth + ' 1 ,' + year);
        var numDaysFromPreviousMonth = nextDate.getDay();
        var days = daysOfmonth[month];
        
        var table = PeteJsLibrary.createElement("table");
        var tBody = PeteJsLibrary.createElement("tbody");
    
        var eventsContainer = PeteJsLibrary.createElement('div');
        
        //function for creating events
        var writeEvent = function(e){
            var that = e.target;
            Array.from(PeteJsLibrary.accessChild(eventsContainer))
                .forEach(child => PeteJsLibrary.deleteElement(child));
    
            var textEvent = PeteJsLibrary.createElement("input");
            var addEvent = function(){
                var events = PeteJsLibrary.createElement("div");
                PeteJsLibrary.changeTextContent(events, textEvent.value);
               PeteJsLibrary.appendElement(that, events);
               var eventIndex =listOfEvents.map(e => e.id).indexOf(that.id);
               if (eventIndex === -1) {
                   listOfEvents.push({
                       id: that.id,
                       events: []
                    });
                    eventIndex = listOfEvents.length - 1;
                }
                listOfEvents[eventIndex].events.push(textEvent.value);
            }
            var eventBtn = PeteJsLibrary.createElement("button");
            PeteJsLibrary.changeTextContent(eventBtn, "Create Event");
            PeteJsLibrary.appendElement(eventsContainer, textEvent);
            PeteJsLibrary.appendElement(eventsContainer, eventBtn);
            PeteJsLibrary.appendElement(body, eventsContainer);
            PeteJsLibrary.eventListener(eventBtn, "click", addEvent);
        }
        
        //names of days of week
        var row = PeteJsLibrary.createElement("tr");
        PeteJsLibrary.appendElement(tBody, row);
        for(var i=0; i<daysOfWeek.length; i++){
            var cell = PeteJsLibrary.createElement("td");
            PeteJsLibrary.changeTextContent(cell, daysOfWeek[i]);
            PeteJsLibrary.appendElement(row, cell);
        }
        //empty cells for days from the previous month
        if(numDaysFromPreviousMonth!==0){
            var row = PeteJsLibrary.createElement("tr");
            PeteJsLibrary.appendElement(tBody, row);
            for(var i=1; i<numDaysFromPreviousMonth; i++){
                var cell = PeteJsLibrary.createElement("td");
                PeteJsLibrary.appendElement(row, cell);
                daysCounter++;
            }
        }
        
        //header
        var calendarHeader = PeteJsLibrary.createElement("caption");
        for(var i=0; i<months.length; i++){
            if(i === month){
                PeteJsLibrary.changeTextContent(calendarHeader, months[i] + " " + year);
            }
        }
        PeteJsLibrary.appendElement(table, calendarHeader);
        
        //creating buttons
        var btnPreviousMonth = PeteJsLibrary.createElement("button");
        PeteJsLibrary.changeTextContent(btnPreviousMonth, "Previous Month");
        PeteJsLibrary.appendElement(calendarHeader, btnPreviousMonth);
    
        var btnNextMonth = PeteJsLibrary.createElement("button");
        PeteJsLibrary.changeTextContent(btnNextMonth, "Next Month");
        PeteJsLibrary.appendElement(calendarHeader, btnNextMonth);
    
        var getPreviousMonth = function(){
            if(previousMonth < 0){
                previousMonth = 11;
                year = year - 1;
            }
            calendar(true, previousMonth, year)
        }
        PeteJsLibrary.eventListener(btnPreviousMonth, "click", getPreviousMonth);
    
        var getNextMonth = function(){
            if(nextMonth > 11){
                nextMonth = 0;
                year = year + 1;
            }
            calendar(true, nextMonth, year)
        }
        PeteJsLibrary.eventListener(btnNextMonth, "click", getNextMonth);
    
        //days from this month
        for(var i = 1; i<=days; i++){
            if(daysCounter === 1){
                var row = PeteJsLibrary.createElement("tr");
            }
            if(daysCounter > 7){
                daysCounter = 1;
                row = PeteJsLibrary.createElement("tr");
            }
            var cellId = `${i}-${month}-${year}`;
            
            PeteJsLibrary.appendElement(tBody, row);
            var cell = PeteJsLibrary.createElement("td");
            PeteJsLibrary.addAttributes(cell, "id", cellId);
            var cellText = document.createTextNode(i);
            PeteJsLibrary.appendElement(cell, cellText);
            PeteJsLibrary.eventListener(cell, "click", writeEvent);
            var eventIndex = listOfEvents.map(e => e.id).indexOf(cellId);
            if(eventIndex !== -1){
                listOfEvents[eventIndex].events.forEach(e => {
                    var event = PeteJsLibrary.createElement("div");
                    PeteJsLibrary.changeTextContent(event, e);
                    PeteJsLibrary.appendElement(cell, event);
                });
            }
            //check if there are events on the day using alert
            var alertEvent = function(){
                if(listOfEvents.map(e => e.id).indexOf(this.id) === -1){
                    alert("No events on this day!");
                }
                else{
                    alert("There are events on this day!")
                }
            }
            PeteJsLibrary.eventListener(cell, "dblclick", alertEvent);

            PeteJsLibrary.appendElement(row, cell);
            daysCounter++;
            if(i===day && month===date.getMonth() && year===date.getFullYear()){
                PeteJsLibrary.cssStyle(cell, "background", "grey");    
            }
        }
    
        if(deleteElements){
            Array.from(PeteJsLibrary.accessChild(body))
                .forEach(child => PeteJsLibrary.deleteElement(child));
        }
    
        PeteJsLibrary.appendElement(table, tBody);
        PeteJsLibrary.appendElement(body, table);


        //css
        PeteJsLibrary.cssStyle(table, "color", "red");
        PeteJsLibrary.cssStyle(table, "background", "rgb(35, 44, 56)");
        PeteJsLibrary.cssStyle(table, "width", "1000px");
        PeteJsLibrary.cssStyle(table, "height", "500px");
        PeteJsLibrary.cssStyle(table, "border", "white");
        PeteJsLibrary.cssStyle(table, "text-align", "center"); 
        PeteJsLibrary.cssStyle(table, "border", "1px solid black");
        PeteJsLibrary.cssStyle(btnNextMonth, "float", "right");
        PeteJsLibrary.cssStyle(btnPreviousMonth, "float", "left");
    
        return table;
    }
    
    //datepicker / doesn't work completely
    var datePicker = function(){
        var body=document.body;
        var selectDate = PeteJsLibrary.createElement("input");
        PeteJsLibrary.addAttributes(selectDate, "id", "datepicker");
        PeteJsLibrary.appendElement(body, selectDate);
        var table;
        var focus = function(){
            table = calendar(false);
        }
        var focusOut = function (e) {
            PeteJsLibrary.deleteElement(table);           
            var target = e.relatedTarget;
            if(target !== null && target.tagName.toLowerCase() === 'button'){
                target.click();
                return;
            }
        }
        PeteJsLibrary.eventListener(selectDate, "focus", focus);
        PeteJsLibrary.eventListener(selectDate, "focusout", focusOut);
    }

    //custom datepicker/ workes with type date and visualizes ready calendar, not mine
    var customDatePicker = function(){
        var body=document.body;
        var selectDate = document.createElement("input");
        selectDate.type = "date";
        PeteJsLibrary.addAttributes(selectDate, "id", "datepicker");
        PeteJsLibrary.appendElement(body, selectDate);
    }

    if(isDatepicker){
        datePicker();
        customDatePicker();
    }
    else{
        calendar();
    }
}


