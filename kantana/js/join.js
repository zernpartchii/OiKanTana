
const btnCreate = document.querySelector('.btnCreate');
const joinCode = document.querySelector('.joinCode');
const btnJoin = document.querySelector('.btnJoin');

let code = localStorage.getItem("sessionCode");
let type = localStorage.getItem("type");

if (code && type) {
    redirect(code, type);
} else {
    localStorage.removeItem("type");
    localStorage.removeItem("username");
    localStorage.removeItem("sessionCode");
    localStorage.removeItem("currentVideoId"); // Reset time
    localStorage.removeItem("videoTime"); // Reset time  
}

btnCreate.addEventListener('click', () => {
    const sessionCode = generateRandomCode();
    type = "creator";
    code = sessionCode;
    redirect(sessionCode, type);
});

btnJoin.addEventListener('click', () => {
    if (!joinCode.value) {
        Swal.fire({
            showConfirmButton: true,
            allowEnterKey: false,
            icon: 'info',
            title: 'Please enter the code to join.',
            background: "#1E1E1E",
            color: "#FFFFFF"
        });
    } else {
        const sessionCode = joinCode.value;
        type = "joiner";
        code = sessionCode;
        redirect(sessionCode, type);
        joinCode.value = '';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && !Swal.isVisible()) {
        btnJoin.click();
    }
});

async function redirect(sessionCode, type) {
    const { value: result } = await Swal.fire({
        position: "center",
        background: "#1E1E1E", // dark gray/black background
        color: "#FFFFFF", // white text
        title: "🎉 Oi KanTana!",
        input: "text",
        inputLabel: "Please Enter your Name...",
        inputValue: '',
        showCancelButton: false,
        allowOutsideClick: false, // ✅ Disables outside clicking
        inputValidator: (value) => {
            if (!value.trim()) {
                return "Please enter your name!";
            }
        }
    });
    if (result) {
        if (!isValidName(result)) {
            new ShowMessage("error", "Please enter a valid name!")
                .showToastOK("center").then((confirmed) => {
                    if (confirmed) {
                        redirect(code, type);
                        return;
                    }
                });
        } else {
            localStorage.setItem("username", result);
            localStorage.setItem("sessionCode", sessionCode.toUpperCase()); // Store locally
            localStorage.setItem("type", type); // Store locally
            window.location.href = `./kantana/`; // Redirect with session code 
        }
    }
}

function isValidName(str) {
    // Ensure the input is a string and trim whitespace.
    if (typeof str !== 'string') return false;
    const trimmed = str.trim();

    // Reject URL-like strings.
    if (/https?:\/\//i.test(trimmed) || /www\./i.test(trimmed)) {
        return false;
    }

    // Split the name into parts using spaces, hyphens, or apostrophes as delimiters.
    // This helps us check that each part of the name has at least 2 characters.
    const parts = trimmed.split(/[\s'-]+/);
    if (parts.some(part => part.length < 2)) return false;

    // Regular expression to allow only letters (including a range of accented letters),
    // and allow internal spaces, hyphens, or apostrophes.
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]{2,})*$/;

    return nameRegex.test(trimmed);
}

function generateRandomCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}


