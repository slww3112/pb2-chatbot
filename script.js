const chatOutput = document.getElementById("chat-output");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (message.length > 0) {
        addMessageToChat("User", message);
        chatInput.value = "";
        processUserMessage(message);
    }
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});

function addMessageToChat(sender, message) {
    const messageElement = document.createElement("div");
    const messageText = document.createElement("div");
    messageText.innerHTML = message;
    messageText.className = sender === "User" ? "user-message" : "chatbot-message";
    messageElement.appendChild(messageText);
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}


function processUserMessage(message) {
    // Implement your chatbot logic here or call an API to get the response
    const response = `You said: ${message}`; // Placeholder response
    setTimeout(() => {
        addMessageToChat("Chatbot", response);
    }, 1000);
}
const darkModeToggle = document.getElementById("toggle-dark-mode");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


