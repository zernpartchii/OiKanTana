import { Firebase } from './firebaseSetup.js';
const sessionCode = localStorage.getItem("sessionCode");
const sessionType = localStorage.getItem("type");
const firebase = new Firebase(sessionCode);

if (sessionCode && sessionType) {
    checkType(sessionType);
    if (await firebase.verifySessionCode(sessionType)) {
        returnBack();
    }
} else {
    returnBack();
}

function returnBack() {
    new ShowMessage("error", `Code (${sessionCode}) is Invalid!`)
        .showToastOK().then((confirmed) => {
            if (confirmed) {
                firebase.removeItem();
                window.location.href = "../../"; // Redirect if invalid
            }
        });
}

function checkType(type) {
    const sidebar = document.querySelector('#sidebar');
    const creatorPlayer = document.querySelector('.creatorPlayer');
    const joinerPlayer = document.querySelector('.joinerPlayer');
    const mainContent = document.querySelector('.mainContent');
    const bodyContent = document.querySelector('#bodyContent');
    if (type === 'joiner') {
        mainContent.classList.add('justify-center');
        sidebar.classList.add('hidden');
        creatorPlayer.classList.add('hidden');
        joinerPlayer.classList.remove('hidden');
        bodyContent.classList.remove('w-3/4');
        bodyContent.classList.add('w-2/4');
    }
}

document.getElementById('btnLogout').addEventListener('click', () => {
    new ShowMessage("warning", "Hey " + username + "! \nAre you sure you want to exit?")
        .showWarning("center")
        .then((confirmed) => {
            if (confirmed) {
                if (sessionType === 'creator') {
                    firebase.removeItem();
                    firebase.deleteUser(sessionCode);
                } else {
                    firebase.removeItem();
                    window.location.href = "../../"; // Redirect if invalid
                }
            }
        });
});
