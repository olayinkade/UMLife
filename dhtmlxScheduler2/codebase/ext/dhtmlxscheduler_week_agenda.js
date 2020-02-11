/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e._wa={},e.xy.week_agenda_scale_height=20,e.templates.week_agenda_event_text=function(t,a,i,n){return e.templates.event_date(t)+" "+i.text},e.date.week_agenda_start=e.date.week_start,e.date.week_agenda_end=function(t){return e.date.add(t,7,"day")},e.date.add_week_agenda=function(t,a){return e.date.add(t,7*a,"day")},e.attachEvent("onSchedulerReady",function(){var t=e.templates;t.week_agenda_date||(t.week_agenda_date=t.week_date)}),function(){var t=e.date.date_to_str("%l, %F %d");
e.templates.week_agenda_scale_date=function(e){return t(e)}}(),e.attachEvent("onTemplatesReady",function(){e.attachEvent("onSchedulerResize",function(){return"week_agenda"==this._mode?(this.week_agenda_view(!0),!1):!0});var t=e.render_data;e.render_data=function(a){return"week_agenda"!=this._mode?t.apply(this,arguments):void e.week_agenda_view(!0)};var a=function(){e._cols=[];var t=parseInt(e._els.dhx_cal_data[0].style.width);e._cols.push(Math.floor(t/2)),e._cols.push(t-e._cols[0]-1),e._colsS={0:[],
1:[]};for(var a=parseInt(e._els.dhx_cal_data[0].style.height),i=0;3>i;i++)e._colsS[0].push(Math.floor(a/(3-e._colsS[0].length))),a-=e._colsS[0][i];e._colsS[1].push(e._colsS[0][0]),e._colsS[1].push(e._colsS[0][1]),a=e._colsS[0][e._colsS[0].length-1],e._colsS[1].push(Math.floor(a/2)),e._colsS[1].push(a-e._colsS[1][e._colsS[1].length-1])},i=function(){a(),e._els.dhx_cal_data[0].innerHTML="",e._rendered=[];for(var t="",i=0;2>i;i++){var n=e._cols[i],r="dhx_wa_column";1==i&&(r+=" dhx_wa_column_last"),t+="<div class='"+r+"' style='width: "+n+"px;'>";
for(var s=0;s<e._colsS[i].length;s++){var o=e.xy.week_agenda_scale_height-2,d=e._colsS[i][s]-o-2,_=Math.min(6,2*s+i);t+="<div class='dhx_wa_day_cont'><div style='height:"+o+"px; line-height:"+o+"px;' class='dhx_wa_scale_bar'></div><div style='height:"+d+"px;' class='dhx_wa_day_data' day='"+_+"'></div></div>"}t+="</div>"}e._els.dhx_cal_date[0].innerHTML=e.templates[e._mode+"_date"](e._min_date,e._max_date,e._mode),e._els.dhx_cal_data[0].innerHTML=t;for(var l=e._els.dhx_cal_data[0].getElementsByTagName("div"),c=[],i=0;i<l.length;i++)"dhx_wa_day_cont"==l[i].className&&c.push(l[i]);
e._wa._selected_divs=[];for(var h=e.get_visible_events(),u=e.date.week_start(e._date),v=e.date.add(u,1,"day"),i=0;7>i;i++){c[i]._date=u,e._waiAria.weekAgendaDayCell(c[i],u);var f=c[i].childNodes[0],g=c[i].childNodes[1];f.innerHTML=e.templates.week_agenda_scale_date(u);for(var p=[],m=0;m<h.length;m++){var y=h[m];y.start_date<v&&y.end_date>u&&p.push(y)}p.sort(function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date>t.start_date?1:-1});for(var s=0;s<p.length;s++){
var x=p[s],b=document.createElement("div");e._rendered.push(b);var w=e.templates.event_class(x.start_date,x.end_date,x);b.className="dhx_wa_ev_body"+(w?" "+w:""),x._text_style&&(b.style.cssText=x._text_style),x.color&&(b.style.background=x.color),x.textColor&&(b.style.color=x.textColor),e._select_id&&x.id==e._select_id&&(e.config.week_agenda_select||void 0===e.config.week_agenda_select)&&(b.className+=" dhx_cal_event_selected",e._wa._selected_divs.push(b));var k="";x._timed||(k="middle",x.start_date.valueOf()>=u.valueOf()&&x.start_date.valueOf()<=v.valueOf()&&(k="start"),
x.end_date.valueOf()>=u.valueOf()&&x.end_date.valueOf()<=v.valueOf()&&(k="end")),b.innerHTML=e.templates.week_agenda_event_text(x.start_date,x.end_date,x,u,k),b.setAttribute("event_id",x.id),e._waiAria.weekAgendaEvent(b,x),g.appendChild(b)}u=e.date.add(u,1,"day"),v=e.date.add(v,1,"day")}};e.week_agenda_view=function(t){e._min_date=e.date.week_start(e._date),e._max_date=e.date.add(e._min_date,1,"week"),e.set_sizes(),t?(e._table_view=e._allow_dnd=!0,void 0===e._wa._prev_data_border&&(e._wa._prev_data_border=e._els.dhx_cal_data[0].style.borderTopWidth),
e._els.dhx_cal_data[0].style.borderTopWidth=0,e._els.dhx_cal_data[0].style.overflowY="hidden",e._els.dhx_cal_date[0].innerHTML="",e._els.dhx_cal_data[0].style.top=parseInt(e._els.dhx_cal_data[0].style.top)-20-1+"px",e._els.dhx_cal_data[0].style.height=parseInt(e._els.dhx_cal_data[0].style.height)+20+1+"px",e._els.dhx_cal_header[0].style.display="none",i()):(e._table_view=e._allow_dnd=!1,void 0!==e._wa._prev_data_border&&(e._els.dhx_cal_data[0].style.borderTopWidth=e._wa._prev_data_border,delete e._wa._prev_data_border),
e._els.dhx_cal_data[0].style.overflowY="auto",e._els.dhx_cal_data[0].style.top=parseInt(e._els.dhx_cal_data[0].style.top)+20+"px",e._els.dhx_cal_data[0].style.height=parseInt(e._els.dhx_cal_data[0].style.height)-20+"px",e._els.dhx_cal_header[0].style.display="block")},e.mouse_week_agenda=function(t){for(var a,i=t.ev,n=i.srcElement||i.target;n.parentNode;)n._date&&(a=n._date),n=n.parentNode;if(!a)return t;t.x=0;var r=a.valueOf()-e._min_date.valueOf();if(t.y=Math.ceil(r/6e4/this.config.time_step),"move"==this._drag_mode&&this._drag_pos&&this._is_pos_changed(this._drag_pos,t)){
var s;this._drag_event._dhx_changed=!0,this._select_id=this._drag_id;for(var o=0;o<e._rendered.length;o++)e._drag_id==this._rendered[o].getAttribute("event_id")&&(s=this._rendered[o]);if(!e._wa._dnd){var d=s.cloneNode(!0);this._wa._dnd=d,d.className=s.className,d.id="dhx_wa_dnd",d.className+=" dhx_wa_dnd",document.body.appendChild(d)}var _=document.getElementById("dhx_wa_dnd");_.style.top=(i.pageY||i.clientY)+20+"px",_.style.left=(i.pageX||i.clientX)+20+"px"}return t},e.attachEvent("onBeforeEventChanged",function(t,a,i){
if("week_agenda"==this._mode&&"move"==this._drag_mode){var n=document.getElementById("dhx_wa_dnd");n.parentNode.removeChild(n),e._wa._dnd=!1}return!0}),e.attachEvent("onEventSave",function(e,t,a){return a&&"week_agenda"==this._mode&&(this._select_id=e),!0}),e._wa._selected_divs=[],e.attachEvent("onClick",function(t,a){if("week_agenda"==this._mode&&(e.config.week_agenda_select||void 0===e.config.week_agenda_select)){if(e._wa._selected_divs)for(var i=0;i<this._wa._selected_divs.length;i++){var n=this._wa._selected_divs[i];
n.className=n.className.replace(/ dhx_cal_event_selected/,"")}return this.for_rendered(t,function(t){t.className+=" dhx_cal_event_selected",e._wa._selected_divs.push(t)}),e._select_id=t,!1}return!0})})});