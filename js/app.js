var Calculadora = {
  Pantalla: document.getElementById("display"),
	valorPantalla: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false, //==== Para permitir ingreso consecutivo ====//

  init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
    this.asignarEventosaFuncion();
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
  //==== Fin evento de formato de botones ====//
  //==== Eventos de función de Calculadora ====//
  asignarEventosaFuncion: function(){
    document.getElementById("0").addEventListener("click", function() {Calculadora.IntroNumero("0");});
    document.getElementById("1").addEventListener("click", function() {Calculadora.IntroNumero("1");});
    document.getElementById("2").addEventListener("click", function() {Calculadora.IntroNumero("2");});
    document.getElementById("3").addEventListener("click", function() {Calculadora.IntroNumero("3");});
    document.getElementById("4").addEventListener("click", function() {Calculadora.IntroNumero("4");});
    document.getElementById("5").addEventListener("click", function() {Calculadora.IntroNumero("5");});
    document.getElementById("6").addEventListener("click", function() {Calculadora.IntroNumero("6");});
    document.getElementById("7").addEventListener("click", function() {Calculadora.IntroNumero("7");});
    document.getElementById("8").addEventListener("click", function() {Calculadora.IntroNumero("8");});
    document.getElementById("9").addEventListener("click", function() {Calculadora.IntroNumero("9");});
    document.getElementById("on").addEventListener("click", function() {Calculadora.borrarPantalla();});
    document.getElementById("sign").addEventListener("click", function() {Calculadora.cambiarSigno();});
    document.getElementById("punto").addEventListener("click", function() {Calculadora.IntroDecimal();});
    document.getElementById("igual").addEventListener("click", function() {Calculadora.verResultado();});
    document.getElementById("raiz").addEventListener("click", function() {Calculadora.IntroOperacion("raiz");});
    document.getElementById("dividido").addEventListener("click", function() {Calculadora.IntroOperacion("/");});
    document.getElementById("por").addEventListener("click", function() {Calculadora.IntroOperacion("*");});
    document.getElementById("menos").addEventListener("click", function() {Calculadora.IntroOperacion("-");});
    document.getElementById("mas").addEventListener("click", function() {Calculadora.IntroOperacion("+");});
  },
  //==== Fin eventos de función Calculadora ====//
  //==== Funcion de teclas de Calculadora ====//
	borrarPantalla: function(){
	  this.valorPantalla = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.ActualizaPantalla();
	},
	cambiarSigno: function(){
		if (this.valorPantalla !="0") {
			var aux;
			if (this.valorPantalla.charAt(0)=="-") {
				aux = this.valorPantalla.slice(1);
			}	else {
				aux = "-" + this.valorPantalla;
			}
		this.valorPantalla = "";
		this.valorPantalla = aux;
		this.ActualizaPantalla();
		}
	},
	IntroDecimal: function(){
		if (this.valorPantalla.indexOf(".")== -1) {
			if (this.valorPantalla == ""){
				this.valorPantalla = this.valorPantalla + "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
			}
			this.ActualizaPantalla();
		}
	},
	IntroNumero: function(valor){
		if (this.valorPantalla.length < 8) {
			if (this.valorPantalla=="0") {
				this.valorPantalla = "";
				this.valorPantalla = this.valorPantalla + valor;
			} else {
				this.valorPantalla = this.valorPantalla + valor;
			}
		this.ActualizaPantalla();
		}
	},
	IntroOperacion: function(oper){
		this.primerValor = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.ActualizaPantalla();
	},
	verResultado: function(){ // TECLA IGUAL //
		if(!this.auxTeclaIgual){ // Primer vez que presiono igual //
			this.segundoValor = parseFloat(this.valorPantalla);
			this.ultimoValor = this.segundoValor;
      // Calculo el resultado //
      this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
    } else { //Siguientes veces que presiono igual //
      // Calculo el resultado //
    	this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
    }
    //Almaceno el resultado como primer valor para poder seguir operando //
		  this.primerValor = this.resultado;
		// Borro la Pantalla y lo reemplazo por el resultado //
		  this.valorPantalla = "";
		//verifico el largo del resultado para recortarlo si hace falta //
		if (this.resultado.toString().length < 9){
			this.valorPantalla = this.resultado.toString();
		} else {
			this.valorPantalla = this.resultado.toString().slice(0,8);
		}
		//Auxiliar para indicar si ya se presionó la tecla igual, para calcular sobre el último valor //
		this.auxTeclaIgual = true;
		this.ActualizaPantalla();
	},
  realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-":
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*":
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/":
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},
	ActualizaPantalla: function(){
		this.Pantalla.innerHTML = this.valorPantalla;
	}
};

Calculadora.init();
