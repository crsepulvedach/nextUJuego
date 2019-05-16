window.onload = function() {



    // Timing and frames per second
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;
    var i=0;
    var score=0;
    var lencolum=["","","","","","",""];
    var lenrest=["","","","","","",""];
    var mov=0;
    var nuevosDulces=0;
    var tiempo=0;
    var min=2;
    var seg=0;



  var caramelos = ["image\\1.png", "image\\2.png",
                   "image\\3.png", "image\\4.png"];




  function titulo(){
    $(".main-titulo").animate({color: '#E4D8B8'},1000);
    $(".main-titulo").animate({color: '#DCFF0E'},1000);
  };




// Initialize the game
  function init() {
    // Initialize the two-dimensional tile array
    min=2;
    seg=0;
    score=0;
    mov=0;
    buscarNuevosDulces=0;
    $(".elemento").remove();

    for(var j=1;j<8;j++){
      $(".col-"+j).children("img").detach();
    }

    $('.title-fin').remove();
    $(".btn-reinicio").text("Reiniciar");
    $(".panel-score").css("width","25%");
    $("#score-text").html("0");
  	$("#movimientos-text").html("0");
    $(".panel-tablero").show();
    $(".time").show();
  };

  function blink_text(seleccion) {
    $(seleccion).fadeOut(1500);
    $(seleccion).fadeIn(1500);
  //  $(seleccion).css("background-color",'transparent;');
    $(seleccion).fadeOut(1500);
    $(seleccion).fadeIn(1500);
    //$(seleccion).hide();
    $(seleccion).css("background-color",'burlywood');
}





//--------------------------------------------------
function movimiento(){
	i=i+1
	var numero=0;
	var imagen=0;
	$(".elemento").draggable({disabled:true});
	if(i<8){
		for(var j=1;j<8;j++){
			if($(".col-"+j).children("img:nth-child("+i+")").html()==null){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
			}
    }
  }
	if(i==8){
	clearInterval(intervalo);
	eliminar=setInterval(function(){
		eliminarDulce()
	},150);}
};

  function newCandy(){
  	$(".elemento").draggable({disabled:true});
  	$("div[class^='col']").css("justify-content","flex-start")
  	for(var j=1;j<8;j++){
  		lencolum[j-1]=$(".col-"+j).children().length;}
  	if(buscarNuevosDulces==0){
  		for(var j=0;j<7;j++){
  			lenrest[j]=(7-lencolum[j]);}
  		maximo=Math.max.apply(null,lenrest);
  		contadorTotal=maximo;}
  	if(maximo!=0){
  		if(buscarNuevosDulces==1){
  			for(var j=1;j<8;j++){
  				if(contadorTotal>(maximo-lenrest[j-1])){
  					$(".col-"+j).children("img:nth-child("+(lenrest[j-1])+")").remove("img");}}
  		}
  		if(buscarNuevosDulces==0){
  			buscarNuevosDulces=1;
  			for(var k=1;k<8;k++){
  				for(var j=0;j<(lenrest[k-1]-1);j++){
  					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
  		}
  		for(var j=1;j<8;j++){
  			if(contadorTotal>(maximo-lenrest[j-1])){
  				numero=Math.floor(Math.random()*4)+1;
  				imagen="image/"+numero+".png";
  				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");}
  		}
  	}
  	if(contadorTotal==1){
      clearInterval(nuevosDulces);
  		eliminar=setInterval(function(){
  			eliminarDulce()
  		},150);
  	}
  	contadorTotal=contadorTotal-1;
  };

  //---------------Función para eliminar los Dulces--------------------------
  function eliminarDulce(){
  	matriz=0;
  	busquedaHorizontal=row();
  	busquedaVertical=columna();
  	for(var j=1;j<8;j++){
  		matriz=matriz+$(".col-"+j).children().length;}

  	if(busquedaHorizontal==0 && busquedaVertical==0 && matriz!=49){
  		clearInterval(eliminar);
  		buscarNuevosDulces=0;
  		nuevosDulces=setInterval(function(){
  			newCandy()
  		},200);
    }

  	if(busquedaHorizontal==1||busquedaVertical==1){
  		$(".elemento").draggable({disabled:true});
  		$("div[class^='col']").css("justify-content","flex-end");
  	  $(".activo").hide("pulsate",1000,function(){
      //$(".activo").effect("buscarNuevosDulces",{},600,function(){
  			var scoretmp=$(".activo").length;
  			$(".activo").remove("img");
        //Cambiamos la puntuación
  			score=score+scoretmp*10;
  			$("#score-text").html(score);
  		});
  	}
  	if(busquedaHorizontal==0 && busquedaVertical==0 && matriz==49){
        $(".elemento").draggable({
  			disabled:false,
  			containment:".panel-tablero",
  			revert:true,
  			revertDuration:0,
  			snap:".elemento",
  			snapMode:"inner",
  			snapTolerance:40,
  			start:function(event,ui){
  				mov=mov+1;
  				$("#movimientos-text").html(mov);}
  		});
  	};
  	$(".elemento").droppable({
  		drop:function (event,ui){
  			var dropped=ui.draggable;
  			var droppedOn=this;
  			espera=0;
  			do{
  				espera=dropped.swap($(droppedOn));}
  			while(espera==0);
  			busquedaHorizontal=row();
  			busquedaVertical=columna();
  			if(busquedaHorizontal==0 && busquedaVertical==0){
  				dropped.swap($(droppedOn));}
  			if(busquedaHorizontal==1 || busquedaVertical==1){
  				clearInterval(nuevosDulces);
  				clearInterval(eliminar);
  				eliminar=setInterval(function(){
  					eliminarDulce()
  				},150);}},
  	});
  };

  //----------Función para la busqueda horizontal de dulces----------------------------
  function row(){
  	var busHori=0;
  	for(var j=1;j<8;j++){
  		for(var k=1;k<6;k++){
  			var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
  			var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
  			var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
  			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
  				$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
  				$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
  				$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
  				busHori=1;
  			}
  		}
  	}
  	return busHori;
  };

  //----------Función para la busqueda vertical de dulces------------------------------
  function columna(){
  	var busVerti=0;
  	for(var l=1;l<6;l++){
  		for(var k=1;k<8;k++){
  			var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src");
  			var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src");
  			var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src");
  			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
  				$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo");
  				$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo");
  				$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo");
  				busVerti=1;
  			}
  		}
  	}
  	return busVerti;
  };

  function tablero(){

    clearInterval(intervalo);
    clearInterval(tiempo);
    $(".panel-tablero").hide(1800);
    $(".time").hide(1800);
    $(".panel-score").animate({width:"100%"});
    $(".panel-score").prepend("<h2 style='text-align: center;' class='data-titulo title-fin'>Fin del Juego</h2>")
  }

  function run_clock(){

    if(seg!=0){
      seg=seg-1;
    }
    else{
      if(seg==0){
        if(min==0){
          tablero();
        }
        seg=59;
        min=min-1;
      }
    }
  	$("#timer").html("0"+min+":"+seg);
  }

  //---------Función para intercambiar dulces-------------------------------------
  jQuery.fn.swap=function(b){
  	b=jQuery(b)[0];
  	var a=this[0];
  	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
  	b.parentNode.insertBefore(a,b);
  	t.parentNode.insertBefore(b,t);
  	t.parentNode.removeChild(t);
  	return this;
  };
//--------------------------------------------------


//Evento reiniciar el juego al presionar el botón
  $(".btn-reinicio").on("click", function(){
    init();
    clearInterval(tiempo);
    intervalo=setInterval(function(){
  		movimiento()
  	},300);
    tiempo=setInterval(function(){
  		run_clock();
  	},1000);
    setInterval(titulo, 500);
  });
}
