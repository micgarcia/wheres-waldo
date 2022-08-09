/*
  -Figure out how to access data from Firestore
  -when spot is clicked, and choice is clicked then check to see
    if the choice name matches the database name if the clicked coord
    is within the box data in database
  -If database data matches, then gray out the character at the top
    -also change database found value to true
  -If database data doesn't match, then give message
  -Check if all 3 characters are found (from db data)
    -If so, give victory message and show their time
    -Let them type in their name, save their input to db
*/

import {initializeApp} from 'firebase/app';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import './styles.css';
import './assets/odlaw.jpg';
import './assets/waldo.png';
import './assets/wizard.gif';

const firebaseConfig = {
  apiKey: "AIzaSyBXICJ2jEBL0H2JiBGAw1jf5pCfX_u7YvY",
  authDomain: "wheres-waldo-36ef1.firebaseapp.com",
  projectId: "wheres-waldo-36ef1",
  storageBucket: "wheres-waldo-36ef1.appspot.com",
  messagingSenderId: "388343765969",
  appId: "1:388343765969:web:73e2a19db4f4f94ae21ef0"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const getData = async () => {
  const docRef = doc(db, "game", "characters");
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
}
getData();

/*
const displayChoices = (e) => {
  if (document.getElementById('choicesMenu').style.display == "block") {
    hideMenu();
  } else {
    let menu = document.getElementById("choicesMenu");
    //menu.style.display = "block";
    menu.style.position = "absolute";
    menu.style.left = e.pageX + "px";
    console.log('x: ' + e.pageX);
    console.log('y: ' + e.pageY);
    menu.style.top = e.pageY + "px";
  }
}

const hideMenu = (e) => {
  document.getElementById('choicesMenu').style.display = "none";
}

const getCoord = () => {
  const image = document.getElementById('mainImg');
  image.addEventListener('click', displayChoices);
}

getCoord();
*/