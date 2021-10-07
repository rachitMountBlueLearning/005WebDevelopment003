const gameContainer = document.getElementById("game");

const COLORS = [
	"red",
	"blue",
	"green",
	"orange",
	"purple",
	"red",
	"blue",
	"green",
	"orange",
	"purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement("div");

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener("click", handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
let lockBoard = false;
let hasFlippedCard = lockBoard;
let firstCard, secondCard;
let numberOfMatches = 0;

function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	if (lockBoard) return;
	if (this === firstCard) return;

	const color = event.target.classList.value;
	event.currentTarget.style.backgroundImage = "unset";
	event.currentTarget.style.backgroundColor = color;

	if (hasFlippedCard) {
		hasFlippedCard = false;
		secondCard = this;
		onMatch();
	} else {
		hasFlippedCard = true;
		firstCard = this;
	}
	if(numberOfMatches == shuffledColors.length/2){
		alert("Game Won !!! \nResetting the board.");
		location.reload(true);
	}
}

function onMatch() {
	if (firstCard.classList.value === secondCard.classList.value)
	{
		disableCards();
		numberOfMatches += 1;
	} else{
		unlockBoard();
	}
}

function disableCards() {
	firstCard.style.backgroundImage = "unset";
	secondCard.style.backgroundImage = "unset";
	firstCard.removeEventListener("click", handleCardClick);
	secondCard.removeEventListener("click", handleCardClick);
	[firstCard, secondCard] = [null, null];
}

function unlockBoard() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.style.backgroundColor = "unset";
		secondCard.style.backgroundColor = "unset";
		firstCard.style.backgroundImage = "radial-gradient(hsl(0, 0%, 25%), hsl(0, 0%, 20%))";
		secondCard.style.backgroundImage = "radial-gradient(hsl(0, 0%, 25%), hsl(0, 0%, 20%))";
		[firstCard, secondCard] = [null, null];
		lockBoard = false;
	}, 1 * 1000);
}

// when the DOM loads
createDivsForColors(shuffledColors);
