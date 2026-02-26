import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import Migration "migration";

(with migration = Migration.run)
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
  ];

  let shows : [Show] = [
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
  ];

  public query ({ caller }) func getAllGames() : async [Game] {
    games;
  };

  public query ({ caller }) func getAllShows() : async [Show] {
    shows;
  };
};
