var commonPasswords = [
    "123456",
    "password",
    "12345678",
    "qwerty",
    "abc123",
    "111111",
    "123456789",
];

function find() {
    const pass = document.getElementById("pass").value;
    const strengthResult = document.getElementById("strengthResult");
    const checkList = document.getElementById("checkList");
    const entropyResult = document.getElementById("entropyResult");
    const progressBar = document.getElementById("progressBar");
    let score = 0;
    let checks = [];
    // this helps to check if typed password is in common password list
    if (commonPasswords.includes(pass)) {
        strengthScore.innerText = "❌ Very common password!";
        checkList.innerText = "Avoid using common passwords.";

        progressBar.style.width = "0%";
        progressBar.style.background = "gray";
        return;
    }
    // score based on the length of the password
    if (pass.length >= 12) {
        score += 2;
    } else if (pass.length >= 8) {
        score += 1;
    } else {
        checks.push("Use at least 12 characters.");
    } //pushing the list that missed in password

    if (/[A-Z]/.test(pass)) {
        score += 1;
    } else checks.push("Add uppercase letters.");

    // Lowercase check condition
    if (/[a-z]/.test(pass)) {
        score += 1;
    } else {
        checks.push("Add lowercase letters.");
    } //say user to add some lowercase letters

    // Digits check condition
    if (/\d/.test(pass)) {
        score += 1;
    } else {
        checks.push("Add digits.");
    }

    // Symbols check condition
    if (/[^A-Za-z0-9]/.test(pass)) {
        score += 1;
    } else {
        checks.push("Add special characters (!@#$ etc).");
    }

    // Entropy calculation for the bits 
    let charset = 0;
    if (/[a-z]/.test(pass)) {
        charset += 26;
    }
    if (/[A-Z]/.test(pass)) {
        charset += 26;
    }
    if (/\d/.test(pass)) {
        charset += 10;
    }
    if (/[^A-Za-z0-9]/.test(pass)) {
        charset += 32;
    }
    let entropy = pass.length * Math.log2(charset || 1);
    let crackTimeSec = Math.pow(2, entropy) / 1e9;

    let crackTime = crackTimeSec < 60
        ? `${crackTimeSec.toFixed(2)} seconds`
        : crackTimeSec < 3600
            ? `${(crackTimeSec / 60).toFixed(2)} minutes`
            : crackTimeSec < 86400
                ? `${(crackTimeSec / 3600).toFixed(2)} hours`
                : `${(crackTimeSec / 86400).toFixed(2)} days`;

    const percent = Math.min((score / 6) * 100, 100);
    progressBar.style.width = percent + "%";

    if (score <= 2) {
        progressBar.style.background = "#e74c3c"; // red
        strengthScore.innerText = `Weak (${score}/6)`;
    } else if (score <= 4) {
        progressBar.style.background = "#f1c40f"; // yellow
        strengthScore.innerText = `Moderate (${score}/6)`;
    } else {
        progressBar.style.background = "#2ecc71"; // green
        strengthScore.innerText = `Strong (${score}/6)`;
    }

    // Output
    checkList.innerHTML = checks.length
        ? checks.map((s) => "• " + s).join("<br>")
        : "🎉 Your password is strong!";
    entropyResult.innerText = `Hacker Can Crack in Time: ${crackTime}`;
}
