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