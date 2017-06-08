/* 
	   @licstart  The following is the entire license notice for this page.

        Copyright (C) 2015  Carlos J. Costa

        The JavaScript code in this page is free software: you can
        redistribute it and/or modify it under the terms of the GNU
        General Public License (GNU GPL) as published by the Free Software
        Foundation, either version 3 of the License, or (at your option)
        any later version.  The code is distributed WITHOUT ANY WARRANTY;
        without even the implied warranty of MERCHANTABILITY or FITNESS
        FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

        As additional permission under GNU GPL version 3 section 7, you
        may distribute non-source (e.g., minimized or compacted) forms of
        that code without the copy of the GNU GPL normally required by
        section 4, provided you include this license notice and a URL
        through which recipients can access the Corresponding Source.   


        @licend  The above is the entire license notice
        for the JavaScript code in this page.
*/

/*
Declaração de variváveis:
MaxHeight : altura máxia
MaxWidth : largura máxima
YPos : posição em Y
XPos : posição em X
interval1 : movimento para baixo de 50 em 50 milisegundos
interval2 : movimento para direito de 50 em 50 milisegundos
interval3 : movimento para cima de 50 em 50 milisegundos
interval4 : movimento para esquerdo de 50 em 50 milisegundos
moveTo, 
tesX : posição X do tesouro
tesY : posição Y do tesouro
keyX : posição X da chave
keyY : posição Y da chave
temChave: variavel para gravar se tem chave ou não
distancia: distancia em metros quadrados do tesouro
moedas: matrix com a posição X, Y de uma moeda + estado da moeda (se foi apanhada ou não)
nMoedas: número de moedas apanhadas
*/
var MaxHeight, MaxWidth, YPos, XPos, interval1, interval2, interval3, interval4, moveTo, tesX, tesY, keyX, keyY, temChave, distancia, moedas, nMoedas;

/*
Inicia o estado inicial do jogo:
posição X e posição Y do pinguin
atribui as coordenadas do tesouro
atribui as coordenadas da chave
atribui as coordenadas das moeda
inicia a musica de fundo
inicia a variavel que controla se apanhou a chave do tesouro a false -> não apanhou
inicia numero de moedas apanhadas a zero
mostra as coordenadas do pinguin
*/
function init(){
	YPos = -500;
	XPos = -500;
	toMove = document.getElementById("scroller");
	atribuiCoordenadasTesouro();
	atribuiCoordenadasChave();
	atribuiCoordenadasMoedas();
	playMusicaFundo();
	temChave=false;
	nMoedas=0;
	toMove.style.backgroundPosition = XPos + "px "+YPos + "px";
};

/*
Toca a musica de fundo
*/
function playMusicaFundo() {
	var myAudio = document.getElementById("myAudio");
	if (myAudio.paused) 
		myAudio.play();
};

/*
Toca a musica de apanhar uma moeda
*/
function playCoin() {
	var myAudio = document.getElementById("myAudioCoin");
	if (myAudio.paused) 
		myAudio.play();
};
	
/*
Pára a musica de fundo
*/
function stopMusicaFundo() {
	var myAudio = document.getElementById("myAudio");
	if (!myAudio.paused) {
		myAudio.pause();
	}
};
	
/*
Atribui as coordendas do tesouro 
*/
function atribuiCoordenadasTesouro()
{
	tesX = -400;
	tesY = -200;
};

/*
Atribui as coordendas da chave 
*/
function atribuiCoordenadasChave()
{
	keyX = -200;
	keyY = -300;
};

/*
Atribui as coordendas das moedas 
EX: [-350, -350,false] -> posX, posY, Estado: Se não apanhou = false; Se apanhou  = true;
*/
function atribuiCoordenadasMoedas()
{
	moedas = [
		[-350, -350,false],
		[-450, -450,false],
		[-150, -150,false],
		[-50, -50,false],
		[-250, -250,false]
	  ];	
};

/*
Apanha a chave, caso esteja 8 unidades perto da mesma 
*/
function apanhaChave()
{
	if( ( (keyX >= (XPos - 8 )) && (keyX <= (XPos + 8 )) )  &&  ( (keyY >= (YPos - 8 )) && (keyY <= (YPos + 8 )) ) && !temChave)
	{
		temChave=true;
		alert("Encontraste uma chave....")
	}
};

/*
Caso tenha a chave, ganha o jogo

Caso não tenha a chave, aconselha o jogador a procurar algo para abrir o cofre(tesouro)
*/
function abreCofre()
{
	if( ( (tesX >= (XPos - 10 )) && (tesX <= (XPos + 10 )) )  &&  ( (tesY >= (YPos - 10 )) && (tesY <= (YPos + 10 )) ) && !temChave)
	{
		alert("Precisas de algo para abrir o cofre...");
	}
	if( ( (tesX >= (XPos - 10 )) && (tesX <= (XPos + 10 )) )  &&  ( (tesY >= (YPos - 10 )) && (tesY <= (YPos + 10 )) ) && temChave)
	{
		alert("!!!!!");
		alert("Ganhaste o jogo! :D");
		init();
	}
};

/*
Caso esteja perto de uma moeda (10 unidades), apanha-a e toca a musica de apanhar moeda
*/
function apanhaMoeda()
{
	for(var i=0; i<moedas.length; i++)
	{
		if( ( (moedas[i][0] >= (XPos - 10 )) && (moedas[i][0] <= (XPos + 10 )) )  &&  ( (moedas[i][1] >= (YPos - 10 )) && (moedas[i][1] <= (YPos + 10 ))) && !moedas[i][2])
		{
			moedas[i][2] = true;
			nMoedas++;
			playCoin();
		}
	}	
}

/*
Valida se mostra o tesouro no ecrã.
Só mostra se estive 10 unidades perto das coordenadas definidas do tesouro
*/
function validaSeMostraTesouro()
{
	if( ( (tesX >= (XPos - 10 )) && (tesX <= (XPos + 10 )) )  &&  ( (tesY >= (YPos - 10 )) && (tesY <= (YPos + 10 )) ) )
	{
		document.getElementById("treasure").style="display:inherit; position: absolute; background: url('treasure.gif') no-repeat; top:"+(10)+"px" + "left:"+(10)+"px";
	}
	else
	{
		document.getElementById("treasure").style="display:none;";
	}
};

/*
Valida se mostra a chave no ecrã.
Só mostra se estive 10 unidades perto das coordenadas definidas da chave
*/
function validaSeMostraChave()
{
	if( ( (keyX >= (XPos - 10 )) && (keyX <= (XPos + 10 )) )  &&  ( (keyY >= (YPos - 10 )) && (keyY <= (YPos + 10 )) ) && !temChave)
	{
		document.getElementById("key").style="display:inherit; position: absolute; background: url('key.png') no-repeat; top:"+(10)+"px" + "left:"+(10)+"px";
	}
	else
	{
		document.getElementById("key").style="display:none;";
	}
};

/*
Valida se mostra alguma moeda no ecrã.
Só mostra se estive 10 unidades perto das coordenadas definidas da chave
*/
function validaSeMostraMoedas()
{
	var mostraMoeda = false;
	for(var i=0; i<moedas.length; i++)
	{
		if( ( (moedas[i][0] >= (XPos - 10 )) && (moedas[i][0] <= (XPos + 10 )) )  &&  ( (moedas[i][1] >= (YPos - 10 )) && (moedas[i][1] <= (YPos + 10 ))) && !moedas[i][2])
		{
			document.getElementById("coin").style="display:inherit; position: absolute; background: url('moeda.png') no-repeat; top:"+(10)+"px" + "left:"+(10)+"px";
			mostraMoeda = true;
		}
	}	
	
	if(!mostraMoeda)
	{
		document.getElementById("coin").style="display:none;";
	}	
};

/*
Calcula distancia do tesouro
*/
function distanciaTesouro()
{
	distancia=Math.sqrt(Math.pow((tesX-XPos),2)+Math.pow((tesY-YPos),2));	
};

/*
Faz um movimento

Valida se mostra as moedas
Valida se mostra a chave
Valida se mostra o tesouro
Valida se ha chave para apanhar
Valida se ha cofre(tesouro) para abrir
Calcular a distancia para o cofre
Apanha moedas (caso esteja ao alcance)
Se sair fora das posições do mapa, o jogo termina;


*/
function move(){
	validaSeMostraMoedas();	
	validaSeMostraChave();
	validaSeMostraTesouro();
	apanhaChave();
	abreCofre();
	distanciaTesouro();
	apanhaMoeda();
	
	if ((YPos >= 0)||(YPos <= -700)||(XPos >= 0)||(XPos >= MaxHeight)) {
	    stop();
		stopMusicaFundo();
	}

	toMove = document.getElementById("scroller");
	toMove.style.backgroundPosition = XPos + "px "+YPos + "px";
	document.getElementById("pos").innerHTML=toMove.style.backgroundPosition;
	document.getElementById("distanciaTesouro").innerHTML="Distancia do Tesouro: " +Math.round(distancia);
	document.getElementById("nMoedas").innerHTML="Numero de Moedas: "+nMoedas;
};

/*
Movimento para baixo
*/
function moveBx() {
	var myclass = new Array('front-right','front-stand','front-left');
	var n= Math.round(Math.random()*2);
	document.getElementById('character').setAttribute('class',myclass[n]);
	YPos--; 
	move();
};

/*
Movimento para cima
*/
function moveCm() {
	var myclass = new Array('back-right','back-stand','back-left');
	var n= Math.round(Math.random()*2);
	document.getElementById('character').setAttribute('class',myclass[n]);
	YPos++;  	
	move();
};

/*
Movimento para a direita
*/
function moveDir() {	 
	var myclass = new Array('right-right','right-stand','right-left');
	var n= Math.round(Math.random()*2);
	document.getElementById('character').setAttribute('class',myclass[n]);
	XPos--;      
	move();
};

/*
Movimento para a esquerda
*/
function moveEsq() {
	var myclass = new Array('left-right','left-stand','left-left');
	var n= Math.round(Math.random()*2);
	document.getElementById('character').setAttribute('class',myclass[n]);
	XPos++;   
	move();
};

/*
Movimento automatico para baixo
*/
function moveB() {
	stop(); 
	interval1 = setInterval(moveBx, 50);
};

/*
Movimento automatico para cima
*/
function moveC() {
	stop();
	interval3 = setInterval(moveCm, 50);
};

/*
Movimento automatico para a direita
*/
function moveD() {
	stop();	
	interval2 = setInterval(moveDir, 50);
};

/*
Movimento automatico para a esquerda
*/
function moveE() {
	stop();
	interval4 = setInterval(moveEsq, 50);
};

/*
Pára o jogo
*/
function stop() {
	clearInterval(interval1);
	clearInterval(interval2);
	clearInterval(interval3);
	clearInterval(interval4);
	stopMusicaFundo();
};

//inicia o jogo quando a página é carregada
window.onload =init;

/*
Função que detecta quando é carregado uma das 
setas do teclado e faz o movimento respetivo
*/
function Key(e) {
    if (e.keyCode===37) moveEsq();
    if (e.keyCode===38) moveCm();
    if (e.keyCode===39) moveDir();
    if (e.keyCode===40) moveBx();
};
