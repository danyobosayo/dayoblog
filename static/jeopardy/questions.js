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
              q: "At 969 years, he holds the record for the longest life in the Bible.",
              a: "Who is Methuselah?",
              note: "Genesis 5:27. He died the year of the flood.",
            },
            {
              q: "A physician by trade, he wrote both a gospel and Acts, which makes him the author of more of the New Testament by word count than Paul.",
              a: "Who is Luke?",
              note: "The only gentile author in the Bible.",
            },
            {
              q: "God is never once mentioned by name in this Old Testament book, even though the whole story is about His rescue of the Jews.",
              a: "What is Esther?",
            },
            {
              q: "Roughly this many years separate the last page of Malachi from the first page of Matthew — the so-called silent years.",
              a: "What is 400 years?",
            },
          ],
        },
        {
          title: "Lab Notes",
          clues: [
            {
              q: "It is the only planet in our solar system not named after a Greek or Roman god.",
              a: "What is Earth?",
            },
            {
              q: "It's the only metal that shows up as a liquid at room temperature.",
              a: "What is mercury?",
            },
            {
              q: "You share roughly 60% of your DNA with this yellow fruit.",
              a: "What is a banana?",
            },
            {
              q: "It makes up about 78% of the air you're breathing right now — far more than oxygen.",
              a: "What is nitrogen?",
            },
            {
              q: "It spins so slowly that a single day there lasts longer than its entire year.",
              a: "What is Venus?",
              note: "243 Earth days to rotate; 225 to orbit the Sun.",
            },
          ],
        },
        {
          title: "Miracles & Mayhem",
          clues: [
            {
              q: "Jesus performed His first recorded miracle at a wedding in this town.",
              a: "What is Cana?",
              note: "John 2",
            },
            {
              q: "This tenth and final plague is the one that finally broke Pharaoh.",
              a: "What is the death of the firstborn?",
              note: "Exodus 12",
            },
            {
              q: "On Mount Carmel, Elijah called down fire and humiliated 450 prophets of this god.",
              a: "Who is Baal?",
              note: "1 Kings 18",
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
        {
          /* ---- SONG CLIPS ----------------------------------------------
             Audio only — the player is never shown, so the video title can't
             give anything away. Each clip plays from the top and keeps going
             until you close the clue or hit Pause.

             The $800 is the odd one out: it plays a 4-second window, stops
             dead for the finish-the-lyric guess, and the Pause button turns
             into "Continue" so you can play the song on from that exact spot.
             --------------------------------------------------------------- */
          title: "Sing It Back",
          clues: [
            {
              q: "Name this Elevation Worship song.",
              a: 'What is "Trust in God"?',
              note: "Featuring Chris Brown and Isaiah Templeton.",
              media: { type: "youtube", id: "QS04WbSnxok", start: 0 },
              seconds: 40,
            },
            {
              q: "Name this song.",
              a: 'What is "Reckless Love"?',
              note: "Cory Asbury, 2018.",
              media: { type: "youtube", id: "Sc6SSHuZvQE", start: 0 },
              seconds: 40,
            },
            {
              q: "Name the artist singing this one.",
              a: "Who is Phil Wickham?",
              note: '"This Is Amazing Grace," 2013.',
              media: { type: "youtube", id: "XFRjr_x-yxU", start: 0 },
              seconds: 40,
            },
            {
              q: "Finish the lyric.",
              a: "What is “That I put my faith in Jesus”?",
              note: 'Cody Carnes, "Firm Foundation (He Won\'t)."',
              media: { type: "youtube", id: "x9ndiD0_qNk", start: 303, end: 307 },
              seconds: 40,
            },
            {
              q: "For the full thousand: name both this song and the artists performing it.",
              a: 'What is "Goodbye Yesterday" by Elevation Rhythm and Gracie Binion?',
              media: { type: "youtube", id: "7YZCu5LdG_U", start: 0 },
              seconds: 40,
            },
          ],
        },
        {
          title: "History Class",
          clues: [
            {
              q: "This wall split a German city in two from 1961 until it came down in 1989.",
              a: "What is the Berlin Wall?",
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
              q: "Ordered to take back everything he had written, Luther refused at this 1521 assembly with a gloriously unappetising name.",
              a: "What is the Diet of Worms?",
              note: "Worms is a German city; a 'diet' is an imperial assembly.",
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
      ],
    },

    /* ============= ROUND 2 — DOUBLE JEOPARDY! ============= */
    {
      name: "Double Jeopardy!",
      values: [400, 800, 1200, 1600, 2000],
      dailyDoubles: 2,
      categories: [
        {
          title: "Psalms & Proverbs",
          clues: [
            {
              q: "Psalm 23 opens by calling the Lord this — a job David had actually worked.",
              a: "What is a shepherd?",
              note: "Psalm 23:1",
            },
            {
              q: "Running 176 verses, this is the longest chapter in the entire Bible.",
              a: "What is Psalm 119?",
              note: "An acrostic — 22 stanzas, one for each Hebrew letter.",
            },
            {
              q: "Proverbs 3:5-6 promises that if you trust the Lord instead of your own understanding, He will do this to your paths.",
              a: "What is make them straight?",
            },
            {
              q: "This king, who famously asked God for wisdom instead of wealth, is credited with most of Proverbs.",
              a: "Who is Solomon?",
            },
            {
              q: "Proverbs 27:17 says one person sharpens another the way these two identical metal objects do.",
              a: "What is iron sharpening iron?",
            },
          ],
        },
        {
          title: "Parables",
          clues: [
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
              q: "A man stumbles on treasure buried in a field, then joyfully sells everything he owns to buy that field.",
              a: "What is the parable of the hidden treasure?",
              note: "Matthew 13:44",
            },
            {
              q: "A rich man ignores a beggar at his gate and the two swap places after death. The beggar is the only character Jesus ever named in a parable, and this is his name.",
              a: "Who is Lazarus?",
              note: "Luke 16 — a different Lazarus from Mary and Martha's brother.",
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
              q: "Saul was struck blind on the road to this city — and the phrase now means any sudden total reversal.",
              a: "What is Damascus?",
              note: "Acts 9",
            },
            {
              q: 'Jesus was crucified at this spot just outside Jerusalem, a name meaning "the place of the skull."',
              a: "What is Golgotha?",
              note: "Calvary is the Latin version of the same name.",
            },
          ],
        },
        {
          title: "Pop Culture Pew",
          clues: [
            {
              q: 'This rapper\'s 2019 gospel album "Jesus Is King" debuted at #1 on the Billboard 200.',
              a: "Who is Kanye West?",
            },
            {
              q: "Crowdfunded rather than studio-backed, this series about the life of Jesus takes its name from the men He picked.",
              a: "What is The Chosen?",
            },
            {
              q: "Mel Gibson's 2004 film about Jesus' final hours was shot almost entirely in Aramaic and Latin.",
              a: "What is The Passion of the Christ?",
            },
            {
              q: 'This Charlotte, North Carolina church\'s worship collective gave us "Graves Into Gardens."',
              a: "What is Elevation Worship?",
            },
            {
              q: "Lecrae, Trip Lee, and Andy Mineo all built their careers at this Atlanta-based Christian hip-hop label.",
              a: "What is Reach Records?",
              note: "Co-founded by Lecrae in 2004.",
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
              q: "A sea otter keeps its favourite rock for cracking shellfish tucked into a loose pouch of skin here.",
              a: "What is its armpit?",
            },
            {
              q: 'Nicknamed "Ming," a specimen of this shellfish was found to be about 507 years old — the longest-lived animal ever recorded.',
              a: "What is a clam?",
              note: "An ocean quahog, hatched around 1499.",
            },
          ],
        },
        {
          title: "Grab Bag",
          clues: [
            {
              q: "At roughly 450 feet, Noah's ark was about the length of one and a half of these American sports fields.",
              a: "What is a football field?",
            },
            {
              q: 'Genesis says this man "walked with God, and he was not, for God took him" — he never died at all.',
              a: "Who is Enoch?",
              note: "Genesis 5:24. Methuselah's father.",
            },
            {
              q: "In Numbers 22 this animal sees an angel, and then talks back to its owner about it.",
              a: "What is a donkey?",
              note: "Balaam's donkey.",
            },
            {
              q: "Dying at 127, she is the only woman in the Bible whose age at death is recorded.",
              a: "Who is Sarah?",
              note: "Genesis 23:1",
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
