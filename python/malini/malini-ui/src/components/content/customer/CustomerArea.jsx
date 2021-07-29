import React, {useState} from 'react';
import CustomerAreaEntry from './CustomerAreaEntry';

const CustomerArea = () => {

    const [openAreaModal, setOpenAreaModal] = useState(false);

    const toggleAreaModal = () => setOpenAreaModal(!openAreaModal);

    return (
        <div>
            <button type="button" onClick={toggleAreaModal}>
            Open Modal
            </button>
            <CustomerAreaEntry openAreaModal={openAreaModal} toggleAreaModal={toggleAreaModal} />
        </div>
    );
}

export default CustomerArea;
