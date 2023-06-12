// Nav Bar
const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");
menuBtn.onclick = () => {
    items.classList.add("active");
    menuBtn.classList.add("hide");
    searchBtn.classList.add("hide");
    cancelBtn.classList.add("show");
};
cancelBtn.onclick = () => {
    items.classList.remove("active");
    menuBtn.classList.remove("hide");
    searchBtn.classList.remove("hide");
    cancelBtn.classList.remove("show");
    form.classList.remove("active");
    cancelBtn.style.color = "#ff3d00";
};
searchBtn.onclick = () => {
    form.classList.add("active");
    searchBtn.classList.add("hide");
    cancelBtn.classList.add("show");
};

// Login Icon

function openLoginPage() {
    window.open("login.html", "_blank");
}

// Login Form

function validate() {
    var username = document.getElementsByName("Username")[0];
    var password = document.getElementsByName("Password")[0];
    var message = document.getElementById("message");

    if (username.value === "") {
        username.style.borderColor = "red";
        username.addEventListener("input", function () {
            username.style.borderColor = "";
        });
    }

    if (password.value === "") {
        password.style.borderColor = "red";
        password.addEventListener("input", function () {
            password.style.borderColor = "";
        });
    }

    if (username.value !== "" && password.value !== "") {
        username.value = "";
        password.value = "";
        message.style.display = "block";
        var loginButton = document.querySelector('button[type="button"]');
        loginButton.onclick = function () {
            location.reload();
        };
    }
}
