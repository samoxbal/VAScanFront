import { createSelector } from 'reselect';

const experiments = state => state.experiments;
const selectedExperimentId = state => state.selectedExperimentId;

const getSelectedExperiment = createSelector(
    [experiments, selectedExperimentId],
    (experiments, id) => {
    return id ? experiments.find(experiment => experiment.id === id) : null;
});

export {
    getSelectedExperiment
}