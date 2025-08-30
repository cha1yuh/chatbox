
// ✅ Firebase init
const firebaseConfig = {
  apiKey: "AIzaSyCqILLxx2JAxstJ9LRIiqgFDWUTvAx4ZVs",
  authDomain: "chatbox-3c95d.firebaseapp.com",
  projectId: "chatbox-3c95d",
  storageBucket: "chatbox-3c95d.appspot.com",
  messagingSenderId: "385714577506",
  appId: "1:385714577506:web:9308dc98ed8de92d00713b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// ✅ Daily reset (GMT-6)
function clearOldMessages() {
  const now = new Date();
  const today = now.toLocaleDateString("en-US", { timeZone: "America/Belize" });

  const lastClear = localStorage.getItem("lastClear");
  if (lastClear !== today) {
    db.collection("messages").get().then(snapshot => {
      snapshot.forEach(doc => doc.ref.delete());
    });
    localStorage.setItem("lastClear", today);
  }
}
clearOldMessages();

// ✅ Sign in (temporary email/password auth just for demo)
auth.signInAnonymously().catch(console.error);

// ✅ Claim a nickname
async function claimNickname() {
  const user = auth.currentUser;
  const nick = document.getElementById("nickname").value.trim();

  if (!user) {
    alert("You must be signed in.");
    return;
  }
  if (nick === "") {
    alert("Nickname cannot be empty.");
    return;
  }

  const userDoc = db.collection("users").doc(user.uid);
  const existing = await db.collection("users").where("nickname", "==", nick).get();

  if (!existing.empty) {
    alert("Sorry, that nickname is already taken!");
    return;
  }

  await userDoc.set({ nickname: nick });
  alert("Nickname claimed!");
}

// ✅ Send message
async function sendMessage() {
  const user = auth.currentUser;
  if (!user) return;

  const userDoc = await db.collection("users").doc(user.uid).get();
  if (!userDoc.exists) {
    alert("You must claim a nickname first!");
    return;
  }

  const msg = document.getElementById("message").value;
  const nick = userDoc.data().nickname;

  if (msg.trim() === "") return;

  db.collection("messages").add({
    nickname: nick,
    text: msg,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("message").value = "";
}

// ✅ Real-time chat listener
db.collection("messages")
  .orderBy("timestamp", "asc")
  .onSnapshot(snapshot => {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      chatbox.innerHTML += `<p><strong>${data.nickname}:</strong> ${data.text}</p>`;
    });
    chatbox.scrollTop = chatbox.scrollHeight;
  });
