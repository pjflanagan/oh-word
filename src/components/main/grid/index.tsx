
import React, { FC, useState, useEffect } from 'react';

import { GridType, TileModel } from 'models';


type GridProps = {
  grid: GridType;
  selectTile: (tile: TileModel) => void;
}

const Grid: FC<GridProps> = ({
  grid,
  selectTile
}) => {

  return (

    <div className="grid-container">
      <div className="grid-holder">
        <div className="grid">
          {
            grid.map((row: TileModel[]) => (
              <div className="row">
                {
                  row.map((tile: TileModel) => (
                    <div className="col">
                      <div
                        className="grid-tile"
                        // TODO: ng-className="styleGridTile(tile)" 
                        onClick={() => selectTile(tile)}
                      // TODO: ng-style="tile.style"
                      >
                        <div className="character">{tile.displayCharacter()}</div>
                        <div className="value">{tile.displayValue()}</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}


export { Grid }



