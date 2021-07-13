import './App.css';
import { getChainState } from './get-status';
import moment from 'moment'
import { Button, Card, CardActions, CardContent, Container, createStyles, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { BootstrapButton } from './BootstrapButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Report } from './Types';


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

const ValidatorReport = () => {
    const [activeValidators, setActiveValidators] = useState([]);
    const [lastBlock, setLastBlock] = useState(0);
    const [stash, setStash] = useState('5EhDdcWm4TdqKp1ew1PqtSpoAELmjbZZLm5E34aFoVYkXdRW');
    const [dateFrom, setDateFrom] = useState(moment().subtract(14, 'd').format('yyyy-MM-DD'));
    const [dateTo, setDateTo] = useState(moment().format('yyyy-MM-DD'));
    const [startBlock, setStartBlock] = useState('' as unknown as number);
    const [endBlock, setEndBlock] = useState('' as unknown as number);
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState({
        nextPage: false,
        totalCount: 0,
        report: [] as unknown as Report[]
    });

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

    const loadReport = async () => {
        setIsLoading(true)
        const apiUrl = `http://localhost:3500/validators/${stash}`;
        const result = await axios.get(apiUrl)
        setReport(result.data);
        setIsLoading(false)
    }

    const stopLoadingReport = () => {
        setIsLoading(false)
    }

    const canLoadReport = () => stash && ((startBlock && endBlock) || (dateFrom && dateTo))
    const startOrStopLoading = () => isLoading ? stopLoadingReport() : loadReport();
    const updateStartBlock = (e: { target: { value: unknown; }; }) => setStartBlock((e.target.value as unknown as number));
    const updateEndblock = (e: { target: { value: unknown; }; }) => setEndBlock((e.target.value as unknown as number));
    const updateDateFrom = (e: { target: { value: unknown; }; }) => {
        console.log(e.target.value)
        setDateFrom((e.target.value as unknown as string))
    };
    const updateDateTo = (e: { target: { value: unknown; }; }) => setDateTo((e.target.value as unknown as string));

    const getButtonTitle = (isLoading: boolean) => {
        if (isLoading) {
            return 'Stop loading'
        }
        if (startBlock && endBlock) {
            return `Load data between blocks ${startBlock} - ${endBlock}`
        }
        if (dateFrom && dateTo) {
            return `Load data between dates ${dateFrom} - ${dateTo}`;
        }
        return 'Choose dates or blocks range'
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <h1>Validator Report</h1>
                    </Grid>
                    <Grid item lg={12}>
                        <Autocomplete
                            freeSolo
                            style={{ width: '100%' }}
                            options={activeValidators}
                            onChange={(e, value) => setStash(value || '')}
                            value={stash}
                            renderInput={(params) => <TextField {...params} label="Validator stash address" variant="filled" />} />
                    </Grid>
                    <Grid item lg={3}>
                        <TextField fullWidth type="date" onChange={updateDateFrom} id="block-start" InputLabelProps={{ shrink: true }} label="Date From" value={dateFrom} variant="filled" />
                    </Grid>
                    <Grid item lg={3}>
                        <BootstrapButton size='large' style={{ minHeight: 56 }} fullWidth onClick={() => setDateFrom(moment().subtract(2, 'w').format('yyyy-MM-DD'))}>2 weeks from today</BootstrapButton>
                    </Grid>
                    <Grid item lg={3}>
                        <TextField fullWidth type="date" onChange={updateDateTo} id="block-end" InputLabelProps={{ shrink: true }} label="Date To" value={dateTo} variant="filled" />
                    </Grid>
                    <Grid item lg={3}>
                        <BootstrapButton size='large' style={{ minHeight: 56 }} fullWidth onClick={() => setDateTo(moment().format('yyyy-MM-DD'))}>Today</BootstrapButton>
                    </Grid>
                    <Grid item lg={3}>
                        <TextField fullWidth type="number" onChange={updateStartBlock} id="block-start" label="Start Block" value={startBlock} variant="filled" />
                    </Grid>
                    <Grid item lg={3}>
                        <BootstrapButton size='large' style={{ minHeight: 56 }} fullWidth disabled={!lastBlock} onClick={() => setStartBlock(lastBlock - (600 * 24 * 14))}>{lastBlock ? `2 weeks before latest (${lastBlock - (600 * 24 * 14)})` : '2 weeks from latest'}</BootstrapButton>
                    </Grid>
                    <Grid item lg={3}>
                        <TextField fullWidth type="number" onChange={updateEndblock} id="block-end" label="End Block" value={endBlock} variant="filled" />
                    </Grid>
                    <Grid item lg={3}>
                        <BootstrapButton size='large' style={{ minHeight: 56 }} fullWidth disabled={!lastBlock} onClick={() => setEndBlock(lastBlock)}>{lastBlock ? `Pick latest block (${lastBlock})` : 'Use latest block'}</BootstrapButton>
                    </Grid>
                    <Grid item lg={12}>
                        <BootstrapButton size='large' style={{ minHeight: 56 }} fullWidth disabled={!canLoadReport()} onClick={startOrStopLoading}>{getButtonTitle(isLoading)}</BootstrapButton>
                    </Grid>
                    <Grid item lg={12}>
                        <ValidatorReportCard reports={report.report} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

const ValidatorReportCard = (props: { reports: { eraId: number; stakeTotal: number; stakeOwn: number; points: number; rewards: number; commission: number; blocksCount: number; }[] }) => {

    const copyValidatorStatistics = () => navigator.clipboard.writeText('TODO')

    const useStyles = makeStyles({
        root: {
            minWidth: '100%',
            textAlign: 'left'
        },
        title: {
            fontSize: 18,
        },
        pos: {
            marginTop: 12,
        },
    });

    const classes = useStyles();

    if (props.reports.length > 0) {
        return (<Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Validator Report:
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.reports[0] ? props.reports[0].eraId : ''}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={copyValidatorStatistics} size="small">Copy to clipboard</Button>
            </CardActions>
        </Card>)
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.pos} color="textSecondary">
                    No Data Available
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ValidatorReport
