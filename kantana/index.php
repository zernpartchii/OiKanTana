<!doctype html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="shortcut icon" href="https://cdn0.iconfinder.com/data/icons/digital-marketing-2-12/50/163-64.png"
        type="image/x-icon">
    <script defer src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script defer src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script defer src="./js/songManager.js" type="module"></script>
    <script defer src="./js/verify.js" type="module"></script>
    <script defer src="./js/firebaseSetup.js" type="module"></script>
    <script defer src="./js/index.js" type="module"></script>
    <script defer src="./js/element.js"></script>
    <script defer src="./js/script.js"></script>
    <script defer src="./js/sweetAlert.js"></script>
    <title>Oi KanTana</title>
</head>

<body>
    <div class="h-screen">
        <div class="flex h-full mainContent p-4">
            <div class="w-1/4 px-3 flex flex-col gap-3 relative" id="sidebar">
                <div class="flex gap-2 items-center">
                    <button class="btnRefresh hidden">
                        <span
                            class="material-symbols-outlined btn p-2 px-3 rounded-lg border border-gray-500 text-white">
                            autorenew
                        </span>
                    </button>
                    <button id="new" class="btn p-2 px-3 rounded-lg border border-gray-500 text-white">New</button>
                    <input type="search" id="searchInput" placeholder="Search.."
                        class="border border-gray-500 w-full rounded-lg p-2 px-3 focus:outline-none text-white">
                </div>
                <div class="flex flex-wrap gap-3 text-white">
                    <button class="btn grow rounded-md px-1 py-2 border-b btnSonglist">Songlist
                        <span class="text-yellow-400 font-semibold songlist">0</span>
                    </button>
                    <button class="btn grow rounded-md px-1 py-2 border-b btnPlaylist"> Playlist
                        <span class="text-yellow-400 font-semibold playlist">0</span>
                    </button>
                    <button class="btn grow rounded-md px-1 py-2 border-b btnPrevSong">Prev Song
                        <span class="text-yellow-400 font-semibold prevlist">0</span>
                    </button>
                    <button
                        class="bg-yellow-900 hover:bg-yellow-800 grow rounded-md p-3 border-b btnNextSong hidden">Next
                        Song </button>
                </div>
                <div class="flex flex-col w-full h-full overflow-y-scroll scroll text-white pe-3 songlistItems">
                    <h1 class="text-2xl text-center border-b border-gray-600 p-3">Songlist</h1>
                    <p class="text-white text-center text-2xl mt-5">No Available Songs</p>
                </div>
                <div class="flex flex-col w-full h-full overflow-y-scroll scroll text-white pe-3 playlistItems hidden">
                    <h1 class="text-2xl text-center border-b border-gray-600 p-3">Playlist</h1>
                    <p class="text-white text-center text-2xl mt-5">No Available Songs</p>
                </div>
                <div class=" flex flex-col w-full h-full overflow-y-scroll scroll text-white pe-3 prevlistItems
                                    hidden">
                    <h1 class="text-2xl text-center border-b border-gray-600 p-3">Previous Song</h1>
                    <p class="text-white text-center text-2xl mt-5">No Available Songs</p>
                </div>
                <div class="text-white me-5 flex gap-3">
                    <button class="btn grow gap-2 flex items-center justify-center rounded-md p-3 border-b btnRefresh2">
                        <span class="material-symbols-outlined">
                            autorenew
                        </span>
                        Refresh
                    </button>
                    <button
                        class="bg-orange-900 hover:bg-orange-800 grow gap-2 flex items-center justify-center rounded-md p-3 border-b btnNextSong2">
                        <span class="material-symbols-outlined">
                            arrow_right
                        </span>
                        Next Song
                    </button>
                </div>
                <a href="#" class="hidden mb-6 absolute fixed bottom-0 right-0" id="bottom">
                    <span class="material-symbols-outlined text-white p-2  rounded-lg">
                        arrow_circle_up
                    </span>
                </a>
            </div>
            <div class="w-3/4 px-4 flex flex-col gap-3" id="bodyContent">
                <div class="flex gap-3 border-b border-gray-500 pb-3 text-white">
                    <div id="btnLogout" class="flex items-center gap-2 me-auto">
                        <span class="material-symbols-outlined text-red-500 cursor-pointer">
                            logout
                        </span>
                        <span id="username" class="cursor-pointer text-white"></span>
                    </div>
                    <div id="btnFullScreen" class="flex items-center gap-2">
                        <span id="screen" class="material-symbols-outlined cursor-pointer">
                            fullscreen
                        </span>
                    </div>
                    <div id="btnShare" class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-orange-500 cursor-pointer">
                            share
                        </span>
                        <span id="share" class="cursor-pointer text-white">Share link: oikantana.22web.org</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex-flex-col">
                        <h1 class="font-bold text-white text-xl md:text-3xl">Oi KanTana</h1>
                        <p class="text-white text-sm">Created by Geszer Gumapac</p>
                    </div>
                    <img src="https://cdn0.iconfinder.com/data/icons/digital-marketing-2-12/50/163-64.png" width="40">
                    <div class="text-white ms-auto md:gap-3 flex flex-col md:flex-row">
                        <p>Code: <span id="code" class="cursor-pointer text-cyan-500 font-bold"></span></p>
                        <p>Ends: <span id="timer" class="text-yellow-400"></span></p>
                    </div>
                </div>
                <div class="flex gap-3 text-white">
                    <div class="text-yellow-400 font-semibold text-sm md:text-lg">Next Song:</div>
                    <div class="text-sm md:text-lg uppercase nextSong">None</div>
                </div>
                <div class="creatorPlayer h-full">
                    <div id="player" class="h-full w-full rounded-lg hidden"></div>
                    <div id="playerContainer" class="h-full w-full rounded-lg">
                        <div class="btn rounded-lg text-white h-full flex flex-col gap-3 justify-center items-center">
                            <p class="text-3xl font-semibold">Oi KanTana</p>
                            <img src="https://cdn0.iconfinder.com/data/icons/digital-marketing-2-12/50/163-64.png"
                                width="150">
                        </div>
                    </div>
                </div>
                <div class="flex gap-3 text-white">
                    <div class="text-yellow-400 font-semibold text-sm md:text-lg">Current Song: </div>
                    <div class="text-sm md:text-lg uppercase currentSong">None</div>
                </div>
                <div class="joinerPlayer h-full hidden mt-5">
                    <div class="flex flex-col gap-3 relative">
                        <div class="flex gap-2 items-center">
                            <div
                                class="btnRefreshJoiner btn p-2 px-3 rounded-lg  border border-gray-500 text-white material-symbols-outlined">
                                autorenew
                            </div>
                            <div class="btnNewJoiner btn p-2 px-3 rounded-lg  border border-gray-500 text-white">New
                            </div>
                            <input type="search" placeholder="Search.."
                                class="searchInputJoiner border border-gray-500 w-full rounded-lg p-2 px-3 focus:outline-none text-white">
                        </div>
                        <div class="flex flex-wrap gap-3 text-white">
                            <button class="btn grow rounded-md px-1 py-2 border-b btnSonglistJoiner">Songlist
                                <span class="text-yellow-400 font-semibold songlistJoiner">0</span>
                            </button>
                            <button class="btn grow rounded-md px-1 py-2 border-b btnPlaylistJoiner"> Playlist
                                <span class="text-yellow-400 font-semibold playlistJoiner">0</span>
                            </button>
                            <button class="btn grow rounded-md px-1 py-2 border-b btnPrevSongJoiner">Prev Song
                                <span class="text-yellow-400 font-semibold prevlistJoiner">0</span>
                            </button>
                        </div>
                        <div class="flex flex-col w-full h-full overflow-auto text-white pe-3 songlistItemsJoiner">
                            <h1 class="text-2xl text-center border-b p-3">Songlist</h1>
                            <p class="text-white text-center text-2xl mt-5">No Available Songs</p>
                        </div>
                        <div
                            class="flex flex-col w-full h-full overflow-auto text-white pe-3 playlistItemsJoiner hidden">
                            <h1 class="text-2xl text-center border-b p-3">Playlist</h1>
                            <p class="text-white text-center text-2xl mt-5">No Available Songs</p>
                        </div>
                        <div
                            class="flex flex-col w-full h-full overflow-auto text-white pe-3 prevlistItemsJoiner hidden">
                            <h1 class="text-2xl text-center border-b p-3">Previous Song</h1>
                            <p class="text-white text-center text-2xl mt-5">No Available Songs</p>
                        </div>
                    </div>
                    <a href="#" class="mb-6 absolute fixed bottom-0 right-0">
                        <span class="material-symbols-outlined text-white p-2 rounded-lg">
                            arrow_circle_up
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <template id="my-template">
        <swal-button type="confirm" color="#3085d6">
            Yes
        </swal-button>
        <swal-button type="cancel" color="#d33">
            No
        </swal-button>
    </template>
</body>

</html>