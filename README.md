
# [Play Cross Word Cubes](http://pjflanagan.me/play-cross-word-cubes/)

Arrange the tiles into a cross word formation containing valid words. You can share the roll to compete with a friend, or you can share the arrangement to show off your high score!

## Run

```
python -m SimpleHTTPServer 8000 
```

## To Do
- [ ] social media share card with logo (make your own logo, not the actual cross word cubes)
- [ ] popup when you click the share button (not alert)
- [ ] change the name of this game
- [ ] styles for deactivated buttons
- [ ] hover effect on tiles (animation that rotates them a little and makes them bigger, CUTE)
- [ ] copy url work on mobile (clipboard.js?)
- [ ] fix all the hashtags and exclamation points in path (hashbang)
- [x] modularize code now that it's getting bigger
- [x] mobile sizing - get rid of dock completley and only show the tile that is currently placeable (replace instead of place, should work for all tiles, even blank ones)
- [x] no cursor on empty squares, hover instead
- [x] detect islands and don't reward points: only reward points for the largest island, subtract points for the others
- [x] zero points if less than zero
- [x] have them randomly on the page, move dock to the bottom
- [x] make tiles rotated slightly
- [x] share button (share config, share roll)
