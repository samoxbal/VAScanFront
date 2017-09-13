import { gql } from 'react-apollo';

export const experiments = gql`
    query experiments($user: String) {
        experiments(user: $user) {
            id,
            name,
            description,
            startDate,
            endDate
        }
    }
`;

export const voltamogramms = gql`
    query voltamogramms($experiment: String) {
        voltamogramms(experiment: $experiment) {
            id
        }
    }
`;

export const voltamogramm = gql`
    query voltamogramm($voltamogrammId: String) {
        voltamogramm(voltamogrammId: $voltamogrammId) {
            id,
            cyclic,
            date,
            description,
            solution,
            numberOfElectrodes,
            equipmentId,
            scans {
                id
            }
        }
    }
`;

export const scan = gql`
    query scan($scanId: String) {
        scan(scanId: $scanId) {
            id,
            startPotential,
            endPotential,
            reverseDirection,
            stirring,
            rotation,
            channelId,
            channelLabel,
            temperature,
            pressure,
            measureMode
        }
    }
`;

export const measure = gql`
    query measure($measureId: String) {
        measure(measureId: $measureId) {
            points
        }
    }
`;