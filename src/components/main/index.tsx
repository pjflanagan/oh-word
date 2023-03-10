import React, { FC, useState, useEffect, useMemo } from 'react';
import { useQueryParam, StringParam } from "use-query-params";

import { makeTilesFromTileString, Game, Tile, URLMode, makeTileString, EmptyTile, UNSET, isSet, isUnset } from 'models';
import { Container, Burger, Bun, Popup, usePopup } from 'elements';

import { Dock } from './dock';
import { Header } from './header';
import { GridComponent } from './grid';
import * as Style from './style.module.scss';

const MainComponent: FC = () => {

  const [isOpen, message, sendPopup] = usePopup();
  const [tilesQueryParam, setTilesQueryParam] = useQueryParam('t', StringParam);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [dockTileId, setDockTileId] = useState<number>(UNSET);

  const newRoll = () => {
    const letterSet = Game.makeRandomLetterSet();
    const newTiles = Game.makeTiles(letterSet);
    setDockTileId(UNSET);
    setTiles(newTiles);
  }

  const setURLParams = () => {
    // TODO: fix this
    // setTilesQueryParam(makeTileString(URLMode.SCORE, tiles));
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

  const copyURL = (urlMode: URLMode) => {
    let workingCopyType = urlMode;
    if (isSet(dockTileId)) {
      // if you wanna share score and the selected tile is UNSET, use
      workingCopyType = URLMode.ROLL;
    }
    const url = `${window.location.origin}?t=${makeTileString(workingCopyType, tiles)}`;
    navigator.clipboard.writeText(url);
    sendPopup('URL Copied');
  }

  const getDockTile = (): Tile => {
    return tiles.find((t: Tile) => t.id === dockTileId) || EmptyTile;
  }

  const replace = (selectedTile: Tile) => {
    if (isUnset(dockTileId) && isUnset(selectedTile.id)) {
      return;
    }
    const { row, col } = selectedTile;
    // filter the selected tile out
    let newTiles: Tile[] = [...tiles];
    if (isSet(selectedTile.id)) {
      // if there is a selected tile
      newTiles = newTiles.filter(t => t.id !== selectedTile.id);
      // replace the tile with an unplaced one
      newTiles = [...newTiles, selectedTile.unplaceTile()];
    }
    if (isSet(dockTileId)) {
      // if there is a tile in the dock
      const dockTile = getDockTile();
      // filter the dock tile from tiles
      newTiles = newTiles.filter(t => t.id !== dockTileId);
      // make a newly placed tile and put it in the array
      const newlyPlacedTile = dockTile.placeTile({ row, col });
      newTiles = [...newTiles, newlyPlacedTile];
    }
    setTiles(newTiles);
    setDockTileId(selectedTile.id);
  }

  const dockTile = getDockTile();
  const grid = makeGrid();

  const score = useMemo(getScore, [tiles]);

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
          <GridComponent
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
