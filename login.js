// Firebase config
firebase.initializeApp({
  apiKey: "AIzaSyCqILLxx2JAxstJ9LRIiqgFDWUTvAx4ZVs",
  authDomain: "chatbox-3c95d.firebaseapp.com",
  projectId: "chatbox-3c95d",
  storageBucket: "chatbox-3c95d.firebasestorage.app",
  messagingSenderId: "385714577506",
  appId: "1:385714577506:web:9308dc98ed8de92d00713b"
});

const db = firebase.firestore();

// Sign Up
function signup() {
  const username = document.getElementById('signup-username').value.trim();
  if(username.toLowerCase() === "anonymous") {
    alert("You cannot use 'Anonymous' as a username!");
    return;
  }

  db.collection('users').doc(username).get().then(doc => {
    if(doc.exists) {
      alert("Username already taken!");
    } else {
      db.collection('users').doc(username).set({username});
      sessionStorage.setItem('nickname', username);
      window.location.href = 'index.html';
    }
  });
}

// Login
function login() {
  const username = document.getElementById('login-username').value.trim();

  db.collection('users').doc(username).get().then(doc => {
    if(doc.exists) {
      sessionStorage.setItem('nickname', username);
      window.location.href = 'index.html';
    } else {
      alert("Username not found!");
    }
  });
}
