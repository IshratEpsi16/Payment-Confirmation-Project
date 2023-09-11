
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateCustomer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fileLink, setFileLink] = useState('');
    const [header, setHeader] = useState('');
    const [remarks, setRemarks] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [customerGender, setCustomerGender] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [organizationNames, setOrganizationNames] = useState([]);
    const [bagCementBMPCC, setBagCementBMPCC] = useState(false); // Checkbox state
    const [bagCementAMPCC, setBagCementAMPCC] = useState(false); // Checkbox state
    const [bagCementGoldOPC, setBagCementGoldOPC] = useState(false);

    useEffect(() => {
        // Fetch organization names
        axios.get('http://localhost:8081/organizationNames')
            .then(res => {
                setOrganizationNames(res.data);
            })
            .catch(err => console.log(err));

        // Fetch customer details for the provided ID
        axios.get(`http://localhost:8081/`, id, {
            header,
            remarks,
            customerName,
            customerGender,
            orderDate,
            orderNumber,
            organization_name: selectedOrganization,
            fileLink
        })
            .then(res => {

                const customerData = res.data; // Assuming your backend returns customer data
                customerData.map((item) => {

                    console.log(item[0])
                })
                console.log('Info', customerData)
                setHeader(customerData.header);
                setRemarks(customerData.remarks);
                setCustomerName(customerData.customerName);
                setOrderNumber(customerData.orderNumber);
                setCustomerGender(customerData.customerGender);
                setOrderDate(customerData.orderDate);
                setSelectedOrganization(customerData.organizationName);
                setFileLink(customerData.fileLink);
                setBagCementBMPCC(!!customerData.bag_cement_bm_pcc);
                setBagCementAMPCC(!!customerData.bag_cement_am_pcc);
                setBagCementGoldOPC(!!customerData.bag_cement_gold_opc);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();

        // Check if the header is empty
        if (!header) {
            alert('Header column cannot be empty!');
            return; // Stop the submission if the header is empty
        }

        axios
            .put(`http://localhost:8081/update/${id}`, {
                header,
                remarks,
                customerName,
                customerGender,
                orderDate,
                orderNumber,
                organization_name: selectedOrganization,
                fileLink, // Ensure consistency with backend field name
                bagCementBMPCC, // Include checkbox values in the request
                bagCementAMPCC,
                bagCementGoldOPC
            })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="container bg-light text-dark">
            <h5 className='pt-2 text-center text-secondary'>Add New Customer</h5>
            <div className='container border'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className="col-6">
                            <br></br>
                            <div className='p-2'>
                                <label htmlFor="" >Header</label><br></br>
                                <input type="number" value={header} onChange={e => setHeader(e.target.value)} className="border border-secondary mt-2 rounded-2  form" />
                                <br></br>
                                <label htmlFor="">Order Number</label><br />
                                <input type="number" onChange={e => setOrderNumber(e.target.value)} className="border border-secondary mt-2 rounded-2  form" />
                                <br></br>




                                <label htmlFor="">Order Date</label><br></br>
                                <input
                                    type="date"
                                    className="border border-secondary mt-2 rounded-2 form"
                                    id="orderDate"
                                    name="orderDate"
                                    value={orderDate}
                                    onChange={e => setOrderDate(e.target.value)}
                                />
                                <br></br>


                                <label htmlFor="">Item Type</label>

                                <br></br>
                                <input
                                    type="radio"
                                    id="BAG"
                                    name="customerGender"
                                    value="BAG"
                                    checked={customerGender === 'BAG'}
                                    onChange={e => setCustomerGender(e.target.value)}
                                />
                                <label htmlFor="BAG" className="radio-label">
                                    Bag
                                </label>
                                <br></br>
                                <input
                                    type="radio"
                                    id="BULK"
                                    name="customerGender"
                                    value="BULK"
                                    checked={customerGender === 'BULK'}
                                    onChange={e => setCustomerGender(e.target.value)}
                                />
                                <label htmlFor="BULK" className="radio-label">
                                    Bulk
                                </label>


                                <br></br>
                                <label htmlFor="">Item Type</label><br />
                                <input
                                    type="checkbox"
                                    checked={bagCementBMPCC}
                                    onChange={() => setBagCementBMPCC(!bagCementBMPCC)}
                                />
                                <label htmlFor="">BAG CEMENT B-M(PCC)</label>
                                <br />


                                <input
                                    type="checkbox"
                                    checked={bagCementAMPCC}
                                    onChange={() => setBagCementAMPCC(!bagCementAMPCC)}
                                />
                                <label htmlFor="">BAG CEMENT A-M SPECIAL(PCC)</label>
                                <br />


                                <input
                                    type="checkbox"
                                    checked={bagCementGoldOPC}
                                    onChange={() => setBagCementGoldOPC(!bagCementGoldOPC)}
                                />
                                <label htmlFor="">BAG CEMENT GOLD(OPC)</label>
                                <br />

                            </div>
                        </div>
                        <div className="col-6">
                            <div className='p-2'>
                                <br></br><br></br><br></br>
                                <label htmlFor="">Customer Name</label><br></br>
                                <input type="text" onChange={e => setCustomerName(e.target.value)} className="border border-secondary mt-2 rounded-2  form" />

                                <br></br>
                                <label htmlFor="">Remarks</label><br></br>
                                <input type="text" onChange={e => setRemarks(e.target.value)} className="border border-secondary mt-2 rounded-2  form" />
                                <br></br>
                                <label htmlFor="">Attach File Link</label><br></br>
                                <input type="text" onChange={e => setFileLink(e.target.value)} className="border border-secondary mt-2 rounded-2  form" />
                                <br></br>

                                <label htmlFor="">Organization Name</label><br></br>
                                <select
                                    className="border border-secondary mt-2 rounded-2 form"
                                    onChange={e => setSelectedOrganization(e.target.value)}
                                    value={selectedOrganization}
                                >
                                    <option value="">Select Organization</option>
                                    {organizationNames.map((orgName, index) => (
                                        <option key={index} value={orgName}>
                                            {orgName}
                                        </option>
                                    ))}
                                </select><br></br><br></br>
                                <button className='btn btn-success' type="submit">Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>




















    );
}

export default UpdateCustomer;
