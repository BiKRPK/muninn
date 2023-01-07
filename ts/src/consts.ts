export const kGamesFeatures = new Map<number, string[]>([
  // Valorant
  [
    21640,
    [
      'me',
      'game_info',
      'match_info',
      'kill',
      'death'
    ]
  ]
]);

export const kGameClassIds = Array.from(kGamesFeatures.keys());

export const kWindowNames = {
  inGame: 'in_game',
  desktop: 'desktop'
};

export const kHotkeys = {
  toggle: 'sample_app_ts_showhide'
};
