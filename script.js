function addBinary() {
    const binary1 = document.getElementById("binary1").value;
    const binary2 = document.getElementById("binary2").value;
    const resultDiv = document.getElementById("result");
    const processDiv = document.getElementById("process");

    // Validasi input
    if (!/^[01]+$/.test(binary1) || !/^[01]+$/.test(binary2)) {
        resultDiv.innerHTML = "Input harus berupa bilangan biner (hanya 0 dan 1).";
        processDiv.innerHTML = "";
        return;
    }

    // Padding untuk menyamakan panjang biner
    const maxLength = Math.max(binary1.length, binary2.length);
    const bin1 = binary1.padStart(maxLength, "0");
    const bin2 = binary2.padStart(maxLength, "0");

    // Penjumlahan biner
    let carry = 0;
    let result = "";
    let steps = [];

    for (let i = maxLength - 1; i >= 0; i--) {
        const bit1 = parseInt(bin1[i]);
        const bit2 = parseInt(bin2[i]);
        const sum = bit1 + bit2 + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);

        steps.push(
            `Bit ke-${maxLength - i}: ${bit1} + ${bit2} + Carry(${carry}) = ${
                sum % 2
            } (Carry: ${carry})`
        );
    }

    if (carry > 0) {
        result = carry + result;
        steps.push(`Carry terakhir: 1`);
    }

    // Tampilkan hasil
    resultDiv.innerHTML = `Hasil: ${result}`;
    processDiv.innerHTML = "";

    // Tampilkan proses secara bertahap dengan fade-in
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepElement = document.createElement("p");
            stepElement.className = "fade-in-step";
            stepElement.innerText = step;
            processDiv.appendChild(stepElement);
        }, index * 500); // Delay 500ms antar langkah
    });
}
