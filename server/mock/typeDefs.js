const typeDefs = `
    type Experiment {
        id: String
        name: String
        description: String
        startDate: String
        endDate: String
    }

    type Voltamogramm {
        id: String
        cyclic: Boolean
        date: String
        description: String
        solution: String
        numberOfElectrodes: Int
        equipmentId: String
        scans: [Scan]
    }
    
    type Scan {
        id: String
        startPotential: Float
        endPotential: Float
        reverseDirection: Boolean
        stirring: Boolean
        rotation: Boolean
        channelId: String
        channelLabel: String
        temperature: Float
        pressure: Float
        measureMode: String
        measures: [Measure]
    }
    
    type Measure {
        id: String
        points: [[Float]]
    }
    
    type Query {
        experiments(user: String): [Experiment]
        voltamogramms(experiment: String): [Voltamogramm]
        
    }
`;

export default typeDefs;