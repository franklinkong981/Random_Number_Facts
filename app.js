const getFactsButton = document.querySelector('.get-facts');
const numberReveal = document.querySelector('.number-reveal');
const factsList = document.querySelector('.facts-list');

getFactsButton.addEventListener('click', async function() {
    let fourRandomFacts = [];
    let url = 'http://numbersapi.com/random/trivia?json';
    let favoriteNumber = 0;

    try {
        //get the number the facts will be on.
        let res = await axios.get(url);
        favoriteNumber = res.data.number;
        numberReveal.innerText = `The number is: ${favoriteNumber}`;
        //generate the four facts about that number.
        for (let i = 1; i < 5; i++) {
            fourRandomFacts.push(
                await axios.get(`http://numbersapi.com/${favoriteNumber}/trivia?json`)
            );
        }
        for (let i = 0; i < 4; i++) {
            factsList.children[i].innerText = fourRandomFacts[i].data.text;
        }
    }
    catch(e) {
        console.log("REJECTED!");
    }
});

