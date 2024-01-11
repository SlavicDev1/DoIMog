function generateRandomNumber() {
    var randomNumber = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
    document.getElementById("randomNumberText").innerHTML = "Pushups: " + randomNumber;
    openModal();
}

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}
