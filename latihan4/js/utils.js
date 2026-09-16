// js/utils.js
// Kumpulan fungsi pembantu (helper) yang dipisah dari app.js.
// Setiap fungsi yang mau dipakai di file lain harus pakai kata kunci "export".

/**
 * Mengubah angka jadi format Rupiah sederhana.
 * Contoh: formatRupiah(15000) -> "Rp15.000"
 */
export function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

/**
 * Mengambil daftar kategori yang unik dari array data.
 * Ini contoh pemakaian map() + Set (Set otomatis membuang duplikat).
 */
export function getKategoriUnik(data) {
  const semuaKategori = data.map((item) => item.kategori);
  return [...new Set(semuaKategori)];
}
