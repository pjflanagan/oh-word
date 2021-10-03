import React, { FC, useState, useEffect } from 'react';
import { useQueryParam, StringParam } from "use-query-params";

import { makeTilesFromTileString, Game, TileType, Tile, CopyTypeEnum, makeTileString, EmptyTile } from 'models';
import { Container, Burger, Bun } from 'elements';

import { Dock } from './dock';
import { Header } from './header';
import { Grid } from './grid';
import * as Style from './style.module.scss';

const MainComponent: FC = () => {

  const [tilesQueryParam, setTilesQueryParam] = useQueryParam('tiles', StringParam);
  const [tiles, setTiles] = useState<TileType[]>([]);
  const [dockTileId, setDockTileId] = useState<number>(-1);

  const newRoll = () => {
    const roll = Game.makeRollString();
    const newTiles = Game.makeTiles(roll);
    setDockTileId(-1);
    setTiles(newTiles);
  }

  const setURLParams = async (copyType: CopyTypeEnum = 'SCORE') => {
    setTilesQueryParam(makeTileString(copyType, tiles));
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
    setTiles(newTiles);
    setDockTileId(selectedTile.id);
  }

  const dockTile = getDockTile();
  const grid = makeGrid();
  const score = getScore();

  return (
    <main className={Style.app}>
      <Container>
        <Bun>
          <Header
            score={score}
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
            copyURL={copyURL}
            newRoll={newRoll}
          />
        </Bun>
      </Container>
    </main>
  )
}


export { MainComponent }
