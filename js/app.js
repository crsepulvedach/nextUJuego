window.onload = function() {



    // Timing and frames per second
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;

    // Mouse dragging
    var drag = false;
// Level object
  var level = {
      x: 250,         // X position
      y: 113,         // Y position
      columns: 7,     // Number of tile columns
      rows: 7,        // Number of tile rows
      tilewidth: 40,  // Visual width of a tile
      tileheight: 40, // Visual height of a tile
      tiles: [],      // The two-dimensional tile array
      selectedtile: { selected: false, column: 0, row: 0 }
  };


  var caramelos = ["image\\1.png", "image\\2.png",
                   "image\\3.png", "image\\4.png"];

  var columnas = $(".panel-tablero div");


  function titulo(){
    $(".main-titulo").animate({color: '#E4D8B8'},1000);
    $(".main-titulo").animate({color: '#DCFF0E'},1000);
  };



  function mostrarHora() {
    var fecha = new Date(), // nuevo objeto Fecha
        hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $('.data-info2').text(hora);
  }



// Initialize the game
  function init() {
    // Initialize the two-dimensional tile array


    for (var i = 0; i < columnas.length; i++) {
      for (var j = 0; j < 7; j++) {
        var img = Math.floor(Math.random() * (4 - 1 + 1));
        $(columnas[i]).append("<img src='" + caramelos[img] +
          "' class='elemento' width='100px' height='100px'>");
      }
    }
  }

  function tablero(){
    $(".panel-tablero").hide(1800);
    $(".time").hide(1800);
    $(".panel-score").animate({width:"100%"});
    $(".panel-score").prepend("<h2 style='text-align: center;' class='data-titulo title-fin'>Fin del Juego</h2>")
  }

  //Animación que mueve el balón de futbol
 function shoot(elemento, posV, posH){
   $(elemento)
   .animate(
     {
       top: posV,
       left: posH
     },{
       queue: false
     },800)
   .animate(
     {
       width: "-=70"
     },
     {
       step: function(now, fx){
         $(elemento).css("transform","rotate("+now*10+"deg)");
       },
       queue: false,
       duration: 1800,
       complete: function(){

         var x= parseFloat(posH);
         var y= parseFloat(posV);
         var centro = parseFloat($("#arquero").css("left"))+235;
         //Validaciones si pega en los palos
           if ((x>=979&&x<=1009)&&(y>=88)) {
             rebote(elemento,"derecha");
           }else if ((y<=88&&y>=50)&&(x>=450)) {
             rebote(elemento, "arriba");
           }else if ((x>=454&&x<=486)&&(y>=88)) {
             rebote(elemento, "izquierda");
           }else if ((x<454||x>1009)||(y<55||y>409)) { //Validación si va por fuera
             rebote(elemento, "lejos");
           }else if(((x>(centro-55))&&(x<(centro+23)))&&(y>154&&y<236)){ //Validaciones si pega en el arquero
             rebote(elemento, "arriba");
           }else if(((x>(centro-128))&&(x<(centro+95)))&&(y>280&&y<362)){
             rebote(elemento, "arriba");
           }else if(((x>(centro-185))&&(x<(centro+143)))&&(y>226&&y<280)){
             rebote(elemento, "arriba");
           }else if(((x>(centro-122))&&(x<(centro-88)))&&(y>362&&y<432)){
             rebote(elemento, "izquierda");
           }else if (((x>(centro+63))&&(x<(centro+97)))&&(y>362&&y<432)) {
             rebote(elemento, "derecha");
           }else{
             $(elemento).css("zIndex","3"); //Si no sucede nada de lo anterior se indica que se marco el Gol
             $("#arquero").css("zIndex","4");
             golScored(elemento);
           }
       }
     }
   )
 }

  //tablero();
  //shoot($(".panel-tablero"), 100, 200);
//Evento reiniciar el juego al presionar el botón
  $(".btn-reinicio").on("click", function(){
    init();
    //startTimer();
    run_clock('timer');
  });
//  shoot($("panel-tablero"), 400, 300);
//init();

//setInterval(mostrarHora, 1000); // la función "mostrarHora" se ejecuta cada segundo
setInterval(titulo, 1500);

}
