class ShowMessage {
    #icon;
    #message;
    constructor(icon, message) {
        this.#icon = icon;
        this.#message = message;
    }

    showToast(position = "bottom-start") {
        Swal.fire({
            position: position,
            showConfirmButton: false,
            timer: 5000,
            toast: true,
            timerProgressBar: true,
            icon: this.#icon,
            title: this.#message,
            background: "#1E1E1E", // dark gray/black background
            color: "#FFFFFF", // white text
            customClass: {
                popup: 'custom-margin-bottom' // Add a custom class
            }
        });
    }

    showToastOK() {
        return Swal.fire({
            showConfirmButton: true,
            allowOutsideClick: false, // ✅ Disables outside clicking
            allowEnterKey: false,
            icon: this.#icon,
            title: this.#message,
            background: "#1E1E1E",
            color: "#FFFFFF"
        }).then((result) => {
            return result.isConfirmed;
        });
    }

    showWarning(position = "bottom-start") {
        return Swal.fire({
            template: "#my-template",
            position: position,
            background: "#1E1E1E", // dark gray/black background
            color: "#FFFFFF", // white text
            timer: false,
            toast: true,
            allowEnterKey: false,
            allowOutsideClick: false, // ✅ Disables outside clicking
            icon: this.#icon,
            title: this.#message,
            customClass: {
                popup: 'custom-margin-bottom' // Add a custom class
            }
        }).then((result) => {
            return result.isConfirmed;
        });
    }
}
