import { createSelector } from 'reselect';

const voltamogramm = state => state.voltamogramm;
const getSelectedScanId = state => state.selectedScanId;

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
    getSelectedScan,
    isSelectedScan
}
