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

  function cuentaatras(){
    $('#timer').countdown({until: +300});
  }

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

init();

//setInterval(mostrarHora, 1000); // la función "mostrarHora" se ejecuta cada segundo
setInterval(titulo, 1500);
setInterval(cuentaatras, 1000)
}
