# 🏭 Blueprint Konsep Gamifikasi & PWA: MathTech Plant OS (Edisi Laravel)

**Sasaran:** Pelajar Matematik ADTEC / JTM

**Format Aplikasi:** Full-Stack Laravel (PWA Enabled)

**Tema Visual:** *Industrial Blueprint HUD / Cyber-Factory Terminal*

---

## 1. Naratif & Premis Tema: "The Factory Blueprint"

Aplikasi ini dimodelkan sebagai **Sistem Terminal Penyelenggaraan Loji Perindustrian Pintar (Industrial Plant OS)** berpusat di pelayan (*server-backed*).

* **Peranan Pelajar:** Juruteknik Penyelenggaraan Sistem (*Systems Maintenance Technician*).
* **Objektif Dunia Nyata:** Memastikan loji perindustrian sentiasa beroperasi 100% tanpa henti (*zero downtime*) melalui penyelesaian formula matematik, penentukuran litar, dan modul mekanikal.
* **Gaya Visual (UI/UX):**
  * Skema warna: Biru Gelap Blueprint (`#0a192f`), Garisan Grid Cyan/Neon (`#64ffda`), dan Kuning Amaran Industri (`#f59e0b`).
  * Elemen visual: Garisan skematik, tolok tekanan (*pressure gauges*), status grid kuasa loji, dan papan metrik prestasi masa nyata.

---

## 2. Struktur Mekanik Gamifikasi (Gamification Engine)

### A. Daily Maintenance Calibration (1 Hari 1 Soalan)
* **Konsep:** Setiap hari, satu modul mesin mengalami "ralat penentukuran" (*calibration error*).
* **Misi Pelajar:** Menyelesaikan 1 soalan matematik harian (2–3 minit).
* **Mekanik Streak ("Plant Uptime"):**
  * Hari berturut-turut menjawab soalan diistilahkan sebagai **"Uptime Streak"** (contoh: *Uptime: 14 Hari Tanpa Henti*).
  * Menjana pengganda markah XP (*Streak Multiplier*): Semakin tinggi hari berturut-turut, semakin banyak XP dikumpul.
  * Pelajar boleh menebus item **"Backup Generator"** (Streak Freeze) menggunakan Cog Coins.

### B. Tahap Progresi & Pangkat Teknikal (Tier Progression)

| Sektor Kilang | Domain Matematik | Pangkat Juruteknik | Syarat Kenaikan |
| :--- | :--- | :--- | :--- |
| **Sektor 01: Unit Inventori & Bahan** | Algebra, Nisbah, Asas Nombor | *Apprentice Technician* | Akaun Baru / 0 - 499 XP |
| **Sektor 02: Unit Pemotongan & Struktur** | Geometri, Trigonometri, Sudut CNC | *Field Operator* | 500 - 1,499 XP |
| **Sektor 03: Unit Dinamik & Hidraulik** | Fungsi, Pembezaan, Kadar Perubahan | *Systems Specialist* | 1,500 - 2,999 XP |
| **Sektor 04: Bilik Kawalan Reaktor** | Peperiksaan Akhir (`/ramal`) | **Plant Chief Engineer** | 3,000+ XP & Selesai Mod Ramalan |

### C. Mod Peperiksaan Akhir: "Overload Protocol" (Boss Battle)
* Simulasi set peperiksaan akhir berhad masa sebenar.
* Markah disimpan di pelayan untuk pemeringkatan khas kelayakan peperiksaan semester.

---

## 3. Sistem Ekonomi & Ganjaran XP (Omni-Activity Reward Matrix)

Sistem XP distrukturkan supaya **setiap interaksi pembelajaran** pelajar di dalam aplikasi dihargai, bukan sekadar menjawab soalan kuiz. Ini menggalakkan pelajar meneroka nota dan membina kefahaman sebelum menguji diri.

### A. Jadual Pengagihan XP Mengikut Aktiviti

| Kategori Aktiviti | Kod Aksi (*Action Code*) | Tindakan Pelajar | Kadar XP | Had / Kawalan Integriti |
| :--- | :--- | :--- | :--- | :--- |
| **Kajian Nota (Reading)** | `READ_NOTE_COMPLETE` | Membaca nota sesuatu bab sehingga tamat skrol (*dwell time* $\ge 90\text{ saat}$) | **+15 XP** | Sekali setiap subtopik (elak *spam reload*) |
| **Kajian Nota (Rujukan)** | `READ_FORMULA_SHEET` | Membuka & merujuk lembaran rumus/skematik formula | **+5 XP** | Maksimum 3 kali sehari |
| **Latihan Biasa** | `PRACTICE_CORRECT` | Menjawab soalan latihan dengan betul | **+20 XP** | Tiada had |
| **Latihan Biasa** | `PRACTICE_TRY` | Cubaan menjawab walaupun jawapan salah (usaha mencuba) | **+5 XP** | Maksimum 1 cubaan per soalan |
| **Tugasan Harian** | `DAILY_QUESTION` | Berjaya menyelesaikan "1 Hari 1 Soalan" (*Daily Calibration*) | **+30 XP** | 1 kali setiap hari (reset 00:00) |
| **Uptime Streak Bonus** | `STREAK_MILESTONE` | Mengekalkan *streak* harian (setiap gandaan 7 hari berturut-turut) | **+50 XP** | Bonus mingguan |
| **Simulasi Peperiksaan** | `EXAM_SUBMISSION` | Menyelesaikan 1 set lengkap peperiksaan akhir (`/ramal`) | **+100 XP** | Ditambah bonus mengikut peratusan markah |
| **Aktiviti Komuniti** | `FIRST_LOGIN_DAY` | Daftar masuk harian pertama (*Daily Clock-In*) | **+10 XP** | Sekali sehari |

### B. Mekanisme Anti-Spam & Integriti XP
* **Time-Lock Reading Detector:** XP bacaan nota hanya dikreditkan sekiranya pelajar meluangkan masa minimum yang munasabah pada halaman nota (disemak melalui *IntersectionObserver* dan pemasa JavaScript sebelum penghantaran API ke Laravel).
* **XP Multiplier (Uptime Booster):**
  * Streak 1–6 hari: $1.0\times\text{ XP}$
  * Streak 7–13 hari: $1.2\times\text{ XP}$
  * Streak 14–29 hari: $1.5\times\text{ XP}$
  * Streak 30+ hari: $2.0\times\text{ XP}$ (Status: *Overdrive Mode*)

---

## 4. Sistem Pendaftaran & Autentikasi Pengguna (ADTEC Auth)

### A. Medan Pendaftaran (Sign Up)
Pelajar mendaftar dengan medan berikut:
1. **Nama Penuh** (`name`)
2. **Nombor Kad Pengenalan** (`ic_no`) – Disimpan dalam format seragam (12 digit tanpa sempang, cth: `040512035541`).
3. **No. Daftar Pelajar / NDP** (`ndp`) – Unik mengikut sistem ADTEC (cth: `22234011`).
4. **Kursus** (`course`) – Pilihan *dropdown* (Mekatronik, Automotif, Pembuatan, Komputer, Fabrikasi Logam, dll).
5. **E-mel** (`email`) – Untuk rekod rasmi dan tetapan semula akaun jika diperlukan.

### B. Log Masuk Ringkas (Authentication Flow)
* **Kredensial Log Masuk:**
  * **ID Utama:** No. Kad Pengenalan (`ic_no`)
  * **Katalaluan Lalai:** No. Daftar Pelajar (`ndp`)
* Tiada keperluan mengingati kata laluan rawak yang rumit; kombinasi IC + NDP memastikan pelajar boleh log masuk pantas dari mana-mana peranti di bengkel.
* Menggunakan sesi Laravel Breeze / Sanctum dengan *hashed password* (NDP di-*hash* menggunakan `bcrypt`).

---

## 5. Sistem Ranking Interaktif (Leaderboard Module)

Sistem penarafan direka untuk membina persaingan sihat antara individu dan antara bengkel kemahiran berasaskan jumlah keseluruhan XP aktiviti.

### A. Papan Ranking Individu (Top Technicians)
* **Metrik Utama:** Jumlah Pengumpulan XP (*Total XP*) dan rekod *Uptime Streak*.
* **Tapis (Filter) Masa:**
  * **Ranking Mingguan:** Ditetapkan semula setiap Isnin 00:00 untuk memberi peluang kepada pelajar baru bersaing.
  * **Ranking Sepanjang Hayat (*All-Time*):** Gelaran Jurutera Tertinggi Semester.

### B. Papan Ranking Jabatan/Kursus (Inter-Department Plant War)
* Mengira purata XP per kapita pelajar mengikut kursus:
  $$\text{Skor Kursus} = \frac{\sum \text{XP Pelajar}}{\text{Jumlah Pelajar Berdaftar dalam Kursus}}$$
* Memupuk semangat berpasukan (contoh: *Jabatan Mekatronik mendahului Jabatan Automotif minggu ini!*).

---

## 6. Reka Bentuk Seni Bina Laravel & PWA

### A. Struktur Pangkalan Data (Migration Schema Ringkas)

```php
// Schema: users table
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('ic_no', 12)->unique();
    $table->string('ndp', 20)->unique();
    $table->string('course');
    $table->string('email')->unique();
    $table->string('password'); // Disimpan sebagai bcrypt(ndp)
    $table->unsignedBigInteger('xp')->default(0);
    $table->integer('uptime_streak')->default(0);
    $table->date('last_activity_date')->nullable();
    $table->string('rank_title')->default('Apprentice Technician');
    $table->rememberToken();
    $table->timestamps();
});

// Schema: Log rekod ganjaran XP bagi semua aktiviti
Schema::create('xp_logs', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('activity_type'); // note_read, practice, daily_quest, exam, clock_in
    $table->integer('xp_amount');
    $table->string('reference_id')->nullable(); // cth: bab_id atau question_id
    $table->string('description')->nullable();
    $table->timestamps();
});

// Schema: questions & submissions
Schema::create('questions', function (Blueprint $table) {
    $table->id();
    $table->string('sector_code'); // sector_01, sector_02, etc.
    $table->string('topic');
    $table->text('question_latex');
    $table->json('options');
    $table->integer('correct_index');
    $table->text('solution_steps');
    $table->integer('xp_reward')->default(20);
    $table->boolean('is_daily')->default(false);
    $table->timestamps();
});

Schema::create('user_attempts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->foreignId('question_id')->constrained()->cascadeOnDelete();
    $table->boolean('is_correct');
    $table->integer('xp_earned');
    $table->timestamps();
});
```

### B. Khidmat Logik XP (XP Reward Service)

```php
namespace App\Services;

use App\Models\User;
use App\Models\XpLog;

class XpRewardService
{
    public static function award(User $user, string $activityType, int $baseXp, ?string $refId = null, ?string $desc = null): int
    {
        // Hitung pengganda streak jika berkaitan aktiviti latihan
        $multiplier = 1.0;
        if ($user->uptime_streak >= 30) {
            $multiplier = 2.0;
        } elseif ($user->uptime_streak >= 14) {
            $multiplier = 1.5;
        } elseif ($user->uptime_streak >= 7) {
            $multiplier = 1.2;
        }

        $finalXp = (int) round($baseXp * $multiplier);

        // Tambah XP pada pengguna
        $user->increment('xp', $finalXp);

        // Rekod transaksi dalam lejar xp_logs
        XpLog::create([
            'user_id'       => $user->id,
            'activity_type' => $activityType,
            'xp_amount'     => $finalXp,
            'reference_id'  => $refId,
            'description'   => $desc,
        ]);

        // Semak kenaikan pangkat
        self::syncRankTitle($user);

        return $finalXp;
    }

    private static function syncRankTitle(User $user): void
    {
        $xp = $user->xp;
        $title = match(true) {
            $xp >= 3000 => 'Plant Chief Engineer',
            $xp >= 1500 => 'Systems Specialist',
            $xp >= 500  => 'Field Operator',
            default     => 'Apprentice Technician',
        };

        if ($user->rank_title !== $title) {
            $user->update(['rank_title' => $title]);
        }
    }
}
```

### C. Seni Bina Frontend & PWA
* **Stack:** Laravel 11/12 + Blade/Livewire atau Inertia (Vue/React) + Tailwind CSS.
* **Formula Renderer:** CDN KaTeX disepadukan dalam susun atur (*Blade layout*) untuk formula matematik pantas dan ringan.
* **PWA Engine:** Menggunakan pakej seperti `silviolleite/laravelpwa` untuk menjana `manifest.json` dan `service-worker.js` secara automatik bagi menyokong pemasangan *Add to Home Screen*.

---

## 7. Contoh Aliran Kod Autentikasi Laravel (Controller)

```php
// AuthController.php (Login menggunakan IC + NDP)
public function login(Request $request)
{
    $credentials = $request->validate([
        'ic_no' => 'required|string',
        'ndp'   => 'required|string',
    ]);

    // Cari pelajar berdasarkan IC dan semak padanan NDP
    $user = User::where('ic_no', $credentials['ic_no'])->first();

    if ($user && Hash::check($credentials['ndp'], $user->password)) {
        Auth::login($user, $request->boolean('remember'));
        $request->session()->regenerate();

        // Ganjaran Clock-In Harian Pertama
        if ($user->last_activity_date !== now()->toDateString()) {
            XpRewardService::award($user, 'clock_in', 10, null, 'Daily Plant Clock-In');
            $user->update(['last_activity_date' => now()->toDateString()]);
        }

        return redirect()->intended('/dashboard');
    }

    return back()->withErrors([
        'ic_no' => 'No. IC atau NDP tidak sepadan dengan rekod ADTEC.',
    ]);
}
```