import {Segment} from 'semantic-ui-react';
import './VASegment.css';

const VASegment = ({children, className, ...rest}) => (
    <Segment className={`VASegment ${className}`} {...rest}>
        {children}
    </Segment>
);

export default VASegment;
