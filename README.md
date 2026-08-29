# ⭐ Dikzy AI

Asisten AI bergaya komik dengan 3 tipe pemikiran: **dikzy.1.0**, **dikzy.2.0**, **dikzy.2.5**.

## Fitur
- Login dengan username & password (default: `dikzy` / `dikzyai2025`, ganti di `lib/config.js`)
- 3 mode pemikiran dengan gaya jawaban berbeda (cepat, seimbang, mendalam)
- Desain komik: warna putih/hitam/abu-abu, border tebal, bayangan (shadow) khas komik, halftone dots
- Efek ketukan layar bergaya komik (POW! BAM! ZAP!) di seluruh halaman
- Logo bintang custom SVG dengan efek komik
- Backend API route yang manggil Claude API asli (butuh API key kamu sendiri)

## Cara Jalanin di Lokal
```bash
npm install
npm run dev
```
Buka `http://localhost:3000`

## Setup API Key (WAJIB biar AI-nya bisa jawab beneran)
1. Bikin API key di [console.anthropic.com](https://console.anthropic.com)
2. Buat file `.env.local` di root project:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
   ```

## Deploy ke Vercel
1. Push project ini ke GitHub
2. Buka [vercel.com](https://vercel.com) → **New Project** → import repo GitHub kamu
3. Di step **Environment Variables**, tambahin:
   - `ANTHROPIC_API_KEY` = API key kamu
4. Klik **Deploy**, tunggu selesai, jadi deh 🎉

## Ganti Username & Password
Edit file `lib/config.js`:
```js
export const AUTH = {
  username: "usernamebaru",
  password: "passwordbaru",
};
```

## Ganti Gaya 3 Mode Pemikiran
Semua bisa diatur di `lib/config.js` bagian `THINKING_MODES` — system prompt, max tokens, dan temperature masing-masing mode bisa disesuaikan sesuka hati.

## Struktur Project
```
dikzy-ai/
├── app/
│   ├── login/page.js       # Halaman login
│   ├── chat/page.js        # Halaman chat utama
│   ├── api/chat/route.js   # Backend yang manggil Claude API
│   ├── layout.js
│   ├── globals.css         # Tema komik lengkap
│   └── page.js             # Redirect ke /login
├── components/
│   ├── ComicLogo.js        # Logo bintang komik
│   └── TapEffect.js        # Efek ketuk layar POW/BAM/ZAP
└── lib/
    └── config.js           # Kredensial & konfigurasi mode
```
