import { SongManager } from './songManager.js';

const songManager = new SongManager();

const sections = [songlistItems, playlistItems, prevlistItems, songlistItemsJoiner, playlistItemsJoiner, prevlistItemsJoiner];
const buttons = [btnSonglist, btnPlaylist, btnPrevSong, btnSonglistJoiner, btnPlaylistJoiner, btnPrevSongJoiner];
buttons.forEach((button, i) => button.addEventListener('click', () => {
    showSection(sections[i]);
}))


function showSection(section) {
    songlistItems.classList.add('hidden');
    playlistItems.classList.add('hidden');
    prevlistItems.classList.add('hidden');

    songlistItemsJoiner.classList.add('hidden');
    playlistItemsJoiner.classList.add('hidden');
    prevlistItemsJoiner.classList.add('hidden');

    section.classList.remove('hidden');
}

// Add event listener to buttons
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnAddSong")) {
        const target = e.target.closest("[data-video-id]");  // Find the closest element with the attribute
        if (!target) return; // Prevent errors if clicking outside
        const [title, videoId] = target.getAttribute("data-video-id").split("~~");
        songManager.addPlaylistSong({ title: title, videoId: videoId });
    }

    if (e.target.classList.contains("btnDeleteSong")) {
        const target = e.target.closest("[data-video-id]");  // Find the closest element with the attribute
        if (!target) return; // Prevent errors if clicking outside
        const [title, videoId, index] = target.getAttribute("data-video-id").split("~~");
        songManager.deletePlaylistSong({ videoId: videoId, index: index });
    }
});

const fetchAll = {
    "refresh": [btnRefresh1, btnRefresh2, btnRefreshJoiner],
    "nextSong": [btnNextSong1, btnNextSong2],
    "newSong": [btnNewSong, btnNewJoiner]
};

for (const key in fetchAll) {
    fetchAll[key].forEach((button) => {
        button.addEventListener('click', () => {
            if (key === 'refresh') {
                songManager.refresh();
                new ShowMessage("success", "Refreshed!").showToast();
            } else if (key === 'nextSong') {
                songManager.nextSong();
            } else if (key === 'newSong') {
                songManager.addNewSong();
            }
        });
    });
}

document.addEventListener('keydown', (event) => {
    const sessionType = localStorage.getItem("type");
    if (event.key === "End" && sessionType === 'creator') {
        songManager.nextSong();
    }
});

searchInput.addEventListener('input', () => {
    songManager.searchSong(searchInput.value);
})

searchInputJoiner.addEventListener('input', () => {
    songManager.searchSong(searchInputJoiner.value);
})
