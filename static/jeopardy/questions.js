/* ==========================================================================
   QUESTION BANK
   --------------------------------------------------------------------------
   Edit this file to change the game. Nothing else needs to be touched.

   Structure:
     rounds[]        two boards. Round 1 = "Jeopardy", Round 2 = "Double Jeopardy"
       .name         shown in the header
       .values[]     five point values, low -> high (top row to bottom row)
       .dailyDoubles how many Daily Doubles to hide on this board
       .categories[] six categories, each with exactly five clues
         .title      the column header (keep it SHORT — it's a small box)
         .clues[]    five clues, ordered to match values[] (easiest first)
           .q        the clue (Jeopardy states it as a fact)
           .a        the correct response (phrased as a question)
           .note     optional. Shown in small text under the answer — use it
                     for the scripture reference or a fun fact.
           .media    optional song clip — see below.
           .seconds  optional per-clue timer override, in seconds. Use it when
                     a clip needs longer than the default countdown.

   ---- ATTACHING A SONG CLIP -------------------------------------------------

   Add a `media` object to any clue and it plays audio only. Two kinds:

     media: { type: "youtube", id: "dQw4w9WgXcQ", start: 42, end: 57 }
       The id is the part after "v=" in a YouTube URL. Needs wifi. The player
       itself is rendered off-screen and never shown, so the video title can't
       give the answer away — the room only sees an equaliser and hears sound.

     media: { type: "audio", src: "clips/oceans.mp3", start: 0, end: 15 }
       Put the file in static/jeopardy/clips/. Plays offline, which is the
       safest option if the wifi is unreliable.

   `start` and `end` are seconds; both optional. Pause and Replay controls are
   shown to the host automatically.
   ========================================================================== */

const GAME = {
  rounds: [
    /* ================= ROUND 1 — JEOPARDY! ================= */
    {
      name: "Jeopardy!",
      values: [200, 400, 600, 800, 1000],
      dailyDoubles: 1,
      categories: [
        {
          title: "Bible 101",
          clues: [
            {
              q: 'Genesis 1:1 says "In the beginning God created" these two things.',
              a: "What are the heavens and the earth?",
              note: "Genesis 1:1",
            },
            {
              q: "He lived on locusts and wild honey, and he baptized Jesus in the Jordan.",
              a: "Who is John the Baptist?",
              note: "Jesus' relative — their mothers were cousins.",
            },
            {
              q: "A physician by trade, he wrote both a gospel and Acts, which makes him the author of more of the New Testament by word count than Paul.",
              a: "Who is Luke?",
              note: "The only gentile author in the Bible.",
            },
            {
              q: "At 969 years, he holds the record for the longest life in the Bible.",
              a: "Who is Methuselah?",
              note: "Genesis 5:27. He died the year of the flood.",
            },
            {
              q: "Roughly this many years separate the last page of Malachi from the first page of Matthew — the so-called silent years.",
              a: "What is 400 years?",
            },
          ],
        },
        {
          /* ---- SONG CLIPS ----------------------------------------------
             These play local mp3s from clips/, already trimmed to ~45s, so
             there is no streaming lag and no wifi dependency. Each one names
             a `fallback` YouTube id too: if the file can't load for any
             reason, the clue quietly streams instead of dying.

             The $800 is the odd one out. Its mp3 already starts at 5:03 of
             the song, so it plays 5:04-5:07.75, stops dead for the
             finish-the-lyric guess, and the Pause button turns into
             "Continue" to play on from that exact spot.
             --------------------------------------------------------------- */
          title: "Sing It Back",
          clues: [
            {
              q: "Name this Elevation Worship song.",
              a: 'What is "Trust in God"?',
              note: "Featuring Chris Brown and Isaiah Templeton.",
              media: { type: "audio", src: "clips/trust-in-god.mp3", fallback: "QS04WbSnxok" },
              seconds: 40,
            },
            {
              q: "Name this song.",
              a: 'What is "Reckless Love"?',
              note: "Cory Asbury, 2018.",
              media: { type: "audio", src: "clips/reckless-love.mp3", fallback: "Sc6SSHuZvQE" },
              seconds: 40,
            },
            {
              q: "Name the artist singing this one.",
              a: "Who is Phil Wickham?",
              note: '"This Is Amazing Grace," 2013.',
              media: { type: "audio", src: "clips/this-is-amazing-grace.mp3", fallback: "XFRjr_x-yxU" },
              seconds: 40,
            },
            {
              q: "Finish the lyric.",
              a: "What is “That I put my faith in Jesus”?",
              note: 'Cody Carnes, "Firm Foundation (He Won\'t)."',
              /* The mp3 is trimmed to begin at 5:03, so file time 0 = 5:03.
                 start: 1 / end: 4.75 therefore plays 5:04 - 5:07.75.
                 Fractions are fine here — the cut is timed in milliseconds. */
              media: { type: "audio", src: "clips/firm-foundation.mp3", start: 1, end: 4.75, fallback: "x9ndiD0_qNk", fallbackStart: 304, fallbackEnd: 307.75 },
              seconds: 40,
            },
            {
              q: "For the full thousand: name both this song and the artists performing it.",
              a: 'What is "Goodbye Yesterday" by Elevation Rhythm and Gracie Binion?',
              media: { type: "audio", src: "clips/goodbye-yesterday.mp3", fallback: "7YZCu5LdG_U" },
              seconds: 40,
            },
          ],
        },
        {
          title: "History Class",
          clues: [
            {
              q: "Of the seven wonders of the ancient world, this Egyptian one is the only survivor.",
              a: "What is the Great Pyramid of Giza?",
            },
            {
              q: "This Roman emperor's Edict of Milan legalized Christianity in AD 313.",
              a: "Who is Constantine?",
            },
            {
              q: "Gutenberg's 1440s invention made the Bible the first mass-produced book in Europe.",
              a: "What is the printing press?",
            },
            {
              q: "In 1054 this split cleaved Christianity into the Roman Catholic west and the Eastern Orthodox east.",
              a: "What is the Great Schism?",
            },
            {
              q: "Signed in 1919, this treaty formally ended the First World War — and its punishing terms helped set up the second.",
              a: "What is the Treaty of Versailles?",
            },
          ],
        },
        {
          title: "Bible Geography",
          clues: [
            {
              q: 'Jesus grew up in this Galilean town, prompting the question "can anything good come from" there?',
              a: "What is Nazareth?",
              note: "John 1:46",
            },
            {
              q: "The Israelites wandered the wilderness for this many years.",
              a: "What is 40?",
              note: "One year for each day the spies scouted Canaan.",
            },
            {
              q: "John baptized Jesus in this river.",
              a: "What is the Jordan?",
            },
            {
              q: "Moses came down this mountain carrying the Ten Commandments.",
              a: "What is Mount Sinai?",
              note: "Exodus 19-20. Also called Horeb.",
            },
            {
              q: 'Jesus was crucified at this spot just outside Jerusalem, a name meaning "the place of the skull."',
              a: "What is Golgotha?",
              note: "Calvary is the Latin version of the same name.",
            },
          ],
        },
        {
          /* Deliberately not "name this anime" — the shows are mainstream but
             the details are for people who actually watched them. */
          title: "Anime",
          clues: [
            {
              q: "It's the very first entry in the National Pokédex — number 001.",
              a: "What is Bulbasaur?",
            },
            {
              q: "This is how long Aang spent frozen in the iceberg before Katara and Sokka found him.",
              a: "What is 100 years?",
            },
            {
              q: "In the written first phase of the Chunin Exams, this is how many questions Naruto actually answered correctly.",
              a: "What is zero?",
              note: "He left it blank and passed anyway by refusing to quit on the tenth question.",
            },
            {
              q: "Gojo Satoru's Domain Expansion goes by this name.",
              a: "What is Unlimited Void?",
              note: "Muryōkūsho.",
            },
            {
              q: "Saitama insists he became the strongest man alive on a completely ordinary daily routine. Name all four parts of it.",
              a: "What is 100 push-ups, 100 sit-ups, 100 squats, and a 10 km run?",
              note: "Every single day for three years — and it made his hair fall out.",
            },
          ],
        },
        {
          title: "Miracles & Mayhem",
          clues: [
            {
              q: "Jesus fed five thousand people with five loaves and this many fish.",
              a: "What is two?",
              note: "The only miracle in all four gospels.",
            },
            {
              q: "This tenth and final plague is the one that finally broke Pharaoh.",
              a: "What is the death of the firstborn?",
              note: "Exodus 12",
            },
            {
              q: "His superhuman strength ran out the night Delilah had his hair cut off.",
              a: "Who is Samson?",
              note: "Judges 16",
            },
            {
              q: "When this prophet's terrified servant had his eyes opened, he saw the hills full of fiery horses and chariots.",
              a: "Who is Elisha?",
              note: "2 Kings 6:17",
            },
            {
              q: "The sun stopped in the middle of the sky for about a full day so this leader could finish a battle.",
              a: "Who is Joshua?",
              note: "Joshua 10:13",
            },
          ],
        },
      ],
    },

    /* ============= ROUND 2 — DOUBLE JEOPARDY! ============= */
    {
      name: "Double Jeopardy!",
      values: [400, 800, 1200, 1600, 2000],
      dailyDoubles: 2,
      categories: [
        {
          title: "General Science",
          clues: [
            {
              q: "Every biology class calls this organelle the powerhouse of the cell.",
              a: "What is the mitochondria?",
            },
            {
              q: "One neuron passes a signal to the next across this microscopic gap.",
              a: "What is a synapse?",
            },
            {
              q: "At atomic number 92, it's the heaviest element that occurs naturally in any real quantity.",
              a: "What is uranium?",
            },
            {
              q: "This law of thermodynamics is the reason entropy in a closed system only ever increases.",
              a: "What is the second law?",
              note: "Why you can't un-scramble an egg.",
            },
            {
              q: "Roughly 8 minutes and 20 seconds — that's how long this takes to reach Earth.",
              a: "What is sunlight?",
              note: "If the Sun vanished, we wouldn't know for 8 minutes.",
            },
          ],
        },
        {
          title: "Mental Math",
          clues: [
            {
              q: "A hoodie costs $80 and is marked 25% off. This is what you actually pay.",
              a: "What is $60?",
            },
            {
              q: "This number cubed is 343.",
              a: "What is 7?",
            },
            {
              q: "You buy a horse for $60, sell it for $70, buy it back for $80, and sell it again for $90. This is your total profit.",
              a: "What is $20?",
              note: "Two separate $10 gains. Most people say $10 or $30.",
            },
            {
              q: "In a room of just 23 people, the chance that two of them share a birthday is closest to this percentage.",
              a: "What is 50%?",
              note: "The birthday paradox — it's about 50.7%.",
            },
            {
              q: "Add up every whole number from 1 to 100 and you get this total.",
              a: "What is 5,050?",
              note: "Fifty pairs that each add to 101. Gauss worked it out as a schoolboy.",
            },
          ],
        },
        {
          title: "Psalms & Proverbs",
          clues: [
            {
              q: 'Fill in the blank: "The Lord is my __________; I shall not want."',
              a: "What is shepherd?",
              note: "Psalm 23:1",
            },
            {
              q: "This king, who asked God for wisdom instead of money, is credited with most of Proverbs.",
              a: "Who is Solomon?",
            },
            {
              q: 'Fill in the blank: "Your word is a lamp to my feet and a light to my __________."',
              a: "What is path?",
              note: "Psalm 119:105",
            },
            {
              q: "Proverbs 3:5-6 promises that if you trust the Lord instead of leaning on your own understanding, He will do this to your paths.",
              a: "What is make them straight?",
            },
            {
              q: 'Jesus quoted the opening line of this psalm from the cross: "My God, my God, why have you forsaken me?"',
              a: "What is Psalm 22?",
              note: "It goes on to describe pierced hands and feet, and soldiers casting lots for clothing.",
            },
          ],
        },
        {
          title: "Parables",
          clues: [
            {
              q: "A shepherd leaves ninety-nine behind to go after the single one that wandered off.",
              a: "What is the parable of the lost sheep?",
              note: "Luke 15:3-7",
            },
            {
              q: "In this parable a father spots his son far off, runs to him, and throws a feast.",
              a: "What is the Prodigal Son?",
              note: "Luke 15",
            },
            {
              q: "A priest and a Levite walk straight past a beaten man; this unlikely traveller stops.",
              a: "Who is the Good Samaritan?",
              note: "Luke 10",
            },
            {
              q: "In the parable of the talents, the servant who buried his money had been given this many.",
              a: "What is one?",
              note: "Matthew 25:14-30",
            },
            {
              q: "This man's harvest was so good he tore down his barns to build bigger ones — and God called him a fool, because he died that very night.",
              a: "What is the parable of the rich fool?",
              note: "Luke 12:16-21",
            },
          ],
        },
        {
          title: "Animal Kingdom",
          clues: [
            {
              q: "It has a duck's bill, a beaver's tail, venomous spurs, and it lays eggs despite being a mammal.",
              a: "What is the platypus?",
            },
            {
              q: "The closest living relative of the T. rex is this bird, which you have almost certainly eaten.",
              a: "What is the chicken?",
            },
            {
              q: "A group of owls is called this, which is also where laws get made.",
              a: "What is a parliament?",
            },
            {
              q: "This shrimp throws a punch so fast it boils the water around its claw and can crack aquarium glass.",
              a: "What is the mantis shrimp?",
            },
            {
              q: 'Nicknamed "Ming," a specimen of this shellfish was found to be about 507 years old — the longest-lived animal ever recorded.',
              a: "What is a clam?",
              note: "An ocean quahog, hatched around 1499.",
            },
          ],
        },
        {
          title: "Bible Oddities",
          clues: [
            {
              q: "Noah's dove finally came back carrying a fresh leaf from this tree — which is why its branch still means peace.",
              a: "What is an olive tree?",
              note: "Genesis 8:11",
            },
            {
              q: 'Genesis says this man "walked with God, and he was not, for God took him" — he never died at all.',
              a: "Who is Enoch?",
              note: "Genesis 5:24. Methuselah's father.",
            },
            {
              q: "Dying at 127, she is the only woman in the Bible whose age at death is recorded.",
              a: "Who is Sarah?",
              note: "Genesis 23:1",
            },
            {
              q: "In Numbers 22 this animal sees an angel, and then talks back to its owner about it.",
              a: "What is a donkey?",
              note: "Balaam's donkey.",
            },
            {
              q: "Two words long in most English translations, it's the shortest verse in the Bible.",
              a: 'What is "Jesus wept"?',
              note: "John 11:35",
            },
          ],
        },
      ],
    },
  ],

  /* ================= FINAL JEOPARDY POOL ================= */
  finals: [
    {
      category: "The Early Church",
      q: "After Judas died, the eleven cast lots to replace him and chose this man, who is then never mentioned in Scripture again.",
      a: "Who is Matthias?",
      note: "Acts 1:26",
    },
    {
      category: "Firsts",
      q: "Antioch is the city where, according to Acts 11:26, the disciples were first called by this name.",
      a: "What are Christians?",
    },
    {
      category: "Four For Four",
      q: "Setting aside the resurrection itself, this is the only miracle of Jesus that all four gospel writers thought was important enough to include.",
      a: "What is the feeding of the five thousand?",
      note: "Matthew 14, Mark 6, Luke 9, John 6.",
    },
    {
      category: "Words We Borrowed",
      q: 'Sung at the end of countless songs, this Hebrew word is a command that literally means "praise Yah"; in the Bible it turns up almost entirely in the Psalms and in Revelation.',
      a: "What is Hallelujah?",
      note: "Hebrew hallelu (praise) + Yah (short for YHWH).",
    },
    {
      category: "Numbers",
      q: "Jesus told Peter to forgive not seven times, but this many.",
      a: "What is seventy-seven? (or seventy times seven)",
      note: "Matthew 18:22 — translations split between the two.",
    },
  ],
};

/* Lets the answer-sheet generator require() this file. Ignored by the browser. */
if (typeof module !== "undefined") module.exports = GAME;
