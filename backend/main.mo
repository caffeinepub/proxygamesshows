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
    {
      title = "Chess";
      description = "Classic strategy board game";
      embedUrl = "https://example.com/chess";
      thumbnailUrl = "https://example.com/chess-thumb.jpg";
    },
    {
      title = "Sudoku";
      description = "Number puzzle game";
      embedUrl = "https://example.com/sudoku";
      thumbnailUrl = "https://example.com/sudoku-thumb.jpg";
    },
  ];

  let shows : [Show] = [
    {
      title = "Science Explained";
      description = "Explore scientific topics";
      embedUrl = "https://example.com/science";
      thumbnailUrl = "https://example.com/science-thumb.jpg";
    },
    {
      title = "History Hour";
      description = "Dive into historical events";
      embedUrl = "https://example.com/history";
      thumbnailUrl = "https://example.com/history-thumb.jpg";
    },
  ];

  public query ({ caller }) func getAllGames() : async [Game] {
    games;
  };

  public query ({ caller }) func getAllShows() : async [Show] {
    shows;
  };
};
