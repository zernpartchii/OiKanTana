import { Firebase } from "./firebaseSetup.js";

Swal.fire({
    title: 'Processing songs...',
    html: 'Please wait...',
    allowOutsideClick: false,
    background: "#1E1E1E",
    color: "#FFFFFF",
    didOpen: () => {
        Swal.showLoading();
    }
});

export class SongManager {

    constructor() {
        this.songlist = [];
        this.playlist = [];
        this.prevlist = [];
    }

    async fetchSongs() {
        songManager.songlist = await firebase.getAllSongs();
        this.addSonglist();
        await firebase.updateSonglistNumber(this.songlist.length);
    }

    async refresh() {

        firebase.readVideoID();
        youtube.resumeVideo();

        // Re fetch for search accuracy
        const songLength = document.querySelector('.songlist').textContent;
        if (songManager.songlist.length != songLength) {
            await songManager.fetchSongs();
        }
    }

    setPlaylist(playlist) {
        songManager.playlist = playlist;
        youtube.checkIfPlaying();
    }

    setPrevlist(prevlist) {
        songManager.prevlist = prevlist;
    }

    getPlaylist() {
        return songManager.playlist;
    }

    validateLink(url) {
        let match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*[?&]v=|shorts\/))([^&?/]+)/);
        if (match && match[1].length === 11) {
            return match[1]; // Valid YouTube video ID
        }
        return null; // Invalid or missing video ID
    }

    checkSong(list, videoId) {
        return list.find(song => song && song.videoId && song.videoId === videoId);
    }

    async addNewSong() {
        const { value: result } = await Swal.fire({
            position: "top-start",
            background: "#1E1E1E", // dark gray/black background
            color: "#FFFFFF", // white text
            title: "🎵 Add New Song",
            input: "textarea",
            inputLabel: "Paste YouTube links below — one per line.\nNeed help? Search directly on YouTube and paste the link here.",
            inputValue: '',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value.trim()) {
                    return "Please enter the video link!";
                }
            }
        });
        if (result) {
            const links = result
                .split('\n')
                .map(link => link.trim())
                .filter(link => link.length > 0);

            for (const link of links) {
                const videoId = this.validateLink(link);
                if (videoId === null) {
                    await new ShowMessage("error", `Invalid video link: ${link}`).showToastOK();
                    continue;
                }

                await firebase.createVideoId(videoId, "Songlist");
            }

            await songManager.fetchSongs();
        }
    }

    async addSonglist(songlist = songManager.songlist) {
        // Set up the container header
        const containerHeader = uiManager.itemContainer("Songlist", songlist);

        // Sort the list before iterating
        songlist.sort((a, b) => a.title.localeCompare(b.title));

        // Build one large string for the songlist contents
        let htmlSonglist = '';
        songlist.forEach((song, i) => {
            const songlistclass = uiManager.songlistClass();
            htmlSonglist += uiManager.template({
                counter: i,
                ...song,
                ...songlistclass
            });
        });

        // Update the containers with one DOM write each
        songlistItems.innerHTML = containerHeader + htmlSonglist;
        songlistItemsJoiner.innerHTML = containerHeader + htmlSonglist;

        // Update the counts if needed
        songlistJoiner.innerHTML = songlist.length || 0;
        document.querySelector('.songlist').innerHTML = songlist.length || 0;
    }

    async addPlaylistSong(getSong) {
        const checkSongIfExist = this.checkSong(songManager.playlist, getSong.videoId);
        // Handle Enter & Escape keys
        const handleKeyPress = async (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.updatePlaylist(getSong);
                cleanupListeners();
            } else if (event.key === "Escape") {
                event.preventDefault();
                new ShowMessage("info", "Song addition canceled.").showToast();
                cleanupListeners();
            }
        };

        // Remove event listener after execution
        const cleanupListeners = () => {
            document.removeEventListener("keydown", handleKeyPress);
        };

        document.addEventListener("keydown", handleKeyPress, { once: true });

        if (checkSongIfExist) {
            new ShowMessage("warning", getSong.title + ' is already in the playlist. <br><br> Do you want to add it again?')
                .showWarning()
                .then((confirmed) => {
                    if (confirmed) {
                        this.updatePlaylist(getSong);
                    }
                    cleanupListeners();
                });
        } else {
            this.updatePlaylist(getSong);
            cleanupListeners();
        }
    }

    async updatePlaylist(getSong) {
        const sessionCode = localStorage.getItem("sessionCode");
        await firebase.createVideoId(getSong.videoId, 'Codes/' + sessionCode + "/Playlist", "~" + username);
        new ShowMessage("success", `${getSong.title} has been added to the playlist.`).showToast();
    }

    readPlaylist(playlist = songManager.playlist) {
        // Build container header for Playlist
        const containerHeader = uiManager.itemContainer("Playlist", playlist);

        // Build the HTML string for all songs
        let htmlPlaylist = '';
        playlist.forEach((song, i) => {
            const playlistClass = uiManager.playlistClass();
            htmlPlaylist += uiManager.template({
                counter: i,
                ...song,
                ...playlistClass
            });
        });

        // Update both containers in one DOM write each
        playlistItems.innerHTML = containerHeader + htmlPlaylist;
        playlistItemsJoiner.innerHTML = containerHeader + htmlPlaylist;

        // Update the displayed current and next songs
        if (playlist.length !== 0) {
            currentSong.innerHTML = playlist[0].title + `<i class="text-yellow-400 capitalize"> | Selected By: ${playlist[0].selectedBy}</i>`;
        } else {
            currentSong.innerHTML = "None";
        }
        if (playlist.length > 1) {
            nextSong.innerHTML = playlist[1].title + `<i class="text-yellow-400 capitalize"> | Selected By: ${playlist[1].selectedBy}</i>`;
        } else {
            nextSong.innerHTML = "None";
        }

        // Update the playlist count displays
        playlistJoiner.innerHTML = playlist.length || 0;
        document.querySelector('.playlist').innerHTML = playlist.length || 0;
    }

    deletePlaylistSong(delSong) {
        const getSong = this.checkSong(songManager.playlist, delSong.videoId);
        getSong.selectedBy = username;
        const deleteSong = delSong.index;
        if (deleteSong === -1) {
            new ShowMessage("error", "Song not found in the playlist.").showToast();
            return;
        }

        // Handle Enter & Escape keys
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                this.deleteSongByIndex(deleteSong, getSong);
                cleanupListeners();
            } else if (event.key === "Escape") {
                new ShowMessage("info", "Song deletion canceled.").showToast();
                cleanupListeners();
            }
        };

        // Remove event listener after execution
        const cleanupListeners = () => {
            document.removeEventListener("keydown", handleKeyPress);
        };

        document.addEventListener("keydown", handleKeyPress, { once: true });

        new ShowMessage("warning", getSong.title + '<br><br> Do you want to delete it?')
            .showWarning()
            .then((confirmed) => {
                if (confirmed) {
                    this.deleteSongByIndex(deleteSong, getSong);
                }
                cleanupListeners();
            });
    }

    deleteSongByIndex(index, song) {
        this.updatePrevlist(index, song);
        if (songManager.playlist.length === 1) {
            this.readPlaylist([]);
        }
        new ShowMessage("success", "Song deleted from playlist.").showToast();
    }

    async updatePrevlist(index, song) {
        const sessionCode = localStorage.getItem("sessionCode");
        await firebase.deleteVideoID(song.videoId + "~" + song.selectedBy, 'Codes/' + sessionCode + "/Playlist", index);
        const checkSonfIfExist = this.checkSong(songManager.prevlist, song.videoId);
        if (!checkSonfIfExist) {
            await firebase.createVideoId(song.videoId, 'Codes/' + sessionCode + "/Prevlist");
        }
    }

    readPrevlist(prevlist = songManager.prevlist) {
        // Build the container header HTML
        const containerHeader = uiManager.itemContainer("Previous Songs", prevlist);

        // Build a single HTML string for all previous songs
        let htmlPrevlist = '';
        prevlist.forEach((song, i) => {
            const prevlistClass = uiManager.prevlistClass();
            htmlPrevlist += uiManager.template({
                counter: i,
                ...song,
                ...prevlistClass
            });
        });

        // Update both containers in one DOM write each
        prevlistItems.innerHTML = containerHeader + htmlPrevlist;
        prevlistItemsJoiner.innerHTML = containerHeader + htmlPrevlist;

        // Update count displays
        const count = songManager.prevlist.length || 0;
        prevlistJoiner.innerHTML = count;
        document.querySelector('.prevlist').innerHTML = count;
    }

    searchSong(query) {
        function filterAndRender(list, container, itemContainer, attr) {
            if (list.length == 0) return; // Prevent searching when all are empty

            // Pre-calculate lower-case query once.
            const lowerQuery = query.toLowerCase();

            // Filter and build HTML string
            const html = list
                .filter(song => song && song.title && song.title.toLowerCase().includes(lowerQuery))
                .map((song, i) => uiManager.template({
                    counter: i,
                    ...song,
                    ...attr
                }))
                .join('');

            // Set container content in one operation
            container.innerHTML = itemContainer + html;
        }

        const sessionType = localStorage.getItem('type');
        if (sessionType === 'creator') {
            filterAndRender(songManager.songlist, songlistItems, uiManager.itemContainer("Songlist", songManager.songlist), uiManager.songlistClass());
            filterAndRender(songManager.playlist, playlistItems, uiManager.itemContainer("Playlist", songManager.playlist), uiManager.playlistClass());
            filterAndRender(songManager.prevlist, prevlistItems, uiManager.itemContainer("Previous Songs", songManager.prevlist), uiManager.prevlistClass());
        } else {
            filterAndRender(songManager.songlist, songlistItemsJoiner, uiManager.itemContainer("Songlist", songManager.songlist), uiManager.songlistClass());
            filterAndRender(songManager.playlist, playlistItemsJoiner, uiManager.itemContainer("Playlist", songManager.playlist), uiManager.playlistClass());
            filterAndRender(songManager.prevlist, prevlistItemsJoiner, uiManager.itemContainer("Previous Songs", songManager.prevlist), uiManager.prevlistClass());
        }
    }

    nextSong() {
        if (songManager.playlist.length !== 0) {
            this.updatePrevlist(0, songManager.playlist.shift());
            if (songManager.playlist.length === 0) {
                this.readPlaylist([]);
                youtube.stopVideoPlaying();
                document.querySelector('.playlist').innerHTML = 0;
            } else {
                youtube.playNextVideo();
                songManager.readPlaylist();
                new ShowMessage("success", "Now playing the next song! 😊").showToast();
            }
        } else {
            document.querySelector('.currentSong').innerHTML = "None";
            youtube.stopVideoPlaying();
            new ShowMessage("info", "No available song in the playlist. 😊").showToast();
        }
    }

}

class UIManager {
    template(song) {
        const safeTitle = song.title || 'Untitled';
        return `<div class="flex flex-row items-center gap-3 p-3 song border-b border-gray-600">
                    <div>${song.counter + 1}. </div>
                    <div class="text-sm capitalize">${this.capitalizeWords(safeTitle)} 
                        <br><i class="text-cyan-500">Channel by: ${song.channel}</i>
                        <br>${song.btnName === 'Delete' ? `<i class="text-yellow-400">Selected By: ${song.selectedBy === username ? 'You' : song.selectedBy}</i>` : ''}
                    </div> 
                    <button class="text-sm flex flex-row gap-2 rounded-lg p-2 px-3 hover:${song.hover} ms-auto ${song.classlist} 
                    ${(song.btnName === 'Delete' && song.counter === 0) || (song.btnName === 'Delete' && song.selectedBy != username) ? 'hidden' : ''}" 
                    data-video-id='${safeTitle.replace(/'/g, "&#039;")}~~${song.videoId}~~${song.counter}'>
                        ${song.btnName + "~" + song.duration}
                    </button>
                </div>`;
    }

    capitalizeWords(str) {
        if (typeof str !== 'string' || !str) return '';
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }

    itemContainer(title, list) {
        return `<h1 class="text-2xl text-center border-b border-gray-600 p-3">${title}</h1>
                    <p class="text-white text-center text-2xl mt-5 ${list.length != 0 ? 'hidden' : ''}">No Available Songs</p>`
    }

    videoTemplate() {
        return `
            <div class="btn rounded-lg text-white h-full flex flex-col gap-3 justify-center items-center">
                <p class="text-3xl font-semibold">Oi Kantana</p>
                <img src="https://cdn0.iconfinder.com/data/icons/digital-marketing-2-12/50/163-64.png" width="150">
            </div>`
    }

    songlistClass() {
        return {
            hover: "bg-yellow-500",
            btnName: "Play",
            classlist: "btnAddSong text-black bg-yellow-600"
        }
    }

    playlistClass() {
        return {
            hover: "bg-red-800",
            btnName: "Delete",
            classlist: "btnDeleteSong text-white bg-red-900"
        }
    }

    prevlistClass() {
        return {
            hover: "bg-orange-700",
            btnName: "Replay",
            classlist: "btnAddSong text-white bg-orange-800"
        }
    }
}

export class YouTubePlayer {
    constructor() {
        this.playerId = 'player';
        this.player = null;
        this.currentSong = [];
        this.loadYouTubeAPI();
    }

    loadYouTubeAPI() {
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        const sessionType = localStorage.getItem('type');
        sessionType === 'creator' ? window.onYouTubeIframeAPIReady = () => this.initPlayer() : '';
    }

    initPlayer() {
        // console.log("YouTube API Ready, initializing player..."); 
        const savedVideoId = this.currentSong.currentVideoId || localStorage.getItem("currentVideoId");
        const savedTime = this.currentSong.videoTime || localStorage.getItem("videoTime");
        const sessionType = localStorage.getItem('type');
        const controls = sessionType === 'creator' ? 1 : 0;
        this.player = new YT.Player(this.playerId, {
            videoId: savedVideoId,
            playerVars: { 'autoplay': 0, 'mute': 0, 'controls': controls }, // Mute to allow autoplay
            events: {
                'onReady': (event) => this.onPlayerReady(event, savedTime),
                'onStateChange': (event) => this.onPlayerStateChange(event),
                'onError': (event) => this.onPlayerError(event),  // Handle errors
            }
        });
    }

    onPlayerError(event) {
        console.log("YouTube Player Error:", event.data);
        // youtube.hidePlayer();
    }

    onPlayerReady(event, savedTime) {
        // Force show the player UI
        if (songManager.playlist.length > 0) {
            youtube.hidePlayer();

            if (savedTime > 0) {
                event.target.seekTo(savedTime); // Resume from saved time
            }

            event.target.playVideo();

            // Save current playback time every second
            setInterval(() => {
                if (this.player && this.player.getCurrentTime()) {
                    const sessionType = localStorage.getItem('type') || "";
                    sessionType == 'creator' ? this.saveCurrentSong() : ""; // Resume video immediately;
                }
            }, 1000);

        } else {
            this.stopVideoPlaying();
        }
    }

    onPlayerStateChange(event) {
        // console.log("Player state changed:", event.data);
        const sessionType = localStorage.getItem('type') || "";
        if (event.data === YT.PlayerState.ENDED) {
            songManager.nextSong();
        }

        if (event.data === YT.PlayerState.PLAYING) {
            sessionType == 'creator' ? this.saveCurrentSong() : ""; // Resume video immediately;
        }
    }

    async saveCurrentSong() {
        if (songManager.playlist.length > 0) {
            let currentVideoId = songManager.playlist[0].videoId;
            let videoTime = this.player.getCurrentTime() || 0;
            await firebase.updateVideoState({ currentVideoId: currentVideoId, videoTime: videoTime });
            console.log('Code: ' + this.currentSong.currentVideoId, 'Time: ' + this.currentSong.videoTime);
        }
    }

    setCurrentSong(currentSong) {
        youtube.currentSong = currentSong;
    }

    playNextVideo() {
        if (this.player && typeof this.player.loadVideoById === 'function') {
            // console.log(`Forcing play of ${videoId}...`); 
            if (songManager.playlist.length > 0) {
                this.player.loadVideoById(songManager.playlist[0].videoId);
                this.player.playVideo();
                youtube.hidePlayer();
            }
        }
    }

    checkIfPlaying() {
        if (this.player && typeof this.player.getPlayerState === 'function') {
            const state = this.player.getPlayerState();
            if (state === YT.PlayerState.UNSTARTED) {
                // console.log("Video is not playing. Trying to resume..."); 
                this.playNextVideo();
            }
        }
    }

    resumeVideo() {
        if (this.player && typeof this.player.playVideo === 'function') {
            // console.log("Resuming video..."); 
            this.player.playVideo();
            this.hidePlayer();
        }
    }

    hidePlayer() {
        document.getElementById("playerContainer").classList.add("hidden");
        document.getElementById("player").classList.remove("hidden");
    }

    stopVideoPlaying() {
        if (this.player && typeof this.player.stopVideo === 'function') {
            this.player.loadVideoById('');
            this.player.stopVideo();
            document.getElementById("playerContainer").classList.remove("hidden");
            document.getElementById("player").classList.add("hidden");
        }
    }
}

const firebase = new Firebase();
const youtube = new YouTubePlayer();
const songManager = new SongManager();
const uiManager = new UIManager();

await songManager.fetchSongs();
firebase.readVideoState();
firebase.readVideoID();

setInterval(() => {
    if (songManager.playlist.length === 0) {
        songManager.readPlaylist();
        youtube.stopVideoPlaying();
    }
}, 3000);

// Once complete, close the dialog.
Swal.close();

