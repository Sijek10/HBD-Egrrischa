// HBD Egrrischa
document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", function () {
        fireworks();
        startBtn.innerHTML = "Membuka Kejutan... ❤️";
        startBtn.disabled = true;

        setTimeout(function () {
            window.location.href = "pages/letter.html";
        }, 1500);
    });
});
