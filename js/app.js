var Calculadora = {

  init: (function(){
		this.asignarEventosFormatoBotones(".tecla")
	}),

  //==== Eventos de formato de botones ====//
  asignarEventosFormatoBotones: function(selector){
    var x = document.querySelectorAll(selector);
    for (var i = 0; i<x.length;i++) {
      x[i].onclick = this.eventoReduceBoton;
      x[i].onmouseleave = this.eventoVuelveBoton;
    };
  },

  eventoReduceBoton: function(event){
    Calculadora.ReduceBoton(event.target);
  },

  eventoVuelveBoton: function(event){
    Calculadora.AumentaBoton(event.target);
  },

  //==== Formato de botones ====//

  ReduceBoton: function(elemento){
    var x = elemento.id;
    if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
      elemento.style.padding = "3px";
    } else if(x=="mas") {
      elemento.style.padding = "1.5px";
    } else {
      elemento.style.padding = "2.5px";
    }
  },

  AumentaBoton: function(elemento){
    var x = elemento.id;
    if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
      elemento.style.padding = "0px";
    } else if(x=="mas") {
      elemento.style.padding = "0px";
    } else {
      elemento.style.padding = "0px";
    }
  },
  //---Fin evento de formato de botones
}

Calculadora.init();
