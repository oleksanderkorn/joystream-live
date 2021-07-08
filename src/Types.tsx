import { ColDef } from '@material-ui/data-grid';
import { ActiveEra } from './joyApi';

export interface IProps {
}

export interface IState {
  shouldStop: boolean;
  activeEras: ActiveEra[];
  columns: ColDef[];
  stash: string;
  startBlock: number;
  endBlock: number;
  isLoading: boolean;
  lastBlock: number;
  currentBlock: number;
  timerId?: NodeJS.Timeout;
  progress: {
    value: number;
    min: number;
    max: number;
  };
}
