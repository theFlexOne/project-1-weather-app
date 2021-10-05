const movieQuotes = [
  "\"Frankly, my dear, I don't give a damn.\" Gone with the Wind",
  "\"I'm gonna make him an offer he can't refuse.\" The Godfather",
  "\"You don't understand! I coulda had class. I coulda been a contender. I could've been somebody, instead of a bum, which is what I am.\" On the Waterfront",
  "\"Toto, I've a feeling we're not in Kansas anymore.\" The Wizard of Oz",
  "\"Here's looking at you, kid.\" Casablanca",
  "\"Go ahead, make my day.\" Sudden Impact",
  "\"All right, Mr. DeMille, I'm ready for my close-up.\" Sunset Boulevard",
  "\"May the Force be with you.\" Star Wars",
  "\"Fasten your seatbelts. It's going to be a bumpy night.\" All About Eve",
  "\"You talkin' to me?\" Taxi Driver",
  "\"What we've got here is failure to communicate.\" Cool Hand Luke",
  "\"I love the smell of napalm in the morning.\" Apocalypse Now",
  "\"Love means never having to say you're sorry.\" Love Story",
  "\"The stuff that dreams are made of.\" The Maltese Falcon",
  "\"E.T. phone home.\" E.T. the Extra-Terrestrial",
  "\"They call me Mister Tibbs!\" In the Heat of the Night",
  "\"Rosebud.\" Citizen Kane",
  "\"Made it, Ma! Top of the world!\" White Heat",
  "\"I'm as mad as hell, and I'm not going to take this anymore!\" Network",
  "\"Louis, I think this is the beginning of a beautiful friendship.\" Casablanca",
  "\"A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti.\" The Silence of the Lambs",
  "\"Bond. James Bond.\" Dr. No",
  "\"There's no place like home.\" The Wizard of Oz",
  "\"I am big! It's the pictures that got small.\" Sunset Boulevard",
  "\"Show me the money!\" Jerry Maguire",
  "\"Why don't you come up sometime and see me?\" She Done Him Wrong",
  "\"I'm walking here! I'm walking here!\" Midnight Cowboy",
  "\"Play it, Sam. Play 'As Time Goes By.'\" Casablanca",
  "\"You can't handle the truth!\" A Few Good Men",
  "\"I want to be alone.\" Grand Hotel",
  "\"After all, tomorrow is another day!\" Gone with the Wind",
  "\"Round up the usual suspects.\" Casablanca",
  "\"I'll have what she's having.\" When Harry Met Sally...",
  "\"You know how to whistle, don't you, Steve? You just put your lips together and blow.\" To Have and Have Not",
  "\"You're gonna need a bigger boat.\" Jaws",
  "\"Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinking badges!\" Gold Hat",
  "\"I'll be back.\" The Terminator",
  "\"Today, I consider myself the luckiest man on the face of the Earth.\" The Pride of the Yankees",
  "\"If you build it, he will come.\" Field of Dreams",
  "\"Mama always said life was like a box of chocolates. You never know what you're gonna get.\" Forrest Gump",
  "\"We rob banks.\" Bonnie and Clyde",
  "\"Plastics.\" The Graduate",
  "\"We'll always have Paris.\" Casablanca",
  "\"I see dead people.\" The Sixth Sense",
  "\"Stella! Hey, Stella!\" A Streetcar Named Desire",
  "\"Oh, Jerry, don't let's ask for the moon. We have the stars.\" Now, Voyager",
  "\"Shane. Shane. Come back!\" Shane",
  "\"Well, nobody's perfect.\" Some Like It Hot",
  "\"It's alive! It's alive!\" Frankenstein",
  "\"Houston, we have a problem.\" Apollo 13",
  "\"You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?\" Dirty Harry",
  "\"You had me at 'hello.'\" Jerry Maguire",
  "\"One morning I shot an elephant in my pajamas. How he got in my pajamas, I don't know.\" Animal Crackers",
  "\"There's no crying in baseball!\" A League of Their Own",
  "\"La-dee-da, la-dee-da.\" Annie Hall",
  "\"A boy's best friend is his mother.\" Psycho",
  "\"Greed, for lack of a better word, is good.\" Wall Street",
  "\"Keep your friends close, but your enemies closer.\" The Godfather Part II",
  "\"As God is my witness, I'll never be hungry again.\" Gone with the Wind",
  "\"Well, here's another nice mess you've gotten me into!\" Sons of the Desert",
  "\"Say 'hello' to my little friend!\" Scarface",
  "\"What a dump.\" Beyond the Forest",
  "\"Mrs. Robinson, you're trying to seduce me. Aren't you?\" The Graduate",
  "\"Gentlemen, you can't fight in here! This is the War Room!\" Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
  "\"Elementary, my dear Watson.\" The Adventures of Sherlock Holmes",
  "\"Get your stinking paws off me, you damned dirty ape.\" Planet of the Apes",
  "\"Of all the gin joints in all the towns in all the world, she walks into mine.\" Casablanca",
  "\"Here's Johnny!\" The Shining",
  "\"They're here!\" Poltergeist",
  "\"Is it safe?\" Marathon Man",
  "\"Wait a minute, wait a minute. You ain't heard nothin' yet!\" The Jazz Singer",
  "\"No wire hangers, ever!\" Mommie Dearest",
  "\"Mother of mercy, is this the end of Rico?\" Little Caesar",
  "\"Forget it, Jake, it's Chinatown.\" Chinatown",
  "\"I have always depended on the kindness of strangers.\" A Streetcar Named Desire",
  "\"Hasta la vista, baby.\" Terminator 2: Judgment Day",
  "\"Soylent Green is people!\" Soylent Green",
  "\"Open the pod bay doors, HAL.\" 2001: A Space Odyssey",
  "Striker: \"Surely you can't be serious.\" Rumack: \"I am serious … and don't call me Shirley.\" Airplane!",
  "\"Yo, Adrian!\" Rocky",
  "\"Hello, gorgeous.\" Funny Girl",
  "\"Toga! Toga!\" National Lampoon's Animal House",
  "\"Listen to them. Children of the night. What music they make.\" Dracula",
  "\"Oh, no, it wasn't the airplanes. It was Beauty killed the Beast.\" King Kong",
  "\"My precious.\" The Lord of the Rings: The Two Towers",
  "\"Attica! Attica!\" Dog Day Afternoon",
  "\"Sawyer, you're going out a youngster, but you've got to come back a star!\" 42nd Street",
  "\"Listen to me, mister. You're my knight in shining armor. Don't you forget it. You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna go, go, go!\" On Golden Pond",
  "\"Tell 'em to go out there with all they got and win just one for the Gipper.\" Knute Rockne, All American",
  "\"A martini. Shaken, not stirred.\" Goldfinger",
  "\"Who's on first?\" The Naughty Nineties",
  "\"Cinderella story. Outta nowhere. A former greenskeeper, now, about to become the Masters champion. It looks like a mirac...It's in the hole! It's in the hole! It's in the hole!\" Caddyshack",
  "\"Life is a banquet, and most poor suckers are starving to death!\" Auntie Mame",
  "\"I feel the need—the need for speed!\" Top Gun",
  "\"Carpe diem. Seize the day, boys. Make your lives extraordinary.\" Dead Poets Society",
  "\"Snap out of it!\" Moonstruck",
  "\"My mother thanks you. My father thanks you. My sister thanks you. And I thank you.\" Yankee Doodle Dandy",
  "\"Nobody puts Baby in a corner.\" Dirty Dancing",
  "\"I'll get you, my pretty, and your little dog too!\" The Wizard of Oz",
  "\"I'm the King of the World\" Titanic"
]

const getRdmMovieQuote = () => {
  const rdmQuoteIndex = Math.floor(Math.random() * movieQuotes.length);
  return movieQuotes[rdmQuoteIndex];
}

export default getRdmMovieQuote;