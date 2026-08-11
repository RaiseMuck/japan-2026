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
                  Written to be decided FROM, offline, with no
                  lookup — name, rating, price, walk time inline.
   Anything rateable needs a unique `id` — that's what ratings
   attach to. Never reuse an id.

   Rating buckets: stay | activity | food | daytrip | day
   ============================================================ */

const TRIP = {
  meta: {
    title: "Japan 2026",

    /* OFFLINE FALLBACK ONLY — you do not need to maintain this.
       The header reads this file's real Last-Modified header from the
       server, so freshness is automatic and can't be wrong. This value
       is only used when there's no connection at all. */
    synced: "2026-08-08 20:49",
  },

  /* ---------- STAYS ---------- */
  stays: [
    { id:"stay-shiodome", name:"Park Hotel Tokyo", area:"Shiodome / Higashi-Shimbashi",
      in:"2026-08-10", out:"2026-08-13", nights:3, checkIn:"15:00", checkOut:"11:00",
      note:"Shiodome Media Tower. Hamarikyu, Tsukiji, Ginza all walkable. Breakfast: ART colours Dining, 25F, 07:00–10:30, ¥4,500/~$31pp, NOT included in the rate.",
      map:"https://maps.google.com/?q=Park+Hotel+Tokyo+Shiodome" },
    { id:"stay-hommachi", name:"Miyako City Osaka Hommachi", area:"Hommachi",
      in:"2026-08-13", out:"2026-08-17", nights:4, checkIn:"15:00", checkOut:"11:00",
      note:"Moderate Double, breakfast included. 3 subway stops to Shin-Osaka. Check-in window 15:00–midnight.",
      map:"https://maps.google.com/?q=Miyako+City+Osaka+Hommachi" },
    { id:"stay-onomichi", name:"Onomichi hotel Yutori", area:"Onomichi (5–7 min walk from regular Onomichi Stn)",
      in:"2026-08-17", out:"2026-08-20", nights:3, checkIn:"15:00", checkOut:"10:00",
      note:"Self check-in. NOT walkable from Shin-Onomichi — that's 4.1km, take a taxi.",
      map:"https://maps.google.com/?q=Onomichi+Station" },
    { id:"stay-ueno", name:"NOHGA Hotel Ueno", area:"Ueno",
      in:"2026-08-20", out:"2026-08-23", nights:3, checkIn:"15:00", checkOut:"11:00",
      note:"0.2 mi from Ueno Stn — Keisei Skyliner to Narita departs here.",
      map:"https://maps.google.com/?q=NOHGA+HOTEL+UENO+TOKYO" },
  ],

  days: [
    /* ═══════════════ Aug 9 ═══════════════ */
    { date:"2026-08-09", stayId:null, title:"Fly out", status:"locked",
      anchors:[
        { time:"09:16", title:"Columbus → Chicago", hard:true, note:"JL7331 / AA3414. Moved EARLIER by schedule change — not 10:21." },
        { time:"14:30", title:"Chicago → Haneda", hard:true, note:"JL 9. ~13 hours." },
      ], candidates:[], bench:[] },

    /* ═══════════════ Aug 10 ═══════════════ */
    { date:"2026-08-10", stayId:"stay-shiodome", title:"Arrive Tokyo", status:"locked",
      anchors:[
        { time:"17:30", title:"Land Haneda", hard:true, note:"Activate the eSIM before leaving the gate area. Suica is already loaded — just tap." },
        { time:"18:15", title:"Keikyu Airport Line → SHIMBASHI. No transfer.", hard:false, note:"Signs say 京急線 / Keikyu, BLUE-AND-WHITE, on B1F. NOT the Monorail. ⚠ CHECK THE DESTINATION BEFORE BOARDING — trains to ASAKUSA / OSHIAGE / NARITA / KEISEI all pass Shimbashi ✅. A train to SHINAGAWA terminates there ⚠ — just wait for the next one, they run every few minutes. ~30 min, ~¥500. TAP SUICA IN *AND* OUT." },
        { time:"19:00", title:"Walk to Park Hotel Tokyo", hard:false, note:"~7 min from Shimbashi Station. Shiodome Media Tower — the hotel is on floors 25–34, reception is 25F." },
      ],
      candidates:[
        { id:"food-underpass", bucket:"food", title:"Shimbashi Underpass Alley — dinner", walk:"5 min", cost:"¥¥",
          tags:["dinner","no-reservation"], tip:"Start at Tsukiji Kanemasa. 10 small restaurants, mix-and-match — commit to the neighbourhood, not a booking.",
          link:"https://maps.google.com/?q=Shimbashi+Underpass+Alley" },
      ],
      bench:[
        { replaces:"food-underpass", alt:"Sasagin — same alley, 5 min", why:"First backup if Kanemasa's seating is full. No reservation." },
        { replaces:"food-underpass", alt:"Tachinomidokoro Heso — same alley, 5 min", why:"Second backup. Standing izakaya, turnover is fast so seats open." },
        { replaces:"food-underpass", alt:"Uokin — Shimbashi izakaya alley, 5 min", why:"If the whole Underpass Alley is packed. Standout seafood izakaya, separate strip under the train tracks." },
        { replaces:"food-underpass", alt:"ROUTE FALLBACK — Tokyo Monorail → Hamamatsucho → JR Yamanote → Shimbashi", why:"Only if Keikyu is disrupted. This one HAS a transfer at Hamamatsucho, then one stop on the Yamanote to Shimbashi. Slower and more steps with luggage — Keikyu direct is the better default." },
      ],
      notes:"⚠ ACTUAL: flight delayed ~6h. Landed ~23:30, at the hotel 01:00 Aug 11. Trains and buses had stopped — taxi from Haneda, ¥9,000. Visit Japan Web worked and saved ~30 min at immigration. Not a planning miss; a 1am arrival has no train option." },

    /* ═══════════════ Aug 11 ═══════════════ */
    { date:"2026-08-11", stayId:"stay-shiodome", title:"Harajuku + Shinjuku", status:"locked",
      anchors:[
        { time:"11:00", title:"⚑ FRONT DESK — forward the suitcase to Osaka", hard:true, note:"DO THIS BEFORE YOU LEAVE. Say: 宅急便でこの荷物を大阪のホテルに送りたいです (Takkyubin de kono nimotsu o Osaka no hoteru ni okuritai desu). Show them: MIYAKO CITY OSAKA HOMMACHI, check-in Aug 13. They fill the form. ¥1,600–3,700. Keep the receipt/tracking slip. Pack a daypack with what you need for Aug 11–13 — you won't see this bag until Osaka." },
        { time:"11:30", title:"Out the door — late start is fine today", hard:false, note:"After a 01:00 arrival. Nothing else today has a morning deadline." },
        { time:"12:00", title:"HARAJUKU FIRST — Yamanote, 2 stops from Shinjuku (~5 min)", hard:false, note:"⚠ ORDER FLIPPED ON PURPOSE. Brandy Melville closes 19:00 — that's the ONLY hard deadline today. Everything in Shinjuku (deck, Omoide, Don Quijote) runs late. Do the thing with a clock on it first." },
        { time:"15:00", title:"Move up to Shinjuku", hard:false, note:"Yamanote back north, ~5 min. Rest of the day is deadline-free." },
      ],
      candidates:[
        { id:"act-brandy", bucket:"activity", title:"Brandy Melville Harajuku — Kate's pick", walk:"Harajuku Stn, 3-29-5 Jingumae", cost:"¥¥",
          tags:["shopping","clothes","hard-close"], tip:"OPEN 11:00–19:00 — the day's only deadline. Three floors: basement is bags and accessories. Known for queues, and today is a national holiday so expect weekend-level crowds.",
          link:"https://maps.google.com/?q=Brandy+Melville+Harajuku" },
        { id:"act-takeshita", bucket:"activity", title:"Takeshita Street + Harajuku", walk:"at Harajuku Stn", cost:"¥",
          tags:["shopping","clothes"], tip:"THE backup if Brandy Melville is queued out the door — the whole neighbourhood is clothes. Omotesando next door covers the higher end. A crowded store doesn't waste the trip.",
          link:"https://maps.google.com/?q=Takeshita+Street+Harajuku" },
        { id:"act-tmg", bucket:"activity", title:"Tokyo Metropolitan Gov't Building — observation deck", walk:"8 min from Shinjuku Stn", cost:"Free",
          tags:["skyview"], tip:"The trip's one skyview. Free — beats Shibuya Sky ($16–24) on price and clears the $15pp cap.",
          link:"https://maps.google.com/?q=Tokyo+Metropolitan+Government+Building" },
        { id:"food-tsunahachi", bucket:"food", title:"Tsunahachi Honten — tempura lunch", walk:"18 min from TMG (1.3 km)", cost:"¥¥",
          tags:["lunch"], tip:"", link:"https://maps.google.com/?q=Tsunahachi+Honten+Shinjuku" },
        { id:"food-omoide", bucket:"food", title:"Omoide Yokocho — DINNER", walk:"7 min from Tsunahachi (500 m)", cost:"≤$32 pp",
          tags:["dinner","food-stalls","no-reservation"], tip:"This IS dinner, not a snack stop. Already on the route, no booking, clears budget on its own.",
          link:"https://maps.google.com/?q=Omoide+Yokocho" },
        { id:"act-donki", bucket:"activity", title:"Don Quijote Kabukicho", walk:"5 min from Omoide (300 m)", cost:"¥",
          tags:["shopping"], tip:"Last stop — open late, closes the day out naturally.",
          link:"https://maps.google.com/?q=Don+Quijote+Shinjuku+Kabukicho" },
      ],
      bench:[
        { replaces:"food-omoide", alt:"Kabuki Sushi — 5 min from Shinjuku Stn · Tabelog 3.39 (240) · Manzoku Course ¥4,500 / ~$30", why:"THE sit-down alternative if you want a table instead of stalls. Strongest under-budget sit-down found in the entire trip search. Clears the $32pp cap." },
        { replaces:"food-omoide", alt:"Kuu Nishishinjuku — Tabelog 3.44 (559) · ¥5,000–6,600 / ~$37–46pp", why:"Best-rated find of the whole search, but courses run over budget. Advertises a '¥3,500 and up' option — you'd have to ask for it directly at the door." },
        { replaces:"food-omoide", alt:"Kizuna Sushi Kabukicho — Tabelog 3.47 (1,068) · ¥5,000 / ~$34pp", why:"Most-reviewed restaurant found anywhere on this trip. Just over the cap — a stretch, not a clears-budget pick." },
      ],
      notes:"⚑ FORWARD THE SUITCASE AT THE FRONT DESK BEFORE YOU GO OUT — today is the last day that works. ⚠ AUG 11 IS MOUNTAIN DAY — a Japanese national holiday, so Takkyubin may run a day slower; another reason to drop it early rather than this evening. Harajuku will be busy; get there as early as you manage. Order deliberately flipped: Harajuku (19:00 close) before Shinjuku (nothing closes). Dinner budget was recut to $32pp on Aug 8 — the trip affords ONE splurge and that's Motoyama on Aug 21, so Sushi Tokyo Ten and Azabu are both off." },

    /* ═══════════════ Aug 12 ═══════════════ */
    { date:"2026-08-12", stayId:"stay-shiodome", title:"Nikko day trip", status:"locked",
      anchors:[
        { time:"06:30", title:"Depart Asakusa — Tobu Limited Express", hard:false, note:"~2h. Earlier is better; the whole day is built backward from the return train." },
        { time:"17:22", title:"Return express (the target) — Tobu Ltd Express", hard:false, note:"2h07 → Asakusa 19:29. Verified live for WEDNESDAY Aug 12." },
        { time:"17:44", title:"LAST Tobu Ltd Express — the real wall", hard:true, note:"2h05 → Asakusa 19:49. After this the only options are 3h+ multi-transfer routes via Tsukuba Express or Shonan-Shinjuku. THIS is the train to build the day backward from." },
      ],
      candidates:[
        { id:"act-toshogu", bucket:"activity", title:"Toshogu Shrine", walk:"Nikko town core", cost:"Incl. in pass",
          tags:["temple","morning"], tip:"Go first, before the tour buses.", link:"https://maps.google.com/?q=Nikko+Toshogu" },
        { id:"act-kegon", bucket:"activity", title:"Kegon Falls + Akechidaira Ropeway — VERSION A", walk:"bus to Chuzenji", cost:"Incl. in pass",
          tags:["nature","sightseeing"], tip:"The sightseeing day. Ryuzu Falls on the way back down.", link:"https://maps.google.com/?q=Kegon+Falls" },
        { id:"act-senjogahara", bucket:"activity", title:"Senjogahara boardwalk hike — VERSION B", walk:"bus past Kegon to Yudaki Falls", cost:"Incl. in pass",
          tags:["hike","nature","cool"], tip:"6 km flat wooden boardwalk, Yudaki Falls → Ryuzu Falls, ~3h (2h if you stop at Akanuma). Almost no climbing. AT 1,400m — the only genuinely cool outdoor thing on this trip. Ends at Ryuzu, which was already on the plan, and it's all on the All Area Pass bus route. THE trip's real hike.",
          link:"https://maps.google.com/?q=Senjogahara+Nikko" },
        { id:"food-kanaya", bucket:"food", title:"Nikko Kanaya Hotel — LUNCH not dinner", walk:"Nikko town", cost:"¥¥",
          tags:["lunch"], tip:"Moved to lunch specifically to fit the return train. The '100-year curry' is real, and so is Purin-tei's 3 Era Pudding.",
          link:"https://maps.google.com/?q=Nikko+Kanaya+Hotel" },
      ],
      bench:[
        { replaces:"food-kanaya", alt:"Purin-tei — Nikko town · '3 Era Pudding' tasting", why:"If Kanaya's dining room is full or slow. Dessert-forward, quick, and it's the other thing you specifically remembered about Nikko." },
        { replaces:"act-kegon", alt:"⚑ THE FORK — pick Version A or B on the morning, based on how you slept", why:"A = Toshogu unhurried + Kegon + ropeway + Ryuzu + Kanaya lunch (sightseeing). B = Toshogu quick + bus to Yudaki + 3h Senjogahara boardwalk to Ryuzu + Kanaya lunch (hiking). You cannot do both. B is what the 17:22/17:44 train correction bought — but it's a 06:30 start on limited sleep, so decide it Wednesday morning, not in advance." },
        { replaces:"act-kegon", alt:"EXTRA TIME — Ryuzu Falls + Lake Chuzenji shoreline", why:"If you take Version A, this is where the recovered 2 hours go. Already on the bus route back." },
        { replaces:"act-toshogu", alt:"IF RUNNING LATE — skip the 17:22, take the 17:44", why:"22 minutes of slack that costs nothing. Only fall past 17:44 if something has genuinely gone wrong — the next options are 3h+ with transfers." },
      ],
      notes:"⚠ CORRECTED Aug 8: the old plan said 15:26 was the last express — that came from a SATURDAY timetable used as a proxy and it was wrong. A live Wednesday check shows expresses at 17:22 and 17:44. You have ~2 MORE HOURS in Nikko than the earlier plan assumed, so Chuzenji no longer has to be rushed and Kanaya can be a real sit-down lunch. All Area Pass ¥8,000/adult — NOT the ¥3,000 World Heritage pass, which doesn\'t reach Chuzenji. No Fuji view from Nikko; Fuji rests on the seat-E Shinkansen legs." },

    /* ═══════════════ Aug 13 ═══════════════ */
    { date:"2026-08-13", stayId:"stay-hommachi", title:"Tokyo → Osaka", status:"locked",
      anchors:[
        { time:"11:00", title:"Checkout — Park Hotel", hard:true, note:"Hotel breakfast closes 10:30 (last order 10:00) — it CANNOT fill the post-checkout gap. Eat earlier or grab coffee to go." },
        { time:"11:30", title:"Walk to Shimbashi → JR → Tokyo Station", hard:false, note:"~5 min walk + ~5 min ride + 15–20 min to reach the Shinkansen gates. Tokyo Station is big — don't cut this fine." },
        { time:"12:05", title:"Platform buffer — buy ekiben here", hard:false, note:"The ride spans the actual lunch hour and nothing else covers it. Ekiben shops plus Character Street / Ramen Street are right in the station." },
        { time:"12:18", title:"Nozomi 389 → Shin-Osaka", hard:true, note:"Car 2, Seats 9-D / 9-E. 9-E is the Fuji side. Arrives 14:45." },
        { time:"15:15", title:"Check in — Miyako City Osaka Hommachi", hard:false, note:"Midōsuji Line + walk, 24 min from Shin-Osaka, live-checked. ~¥280." },
      ],
      candidates:[
        { id:"act-nakanoshima", bucket:"activity", title:"Nakanoshima — riverside park walk", walk:"short walk / 1 stop from Hommachi", cost:"Free",
          tags:["nature","gardens","afternoon"], tip:"The lead pick for the 15:15–18:00 gap. Japanese garden, rose garden (3,700 roses), Osaka City Central Public Hall (Meiji architecture), water plaza. Nothing else on the trip is a riverside-park walk.",
          link:"https://maps.google.com/?q=Nakanoshima+Park+Osaka" },
        { id:"food-gotto", bucket:"food", title:"GOTTO Sakaba Bingomachi — dinner option A", walk:"3 min from Hommachi Stn", cost:"¥3,500+ / ~$24pp",
          tags:["dinner","izakaya"], tip:"Ou and Kobe beef, Akashi Market seafood, horse sashimi. All-you-can-drink course. Open Mon–Sat 17:00–24:00 — confirmed open this Thursday. Minimal walking after a travel day.",
          link:"https://maps.google.com/?q=GOTTO+Sakaba+Bingomachi" },
        { id:"food-dotonbori", bucket:"food", title:"Dotonbori food-stall crawl — dinner option B", walk:"12–15 min or short taxi", cost:"¥1,500–2,500 / ~$10–17pp",
          tags:["dinner","food-stalls","no-reservation"], tip:"Takoyaki, okonomiyaki, walk-and-graze. Kushikatsu Daruma if a semi-sit-down is wanted: ¥120–240/skewer, combo sets ¥1,400–2,200. Cheaper than GOTTO.",
          link:"https://maps.google.com/?q=Dotonbori" },
      ],
      bench:[
        { replaces:"act-nakanoshima", alt:"Dobuike Street — in Hommachi itself, 0 transit", why:"Lower-effort fallback if the legs are done after the travel day. Narrow streets, vintage shops, street art. Browse-only, no purchase needed to make it worth the walk." },
        { replaces:"act-nakanoshima", alt:"Just rest at the hotel", why:"Legitimate option — this is explicitly a mood call, and tomorrow is a 06:45 Nara start." },
        { replaces:"act-nakanoshima", alt:"Osaka Aquarium KAIYUKAN — Hommachi → Chuo Line → Osakako, ~22 min + 5 min walk, ~¥280 · ¥2,400 · last entry 19:00", why:"The 15:15–18:00 gap is long enough for it, and it's indoor + air-conditioned after a travel day. Aug 14 and Aug 16 afternoons work too — take whichever day has the most energy left." },
        { replaces:"food-gotto", alt:"Kuroge Wagyu Ittogai Yakiniku Mitsuru — Shinsaibashi, 2 min from Shinsaibashi Stn · Tabelog 3.33 (208) · ¥4,400 / ~$30", why:"Only worth it if the evening ends up routing through Dotonbori/Shinsaibashi anyway. Yakiniku instead of sashimi/izakaya." },
      ],
      notes:"First day of Obon. Suitcase already forwarded — daypack only. Osaka Castle is explicitly OFF for arrival day: real landmark, wrong day. After dinner, a short Dotonbori walk either way for the canal and neon — keep it short, 06:45 start tomorrow." },

    /* ═══════════════ Aug 14 ═══════════════ */
    { date:"2026-08-14", stayId:"stay-hommachi", title:"Nara", status:"locked",
      anchors:[
        { time:"06:45", title:"Leave hotel — konbini breakfast on the walk", hard:false, note:"Hotel buffet is too tight against a hard 07:00 train. Grab-and-go from a konbini is the reliable call; Nara Park has nothing before 08:00 and Naramachi lunch is ~10:30." },
        { time:"07:00", title:"Kintetsu Osaka-Namba → Kintetsu-Nara", hard:true, note:"¥680, 35–40 min. This early specifically to beat the 10:00 tour-bus wall. Kintetsu beats JR (¥840) on price, speed AND drops you closer." },
        { time:"14:25", title:"Back in Osaka", hard:false, note:"Kintetsu back to Osaka-Namba, then Midōsuji to Hommachi." },
      ],
      candidates:[
        { id:"dt-nara", bucket:"daytrip", title:"Nara — the whole day", walk:"station sits at the park edge", cost:"¥680 rail",
          tags:["daytrip"], tip:"07:45–09:00 park + deer. 09:00–09:45 Tōdai-ji. 09:45–10:30 Kasuga Taisha. 10:30–13:00 Naramachi + lunch.",
          link:"https://maps.google.com/?q=Kintetsu+Nara+Station" },
        { id:"act-deer", bucket:"activity", title:"Nara Park + deer feeding", walk:"at the station", cost:"¥200 crackers",
          tags:["nature","morning"], tip:"~1,200 deer. Shika senbei crackers ¥200. Best light and lowest crowds this early — this is why the 07:00 train matters.",
          link:"https://maps.google.com/?q=Nara+Park" },
        { id:"act-todaiji", bucket:"activity", title:"Tōdai-ji Daibutsuden", walk:"in Nara Park", cost:"¥800",
          tags:["temple","morning"], tip:"The Great Buddha. Park grounds themselves are free. Covers the 'temple' non-negotiable.",
          link:"https://maps.google.com/?q=Todaiji" },
        { id:"act-kasuga", bucket:"activity", title:"Kasuga Taisha", walk:"from Tōdai-ji", cost:"Free to walk",
          tags:["temple","nature"], tip:"Forest path lined with stone and bronze lanterns.",
          link:"https://maps.google.com/?q=Kasuga+Taisha" },
        { id:"act-naramachi", bucket:"activity", title:"Naramachi — old merchant district", walk:"from Kasuga", cost:"Free",
          tags:["historic","lunch"], tip:"Machiya townhouses, small shops and cafés. LUNCH HAPPENS HERE — nothing needs a reservation, pick on the day.",
          link:"https://maps.google.com/?q=Naramachi" },
      ],
      bench:[
        { replaces:"dt-nara", alt:"Evening dinner: GOTTO Sakaba or Dotonbori — whichever wasn't used Aug 13", why:"Same flexible pair as last night. Take the one you skipped, for variety." },
        { replaces:"act-naramachi", alt:"Udon-making class — IRICOSKY · 90 min · ¥6,820/group · bookable same-day up to 2h ahead", why:"If Nara ran lighter than expected, this fits the 15:00–18:00 recovery gap. Part of the flexible Osaka bench." },
      ],
      notes:"Tiring day — 06:45 start, ~7hrs on the ground in Nara heat. The 15:00–18:00 block back in Osaka defaults to REST, more so than Aug 13's did." },

    /* ═══════════════ Aug 15 ═══════════════ */
    { date:"2026-08-15", stayId:"stay-hommachi", title:"Kurashiki + Okayama · teamLab", status:"locked",
      anchors:[
        { time:"07:15", title:"Leave — konbini breakfast again", hard:false, note:"Same tension as yesterday. Quick and reliable beats a tight buffet visit." },
        { time:"08:00", title:"Sanyo Shinkansen, Shin-Osaka → Okayama", hard:false, note:"~45 min." },
        { time:"17:30", title:"EARLY light dinner — must be quick", hard:true, note:"Not the leisurely GOTTO/Dotonbori pair. teamLab entry is hard at 19:30 and this is just fuel. Spot still unpicked — grab something fast near Hommachi or on the Nagai line." },
        { time:"19:30", title:"teamLab Botanical Garden — LOCKED", hard:true, note:"Night-only. LAST ENTRY 20:30. Nagai Park, Midōsuji Line direct from Hommachi (no transfer), ~10 min walk from Nagai Station." },
      ],
      candidates:[
        { id:"dt-kurashiki", bucket:"daytrip", title:"Kurashiki + Okayama", walk:"~1.5h each way", cost:"Shinkansen + ¥330",
          tags:["daytrip"], tip:"Shin-Osaka → Okayama (~45 min), then Okayama → Kurashiki (San-yo Main Line, ~16 min, ¥330). Explicitly under-touristed — strongest no-crowds pick of the three day trips.",
          link:"https://maps.google.com/?q=Kurashiki+Bikan+Historical+Quarter" },
        { id:"act-okayama-castle", bucket:"activity", title:"Okayama Castle", walk:"08:45–10:00", cost:"¥",
          tags:["castle","morning"], tip:"'Crow Castle' — black exterior.", link:"https://maps.google.com/?q=Okayama+Castle" },
        { id:"act-bikan", bucket:"activity", title:"Kurashiki Bikan Historical Quarter", walk:"10:20–13:00", cost:"Free to walk",
          tags:["historic","canal","lunch"], tip:"Preserved Edo canal town, art museums. LUNCH HAPPENS HERE — canal-side cafés, nothing needs booking.",
          link:"https://maps.google.com/?q=Kurashiki+Bikan+Historical+Quarter" },
        { id:"act-teamlab", bucket:"activity", title:"teamLab Botanical Garden", walk:"Nagai Park", cost:"¥¥",
          tags:["evening","art","locked"], tip:"19:30–21:30, last entry 20:30. Digital art through a living botanical garden after dark.",
          link:"https://maps.google.com/?q=teamLab+Botanical+Garden+Osaka+Nagai" },
      ],
      bench:[
        { replaces:"act-okayama-castle", alt:"Korakuen Garden — immediately next to Okayama Castle · +45–60 min", why:"One of Japan's 'three great gardens' and ZERO extra transit. Worth it if the morning has slack. Pure add-on, not a swap." },
        { replaces:"act-bikan", alt:"Kurashiki lunch — canal-side cafés throughout the Bikan Quarter", why:"Genuinely unpicked and deliberately so. Nothing needs a reservation; look on the day." },
      ],
      notes:"DECIDED Aug 8 — Nintendo World is OUT, Kurashiki stays, teamLab stays on tonight. No contingency left on this day. The 14:30–17:30 block back in Osaka is recovery — the udon class could fit if it starts by 15:30–16:00, but Object Osaka does NOT fit tonight (wrong direction from the Hommachi→Nagai route)." },

    /* ═══════════════ Aug 16 ═══════════════ */
    { date:"2026-08-16", stayId:"stay-hommachi", title:"Minoh Falls + Katsuoji", status:"locked",
      anchors:[
        { time:"08:00", title:"Leave Hommachi — Midōsuji to Umeda", hard:false, note:"Then transfer to the Hankyu Takarazuka Line for Minoo Station. Runs as a loop, no backtracking." },
        { time:"11:15", title:"Taxi, Minoo → Katsuoji", hard:false, note:"~¥3,600, 15 min. No practical alternative — the bus is infrequent." },
        { time:"13:20", title:"Taxi/bus → Senri-Chūō, then Midōsuji direct home", hard:false, note:"Direct back to Hommachi, no transfer. This is why the loop routing was chosen." },
        { time:"18:00", title:"Dinner — Yamano Ya Ichiba", hard:false, note:"Last night in Osaka. Connected to Hommachi Station by a 199m underground passage — no weather, no walk." },
      ],
      candidates:[
        { id:"act-minoh", bucket:"activity", title:"Minoh Falls", walk:"~45 min paved path each way", cost:"Free",
          tags:["hike","nature","waterfall"], tip:"09:00–11:00. Monkeys, shrines, the bridge. This is the trip's answer to the 'hike' non-negotiable — the category the trip was thinnest on.",
          link:"https://maps.google.com/?q=Minoh+Falls" },
        { id:"act-katsuoji", bucket:"activity", title:"Katsuoji Temple", walk:"15 min taxi from Minoo", cost:"¥",
          tags:["temple","gardens"], tip:"11:30–13:00. The 'Daruma temple' — 1,300 years old, thousands of daruma dolls tucked everywhere. Seasonal gardens.",
          link:"https://maps.google.com/?q=Katsuoji+Temple" },
        { id:"food-yamanoya", bucket:"food", title:"Yamano Ya Ichiba — dinner", walk:"199m underground from Hommachi Stn", cost:"¥3,300 / ~$23pp",
          tags:["dinner","sashimi"], tip:"Tabelog 3.43 (222). Sashimi platter + 30 kinds all-you-can-drink. Online instant reservation. The Osaka send-off.",
          link:"https://maps.google.com/?q=Yamano+Ya+Ichiba+Hommachi" },
      ],
      bench:[
        { replaces:"food-yamanoya", alt:"GOTTO Sakaba Bingomachi — 3 min from Hommachi Stn · Tabelog rated · from ¥3,500 / ~$24", why:"Fallback if Yamano Ya's sake-heavy sashimi format doesn't appeal, or if it's full. Both clear budget easily." },
        { replaces:"act-katsuoji", alt:"Object Osaka — custom-patch shop, Nishishinsaibashi · 5–10 min detour", why:"Flexible Osaka bench item. Only fits if the evening routes through Dotonbori/Shinsaibashi instead of staying near Hommachi." },
        { replaces:"act-katsuoji", alt:"AFTERNOON GAP — Osaka Aquarium KAIYUKAN · 10:00–20:00, last entry 19:00 · ¥2,400 wkdy / ¥2,700 peak", why:"Fits the 14:00–18:00 block cleanly. Hommachi → Chuo Line → Osakako, ~22 min total + 5 min walk, ~¥280. One of the world's largest aquariums (whale sharks). Also fits Aug 13's or Aug 14's afternoon gap if this day runs long." },
      ],
      notes:"Swapped in for Asuka on Aug 8 — both of these were asked for by name; Asuka was picked by process of elimination. The 14:00–18:00 block is where the Takkyubin suitcase-forward errand goes (front desk → Yamato Onomichi Shotengai) — a quick stop, rest of the block is genuinely free." },

    /* ═══════════════ Aug 17 ═══════════════ */
    { date:"2026-08-17", stayId:"stay-onomichi", title:"Osaka → Himeji → Onomichi", status:"locked",
      anchors:[
        { time:"11:00", title:"Checkout — Hommachi", hard:true, note:"" },
        { time:"12:00", title:"Himeji Castle", hard:false, note:"Hommachi→Himeji 1h26 by JR rapid, ¥1,650. NOT Shinkansen. Budget 1.5–3h at the castle depending on crowds." },
        { time:"14:19", title:"Himeji → Shin-Onomichi", hard:true, note:"NOZOMI153 → Okayama → KODAMA953. Arrives 15:23." },
        { time:"15:35", title:"Taxi → hotel", hard:false, note:"~10 min, ¥1,500–2,000. Shin-Onomichi is 4.1km from the hotel — NOT walkable, and it's a different station from regular Onomichi." },
      ],
      candidates:[
        { id:"act-himeji", bucket:"activity", title:"Himeji Castle", walk:"from Himeji Stn", cost:"¥1,650 rail",
          tags:["castle","historic"], tip:"Japan's finest surviving castle. Folded into the move day rather than costing a separate day-trip slot.",
          link:"https://maps.google.com/?q=Himeji+Castle" },
        { id:"food-yamatoyu", bucket:"food", title:"Yamatoyu — dinner (DECIDED)", walk:"15 min from Onomichi Stn, closer to the hotel", cost:"¥3,000–3,999",
          tags:["dinner","izakaya"], tip:"Tabelog 3.33 (104). A converted 100-year-old bathhouse, now a xiaolongbao izakaya. Same neighbourhood as the Yamato Shotengai luggage pickup — collect the suitcase, then eat.",
          link:"https://maps.google.com/?q=Yamatoyu+Onomichi" },
      ],
      bench:[
        { replaces:"food-yamatoyu", alt:"Komedoko Shokudo — 3 min from Onomichi Stn · Tabelog 3.29 (75) · ¥4,000–5,000", why:"The fallback. Closer to the station and ocean-view, sister restaurant to Tamaganzo. Take it if Yamatoyu is full or the 15-min walk is too much after a move day." },
      ],
      notes:"Daypack-only move day — the suitcase was forwarded ahead to Yamato Onomichi Shotengai for hold-for-pickup. Collect it in person; the hotel can't receive a Yamato delivery." },

    /* ═══════════════ Aug 18 ═══════════════ */
    { date:"2026-08-18", stayId:"stay-onomichi", title:"Onomichi — Senkoji", status:"locked",
      anchors:[
        { time:"09:30", title:"Walk to the Senkoji ropeway base", hard:false, note:"No early-start pressure this leg — Onomichi's whole appeal is that it's under-touristed. Relaxed breakfast is fine." },
        { time:"09:45", title:"Ropeway up", hard:false, note:"¥500 one-way / ¥700 round trip, 3–4 min. Buy ONE WAY — the walk down is the point." },
        { time:"17:00", title:"Dinner — Onomichi WHARF", hard:true, note:"Fixed to tonight by a real constraint: WHARF is CLOSED WEDNESDAYS and Aug 19 is a Wednesday. Showing up tomorrow expecting it open would be a real miss." },
      ],
      candidates:[
        { id:"act-senkoji", bucket:"activity", title:"Senkoji Temple — ropeway up, walk down", walk:"09:50–11:30", cost:"¥500 one-way",
          tags:["temple","views"], tip:"Est. 806 AD. Ride up, walk down through Cat Street (Neko no Hosomichi) — stone steps, small cafés, the Manekineko Museum (1,500+ cat figurines). ~2–2.5h total. Onomichi's one must-do.",
          link:"https://maps.google.com/?q=Senkoji+Temple+Onomichi" },
        { id:"food-onomichi-ramen", bucket:"food", title:"Onomichi ramen — lunch", walk:"near the station or arcade", cost:"~¥600",
          tags:["lunch","local"], tip:"The local specialty: clear shoyu broth, chicken fat, pork back fat. Specific shop deliberately unpicked — low stakes, look on the day.",
          link:"https://maps.google.com/?q=Onomichi+ramen" },
        { id:"food-wharf", bucket:"food", title:"Onomichi WHARF — dinner", walk:"1–2 min from Onomichi Stn", cost:"¥4,400 / ~$30",
          tags:["dinner","waterfront"], tip:"Tabelog 3.37 (131) — edges Tamaganzo on both rating and sample size, and it's closer to the station. Standard Plan clears budget.",
          link:"https://maps.google.com/?q=Onomichi+WHARF" },
      ],
      bench:[
        { replaces:"act-senkoji", alt:"AFTERNOON (13:00–17:00) — Path of Literature · free, from Senkoji Park down toward town", why:"Boulder-quote trail on the SAME hillside as the morning. Zero cost, natural extension if the legs have anything left. (Was mis-filed under Aug 19 — it's nowhere near the bike route.)" },
        { replaces:"act-senkoji", alt:"AFTERNOON — Onomichi U2 · converted 1942 harborside warehouse", why:"Design-forward cycling-hub complex: bakery, boutique, Giant bike shop, Yard Cafe with a cycle-thru espresso window. Deliberately a different register from the morning's temple walk. Browsing and coffee is cheap — only its restaurant was ruled out on price." },
        { replaces:"act-senkoji", alt:"AFTERNOON — Onomichi Motion Picture Museum", why:"Film props and a screening room. Onomichi was the location for nine Nobuhiko Obayashi films. Jodo-ji and Tenneiji's pagoda — the postcard shots — are on the same Cat Street descent, so it layers meaning onto a walk you're already doing." },
        { replaces:"act-senkoji", alt:"AFTERNOON — just rest", why:"The plain default. Reasonable given tomorrow is a bike ride in August heat." },
      ],
      notes:"Deliberately NOT a dedicated Hondori arcade block or the 25-temple Temple Trail. Shinjuku and Yanaka Ginza already cover arcades twice; the Temple Trail would be a 4th temple after Toshogu/Senkoji/Tōdai-ji. Both fine as pass-throughs, not planned blocks." },

    /* ═══════════════ Aug 19 ═══════════════ */
    { date:"2026-08-19", stayId:"stay-onomichi", title:"Shimanami Kaido bike day", status:"locked",
      anchors:[
        { time:"08:00", title:"Rent bikes near Onomichi Port", hard:false, note:"~¥2,000/day — half-day pricing unconfirmed, ask at the counter. Terminal opening hours also unconfirmed. Earlier start than yesterday ON PURPOSE: 30–35°C at 70%+ humidity, get the riding done before midday." },
        { time:"08:20", title:"Ferry to Mukaishima", hard:false, note:"¥110. 1-min pedal from the rental terminal to the port." },
        { time:"17:00", title:"Dinner — Tamaganzo", hard:false, note:"Fixed to tonight because WHARF is closed Wednesdays and today IS Wednesday." },
      ],
      candidates:[
        { id:"act-shimanami", bucket:"activity", title:"Shimanami Kaido — Mukaishima → Innoshima and back", walk:"08:30–11:30, ~3–4h door to door", cost:"~¥2,000 bike + ¥110 ferry",
          tags:["cycling","nature","hike"], tip:"A half-day taste, NOT the full 70km Imabari route. Perimeter ride to Innoshima Bridge (1,270m, bike toll free through Mar 2026) and back the way you came. The trip's only cycling, and it's the town's namesake.",
          link:"https://maps.google.com/?q=Shimanami+Kaido+Onomichi" },
        { id:"food-tamaganzo", bucket:"food", title:"Tamaganzo — dinner", walk:"5 min from Onomichi Stn, no stairs", cost:"¥3,800 / ~$26",
          tags:["dinner","ocean-view"], tip:"Tabelog 3.33 (94). Ocean-view brick building. 'Food only' course clears budget.",
          link:"https://maps.google.com/?q=Tamaganzo+Onomichi" },
      ],
      bench:[
        { replaces:"act-shimanami", alt:"EXTENSION — Innoshima Park / Mt. Tenguyama (207m) summit hike", why:"On the SAME island the ride already reaches, so it's an extension not a new outing. Adds ~1.5–2h. Only if the bike leg is going fast and energy is genuinely high — would give a second 'hike' beyond Minoh." },
        { replaces:"act-shimanami", alt:"AFTERNOON (13:00–17:00) — Onomichi U2, if unused yesterday", why:"Walkable, casual, asks nothing of legs that just cycled." },
        { replaces:"act-shimanami", alt:"AFTERNOON — Hondori arcade, as a last-chance souvenir errand", why:"The ONE exception to the no-third-arcade rule: this is genuinely the last chance before tomorrow's move-out. Errand, not a planned block." },
        { replaces:"act-shimanami", alt:"AFTERNOON — rest", why:"Default lean after a morning of physical activity in the heat." },
      ],
      notes:"Last full Onomichi day. Pack tonight for tomorrow's move-out. The suitcase should already have gone ahead to NOHGA Tokyo — drop it at Yamato Shotengai or a konbini if it hasn't." },

    /* ═══════════════ Aug 20 ═══════════════ */
    { date:"2026-08-20", stayId:"stay-ueno", title:"Onomichi → Tokyo", status:"locked",
      anchors:[
        { time:"10:00", title:"Checkout", hard:true, note:"" },
        { time:"11:30", title:"Taxi → Shin-Onomichi", hard:true, note:"~10 min. The one transfer with no slack behind it — leave 35–50 min of buffer." },
        { time:"12:21", title:"Shin-Onomichi → Tokyo", hard:true, note:"KODAMA948 → Okayama → NOZOMI24. Arrives Tokyo 16:15." },
        { time:"18:30", title:"Dinner — Yakitori Ueno Bunraku", hard:false, note:"WALK-IN ONLY, no reservations. CASH / e-money only — no credit cards. Suits an arrival evening with uncertain timing." },
      ],
      candidates:[
        { id:"food-bunraku", bucket:"food", title:"Yakitori Ueno Bunraku — dinner", walk:"2 min from Ueno Stn", cost:"¥1,000–2,999",
          tags:["dinner","yakitori","no-reservation","cash-only"], tip:"Tabelog 3.49 (774) — the best-rated AND best-reviewed restaurant found anywhere in this trip's entire search.",
          link:"https://maps.google.com/?q=Yakitori+Ueno+Bunraku" },
      ],
      bench:[
        { replaces:"food-bunraku", alt:"Nonchan Ameyoko ten — 1 min from Ueno Stn · Tabelog 3.19 (106) · reservable · ¥1,200–5,000", why:"If Bunraku's walk-in queue is long. It's also Aug 22's pick, so using it tonight means finding something else then." },
        { replaces:"food-bunraku", alt:"Ueno Yokocho — Tabelog 3.09 (94)", why:"Third option, rated lowest of the three Ueno finds. Only if both above fail." },
      ],
      notes:"Arrives Tokyo 16:15 — evening only, no real day here." },

    /* ═══════════════ Aug 21 ═══════════════ */
    { date:"2026-08-21", stayId:"stay-ueno", title:"Ueno — museum, Toshogu, Yanaka Ginza", status:"locked",
      anchors:[
        { time:"19:00", title:"Yakiniku Motoyama Honten — THE splurge dinner", hard:true, note:"Locked Aug 8. Tabelog 3.40 (378) — strongest review profile of the trip. A5 wagyu. ✅ BOOKED — MANZOKU course. 1–2 min from Okachimachi Stn, next door to NOHGA. Prepaid via Tabelog." },
      ],
      candidates:[
        { id:"act-tnm", bucket:"activity", title:"Tokyo National Museum — Honkan building", walk:"~10 min from NOHGA, in Ueno Park", cost:"¥1,000",
          tags:["museum","indoor","morning"], tip:"Morning, budget 2–3h. Japan's oldest and largest museum: samurai swords and armour, Buddhist sculpture, ukiyo-e, kimono. FRIDAY — open till 20:00 instead of 17:00, so a long morning is fine.",
          link:"https://maps.google.com/?q=Tokyo+National+Museum" },
        { id:"act-ueno-toshogu", bucket:"activity", title:"Ueno Toshogu Shrine", walk:"inside Ueno Park — zero extra travel", cost:"¥700",
          tags:["temple","afternoon"], tip:"30–60 min. Tokugawa-era shrine, gold-leaf shaden, peony garden.",
          link:"https://maps.google.com/?q=Ueno+Toshogu+Shrine" },
        { id:"act-yanaka", bucket:"activity", title:"Yanaka Ginza", walk:"~20 min from Ueno, or 5 min from Nippori/Sendagi", cost:"Free",
          tags:["historic","shitamachi"], tip:"Tokyo's best-preserved old-town. Family-run shops, fried croquettes, traditional sweets, local crafts. Yanaka Cemetery is temple-lined with sakura. Real old-Tokyo character — this is the substance swap that replaced Ameyoko.",
          link:"https://maps.google.com/?q=Yanaka+Ginza" },
        { id:"food-motoyama", bucket:"food", title:"Yakiniku Motoyama Honten", walk:"1–2 min from Okachimachi Stn", cost:"Manzoku course",
          tags:["dinner","wagyu","booked","splurge"], tip:"The trip's ONE splurge. 19:00, BOOKED and prepaid. Tabelog 3.40 (378), A5 wagyu.",
          link:"https://maps.google.com/?q=Yakiniku+Motoyama+Honten+Ueno" },
      ],
      bench:[
        { replaces:"act-yanaka", alt:"Nezu Shrine — short walk further from Yanaka", why:"Torii-gate tunnel and a garden. Only if there's still time and daylight after Yanaka Ginza." },
        { replaces:"act-yanaka", alt:"Ameyoko — 5-min detour from the park", why:"DROPPED as a plan (it'd be the trip's 3rd bargain-market block). Keep it only as a quick detour if a specific last-minute souvenir is needed." },
        { replaces:"act-tnm", alt:"LUNCH, still open — Pontahonke (tonkatsu, among Ueno's best 3) · Torikei Ueno Hiro Koji (yakitori, top-100 six years running) · Niku no Ohyama (butcher-run, cheap) · Taimeiken (omurice, inside Ueno Stn) · Hachinoki (all-you-can-eat meat)", why:"Five candidates, none picked. Natural to grab something at the shrine→Yanaka transition. Keep it light — Motoyama is 19 courses." },
      ],
      notes:"The one genuinely free day, and it's now full. Ameyoko was deliberately swapped out for Toshogu + Yanaka Ginza — more substance, and it avoided a third bargain-market block." },

    /* ═══════════════ Aug 22 ═══════════════ */
    { date:"2026-08-22", stayId:"stay-ueno", title:"Last full day", status:"partial",
      anchors:[
        { time:"18:00", title:"Dinner — Nonchan Ameyoko ten", hard:false, note:"Reservable, unlike last night's Bunraku. Picked specifically to be a different format so the same neighbourhood doesn't repeat identically." },
      ],
      candidates:[
        { id:"food-nonchan", bucket:"food", title:"Nonchan Ameyoko ten — dinner", walk:"1 min from Ueno Stn", cost:"¥1,200–5,000",
          tags:["dinner","reservable"], tip:"Tabelog 3.19 (106). All-you-can-drink courses.",
          link:"https://maps.google.com/?q=Nonchan+Ameyoko+Ueno" },
        { id:"food-pontahonke", bucket:"food", title:"Pontahonke — tonkatsu lunch", walk:"Ueno", cost:"¥¥",
          tags:["lunch","local"], tip:"Said to be among Ueno's best three.", link:"https://maps.google.com/?q=Pontahonke+Ueno" },
        { id:"food-taimeiken", bucket:"food", title:"Taimeiken — omurice, inside Ueno Station", walk:"in the station", cost:"¥",
          tags:["lunch"], tip:"The zero-effort option on a pack day.", link:"https://maps.google.com/?q=Taimeiken+Ueno+Station" },
        { id:"act-sumida-aq", bucket:"activity", title:"Sumida Aquarium — the AMANO one ⚑ THE DAY'S ANCHOR", walk:"~15 min from Ueno (Ginza Line via Asakusa)", cost:"~¥2,500",
          tags:["aquarium","aquascaping","indoor","anchor"], tip:"✅ HOURS CONFIRMED — Aug 22 is a SATURDAY: 09:00–21:00, LAST ENTRY 20:00. The most generous hours of any day you could have gone. Floors 5–6 of Tokyo Skytree. Takashi Amano designed the nature aquariums — ONE OF ONLY THREE worldwide with ADA-designed tanks (others: Lisbon, Sapporo). The 'Mecca of plant tankers.' Indoor, so weather is irrelevant.",
          link:"https://maps.google.com/?q=Sumida+Aquarium+Tokyo+Skytree" },
      ],
      bench:[
        { replaces:"food-nonchan", alt:"Ueno Yokocho — Tabelog 3.09 (94)", why:"Fallback. Rated lowest of the three Ueno options found." },
        { replaces:"food-pontahonke", alt:"Torikei Ueno Hiro Koji (yakitori, top-100 six years running) · Niku no Ohyama (butcher-run fried food, cheap) · Hachinoki (50+ yr all-you-can-eat meat)", why:"Three more from the same Ueno shortlist if the first picks are shut or queued." },
        { replaces:"food-pontahonke", alt:"Ameyoko — last souvenir window", why:"If anything's still unbought, today is the last realistic chance. Narita is early tomorrow." },
      ],
      notes:"SUMIDA AQUARIUM is this day's anchor. Saturday hours (09:00–21:00) are the best of any candidate day, and the day is otherwise light. NOTE: Aug 12 was checked and RULED OUT — Skytree is right by Asakusa but weekday last entry is 19:00 and you arrive 19:29. Don't try it on the day. Gap night already booked at the same hotel. Narita is early tomorrow." },

    /* ═══════════════ Aug 23 ═══════════════ */
    { date:"2026-08-23", stayId:null, title:"Fly home", status:"locked",
      anchors:[
        { time:"07:00", title:"Ueno → Narita", hard:true, note:"Keisei Skyliner, ~41 min, ~¥3,000. Departs Ueno Stn, 0.2 mi from the hotel." },
        { time:"09:45", title:"JL 56 Narita → Chicago", hard:true, note:"NARITA, not Haneda. Different airport from arrival." },
      ], candidates:[], bench:[] },
  ],

  /* ---------- IRREVERSIBLES ---------- */
  irreversibles: [
    { id:"irr-fwd0",      due:"2026-08-11T17:00", title:"⚑ FORWARD SUITCASE → OSAKA — TODAY", detail:"Park Hotel front desk, on your way out. Takkyubin (宅急便) to Miyako City Osaka Hommachi, arriving Aug 12–13 — they hold it. ¥1,600–3,700. TODAY IS THE LAST PRACTICAL DAY: tomorrow you're in Nikko 06:30–19:30 and a drop then lands Aug 13–14, after you arrive. If you miss it, carry the bag on the Nozomi instead — fine IF it's under 160cm total (H+W+D); over that needs an oversized seat you don't have booked." },
    { id:"irr-fwd1",      due:"2026-08-16T18:00", title:"Forward suitcase → Yamato Onomichi Shotengai", detail:"From the Hommachi front desk, HOLD FOR PICKUP. The Onomichi hotel cannot receive a Yamato delivery. Fits the Aug 16 afternoon block." },
    { id:"irr-teamlab",   due:"2026-08-15T20:30", title:"teamLab — LAST ENTRY 20:30", detail:"Doors 19:30–21:30. Nagai Park, Midōsuji direct from Hommachi. Dinner must be early and light." },
    { id:"irr-fwd2",      due:"2026-08-18T17:00", title:"Forward suitcase → NOHGA Ueno", detail:"Drop at Yamato Shotengai or any konbini. NOHGA holds parcels sent ahead of check-in." },
    { id:"irr-vjw",       due:"2026-08-10T11:30", title:"⚑ Visit Japan Web — register BEFORE you fly", detail:"vjw.digital.go.jp — free, official. One QR clears immigration AND customs at Haneda's Joint Kiosk. Saves 20–30 min. MUST be done at least 6 HOURS BEFORE LANDING or the QR may not generate. Both of you separately. SCREENSHOT both QR codes — do not rely on having signal in the arrivals hall." },
    { id:"irr-nikko",     due:"2026-08-12T17:44", title:"LAST Nikko express — 17:44", detail:"Target the 17:22 (→Asakusa 19:29); 17:44 (→19:49) is the real wall. Past that it's 3h+ with transfers. Corrected Aug 8 — the old 15:26 figure came from a Saturday timetable and was wrong." },
    { id:"irr-nozomi",    due:"2026-08-13T12:18", title:"Nozomi 389 → Shin-Osaka", detail:"Car 2, seats 9-D / 9-E. Checkout is 11:00, Tokyo Station needs 15–20 min inside it." },
    { id:"irr-himeji",    due:"2026-08-17T14:19", title:"Himeji → Shin-Onomichi", detail:"NOZOMI153 → KODAMA953. Castle visit has to end in time." },
    { id:"irr-return",    due:"2026-08-20T12:21", title:"Shin-Onomichi → Tokyo", detail:"Taxi from the hotel first — allow 35–50 min buffer." },
    { id:"irr-glasses",   due:"2026-08-22T12:00", title:"Ray-Ban Meta glasses — get them shipped back", detail:"They were left in Ohio. Rental return is due Aug 25 (LensProToGo). Ask whoever can reach them to ship them back on time so the $93 doesn't become a late fee too." },
    { id:"irr-narita",    due:"2026-08-23T09:45", title:"JL 56 from NARITA", detail:"Not Haneda. Skyliner from Ueno ~41 min." },
    { id:"irr-weather",   due:"2026-08-16T12:00", title:"Check the typhoon forecast for Aug 17–23", detail:"Risk rises in the back half. Aug 19's Shimanami bike day is the weather-dependent one — Onomichi U2 and the Motion Picture Museum are the wet-weather swaps." },
  ],

  /* ---------- REFERENCE ---------- */
  reference: {
    phrases: [
      { jp:"すみません", romaji:"Sumimasen", en:"Excuse me / sorry / hello-get-attention" },
      { jp:"ありがとうございます", romaji:"Arigatou gozaimasu", en:"Thank you" },
      { jp:"こんにちは", romaji:"Konnichiwa", en:"Hello" },
      { jp:"おはようございます", romaji:"Ohayou gozaimasu", en:"Good morning" },
      { jp:"お願いします", romaji:"Onegaishimasu", en:"Please / I'd like this" },
      { jp:"英語は大丈夫ですか？", romaji:"Eigo wa daijoubu desu ka?", en:"Is English okay?" },
      { jp:"これは何ですか？", romaji:"Kore wa nan desu ka?", en:"What is this? (menus)" },
      { jp:"これをください", romaji:"Kore o kudasai", en:"This one, please (+ point)" },
      { jp:"トイレはどこですか？", romaji:"Toire wa doko desu ka?", en:"Where's the bathroom?" },
      { jp:"駅はどこですか？", romaji:"Eki wa doko desu ka?", en:"Where's the station?" },
      { jp:"いくらですか？", romaji:"Ikura desu ka?", en:"How much is it?" },
      { jp:"二人です", romaji:"Futari desu", en:"Two people (at a restaurant)" },
      { jp:"カードは使えますか？", romaji:"Kaado wa tsukaemasu ka?", en:"Can I use a card?" },
      { jp:"予約していません", romaji:"Yoyaku shite imasen", en:"We don't have a reservation" },
      { jp:"大丈夫です", romaji:"Daijoubu desu", en:"It's fine / no thanks" },
      { jp:"わかりません", romaji:"Wakarimasen", en:"I don't understand" },
      { jp:"美味しい！", romaji:"Oishii!", en:"Delicious!" },
      { jp:"お会計お願いします", romaji:"Okaikei onegaishimasu", en:"Check, please" },
      { jp:"写真を撮ってもいいですか？", romaji:"Shashin o totte mo ii desu ka?", en:"May I take a photo?" },
      { jp:"助けてください", romaji:"Tasukete kudasai", en:"Please help me" },
      { jp:"一 二 三 四 五", romaji:"ichi ni san shi go", en:"1 2 3 4 5" },
      { jp:"六 七 八 九 十", romaji:"roku shichi hachi kyuu juu", en:"6 7 8 9 10" },
    ],
    cards: [
      { title:"⚑ ARRIVAL — Haneda to the hotel, step by step",
        body:"1) Follow Arrival / 到着. Have the Visit Japan Web QR ready — Joint Kiosk does immigration + customs in one scan. 2) Bags, then green channel. 3) Arrivals hall: find 京急線 / KEIKYU, blue-and-white, B1F. IGNORE the Monorail signs. 4) Tap Suica at the gate. 5) ⚠ CHECK DESTINATION: Asakusa / Oshiage / Narita / Keisei = BOARD. Shinagawa = wait for the next. 6) ~30 min, ~10 stops. Door display shows stops in English. Watch for 新橋 SHIMBASHI. At Sengakuji it becomes the Toei Asakusa Line — same train, stay on. 7) Off at Shimbashi, TAP OUT. 8) Shiodome / 汐留 exit, ~7 min walk to Shiodome Media Tower. Too tired? Taxi rank outside, ¥700–1,000, 5 min — take it. 9) RECEPTION IS 25F, not the ground floor. WRONG TRAIN? Get off at Shinagawa, JR Yamanote 2 stops to Shimbashi. Nothing tonight is irreversible." },
      { title:"⚑ Show-the-screen Japanese for arrival night",
        body:"Where is the Keikyu line? — 京急線はどこですか？ · I want to go to Shimbashi — 新橋駅に行きたいです · Does this train go to Shimbashi? — この電車は新橋に行きますか？ · To Park Hotel Tokyo please (taxi) — パークホテル東京までお願いします · Excuse me — すみません" },
      { title:"Heat — the defining constraint",
        body:"30–35°C at 70%+ humidity; a 32°C day feels like 38°C. Outdoors BEFORE 10:00 or AFTER 16:00; indoors midday. Carry water constantly — heatstroke here is a real risk, not a caution. This is exactly why Aug 19's bike ride starts at 08:00 and Nara leaves at 07:00." },
      { title:"Subway — you've never ridden one",
        body:"Google Maps is the tool, not a Japan-specific app. TAP IN AND TAP OUT, every ride, no exceptions — forgetting to tap out blocks the exit gate. Lines are colour-coded and numbered, signage is bilingual at every major station. Avoid Tokyo weekday 07:30–09:30." },
      { title:"Money",
        body:"Suica via Apple Pay — top up with a foreign card, no physical card needed. Carry ¥30,000–50,000 cash; rural buses, small restaurants and temples are frequently cash-only. Yakitori Ueno Bunraku (Aug 20) is CASH/e-money ONLY. 7-Eleven ATMs reliably take foreign cards. No-FX-fee credit card for card-payable spend; the fee-free debit card is the cash source." },
      { title:"Obon — Aug 13–16",
        body:"OPEN: shinkansen, subways, konbini, department stores, malls, chain restaurants. CLOSED: many individually-owned restaurants and small shops, 3–5 days from Aug 13, worse in rural areas. Temples and shrines are at their MOST active. Osaka is fine; the countryside would have been the problem, which the Aug 18–20 placement avoids." },
      { title:"Luggage — three forwards, not one",
        body:"Takkyubin ¥1,600–3,700/bag. (1) Tokyo→Osaka, drop Aug 10 or 11, NOT the morning you leave. (2) Hommachi→Yamato Onomichi Shotengai, HOLD FOR PICKUP — the Onomichi hotel can't receive a delivery. (3) Onomichi→NOHGA Ueno, drop ~Aug 18. Keep passport, valuables, electronics and meds with you always. Coin lockers ¥400–700/day." },
      { title:"The flexible Osaka bench",
        body:"Two items deliberately NOT pinned to a day — pull them in whenever an Osaka gap opens. OBJECT OSAKA: custom-patch shop, Nishishinsaibashi, 5–10 min detour — only when an evening routes through Dotonbori/Shinsaibashi. UDON-MAKING CLASS: IRICOSKY, 90 min, ¥6,820/group, bookable same-day up to 2h ahead — fits any afternoon that turns out freer than planned. Needs to start by 15:30–16:00 to fit before an evening." },
      { title:"Non-negotiables — the check",
        body:"Temple · Hike · See Mt Fuji · Gardens · Nature. COVERED: temples (Toshogu, Senkoji, Tōdai-ji, Kasuga Taisha, Katsuoji, Ueno Toshogu). Hike — Minoh Falls (Aug 16), plus Shimanami cycling and the optional Mt. Tenguyama extension. Gardens — Hamarikyu, Nakanoshima, Korakuen, teamLab Botanical. Nature — Minoh, Nikko falls, the Seto Inland Sea. FUJI rests entirely on the two seat-E Shinkansen legs; Nikko is north and offers no view." },
      { title:"What got deliberately skipped",
        body:"Golf (no slot near a course). Second skyview (Shinjuku's free deck covers it). Shibuya Crossing (dedicated subway trip, schedule's full). Dedicated arcade blocks in Osaka and a third in Onomichi (Shinjuku + Yanaka Ginza already cover the type twice). Onomichi's 25-temple Trail (would be a 4th temple). The RESTAURANT at U2 (¥6,600, too expensive). None of these are oversights — each was weighed and dropped." },
    ],
  },

  confirmationFields: [
    { key:"jal",       label:"JAL booking" },
    { key:"parkhotel", label:"Park Hotel Tokyo" },
    { key:"hommachi",  label:"Miyako City Hommachi" },
    { key:"onomichi",  label:"Onomichi Yutori" },
    { key:"nohga",     label:"NOHGA Ueno" },
    { key:"nohga2",    label:"NOHGA gap night" },
    { key:"sx13",      label:"smartEX — Aug 13" },
    { key:"sx17",      label:"smartEX — Aug 17" },
    { key:"sx20",      label:"smartEX — Aug 20" },
  ],
};
