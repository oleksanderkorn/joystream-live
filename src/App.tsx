import joystream from './joystream.svg';
import './App.css';
import { getValidatorStatistics, getChainState } from './get-status';
import { Container, Grid, TextField } from '@material-ui/core';
import { ColDef, DataGrid } from '@material-ui/data-grid';
import { BootstrapButton } from './BootstrapButton';
import { LinearProgressWithLabel } from './LinearProgressWithLabel';
import { ActiveEra } from './Types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import { ValidatorsStats } from './ValidatorsStats';

const JoystreamApp = () => {
  const [shouldStop, setShouldStop] = useState(false);
  const [activeEras, setActiveEras] = useState([] as ActiveEra[]);
  const [columns] = useState(
    [
      { field: 'era', headerName: 'Era', width: 100, sortable: true, headerAlign: 'center' },
      { field: 'block', headerName: 'Block', width: 100, sortable: true, headerAlign: 'center' },
      { field: 'date', headerName: 'Date', width: 200, sortable: true, headerAlign: 'center' },
      { field: 'points', headerName: 'Points', width: 100, sortable: true, headerAlign: 'center' },
      { field: 'hash', headerName: 'Block Hash', width: 500, sortable: false, headerAlign: 'center' },
    ]
  );
  const [stash, setStash] = useState('5EhDdcWm4TdqKp1ew1PqtSpoAELmjbZZLm5E34aFoVYkXdRW');
  const [startBlock, setStartBlock] = useState(1274283);
  const [endBlock, setEndBlock] = useState(1274383);
  const [isLoading, setIsLoading] = useState(false);
  const [lastBlock, setLastBlock] = useState(0);
  const [progress, setProgress] = useState({
    value: 0,
    min: 0,
    max: 0
  });
  const [activeValidators, setActiveValidators] = useState([]);

  useEffect(() => {
    updateChainState()
    const interval = setInterval(() => { updateChainState() }, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateChainState = async () => {
    const chainState = await getChainState();
    setLastBlock(chainState.finalizedBlockHeight)
    setActiveValidators(chainState.validators.validators)
  }

  const fetchBlocksData = async () => {
    resetDataBeforeLoading();
    if (startBlock < endBlock) {
      for (let blockHeight = Number(startBlock); blockHeight <= Number(endBlock); blockHeight += 1) {
        let shouldStopLoading = false
        setShouldStop(prev => {
          shouldStopLoading = prev
          return prev
        })
        if (shouldStopLoading) {
          resetProgress();
          break;
        }
        await fetchBlockData(Number(blockHeight));
      }
    } else {
      for (let blockHeight = Number(startBlock); blockHeight >= Number(endBlock); blockHeight -= 1) {
        let shouldStopLoading = false
        setShouldStop(prev => {
          shouldStopLoading = prev
          return prev
        })
        if (shouldStopLoading) {
          resetProgress();
          break;
        }
        await fetchBlockData(Number(blockHeight));
      }
    }
  }

  const stopFetchingBlocksData = () => {
    if (!shouldStop) {
      setShouldStop(true)
      setIsLoading(false)
    }
  }

  const resetProgress = () => {
    setShouldStop(false)
    setProgress({ value: 0, min: 0, max: 0 })
  }

  const fetchBlockData = async (blockHeight: number) => {
    updateProgress(blockHeight, );
    let result = await getValidatorStatistics(stash, blockHeight);
    if (result && result.status && activeEras.indexOf(result.status) < 0) {
      setActiveEras((prevEras) => [...prevEras, result.status])
    }
    stopLoadingOnLastBlock(blockHeight);
  }

  const stopLoadingOnLastBlock = (blockHeight: number) => {
    if (blockHeight.toString() === endBlock.toString()) {
      setIsLoading(false)
    }
  }

  const updateProgress = (blockHeight: number) => {
    setProgress({ value: blockHeight, min: startBlock, max: endBlock })
  }

  const resetDataBeforeLoading = () => {
    setIsLoading(true)
    setActiveEras([])
  }

  const shouldDisableButton = !stash || !startBlock || !endBlock;
  const endBlockLabel = lastBlock > 0 ? `End Block (Last block: ${lastBlock})` : 'End Block';

  const updateStartBlock = (e: { target: { value: unknown; }; }) => setStartBlock((e.target.value as unknown as number));
  const updateEndblock = (e: { target: { value: unknown; }; }) => setEndBlock((e.target.value as unknown as number));
  const startOrStopLoading = () => isLoading ? stopFetchingBlocksData() : fetchBlocksData();
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
              options={activeValidators}
              onChange={(e, value) => setStash(value || '')}
              value={stash}
              renderInput={(params) => <TextField {...params} label="Validator stash address" variant="filled" />} />
          </Grid>
          <Grid container item lg={12}>
            <TextField type="number" onChange={updateStartBlock} style={{ width: '49%', marginRight: '24px' }} id="block-start" label="Start Block" value={startBlock} variant="filled" />
            <TextField type="number" onChange={updateEndblock} style={{ width: '49%' }} id="block-end" label={endBlockLabel} value={endBlock} variant="filled" />
          </Grid>
          <ValidatorsStats stash={stash} activeEras={activeEras} />
          <Grid container item lg={12}>
            <BootstrapButton disabled={shouldDisableButton} fullWidth onClick={startOrStopLoading} color="primary">{isLoading ? 'Stop loading' : 'Load data'}</BootstrapButton>
          </Grid>
          <LinearProgressWithLabel {...progress} />
          <div style={{ height: 600, width: '98%' }}>
            <DataGrid rows={activeEras} columns={columns as unknown as ColDef[]} pageSize={50} />
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default JoystreamApp