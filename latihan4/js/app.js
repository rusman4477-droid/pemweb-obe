import { formatRupiah, getKategoriUnik } from "./utils.js";


// 1. DATA — array of objects
const dataInventaris = [
  { id: 1, nama: "Kopi Susu Gula Aren", kategori: "Minuman", stok: 4, hargaSatuan: 18000 },
  { id: 2, nama: "Americano",           kategori: "Minuman", stok: 12, hargaSatuan: 15000 },
  { id: 3, nama: "Roti Bakar Coklat",   kategori: "Makanan", stok: 3, hargaSatuan: 20000 },
  { id: 4, nama: "Nasi Goreng Kafe",    kategori: "Makanan", stok: 8, hargaSatuan: 25000 },
  { id: 5, nama: "Gelas Kaca 250ml",    kategori: "Alat",    stok: 2, hargaSatuan: 12000 },
  { id: 6, nama: "Cangkir Keramik",     kategori: "Alat",    stok: 15, hargaSatuan: 22000 },
];


// -----------------------------
// 2. FILTER — ambil item dengan stok menipis
// -----------------------------
function cariStokMenipis(data, batas = 20) {
  return data.filter((item) => item.stok < batas);
}

// -----------------------------
// 3. MAP — ubah bentuk data, misalnya cuma ambil nama
// -----------------------------
function daftarNamaItem(data) {
  return data.map((item) => item.nama);
}

// -----------------------------
// 4. REDUCE — gabungkan array jadi satu nilai
// -----------------------------
function totalNilaiInventaris(data) {
  return data.reduce((total, item) => total + item.stok * item.hargaSatuan, 0);
}

// -----------------------------
// 5. FIND — cari SATU item yang cocok
// -----------------------------
// find() berhenti begitu ketemu 1 item pertama yang cocok, beda dengan filter().
function cariItemById(data, id) {
  return data.find((item) => item.id === id);
}

// -----------------------------
// 6. Fungsi utama: ringkasInventaris(data)
// -----------------------------
// Menggabungkan filter, map, reduce, find, dan fungsi dari utils.js
// jadi satu objek ringkasan.
function ringkasInventaris(data, batas) {
  const stokMenipis = cariStokMenipis(data, batas);

  return {
    totalItem: data.length,
    totalNilai: formatRupiah(totalNilaiInventaris(data)),
    kategori: getKategoriUnik(data),
    namaSemuaItem: daftarNamaItem(data),
    itemStokMenipis: stokMenipis.map((item) => item.nama),
    contohFind: cariItemById(data, 3)?.nama ?? "Tidak ditemukan",
  };
}

// -----------------------------
// 7. Tampilkan data mentah ke halaman (biar keliatan sebelum diolah)
// -----------------------------
const daftarEl = document.getElementById("daftar-item");
dataInventaris.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = `${item.nama} — ${item.kategori} — stok: ${item.stok} — ${formatRupiah(item.hargaSatuan)}`;
  daftarEl.appendChild(li);
});

// -----------------------------
// 8. Hubungkan tombol ke ringkasInventaris()
// -----------------------------
const btn = document.getElementById("btn-ringkas");
const outputEl = document.getElementById("output");

btn.addEventListener("click", () => {
  const ringkasan = ringkasInventaris(dataInventaris, 20);

  // Cek tab Console di DevTools untuk lihat objek ini secara utuh
  console.log("Hasil ringkasInventaris():", ringkasan);

  outputEl.textContent = JSON.stringify(ringkasan, null, 2);
});

// Log awal saat halaman dimuat, untuk latihan baca Console dari awal
console.log("app.js berhasil dimuat sebagai module.");
console.log("Jumlah data awal:", dataInventaris.length);
