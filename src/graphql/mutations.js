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
