const firebaseConfig = {
    apiKey: "AIzaSyDvsbSgcc0GVG5qiJz_6onO3ZtKx6AT0YE",
    authDomain: "bhh-chatbot.firebaseapp.com",
    databaseURL: "https://bhh-chatbot-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bhh-chatbot",
    storageBucket: "bhh-chatbot.appspot.com",
    messagingSenderId: "462999270066",
    appId: "1:462999270066:web:e54f69725a1064feaacfab",
    measurementId: "G-25LXV3YTB7"
};

const darkModeToggle = document.getElementById("toggle-dark-mode");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


// init firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
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


async function processUserMessage(message) {
    const messageRef = firebase.database().ref("messages");
    const newMessageRef = messageRef.push();
    await newMessageRef.set({
        sender: "User",
        message: message,
        timestamp: Date.now(),
    });

    // bsp chatbot response
    const response = `You said: ${message}`; // Placeholder response

    const newResponseRef = messageRef.push();
    await newResponseRef.set({
        sender: "Chatbot",
        message: response,
        timestamp: Date.now(),
    });

    addMessageToChat("Chatbot", response);
}
/*
function loadChatHistory() {
    const messagesRef = firebase.database().ref("messages");

    // Remove any existing listeners
    messagesRef.off("value");

    messagesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        chatOutput.innerHTML = ""; // Clear the chat output
        for (const key in data) {
            const messageData = data[key];
            addMessageToChat(messageData.sender, messageData.message);
        }
    });
}

loadChatHistory();
*/







