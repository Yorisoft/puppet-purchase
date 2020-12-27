var date = new Date();
var timeStamp = `${date.getMonth()}-${date.getDay()}_${date.getTime()}`;
const myemail = '';    // Enter email. ex - const myemail = 'myEmail@email.com';
const mypassw = '';    // Enter password. ex - const mypassw = 'password';
const myloc = ''; // Enter zip code. ex - const myloc = '01234';
const mycvv = '';    // Enter payment cvv. ex - const mycvv = '123';
const listingURL = ''
let snapShotPath =
  '${workspaceFolder}../../record/screen_shots/target/' +
  `${timeStamp}`;

module.exports = {
    myemail,
    mypassw,
    myloc,
    mycvv,
    listingURL,
    snapShotPath,
  }