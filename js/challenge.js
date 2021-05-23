document.addEventListener("DOMContentLoaded", function() {
    const counter = document.getElementById("counter");

    let counterInterval = window.setInterval(increaseCounter, 1000);
    
    const plusButton = document.getElementById("plus");
    const minusButton = document.getElementById("minus");
    const pauseButton = document.getElementById("pause");
    const heartButton = document.getElementById("heart");
    const submitButton = document.getElementById("submit");
    const likes = {};
    const commentForm = document.getElementById("comment-form");
    
    plusButton.addEventListener("click", increaseCounter);
    minusButton.addEventListener("click", decreaseCounter);
    pauseButton.addEventListener("click", pause);
    heartButton.addEventListener("click", () => {
        const time = counter.innerHTML;
        const likesUl = document.getElementsByClassName("likes")[0];
        if (likes[time]) {
            likes[time]++;
            const currentLi = document.getElementById(`likes-${time}`);
            currentLi.innerHTML = `
                ${time} has been liked ${likes[time]} times
            `
        } else {
            likes[time] = 1;
            likesUl.innerHTML += `
                <li id="likes-${time}">${time} has been liked 1 time</li>
            `
        }
    });

    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const comment = document.getElementById("comment-input").value;
        const commentsList = document.getElementsByClassName("comments")[0];
        commentsList.innerHTML += `
            <p>${comment}</p>
        `
        commentForm.reset();
    });
    
    function increaseCounter() {
        const newCounter = (parseInt(counter.innerHTML) + 1).toString();
        counter.innerHTML = newCounter; 
    }
    
    function decreaseCounter() {
        const newCounter = (parseInt(counter.innerHTML) - 1).toString();
        if (newCounter >= 0) {
            counter.innerHTML = newCounter; 
        }
    }
    
    function pause() {
        window.clearInterval(counterInterval);
        pauseButton.innerHTML = " resume ";
        pauseButton.removeEventListener("click", pause);
        pauseButton.addEventListener("click", resume);
        plusButton.disabled = true;
        minusButton.disabled = true;
        heartButton.disabled = true;
        submitButton.disabled = true;
    }
    
    function resume() {
        counterInterval = window.setInterval(increaseCounter, 1000);
        pauseButton.innerHTML = " pause ";
        pauseButton.removeEventListener("click", resume);
        pauseButton.addEventListener("click", pause);
        plusButton.disabled = false;
        minusButton.disabled = false;
        heartButton.disabled = false;
        submitButton.disabled = false;
    }

});