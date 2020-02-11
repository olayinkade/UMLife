$(document).ready(function(){

    scheduler1 = Scheduler.getSchedulerInstance();
    scheduler2 = Scheduler.getSchedulerInstance();

    scheduler1.config.max_month_events = 3; // maximum number of tasks in calendar

    //-------------------------------------------------------------------------------------------//

    // VALIDATE TITLE FIELD----------------------------------------------------------------------//
    scheduler1.attachEvent("onEventSave",function(id,ev){
      if (!ev.text) {
        dhtmlx.alert("Please Enter a Title");
        return false;
      }
      if (ev.text.length>50) {
        dhtmlx.alert("Please Enter a Valid Title");
        return false;
      }
      return true;
    });
    scheduler2.attachEvent("onEventSave",function(id,ev){
      if (!ev.text) {
        dhtmlx.alert("Please Enter a Title");
        return false;
      }
      if (ev.text.length>50) {
        dhtmlx.alert("Please Enter a Valid Title");
        return false;
      }
      return true;
    });
    // ----------------------------------------------------------------------------------------//

    scheduler1.config.resize_month_events = true; // resize tasks in month view by drag and drop

    // HOVER OVER FOR BOTH SCHEDULERS ---------------------------------------------------------//
    scheduler1.attachEvent("onTemplatesReady", function() {
      var highlight_step = 60; // we are going to highlight 30 minutes timespan

      var highlight_html = "";
      var hours = scheduler1.config.last_hour - scheduler1.config.first_hour; // e.g. 24-8=16
      var times = hours*60/highlight_step; // number of highlighted section we should add
      var height = scheduler1.config.hour_size_px*(highlight_step/60);
      for (var i=0; i<times; i++) {
        highlight_html += "<div class='highlighted_timespan' style='height: "+height+"px;'></div>"
      }
      scheduler1.addMarkedTimespan({
        days: "fullweek",
        zones: "fullday",
        html: highlight_html
      });
    });
    scheduler2.attachEvent("onTemplatesReady", function() {
      var highlight_step = 60; // we are going to highlight 30 minutes timespan

      var highlight_html = "";
      var hours = scheduler2.config.last_hour - scheduler2.config.first_hour; // e.g. 24-8=16
      var times = hours*60/highlight_step; // number of highlighted section we should add
      var height = scheduler2.config.hour_size_px*(highlight_step/60);
      for (var i=0; i<times; i++) {
        highlight_html += "<div class='highlighted_timespan' style='height: "+height+"px;'></div>"
      }
      scheduler2.addMarkedTimespan({
        days: "fullweek",
        zones: "fullday",
        html: highlight_html
      });
    });
    //-----------------------------------------------------------------------------------------------//

    // // CUSTOMIZED ADD TASK POP UP .......................................................//
    scheduler1.locale.labels.section_custom = "Type";
    scheduler1.locale.labels.section_important = "High Priority";
    scheduler1.locale.labels.new_event = "New Task";
    scheduler1.config.details_on_create = true;
    scheduler1.config.details_on_dblclick = true;
    // scheduler1.config.xml_date = "%Y-%m-%d %H:%i";
    // /////////////////``
    scheduler2.locale.labels.section_custom = "Type";
    scheduler2.locale.labels.section_important = "High Priority";
    scheduler2.locale.labels.new_event = "New Task";
    scheduler2.config.details_on_create = true;
    scheduler2.config.details_on_dblclick = true;
    // scheduler2.config.xml_date = "%Y-%m-%d %H:%i";
  //
  // ===============
  // Configuration
  // ===============

  var subject = [
    { key: 1, label: 'Course 1' },
  ];

  // // ------------------------------------------------------------------------------------------------------ //
  // customizing lightbox field //
    scheduler1.config.occurrence_timestamp_in_utc = true; // allows reccuring tasks independent of timezone
    scheduler1.config.include_end_by = true; // includes specified end by date [false will exclude it]
    scheduler1.config.repeat_precise = true; // prevents including past days in weekly recurrence
    scheduler1.config.multi_day = true; // enables rendering of multiday events
    // ///////////////////////////////////////////////////////
    scheduler2.config.occurrence_timestamp_in_utc = true; // allows reccuring tasks independent of timezone
    scheduler2.config.include_end_by = true; // includes specified end by date [false will exclude it]
    scheduler2.config.repeat_precise = true; // prevents including past days in weekly recurrence
    scheduler2.config.multi_day = true; // enables rendering of multiday events

    scheduler1.locale.labels.section_text = 'Title';
    scheduler1.locale.labels.section_checkbox = 'High Priority';
    scheduler1.locale.labels.section_radiobutton = 'Radiobutton';
    scheduler1.locale.labels.section_select = 'Type';
    scheduler1.locale.labels.section_subject = 'Type';
    scheduler1.locale.labels.section_template = 'Template';
    ////////////////////////////////////////////////////////
    scheduler2.locale.labels.section_text = 'Title';
    scheduler2.locale.labels.section_checkbox = 'High Priority';
    scheduler2.locale.labels.section_radiobutton = 'Radiobutton';
    scheduler2.locale.labels.section_select = 'Type';
    scheduler2.locale.labels.section_subject = 'Type';
    scheduler2.locale.labels.section_template = 'Template';

    scheduler1.templates.event_class=function(start, end, event){
      var css = "";
      if(event.subject) // if event has subject property then special class should be assigned
        css += "event_"+event.subject;
      if(event.id == scheduler1.getState().select_id){
        css += " selected";
      }
      if(event.important)
        css += event.color="red";
      return css; // default return
    };

    scheduler2.templates.event_class=function(start, end, event){
      var css = "";
      if(event.subject) // if event has subject property then special class should be assigned
        css += "event_"+event.subject;
      if(event.id == scheduler1.getState().select_id){
        css += " selected";
      }
      if(event.important)
        css += event.color="red";
      return css; // default return
    };

    scheduler1.config.lightbox.sections = [
      { name: "text", height: 40, map_to: "text", type: "textarea", focus: true },
      { name: "subject", height: 25, map_to: "subject", type: "select", options: subject },
      { name: "important", map_to: "important", type: "checkbox", checked_value: 1, unchecked_value: 0 },
      { name: "description", height: 60, map_to: "auto", type: "textarea"},
      // { name: "radiobutton", height: 65, options: pizza_size, map_to: "radiobutton_option", type: "radio", vertical: true },
      // { name: "template", height: 21, map_to: "text", type: "template" },
      { name: "recurring", type: "recurring", map_to: "rec_type", button: "recurring"},
      { name: "time", height: 72, type: "calendar_time", map_to: "auto" },
      // { name: "time", height: 72, type: "time", map_to: "auto"}
    ];
    scheduler1.config.wide_form = false;
    scheduler1.config.full_day = true;
    /////////////////////////////////////////////////////////
    scheduler2.config.lightbox.sections = [
      { name: "text", height: 40, map_to: "text", type: "textarea", focus: true },
      { name: "subject", height: 25, map_to: "subject", type: "select", options: subject },
      { name: "important", map_to: "important", type: "checkbox", checked_value: 1, unchecked_value: 0 },
      { name: "description", height: 60, map_to: "auto", type: "textarea"},
      // { name: "radiobutton", height: 65, options: pizza_size, map_to: "radiobutton_option", type: "radio", vertical: true },
      // { name: "template", height: 21, map_to: "text", type: "template" },
      { name: "recurring", type: "recurring", map_to: "rec_type", button: "recurring"},
      { name: "time", height: 72, type: "calendar_time", map_to: "auto" },
      // { name: "time", height: 72, type: "time", map_to: "auto"}
    ];
    scheduler2.config.wide_form = false;
    scheduler2.config.full_day = true;  ///////////////////

    scheduler1.config.resize_month_events = true;
    // -----------------------------------------------------------------------------------------------------------------//

    //what to show when exceeding 3 tasks in a day-----------------------------------////
    scheduler1.templates.month_events_link = function(date, count){
        return "<a>"+count+" Events...</a>";
    };
    // clicking view more link in month ---------------------------------------------///
    scheduler1.attachEvent("onViewMoreClick", function(date, e){
      console.log(date);
      console.log(date.getFullYear(), date.getMonth(), date.getDay());
      scheduler2.setCurrentView(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    });
    // clicking empty cell in the month ------------------------------------------------////
    scheduler1.attachEvent("onEmptyClick", function (date, e){
        //any custom logic here
      console.log(date);
      console.log(date.getFullYear(), date.getMonth(), date.getDay());
      scheduler2.setCurrentView(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    });
    scheduler1.init('scheduler_here', new Date(),"month");
    scheduler2.init('scheduler_here_too', new Date(),"day")

      var events = [
        {subject:1, important:1, text:"Midterm",   start_date:"12/11/2017 12:00",end_date:"12/11/2017 15:00"},
        {subject:1, important: 0, text:"Assigment 2 Due",start_date:"12/21/2017 12:00",end_date:"11/25/2017 19:00"},
        {subject:1, important: 0, text:"Co-Op Interview", start_date:"11/24/2017 09:00",end_date:"11/24/2017 10:00"}
       ];

      scheduler1.parse(events, "json");//takes the name and format of the data source
      scheduler2.parse(events, "json");//takes the name and format of the data source

    $('#addBtn').on('click', function() {
      //event.preventDefault(); // To prevent following the link (optional)
      let currDate = scheduler2.getState().date;
      let eventId = scheduler2.addEventNow({
        start_date: currDate,
        end_date: currDate,
        text: "New Task"
      });
      scheduler2.showLightbox(eventId);
      let newEvents = [...events,scheduler2.getEvent(eventId)];
      console.log(newEvents);
      scheduler1.parse(newEvents,"json");
    });

});
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function myFunction1() {
  document.getElementById("myDropdown1").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
function tog(id){
  var a = document.getElementById(id);
  if(a.style.display == 'block') {
    a.style.display = 'none';
  } else {
    a.style.display = 'block';
  }
}
//TaskTracker
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
