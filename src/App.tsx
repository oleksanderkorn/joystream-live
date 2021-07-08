import * as React from 'react';
import joystream from './joystream.svg';
import './App.css';
import { getValidatorStatistics, getChainState } from './get-status';
import { Container, Grid, TextField } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { BootstrapButton } from './BootstrapButton';
import { LinearProgressWithLabel } from './LinearProgressWithLabel';
import { IState, IProps } from './Types';
import Autocomplete, { AutocompleteChangeDetails } from '@material-ui/lab/Autocomplete';
import { ChangeEvent, FocusEventHandler } from 'react';
import { AutocompleteChangeReason } from '@material-ui/lab';

class App extends React.Component<IProps, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shouldStop: false,
      activeEras: [],
      columns: [
        { field: 'era', headerName: 'Era', width: 100, sortable: true, headerAlign: 'center' },
        { field: 'block', headerName: 'Block', width: 100, sortable: true, headerAlign: 'center' },
        { field: 'date', headerName: 'Date', width: 200, sortable: true, headerAlign: 'center' },
        { field: 'points', headerName: 'Points', width: 100, sortable: true, headerAlign: 'center' },
        { field: 'hash', headerName: 'Block Hash', width: 500, sortable: false, headerAlign: 'center' },
      ],
      stash: '5EhDdcWm4TdqKp1ew1PqtSpoAELmjbZZLm5E34aFoVYkXdRW',
      startBlock: 1069639,
      endBlock: 1270177,
      isLoading: false,
      lastBlock: 0,
      currentBlock: 0,
      progress: {
        value: 0,
        min: 0,
        max: 0
      },
      activeValidators: [],
    };
    this.fetchBlocksData = this.fetchBlocksData.bind(this);
    this.setStash = this.setStash.bind(this);
    this.setStashOnBlur = this.setStashOnBlur.bind(this);
    this.setBlockStart = this.setBlockStart.bind(this);
    this.setBlockEnd = this.setBlockEnd.bind(this);
  }

  async componentDidMount() {
    this.updateBasedOnChainState()
    const timerId = setInterval(
      () => this.updateBasedOnChainState(),
      10000
    );
    this.setState((prevState) => { return { ...prevState, timerId } })
  }

  componentWillUnmount() {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
  }

  async updateBasedOnChainState() {
    const chainState = await getChainState();
    this.setState((prevState) => {
      return { ...prevState, lastBlock: chainState.finalizedBlockHeight, activeValidators: chainState.validators.validators }
    });
  }

  setStash(event: ChangeEvent<{}>, value: string | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined) {
    this.setState((prevState) => {
      return { ...prevState, stash: value || '' }
    });
  }

  setStashOnBlur(event: FocusEventHandler<HTMLDivElement>) {
    this.setState((prevState) => {
      // return { ...prevState, stash: event || '' }
    });
  }

  setBlockStart(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => {
      return { ...prevState, startBlock: (event.target.value as unknown as number) }
    });
  }

  setBlockEnd(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => {
      return { ...prevState, endBlock: (event.target.value as unknown as number) }
    });
  }

  async fetchBlocksData() {
    const startBlock = this.state.startBlock;
    const endBlock = this.state.endBlock;
    if (this.state.isLoading) {
      this.setState((prevState) => {
        return { ...prevState, shouldStop: true, isLoading: false }
      });
      return;
    }
    this.resetDataBeforeLoading();
    if (startBlock < endBlock) {
      for (let blockHeight = startBlock; blockHeight <= endBlock; blockHeight += 1) {
        if (this.state.shouldStop) {
          this.resetProgress();
          return;
        }
        await this.fetchBlockData(blockHeight, startBlock, endBlock);
      }
    } else {
      for (let blockHeight = startBlock; blockHeight >= endBlock; blockHeight -= 1) {
        if (this.state.shouldStop) {
          this.resetProgress();
          return;
        }
        await this.fetchBlockData(blockHeight, startBlock, endBlock);
      }
    }
  }

  async fetchBlockData(blockHeight: number, startBlock: number, endBlock: number) {
    this.updateProgress(blockHeight, startBlock, endBlock);
    let result = await getValidatorStatistics(this.state.stash, blockHeight);
    this.appendActiveEra(result);
    this.stopLoadingOnLastBlock(blockHeight, endBlock);
  }

  private resetProgress() {
    this.setState((prevState) => {
      return { ...prevState, shouldStop: false, progress: { value: 0, min: 0, max: 0 } };
    });
  }

  private stopLoadingOnLastBlock(blockHeight: number, endBlock: number) {
    if (blockHeight.toString() === endBlock.toString()) {
      this.setState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  }

  private appendActiveEra(result: { [k: string]: any; }) {
    if (result && result.status && this.state.activeEras.indexOf(result.status) < 0) {
      this.setState((prevState) => {
        return { ...prevState, activeEras: [...this.state.activeEras, result.status] };
      });
    }
  }

  private updateProgress(blockHeight: number, startBlock: number, endBlock: number) {
    this.setState((prevState) => {
      return { ...prevState, progress: { value: blockHeight, min: startBlock, max: endBlock } };
    });
  }

  private resetDataBeforeLoading() {
    this.setState((prevState) => { return { ...prevState, isLoading: true, activeEras: [] }; });
  }

  render() {
    return (
      <div className="App" >
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid container item lg={12}></Grid>
            <img src={joystream} className="App-logo" alt="Joystream logo" />
            <Grid container item lg={12}>
              <Autocomplete
                freeSolo
                style={{ width: '100%' }}
                options={this.state.activeValidators}
                onChange={this.setStash}
                value={this.state.stash}
                // onBlur={this.setStashOnBlur}
                renderInput={(params) => <TextField {...params} label="Validator stash address" variant="filled"/>} />
            </Grid>
            <Grid container item lg={12}>
              <TextField type="number" onChange={this.setBlockStart} fullWidth id="block-start" label="Start Block" value={this.state.startBlock} variant="filled" />
            </Grid>
            <Grid container item lg={12}>
              <TextField type="number" onChange={this.setBlockEnd} fullWidth id="block-end" label={this.state.lastBlock > 0 ? `End Block (Last block: ${this.state.lastBlock})` : 'End Block'} value={this.state.endBlock} variant="filled" />
            </Grid>
            <Grid container item lg={12}>
              <BootstrapButton disabled={!this.state.stash} fullWidth onClick={this.fetchBlocksData} color="primary">{this.state.isLoading ? 'Stop loading' : 'Load data'}</BootstrapButton>
            </Grid>
            {LinearProgressWithLabel(this.state.progress)}
            <div style={{ height: 600, width: '98%' }}>
              <DataGrid rows={this.state.activeEras} columns={this.state.columns} pageSize={50} />
            </div>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
