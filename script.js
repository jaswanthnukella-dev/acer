// Dummy Student Data
const students = {
    "25A81A05M1": {
        name: "Jaswanth",
        attendance: 72,
        tasks: "Submit DBMS Assignment",
        nextClass: "Maths at 10:00 AM"
    },
    "25A81A05M2": {
        name: "Rahul",
        attendance: 85,
        tasks: "Lab Record Pending",
        nextClass: "Physics at 11:00 AM"
    }
};

let currentStudent = null;

function login() {
    let roll = document.getElementById("roll").value.trim();

    if (students[roll]) {
        currentStudent = students[roll];

        document.getElementById("loginBox").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

        document.getElementById("studentName").innerText =
            "Welcome " + currentStudent.name;

        document.getElementById("attendance").innerText =
            currentStudent.attendance + "%";

        document.getElementById("tasks").innerText =
            currentStudent.tasks;

        document.getElementById("nextClass").innerText =
            currentStudent.nextClass;

        // Attendance Warning
        if (currentStudent.attendance < 75) {
            alert("⚠️ Low Attendance Warning!");
        }

    } else {
        alert("Invalid Roll Number");
    }
}

function logout() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

// Chatbot
function sendMessage() {
    let input = document.getElementById("userInput").value.toLowerCase();
    let chat = document.getElementById("chat");

    if (!input) return;

    let reply = generateReply(input);

    chat.innerHTML += `<p>🧑: ${input}</p>`;
    chat.innerHTML += `<p>🤖: ${reply}</p>`;

    document.getElementById("userInput").value = "";
    chat.scrollTop = chat.scrollHeight;
}

// Smart reply generator
function generateReply(input) {

    // Greetings
    if (input.match(/hi|hello|hey/)) {
        return "Hey " + currentStudent.name + " 👋 How can I help you?";
    }

    // Attendance
    if (input.match(/attendance|percent|percentage/)) {
        if (currentStudent.attendance < 75) {
            return `⚠️ Your attendance is ${currentStudent.attendance}%. You need to improve!`;
        }
        return `✅ Your attendance is ${currentStudent.attendance}% — you're safe!`;
    }

    // Tasks / Assignments
    if (input.match(/task|assignment|submit|homework|work/)) {
        return `📌 You need to: ${currentStudent.tasks}`;
    }

    // Next class
    if (input.match(/next|class|schedule|when/)) {
        return `⏰ Your next class is ${currentStudent.nextClass}`;
    }

    // Motivation
    if (input.match(/motivate|tired|lazy/)) {
        return "💪 Stay focused! Small efforts daily = big success 🚀";
    }

    // Default
    return "🤔 I'm not sure, try asking about attendance, tasks, or next class.";
}
function startVoice() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = "en-US";

    recognition.onresult = function(event) {
        let voiceText = event.results[0][0].transcript;
        document.getElementById("userInput").value = voiceText;
        sendMessage();
    };

    recognition.start();
}