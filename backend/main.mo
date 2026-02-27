import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Game = {
    title : Text;
    description : Text;
    embedUrl : Text;
    thumbnailUrl : Text;
  };

  type Show = {
    title : Text;
    description : Text;
    embedUrl : Text;
    thumbnailUrl : Text;
  };

  let games : [Game] = [
    // Original games kept the same
    {
      title = "Slope";
      description = "Roll your ball down a steep slope while avoiding obstacles in this fast-paced 3D game.";
      embedUrl = "https://www.slopeunblocked.com/embed.html";
      thumbnailUrl = "https://static.example.com/thumbnails/slope.jpg";
    },
    {
      title = "1v1.LOL";
      description = "Battle it out in this third-person shooter/building game inspired by Fortnite.";
      embedUrl = "https://1v1.lol/embed";
      thumbnailUrl = "https://static.example.com/thumbnails/1v1lol.jpg";
    },
    {
      title = "Cookie Clicker";
      description = "Addictive incremental game where you bake cookies and expand your cookie empire.";
      embedUrl = "https://orteil.dashnet.org/cookieclicker/";
      thumbnailUrl = "https://static.example.com/thumbnails/cookieclicker.jpg";
    },
    {
      title = "Run 3";
      description = "Navigate your character through a series of tunnels in this endless runner platformer.";
      embedUrl = "https://www.coolmathgames.com/0-run-3/play";
      thumbnailUrl = "https://static.example.com/thumbnails/run3.jpg";
    },
    {
      title = "Drift Hunters";
      description = "Customize your car and drift through challenging tracks in this realistic driving simulator.";
      embedUrl = "https://www.crazygames.com/game/drift-hunters";
      thumbnailUrl = "https://static.example.com/thumbnails/drifthunters.jpg";
    },
    {
      title = "Retro Bowl";
      description = "Manage your football team and compete in retro-style matches.";
      embedUrl = "https://www.retro-bowl.com/play/";
      thumbnailUrl = "https://static.example.com/thumbnails/retrobowl.jpg";
    },
    // New games
    {
      title = "Agar.io";
      description = "Control a cell and consume others to grow larger in this massively multiplayer online game.";
      embedUrl = "https://agar.io/";
      thumbnailUrl = "https://static.example.com/thumbnails/agario.jpg";
    },
    {
      title = "Krunker.io";
      description = "Fast-paced first-person shooter with multiple game modes and maps.";
      embedUrl = "https://krunker.io/";
      thumbnailUrl = "https://static.example.com/thumbnails/krunker.jpg";
    },
    {
      title = "Happy Wheels";
      description = "Ragdoll physics-based platform browser game featuring various characters and vehicles.";
      embedUrl = "https://totaljerkface.com/happy_wheels.tjf";
      thumbnailUrl = "https://static.example.com/thumbnails/happywheels.jpg";
    },
    {
      title = "Geometry Dash";
      description = "Rhythm-based platformer game where you control a square to avoid obstacles.";
      embedUrl = "https://scratch.mit.edu/projects/105500895/";
      thumbnailUrl = "https://static.example.com/thumbnails/geometrydash.jpg";
    },
    {
      title = "Tank Trouble";
      description = "Classic tank multiplayer game where you battle in mazes.";
      embedUrl = "https://tanktrouble.com/";
      thumbnailUrl = "https://static.example.com/thumbnails/tanktrouble.jpg";
    },
    {
      title = "Bloons Tower Defense";
      description = "Tower defense game where you pop as many balloons as possible with monkey towers.";
      embedUrl = "https://ninjakiwi.com/Games/Bloons-Tower-Defense-games/Bloons-Tower-Defense-5.html";
      thumbnailUrl = "https://static.example.com/thumbnails/bloons.jpg";
    },
    {
      title = "Shell Shockers";
      description = "First-person shooter featuring eggs armed with weapons in multiplayer battles.";
      embedUrl = "https://shellshock.io/";
      thumbnailUrl = "https://static.example.com/thumbnails/shellshockers.jpg";
    },
    {
      title = "Subway Surfers";
      description = "Classic endless running game where you evade trains and collect coins.";
      embedUrl = "https://now.gg/play/sybo-games/4376/subway-surfers";
      thumbnailUrl = "https://static.example.com/thumbnails/subwaysurfers.jpg";
    },
  ];

  let shows : [Show] = [
    // Original shows kept the same
    {
      title = "Breaking Bad";
      description = "A high school chemistry teacher turns to a life of crime in this critically acclaimed drama. Watch the official trailer.";
      embedUrl = "https://www.youtube.com/embed/HhesaQXLuRY";
      thumbnailUrl = "https://static.example.com/thumbnails/breakingbad.jpg";
    },
    {
      title = "The Office";
      description = "A mockumentary sitcom depicting the everyday lives of office employees. Watch the best moments compilation.";
      embedUrl = "https://www.youtube.com/embed/dVHo1dU1GSo";
      thumbnailUrl = "https://static.example.com/thumbnails/theoffice.jpg";
    },
    {
      title = "Game of Thrones";
      description = "Epic fantasy series based on George R.R. Martin's novels. Watch the official series trailer.";
      embedUrl = "https://www.youtube.com/embed/BpJYNVhGf1s";
      thumbnailUrl = "https://static.example.com/thumbnails/gameofthrones.jpg";
    },
    {
      title = "Stranger Things";
      description = "A group of kids uncover supernatural mysteries in their small town. Watch the season 1 trailer.";
      embedUrl = "https://www.youtube.com/embed/b9EkMc79ZSU";
      thumbnailUrl = "https://static.example.com/thumbnails/strangerthings.jpg";
    },
    {
      title = "The Wire";
      description = "Crime drama series exploring the city of Baltimore through the eyes of law enforcement, drug dealers, and residents.";
      embedUrl = "https://www.youtube.com/embed/9qK-VGjMr8g";
      thumbnailUrl = "https://static.example.com/thumbnails/thewire.jpg";
    },
    {
      title = "Peaky Blinders";
      description = "British crime drama following the exploits of the Shelby crime family.";
      embedUrl = "https://www.youtube.com/embed/oVzVdvGIC7U";
      thumbnailUrl = "https://static.example.com/thumbnails/peakyblinders.jpg";
    },
    {
      title = "The Sopranos";
      description = "Acclaimed series about New Jersey mob boss Tony Soprano's struggles to balance family life and organized crime.";
      embedUrl = "https://www.youtube.com/embed/WRuHzYx-8Go";
      thumbnailUrl = "https://static.example.com/thumbnails/thesopranos.jpg";
    },
    // New shows
    {
      title = "Better Call Saul";
      description = "Prequel to Breaking Bad, following the story of Jimmy McGill/Saul Goodman. Watch official season 1 trailer.";
      embedUrl = "https://www.youtube.com/embed/HN4oydykJFc";
      thumbnailUrl = "https://static.example.com/thumbnails/bettercallsaul.jpg";
    },
    {
      title = "The Witcher";
      description = "Fantasy drama based on the book series, following monster hunter Geralt of Rivia. Watch Netflix trailer.";
      embedUrl = "https://www.youtube.com/embed/ndl1W4ltcmg";
      thumbnailUrl = "https://static.example.com/thumbnails/thewitcher.jpg";
    },
    {
      title = "Dark";
      description = "German sci-fi thriller about families uncovering a time travel conspiracy. Watch official trailer.";
      embedUrl = "https://www.youtube.com/embed/ESEUoa-mz2c";
      thumbnailUrl = "https://static.example.com/thumbnails/dark.jpg";
    },
    {
      title = "Narcos";
      description = "Drama series chronicling the history of drug cartels in Colombia. Watch original Netflix trailer.";
      embedUrl = "https://www.youtube.com/embed/U7elNhHwgBU";
      thumbnailUrl = "https://static.example.com/thumbnails/narcos.jpg";
    },
    {
      title = "Money Heist";
      description = "Spanish drama about a criminal mastermind leading group of robbers for a perfect heist. Watch part 4 trailer.";
      embedUrl = "https://www.youtube.com/embed/p_PJbmrX4uk";
      thumbnailUrl = "https://static.example.com/thumbnails/moneyheist.jpg";
    },
    {
      title = "Squid Game";
      description = "Korean thriller series about contestants in deadly children's games. Watch official trailer.";
      embedUrl = "https://www.youtube.com/embed/oqxAJKy0ii4";
      thumbnailUrl = "https://static.example.com/thumbnails/squidgame.jpg";
    },
    {
      title = "Inception";
      description = "Mind-bending thriller film by Christopher Nolan about dreams within dreams. Watch trailer.";
      embedUrl = "https://www.youtube.com/embed/YoHD9XEInc0";
      thumbnailUrl = "https://static.example.com/thumbnails/inception.jpg";
    },
  ];

  public query ({ caller }) func getAllGames() : async [Game] {
    games;
  };

  public query ({ caller }) func getAllShows() : async [Show] {
    shows;
  };
};
