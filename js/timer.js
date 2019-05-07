

/*
function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){alert('timer completed')}

  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
*/

// 10 minutes from now
//var time_in_minutes = 2;
//var current_time = Date.parse(new Date());
//var deadline = new Date(current_time + time_in_minutes*60*1000);
function tablero(){
  $(".panel-tablero").hide(1800);
  $(".time").hide(1800);
  $(".panel-score").animate({width:"100%"});
  $(".panel-score").prepend("<h2 style='text-align: center;' class='data-titulo title-fin'>Fin del Juego</h2>")
}

function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clock(id){
  var time_in_minutes = 2;
  var current_time = Date.parse(new Date());
  var endtime = new Date(current_time + time_in_minutes*60*1000);

	var clock = document.getElementById(id);
	function update_clock(){
		var t = time_remaining(endtime);
		clock.innerHTML = t.minutes+':'+t.seconds;
		if(t.total<=0){ clearInterval(timeinterval);tablero(); }
	}
	update_clock(); // run function once at first to avoid delay
	var timeinterval = setInterval(update_clock,1000);
}
//run_clock('clockdiv',deadline);
