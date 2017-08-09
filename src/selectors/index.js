import { createSelector } from 'reselect';

const experiments = state => state.experiments;
const selectedExperimentId = state => state.selectedExperimentId;
const voltamogramm = state => state.voltamogramm;
const getSelectedScanId = state => state.selectedScanId;

const getSelectedExperiment = createSelector(
    [experiments, selectedExperimentId],
    (experiments, id) => {
    return id ? experiments.find(experiment => experiment.id === id) : null;
});

const getSelectedScan = createSelector(
    [voltamogramm, getSelectedScanId],
    (voltamogramm, scanId) => {
        return scanId ? voltamogramm.scans.find(scan => scan.id === scanId) : null;
    }
);

const isSelectedScan = createSelector(
    getSelectedScan,
    scan => !!scan
);

export {
    getSelectedExperiment,
    getSelectedScan,
    isSelectedScan
}