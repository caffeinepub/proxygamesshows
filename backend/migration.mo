module {
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

  type OldActor = {
    games : [Game];
    shows : [Show];
  };

  type NewActor = {
    games : [Game];
    shows : [Show];
  };

  public func run(_old : OldActor) : NewActor {
    {
      games = [];
      shows = [];
    };
  };
};
