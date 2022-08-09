/*
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


const checkChoice = async (e, coordX, coordY) => {
  const targetName = e.target.innerText.toLowerCase();
  const docRef = doc(db, "game", "characters");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();


  const left = data[targetName].box.left;
  const right = data[targetName].box.right;
  const top = data[targetName].box.top;
  const bottom = data[targetName].box.bottom;

  if (coordX > left && coordX < right && coordY > top && coordY < bottom) {
    console.log('found: ' + targetName);
    handlePick(targetName, coordX, coordY);
  } else {
    handlePick('wrong', coordX, coordY);
  }
}

const handlePick = (result, coordX, coordY) => {
  if (result === 'wrong') {
    const errMsg = document.createElement('div');
    errMsg.style.display = "block";
    errMsg.style.position = 'absolute';
    errMsg.style.left = coordX + "px";
    errMsg.style.top = coordY + "px";
    errMsg.innerText = "Incorrect!";
    errMsg.style.color = 'red';
    errMsg.style.fontSize = '22px';
    errMsg.style.fontWeight = 'bold';
    errMsg.style.backgroundColor = 'rgba(249, 249, 249, 0.7)';
    document.body.appendChild(errMsg);
    setTimeout(() => {
      errMsg.style.display = 'none';
    }, 3000);
  } else {
    const target = document.getElementById(result);
    target.style.opacity = 0.4;

    const corMsg = document.createElement('div');
    corMsg.style.display = "block";
    corMsg.style.position = 'absolute';
    corMsg.style.left = coordX + "px";
    corMsg.style.top = coordY + "px";
    corMsg.innerText = "Correct";
    corMsg.style.color = 'green';
    corMsg.style.fontSize = '22px';
    corMsg.style.fontWeight = 'bold';
    corMsg.style.backgroundColor = 'rgba(249, 249, 249, 0.7)';
    document.body.appendChild(corMsg);
    setTimeout(() => {
      corMsg.style.display = 'none';
    }, 3000);
  }
  const waldo = document.getElementById('waldo');
  const odlaw = document.getElementById('odlaw');
  const wizard = document.getElementById('wizard');

  if (waldo.style.opacity === '0.4' && waldo.style.opacity === '0.4' && wizard.style.opacity === '0.4') {
    endGame();
  }
}

const endGame = () => {

}

const displayChoices = (e) => {
  if (document.getElementById('choicesMenu').style.display == "block") {
    hideMenu();
  } else {
    const coordY = e.pageY;
    const coordX = e.pageX;
    let menu = document.getElementById("choicesMenu");
    menu.style.display = "block";
    menu.style.position = "absolute";
    menu.style.left = coordX + "px";
    menu.style.top = coordY + "px";

    document.getElementById('waldoChoice').addEventListener('click', (e) => {
      menu.style.display = "none";
      checkChoice(e, coordX, coordY);
    });
    document.getElementById('odlawChoice').addEventListener('click', (e) => {
      menu.style.display = "none";
      checkChoice(e, coordX, coordY);
    });
    document.getElementById('wizardChoice').addEventListener('click', (e) => {
      menu.style.display = "none";
      checkChoice(e, coordX, coordY);
    });



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
