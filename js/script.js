//Let é uma permiti criar variáveis com escopo de bloco
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); 
let box = 32; //variavel com espçao(box) do jogo 
let snake = []; //variavel usada para desenhar gráficos

//Variável que cria a cobra
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
//Variável de direção
let direction = "right";

//Variável comida do tipo Array
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Função que cria o espaço do jogo
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
//Função para criar a cobra
function criarCobrinha(){
    for(i=0; i< snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
//Funçaõ para criar comida
function drawFood(){
    context.fillStyle = "red";
    //Aqui passa o argumento onde a comida vai aparecer
    context.fillRect(food.x, food.y, box, box);
}
//Chama um evento do programa, no caso mudança de direção
document.addEventListener('keydown' , update);

function update (event){
     if(event.keyCode == 37 && direction != "right")direction = "left";
     if(event.keyCode == 38 && direction != "down") direction = "up";
     if(event.keyCode == 39 && direction != "left")direction = "right";
     if(event.keyCode == 40 && direction != "up") direction = "down";
}
alert("Para jogar utilize as setas para movimentar. Bom jogo :) ");
//Função que inicia o jogo
function iniciarJogo(){
    //Condicionais que permitir a snake continuar na tela, sair e voltar. 
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake [0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
   
    //Loop para verificar se a cobra se encosta(Verificar fim do jogo)
    for(i = 1; i < snake.length; i++){
        //Condicional com alerta de fim de jogo
        if(snake[0].x == snake [i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(\n Recarregue a página para jogar novamente!");
        }
    }
    
    //Parte que Chama as funções para o jogo funcionar:
    criarBG();
    criarCobrinha();
    drawFood();

    //Variáveis do tipo vetor para condicionais de ações
    let snakeX = snake[0].x;
    let snakeY= snake[0].y;

 //Sequência de  codicionais para ações do jogo. Direita, Esquerda, para cima e para baixo 
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Condicional que cria comidas após serem comidas
    if(snakeX != food.x || snakeY != food.y){
        //POP: É um método remove o último elemento do array e retorna para o elemento.
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    //Variável para criar aumentar corpo da Snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //Unshift: Adiciona um ou mais elementos no ínicio de um array e retorna o número de elementos. 
    snake.unshift(newHead);
}
//setInterval: Método que chama uma função com intervalos especificados(em milissegundos)
let jogo = setInterval (iniciarJogo, 100);