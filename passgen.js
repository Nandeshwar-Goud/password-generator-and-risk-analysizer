function setData() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let length = Math.floor(Math.random() * (21 - 12 + 1)) + 12;

    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    document.getElementById("pass").value = result;
}

function copyToClipboard() {
    let password = document.getElementById("pass");
    let finalPass = password.value;

    password.select();
    password.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(password.value);
    let tooltip = document.getElementById("ttp");
    tooltip.innerHTML = "✅ Copied";
}
function outMousefun() {
    let tooltip = document.getElementById("ttp");
    tooltip.innerHTML = "Copy To Clipboard";
}
