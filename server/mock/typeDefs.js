const typeDefs = `
    type Experiment {
        id: String,
        name: String,
        description: String,
        startDate: String,
        endDate: String
    }

    type Voltamogramm {
        id: String,
        cyclic: Boolean,
        date: String,
        description: String,
        solution: String,
        numberOfElectrodes: Int,
        equipmentId: String,
        scans: [Scan]
    }
    
    type Scan {
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
        measureMode,
        measures {
            id
        }
    }
    
    type Query {
    
    }
`;

export default typeDefs;