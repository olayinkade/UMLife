$(document).ready(function(){

    // PLACE CODE AFTER THIS!! ----------------------------------------------------------------------------------------------------------------------//
    scheduler1 = Scheduler.getSchedulerInstance();
    scheduler2 = Scheduler.getSchedulerInstance();
    //---------------------------------------------------------------------------------------------------------------------------------------------- //

    var modified_event_id = null;
    scheduler.templates.event_class = function(start, end, event) {
      if (event.id == modified_event_id)
        return "copied_event";
      return ""; // default
    };

    scheduler.attachEvent("onEventCopied", function(ev) {
      dhtmlx.message("You've copied event: <br/><b>"+ev.text+"</b>");
      modified_event_id = ev.id;
      scheduler.updateEvent(ev.id);
    });
    scheduler.attachEvent("onEventCut", function(ev) {
      dhtmlx.message("You've cut event: <br/><b>"+ev.text+"</b>");
      modified_event_id = ev.id;
      scheduler.updateEvent(ev.id);
    });

    scheduler.attachEvent("onEventPasted", function(isCopy, modified_ev, original_ev) {
      modified_event_id = null;
      scheduler.updateEvent(modified_ev.id);

      var evs = scheduler.getEvents(modified_ev.start_date, modified_ev.end_date);
      if (evs.length > 1) {
        dhtmlx.modalbox({
          text: "There is another event at this time! What do you want to do?",
          width: "500px",
          position: "middle",
          buttons:["Revert changes", "Edit event", "Save changes"],
          callback: function(index) {
            switch(+index) {
              case 0:
                if (isCopy) {
                  // copy operation, need to delete new event
                  scheduler.deleteEvent(modified_ev.id);
                } else {
                  // cut operation, need to restore dates
                  modified_ev.start_date = original_ev.start_date;
                  modified_ev.end_date = original_ev.end_date;
                  scheduler.setCurrentView();
                }
                break;
              case 1:
                scheduler.showLightbox(modified_ev.id);
                break;
              case 2:
                return;
            }
          }
        });
      }
    });
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
    //
      // // CUSTOMIZED ADD TASK POP UP .......................................................//
      scheduler1.locale.labels.timeline_tab = "Dashboard";
      scheduler1.locale.labels.day_tab = "View";
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
      { key: 2, label: 'Course 2' },
      { key: 3, label: 'Course 3' },
      { key: 4, label: 'Other' },
    ];
    var basicSort = function(a, b) {
      if (+a.start_date == +b.start_date) {
        return a.id > b.id ? 1 : -1;
      }
      return a.start_date > b.start_date ? 1 : -1;
    };
    var prioritySort = function(a, b) {
      // here we can define sorting logic, what event should be displayed at the top
      if (a.important && !b.important) {
        // display a before b
        return -1;
      } else {
        if (!a.important && b.important) {
          // display a after b
          return 1;
        } else {
          return basicSort(a, b);
        }
      }
    };
    // this function is not universal and should be changed depending on your timeline configuration
    var timeframeSort = function(a, b) {
      a_timeframe_start = scheduler1.date.date_part(new Date(a.start_date));
      a_timeframe_end = scheduler1.date.date_part(new Date(a.end_date));
      if (+a.end_date != +a_timeframe_end) {
        a_timeframe_end = scheduler1.date.add(a_timeframe_end, 1, "day");
      }
      b_timeframe_start = scheduler1.date.date_part(new Date(b.start_date));
      ///////////////////////////////
      a_timeframe_start = scheduler2.date.date_part(new Date(a.start_date));
      a_timeframe_end = scheduler2.date.date_part(new Date(a.end_date));
      if (+a.end_date != +a_timeframe_end) {
        a_timeframe_end = scheduler2.date.add(a_timeframe_end, 1, "day");
      }
      b_timeframe_start = scheduler2.date.date_part(new Date(b.start_date));

      if (a_timeframe_start < b.end_date && a_timeframe_end > b.start_date && +a_timeframe_start == +b_timeframe_start) {
        return prioritySort(a, b);
      } else {
        return (a_timeframe_start < b_timeframe_start) ? -1 : 1;
      }
    };
    scheduler1.createTimelineView({
      name: "timeline",
      x_unit: "day",
      x_date: "%d %F %Y",
      x_step: 1,
      x_size: 5,
      x_start: 1,
      x_length: 5,
      y_unit: subject,
      y_property: "subject",
      render: "tree",
      round_position: true,
      sort: timeframeSort
    });
    // Working week
    scheduler1.date.timeline_start = scheduler1.date.week_start;
    scheduler1.date.add_timeline = function(date, step, something) {
      return scheduler1.date.add(date, step * 7, "day");
    };
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
    ///////////////////
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
    scheduler2.config.full_day = true;
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
    //--------------------------------------------------------------------------------------------////
    // initialize calendar here -------------------------------------------------------------------------//
    scheduler1.init('scheduler_here', new Date(),"timeline");
    scheduler2.init('scheduler_here_too', new Date(),"day");

    var events = [
      {subject:1, important:1, text:"Midterm",   start_date:"12/11/2020 12:00",end_date:"12/11/2020 15:00"},
      {subject:1, important: 0, text:"Assigment 2 Due",start_date:"12/21/2020 12:00",end_date:"11/25/2020 19:00"},
      {subject:2, important: 0, text:"Web Lecture", start_date:"11/24/2020 09:00",end_date:"11/24/2020 10:00"},
      {subject:2, important: 1, text:"Midterm", start_date:"11/24/2020 12:00",end_date:"11/24/2020 13:00"},
      {subject:3, important: 0, text:"Work on Assignment",start_date:"11/21/2020 12:00",end_date:"11/25/2020 19:00"},
      {subject:1, important: 0, text:"Co-Op Interview", start_date:"11/24/2020 09:00",end_date:"11/24/2020 10:00"},
      {subject:4, important: 0, text:"Annie's Birthday Bash", start_date:"11/24/2020 19:00",end_date:"11/24/2020 20:00"},
    ];
    scheduler1.parse(events, "json");//takes the name and format of the data source
    scheduler2.parse(events, "json");//takes the name and format of the data source
    // // scheduler1.load("./dhtmlxScheduler2/samples/20_multiple/data/events.xml") ;

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
  if(a.style.display == 'block')
    a.style.display = 'none'
  else
    a.style.display = 'block'
}
// Remove and complete icons in SVG format
 var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
 var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

 	// User clicked on the add button
 // If there is any text inside the item field, add that text to the todo list
 document.getElementById('add').addEventListener('click', function() {
 	var value = document.getElementById('item').value;
 	if (value) {
 			addItemTodo(value);
 			document.getElementById('item').value = '';
 		}
 	});

 	function removeItem() {
 		var item = this.parentNode.parentNode;
 	var parent = item.parentNode;

 		parent.removeChild(item);
 }

 	function completeItem() {
 	var item = this.parentNode.parentNode;
 	var parent = item.parentNode;
 		var id = parent.id;

 	// Check if the item should be added to the completed list or to re-added to the todo list
 		var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

 	parent.removeChild(item);
 	target.insertBefore(item, target.childNodes[0]);
 }

 	// Adds a new item to the todo list
 	function addItemTodo(text) {
 		var list = document.getElementById('todo');

 	var item = document.createElement('li');
 		item.innerText = text;

 		var buttons = document.createElement('div');
 		buttons.classList.add('buttons');

 	var remove = document.createElement('button');
 		remove.classList.add('remove');
 		remove.innerHTML = removeSVG;

 		// Add click event for removing the item
 	remove.addEventListener('click', removeItem);

 		var complete = document.createElement('button');
 	complete.classList.add('complete');
 	complete.innerHTML = completeSVG;

 		// Add click event for completing the item
 		complete.addEventListener('click', completeItem);

 		buttons.appendChild(remove);
 	buttons.appendChild(complete);
 	item.appendChild(buttons);

 	list.insertBefore(item, list.childNodes[0]);
 	}
