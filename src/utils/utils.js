export function mapExperiments(experiments) {
    return experiments.map(experiment => ({
        ...experiment,
        startDate: experiment.startDate ? new Date(experiment.startDate) : null,
        endDate: experiment.endDate ? new Date(experiment.endDate) : null
    }));
}

export function isBrowser() {
    return typeof window !== 'undefined';
}