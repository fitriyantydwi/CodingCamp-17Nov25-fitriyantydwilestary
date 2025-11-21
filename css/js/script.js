// Helper: select element
const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
  setupWelcomeName();
  setupFormHandling();
});

/**
 * Mengisi teks "Hi Name" di hero menggunakan JavaScript.
 * Nama diambil dari localStorage jika ada, jika tidak akan diminta via prompt.
 */
function setupWelcomeName() {
  const heroNameEl = $("#heroName");
  if (!heroNameEl) return;

  let storedName = localStorage.getItem("visitorName");
  if (!storedName) {
    const inputName = window.prompt("Hi, boleh tahu nama Anda?");
    if (inputName && inputName.trim().length > 0) {
      storedName = inputName.trim();
      localStorage.setItem("visitorName", storedName);
    }
  }
  if (storedName) {
    heroNameEl.textContent = storedName;
  }
}

/**
 * Validasi form "Message Us" dan menampilkan nilai yang di-submit
 * di kotak sebelah kanan tanpa reload halaman.
 */
function setupFormHandling() {
  const form = $("#messageForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // ambil nilai
    const name = $("#name").value.trim();
    const birthdate = $("#birthdate").value;
    const gender = form.querySelector('input[name="gender"]:checked');
    const email = $("#email").value.trim();
    const phone = $("#phone").value.trim();
    const message = $("#message").value.trim();

    // reset error text
    clearErrors();

    let isValid = true;

    if (!name) {
      setError("name", "Nama wajib diisi.");
      isValid = false;
    }

    if (!birthdate) {
      setError("birthdate", "Tanggal lahir wajib diisi.");
      isValid = false;
    }

    if (!gender) {
      setError("gender", "Pilih salah satu jenis kelamin.");
      isValid = false;
    }

    if (!email) {
      setError("email", "Email wajib diisi.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setError("email", "Format email tidak valid.");
      isValid = false;
    }

    if (!phone) {
      setError("phone", "Nomor telepon wajib diisi.");
      isValid = false;
    } else if (!/^[0-9+\-\s]{8,20}$/.test(phone)) {
      setError("phone", "Nomor telepon tidak valid.");
      isValid = false;
    }

    if (!message) {
      setError("message", "Pesan tidak boleh kosong.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // jika valid, beri konfirmasi singkat
    alert("Terima kasih, pesan Anda sudah dikirim.");
  });
}

function clearErrors() {
  const errorIds = [
    "name",
    "birthdate",
    "gender",
    "email",
    "phone",
    "message",
  ];
  errorIds.forEach((id) => {
    const el = document.getElementById("error-" + id);
    if (el) el.textContent = "";
  });
}

function setError(field, message) {
  const el = document.getElementById("error-" + field);
  if (el) el.textContent = message;
}

function validateEmail(email) {
  // Simple email pattern, cukup untuk keperluan latihan
  const pattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}
