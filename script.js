// ---------- STATE (data yang berubah selama aplikasi dipakai) ----------
let firstNumber = null;    // angka pertama (null = belum dipilih)
let secondNumber = null;   // angka kedua (null = belum dipilih)
let resultText = null;     // hasil terakhir untuk ditampilkan setelah ENTER
let expressionText = "";   // teks kecil di atas hasil, mis. "6 + 9"

// ---------- ELEMEN HTML ----------
const expressionEl = document.getElementById("expression");
const mainEl = document.getElementById("main");

// ---------- FUNGSI ----------

// Menampilkan kondisi terbaru ke layar
function updateDisplay() {
  // Setelah ENTER: tampilkan ekspresi kecil + hasil besar
  if (resultText !== null) {
    expressionEl.textContent = expressionText;
    mainEl.textContent = resultText;
    return;
  }

  expressionEl.textContent = "";

  if (firstNumber === null) {
    mainEl.textContent = "0";                              // kondisi awal
  } else if (secondNumber === null) {
    mainEl.textContent = firstNumber;                      // contoh: 6
  } else {
    mainEl.textContent = firstNumber + " + " + secondNumber; // contoh: 6 + 9
  }
}

// Dipanggil saat angka ditekan (tombol layar atau keyboard)
function handleNumber(digit) {
  // Jika hasil lama masih tampil, hapus dulu agar mulai operasi baru
  resultText = null;
  expressionText = "";

  if (firstNumber === null) {
    firstNumber = digit;
  } else if (secondNumber === null) {
    secondNumber = digit;
  }
  // Jika keduanya sudah terisi, angka baru diabaikan (batas input)

  updateDisplay();
}

// Menghitung penjumlahan lalu mengambil digit terakhir
function calculateResult(a, b) {
  return (a + b) % 10;
}

// Dipanggil saat ENTER ditekan
function submit() {
  // ENTER hanya bekerja jika kedua angka sudah dipilih
  if (firstNumber === null || secondNumber === null) {
    return;
  }

  const result = calculateResult(firstNumber, secondNumber);

  // Simpan teks untuk ditampilkan, lalu reset input untuk operasi berikutnya
  expressionText = firstNumber + " + " + secondNumber;
  resultText = String(result);
  resetInput();

  updateDisplay();
}

// Mengosongkan angka pertama dan kedua (tanpa mengubah tampilan)
function resetInput() {
  firstNumber = null;
  secondNumber = null;
}

// Mengembalikan semuanya ke kondisi awal (display "0")
function reset() {
  resetInput();
  resultText = null;
  expressionText = "";
}

// Dipanggil saat CLEAR ditekan
function clearInput() {
  reset();
  updateDisplay();
}

// ---------- EVENT: TOMBOL DI LAYAR ----------
document.querySelectorAll("[data-number]").forEach(function (button) {
  button.addEventListener("click", function () {
    // Number(...) mengubah teks "6" dari HTML menjadi angka 6
    handleNumber(Number(button.dataset.number));
  });
});

document.getElementById("enterButton").addEventListener("click", submit);
document.getElementById("clearButton").addEventListener("click", clearInput);

// ---------- EVENT: KEYBOARD ----------
document.addEventListener("keydown", function (event) {
  if (event.key >= "0" && event.key <= "9" && event.key.length === 1) {
    handleNumber(Number(event.key));
  } else if (event.key === "Enter") {
    event.preventDefault(); // cegah tombol yang sedang fokus ikut "diklik"
    submit();
  } else if (event.key === "Escape" || event.key === "Backspace") {
    clearInput();
  }
});

// Tampilkan kondisi awal saat halaman dibuka
updateDisplay();
