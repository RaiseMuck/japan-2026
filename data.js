/* ============================================================
   JAPAN 2026 — TRIP DATA
   ------------------------------------------------------------
   THIS IS THE FILE YOU EDIT. index.html renders whatever is here.

   NO PERSONAL DATA IN THIS FILE. Confirmation numbers, PINs and
   record locators live only on the phone (localStorage), seeded
   once from SEED-CONFIRMATIONS.json which is gitignored.

   ── HOW TO ADD A DAY ────────────────────────────────────────
   anchors[]    = time-fixed. Trains, checkouts, reservations.
                  hard:true means missing it costs real money/time.
   candidates[] = flexible. The menu for that day's open hours.
   bench[]      = ranked substitutes. { replaces, alt, why }
   Anything rateable needs a unique `id` — that's what ratings
   attach to. Never reuse an id.

   Rating buckets: stay | activity | food | daytrip | day
   ============================================================ */

const TRIP = {
  /* Dates come from days[] — the app reads the phone's clock, so it
     rolls over to JST automatically the moment you land. */
  meta: {
    title: "Japan 2026",

    /* ⚠ BUMP THIS EVERY TIME YOU EDIT THIS FILE. "YYYY-MM-DD HH:MM", 24h.
       Shown in the header, turns red after 3 days. With planning running
       across several chats, this is the only signal that the dashboard
       has fallen behind the vault. */
    synced: "2026-08-08 22:40",
  },

  /* ---------- STAYS (rateable: bucket "stay") ---------- */
  stays: [
    {
      id: "stay-shiodome",
      name: "Park Hotel Tokyo",
      area: "Shiodome / Higashi-Shimbashi",
      in: "2026-08-10", out: "2026-08-13", nights: 3,
      checkIn: "15:00", checkOut: "11:00",
      note: "Shiodome Media Tower. Hamarikyu, Tsukiji, Ginza all walkable.",
      map: "https://maps.google.com/?q=Park+Hotel+Tokyo+Shiodome",
    },
    {
      id: "stay-hommachi",
      name: "Miyako City Osaka Hommachi",
      area: "Hommachi",
      in: "2026-08-13", out: "2026-08-17", nights: 4,
      checkIn: "15:00", checkOut: "11:00",
      note: "Moderate Double, breakfast included. 3 subway stops to Shin-Osaka.",
      map: "https://maps.google.com/?q=Miyako+City+Osaka+Hommachi",
    },
    {
      id: "stay-onomichi",
      name: "Onomichi hotel Yutori",
      area: "Onomichi (5–7 min walk from regular Onomichi Stn)",
      in: "2026-08-17", out: "2026-08-20", nights: 3,
      checkIn: "15:00", checkOut: "10:00",
      note: "Self check-in. NOT walkable from Shin-Onomichi — that's 4.1km, take a taxi.",
      map: "https://maps.google.com/?q=Onomichi+Station",
    },
    {
      id: "stay-ueno",
      name: "NOHGA Hotel Ueno",
      area: "Ueno",
      in: "2026-08-20", out: "2026-08-23", nights: 3,
      checkIn: "15:00", checkOut: "11:00",
      note: "0.2 mi from Ueno Stn — Keisei Skyliner to Narita departs here.",
      map: "https://maps.google.com/?q=NOHGA+HOTEL+UENO+TOKYO",
    },
  ],

  /* ---------- DAYS ----------
     status: "locked" | "partial" | "open"
     Fill in `candidates` as you map the itinerary.            */
  days: [
    {
      date: "2026-08-09", stayId: null, title: "Fly out", status: "locked",
      anchors: [
        { time: "09:16", title: "Columbus → Chicago", hard: true, note: "JL7331 / AA3414. Moved EARLIER by schedule change — not 10:21." },
        { time: "14:30", title: "Chicago → Haneda", hard: true, note: "JL 9. ~13 hours. Build window if you want it." },
      ],
      candidates: [], bench: [],
    },
    {
      date: "2026-08-10", stayId: "stay-shiodome", title: "Arrive Tokyo", status: "locked",
      anchors: [
        { time: "17:30", title: "Land Haneda", hard: true, note: "Activate Ubigi eSIM on landing." },
        { time: "19:00", title: "Check in — Park Hotel Tokyo", hard: false, note: "Monorail or Keikyu in. Easiest first subway ride of the trip — no connection pressure." },
      ],
      candidates: [
        { id: "food-underpass", bucket: "food", title: "Shimbashi Underpass Alley", walk: "5 min", cost: "¥¥", tags: ["dinner","no-reservation"], tip: "Start at Tsukiji Kanemasa. Backups: Sasagin, Tachinomidokoro Heso.", link: "https://maps.google.com/?q=Shimbashi+Underpass+Alley" },
      ],
      bench: [
        { replaces: "food-underpass", alt: "Uokin (Shimbashi izakaya alley)", why: "If Kanemasa and both backups are full — standout seafood izakaya, same 5-min walk." },
      ],
      notes: "Check-in-and-eat evening. Do not plan anything real.",
    },
    {
      date: "2026-08-11", stayId: "stay-shiodome", title: "Shinjuku day", status: "locked",
      anchors: [],
      candidates: [
        { id: "act-tmg", bucket: "activity", title: "Tokyo Metropolitan Gov't Building — observation deck", walk: "8 min from Shinjuku Stn", cost: "Free", tags: ["skyview"], tip: "The trip's one skyview. Free, beats Shibuya Sky on price.", link: "https://maps.google.com/?q=Tokyo+Metropolitan+Government+Building" },
        { id: "food-tsunahachi", bucket: "food", title: "Tsunahachi Honten — tempura lunch", walk: "18 min from TMG", cost: "¥¥", tags: ["lunch"], tip: "", link: "https://maps.google.com/?q=Tsunahachi+Honten+Shinjuku" },
        { id: "food-omoide", bucket: "food", title: "Omoide Yokocho — dinner", walk: "7 min", cost: "≤$32 pp", tags: ["dinner","food-stalls","no-reservation"], tip: "This IS dinner — no separate booking needed. Already on the route.", link: "https://maps.google.com/?q=Omoide+Yokocho" },
        { id: "act-donki", bucket: "activity", title: "Don Quijote Kabukicho", walk: "5 min", cost: "¥", tags: ["shopping"], tip: "Last — open late, closes the day out naturally.", link: "https://maps.google.com/?q=Don+Quijote+Shinjuku+Kabukicho" },
      ],
      bench: [],
      notes: "~38 min total walking. Dinner budget recut to $32pp 2026-08-08 — the trip affords one splurge and that's Motoyama on Aug 21, so Sushi Tokyo Ten/Azabu are off. Omoide Yokocho covers it.",
    },
    {
      date: "2026-08-12", stayId: "stay-shiodome", title: "Nikko day trip", status: "locked",
      anchors: [
        { time: "06:30", title: "Depart Asakusa — Tobu Limited Express", hard: false, note: "~2h. Earlier is better, the day is built backward from the return train." },
        { time: "15:26", title: "Return express from Tobu-Nikko", hard: true, note: "TARGET, not a wall. Miss it → local train, 72 min slower (arrives 18:32 vs 17:16)." },
      ],
      candidates: [
        { id: "act-toshogu", bucket: "activity", title: "Toshogu Shrine", walk: "town core", cost: "Incl. in pass", tags: ["temple","morning"], tip: "Go first, before the tour buses.", link: "https://maps.google.com/?q=Nikko+Toshogu" },
        { id: "act-kegon", bucket: "activity", title: "Kegon Falls + Akechidaira Ropeway", walk: "bus to Chuzenji", cost: "Incl. in pass", tags: ["nature"], tip: "Ryuzu Falls on the way back down.", link: "https://maps.google.com/?q=Kegon+Falls" },
        { id: "food-kanaya", bucket: "food", title: "Nikko Kanaya Hotel — LUNCH", walk: "Nikko town", cost: "¥¥", tags: ["lunch"], tip: "Lunch not dinner, to fit the return train. The '100-year curry' is real. Purin-tei's 3 Era Pudding too.", link: "https://maps.google.com/?q=Nikko+Kanaya+Hotel" },
      ],
      bench: [],
      notes: "All Area Pass ¥8,000/adult (NOT the ¥3,000 World Heritage pass — that one doesn't reach Chuzenji). No Fuji view here; Fuji rests on the seat-E Shinkansen legs.",
    },
    {
      date: "2026-08-13", stayId: "stay-hommachi", title: "Tokyo → Osaka", status: "locked",
      anchors: [
        { time: "11:00", title: "Checkout — Park Hotel", hard: true, note: "" },
        { time: "12:18", title: "Nozomi 389 → Shin-Osaka", hard: true, note: "Car 2, Seats 9-D / 9-E. 9-E is the Fuji side. Arrives 14:45." },
        { time: "15:10", title: "Midosuji Line → Hommachi", hard: false, note: "24 min door to door incl. walk. ~¥280." },
      ],
      candidates: [
        { id: "food-yamanoya", bucket: "food", title: "Yamano Ya Ichiba — dinner", walk: "199m underground from Hommachi Stn", cost: "¥3,300 / ~$23 pp", tags: ["dinner","sashimi"], tip: "Tabelog 3.43 (222 reviews). Sashimi platter + 30 kinds all-you-can-drink. Connected to the station — no weather, no walk. Date not fixed; any Osaka night.", link: "https://maps.google.com/?q=Yamano+Ya+Ichiba+Hommachi" },
      ],
      bench: [
        { replaces: "food-yamanoya", alt: "GOTTO Sakaba Bingomachi (from ¥3,500 / ~$24)", why: "147 reviews, steps from Hommachi Stn. Take it if the sake-heavy sashimi format doesn't appeal." },
      ],
      notes: "First day of Obon. Suitcase should already be forwarded — daypack only.",
    },
    {
      date: "2026-08-14", stayId: "stay-hommachi", title: "Nara", status: "partial",
      anchors: [
        { time: "07:00", title: "Leave for Nara", hard: false, note: "Not arbitrary — tour buses land by 10:00, park is full by 13:00. Early is the whole difference." },
      ],
      candidates: [
        { id: "dt-nara", bucket: "daytrip", title: "Nara — Kintetsu Osaka-Namba → Kintetsu-Nara", walk: "35–40 min ride", cost: "¥680", tags: ["daytrip"], tip: "Kintetsu beats JR (¥840) on price, speed AND drops you closer to the sights.", link: "https://maps.google.com/?q=Kintetsu+Nara+Station" },
        { id: "act-todaiji", bucket: "activity", title: "Tōdai-ji Daibutsuden", walk: "in Nara Park", cost: "¥800", tags: ["temple","morning"], tip: "Park grounds themselves are free.", link: "https://maps.google.com/?q=Todaiji" },
      ],
      bench: [],
      notes: "Half day — pair with an Osaka evening. Aug 14/15/16 order is swappable; Nara sits first because it's the one that punishes a late start.",
    },
    {
      date: "2026-08-15", stayId: "stay-hommachi", title: "Kurashiki + Okayama", status: "partial",
      anchors: [],
      candidates: [
        { id: "dt-kurashiki", bucket: "daytrip", title: "Kurashiki + Okayama", walk: "~1.5h door to door", cost: "Shinkansen + ¥330", tags: ["daytrip"], tip: "Shin-Osaka → Okayama (Sanyo Shinkansen ~45 min), then Okayama → Kurashiki (San-yo Main Line ~16 min).", link: "https://maps.google.com/?q=Kurashiki+Bikan+Historical+Quarter" },
        { id: "act-bikan", bucket: "activity", title: "Kurashiki Bikan Historical Quarter", walk: "from Kurashiki Stn", cost: "Free to walk", tags: ["historic","canal"], tip: "Preserved Edo canal town. Clearest low-crowd read of anywhere checked on this trip.", link: "https://maps.google.com/?q=Kurashiki+Bikan+Historical+Quarter" },
        { id: "act-okayama-castle", bucket: "activity", title: "Okayama Castle", walk: "16 min by train from Kurashiki", cost: "¥", tags: ["castle"], tip: "\"Crow Castle\" — black exterior. Pairs same-day with Kurashiki.", link: "https://maps.google.com/?q=Okayama+Castle" },
      ],
      bench: [],
      notes: "Replaced Kyoto 2026-07-26 — same heat (~32°C) without Kyoto's bowl-trap, and none of the Obon crowd.",
    },
    {
      date: "2026-08-16", stayId: "stay-hommachi", title: "Asuka", status: "partial",
      anchors: [],
      candidates: [
        { id: "dt-asuka", bucket: "daytrip", title: "Asuka Village", walk: "Kintetsu Yoshino line", cost: "¥", tags: ["daytrip","nature"], tip: "Japan's proto-capital. Burial mounds, 1,400-year-old stone structures, terraced rice fields. Near-zero tourists.", link: "https://maps.google.com/?q=Asuka+Station+Nara" },
        { id: "act-asuka-bikes", bucket: "activity", title: "Rental bikes at Asuka Station", walk: "at the station", cost: "¥", tags: ["cycling","nature"], tip: "Flat quiet roads, no booking needed. This is how you see Asuka.", link: "https://maps.google.com/?q=Asuka+Station+bicycle+rental" },
      ],
      bench: [
        { replaces: "dt-asuka", alt: "Minoh Falls — half-day (Hankyu from Umeda ~30 min, then paved 45-min walk each way)", why: "If a lighter day is wanted. Monkeys, shrines, waterfall — and the standing fallback for the trip's thin 'hike' category." },
      ],
      notes: "Good half-day. Covers the 'nature' non-negotiable.",
    },
    {
      date: "2026-08-17", stayId: "stay-onomichi", title: "Osaka → Himeji → Onomichi", status: "locked",
      anchors: [
        { time: "11:00", title: "Checkout — Hommachi", hard: true, note: "" },
        { time: "12:00", title: "Himeji Castle", hard: false, note: "Hommachi→Himeji 1h26 by JR rapid, ¥1,650. Not Shinkansen." },
        { time: "14:19", title: "Himeji → Shin-Onomichi", hard: true, note: "NOZOMI153 → Okayama → KODAMA953. Arrives 15:23." },
        { time: "15:35", title: "Taxi → hotel", hard: false, note: "~10 min, ¥1,500–2,000. Shin-Onomichi is NOT walkable to the hotel." },
      ],
      candidates: [], bench: [],
      notes: "Daypack-only move day — suitcase forwarded ahead to the Yamato Shotengai branch for pickup.",
    },
    {
      date: "2026-08-18", stayId: "stay-onomichi", title: "Onomichi — Senkoji", status: "partial",
      anchors: [],
      candidates: [
        { id: "act-senkoji", bucket: "activity", title: "Senkoji — ropeway up, walk down", walk: "from town", cost: "¥", tags: ["temple","views"], tip: "Ropeway is only 3–4 min; the walk DOWN through Cat Street is the actual experience.", link: "https://maps.google.com/?q=Senkoji+Temple+Onomichi" },
        { id: "food-onomichi-ramen", bucket: "food", title: "Onomichi ramen", walk: "in town", cost: "~¥600", tags: ["lunch","local"], tip: "The local specialty — clear shoyu, chicken fat, pork back fat. Specific shop still unpicked.", link: "https://maps.google.com/?q=Onomichi+ramen" },
        { id: "act-hondori", bucket: "activity", title: "Hondori shopping street", walk: "from JR Onomichi Stn", cost: "Free", tags: ["shopping"], tip: "~1.2km, ~210 shops, several 100+ years old. Retro, not high-end.", link: "https://maps.google.com/?q=Onomichi+Hondori+Shopping+Street" },
        { id: "food-tamaganzo", bucket: "food", title: "Tamaganzo — dinner", walk: "5 min from Onomichi Stn, no stairs", cost: "¥3,800 / ~$26", tags: ["dinner","ocean-view"], tip: "Tabelog 3.33 (94 reviews). \"Food only\" course. Date not fixed — either Onomichi night.", link: "https://maps.google.com/?q=Tamaganzo+Onomichi" },
      ],
      bench: [
        { replaces: "food-tamaganzo", alt: "The RESTAURANT at ONOMICHI U2 (à la carte only)", why: "Rated higher (3.41/163) and ocean-adjacent, but its set courses run ¥6,600 — only à la carte lands under budget." },
      ],
      notes: "Drop the suitcase at Yamato Shotengai or a konbini today, addressed to NOHGA Ueno.",
    },
    {
      date: "2026-08-19", stayId: "stay-onomichi", title: "Onomichi — open", status: "partial",
      anchors: [],
      candidates: [
        { id: "act-shimanami", bucket: "activity", title: "Shimanami Kaido — half-day ride", walk: "rentals at the trailhead", cost: "¥¥", tags: ["hike","cycling","nature"], tip: "The trip's only cycling day, and it starts literally in Onomichi.", link: "https://maps.google.com/?q=Shimanami+Kaido+Onomichi" },
        { id: "act-literature", bucket: "activity", title: "Path of Literature", walk: "from Senkoji", cost: "Free", tags: ["walk"], tip: "Free add-on off the Senkoji visit.", link: "https://maps.google.com/?q=Path+of+Literature+Onomichi" },
      ],
      bench: [],
    },
    {
      date: "2026-08-20", stayId: "stay-ueno", title: "Onomichi → Tokyo", status: "locked",
      anchors: [
        { time: "10:00", title: "Checkout", hard: true, note: "" },
        { time: "11:30", title: "Taxi → Shin-Onomichi", hard: true, note: "~10 min. Leave buffer — this is the one transfer with no slack behind it." },
        { time: "12:21", title: "Shin-Onomichi → Tokyo", hard: true, note: "KODAMA948 → Okayama → NOZOMI24. Arrives Tokyo 16:15." },
      ],
      candidates: [], bench: [],
    },
    {
      date: "2026-08-21", stayId: "stay-ueno", title: "Ueno — museum, Ameyoko, Motoyama", status: "locked",
      anchors: [
        { time: "19:00", title: "Yakiniku Motoyama Honten — THE splurge dinner", hard: true, note: "Locked 2026-08-08. Tabelog 3.40 / 378 reviews, A5 wagyu. Nagomi course ¥7,788 (~$52pp), 19 dishes, 2hr all-you-can-drink. 1–2 min from Okachimachi Stn. Booked via Tabelog — pay online." },
      ],
      candidates: [
        { id: "act-tnm", bucket: "activity", title: "Tokyo National Museum", walk: "Ueno Park", cost: "¥", tags: ["museum","indoor"], tip: "Morning. The trip's one indoor/art experience. Deserves 2–3h if actually toured.", link: "https://maps.google.com/?q=Tokyo+National+Museum" },
        { id: "act-ameyoko", bucket: "activity", title: "Ameyoko", walk: "7–8 min from the park", cost: "¥", tags: ["shopping","food-stalls"], tip: "Afternoon. 400+ stores, menchi katsu and sweets — covers lunch too.", link: "https://maps.google.com/?q=Ameyoko" },
      ],
      bench: [],
      notes: "The one genuinely free day — and it's now full. The Motoyama booking was being completed via Tabelog; worth confirming it went through.",
    },
    {
      date: "2026-08-22", stayId: "stay-ueno", title: "Last full day", status: "partial",
      anchors: [],
      candidates: [
        { id: "food-pontahonke", bucket: "food", title: "Pontahonke — tonkatsu", walk: "Ueno", cost: "¥¥", tags: ["lunch","local"], tip: "Said to be among Ueno's best three.", link: "https://maps.google.com/?q=Pontahonke+Ueno" },
        { id: "food-torikei", bucket: "food", title: "Torikei Ueno Hiro Koji — yakitori", walk: "Ueno", cost: "¥¥", tags: ["lunch","local"], tip: "Top-100 ranked six years running.", link: "https://maps.google.com/?q=Torikei+Ueno" },
        { id: "food-taimeiken", bucket: "food", title: "Yoshokuya Sandaime Taimeiken — omurice", walk: "inside Ueno Stn", cost: "¥", tags: ["lunch"], tip: "Inside the station — the zero-effort option on a pack day.", link: "https://maps.google.com/?q=Taimeiken+Ueno+Station" },
      ],
      bench: [
        { replaces: "food-pontahonke", alt: "Niku no Ohyama (butcher-run fried food) · Hachinoki (all-you-can-eat meat)", why: "Both cheap, both local. Two more from the same shortlist if the first three are shut or queued." },
      ],
      notes: "Pack day, but the gap night is already booked at the same hotel — no luggage scramble. Last real souvenir window. Narita is early tomorrow.",
    },
    {
      date: "2026-08-23", stayId: null, title: "Fly home", status: "locked",
      anchors: [
        { time: "07:00", title: "Ueno → Narita", hard: true, note: "Keisei Skyliner, ~41 min, ~¥3,000. Leaves from Ueno Stn, 0.2 mi from the hotel." },
        { time: "09:45", title: "JL 56 Narita → Chicago", hard: true, note: "NARITA, not Haneda. Different airport from arrival." },
      ],
      candidates: [], bench: [],
    },
  ],

  /* ---------- IRREVERSIBLES ----------
     Things that cost real money or break the trip if missed.  */
  irreversibles: [
    { id: "irr-maps",      due: "2026-08-09T08:00", title: "Download offline Google Maps", detail: "Tokyo, Osaka, Onomichi, Nikko. Your backstop underground, independent of cellular." },
    { id: "irr-motoyama",  due: "2026-08-20T12:00", title: "Confirm Yakiniku Motoyama booking", detail: "Aug 21, 7:00 PM, Nagomi course. Being booked via Tabelog — verify it actually went through. The trip's one splurge dinner." },
    { id: "irr-onomichi",  due: "2026-08-16T12:00", title: "Onomichi self check-in form + passport upload", detail: "Check-in CODE only sends 9am Japan time on Aug 17, and only after this is verified. Do not leave this." },
    { id: "irr-fwd1",      due: "2026-08-15T12:00", title: "Forward suitcase → Yamato Onomichi Shotengai", detail: "From the Hommachi front desk, HOLD FOR PICKUP. The Airbnb cannot receive a Yamato delivery." },
    { id: "irr-fwd2",      due: "2026-08-18T17:00", title: "Forward suitcase → NOHGA Ueno", detail: "Drop at Yamato Shotengai or any konbini. NOHGA holds parcels sent ahead of check-in." },
    { id: "irr-nikko",     due: "2026-08-12T15:26", title: "Nikko return express", detail: "Miss it and the fallback local is 72 min slower." },
    { id: "irr-nozomi",    due: "2026-08-13T12:18", title: "Nozomi 389 → Shin-Osaka", detail: "Car 2, seats 9-D / 9-E." },
    { id: "irr-himeji",    due: "2026-08-17T14:19", title: "Himeji → Shin-Onomichi", detail: "NOZOMI153 → KODAMA953." },
    { id: "irr-return",    due: "2026-08-20T12:21", title: "Shin-Onomichi → Tokyo", detail: "Taxi from the hotel first — allow 35–50 min buffer." },
    { id: "irr-narita",    due: "2026-08-23T09:45", title: "JL 56 from NARITA", detail: "Not Haneda. Skyliner from Ueno ~41 min." },
  ],

  /* ---------- REFERENCE ---------- */
  reference: {
    phrases: [
      { jp: "すみません",              romaji: "Sumimasen",              en: "Excuse me / sorry / hello-get-attention" },
      { jp: "ありがとうございます",      romaji: "Arigatou gozaimasu",     en: "Thank you" },
      { jp: "こんにちは",              romaji: "Konnichiwa",             en: "Hello" },
      { jp: "おはようございます",        romaji: "Ohayou gozaimasu",       en: "Good morning" },
      { jp: "お願いします",             romaji: "Onegaishimasu",          en: "Please / I'd like this" },
      { jp: "英語は大丈夫ですか？",       romaji: "Eigo wa daijoubu desu ka?", en: "Is English okay?" },
      { jp: "これは何ですか？",          romaji: "Kore wa nan desu ka?",   en: "What is this? (menus)" },
      { jp: "これをください",            romaji: "Kore o kudasai",         en: "This one, please (+ point)" },
      { jp: "トイレはどこですか？",       romaji: "Toire wa doko desu ka?", en: "Where's the bathroom?" },
      { jp: "駅はどこですか？",          romaji: "Eki wa doko desu ka?",   en: "Where's the station?" },
      { jp: "いくらですか？",            romaji: "Ikura desu ka?",         en: "How much is it?" },
      { jp: "二人です",                romaji: "Futari desu",            en: "Two people (at a restaurant)" },
      { jp: "カードは使えますか？",       romaji: "Kaado wa tsukaemasu ka?", en: "Can I use a card?" },
      { jp: "大丈夫です",              romaji: "Daijoubu desu",          en: "It's fine / no thanks" },
      { jp: "わかりません",             romaji: "Wakarimasen",            en: "I don't understand" },
      { jp: "美味しい！",               romaji: "Oishii!",                en: "Delicious!" },
      { jp: "お会計お願いします",         romaji: "Okaikei onegaishimasu",  en: "Check, please" },
      { jp: "写真を撮ってもいいですか？",   romaji: "Shashin o totte mo ii desu ka?", en: "May I take a photo?" },
      { jp: "助けてください",            romaji: "Tasukete kudasai",       en: "Please help me" },
      { jp: "一 二 三 四 五",           romaji: "ichi ni san shi go",     en: "1 2 3 4 5" },
      { jp: "六 七 八 九 十",           romaji: "roku shichi hachi kyuu juu", en: "6 7 8 9 10" },
    ],
    cards: [
      {
        title: "Heat — the defining constraint",
        body: "30–35°C at 70%+ humidity. A 32°C day feels like 38°C. Outdoors BEFORE 10:00 or AFTER 16:00; indoors midday. Carry water constantly — heatstroke here is a real risk, not a caution. Vending machines are everywhere.",
      },
      {
        title: "Subway — you've never ridden one",
        body: "Google Maps is the tool, not a Japan-specific app. TAP IN AND TAP OUT, every ride, no exceptions — forgetting to tap out blocks the exit gate. Lines are colour-coded and numbered, signage is bilingual at every major station. Avoid Tokyo weekday 07:30–09:30.",
      },
      {
        title: "Money",
        body: "Suica via Apple Pay — top up with a foreign card, no physical card needed. Carry ¥30,000–50,000 cash; rural buses, small restaurants and temples are frequently cash-only. 7-Eleven ATMs reliably take foreign cards. No-FX-fee credit card for card-payable spend; the fee-free debit card is the cash source.",
      },
      {
        title: "Obon — Aug 13–16",
        body: "OPEN: shinkansen, subways, konbini, department stores, malls, chain restaurants. CLOSED: many individually-owned restaurants and small shops, 3–5 days from Aug 13, worse in rural areas. Temples and shrines are at their MOST active — it's their season.",
      },
      {
        title: "Luggage",
        body: "Takkyubin ¥1,600–3,700/bag. Forward Tokyo→Osaka on Aug 10 or 11, NOT the morning you leave — standard delivery is next-day-to-two-days. Onomichi is an Airbnb: it cannot receive a Yamato delivery, so send hold-for-pickup to the Shotengai branch. Keep passport, valuables, electronics and meds with you always. Coin lockers ¥400–700/day.",
      },
      {
        title: "Non-negotiables",
        body: "Temple · Hike · See Mt Fuji · Gardens · Nature. Covered: temples (Toshogu, Senkoji, Tōdai-ji), gardens (Hamarikyu), nature (Asuka, Minoh, Onomichi hillside). THIN: dedicated hike — Shimanami Kaido and Minoh Falls are the fallbacks. Fuji rests on the seat-E Shinkansen legs, not on a day trip.",
      },
    ],
  },

  /* ---------- CONFIRMATION FIELD LABELS ----------
     Values live ONLY on the device. This is just the shape.   */
  confirmationFields: [
    { key: "jal",       label: "JAL booking" },
    { key: "parkhotel", label: "Park Hotel Tokyo" },
    { key: "hommachi",  label: "Miyako City Hommachi" },
    { key: "onomichi",  label: "Onomichi Yutori" },
    { key: "nohga",     label: "NOHGA Ueno" },
    { key: "nohga2",    label: "NOHGA gap night" },
    { key: "sx13",      label: "smartEX — Aug 13" },
    { key: "sx17",      label: "smartEX — Aug 17" },
    { key: "sx20",      label: "smartEX — Aug 20" },
  ],
};
