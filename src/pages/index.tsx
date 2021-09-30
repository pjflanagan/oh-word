import React, { FC } from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { MainComponent, HeadComponent } from 'components';

import './reset.scss';
import './style.scss';

const PageIndex: FC = () => {
  return (
    <Router>
      <HeadComponent />
      <MainComponent />
    </Router>
  );
}

export default PageIndex;
