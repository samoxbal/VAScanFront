import { gql } from 'react-apollo';

export const createExperiment = gql`
    mutation createExperiment(
        $user: String,
        $name: String,
        $description: String,
        $startDate: String,
        $endDate: String
    ) 
    {
        createExperiment(
            user: $user,
            name: $name,
            description: $description,
            startDate: $startDate,
            endDate: $endDate
        ) 
        {
            id
        }
    }
`;

export const updateExperiment = gql`
    mutation updateExperiment(
        $id: String,
        $name: String,
        $description: String,
        $startDate: String,
        $endDate: String
    ) 
    {
        updateExperiment(
            id: $id,
            name: $name,
            description: $description,
            startDate: $startDate,
            endDate: $endDate
        ) 
        {
            id
        }
    }
`;

export const createVoltamogramm = gql`
    mutation createVoltamogramm(
        $experiment: String,
        $cyclic: Boolean,
        $date: String,
        $description: String,
        $solution: String,
        $numberOfElectrodes: Int,
        $equipmentId: String
    )
    {
        createVoltamogramm(
            experiment: $experiment,
            cyclic: $cyclic,
            date: $date,
            description: $description,
            solution: $solution,
            numberOfElectrodes: $numberOfElectrodes,
            equipmentId: $equipmentId
        )
        {
            id
        }
    }
`;

export const createScan = gql`
    mutation createScan(
        $voltamogramm: String,
        $date: String,
        $startPotential: Float,
        $endPotential: Float,
        $reverseDirection: Boolean,
        $stirring: Boolean,
        $rotation: Boolean,
        $channelId: String,
        $channelLabel: String,
        $temperature: Float,
        $pressure: Float,
        $measureMode: String
    )
    {
        createScan(
            voltamogramm: $voltamogramm,
            date: $date,
            startPotential: $startPotential,
            endPotential: $endPotential,
            reverseDirection: $reverseDirection,
            stirring: $stirring,
            rotation: $rotation,
            channelId: $channelId,
            channelLabel: $channelLabel,
            temperature: $temperature,
            pressure: $pressure,
            measureMode: $measureMode
        )
        {
            id
        }
    }
`;