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

// Simple hash function for demonstration (not secure for production)
function hash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash.toString();
}

// Sign Up
function signup() {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value;

  if (!username || !password) {
    alert("Please enter a username and password!");
    return;
  }

  if(username.toLowerCase() === "anonymous") {
    alert("You cannot use 'Anonymous' as a username!");
    return;
  }

  const hashedPassword = hash(password);

  db.collection('users').doc(username).get().then(doc => {
    if(doc.exists) {
      alert("Username already taken!");
    } else {
      db.collection('users').doc(username).set({ password: hashedPassword });
      sessionStorage.setItem('nickname', username);
      window.location.href = 'index.html';
    }
  });
}

// Login
function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  if(!username || !password) {
    alert("Please enter username and password!");
    return;
  }

  const hashedPassword = hash(password);

  db.collection('users').doc(username).get().then(doc => {
    if(doc.exists) {
      if(doc.data().password === hashedPassword) {
sessionStorage.setItem('nickname', username);
        window.location.href = 'index.html';
      } else {
        alert("Incorrect password!");
      }
    } else {
      alert("Username not found!");
    }
  });
}
