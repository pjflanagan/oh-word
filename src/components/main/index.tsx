import React, { FC, useState, useEffect } from 'react';

import { TileModel } from 'models';

import { Dock } from './dock';
import { Header } from './header';
import { Grid } from './grid';
import * as Style from './style.module.scss';


const MainComponent: FC = () => {

  const grid = [[]];

  return (
    <main className={Style.app}>
      <Header />
      <Grid
        grid={grid}
        selectTile={(tile) => { }}
      />
      <Dock
        score={0}
        selectedTile={new TileModel({})}
        copyURL={(copyType) => { }}
        newRoll={() => { }}
      />
    </main>
  )
}


export { MainComponent }
