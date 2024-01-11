let startTime, endTime;

function startGame() {
    document.querySelector('button').style.display = 'none';

    const delay = Math.floor(Math.random() * 8000) + 2000;

    setTimeout(() => {
        document.getElementById('color-box').style.backgroundColor = 'green';

        startTime = new Date();

        document.getElementById('color-box').addEventListener('click', endGame);
    }, delay);
}

function endGame() {
    endTime = new Date();

    const reactionTime = endTime - startTime;

    document.getElementById('result').innerText = `Je reactietijd is: ${reactionTime} ms`;

    document.getElementById('color-box').style.backgroundColor = 'red';

    setTimeout(() => {
        document.querySelector('button').style.display = 'block';
    }, 1000);

    document.getElementById('color-box').removeEventListener('click', endGame);

    showTopScores(reactionTime);
}

function showTopScores(currentScore) {
    const topScores = JSON.parse(localStorage.getItem('topScores')) || [];
    topScores.push(currentScore);

    topScores.sort((a, b) => a - b);

    topScores.splice(5);

    localStorage.setItem('topScores', JSON.stringify(topScores));

    document.getElementById('topScores').innerHTML = `Top 5 Snelste Tijden: ${topScores.join(' ms, ')} ms`;
}

window.addEventListener('load', () => {
    showTopScores(0); 
});