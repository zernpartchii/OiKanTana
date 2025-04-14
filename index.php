<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="shortcut icon" href="https://cdn0.iconfinder.com/data/icons/digital-marketing-2-12/50/163-64.png"
        type="image/x-icon">
    <script defer src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script defer src="./kantana/js/sweetAlert.js"></script>
    <script defer src="./kantana/js/join.js"></script>
    <title>Oi KanTana</title>
</head>

<body>
    <div class="h-screen flex items-center justify-center">
        <div class="flex flex-col items-center p-6 rounded-lg">
            <div class="flex flex-wrap justify-center items-center gap-3">
                <div class="flex-flex-col">
                    <h1 class="font-bold text-white text-5xl m-0"> Oi KanTana </h1>
                    <p class="text-white text-sm">Created by Geszer Gumapac</p>
                </div>
                <img src="https://cdn0.iconfinder.com/data/icons/digital-marketing-2-12/50/163-64.png" width="70">
            </div>
            <button
                class="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold p-3 w-full my-5 rounded-lg btnCreate">Create</button>
            <p class="text-white text-lg mb-4">OR</p>
            <input type="search" placeholder="Enter Code to Join"
                class="text-white text-cente text-lg border w-full rounded-md p-2 joinCode" />
            <button
                class="bg-blue-400 hover:bg-blue-500 text-black font-semibold p-3 w-full my-5 rounded-lg btnJoin">Join</button>
        </div>
    </div>
</body>

</html>