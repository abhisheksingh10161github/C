let inputDir = {x:0,y:0};
 const foodSound = new Audio('eating bgm.wav');
 const gameOverSound =new Audio('gameover.wav');
 const moveSound = new Audio('click.wav');
 const musicSound = new Audio('snake_music.mp3');
let speed =7;
let score = 0;
let lastPaintTime =0;
let snakeArr =  [
    {x:13 , y:15}
]
food = { x:6, y:7};
// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake){
    // if you bump into yourself
    for(let i =1; i< snakeArr.length; i++ ){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //  if you hit the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}
function gameEngine(){
    //Updating Snake Array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over, Press any key to play Again");
        snakeArr = [{x:13,y:15}];
        musicSound.play() ;
        score =0;

    }
    //   if you have eaten the food , increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML= "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x ,y: snakeArr[0].y + inputDir. y }) ;
        let a =2;
        let b= 16;
        food ={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random()) }
    }
    // Moving the snake
    for( let i= snakeArr.length-2 ; i>=0; i--){
        // const element  = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Displaying the Snake 
    board.innerHTML = "";
    snakeArr.forEach((e,index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('snake');
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Displaying the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
    
}










// main logic
 window.requestAnimationFrame(main);
 window.addEventListener('keydown',e =>{
     inputDir = {x:0,y:1} //Start the game
     moveSound.play()
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x =0;
            inputDir.y =1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
 });

