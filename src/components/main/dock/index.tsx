import React, { FC, useState, useEffect } from 'react';

import { TileModel } from 'models';

type DockProps = {
  selectedTile: TileModel,
  score: number
  newRoll: () => void,
  copyURL: (copyType: 'ROLL' | 'SCORE') => void
}


const Dock: FC<DockProps> = ({ selectedTile, score, newRoll, copyURL }) => {

  const tileClassName = selectedTile.index === -1 ? 'empty' : '';
  const scoreShareClassName = selectedTile.index === -1 ? 'disabled' : '';

  return (
    <div className="dock">
      <div className="dock-item">
        <div className={`dock-tile ${tileClassName}`}>
          <div className="character">{selectedTile.displayCharacter()}</div>
          <div className="value">{selectedTile.displayValue()}</div>
        </div>
      </div>
      <div className="dock-item">
        <div className="button">
          <div className="top">{score}</div>
          <div className="bottom">Score</div>
        </div>
      </div>
      <div className="dock-item">
        <div className="button clickable" onClick={newRoll}>
          <div className="top">Re-</div>
          <div className="bottom">Roll</div>
        </div>
      </div>
      <div className="dock-item">
        <div className="button clickable" onClick={() => copyURL('ROLL')}>
          <div className="top">Roll</div>
          <div className="bottom">Share</div>
        </div>
      </div>
      <div className="dock-item">
        <div className={`button clickable ${scoreShareClassName}`} onClick={() => copyURL('SCORE')}>
          <div className="top">Score</div>
          <div className="bottom">Share</div>
        </div>
      </div>
    </div>
  )
}


export { Dock }
