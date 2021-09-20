const width=28;
const grid=document.querySelector('.grid');
const scoreDisplay=document.getElementById('score');
const won=document.getElementById('won');
const lose=document.getElementById('lose');
let squares=[];
let direction=1;
let score = 0;
let ghostdirection=0;






//28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]





//create board
function createBoard(){
	for(let i=0;i<layout.length;i++)
	{
		//create a square 
		const square=document.createElement("div");
		//put square in grid 
		grid.appendChild(square);
		squares.push(square);
		if(layout[i]===0)
			squares[i].classList.add("pac-dot");
		else if(layout[i]===1)
			squares[i].classList.add("wall");
		else if (layout[i] === 2) 
            squares[i].classList.add('ghost-lair')
		else if(layout[i]===3)
			squares[i].classList.add("power-pellet");
		else if(layout[i]==4)
			squares[i].classList.add("empty");
	}
	for(let i=0;i<layout.length;i++)
	{
		if(squares[i].classList.contains('wall'))
		{
			if((i% width !==0 )&& squares[i-1].classList.contains('wall'))
			squares[i].style.borderLeft='none';
			if((i% width < width -1) && squares[i+1].classList.contains('wall'))
			squares[i].style.borderRight='none';
			if((i- width >=0 )&& squares[i-width].classList.contains('wall'))
			squares[i].style.borderTop='none';
			if((i+ width < width * width) && squares[i+width].classList.contains('wall'))
			squares[i].style.borderBottom='none';	
		}
	}
}
createBoard();


//starting position of pacman 
let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add("pacman")


// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow
// 68 is for the
// 68 is for the
// 68 is for the
// 68 is for the
//234 food
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score++;
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        scoreDisplay.innerHTML = score;
    }
}


function powerPelletEaten() {
    //if square pacman is in contains a power pellet
    if(squares[pacmanCurrentIndex].classList.contains("power-pellet")){
    //code 
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    //removeing class of power-pellet from square
    	score+=10;
    	scoreDisplay.innerHTML = score;
    //add a score of 10
        ghosts.forEach(ghost=>ghost.isScared=true)
    //change each of the four ghosts to isScared
		setTimeout(unScareGhosts, 10000) ;    
    //use setTimeout to unscare ghosts after 10 seconds
	}
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

function ScareGhostsEaten() {
	ghosts.forEach(ghost => {

	})
}

function move(){
	if(!squares[pacmanCurrentIndex+direction].classList.contains("wall")&&
		(!squares[pacmanCurrentIndex+direction].classList.contains("ghost-lair")))
    {
		squares[pacmanCurrentIndex].classList.remove('pacman');
		pacmanCurrentIndex+=direction;
		squares[pacmanCurrentIndex].classList.add("pacman");
	}
	pacDotEaten();
	powerPelletEaten() ;
	checkForWin();
	checkForGameOver();
}





function control(e) {
    direction=0;
    if ((e.keyCode === 39||e.keyCode===68)&&(pacmanCurrentIndex % width !== width-1)) {
        direction = 1
    } else if ((e.keyCode === 38||e.keyCode===87)&&(pacmanCurrentIndex - width >= 0)) {
        direction = -width
    } else if ((e.keyCode === 37||e.keyCode===65)&&(pacmanCurrentIndex % width !== 0)) {
        direction = -1
    } else if ((e.keyCode === 40||e.keyCode===83)&&(pacmanCurrentIndex + width < width * width)) {
        direction = +width
    } else if((pacmanCurrentIndex === 364) &&(e.keyCode === 37||e.keyCode===65)) {
        direction = +width-1;
    } else if((pacmanCurrentIndex === 391)&&(e.keyCode === 39||e.keyCode===68))
        direction = -width+1;
    move();
}
document.addEventListener('keyup', control)


//Ghost
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//draw my ghosts onto my grid
ghosts.forEach(ghost =>{
 	squares[ghost.currentIndex].classList.add(ghost.className)
	squares[ghost.currentIndex].classList.add('ghost')
})
//move the ghosts

ghosts.forEach(ghost=> moveGhost(ghost))



function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
   	ghostdirection = directions[Math.floor(Math.random()* directions.length)]


    ghost.timerId = setInterval(function() {
    	//all our code
    	//if the next square does NOT contain a wall and does not contain a ghost
    	if((!squares[ghost.currentIndex+ghostdirection].classList.contains("ghost"))&&
    		(!squares[ghost.currentIndex+ghostdirection].classList.contains("wall")))
    	{
        //remove any ghost
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove("ghost",'scared-ghost');
        //add direction to current Index
        if((ghost.currentIndex === 391)&&(ghostdirection==1))
        	ghostdirection = -width+1;
        else if((ghost.currentIndex === 364)&&(ghostdirection==1))
        	ghostdirection = +width-1;
        ghost.currentIndex+=ghostdirection;
        //add ghost class
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add("ghost");
    }
        else ghostdirection = directions[Math.floor(Math.random() * directions.length)]

    //if the ghost is currently scared
    if(ghost.isScared){
        	squares[ghost.currentIndex].classList.add('scared-ghost');
	}
    
    entryghostlair(ghost);
	checkForGameOver();

    }, ghost.speed )
}
//Check for eating ghost
function entryghostlair(ghost){
		if(ghost.isScared && (squares[ghost.currentIndex].classList.contains('pacman')||
			(squares[pacmanCurrentIndex].classList.contains('ghost')))) {
   
		    //if the ghost is current scared AND pacman is on it
		    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
		    //remove classnames - ghost.className, 'ghost', 'scared-ghost'
		    ghost.currentIndex = ghost.startIndex    
		    // change ghosts currentIndex back to its startIndex
		    score +=100
		    scoreDisplay.innerHTML = score;   
			//add a score of 100
		    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')   
		    //re-add classnames of ghost.className and 'ghost' to the ghosts new postion
		}
}
//check for game over
function checkForGameOver() {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
    if(squares[pacmanCurrentIndex].classList.contains("ghost")&&
    	!squares[pacmanCurrentIndex].classList.contains('scared-ghost')){

		//for each ghost - we need to stop it moving
	    ghosts.forEach(ghost => clearInterval(ghost.timerId))
	    //remove eventlistener from our control function
	    document.removeEventListener('keyup', control)
	    //tell user the game is over
	    lose.style.display="block";
    }
    
}

//check for win
function checkForWin() {
    if (score >= 800) {
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //remove the eventListener for the control function
        document.removeEventListener('keyup', control)
        //tell our user we have won
        won.style.display="block";
    }
}