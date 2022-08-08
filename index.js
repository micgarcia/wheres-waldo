/*
  -Create large div containing the image
  -Create function that takes the coordinates of the spot the user clicks on
    -This function should also create a DOM element that allows the user to select
      which character they think they found
    -When the character on the DOM element is clicked, should communicate with backend
      database to see if its correct
  -Will need to setup firebase database containing information about the name and
    coordinates of each of the three characters to find
  -If the clicked coord/character matches the database, mark one of the characters of the
    list, otherwise give error feedback
  -Create function that has timer that starts when page loads then stops when all 3
    characters are found, then displays that time to user
  -Allow user to enter name, then send information to firebase database
*/

const printMousePos = (e) => {
  const header = document.getElementById('header');
  header.textContent =
    "clientX: " + e.clientX +
    " - clientY: " + e.clientY;
}

const getCoord = () => {
  const image = document.getElementById('mainImg');
  image.addEventListener('click', printMousePos);
}

getCoord();