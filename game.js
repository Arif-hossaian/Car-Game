// here we take control of div class and store it in a variable.//

const score = document.querySelector(".score");
const startScrean = document.querySelector(".startScrean");
const gameArea = document.querySelector(".gameArea");

console.log(gameArea);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

startScrean.addEventListener("click", start); // this means user when click start menu for start game..for this purpose this event is genaralized//

let player = { speed: 12.5, score: 0};

let keys = { ArrowUp: false, ArrowUp: false, ArrowRight: false, ArrowLeft: false};   // we use this object method keys  bcz when we play and when we press a particular button then that particalar button will true others will become false..thats it//

function keyDown(e){
    e.preventDefault();  // use this bcz prevent js by default functionality .//
    keys[e.key] = true;  // this line means when we click arrowup or any sides key then that will  true anothers are false but when we click up,down,left,right periodically all are true...for this nxt funtion we make it false.//
    //console.log(e.key);
    console.log(keys);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;  // this line means when we relise a key press then that will only true another are false//
    //console.log(e.key);
    console.log(keys);
}

function isCollide(a,b){ // using this function we calculate the collide between cars.Here a is my car's position and b means enemy car's position //
     
       aRect = a.getBoundingClientRect(); // aRect means we create myCar's object and a.getbounding...means we get the postion uisng this bound method //

       bRect = b.getBoundingClientRect(); // here we get enemyCar's positon using bRect object //

       return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.left > bRect.right) || (aRect.right < bRect.left)); // this condition means myCar's bottom position is greater then enemyCar and so on...bcz then Car objects are can identifie there position from each other to prevent collide and if any one conditon are false if any....then return not means collide being happened...//

}

function moveLines(){
    let line = document.querySelectorAll(".line") // means we want to get access all 5 roadlines //
    line.forEach(function(item){ // using foreach we want to access each road line //

        if(item.y >= 700){ // using this loop when road line going to 700px from top to down then its revers to the top postion and again continue going top to bottom // 
            item.y -= 750; 
        }
         item.y += player.speed; 
         item.style.top = item.y + "px";
    })
}

function endGame(){
    player.start = false; // using this bcz to start the game we use player.start = true..then game start now this part we just false it thats it //

    startScrean.classList.remove("hide"); // using this we can unhide the screen..when end the game //
    player.score++;
    let ps = player.score + 2;

    startScrean.innerHTML = "Game Over <br> Your Final Score is "+ ps + " <br>Press here to restart the game."
}

function moveEnemy(car){
    let enemy = document.querySelectorAll(".enemy") // means we want to get access all 5 enemycar //
    enemy.forEach(function(item){ // using foreach we want to access each enemy car //
         
         if(isCollide(car, item)){ //here call collide fucntion and passed argument as car and item//

             console.log("BOOM hit!!");
             endGame(); // call the function for end the game //
         }

        if(item.y >= 750){ // using this loop when road line going to 700px from top to down then its revers to the top postion and again continue going top to bottom // 
            item.y = -300; // this lines means when cars touch 750 from top to buttom then its again return value from top to buttom continuously that time the value start with -300. If we can not do this when nxt car means 1,2,3 num cars are passed then when 4th num car will come it will be flame up("use dictonary if dont undersrtand") together.For this circumastance we use here -300 .//

            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
         item.y += player.speed; 
         item.style.top = item.y + "px";
    })
}

function gamePlay(){ 
    console.log("hey i am click");
    let car = document.querySelector(".car"); // means to get the value of car //
    let road = gameArea.getBoundingClientRect();
    console.log(road);
    if( player.start){
       
        moveLines(); //means movelines is being called  define is upper//
        
        moveEnemy(car) //moveenemy clss is being called here ..define is upper //

        if(keys.ArrowUp && player.y > (road.top + 130)) {player.y -= player.speed} // here if user click arrowup cursor then the position of car will change...and here we use "-=" this means the value of top is deccreasing for this our car's position is rising up  think again....//
        if(keys.ArrowDown && player.y < (road.bottom - 90)) {player.y += player.speed}
        if(keys.ArrowLeft  && player.x > 0) {player.x -= player.speed}
        if(keys.ArrowRight && player.x < (road.width - 70)) {player.x += player.speed}
       
        car.style.top = player.y + "px"; // we use this bcz the value of car which is define top javascript can not understand this value for this we add "px" with this value...using this "px" with value javascript recognize it as a positon value as pixel based and change will virtually in our display..and this is like css .In css we add left:100px..top:600px here same this functionality is genarated..using javascript //
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay); // here we use it again bcz we want loop in our animation means our line should be countineously running for this we use it again here..//

        console.log(player.score++);

        player.score++; // we increment our score here..but we define it upper where speed is defined and our start() function.//

        score.innerText ="score: " + player.score; 
}
    }

function start(){ // this means when start function is clicked then this animation will genarate ...//

    // gameArea.classList.remove("hide"); //means when we click startmenu we want to remove hide from gamearea//

    startScrean.classList.add("hide"); //means when we click startscrean...startscrean will hide for display gamearea. and gamearea will show...//
    
    gameArea.innerHTML = " "; // we creat all function like roadline,gamplay...so why we hide ..for this we take it as empty and and and its very important in our game...bcz..without using this line we cannot play game properly //

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay); // here gameplay is just call we have to define it and define is upper see //
    
    for( x=0; x<5; x++){
        let roadLine = document.createElement("div"); // we creat again a div to add in our gamearea div for show road line in our game //
        roadLine.setAttribute("class", "line");
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }
  

    let car = document.createElement("div"); // here we creat a div like our html..//

    car.setAttribute("class", "car"); // we creat a class and class name car...like html //

    //car.innerText = "hey i am ur car"; // WE can show some text in our class like p tag in our html //

    gameArea.appendChild(car); // we add car div in our gamearea class which is creat in our html previously & using this append child we can add this car div in that gamearea element //

    player.x = car.offsetLeft; // means we take offset value in a variable for that we can know the position of cars and using loop or condition we can change it then...//

    player.y = car.offsetTop;

    // console.log("top position is" + offsetTop);
    // console.log("left position is" + offsetLeft);


    for( x=0; x<3; x++){  // using this loop we creat enemycars in our game and creat div,class for that//

        let enemyCar = document.createElement("div"); // we creat again a div to add in our gamearea div for show road line in our game //

        enemyCar.setAttribute("class", "enemy");
        enemyCar.y = ((x+1) * 350) * -1; // 1,2,3 this cars are moving prediocally in our game in this postion but when 1,2,3 cars are gone randomly then when 4th cars are come they are so many difference in height means 3 cars are randomly come then again 3 cars are comes randomly but in coming positon 1st 3 and 2nd 3 cars heights are in different postion .To remove this difference we us the negative value ...//

        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor ="";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}

