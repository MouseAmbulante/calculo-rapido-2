"use strict";

// ---------------------- VARIÁVEIS E CONSTS IMPORTANTES ---------------------
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
let dificuldade = 1;

// --------------------------------- ÁUDIOS ----------------------------------

// Iniciar Áudios
	const audio_intro = new Audio();
	audio_intro.src = "./AUDIO/INTRO/intro_cr2.mp3";
    
	const audio_tecla = new Audio();
    audio_tecla.src = "./AUDIO/START SFXs/tecla_pressionada.mp3";
    
	const audio_hover = new Audio();
    audio_hover.src = "./AUDIO/GERAL/som_hover.mp3";

	const audio_hover_reverso = new Audio();
    audio_hover_reverso.src = "./AUDIO/GERAL/som_hover_reverso.mp3";
    
	const audio_opcao1 = new Audio();
    audio_opcao1.src = "./AUDIO/GERAL/seleciona_jogar.mp3";
    
	const audio_classico = new Audio();
    audio_classico.src = "./AUDIO/GERAL/seleciona_classico.mp3";
    
	const audio_botao_jogar = new Audio();
    audio_botao_jogar.src = "./AUDIO/GERAL/seleciona_botao_jogar.mp3";
    
	const audio_dificuldade1 = new Audio();
    audio_dificuldade1.src = "./AUDIO/GERAL/seleciona_iniciante.mp3";
    
	const audio_dificuldade2 = new Audio();
    audio_dificuldade2.src = "./AUDIO/GERAL/seleciona_intermediario.mp3";
    
	const audio_dificuldade3 = new Audio();
    audio_dificuldade3.src = "./AUDIO/GERAL/seleciona_avancado.mp3";
    
	const audio_contagem = new Audio();
    audio_contagem.src = "./AUDIO/GERAL/contagem_regressiva.mp3";
    
    const audioStreak = new Audio();
	audioStreak.src = `./AUDIO/SFX_COMBO/PerdeStreak.mp3`;

	const audio_opcoes = new Audio();
	audio_opcoes.src = "./AUDIO/GERAL/seleciona_opcoes.mp3";

	const audio10X = new Audio();
	const audio1X = new Audio();
	const audio_ajuda = new Audio();

	const slider_geral = document.getElementById("slider_geral");
	const slider_efeitos = document.getElementById("slider_efeitos");
	const slider_ajuda = document.getElementById("slider_ajuda");
	const volume_porcentagem_efeitos = document.getElementById("volume_porcentagem1");
	const volume_porcentagem_geral = document.getElementById("volume_porcentagem2");
	const volume_porcentagem_ajuda = document.getElementById("volume_porcentagem3");
	let volume_geral = 0.3;
	let volume_efeitos = 0.3;
	let volume_ajuda = 0.5;
	
	slider_geral.addEventListener('input', function() {
		volume_porcentagem_geral.textContent = slider_geral.value + "%";
		volume_geral = slider_geral.value / 100;
	})

	slider_geral.addEventListener('mouseup', function() {
		audio10X.src = "./AUDIO/SFX_COMBO/10X.mp3";
		audio10X.volume = volume_geral;
		audio10X.pause();
		audio10X.play();
	})
	
	slider_efeitos.addEventListener('input', function() {
		volume_porcentagem_efeitos.textContent = slider_efeitos.value + "%";
		volume_efeitos = slider_efeitos.value / 100;
	})
	
	let numero_aleatorio_teste;
	slider_efeitos.addEventListener('mouseup', function() {
		numero_aleatorio_teste = Math.floor(Math.random(numero_aleatorio_teste) * 8) + 1;
		audio1X.src = `./AUDIO/SFX_COMBO/1.${numero_aleatorio_teste}x.mp3`;
		audio1X.volume = volume_geral * volume_efeitos;
		audio1X.pause();
		audio1X.play();
	})

	slider_ajuda.addEventListener('input', function() {
		volume_porcentagem_ajuda.textContent = slider_ajuda.value + "%";
		volume_ajuda = slider_ajuda.value / 100;
	})

// --------------------------------- ÁUDIOS ----------------------------------

// ---------------------- VARIÁVEIS E CONSTS IMPORTANTES ---------------------

// ---------------------------- INTRO DO JOGO --------------------------------
const botao_intro = document.getElementById("botao_intro");
const losango = document.getElementById("losango");
const texto_intro = document.getElementById("texto_intro");
const intro_tela = document.getElementById("intro");
const organiza_logo = document.getElementById("organiza_logo");
const body_intro = document.getElementById("body");

let em_intro = false;
let intervalo_intro_som;
let skipou = 0;

botao_intro.onclick = async function () {
    console.log("EM INÍCIO!");
    em_intro = true;
    audio_intro.volume = volume_geral * volume_efeitos;
    audio_intro.play();
    intro_tela.classList.add("intro_animation");
    botao_intro.style.display = "none";
    losango.classList.add("losango_animation")
    texto_intro.classList.add("texto_intro_animation")
    organiza_logo.classList.add("organiza_logo_animation")
    body_intro.style.animation = "body_animacao .25s forwards ease-out";
    body_intro.style.animationDelay = ".5s";
    await sleep(11000);
    skipou++;

    if (skipou < 2) {
        intervalo_intro_som = setInterval(diminui_volume_intro, 50);
    }
}

intro_tela.onclick = function () {
    if (em_intro) {
        skipou++;
        intervalo_intro_som = setInterval(diminui_volume_intro, 50);
        intro_tela.classList.add("intro_animation2");
    }
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 13 && em_intro) {
        skipou++;
        intervalo_intro_som = setInterval(diminui_volume_intro, 50);
        intro_tela.classList.add("intro_animation2");
    }
})

async function diminui_volume_intro() {
    if (audio_intro.volume < 0.01) {
        audio_intro.volume = 0;
        clearInterval(intervalo_intro_som);
        audio_intro.pause();
        pressione_start_tela();

    } else {
        audio_intro.volume -= 0.01;
        console.log(audio_intro.volume);
    }
}

// ---------------------------- INTRO DO JOGO --------------------------------

// ------------------------ PRESSIONE QUALQUER TECLA ------------------------- 

const container_intro = document.getElementById("container_intro");

// 4 Ícones Coloridos da Tela (+ - x :)
const img_intro1 = document.getElementById("img_intro1");
const img_intro2 = document.getElementById("img_intro2");
const img_intro3 = document.getElementById("img_intro3");
const img_intro4 = document.getElementById("img_intro4");
const pressione_qualquer_tecla = document.getElementById("pressione_qualquer_tecla");
let em_tela_start = false;

// Chama tela de "pressione qualquer tecla"
async function pressione_start_tela() {
    if (em_intro) {
        em_intro = false;
        console.log("EM TELA DE START!");
        container_intro.classList.add("container_intro_animation2");
        container_intro.classList.replace("container_intro_animation2", "container_intro_animation");
        em_tela_start = true;
    }
}

document.addEventListener('keydown', async function () {
    if (em_tela_start) {
        em_tela_start = false;
        pressione_qualquer_tecla.classList.add("pressione_qualquer_tecla_animation2");
        pressione_qualquer_tecla.classList.replace("pressione_qualquer_tecla_animation2", "pressione_qualquer_tecla_animation");
        em_menu = true;
        console.log("EM MENU!")
        audio_tecla.volume = volume_geral * volume_efeitos;
        audio_tecla.play();
        await sleep(500);
        container_intro.classList.replace("container_intro_animation", "container_intro_animation2");
        await sleep(1000);
        requestAnimationFrame(renderiza_menu);
    }
})

// ------------------------ PRESSIONE QUALQUER TECLA -------------------------  

// ------------------------------- TELA DE MENU ------------------------------
const menu_tela = document.getElementById("container_menu");
const menu_background = document.querySelector(".background_menu");
const imagens_background_menu = menu_background.querySelectorAll(".background_icones_menu");
const linha_logo = document.getElementById("linha_logo");
const linha_suporte = document.getElementById("linha_suporte");
const barras = document.getElementsByClassName("barras");
const opcoes_html = document.querySelectorAll("div.opcoes");
let em_menu = false;
menu_tela.classList.add("container_menu_pos");

async function renderiza_menu() {
    menu_tela.classList.replace("container_menu_pos", "container_menu_animation");
    linha_logo.classList.add("linha_logo_animation");
    linha_suporte.classList.add("linha_suporte_animation");

    for (let i = 0; i < barras.length; i++) {
        barras[i].classList.add("barras_animation");
        opcoes_html[i].classList.add("opcoes_animation");

    }
}

function audio_hover_funcao() {
    audio_hover.currentTime = 0;
    audio_hover.volume = volume_geral * volume_efeitos;
    audio_hover.play();
}

function audio_hover_reverso_funcao() {
    audio_hover_reverso.currentTime = 0;
    audio_hover_reverso.volume = volume_geral * volume_efeitos;
    audio_hover_reverso.play();
}

const mouse_central_menu = document.getElementById("imagem_centro_menu1");
function anima_opcao1() {
    mouse_central_menu.style.animation = "animacao_mouse 10s linear infinite";
}

function desanima_opcao1() {
    mouse_central_menu.style.animation = "desanima_mouse .6s cubic-bezier(.42,.66,.28,.96) forwards";
}


const engrenagem_central_menu = document.getElementById("imagem_centro_menu2");
function anima_opcao2() {
    engrenagem_central_menu.style.animation = "rotacao linear infinite 1s";
}

function desanima_opcao2() {
    engrenagem_central_menu.style.animation = "para_rotacao cubic-bezier(.42,.66,.28,.96) forwards .5s";
}

const ajuda_central_menu = document.getElementById("imagem_centro_menu3");
const ajuda_central_menu2 = document.getElementById("imagem_centro_menu3_2");
function anima_opcao3() {
    ajuda_central_menu.style.animation = "anima_ajuda 1s infinite ease-out";
    ajuda_central_menu2.style.animation = "anima_ajuda 1s infinite ease-out";
}

function desanima_opcao3() {
    ajuda_central_menu.style.animation = "anima_ajuda .3s forwards ease-out";
    ajuda_central_menu2.style.animation = "desanima_ajuda .3s forwards ease-out";
}

const sobre_central_menu = document.getElementById("imagem_centro_menu4");
function anima_opcao4() {
    sobre_central_menu.style.animation = "anima_ajuda 1s infinite ease-out";
}

function desanima_opcao4() {
    sobre_central_menu.style.animation = "anima_ajuda .3s forwards ease-out";
}

async function voltar() {
    menu_tela.classList.replace("container_menu_animation", "container_menu_pos");
    pressione_qualquer_tecla.classList.replace("pressione_qualquer_tecla_animation", "pressione_qualquer_tecla_animation2");
    await sleep(1500);
    if (em_menu) {
        em_menu = false;
        em_intro = true;
        pressione_start_tela();
    }
}

// ------------------------------- TELA DE MENU ------------------------------

// ------------------------------ MODOS DE JOGO ------------------------------

const container_modos_de_jogo = document.getElementById("container_modos_de_jogo");
let em_modo_jogo = false;

const container_transicao_jogar = document.getElementById("container_transicao_jogar");
const faixas_transicao_jogar = document.querySelectorAll("#faixa1, #faixa2, #faixa3, #faixa4");

function audio_opcao1_funcao() {
    audio_opcao1.volume = volume_geral * volume_efeitos;
    audio_opcao1.currentTime = 0;
    audio_opcao1.play();
}

function audio_seleciona_classico() {
    audio_classico.volume = volume_geral * volume_efeitos;
    audio_classico.currentTime = 0;
    audio_classico.play();
}

// Chama a tela de modos de jogo
async function chama_modo_jogo() {
    audio_opcao1_funcao();
    if (em_menu) {
        em_modo_jogo = true;
        em_menu = false;
        console.log("EM MODOS DE JOGO!");
        container_transicao_jogar.style.display = "flex";
        container_transicao_jogar.style.zIndex = "2";

			for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            	switch (i) {
                	case 0:
                    	faixas_transicao_jogar[0].style.backgroundColor = "#0687ff";
                    	faixas_transicao_jogar[0].style.boxShadow = "0 0 1vh #0687ff";
                    break;

                	case 1:
                    	faixas_transicao_jogar[1].style.backgroundColor = "#004ab9";
                    	faixas_transicao_jogar[1].style.boxShadow = "0 0 1vh #004ab9";
                    break;

                	case 2:
                    	faixas_transicao_jogar[2].style.backgroundColor = "#002f58";
                    	faixas_transicao_jogar[2].style.boxShadow = "0 0 1vh #002f58";
                    break;

                	case 3:
                    	faixas_transicao_jogar[3].style.backgroundColor = "#00213d";
                    	faixas_transicao_jogar[3].style.boxShadow = "0 0 1vh #00213d";
                    break;
           		 }
       		 }

        for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            faixas_transicao_jogar[i].classList.add(`faixa${i + 1}_animacao`);
        }
        menu_tela.classList.replace("container_menu_animation", "container_menu_pos");

        await sleep(1400);
        container_modos_de_jogo.classList.add("container_modos_de_jogo_animacao");
        container_modos_de_jogo.style.display = "block"
        await sleep(1500);
        container_transicao_jogar.style.display = "none";
        container_modos_de_jogo.classList.replace("container_modos_de_jogo_animacao", "container_modos_de_jogo_pos");

        for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            faixas_transicao_jogar[i].classList.replace(`faixa${i + 1}_animacao`, "faixas");
        }
    }

}

// Volta dos modos de jogo para o menu
async function voltar2() {
    em_modo_jogo = false;
    em_menu = true;
    container_transicao_jogar.style.display = "flex";
    container_transicao_jogar.style.zIndex = "2";
    for (let i = 0; i < faixas_transicao_jogar.length; i++) {
        faixas_transicao_jogar[i].classList.add(`faixa${i + 1}_animacao`);
    }

    container_modos_de_jogo.style.animation = "opacidade_sem_display 1.3s ease-in-out forwards, opacidade_exemplo 3s infinite ease-in-out alternate";
    await sleep(1000);

    container_modos_de_jogo.classList.replace("container_modos_de_jogo_pos", "container_modos_de_jogo");
    container_modos_de_jogo.style.display = "none";
    renderiza_menu();
    await sleep(1500);
    container_modos_de_jogo.style.animation = "";
    container_transicao_jogar.style.display = "none";
    for (let i = 0; i < faixas_transicao_jogar.length; i++) {
        faixas_transicao_jogar[i].classList.replace(`faixa${i + 1}_animacao`, "faixas");
    }
}

const container_classico = document.getElementById("modo_classico");
let em_modo_classico = false;

async function renderiza_classico() {
    modo_de_jogo = 1;
    seta_dificuldade(1, 1);
    console.log("EM MODO CLÁSSICO!");
    if (em_modo_jogo) {
        em_modo_jogo = false;
        em_modo_classico = true;

        container_transicao_jogar.style.display = "flex";
        container_transicao_jogar.style.zIndex = "2";

        for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            faixas_transicao_jogar[i].classList.add(`faixa${i + 1}_animacao`);
        }

        container_modos_de_jogo.classList.replace("container_modos_de_jogo_pos", "container_modos_de_jogo");
        container_modos_de_jogo.classList.replace("container_modos_de_jogo", "container_modos_de_jogo_animacao2");
        await sleep(1500);

        container_modos_de_jogo.style.display = "none";
        container_classico.style.display = "flex";
        container_classico.style.animation = "opacidade_display 1s forwards ease-in";

        await sleep(800);
        container_transicao_jogar.style.display = "none";

        for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            faixas_transicao_jogar[i].classList.replace(`faixa${i + 1}_animacao`, "faixas");
        }
    }
}

async function voltar3() {
    if (em_modo_classico) {
        em_modo_classico = false;
        em_modo_jogo = true;
        console.log("EM MODOS DE JOGO!");

        container_transicao_jogar.style.display = "flex";
        container_transicao_jogar.style.zIndex = "2";

        for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            faixas_transicao_jogar[i].classList.add(`faixa${i + 1}_animacao`);
        }

        container_classico.style.animation = "opacidade_sem_display 1s forwards ease-in";


        await sleep(1500);
        container_modos_de_jogo.style.display = "block";
        container_modos_de_jogo.classList.replace("container_modos_de_jogo_animacao2", "container_modos_de_jogo_animacao");

        container_classico.style.display = "none";
        await sleep(1000);
        container_modos_de_jogo.classList.replace("container_modos_de_jogo_animacao", "container_modos_de_jogo_pos");
        container_transicao_jogar.style.display = "none";
    }
}

// FUNÇÕES DE DIFICULDADE 

let milissegundos = 0;
let segundos = 0;
let minutos = 0;
let horas = 0;
let intervalo_tempo;

seta_dificuldade_pratica(1);

function seta_dificuldade_pratica(escolha) {
    const dificuldade_caixa1_pratica = document.getElementById("dificuldade_caixa1_pratica");
    const elementos_dificuldade_caixa1_pratica = dificuldade_caixa1_pratica.querySelectorAll('*');

    const dificuldade_caixa2_pratica = document.getElementById("dificuldade_caixa2_pratica");
    const elementos_dificuldade_caixa2_pratica = dificuldade_caixa2_pratica.querySelectorAll('*');

    const dificuldade_caixa3_pratica = document.getElementById("dificuldade_caixa3_pratica");
    const elementos_dificuldade_caixa3_pratica = dificuldade_caixa3_pratica.querySelectorAll('*');

    switch (escolha) {
        case 1:
            dificuldade = 1;
            minutos = 0;
            dificuldade_caixa1_pratica.style.background = "linear-gradient(to right, #06ba39, #92f96e)";
            dificuldade_caixa1_pratica.style.boxShadow = "0 0 .2vh .5vh #ffffffff";

            for (let i = 0; i < 3; i++) {
                elementos_dificuldade_caixa1_pratica[i].style.color = "#003810ff";
                elementos_dificuldade_caixa1_pratica[i].style.textShadow = ".2vh .2vh .3vh #0f7904ff";
            }

            dificuldade_caixa2_pratica.style.background = "linear-gradient(to right, #93510b, #ffaa00)";
            dificuldade_caixa2_pratica.style.boxShadow = "1vh 0 1vh #785c01";

            for (let i = 0; i < 3; i++) {
                elementos_dificuldade_caixa2_pratica[i].style.color = "#fff388";
                elementos_dificuldade_caixa2_pratica[i].style.textShadow = ".5vh .5vh .6vh #5d3000";
            }

            dificuldade_caixa3_pratica.style.background = "linear-gradient(to right, #760000, #ff0000)";
            dificuldade_caixa3_pratica.style.boxShadow = "1vh 0 1vh #760000";

            for (let i = 0; i < 3; i++) {
                elementos_dificuldade_caixa3_pratica[i].style.color = "#ffaaaa";
                elementos_dificuldade_caixa3_pratica[i].style.textShadow = ".5vh .5vh .6vh #940606";
            }

            break;

        case 2:
            dificuldade = 2;
            minutos = 0;
            dificuldade_caixa2_pratica.style.background = "linear-gradient(to right, #f59f00ff, #f9e46eff)";
            dificuldade_caixa2_pratica.style.boxShadow = "0 0 .2vh .5vh #ffffffff";

            for (let i = 0; i < 3; i++) {
                elementos_dificuldade_caixa2_pratica[i].style.color = "#6d5300ff";
                elementos_dificuldade_caixa2_pratica[i].style.textShadow = ".2vh .2vh .3vh #1b15004f";
            }

            dificuldade_caixa1_pratica.style.background = "linear-gradient(to right, #00491c, #06ba39)";
            dificuldade_caixa1_pratica.style.boxShadow = "1vh 0 1vh #00491c";

            for (let i = 0; i < 3; i++) {
                elementos_dificuldade_caixa1_pratica[i].style.color = "#88ffa8";
                elementos_dificuldade_caixa1_pratica[i].style.textShadow = ".5vh .5vh .6vh #053b14";
            }

            dificuldade_caixa3_pratica.style.background = "linear-gradient(to right, #760000, #ff0000)";
            dificuldade_caixa3_pratica.style.boxShadow = "1vh 0 1vh #760000";

            for (let i = 0; i < 3; i++) {
                elementos_dificuldade_caixa3_pratica[i].style.color = "#ffaaaa";
                elementos_dificuldade_caixa3_pratica[i].style.textShadow = ".5vh .5vh .6vh #940606";
            }
            break;

        case 3:
            dificuldade = 3;
            minutos = 0;
            dificuldade_caixa3_pratica.style.background = "linear-gradient(to right, #ff0000ff, #ff3c3cff)";
            dificuldade_caixa3_pratica.style.boxShadow = "0 0 .2vh .5vh #ffffffff";

            for (let i = 0; i < 3; i++) {
                elementos_dificuldade_caixa3_pratica[i].style.color = "#4e0101ff";
                elementos_dificuldade_caixa3_pratica[i].style.textShadow = ".2vh .2vh .3vh #3500008e";
            }

            dificuldade_caixa1_pratica.style.background = "linear-gradient(to right, #00491c, #06ba39)";
            dificuldade_caixa1_pratica.style.boxShadow = "1vh 0 1vh #00491c";

            for (let i = 0; i < 3; i++) {
                elementos_dificuldade_caixa1_pratica[i].style.color = "#88ffa8";
                elementos_dificuldade_caixa1_pratica[i].style.textShadow = ".5vh .5vh .6vh #053b14";
            }

            dificuldade_caixa2_pratica.style.background = "linear-gradient(to right, #93510b, #ffaa00)";
            dificuldade_caixa2_pratica.style.boxShadow = "1vh 0 1vh #785c01";

            for (let i = 0; i < 3; i++) {
                elementos_dificuldade_caixa2_pratica[i].style.color = "#fff388";
                elementos_dificuldade_caixa2_pratica[i].style.textShadow = ".5vh .5vh .6vh #5d3000";
            }
            break;
    }
}

function seta_dificuldade(escolha) {
    const dificuldade_caixa1 = document.getElementById("dificuldade_caixa1");
    const elementos_dificuldade_caixa1 = dificuldade_caixa1.querySelectorAll('*');

    const dificuldade_caixa2 = document.getElementById("dificuldade_caixa2");
    const elementos_dificuldade_caixa2 = dificuldade_caixa2.querySelectorAll('*');

    const dificuldade_caixa3 = document.getElementById("dificuldade_caixa3");
    const elementos_dificuldade_caixa3 = dificuldade_caixa3.querySelectorAll('*');


    if (modo_de_jogo == 1) {
        switch (escolha) {
            case 1:
                dificuldade = 1;
                minutos = 5;
                segundos = 0;
                milissegundos = 0;
                tempo_minuto.textContent = minutos;
                tempo_segundo.textContent = segundos + "0";
                tempo_milissegundo.textContent = milissegundos + "0";
                dificuldade_caixa1.style.background = "linear-gradient(to right, #06ba39, #92f96e)";
                dificuldade_caixa1.style.boxShadow = "0 0 .2vh .5vh #ffffffff";

                for (let i = 0; i < 4; i++) {
                    elementos_dificuldade_caixa1[i].style.color = "#003810ff";
                    elementos_dificuldade_caixa1[i].style.textShadow = ".2vh .2vh .3vh #0f7904ff";
                }

                dificuldade_caixa2.style.background = "linear-gradient(to right, #93510b, #ffaa00)";
                dificuldade_caixa2.style.boxShadow = "1vh 0 1vh #785c01";

                for (let i = 0; i < 4; i++) {
                    elementos_dificuldade_caixa2[i].style.color = "#fff388";
                    elementos_dificuldade_caixa2[i].style.textShadow = ".5vh .5vh .6vh #5d3000";
                }

                dificuldade_caixa3.style.background = "linear-gradient(to right, #760000, #ff0000)";
                dificuldade_caixa3.style.boxShadow = "1vh 0 1vh #760000";

                for (let i = 0; i < 4; i++) {
                    elementos_dificuldade_caixa3[i].style.color = "#ffaaaa";
                    elementos_dificuldade_caixa3[i].style.textShadow = ".5vh .5vh .6vh #940606";
                }

                break;

            case 2:
                dificuldade = 2;
                minutos = 4;
                segundos = 0;
                milissegundos = 0;
                tempo_minuto.textContent = minutos;
                tempo_segundo.textContent = segundos + "0";
                tempo_milissegundo.textContent = milissegundos + "0";
                dificuldade_caixa2.style.background = "linear-gradient(to right, #f59f00ff, #f9e46eff)";
                dificuldade_caixa2.style.boxShadow = "0 0 .2vh .5vh #ffffffff";

                for (let i = 0; i < 4; i++) {
                    elementos_dificuldade_caixa2[i].style.color = "#6d5300ff";
                    elementos_dificuldade_caixa2[i].style.textShadow = ".2vh .2vh .3vh #1b15004f";
                }

                dificuldade_caixa1.style.background = "linear-gradient(to right, #00491c, #06ba39)";
                dificuldade_caixa1.style.boxShadow = "1vh 0 1vh #00491c";

                for (let i = 0; i < 4; i++) {
                    elementos_dificuldade_caixa1[i].style.color = "#88ffa8";
                    elementos_dificuldade_caixa1[i].style.textShadow = ".5vh .5vh .6vh #053b14";
                }

                dificuldade_caixa3.style.background = "linear-gradient(to right, #760000, #ff0000)";
                dificuldade_caixa3.style.boxShadow = "1vh 0 1vh #760000";

                for (let i = 0; i < 4; i++) {
                    elementos_dificuldade_caixa3[i].style.color = "#ffaaaa";
                    elementos_dificuldade_caixa3[i].style.textShadow = ".5vh .5vh .6vh #940606";
                }
                break;

            case 3:
                dificuldade = 3;
                minutos = 3;
                segundos = 0;
                milissegundos = 0;
                tempo_minuto.textContent = minutos;
                tempo_segundo.textContent = segundos + "0";
                tempo_milissegundo.textContent = milissegundos + "0";
                dificuldade_caixa3.style.background = "linear-gradient(to right, #ff0000ff, #ff3c3cff)";
                dificuldade_caixa3.style.boxShadow = "0 0 .2vh .5vh #ffffffff";

                for (let i = 0; i < 4; i++) {
                    elementos_dificuldade_caixa3[i].style.color = "#4e0101ff";
                    elementos_dificuldade_caixa3[i].style.textShadow = ".2vh .2vh .3vh #3500008e";
                }

                dificuldade_caixa1.style.background = "linear-gradient(to right, #00491c, #06ba39)";
                dificuldade_caixa1.style.boxShadow = "1vh 0 1vh #00491c";

                for (let i = 0; i < 4; i++) {
                    elementos_dificuldade_caixa1[i].style.color = "#88ffa8";
                    elementos_dificuldade_caixa1[i].style.textShadow = ".5vh .5vh .6vh #053b14";
                }

                dificuldade_caixa2.style.background = "linear-gradient(to right, #93510b, #ffaa00)";
                dificuldade_caixa2.style.boxShadow = "1vh 0 1vh #785c01";

                for (let i = 0; i < 4; i++) {
                    elementos_dificuldade_caixa2[i].style.color = "#fff388";
                    elementos_dificuldade_caixa2[i].style.textShadow = ".5vh .5vh .6vh #5d3000";
                }
                break;
        }
    } else {
        seta_dificuldade_pratica(escolha);
    }
}

// FUNÇÕES DE DIFICULDADE

// ------------------------------ MODOS DE JOGO ------------------------------

// ------------------------------ MODO CLÁSSICO ------------------------------

const jogar_botao = document.getElementById("jogar_botao");
const jogar_botao_pratica = document.getElementById("jogar_botao_pratica");
let botao_jogar_pressionado = false;
let em_contagem = false;

function audio_botao_jogar_func() {
    audio_botao_jogar.currentTime = 0;
    audio_botao_jogar.volume = volume_geral * volume_efeitos;
    audio_botao_jogar.play();
}

const sinal_tempo = document.getElementById("sinal_tempo");
const sinal_tempo2 = document.getElementById("sinal_tempo2");

async function jogar_botao_pressionado() {

    if (!em_contagem) {
        em_contagem = true;
        em_modo_classico = false;

        if (!botao_jogar_pressionado) {
            botao_jogar_pressionado = true;
            jogar_botao.style.animation = "jogar_pressionado .4s ease-out, botao_jogar_animacao .5s infinite ease-in-out, flutua_botao_jogar 3s infinite";
            audio_botao_jogar_func();
            await sleep(400);
            jogar_botao.style.animation = "botao_jogar_animacao .5s infinite ease-in-out, flutua_botao_jogar 3s infinite";
            botao_jogar_pressionado = false;
        }


        if (em_contagem) {
            container_classico.style.animation = "opacidade_sem_display .5s forwards";
            await sleep(500);
            container_classico.style.display = "none";
            seta_dificuldade(dificuldade);
            tempo_minuto.style.display = "inline";
            sinal_tempo.textContent = `'`;
            sinal_tempo2.textContent = `"`;
            sinal_tempo.style.display = "inline";

            if (modo_de_jogo == 1) {
                tempo_minuto.textContent = minutos;
            }
            renderiza_jogo();
        }
    }
}

async function jogar_botao_pressionado2() {

    if (!em_contagem) {
        em_contagem = true;
        em_modo_pratica = false;

        if (!botao_jogar_pressionado) {
            botao_jogar_pressionado = true;
            jogar_botao_pratica.style.animation = "jogar_pressionado .4s ease-out, botao_jogar_animacao2 .5s infinite ease-in-out, flutua_botao_jogar 3s infinite";
            audio_botao_jogar_func();
            await sleep(400)
            jogar_botao_pratica.style.animation = "botao_jogar_animacao2 .5s infinite ease-in-out, flutua_botao_jogar 3s infinite";
            botao_jogar_pressionado = false;
        }


        if (em_contagem) {
            container_pratica.style.animation = "opacidade_sem_display .5s forwards";
            await sleep(500);
            container_pratica.style.display = "none";
            seta_dificuldade(dificuldade);
            tempo_minuto.style.display = "none";
            sinal_tempo.textContent = ":";
            sinal_tempo2.textContent = ":";
            sinal_tempo.style.display = "none";
            renderiza_jogo();
        }
    }
}

// ------------------------------ MODO CLÁSSICO ------------------------------

// ----------------------------------- JOGO ----------------------------------
// Elementos HTML para alterar
const tempo_minuto = document.getElementById("tempo_minuto");
const tempo_segundo = document.getElementById("tempo_segundo");
const tempo_milissegundo = document.getElementById("tempo_milissegundo");

const container_jogo = document.getElementById("container_jogo");
const tela_contagem = document.getElementById("tela_contagem");
const numeros_contagem = document.getElementById("texto_contagem");
const numero1_jogo = document.getElementById("numero1_jogo");
const sinal_jogo = document.getElementById("sinal_jogo");
const numero2_jogo = document.getElementById("numero2_jogo");
const responde_form = document.getElementById("responde_form");
const input_resposta = document.getElementById("input_resposta");
const pontos_partida = document.getElementById("pontos_partida");
const streak_jogo = document.getElementById("streak_jogo");
const streak_jogo_caixa = document.getElementById("streak_jogo_caixa");
const streak_jogo_titulo = document.getElementById("streak_jogo_titulo");
const combo_jogo = document.getElementById("combo_jogo");
const somar_decimal = (a, b) => ((a * 10) + (b * 10)) / 10;
const container_do_calculo = document.getElementById("container_principal_jogo");
const combo_html = document.getElementById("organiza_streak_combo1");
const combo2_html = document.getElementById("organiza_streak_combo2");
const organiza_pontos = document.getElementById("teste12");
const envia_resposta_botao = document.getElementById("envia_resposta_botao");

const tela_jogo = document.getElementById("tela_jogo");

// Variáveis Principais
let em_jogo = false;

let numero1 = 0;
let sinal = "+";
let numero2 = 0;

let limite;
let limite_iniciante = 21;
let limite_intermediario = 41;
let limite_avancado = 61;
let resposta_usuario;

let combo = 0;
let pontos = 0;
let highscore_class = 0;
let highscore_prat = 0;
let streak = 1.0;
let maior_streak = 1;
let precisao = 0;
let acertos = 0;

let animacao_streak1 = true;
let animacao_enviar = true;
let animacao_enviar2 = true;
let animacao_enviar3 = true;

let numero_de_operacoes = 0;

let numero_aleatorio = 0;

seleciona_background();

function seleciona_background() {
    // numero_aleatorio = Math.floor(Math.random() * 10);
    tela_jogo.style.backgroundImage = `url(IMG/jogo/background0.jpg)`;
}

function audio_dificuldade(dificuldade) {
    switch (dificuldade) {
        case 1:
            audio_dificuldade1.currentTime = 0;
            audio_dificuldade1.volume = volume_geral * volume_efeitos;
            audio_dificuldade1.play();
            break;

        case 2:
            audio_dificuldade2.currentTime = 0;
            audio_dificuldade2.volume = volume_geral * volume_efeitos;
            audio_dificuldade2.play();
            break;

        case 3:
            audio_dificuldade3.currentTime = 0;
            audio_dificuldade3.volume = volume_geral * volume_efeitos;
            audio_dificuldade3.play();
            break;
    }
}

async function renderiza_jogo() {
    container_jogo.style.display = "block";
    container_jogo.style.animation = "opacidade_display .5s forwards ease-out";
    container_do_calculo.style.animation = "rotacao_jogo 1.25s cubic-bezier(.15,1.1,.79,1.21), opacidade_display 1s forwards, opacidade_de_cima 1s forwards";
    combo_html.style.animation = "intro_combo_streak1 1s forwards, opacidade_display 1s ease-in-out forwards";
    combo2_html.style.animation = "intro_combo_streak2 1s forwards, opacidade_display 1s ease-in-out forwards";
    organiza_pontos.style.animation = "intro_pontos_jogo 1s ease-in-out forwards, opacidade_display 1s ease-in-out forwards";
    contagem();
}

function contagem_audio() {
    audio_contagem.currentTime = 0;
    audio_contagem.volume = volume_geral * volume_efeitos;
    audio_contagem.play();
}

function teste() {
    console.log ("EM_INTRO = " + em_intro);
    console.log ("EM_TELA_START = " + em_tela_start);
    console.log ("EM_MENU = " + em_menu);
    console.log ("EM_MODO_JOGO = " + em_modo_jogo);
    console.log ("EM_MODO_CLÁSSICO = " + em_modo_classico);
    console.log ("EM_MODO_PRÁTICA = " + em_modo_pratica);
    console.log ("EM_CONTAGEM = " + em_contagem);
    console.log ("EM_JOGO = " + em_jogo);
}

async function contagem() {
    if (em_contagem) {
        teste();
        tela_contagem.style.display = "flex";
        numeros_contagem.style.display = "block";
        numeros_contagem.textContent = "3";
        contagem_audio();
        numeros_contagem.style.animation = "contagem_animacao 1.2s cubic-bezier(.14,.96,.73,.59) infinite";
        await sleep(1200);
        numeros_contagem.textContent = "2";
        await sleep(1200);
        numeros_contagem.textContent = "1";
        await sleep(1200);
        numeros_contagem.style.fontSize = "20vh";
        numeros_contagem.textContent = "VAI!";
        await sleep(1200);
        numeros_contagem.style.animation = "";
        numeros_contagem.style.display = "none";
        tela_contagem.style.animation = "opacidade_sem_display .5s forwards";
        await sleep(500);
        iniciar_jogo();
        tela_contagem.style.display = "none";
        tela_contagem.style.animation = "none";
    }
}
// ----------------------------------- JOGO ----------------------------------

// ---------------------------- TEMPO FUNCIONANDO ----------------------------

// Inicia o jogo
function iniciar_jogo() {
    em_jogo = true;
    if (em_jogo) {
        console.log("EM JOGO!")

        if (modo_de_jogo == 1) {
            intervalo_tempo = setInterval(milissegundos_func, 10);
            gerador_de_operacoes();
            input_resposta.focus();
        } else {
            intervalo_tempo = setInterval(segundos_aumenta, 1000);
            gerador_de_operacoes();
            input_resposta.focus();
        }
    }
}

function milissegundos_func() {
    milissegundos--; // Diminuição dos milissegundos
    if (milissegundos < 0) { // Quando o milissegundo é menor que zero, ele volta para 99
        milissegundos = 99;
        segundos_func(); // Ao resetar o milissegundo, chamamos a função que diminui os segundos
    }

    // Isso evita o display incorreto do tempo, como: 2'00''9 -> 2'00''09
    if (milissegundos < 10) {
        tempo_milissegundo.textContent = "0" + milissegundos;
    } else {
        tempo_milissegundo.textContent = milissegundos;
    }

    // Reseta o tempo quando tudo chegar em zero
    if (minutos == 0 && segundos == 0 && milissegundos == 0) {
        sair_do_jogo();
    }
}

function segundos_func() {
    segundos--;
    if (segundos < 0) { // Quando o segundo é menor que zero, ele volta para 59
        segundos = 59;
        minutos_func(); // Ao resetar o segundo, chamamos a função que diminui os minutos
    }

    // Isso evita o display incorreto do tempo, como: 2'9''59 -> 2'09''59
    if (segundos < 10) {
        tempo_segundo.textContent = "0" + segundos;
    } else {
        tempo_segundo.textContent = segundos;
    }
}

function minutos_func() {
    minutos--;
    tempo_minuto.textContent = minutos;
}

// Reseta os valores para o seu valor inicial
function resetar_jogo() {
    console.log("RESETOU")
	maior_streak = 1;
    numero_de_operacoes = 0;
    acertos = 0;
    em_jogo = false;
    milissegundos = 0;
    segundos = 0;
    minutos = 0;
    numero1 = 0;
    numero2 = 0;
    sinal = "+";
    precisao = 0;
    numero1_jogo.textContent = numero1;
    numero2_jogo.textContent = numero2;
    sinal_jogo.textContent = sinal;
    streak = 1.0;
    combo = 0;
    pontos = 0;
    pontos_partida.textContent = pontos;
    streak_jogo.textContent = streak.toFixed(1) + "X";
    streak_jogo.classList.replace(classe_streak, "combo_numero1");
    classe_streak = "combo_numero1";
    streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero1");
    classe_streak_titulo = "combo_numero1";
    combo_jogo.textContent = "0";
	console.log(modo_de_jogo)
    if (modo_de_jogo == 1) {
        seta_dificuldade(dificuldade, 1);
    } else if (modo_de_jogo == 0) {
        tempo_milissegundo.textContent = "00";
        tempo_segundo.textContent = "00";
        tempo_minuto.textContent = "0";
    }
}

document.addEventListener("keydown", async function (event) {
    if (em_jogo) {
        switch (event.keyCode) {
            case 82:
                if (em_jogo) {
                    em_jogo = false;
                    responde_form.input_resposta.value = "";
                    responde_form.input_resposta.blur();
                    container_jogo.style.animation = "opacidade_sem_display .5s forwards ease-out";
                    clearInterval(intervalo_tempo);
                    await sleep(500);
                    container_jogo.style.animation = "opacidade_display .5s forwards ease-out";
                    resetar_jogo();
                    em_contagem = true;
                    contagem();
                }
                break;

            case 27:
                if (em_jogo) {
                    responde_form.input_resposta.value = "";
                    responde_form.input_resposta.blur();
                    sair_do_jogo();
                }
                break;
        }
    }
})

// ---------------------------- TEMPO FUNCIONANDO ----------------------------

// -------------------------- CONTADOR FUNCIONANDO ---------------------------

function segundos_aumenta() {
    segundos++;

    if (segundos > 59) {
        segundos = 0;
        minutos_aumenta();
    }

    if (segundos < 10) {
        tempo_milissegundo.textContent = "0" + segundos;
    } else {
        tempo_milissegundo.textContent = segundos;
    }

}

function minutos_aumenta() {
    minutos++;

    if (minutos > 59) {
        minutos = 0;
        horas_aumenta();
    }

    if (minutos < 10) {
        tempo_segundo.textContent = "0" + minutos;
    } else {
        tempo_segundo.textContent = minutos;
    }

}

function horas_aumenta() {
    horas++;
    sinal_tempo.style.display = "inline";
    tempo_minuto.style.display = "inline";
    tempo_minuto.textContent = horas;
}


// -------------------------- CONTADOR FUNCIONANDO ---------------------------

// --------------------------- CÁLCULOS ALEATÓRIOS ---------------------------
function gerador_de_operacoes() {
    let sinal_numero = 1;
    sinal_numero = Math.floor(Math.random(sinal_numero) * 4)

    switch (sinal_numero) {
        case 0: sinal = "+"; break;
        case 1: sinal = "-"; break;
        case 2: sinal = "X"; break;
        case 3: sinal = ":"; break;
    }

    switch (dificuldade) {
        case 1:
            numero1 = Math.floor(Math.random(numero1) * limite_iniciante);
            numero2 = Math.floor(Math.random(numero1) * limite_iniciante);
            limite = limite_iniciante;
            break;

        case 2:
            numero1 = Math.floor(Math.random(numero1) * limite_intermediario);
            numero2 = Math.floor(Math.random(numero1) * limite_intermediario);
            limite = limite_intermediario;
            break;

        case 3:
            numero1 = Math.floor(Math.random(numero1) * limite_avancado);
            numero2 = Math.floor(Math.random(numero1) * limite_avancado);
            limite = limite_avancado;
            break;
    }

    if (sinal_numero == 3) {
        encontra_divisao_possivel(limite);
    }

    numero1_jogo.textContent = numero1;
    numero2_jogo.textContent = numero2;
    sinal_jogo.textContent = sinal;
}

function encontra_divisao_possivel() {
    while (numero1 % numero2 != 0) {
        numero1 = Math.floor(Math.random(numero1) * limite);
        numero2 = Math.floor(Math.random(numero1) * limite);
    }
}

async function corrige_resposta(resposta) {
    numero_de_operacoes++;
    resposta_usuario = resposta;
    switch (sinal) {
        case "+":
            if (resposta == numero1 + numero2) {
                combo_sobe();
                pontuacao();
            } else {
                combo_desce();
                streak_desce();
            }
            console.log("OPERAÇÃO: ")
            console.log(numero1 + " + " + numero2 + " = " + (numero1 + numero2));
            break;

        case "-":
            if (resposta == numero1 - numero2) {
                combo_sobe();
                pontuacao();
            } else {
                combo_desce();
                streak_desce();
            }
            console.log("OPERAÇÃO: ")
            console.log(numero1 + " - " + numero2 + " = " + (numero1 - numero2));
            break;

        case "X":
            if (resposta == numero1 * numero2) {
                combo_sobe();
                pontuacao();
            } else {
                combo_desce();
                streak_desce();
            }
            console.log("OPERAÇÃO: ")
            console.log(numero1 + " X " + numero2 + " = " + (numero1 * numero2));
            break;

        case ":":
            if (resposta == numero1 / numero2) {
                combo_sobe();
                pontuacao();
            } else {
                combo_desce();
                streak_desce();
            }
            console.log("OPERAÇÃO: ")
            console.log(numero1 + " : " + numero2 + " = " + (numero1 / numero2));
            break;
    }
}
// --------------------------- CÁLCULOS ALEATÓRIOS ---------------------------

// ----------------------------- ENVIAR RESPOSTAS ----------------------------

responde_form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (isNaN(responde_form.numero.value)) {
        responde_form.numero.value = "";
        input_resposta.placeholder = "INPUT INVÁLIDO";
    }

    else if (responde_form.numero.value == "") {
        input_resposta.placeholder = "CAMPO VAZIO!";
    }

    else if (responde_form.numero.value % 1 != 0) {
        responde_form.numero.value = "";
        input_resposta.placeholder = "INPUT INVÁLIDO";
    }

    else {
        input_resposta.placeholder = "";
        corrige_resposta(responde_form.numero.value);
        responde_form.numero.value = "";
        gerador_de_operacoes();
    }
})
// ----------------------------- ENVIAR RESPOSTAS ----------------------------

// -------------------------------- PONTUAÇÃO --------------------------------

function pontuacao() {
    acertos++;
    switch (dificuldade) {
        case 1:
            pontos += 20 * 1;
            break;
        case 2:
            pontos += 20 * 5;
            break;
        case 3:
            pontos += 20 * 10;
            break;
    }

    streak_sobe();
    pontos += (streak * 10);

    if (modo_de_jogo == 1) {
        pontos > highscore_class ? highscore_class = pontos : 0;
    } else {
        pontos > highscore_prat ? highscore_prat = pontos : 0;
    }

    pontos_partida.textContent = pontos;
}

// -------------------------------- PONTUAÇÃO --------------------------------

// --------------------------------- STREAK ----------------------------------
let animacao_streak_sobe = true;
let classe_streak = "combo_numero1";
let classe_streak_titulo = "combo_numero1";

streak_jogo.classList.add("combo_numero1");
streak_jogo_titulo.classList.add("combo_numero1");

function streak_sobe() {

    if (streak < 10) {
        streak = somar_decimal(streak, 0.1).toFixed(1);
    }

    streak_jogo.textContent = streak + "X";

    streak_cores(Math.floor(streak));

    console.log("STREAK: " + streak);

    if (streak >= maior_streak) {
        maior_streak = streak;
        console.log(maior_streak + ", MAIOR STREAK!");
    }

    else if (streak == 10) {
        maior_streak = 10;
    }

    if (animacao_streak_sobe) {
        animacao_streak_sobe = false;
        streak_jogo_caixa.style.animation = "streak_sobe .2s ease-out";
    } else {
        animacao_streak_sobe = true;
        streak_jogo_caixa.style.animation = "streak_sobe2 .2s ease-out";
    }

    if (streak < 6) {
        audio_streak_menor(streak);
    } else if (streak >= 6 && streak < 10) {
        audio_streak_maior(streak);
    } else {
        audio_streak_10X();
    }

}

function streak_cores(streak) {
    switch (streak) {
        case 1:
            streak_jogo.classList.replace(classe_streak, "combo_numero1");
            classe_streak = "combo_numero1";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero1");
            classe_streak_titulo = "combo_numero1";
            break;

        case 2:
            streak_jogo.classList.replace(classe_streak, "combo_numero2");
            classe_streak = "combo_numero2";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero2");
            classe_streak_titulo = "combo_numero2";
            break;

        case 3:
            streak_jogo.classList.replace(classe_streak, "combo_numero3");
            classe_streak = "combo_numero3";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero3");
            classe_streak_titulo = "combo_numero3";
            break;

        case 4:
            streak_jogo.classList.replace(classe_streak, "combo_numero4");
            classe_streak = "combo_numero4";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero4");
            classe_streak_titulo = "combo_numero4";
            break;

        case 5:
            streak_jogo.classList.replace(classe_streak, "combo_numero5");
            classe_streak = "combo_numero5";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero5");
            classe_streak_titulo = "combo_numero5";
            break;

        case 6:
            streak_jogo.classList.replace(classe_streak, "combo_numero6");
            classe_streak = "combo_numero6";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero6");
            classe_streak_titulo = "combo_numero6";
            break;

        case 7:
            streak_jogo.classList.replace(classe_streak, "combo_numero7");
            classe_streak = "combo_numero7";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero7");
            classe_streak_titulo = "combo_numero7";
            break;

        case 8:
            streak_jogo.classList.replace(classe_streak, "combo_numero8");
            classe_streak = "combo_numero8";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero8");
            classe_streak_titulo = "combo_numero8";
            break;

        case 9:
            streak_jogo.classList.replace(classe_streak, "combo_numero9");
            classe_streak = "combo_numero9";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero9");
            classe_streak_titulo = "combo_numero9";
            break;

        case 10:
            streak_jogo.classList.replace(classe_streak, "combo_numero10");
            classe_streak = "combo_numero10";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero10");
            classe_streak_titulo = "combo_numero10";
            break;

        default:
            streak_jogo.classList.replace(classe_streak, "combo_numero1");
            classe_streak = "combo_numero1";

            streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero1");
            classe_streak_titulo = "combo_numero1";
            break;
    }
}

async function streak_desce() {
    streak = 1.0;
    streak_jogo.textContent = streak.toFixed(1) + "X";

    audioStreak.volume = volume_geral * volume_efeitos;
    audioStreak.pause();
    audioStreak.currentTime = 0;
    audioStreak.play();

    if (animacao_streak1) {
        animacao_streak1 = false;
        streak_jogo.classList.replace(classe_streak, "combo_numero_errou");
        classe_streak = "combo_numero_errou";
        streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero_errou");
        classe_streak_titulo = "combo_numero_errou";
    } else {
        animacao_streak1 = true;
        streak_jogo.classList.replace(classe_streak, "combo_numero_errou2");
        classe_streak = "combo_numero_errou2";
        streak_jogo_titulo.classList.replace(classe_streak_titulo, "combo_numero_errou2");
        classe_streak_titulo = "combo_numero_errou2";
    }
}

function combo_sobe() {
    combo++;
    combo_jogo.textContent = combo;
    if (animacao_enviar2) {
        animacao_enviar2 = false;
        envia_resposta_botao.style.animation = "envia_resposta .3s ease-out, envia_resposta_certa .3s ease-out";
    } else {
        animacao_enviar2 = true;
        envia_resposta_botao.style.animation = "envia_resposta .3s ease-out, envia_resposta_certa2 .3s ease-out";
    }
}

function combo_desce() {
    combo = 0;
    combo_jogo.textContent = combo;
    if (animacao_enviar3) {
        animacao_enviar3 = false;
        envia_resposta_botao.style.animation = "envia_resposta .3s ease-out, envia_resposta_errada .3s ease-out";
    } else {
        animacao_enviar3 = true;
        envia_resposta_botao.style.animation = "envia_resposta .3s ease-out, envia_resposta_errada2 .3s ease-out";
    }
}
// --------------------------------- STREAK ----------------------------------

// -------- ÁUDIO DO STREAK (que virou combo porque eu não sei inglês) -------

function audio_streak_menor(streak) {
	for (let j = 1; j < 10; j++) {

        if (j == streak.toString().charAt(2)) {
            let caminhoAudio = `./AUDIO/SFX_COMBO/${1}.${j}x.mp3`;
            let audio = new Audio(caminhoAudio);
            audio.volume = volume_geral * volume_efeitos;
            audio.play();
            break;
        }

		else if (streak.toString().charAt(2) == 0){
            let caminhoAudio = `./AUDIO/SFX_COMBO/2.1x.mp3`;
            let audio = new Audio(caminhoAudio);
            audio.volume = volume_geral * volume_efeitos;
            audio.play();
            break;
        }
    }
}

function audio_streak_maior(streak) {
    for (let j = 1; j < 10; j++) {

        if (j == streak.toString().charAt(2)) {
            let caminhoAudio = `./AUDIO/SFX_COMBO/${6}.${j}x.mp3`;
            let audio = new Audio(caminhoAudio);
            audio.volume = volume_geral * volume_efeitos;
            audio.play();
            break;
        }

        else {
            let caminhoAudio = `./AUDIO/SFX_COMBO/7.1x.mp3`;
            let audio = new Audio(caminhoAudio);
            audio.volume = volume_geral * volume_efeitos;
            audio.play();
            break;
        }
    }
}

function audio_streak_10X() {
    let caminhoAudio = `./AUDIO/SFX_COMBO/10X.mp3`;
    let audio = new Audio(caminhoAudio);
    audio.volume = volume_geral * volume_efeitos;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

// -------- ÁUDIO DO STREAK (que virou combo porque eu não sei inglês) -------

let partidas = 0;

async function sair_do_jogo() {
    partidas++;
    console.log("SAINDO DA PARTIDA!")
    em_jogo = false;
    modo_de_jogo == 1 ? em_modo_classico = true : em_modo_pratica = true;
    clearInterval(intervalo_tempo);

    if (modo_de_jogo == 1) {
        const pontos_classico = document.getElementById("pontos_classico");
        const highscore_classico = document.getElementById("highscore_classico");
        const precisao_classico = document.getElementById("precisao_classico");
        const sequencia_classico = document.getElementById("sequencia_classico");

        pontos_classico.textContent = pontos;
        highscore_classico.textContent = highscore_class;
        precisao = Math.round((acertos / numero_de_operacoes) * 100);
        console.log("ACERTOS: " + acertos + ", N de OP: " + numero_de_operacoes);

        if (acertos == 0 && numero_de_operacoes == 0) {
            precisao_classico.textContent = 0 + "%";
        } else {
            precisao_classico.textContent = precisao + "%";
        }

        sequencia_classico.textContent = maior_streak + "X";
        container_do_calculo.style.animation = "opacidade_sem_display 1s forwards, opacidade_de_cima2 1s forwards reverse";
        combo_html.style.animation = "intro_combo_streak3 1s forwards reverse, opacidade_sem_display 1s ease-in-out forwards";
        combo2_html.style.animation = "intro_combo_streak4 1s forwards reverse, opacidade_sem_display 1s ease-in-out forwards";
        organiza_pontos.style.animation = "intro_pontos_jogo2 1s ease-in-out forwards reverse, opacidade_sem_display 1s ease-in-out forwards";
    } else {
        const pontos_pratica = document.getElementById("pontos_pratica");
        const highscore_pratica = document.getElementById("highscore_pratica");
        const precisao_pratica = document.getElementById("precisao_pratica");
        const sequencia_pratica = document.getElementById("sequencia_pratica");

        sequencia_pratica.textContent = maior_streak + "X";
        pontos_pratica.textContent = pontos;
        highscore_pratica.textContent = highscore_prat;
        precisao = Math.round((acertos / numero_de_operacoes) * 100);
        console.log("ACERTOS: " + acertos + ", N de OP: " + numero_de_operacoes);

        if (acertos == 0 && numero_de_operacoes == 0) {
            precisao_pratica.textContent = 0 + "%";
        } else {
            precisao_pratica.textContent = precisao + "%";
        }

        container_do_calculo.style.animation = "opacidade_sem_display 1s forwards, opacidade_de_cima2 1s forwards reverse";
        combo_html.style.animation = "intro_combo_streak3 1s forwards reverse, opacidade_sem_display 1s ease-in-out forwards";
        combo2_html.style.animation = "intro_combo_streak4 1s forwards reverse, opacidade_sem_display 1s ease-in-out forwards";
        organiza_pontos.style.animation = "intro_pontos_jogo2 1s ease-in-out forwards reverse, opacidade_sem_display 1s ease-in-out forwards";
    }

    em_contagem = false;
    container_jogo.style.animation = "opacidade_sem_display 1.3s forwards ease-out";
    await sleep(1300);
    resetar_jogo();


    if (modo_de_jogo == 1) {
        console.log("EM MODO CLÁSSICO!");
        container_jogo.style.display = "none";
        container_classico.style.display = "flex";
        container_classico.style.animation = "opacidade_display .4s forwards ease-in";
    } else {
        console.log("EM MODO PRÁTICA!");
        container_jogo.style.display = "none";
        container_pratica.style.display = "flex";
        container_pratica.style.animation = "opacidade_display .4s forwards ease-in";

    }

    console.log(partidas);

    if (partidas > 4) {
        partidas = 0;
        seleciona_background();
    }
}

// -------------------------------- MODO PRÁTICA ----------------------------------

const container_pratica = document.getElementById("modo_pratica");
let em_modo_pratica = false
let modo_de_jogo = 1;

async function renderiza_pratica() {
    seta_dificuldade(1, 0);
    tempo_minuto.textContent = "0";
    tempo_segundo.textContent = "00"
    tempo_milissegundo.textContent = "00"
    modo_de_jogo = 0;
    if (!em_modo_pratica) {
        em_modo_jogo = false;
        em_modo_pratica = true;
		audio_seleciona_classico();
        container_transicao_jogar.style.display = "flex";
        container_transicao_jogar.style.zIndex = "2";
        container_modos_de_jogo.classList.replace("container_modos_de_jogo_pos", "container_modos_de_jogo_animacao2");

        for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            switch (i) {
                case 0:
                    faixas_transicao_jogar[0].style.backgroundColor = "#d901ff";
                    faixas_transicao_jogar[0].style.boxShadow = "0 0 1vh #d901ff";
                    break;

                case 1:
                    faixas_transicao_jogar[1].style.backgroundColor = "#aa00c8";
                    faixas_transicao_jogar[1].style.boxShadow = "0 0 1vh #aa00c8";
                    break;

                case 2:
                    faixas_transicao_jogar[2].style.backgroundColor = "#750289";
                    faixas_transicao_jogar[2].style.boxShadow = "0 0 1vh #750289";
                    break;

                case 3:
                    faixas_transicao_jogar[3].style.backgroundColor = "#470053";
                    faixas_transicao_jogar[3].style.boxShadow = "0 0 1vh #470053";
                    break;
            }
        }

        for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            faixas_transicao_jogar[i].classList.add(`faixa${i + 1}_animacao`);
        }

        
        await sleep(1500);

        container_modos_de_jogo.style.display = "none";
        container_pratica.style.display = "flex";
        container_pratica.style.animation = "opacidade_display 1s forwards ease-in";

        await sleep(800);
        container_transicao_jogar.style.display = "none";
    }


}

async function voltar4() {
    if (em_modo_pratica) {
        em_modo_pratica = false;
        em_modo_jogo = true;
        console.log("EM MODOS DE JOGO!");

        container_transicao_jogar.style.display = "flex";
        container_transicao_jogar.style.zIndex = "2";

        for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            faixas_transicao_jogar[i].classList.add(`faixa${i + 1}_animacao`);
        }

        container_pratica.style.animation = "opacidade_sem_display 1s forwards ease-in";


        await sleep(1500);
        container_modos_de_jogo.style.display = "block";
        container_modos_de_jogo.classList.replace("container_modos_de_jogo_animacao2", "container_modos_de_jogo_animacao");

        container_pratica.style.display = "none";
        await sleep(1000);
        container_modos_de_jogo.classList.replace("container_modos_de_jogo_animacao", "container_modos_de_jogo_pos");
        container_transicao_jogar.style.display = "none";
        for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            switch (i) {
                case 0:
                    faixas_transicao_jogar[0].style.backgroundColor = "#0687ff";
                    faixas_transicao_jogar[0].style.boxShadow = "0 0 1vh #0687ff";
                    break;

                case 1:
                    faixas_transicao_jogar[1].style.backgroundColor = "#004ab9";
                    faixas_transicao_jogar[1].style.boxShadow = "0 0 1vh #004ab9";
                    break;

                case 2:
                    faixas_transicao_jogar[2].style.backgroundColor = "#002f58";
                    faixas_transicao_jogar[2].style.boxShadow = "0 0 1vh #002f58";
                    break;

                case 3:
                    faixas_transicao_jogar[3].style.backgroundColor = "#00213d";
                    faixas_transicao_jogar[3].style.boxShadow = "0 0 1vh #00213d";
                    break;
            }
        }
    }
}

// -------------------------------- MODO PRÁTICA ----------------------------------

// ----------------------------------- OPÇÕES -------------------------------------  
	const tela_opcao = document.getElementById("tela_opcoes");
	let em_opcoes = false;

 async function chama_opcao() {
		if (em_menu) {
			em_menu = false;
			em_opcoes = true;
			audio_opcoes.volume = volume_geral * volume_efeitos;
			audio_opcoes.play();

			menu_tela.classList.replace("container_menu_animation", "container_menu_pos");
        	container_transicao_jogar.style.display = "flex";
        	container_transicao_jogar.style.zIndex = "2";
			
			for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            	switch (i) {
                	case 0:
                    	faixas_transicao_jogar[0].style.backgroundColor = "#e01e37";
                    	faixas_transicao_jogar[0].style.boxShadow = "0 0 1vh #e01e37";
                    break;

                	case 1:
                    	faixas_transicao_jogar[1].style.backgroundColor = "#c71f37";
                    	faixas_transicao_jogar[1].style.boxShadow = "0 0 1vh #c71f37";
                    break;

                	case 2:
                    	faixas_transicao_jogar[2].style.backgroundColor = "#b21e35";
                    	faixas_transicao_jogar[2].style.boxShadow = "0 0 1vh #b21e35";
                    break;

                	case 3:
                    	faixas_transicao_jogar[3].style.backgroundColor = "#85182a";
                    	faixas_transicao_jogar[3].style.boxShadow = "0 0 1vh #85182a";
                    break;
           		 }
       		 }

        	for (let i = 0; i < faixas_transicao_jogar.length; i++) {
            	faixas_transicao_jogar[i].classList.add(`faixa${i + 1}_animacao`);
        	}

        	await sleep(1500);
			tela_opcao.style.display = "block";
			tela_opcao.style.zIndex = 1;
        	tela_opcao.style.animation = "opacidade_display 1s forwards ease-in";
        	
			await sleep(800);
        	container_transicao_jogar.style.display = "none";
		}
	}

	async function voltar5() {
		
    if (em_opcoes) {
        	em_opcoes = false;
        	em_menu = true;

        	container_transicao_jogar.style.display = "flex";
        	container_transicao_jogar.style.zIndex = "2";

			

        	for (let i = 0; i < faixas_transicao_jogar.length; i++) {
           		faixas_transicao_jogar[i].classList.add(`faixa${i + 1}_animacao`);
        	}

        	tela_opcao.style.animation = "opacidade_sem_display 1s forwards ease-in";
        	tela_opcao.zIndex = 0;
    		await sleep(1000);

    		tela_opcao.style.display = "none";
			menu_tela.classList.replace("container_menu_pos", "container_menu_animation");
			menu_tela.style.zIndex = 1;
			renderiza_menu();
    		await sleep(1500);
    		container_transicao_jogar.style.display = "none";
    		for (let i = 0; i < faixas_transicao_jogar.length; i++) {
        		faixas_transicao_jogar[i].classList.replace(`faixa${i + 1}_animacao`, "faixas");
    		}

    	}
	}
// ----------------------------------- OPÇÕES -------------------------------------  
