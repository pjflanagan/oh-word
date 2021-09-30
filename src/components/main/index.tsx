import React, { FC, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"; // useHistory

import { makeTilesFromURL, Game, TileType, Tile, CopyTypeEnum, makeURLParams, EmptyTile } from 'models';

import { Dock } from './dock';
import { Header } from './header';
import { Grid } from './grid';
import * as Style from './style.module.scss';


const MainComponent: FC = () => {

  // const history = useHistory();
  const location = useLocation();

  const [tiles, setTiles] = useState<TileType[]>([]);
  // TODO: keep track of the id of the docked tile not the tile itself
  const [dockTileId, setDockTileId] = useState<number>(-1);

  const newRoll = () => {
    const roll = Game.makeRollString();
    console.log({ roll });
    const newTiles = Game.makeTiles(roll);
    console.log({ newTiles });
    setTiles(newTiles);
    // makeURLParams(tiles);
  }

  useEffect(() => {
    if (location?.search !== '') {
      const params = new URLSearchParams(location.search);
      const tilesParam = params.get('tiles');
      console.log({ tilesParam });
      if (!tilesParam) {
        newRoll();
        return;
      }
      const newTiles = makeTilesFromURL(tilesParam);
      console.log({ newTiles });
      if (newTiles.length === 0) {
        newRoll();
        return;
      }
      setTiles(newTiles);
      return;
    }
    newRoll();
  }, []);

  const getScore = () => {
    return Game.getScore(tiles);
  }

  const setURLParams = async (copyType: CopyTypeEnum = 'SCORE') => {
    console.log(makeURLParams(copyType, tiles));
    // history.replace({
    //   pathname: '',
    //   search: `?tiles=${makeURLParams(copyType, tiles)}`
    // });
  }

  const copyURL = (copyType: CopyTypeEnum) => {
    if (copyType === 'SCORE' && dockTileId !== -1) {
      // if you wanna share score and the selected tile is -1, it wont work
      return;
    }
    setURLParams(copyType).then(function () {
      navigator.clipboard.writeText(window.location.toString());
      alert('URL Copied');
    });
  }

  const getDockTile = (): TileType => {
    return tiles.find(t => t.id === dockTileId) || EmptyTile;
  }

  const replace = (selectedTile: TileType) => {
    let newTiles = tiles.filter(t => t.id !== selectedTile.id);
    newTiles = [...newTiles, Tile.makeUnplacedTile(selectedTile)]
    if (dockTileId !== -1) {
      const dockTile = getDockTile();
      newTiles = tiles.filter(t => t.id !== dockTileId);
      const newlyPlacedTile = Tile.makePlacedTile(dockTile, { row: selectedTile.row, col: selectedTile.col });
      newTiles = [...newTiles, newlyPlacedTile];
    }
    console.log(newTiles);
    setTiles(newTiles);
    setDockTileId(selectedTile.id);
  }

  const dockTile = getDockTile();
  const grid = Game.makeGridFromTiles(tiles);

  return (
    <main className={Style.app}>
      <Header />
      <Grid
        grid={grid}
        dockTile={dockTile}
        selectTile={replace}
      />
      <Dock
        score={getScore()}
        dockTile={dockTile}
        copyURL={copyURL}
        newRoll={newRoll}
      />
    </main>
  )
}


export { MainComponent }
