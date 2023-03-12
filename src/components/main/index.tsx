import React, { FC, useState, useEffect, useMemo } from 'react';

import { makeTilesFromTileString, Game, Tile, URLMode, makeTileString, EmptyTile } from 'models';
import { Container, Burger, Bun } from 'elements';

import { Dock } from './dock';
import { Header } from './header';
import { GridComponent } from './grid';
import * as Style from './style.module.scss';
import { useQueryParamString } from 'react-use-query-param-string';

const MainComponent: FC = () => {

  // const [isOpen, message, sendPopup] = usePopup();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tileParamString, _setTilesString, isInitialized, clearQueryParam] = useQueryParamString('t', '');
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [dockTileId, setDockTileId] = useState<number | undefined>(undefined);


  const shuffle = () => {
    const letterSet = Game.makeRandomLetterSet();
    const newTiles = Game.makeTiles(letterSet);
    setDockTileId(undefined);
    setTiles(newTiles);
  }

  // onload
  useEffect(() => {
    if (!tileParamString) {
      shuffle();
      return;
    }
    const newTiles = makeTilesFromTileString(tileParamString);
    if (newTiles.length === 0) {
      shuffle();
      return;
    }
    setTiles(newTiles);
    // clear the tiles URL param so that the browser doesn't default to a specific set of tiles
    clearQueryParam();
  }, [isInitialized]);

  const getScore = () => {
    return Game.getScore(tiles);
  }

  const copyURL = (urlMode: URLMode) => {
    let workingCopyType = urlMode;
    if (dockTileId !== undefined) {
      // if you wanna share score and the selected tile is UNSET, use
      workingCopyType = URLMode.ROLL;
    }
    const url = `${window.location.origin}?t=${makeTileString(workingCopyType, tiles)}`;
    navigator.clipboard.writeText(url);
    // sendPopup('URL Copied');
  }

  const getDockTile = (): Tile => {
    return tiles.find((t: Tile) => t.getId() === dockTileId) || EmptyTile;
  }

  const dockTile = getDockTile();
  const score = useMemo(getScore, [tiles]);

  return (
    <main className={Style.app}>
      {/* <Modal isOpen={isOpen}>{message}</Modal>
      <Modal isOpen={isOpen}>{message}</Modal>
      <Modal isOpen={isOpen}>{message}</Modal> */}
      <Container>
        <Bun>
          <Header
            copyURL={copyURL}
          />
        </Bun>
        <Burger>
          <GridComponent
            tiles={tiles}
            setTiles={setTiles}
            dockTile={dockTile}
            setDockTileId={setDockTileId}
            score={score}
          />
        </Burger>
        <Bun>
          <Dock
            dockTile={dockTile}
            score={score.totalScore}
            shuffle={shuffle}
          />
        </Bun>
      </Container>
    </main>
  )
}


export { MainComponent }
