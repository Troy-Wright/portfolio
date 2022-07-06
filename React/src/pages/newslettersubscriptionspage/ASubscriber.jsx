import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

function ASubscriber(props) {
    const aRecord = props.record;

    return (
        <tr>
            <th scope="row">{aRecord.email}</th>
            <td>{aRecord.dateCreated}</td>
        </tr>
    );
}

ASubscriber.propTypes = {
    record: PropTypes.shape({
        email: PropTypes.string,
        dateCreated: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
};

export default React.memo(ASubscriber);
