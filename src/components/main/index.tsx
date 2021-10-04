import React, { FC, useState, useEffect } from 'react';
import { useQueryParam, StringParam } from "use-query-params";

import { makeTilesFromTileString, Game, TileType, Tile, CopyTypeEnum, makeTileString, EmptyTile } from 'models';
import { Container, Burger, Bun, Popup, usePopup } from 'elements';

import { Dock } from './dock';
import { Header } from './header';
import { Grid } from './grid';
import * as Style from './style.module.scss';

const MainComponent: FC = () => {

  const [isOpen, message, sendPopup] = usePopup();
  const [tilesQueryParam, setTilesQueryParam] = useQueryParam('tiles', StringParam);
  const [tiles, setTiles] = useState<TileType[]>([]);
  const [dockTileId, setDockTileId] = useState<number>(-1);

  const newRoll = () => {
    const roll = Game.makeRollString();
    const newTiles = Game.makeTiles(roll);
    setDockTileId(-1);
    setTiles(newTiles);
  }

  const setURLParams = () => {
    setTilesQueryParam(makeTileString('SCORE', tiles));
  }

  useEffect(() => {
    if (!tilesQueryParam) {
      newRoll();
      return;
    }
    const newTiles = makeTilesFromTileString(tilesQueryParam);
    if (newTiles.length === 0) {
      newRoll();
      return;
    }
    setTiles(newTiles);
  }, []);

  useEffect(() => {
    setURLParams();
  }, [tiles]);

  const getScore = () => {
    return Game.getScore(tiles);
  }

  const makeGrid = () => {
    return Game.makeGridFromTiles(tiles);
  }

  const copyURL = (copyType: CopyTypeEnum) => {
    let workingCopyType = copyType;
    if (dockTileId !== -1) {
      // if you wanna share score and the selected tile is -1, use
      workingCopyType = 'ROLL';
    }
    const url = `${window.location.origin}?tiles=${makeTileString(workingCopyType, tiles)}`;
    console.log(url);
    navigator.clipboard.writeText(url);
    sendPopup('URL Copied');
  }

  const getDockTile = (): TileType => {
    return tiles.find(t => t.id === dockTileId) || EmptyTile;
  }

  const replace = (selectedTile: TileType) => {
    // filter the selected tile out
    let newTiles: TileType[] = [...tiles];
    if (selectedTile.id !== -1) {
      // if there is a selected tile
      newTiles = newTiles.filter(t => t.id !== selectedTile.id);
      // replace the tile with an unplaced one
      newTiles = [...newTiles, Tile.makeUnplacedTile(selectedTile)];
    }
    if (dockTileId !== -1) {
      // if there is a tile in the dock
      const dockTile = getDockTile();
      // filter the dock tile from tiles
      newTiles = newTiles.filter(t => t.id !== dockTileId);
      // make a newly placed tile and put it in the array
      const newlyPlacedTile = Tile.makePlacedTile(dockTile, { row: selectedTile.row, col: selectedTile.col });
      newTiles = [...newTiles, newlyPlacedTile];
    }
    setTiles(newTiles);
    setDockTileId(selectedTile.id);
  }

  const dockTile = getDockTile();
  const grid = makeGrid();
  const score = getScore();

  return (
    <main className={Style.app}>
      <Popup isOpen={isOpen}>{message}</Popup>
      <Container>
        <Bun>
          <Header
            copyURL={copyURL}
          />
        </Bun>
        <Burger>
          <Grid
            grid={grid}
            dockTile={dockTile}
            selectTile={replace}
          />
        </Burger>
        <Bun>
          <Dock
            dockTile={dockTile}
            score={score}
            newRoll={newRoll}
          />
        </Bun>
      </Container>
    </main>
  )
}


export { MainComponent }
