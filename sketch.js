let imagem1;
let imagem2;
let tempo = 120;
let jogoAtivo = false;
let tempoAcabou = false;
let pontos = 0;

let xJogador = [0];
let yJogador = [200];
let jogador = ["👨‍🌾"];
let quantidade = jogador.length;

let cenouras = [];

function preload() {
  imagem1 = loadImage("Paisagem.jpg");
  imagem2 = loadImage("campo.jpg");
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  frameRate(30);

  cenouras.push(createVector(random(100, 300), random(50, 350)));
  cenouras.push(createVector(random(100, 300), random(50, 350)));

  setInterval(() => {
    if (jogoAtivo && tempo > 0) {
      tempo--;
    } else if (tempo === 0 && !tempoAcabou && !verificaSePodeVencer()) {
      tempoAcabou = true;
      noLoop();
    }
  }, 1000);
}

function draw() {
  if (focused) {
    jogoAtivo = true;
    background(imagem2);
  } else {
    jogoAtivo = false;
    background(imagem1);
    instrucao();
  }

  moverJogador();
  desenhaJogadores();
  desenhaEChecaCenouras();
  desenhaLinhaDeChegada();
  verificaVencedor();
  mostraTimer();

  fill(0);
  textSize(18);
  text("🥕 Pontos: " + pontos, width / 20, 20);

  if (tempoAcabou) {
    fill("red");
    textSize(25);
    text("⛔ Tempo acabou!", width / 2, 60);
  }
}

function instrucao() {
  fill(0);
  textSize(16);
  text("Clique na tela para iniciar o jogo", width / 2, 20);
  text("Use W/A/S/D para mover o fazendeiro!", width / 2, 55);
  text("colete cenouras e cruzar a linha de chegada !", width / 2, 35);
}

function desenhaJogadores() {
  textSize(40);
  for (let i = 0; i < quantidade; i++) {
    text(jogador[i], xJogador[i], yJogador[i]);
  }
}

function desenhaLinhaDeChegada() {
  fill("white");
  rect(350, 0, 10, height);
  fill("black");
  for (let yAtual = 0; yAtual < height; yAtual += 20) {
    rect(350, yAtual, 10, 10);
  }
}

function desenhaEChecaCenouras() {
  fill("orange");
  for (let i = 0; i < cenouras.length; i++) {
    if (cenouras[i]) {
      rect(cenouras[i].x, cenouras[i].y, 20, 20);
      if (dist(xJogador[0], yJogador[0], cenouras[i].x, cenouras[i].y) < 30) {
        cenouras[i] = null;
        pontos += 10;
      }
    }
  }
}

function verificaVencedor() {
  if (xJogador[0] > 350 && pontos === 20) {
    fill("green");
    textSize(25);
    text("🎉 Você venceu!", width / 2, 100);
    noLoop();
  }
}

function verificaSePodeVencer() {
  return (xJogador[0] > 350 && pontos === 20);
}

function moverJogador() {
  if (tempoAcabou) return;

  let velocidade = 4;

  if (keyIsDown(87)) { // W
    yJogador[0] -= velocidade;
  }
  if (keyIsDown(83)) { // S
    yJogador[0] += velocidade;
  }
  if (keyIsDown(65)) { // A
    xJogador[0] -= velocidade;
  }
  if (keyIsDown(68)) { // D
    xJogador[0] += velocidade;
  }

  // Limita dentro da tela
  xJogador[0] = constrain(xJogador[0], 0, width - 40);
  yJogador[0] = constrain(yJogador[0], 0, height - 40);
}

function mostraTimer() {
  fill(0);
  textSize(20);
  text("⏱️ Tempo restante: " + tempo + "s", width / 2, 370);
}
