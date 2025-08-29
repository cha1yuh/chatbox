// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqILLxx2JAxstJ9LRIiqgFDWUTvAx4ZVs",
  authDomain: "chatbox-3c95d.firebaseapp.com",
  projectId: "chatbox-3c95d",
  storageBucket: "chatbox-3c95d.firebasestorage.app",
  messagingSenderId: "385714577506",
  appId: "1:385714577506:web:9308dc98ed8de92d00713b",
  measurementId: "G-EL7MCQSTYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 1️⃣ Firebase snippet (from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyCqILLxx2JAxstJ9LRIiqgFDWUTvAx4ZVs",
  authDomain: "chatbox-3c95d.firebaseapp.com",
  projectId: "chatbox-3c95d",
  storageBucket: "chatbox-3c95d.firebasestorage.app",
  messagingSenderId: "385714577506",
  appId: "1:385714577506:web:9308dc98ed8de92d00713b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Firestore database

// 2️⃣ Chat code starts here
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