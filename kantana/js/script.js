document.addEventListener('DOMContentLoaded', toggleBar);
window.addEventListener('resize', toggleBar);

function toggleBar() {
    const btnRefresh = document.querySelector('.btnRefresh');
    const btnRefresh2 = document.querySelector('.btnRefresh2');
    const btnNextSong2 = document.querySelector('.btnNextSong2');
    const btnNextSong = document.querySelector('.btnNextSong');
    const mainContent = document.querySelector('.mainContent');
    const sidebar = document.getElementById('sidebar');
    const bodyContent = document.getElementById('bodyContent');
    const player = document.querySelector('#player');
    const playerContainer = document.querySelector('#playerContainer');
    const bottom = document.querySelector('#bottom');
    const style = document.createElement("style");
    const sessionType = localStorage.getItem("type");
    if (window.innerWidth <= 1200) {
        mainContent.classList.add('flex-col');
        bodyContent.classList.add('w-full', 'order-1');

        if (sessionType === 'joiner') {
            bodyContent.classList.add('h-full');
        }

        sidebar.classList.add('w-full', 'order-2');
        player.style.height = '500px';
        playerContainer.style.height = '500px';
        bottom.classList.remove('hidden');
        style.innerHTML = `
                .scroll::-webkit-scrollbar {
                    display: none;
                }`;
        document.head.appendChild(style);

        btnNextSong.classList.remove('hidden');
        btnNextSong2.classList.add('hidden');

        btnRefresh.classList.remove('hidden');
        btnRefresh2.classList.add('hidden');

    } else {
        btnNextSong.classList.add('hidden');
        btnNextSong2.classList.remove('hidden');

        btnRefresh.classList.add('hidden');
        btnRefresh2.classList.remove('hidden');

        mainContent.classList.remove('flex-col');
        bodyContent.classList.remove('w-full', 'order-1');
        sidebar.classList.remove('w-full', 'order-2');
        player.removeAttribute('style');
        playerContainer.removeAttribute('style');
        bottom.classList.add('hidden');

        document.querySelectorAll("style").forEach(style => {
            if (style.innerHTML.includes(".scroll::-webkit-scrollbar")) style.remove();
        });
    }

    if (window.innerWidth <= 600) {
        player.style.height = '300px';
        playerContainer.style.height = '300px';
    }

    // Hide it on page load
    bottom.classList.add("hidden");

    window.addEventListener("scroll", () => {
        bottom.classList.toggle("hidden", window.scrollY <= 50);
    });

}

const btnFullScreen = document.getElementById("btnFullScreen");
const screen = document.getElementById("screen");
btnFullScreen.addEventListener("click", () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        screen.textContent = "fullscreen";
    } else {
        document.documentElement.requestFullscreen();
        screen.textContent = "fullscreen_exit";
    }
});

const codeElement = document.getElementById("code");
codeElement.addEventListener("click", () => {
    copyCode("Code copied to clipboard: ", codeElement.textContent.trim());
});


const share = document.getElementById("btnShare");
share.addEventListener("click", () => {
    copyCode("Link Copied to clipboard: ", "http://oikantana.22web.org");
});

function copyCode(msg, text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    new ShowMessage("success", msg + text).showToast();
}



