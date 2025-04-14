
//Song Manager
const username = localStorage.getItem("username");
document.querySelector('#username').textContent = username;
const btnNewSong = document.querySelector('#new');
const searchInput = document.querySelector('#searchInput');
const playlistItems = document.querySelector('.playlistItems');
const prevlistItems = document.querySelector('.prevlistItems');
const songlistItems = document.querySelector('.songlistItems');
const btnSonglist = document.querySelector('.btnSonglist');
const btnPlaylist = document.querySelector('.btnPlaylist');
const btnPrevSong = document.querySelector('.btnPrevSong');
const btnNextSong1 = document.querySelector('.btnNextSong');
const btnNextSong2 = document.querySelector('.btnNextSong2');
const btnRefresh1 = document.querySelector('.btnRefresh');
const btnRefresh2 = document.querySelector('.btnRefresh2');
const currentSong = document.querySelector('.currentSong');
const nextSong = document.querySelector('.nextSong');

//Joiner Elements
const btnNewJoiner = document.querySelector('.btnNewJoiner');
const btnRefreshJoiner = document.querySelector('.btnRefreshJoiner');
const searchInputJoiner = document.querySelector('.searchInputJoiner');
const btnSonglistJoiner = document.querySelector('.btnSonglistJoiner');
const btnPlaylistJoiner = document.querySelector('.btnPlaylistJoiner');
const btnPrevSongJoiner = document.querySelector('.btnPrevSongJoiner');
const songlistJoiner = document.querySelector('.songlistJoiner');
const playlistJoiner = document.querySelector('.playlistJoiner');
const prevlistJoiner = document.querySelector('.prevlistJoiner');
const songlistItemsJoiner = document.querySelector('.songlistItemsJoiner');
const playlistItemsJoiner = document.querySelector('.playlistItemsJoiner');
const prevlistItemsJoiner = document.querySelector('.prevlistItemsJoiner');