/* Parentheses in responses mark optional units or descriptors. */
function category(title, rows) {
  return { title, clues: rows.map(([q, a, note]) => ({ q, a, ...(note ? { note } : {}) })) };
}

const GAME = {
  rounds: [
    {
      name: "Jeopardy!",
      values: [200, 400, 600, 800, 1000],
      dailyDoubles: 1,
      categories: [
        category("Kids’ Corner", [
          ["These striped insects make honey.", "What are honeybees?", "Accept bees."],
          ["In Frozen, this snowman dreams of summer.", "Who is Olaf?"],
          ["This shape has six sides.", "What is a hexagon?"],
          ["In Bluey, this is the name of Bluey’s little sister.", "Who is Bingo?"],
          ["In Charlotte’s Web, this pig is saved with help from a spider.", "Who is Wilbur?"],
        ]),
        category("Young Adult Era", [
          ["This sandbox video game features Creepers, crafting tables, and the Nether.", "What is Minecraft?"],
          ["In Among Us, this is the role that secretly sabotages the crew.", "What is the Impostor?", "Accept Imposter."],
          ["In the original Wordle, you have this many guesses to find the five-letter word.", "What is 6 (guesses)?"],
          ["This animated film follows Miles Morales as he meets Spider-People from other dimensions for the first time.", "What is Spider-Man: Into the Spider-Verse?", "Accept Into the Spider-Verse."],
          ["In Stardew Valley, this corporation runs the blue-branded supermarket competing with Pierre’s shop.", "What is Joja (Corporation)?", "Accept JojaMart."],
        ]),
        category("The ’90s & ’00s", [
          ["This 1995 Pixar film introduced Woody and Buzz Lightyear.", "What is Toy Story?"],
          ["This Japanese pocket pet needed feeding and care through buttons on an egg-shaped keychain.", "What is a Tamagotchi?"],
          ["This instant messaging service from AOL let people post away messages.", "What is AIM?", "Accept AOL Instant Messenger."],
          ["Apple used the slogan ‘1,000 songs in your pocket’ for this music player.", "What is the iPod?"],
          ["This browser game let you care for digital pets from species such as Aisha, Kacheek and Shoyru.", "What is Neopets?"],
        ]),
        category("Bible Stories", [
          ["David used this weapon to launch the stone that struck Goliath.", "What is a sling?", "1 Samuel 17:49. Accept slingshot for this game."],
          ["This queen risked approaching the king without being summoned to plead for her people.", "Who is Esther?", "Esther 4:16–5:2."],
          ["In Acts, Paul and this companion sang hymns in prison before an earthquake opened the doors.", "Who is Silas?", "Acts 16:25–26."],
          ["When the walls of Jericho fell, this woman and her family were brought out safely.", "Who is Rahab?", "Joshua 6:22–25."],
          ["This judge asked for dew on a fleece while the ground stayed dry.", "Who is Gideon?", "Judges 6:36–38."],
        ]),
        category("At the Potluck", [
          ["This orange squash is the namesake filling in a classic Thanksgiving pie.", "What is pumpkin?"],
          ["This appliance would toast slices of bread before you cut them into cubes.", "What is a toaster?"],
          ["This many tablespoons equal half a U.S. cup.", "What is 8 (tablespoons)?"],
          ["This Korean dish mixes rice with toppings such as seasoned vegetables and gochujang. Its name refers to mixed rice.", "What is bibimbap?"],
          ["This dessert gets its name from the French for ‘burnt cream’ and has a brittle caramelized sugar top.", "What is crème brûlée?", "Accept without French accents."],
        ]),
        category("Figure It Out", [
          ["Six guests will sit at each of four tables. How many plates should you put out so every guest gets one?", "What is 24 (plates)?", "4 × 6 = 24."],
          ["You have $30. Two pies cost $9 each and a bag of rolls costs $5. How much money is left?", "What is 7 (dollars)?", "30 − (2 × 9 + 5) = 7."],
          ["A 27-minute timer goes off at 6:03 a.m. in Dallas on Thanksgiving Day. What time was it in South Korea when the timer was set? Use Central Standard Time in Dallas.", "What is 8:36 (p.m. KST)?", "6:03 a.m. − 27 min = 5:36 a.m. CST. 5:36 a.m. + 15 h = 8:36 p.m. KST."],
          ["Each of four teams plays every other team once. How many games are played?", "What is 6 (games)?", "(4 × 3) ÷ 2 = 6. Counting from each team gives 12 matchups, but each game is counted twice."],
          ["Using the digits 0 through 4, how many four-digit numbers are divisible by 4 and use no digit more than once?", "What is 30 (numbers)?", "Valid endings are 04, 12, 20, 24, 32 and 40. The three endings with zero leave 3 × 2 prefixes each. The three without zero leave 2 × 2 prefixes each because the first digit cannot be zero. 3 × (3 × 2) + 3 × (2 × 2) = 30."],
        ]),
      ],
    },
    {
      name: "Double Jeopardy!",
      values: [400, 800, 1200, 1600, 2000],
      dailyDoubles: 2,
      categories: [
        category("Bible Geography", [
          ["According to Luke 2, Jesus was born in this town.", "What is Bethlehem?"],
          ["According to Genesis 12, Abram set out for this land after leaving Haran.", "What is Canaan?"],
          ["Jesus told a blind man to wash in this pool in John 9.", "What is Siloam (Pool)?", "Accept Pool of Siloam."],
          ["In 1 Kings 18, Elijah challenged the prophets of Baal on this mountain.", "What is Carmel (Mount)?", "Accept Mount Carmel."],
          ["According to Revelation 1:9, John was on this island when he received his vision.", "What is Patmos (Island)?", "Accept the island of Patmos."],
        ]),
        category("Animal Kingdom", [
          ["This is the only group of mammals capable of sustained powered flight.", "What are bats?"],
          ["A group of these big cats can be called a pride.", "What are lions?"],
          ["This marine mammal is also called a killer whale.", "What is an orca?"],
          ["This lizard can move its eyes independently to look in two directions at once.", "What is a chameleon?"],
          ["A narwhal’s spiral tusk is an elongated example of this body part.", "What is a tooth?"],
        ]),
        category("Science at Home", [
          ["Polished mirrors send light back toward you by this process.", "What is reflection?"],
          ["This process turns liquid water into vapor from its surface.", "What is evaporation?"],
          ["This gas makes up most of Earth’s atmosphere.", "What is nitrogen?"],
          ["This force opposes a book sliding along a tabletop.", "What is friction?"],
          ["A straw appears bent in a glass of water because light changes direction across materials. This is the name of that effect.", "What is refraction?"],
        ]),
        category("Music for Everyone", [
          ["A standard modern concert piano has this many keys.", "What is 88 (keys)?"],
          ["In a standard string quartet, this instrument is lower than the viola.", "What is the cello?"],
          ["This device helps musicians keep time by producing regular clicks.", "What is a metronome?"],
          ["In a traditional four-part choir, this voice part lies between alto and bass.", "What is tenor?"],
          ["Italian for ‘at a walking pace,’ this tempo marking usually sits between adagio and moderato.", "What is andante?"],
        ]),
        category("World Landmarks", [
          ["The Eiffel Tower stands in this city.", "What is Paris?"],
          ["This Italian city is home to the Colosseum.", "What is Rome?"],
          ["This country is home to the ancient Inca site Machu Picchu.", "What is Peru?"],
          ["This river runs through London past the Houses of Parliament.", "What is the Thames (River)?", "Accept River Thames."],
          ["Petra, the ancient city famed for buildings cut into sandstone, is in this modern country.", "What is Jordan?", "Here Jordan refers to the country."],
        ]),
        category("Pairs in Scripture", [
          ["After leaving Moab, Ruth stays with this mother-in-law.", "Who is Naomi?", "Ruth 1."],
          ["In 1 Samuel, this son of Saul becomes a close friend of David.", "Who is Jonathan?"],
          ["Jesus calls Simon Peter and this brother while they are casting a net.", "Who is Andrew?", "Matthew 4:18–20."],
          ["In Acts 18, Aquila and this wife explain the way of God more accurately to Apollos.", "Who is Priscilla?", "Accept Prisca."],
          ["Euodia and this woman are urged to agree in the Lord in Philippians 4.", "Who is Syntyche?", "Accept recognizable pronunciations."],
        ]),
      ],
    },
  ],
  // Once all five clips are ready, Sing It Back appears in Settings → Board.
  // Times are seconds relative to the MP3. Omit end for name-that-song clues.
  // { q: "...", a: "What is ...?", media: { type: "audio", src: "clips/new.mp3", start: 0, end: 8 } }
  musicClues: [
    { q: "Name this song.", a: "What is Run to the Father?", note: "Cody Carnes.", media: { type: "audio", src: "clips/run-to-the-father.mp3" } },
    { q: "What lyric comes next?", a: 'What is "Death could not hold you"?', note: "What a Beautiful Name — Hillsong Worship. The excerpt starts at 2:42 in the original. Pause just before the accepted line.", media: { type: "audio", src: "clips/what-a-beautiful-name.mp3", manualCutoff: true } },
    { q: "Name this song.", a: "What is Thank God I’m Free?", note: "Elevation Rhythm & Lizzie Morgan.", media: { type: "audio", src: "clips/thank-god-im-free.mp3" } },
    { q: "What lyric comes next?", a: 'What is "Worthy of every song we could ever sing"?', note: "Build My Life — Housefires feat. Pat Barrett. Pause just before the accepted line.", media: { type: "audio", src: "clips/build-my-life.mp3", manualCutoff: true } },
    { q: "Name this song.", a: "What is The Lord Will Provide?", note: "Passion & Landon Wolfe.", media: { type: "audio", src: "clips/the-lord-will-provide.mp3" } },
  ],
  finals: [
    { category: "Thanksgiving", q: "A 1941 federal law set U.S. Thanksgiving on this weekday occurrence in November.", a: "What is the fourth Thursday?" },
    { category: "Acts of Kindness", q: "In Acts 9, Peter raises a woman known for making clothes. Her Aramaic name is Tabitha, and this is her Greek name.", a: "Who is Dorcas?" },
    { category: "The Night Sky", q: "Polaris is part of this constellation, also known as the Little Bear.", a: "What is Ursa Minor?", note: "Accept Little Bear. The Little Dipper is an asterism within Ursa Minor." },
    { category: "World Geography", q: "The Danube passes through Austria before reaching Hungary. This capital city is its stop in Austria.", a: "What is Vienna?" },
    { category: "Bible Books", q: "This letter asks its recipient to welcome Onesimus back as a beloved brother.", a: "What is Philemon?", note: "Accept the Letter to Philemon." },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = GAME;
