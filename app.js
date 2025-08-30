// Firebase initialization
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Send message function
function sendMessage() {
  const msg = document.getElementById("message").value;
  const nick = document.getElementById("nickname").value || "Anonymous";

  if(msg.trim() === "") return;

  db.collection("messages").add({
    nickname: nick,
    text: msg,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("message").value = "";
}

// Real-time listener
db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot(snapshot => {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      chatbox.innerHTML += `<p><strong>${data.nickname}:</strong> ${data.text}</p>`;
    });
  });