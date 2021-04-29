// show rules
document.querySelector(".show-rules").addEventListener("click", function () {
    document.querySelector(".modal").classList.add("modal-show", "modal-showing");
});

// hide rules
document.querySelector(".close-rules").addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("modal-showing");
    setTimeout(function () {
        document.querySelector(".modal").classList.remove("modal-show");
    }, 300);
});

//Score counter
let score = 0;

//Available options
const options = ["rock", "paper", "scissors"];

//Computer's choice
let com = "";

//Player's choice
let player = "";


if (localStorage.score) {
    score = localStorage.score;
    document.querySelector(".score").textContent = score;
}


// Click button
document.querySelectorAll(".button").forEach(function (allButtons) {
    // Choose an option
    allButtons.addEventListener("click", function () {

        if (allButtons.classList.contains("clickable")) {

            allButtons.classList.remove("clickable");

            // Hide unselected options
            document.querySelectorAll(".button").forEach(function (button) {
                if (allButtons === button) {
                    button.classList.add("selected");
                } else {
                    button.classList.add("hide");
                }
            });
            // Hide triangle
            document.querySelector(".triangle").classList.add("hide");
            // Animate computer's choice
            document.querySelector(".com").classList.remove("hide");
            document.querySelector(".com").classList.add("loading");
            // Show announcement
            document.querySelector(".announcement").classList.remove("hide");


            // Player's choice
            player = this.getAttribute("data-option");
            // Computer's choice
            com = options[Math.floor(Math.random() * 3)];

            // Creating computer's choice element
            let img = document.createElement("IMG");
            img.setAttribute("src", `images/icon-${com}.svg`);

            // Check the winner
            if (options.indexOf(player) - options.indexOf(com) === 0) {
                document.querySelector(".win-lose p").textContent = "It's a draw";
            } else if (options.indexOf(player) - options.indexOf(com) === 1 ||
                options.indexOf(player) - options.indexOf(com) === -2) {
                document.querySelector(".win-lose p").textContent = "You win";
                score++;
            } else {
                document.querySelector(".win-lose p").textContent = "You lose";
                if (score > 0) {
                    score--;
                }
            }

            localStorage.score = score;

            // Result
            setTimeout(function () {
                // Display computer's choice
                document.querySelector(".com").classList.remove("loading");
                document.querySelector(".com").classList.add(com + "-button");
                document.querySelector(".com span").append(img);

                // Update the score
                document.querySelector(".score").textContent = score;

                // Show win / lose
                document.querySelector("section").classList.add("show-result");
                document.querySelector(".win-lose").classList.remove("hide");

            }, 1000);



        }


    });

});

// Play again
document.querySelector(".play-again").addEventListener("click", function () {

    document.querySelector(".com").classList.remove(com + "-button");
    document.querySelector(".com").classList.add("hide");
    com = "";
    document.querySelector(".com span img").remove();
    document.querySelector(".win-lose").classList.add("hide");
    document.querySelector("section").classList.remove("show-result");
    document.querySelector(".announcement").classList.add("hide");
    document.querySelector(".selected").classList.remove("selected");
    document.querySelectorAll(".button").forEach(function (button) {
        button.classList.remove("hide");
        button.classList.add("clickable");
    });
    document.querySelector(".triangle").classList.remove("hide");


});
