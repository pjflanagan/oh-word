TODO:
- [ ] share button (share config, share roll) - start using search instead of hash
- [ ] mobile sizing - get rid of dock completley (replace instead of place)
- [ ] social media share card with logo
- [ ] fix all the hashtags and exclamation points in path - start using search instead of hash
- [ ] hover effect on tiles (animation that rotates them a little and makes them bigger)
- [x] no cursor on empty squares, hover instead
- [x] detect islands and don't reward points: only reward points for the largest island, subtract points for the others
- [x] zero points if less than zero
- [x] have them randomly on the page, move dock to the bottom
- [x] make tiles rotated slightly


```
python -m SimpleHTTPServer 8000 
```

On load:

a) Get the roll from r and add that to the roll
?r=ZLFEOAPEMIAAEI

b) Get the arrangement from a, use that to make the tile and grid
?a=[{c:A,r:4,c:8}, ...]

(both r and a should be present in the URL)

c) random new roll, and arrangement