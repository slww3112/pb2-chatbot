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

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.toggle("dark-mode");
});
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

function generateChatbotResponse(message) {
    message = message.toLowerCase();
    let response = '';

    if (message.includes('hello') || message.includes('hi')) {
        response = 'Hello! How can I help you today?';
    } else if (message.includes('how are you')) {
        response = "I'm doing well, thank you! How can I help you?";
    } else if (message.includes('what is your name')) {
        response = "I'm a simple chatbot. How can I assist you?";
    } else if (message.includes('thank you')) {
        response = "You're welcome! Let me know if you have any more questions.";
    } else {
        response = "I'm not sure how to respond to that. Can you please rephrase your question?";
    }

    return response;
}

function getFormattedDateAndTime() {
    const now = new Date();
    const timeZone = 'Etc/GMT-2'; // Set the timezone to GMT+2

    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const formattedDate = dateFormatter.format(now);
    const formattedTime = timeFormatter.format(now);

    return `${formattedDate} ${formattedTime}`;
}
async function processUserMessage(message) {
    const messageRef = firebase.database().ref("messages");
    const newMessageRef = messageRef.push();
    await newMessageRef.set({
        sender: "User",
        message: message,
        timestamp: getFormattedDateAndTime(),
    });

    // Use the generateChatbotResponse function to get a response
    const response = generateChatbotResponse(message);

    const newResponseRef = messageRef.push();
    await newResponseRef.set({
        sender: "Chatbot",
        message: response,
        timestamp: getFormattedDateAndTime(),
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







