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