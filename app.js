// Initialize Firebase (your real project config)
const firebaseConfig = {
  apiKey: "AIzaSyCqILLxx2JAxstJ9LRIiqgFDWUTvAx4ZVs",
  authDomain: "chatbox-3c95d.firebaseapp.com",
  projectId: "chatbox-3c95d",
  storageBucket: "chatbox-3c95d.firebasestorage.app",
  messagingSenderId: "385714577506",
  appId: "1:385714577506:web:9308dc98ed8de92d00713b"
};

// Initialize compat Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Send message
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

// Real-time listener for messages
db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot(snapshot => {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      chatbox.innerHTML += `<p><strong>${data.nickname}:</strong> ${data.text}</p>`;
    });
    // Scroll to the bottom automatically
    chatbox.scrollTop = chatbox.scrollHeight;
  });