document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const loginError = document.querySelector(".login-error");

    try {
        const pwRef = firebase.database().ref("pw");
        const snapshot = await pwRef.once("value");
        const storedPassword = snapshot.val();

        if (password === storedPassword) {
            localStorage.setItem("DbVisualizerSession", "loggedIn");
            window.location.href = "db.html";
        } else {
            loginError.textContent = "Incorrect password. Please try again.";
        }
    } catch (error) {
        console.error("Error fetching password:", error);
        loginError.textContent = "An error occurred. Please try again.";
    }
});
