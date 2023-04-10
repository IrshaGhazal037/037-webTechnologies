  // Login Form

  function validate() {
    var username = document.getElementsByName("Username")[0];
    var password = document.getElementsByName("Password")[0];
    var message = document.getElementById("message");
  
    if (username.value === "") {
      username.style.borderColor = "red";
      username.addEventListener("input", function() {
        username.style.borderColor = "";
      });
    }
  
    if (password.value === "") {
      password.style.borderColor = "red";
      password.addEventListener("input", function() {
        password.style.borderColor = "";
      });
    }
  
    if (username.value !== "" && password.value !== "") {
      username.value = "";
      password.value = "";
      message.style.display = "block";
      var loginButton = document.querySelector('button[type="button"]');
      loginButton.onclick = function() {
        location.reload();
      };
    }
  }
  