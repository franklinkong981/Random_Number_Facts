const getFactsButton = document.querySelector('.get-facts');
const numberReveal = document.querySelector('.number-reveal');
const factsList = document.querySelector('.facts-list');

getFactsButton.addEventListener('click', function() {
    let fourRandomFacts = [];
    let url = 'http://numbersapi.com/random/trivia?json';
    let favoriteNumber = 0;

    //get the number the facts will be on.
    axios.get(url)
    .then(res => {
		favoriteNumber = res.data.number;
        numberReveal.innerText = `The number is: ${favoriteNumber}`;
        //generate the four facts about that number.
        for (let i = 1; i < 5; i++) {
            fourRandomFacts.push(
                axios.get(`http://numbersapi.com/${favoriteNumber}/trivia?json`)
            );
        }
        return Promise.all(fourRandomFacts)
	})
    .then(randomFactsArray => {
        for (let i = 0; i < 4; i++) {
            factsList.children[i].innerText = randomFactsArray[i].data.text;
        }
    })
    .catch(err => console.log("REJECTED!", err));
});

