import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, get, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { SongManager, YouTubePlayer } from "./songManager.js";

// 🔥 Initialize Firebase with your configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0vFU1ZoNFAIYnSBHYetaXqa-ruo_rAbo",
    authDomain: "myprojects-fa123.firebaseapp.com",
    databaseURL: "https://myprojects-fa123-default-rtdb.firebaseio.com",
    projectId: "myprojects-fa123",
    storageBucket: "myprojects-fa123.firebasestorage.app",
    messagingSenderId: "341438538275",
    appId: "1:341438538275:web:1bcf2cece7362a0fb34796",
    measurementId: "G-7NN0KENB0F"
};

const path = "OiKanTana", pathCodes = "Codes", sessionCode = localStorage.getItem("sessionCode");

let time;

export class Firebase {
    constructor(sessionCode) {
        this.app = initializeApp(firebaseConfig);
        this.db = getDatabase(this.app);
        this.sessionCode = sessionCode;
        this.allSongs = [];
    }

    async fetchTime() {
        const timeRef = ref(this.db, `${path}/Time`);
        onValue(timeRef, async (snapshot) => {
            if (snapshot.exists()) {
                time = snapshot.val();
            } else {
                time = 3;
                await update(ref(this.db, `${path}`), { Time: time });
            }
        });
    }

    async createVideoId(videoId, nameRef, username = '') {
        try {
            if (nameRef === "Songlist") {
                const getSong = await this.getVideoDetails(videoId);
                if (getSong) {
                    switch (getSong.error) {
                        case "not_embeddable":
                            new ShowMessage("error", "Opps! Can't add Song. This video is not embeddable!")
                                .showToastOK().then((confirmed) => {
                                    if (confirmed) {
                                        return;
                                    }
                                });
                            break;
                        case "not_found":
                            new ShowMessage("error", "Opps! Video not found!")
                                .showToastOK().then((confirmed) => {
                                    if (confirmed) {
                                        return;
                                    }
                                });
                            break;
                        case "not_karaoke":
                            new ShowMessage("error", "Opps! Video not karaoke!")
                                .showToastOK().then((confirmed) => {
                                    if (confirmed) {
                                        return;
                                    }
                                });
                            break;
                        case "duplicate":
                            new ShowMessage("info", "The Song is already in the songlist 😊").showToast();
                            break;
                        default:
                            $.ajax({
                                url: "./php/addSongs.php",
                                type: "POST",
                                data: getSong,
                                success: function (response) {
                                    console.log("Server replied:", response);
                                },
                                error: function (xhr, status, error) {
                                    console.error("AJAX error:", error);
                                }
                            });
                            new ShowMessage("success", `${getSong.title} has been added! 😊`).showToast();
                            break;
                    }
                }
            } else {
                const videoRef = ref(this.db, `${path}/${nameRef}`); // Reference to the list
                const snapshot = await get(videoRef);
                let videos = snapshot.exists() ? snapshot.val() : []; // Get existing data or initialize an empty array

                if (!Array.isArray(videos)) videos = []; // Ensure it's an array

                videos.push(videoId + username); // Add new video ID
                await set(videoRef, videos); // Save the updated array
            }

        } catch (error) {
            console.error("⚠️ Error storing video ID:", error);
        }
    }

    async deleteVideoID(videoId, nameRef, index) {
        try {
            const videoRef = ref(this.db, `${path}/${nameRef}`); // Reference to the list
            const snapshot = await get(videoRef);
            if (snapshot.exists()) {
                let videos = snapshot.val(); // Get array  
                if (Array.isArray(videos) && index >= 0 && index < videos.length && videos[index] === videoId) {
                    videos.splice(index, 1); // remove the exact index
                    await set(videoRef, videos);
                }
            } else {
                console.log(`📭 No videos found in "${nameRef}".`);
            }
        } catch (error) {
            console.error("⚠️ Error deleting video ID:", error);
        }
    }

    readVideoID() {
        try {
            const songManager = new SongManager();
            const sessionRefPlay = ref(this.db, `${path}/${pathCodes}/${sessionCode}/Playlist`);
            onValue(sessionRefPlay, (snapshot) => {
                if (snapshot.exists()) {
                    const playlist = [];
                    snapshot.val().forEach((video) => {
                        const [videoId, name] = video.split("~");
                        const originalSong = songManager.checkSong(this.allSongs, videoId);
                        const getSong = {
                            videoId: videoId,
                            ...originalSong,
                            selectedBy: name
                        };
                        playlist.push(getSong);
                    });
                    songManager.setPlaylist(playlist);
                    songManager.readPlaylist(playlist);
                } else {
                    // console.log("📭 No videos found.");
                    songManager.setPlaylist([]);
                }
            });

            const sessionRefPrev = ref(this.db, `${path}/${pathCodes}/${sessionCode}/Prevlist`);
            onValue(sessionRefPrev, (snapshot) => {
                if (snapshot.exists()) {
                    const prevlist = [];
                    snapshot.val().forEach((videoId) => {
                        const getSong = songManager.checkSong(this.allSongs, videoId);
                        prevlist.push(getSong);
                    });
                    songManager.setPrevlist(prevlist);
                    songManager.readPrevlist(prevlist);
                } else {
                    // console.log("📭 No videos found.");
                    songManager.setPrevlist([]);
                }
            });
        } catch (error) {
            console.error("❌ Error from Firebase:", error);
            return [];
        }
    }

    async getAllSongs() {
        try {
            const data = await new Promise((resolve, reject) => {
                $.ajax({
                    url: "./php/readSongs.php",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (xhr, status, error) {
                        reject(error);
                    }
                });
            });
            data.map(song => this.allSongs.push(song));
            return data;
        } catch (error) {
            console.error("⚠️ Error fetching songs:", error);
            return [];
        }
    }

    async getVideoDetails(videoId) {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=${videoId}&key=AIzaSyCtlGuIAwSsaqXMTK5buIytIzslf3NZIGI`;

        try {
            const songManager = new SongManager();
            const checkDuplicateSong = songManager.checkSong(this.allSongs, videoId);

            if (!checkDuplicateSong) {
                const response = await fetch(url);
                const data = await response.json();

                if (data.items.length > 0) {
                    const item = data.items[0];

                    // Check if the video can be embedded
                    if (item.status.embeddable) {
                        const channel = item.snippet.channelTitle;
                        const title = item.snippet.title;
                        const duration = item.contentDetails.duration; // e.g., "PT3M42S"

                        const isLikelyKaraoke = (title) => {
                            const keywords = [
                                "karaoke",
                                "instrumental",
                                "no vocals",
                                "minus one",
                                "videoke"
                            ];

                            return keywords.some(kw => title.toLowerCase().includes(kw));
                        };

                        if (!isLikelyKaraoke(title)) {
                            return { error: "not_karaoke", videoId };
                        }

                        return {
                            videoId: videoId,
                            title: title,
                            duration: this.formatDuration(duration),
                            channel: channel,
                        };

                    } else {
                        // console.warn(`Video ${videoId} is not embeddable.`);
                        return { error: "not_embeddable", videoId };
                    }
                } else {
                    return { error: "not_found", videoId };
                }
            } else {
                return { error: "duplicate", videoId };
            }
        } catch (error) {
            console.error("Error fetching video details:", error);
            return { error: "request_failed", videoId };
        }
    }

    formatDuration(isoDuration) {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
        const [, h, m, s] = isoDuration.match(regex).map(x => parseInt(x) || 0);

        if (h > 0) {
            return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        } else {
            return `${m}:${String(s).padStart(2, '0')}`;
        }
    }

    async createCode(sessionCode) {
        // ✅ Store session in Firebase Realtime Database
        try {
            const startTime = Date.now(); // Get current time (UTC) 
            await set(ref(this.db, `${path}/${pathCodes}/${sessionCode}`), { startTime });
            this.startFirebaseTimer(startTime, sessionCode);
        } catch (error) {
            console.error("❌ Error from Firebase:", error);
        }
    }

    async deleteUser(sessionCode, cleanupMode = false) {
        try {
            const deleteRef = ref(this.db, `${path}/${pathCodes}/${sessionCode}`); // Path to the item
            await remove(deleteRef)
                .then(() => {
                    console.log("✅ Data successfully deleted!");
                    // Only redirect if it's not autoCleanup
                    if (cleanupMode === true) {
                        console.log("🧹 Cleanup completed.");
                        return;
                    };
                    this.removeItem();
                    window.location.href = `../../`;
                })
                .catch((error) => {
                    console.error("⚠️ Error deleting data:", error);
                });
        } catch (error) {
            console.error("⚠️ Error deleting video ID:", error);
        }
    }

    removeItem() {
        localStorage.removeItem("type");
        localStorage.removeItem("username");
        localStorage.removeItem("sessionCode");
        localStorage.removeItem("currentVideoId"); // Reset time
        localStorage.removeItem("videoTime"); // Reset time 
    }

    async verifySessionCode(type, codes = '') {
        try {
            await this.fetchTime();
            const sessionCode = `${type === "autoCleanup" ? codes : this.sessionCode}`;
            const sessionRef = ref(this.db, `${path}/${pathCodes}/${sessionCode}`);
            const sessionSnap = await get(sessionRef);
            if (!sessionSnap.exists()) {
                if (type == "creator") {
                    await this.createCode(sessionCode);

                    // Clean up expired sessions
                    firebase.cleanUpExpiredSessions();
                } else {
                    return true;
                }
            } else {

                const startTime = sessionSnap.val().startTime;
                const currentTime = Date.now();
                const timeElapsed = currentTime - startTime;
                const maxSessionTime = time * 60 * 60 * 1000; // 3 hours in milliseconds
                const timeLeft = maxSessionTime - timeElapsed;

                if (timeLeft > 0) {
                    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                    // Still valid — start the timer
                    // console.log(`⏱️ Time left for session "${sessionCode}": ${hours}h ${minutes}m ${seconds}s`);
                } else {
                    // console.log(`⏱️ Session "${sessionCode}" has expired.`);
                    await firebase.deleteUser(codes, true); // Auto-delete expired session  
                }

                // Check if the session code matches
                if (sessionCode == this.sessionCode) {
                    firebase.startFirebaseTimer(startTime, sessionCode);
                }

            }
        } catch (error) {
            console.error("❌ Error from Firebase:", error);
        }
    }

    async cleanUpExpiredSessions() {
        try {
            const sessionCodes = await this.fetchAllSessionCodes();
            for (const code of sessionCodes) {
                await firebase.verifySessionCode("autoCleanup", code); // Use a type that won’t create new ones
            }
        } catch (error) {
            console.error("❌ Error during session cleanup:", error);
        }
    }

    async fetchAllSessionCodes() {
        try {
            const codesRef = ref(this.db, `${path}/${pathCodes}`);
            const snapshot = await get(codesRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const sessionCodes = Object.keys(data); // session codes are keys 
                return sessionCodes;
            } else {
                console.log("📭 No sessions found.");
                return [];
            }
        } catch (error) {
            console.error("❌ Error fetching session codes:", error);
            return [];
        }
    }

    startFirebaseTimer(startTime, sessionCode, duration = 60 * 60 * time) {
        async function updateTimer() {
            let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            let remainingTime = duration - elapsedTime;

            // ⚠️  Show a warning 30 seconds before expiry
            const sessionType = localStorage.getItem("type");
            if (sessionType == "creator") {
                if (remainingTime === 60) {
                    Swal.fire({
                        icon: 'warning',
                        title: '⚠️ Session Expiring Soon!',
                        text: 'Click "Extend" to keep your session active.',
                        showCancelButton: true,
                        confirmButtonText: 'Extend',
                        cancelButtonText: 'Ignore',
                        background: "#1E1E1E",
                        color: "#FFFFFF"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log("✅ Session Extended!");
                            localStorage.setItem("sessionCode", sessionCode); // Extend session
                            startTime = Date.now(); // Reset start time
                            duration = 60 * 30;
                        }
                    });
                }
            }

            if (remainingTime <= 0) {
                console.log("⏳ Timer expired!");
                document.querySelector("#timer").textContent = "00:00:00";

                Swal.fire({
                    showConfirmButton: true,
                    icon: 'info',
                    title: '⏳ Session has Ended!',
                    text: 'Click OK to return.',
                    background: "#1E1E1E",
                    color: "#FFFFFF"
                }).then(() => {
                    firebase.deleteUser(sessionCode);
                });

                return;
            }

            // Ensure remainingTime is a number
            remainingTime = Number(remainingTime) || 0;

            let hours = Math.floor(remainingTime / 3600);
            let minutes = Math.floor((remainingTime % 3600) / 60);
            let seconds = remainingTime % 60;

            if (hours == 0 && minutes == 0 && seconds == 0) firebase.deleteUser(sessionCode);

            let formattedTime =
                String(hours).padStart(2, '0') + ":" +
                String(minutes).padStart(2, '0') + ":" +
                String(seconds).padStart(2, '0');

            document.querySelector("#timer").textContent = formattedTime;

            setTimeout(updateTimer, 1000);
        }

        document.querySelector("#code").textContent = sessionCode;
        updateTimer();
    }

    async updateVideoState(Video) {
        // 📌 2️⃣ Update Data in Real-time
        if (Video) {
            await update(ref(this.db, `${path}/${pathCodes}/${sessionCode}`), { Video });
        }
    }

    async updateSonglistNumber(length) {
        // 📌 2️⃣ Update Data in Real-time
        if (length) {
            const songManager = new SongManager();
            await update(ref(this.db, `${path}`), { SonglistNumber: length });
            const sessionRef = ref(this.db, `${path}/SonglistNumber`);
            onValue(sessionRef, async (snapshot) => {
                if (snapshot.exists()) {
                    const SonglistNumber = snapshot.val();
                    if (SonglistNumber != length) {
                        songManager.addSonglist(await this.getAllSongs());
                    }
                    // console.log("Current: " + SonglistNumber)
                    // console.log("Last: " + length)
                }
            });
        }
    }

    async readVideoState() {
        try {
            const sessionRef = ref(this.db, `${path}/${pathCodes}/${sessionCode}/Video`);
            onValue(sessionRef, (snapshot) => {
                if (snapshot.exists()) {
                    const youtube = new YouTubePlayer();
                    const currentVideoId = snapshot.val().currentVideoId;
                    const videoTime = snapshot.val().videoTime;
                    localStorage.setItem("currentVideoId", currentVideoId);
                    localStorage.setItem("videoTime", videoTime);
                    youtube.setCurrentSong({ currentVideoId: currentVideoId, videoTime: videoTime });
                }
            });
        } catch (error) {
            console.error("❌ Error from Firebase:", error);
        }
    }
}

const firebase = new Firebase();