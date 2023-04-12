// Your Firebase config object
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


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
async function fetchData() {
    const dbRef = firebase.database().ref();
    const snapshot = await dbRef.once("value");
    return snapshot.val();
}

function createTreeElement(data, key = "") {
    const container = document.createElement("div");
    container.classList.add("node");

    const header = document.createElement("div");
    header.classList.add("node-header");

    // Check if the current node has a message, sender, and timestamp
    const hasMessageData = typeof data === "object" && data !== null && data.message && data.sender && data.timestamp;

    if (hasMessageData) {
        header.innerHTML = `
      <strong>${key}:</strong> ${data.message}<br>
      <small>Sender: ${data.sender}</small><br>
      <small>Timestamp: ${data.timestamp}</small>
    `;
    } else {
        header.textContent = key || "Root";
    }

    container.appendChild(header);

    if (typeof data === "object" && data !== null && !hasMessageData) {
        const childrenContainer = document.createElement("div");
        childrenContainer.classList.add("node-children");

        for (const [childKey, childData] of Object.entries(data)) {
            const childWrapper = document.createElement("div"); // New child wrapper
            childWrapper.classList.add("child-wrapper");

            const childElement = createTreeElement(childData, childKey);
            childWrapper.appendChild(childElement); // Append child element to the child wrapper
            childrenContainer.appendChild(childWrapper); // Append the child wrapper to the children container
        }

        container.appendChild(childrenContainer);
    }

    header.addEventListener("click", () => {
        const children = container.querySelector(".node-children");
        if (children) {
            children.classList.toggle("expanded");
        }
    });

    return container;
}



async function displayData() {
    const data = await fetchData();
    const treeElement = createTreeElement(data);
    const visualizer = document.getElementById("db-visualizer");
    visualizer.appendChild(treeElement);
}

displayData();