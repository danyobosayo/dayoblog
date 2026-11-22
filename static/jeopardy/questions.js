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
          ["This duck-billed mammal lays eggs.", "What is a platypus?"],
          ["In Frozen, this snowman dreams of summer.", "Who is Olaf?"],
          ["This shape has ten sides.", "What is a decagon?"],
          ["In Bluey, this is the name of Bluey’s little sister.", "Who is Bingo?"],
          ["Use the same rule at every step: 2, 3, 5, 9, 17. What number comes next?", "What is 33?", "Double the previous number and subtract 1: (17 × 2) − 1 = 33."],
        ]),
        category("Young Adult Era", [
          ["Who headlined the Super Bowl LIX halftime show in February 2025?", "Who is Kendrick Lamar?"],
          ["In Among Us, this is the role that secretly sabotages the crew.", "What is the Impostor?", "Accept Imposter."],
          ["Fans waited about 13 years between the fifth and sixth numbered installments of this Rockstar Games franchise.", "What is Grand Theft Auto?", "Accept GTA. Count from GTA V’s original 2013 launch."],
          ["Name the five emotions working at Headquarters in Riley’s mind in the original Inside Out.", "What are Joy, Sadness, Fear, Anger, and Disgust?", "Accept any order."],
          ["In Club Penguin, what was the name of the Pizza Parlor minigame where players filled pizza orders on a conveyor belt?", "What is Pizzatron 3000?", "Accept Pizzatron."],
        ]),
        category("The ’90s & ’00s", [
          ["McDonald’s 1990s Teenie plush toys were miniature versions of this collectible line from Ty.", "What are Beanie Babies?", "Accept Teenie Beanie Babies."],
          ["This Japanese pocket pet needed feeding and care through buttons on an egg-shaped keychain.", "What is a Tamagotchi?"],
          ["This 1998 Nintendo accessory turned a Game Boy into a camera that captured tiny grayscale photos.", "What is the Game Boy Camera?", "Accept Pocket Camera."],
          ["In the original Matrix, Morpheus captains a hovercraft named for this Babylonian king.", "Who is Nebuchadnezzar?", "Accept Nebuchadnezzar II."],
          ["Iomega’s original Zip disks held this much data, compared with about 1.44 MB on a standard high-density floppy.", "What is 100 (megabytes)?", "Accept 100 MB. Later Zip disks held more."],
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
          ["What do you call the tool with a squeeze bulb that draws up pan juices so you can pour them back over a roasting turkey?", "What is a turkey baster?", "Accept baster."],
          ["This many tablespoons equal half a U.S. cup.", "What is 8 (tablespoons)?"],
          ["This Korean dish mixes rice with toppings such as seasoned vegetables and gochujang. Its name refers to mixed rice.", "What is bibimbap?"],
          ["This dessert gets its name from the French for ‘burnt cream’ and has a brittle caramelized sugar top.", "What is crème brûlée?", "Accept without French accents."],
        ]),
        category("Figure It Out", [
          ["Six guests will sit at each of four tables. How many plates should you put out so every guest gets one?", "What is 24 (plates)?", "4 × 6 = 24."],
          ["You have $30. Two pies cost $9 each and a bag of rolls costs $5. How much money is left?", "What is 7 (dollars)?", "30 − (2 × 9 + 5) = 7."],
          ["A 27-minute timer goes off at 6:03 a.m. in Dallas on Thanksgiving Day. What time was it in South Korea when the timer was set? Use Central Standard Time in Dallas.", "What is 8:36 (p.m. KST)?", "6:03 a.m. − 27 min = 5:36 a.m. CST. 5:36 a.m. + 15 h = 8:36 p.m. KST."],
          ["Each of four teams plays every other team once. How many games are played?", "What is 6 (games)?", "(4 × 3) ÷ 2 = 6. Counting from each team gives 12 matchups, but each game is counted twice."],
          ["A slower runner gets a 300-meter head start and runs at 3 meters per second. A faster runner starts behind them and runs at 5 meters per second. How far does the faster runner travel before catching up?", "What is 750 (meters)?", "The gap closes at 5 − 3 = 2 m/s. Catch-up time is 300 ÷ 2 = 150 s. The faster runner travels 5 × 150 = 750 m."],
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
          ["This marine mammal is also called a killer whale.", "What is an orca?"],
          ["This is the only group of mammals capable of sustained powered flight.", "What are bats?"],
          ["This brightly colored tropical amphibian gets its common name from the use of some species’ skin toxins on blowgun darts.", "What is a poison dart frog?", "Accept poison arrow frog."],
          ["This bird of prey folds its wings into a steep hunting dive called a stoop, often taking other birds in midair.", "What is a peregrine falcon?", "Accept peregrine."],
          ["This stocky marsupial scavenger with black fur and a piercing screech is the largest living carnivorous marsupial.", "What is a Tasmanian devil?", "Accept Taz if the team clearly means the animal."],
        ]),
        category("Science at Home", [
          ["Hot air rises from a radiator and cooler air moves in to replace it. What kind of heat transfer is this circulating flow?", "What is convection?"],
          ["Water droplets bead on a waxed surface because cohesive forces pull the water surface together. What is the name of this effect?", "What is surface tension?"],
          ["In a beam of light, the electric field can oscillate side to side, up and down, or in a mix of directions. What is this property of light called?", "What is polarization?"],
          ["In rotating systems, this quantity is conserved when there is no net external torque. It explains why a skater spins faster when pulling in their arms.", "What is angular momentum?"],
          ["This mesh-like polymer of sugars and short peptides gives most bacterial cell walls their strength.", "What is peptidoglycan?", "Accept murein."],
        ]),
        category("Music for Everyone", [
          ["A standard modern concert piano has this many keys.", "What is 88 (keys)?"],
          ["What musical term describes the interval from C up to the next G?", "What is a perfect fifth?", "Accept a fifth. The notes are seven semitones apart."],
          ["A piece in 6/8 usually has two main beats per measure, each divided into three. What is this meter called?", "What is compound duple (meter)?", "Accept compound duple time."],
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
        { id: "sing-it-back", title: "Worship Music", clues: [
          { q: "Name this song.", a: "What is Run to the Father?", note: "Cody Carnes.", media: { type: "audio", src: "clips/run-to-the-father.mp3" } },
          { q: "What lyric comes next?", a: 'What is "Death could not hold you"?', note: "What a Beautiful Name — Hillsong Worship. The excerpt starts at 2:42 in the original. Pause just before the accepted line.", media: { type: "audio", src: "clips/what-a-beautiful-name.mp3", manualCutoff: true } },
          { q: "Name this song.", a: "What is Thank God I’m Free?", note: "Elevation Rhythm & Lizzie Morgan.", media: { type: "audio", src: "clips/thank-god-im-free.mp3" } },
          { q: "What lyric comes next?", a: 'What is "Worthy of every song we could ever sing"?', note: "Build My Life — Housefires feat. Pat Barrett. Pause just before the accepted line.", media: { type: "audio", src: "clips/build-my-life.mp3", manualCutoff: true } },
          { q: "Name this song.", a: "What is The Lord Will Provide?", note: "Passion & Landon Wolfe.", media: { type: "audio", src: "clips/the-lord-will-provide.mp3" } },
        ] },
      ],
    },
  ],
  optionalCategories: [
    category("Pairs in Scripture", [
          ["After leaving Moab, Ruth stays with this mother-in-law.", "Who is Naomi?", "Ruth 1."],
          ["In 1 Samuel, this son of Saul becomes a close friend of David.", "Who is Jonathan?"],
          ["Jesus calls Simon Peter and this brother while they are casting a net.", "Who is Andrew?", "Matthew 4:18–20."],
          ["In Acts 18, Aquila and this wife explain the way of God more accurately to Apollos.", "Who is Priscilla?", "Accept Prisca."],
          ["Euodia and this woman are urged to agree in the Lord in Philippians 4.", "Who is Syntyche?", "Accept recognizable pronunciations."],
        ]),
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
