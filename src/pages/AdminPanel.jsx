import '../css/AdminPanel.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import getData from '../api_folder/ApiFood';
import getAllUser from '../api_folder/ApiGetAllUser';
import createFood from '../api_folder/ApiCreateFood';


export default function AdminPanel() {

    const [makan, setMakan] = useState([]);
    const [pengguna, setPengguna] = useState([]);

    const [foodName, setFoodName] = useState();
    const [foodDesc, setFoodDesc] = useState();
    const [foodIMG, setFoodIMG] = useState();
    const [foodIngre, setFoodIngre] = useState([]);

    const [showA, setShowA] = useState(false);
    const handleCloseA = () => setShowA(false);
    const handleShowA = (name, description, imageUrl, ingredients) => {
        setShowA(true);
        setFoodName(name);
        setFoodDesc(description);
        setFoodIMG(imageUrl);
        setFoodIngre(ingredients);
    }

    const [ingr, setIngr] = useState({
        ingredients: ''
    });

    const [inputList, setInputList] = useState([{ ingredients: '' }]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { ingredients: "" }]);
    };


    const getAllFood = () => {
        getData().then((res) => {
            setMakan(res.data.data)
            console.log(makan);
        });
    }

    const handleEditFood = () => {
        handleShowA();
    }

    const getEveryUser = () => {
        getAllUser().then((res) => {
            setPengguna(res.data.data)
            console.log(pengguna);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('floatingfoodname').value;
        const description = document.getElementById('floatingdescription').value;
        const imageUrl = document.getElementById('floatingImgUrl').value;
        setIngr(document.getElementById('ingredients1').value)
        const ingredients = ingr;
        createFood(name, description, imageUrl, ingredients).then((res) => {
            console.log(res.data);
            getAllFood();
        });
    }

    useEffect(() => {
        getAllFood();
        getEveryUser();
    }, []);

    return (
        <>
            <div className="split left">
                <div className="centered">
                    <div className='bagianKiri'>
                        <h1 style={{ color: 'white' }}>Create food</h1>

                        <Form onSubmit={handleSubmit}>
                            <FloatingLabel
                                controlId="floatingfoodname"
                                label="Food name"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Enter food name" />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingdescription"
                                label="Description"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Enter food description" />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingImgUrl"
                                label="Image Url"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Enter image url" />
                            </FloatingLabel>

                            {inputList.map((x, i) => {
                                return (
                                    <FloatingLabel
                                        controlId={'ingredients' + i}
                                        label="Ingredient"
                                        className="mb-3"
                                        key={i}
                                    >
                                        <Form.Control type="text" placeholder="Enter food Ingredient" onChange={e => handleInputChange(e, i)} className='mb-3 ' />
                                        <div>
                                            {inputList.length !== 1 && <Button size='sm' variant='danger' className='ml-3 mr-3' onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                            {inputList.length - 1 === i && <Button className='ml-3 mr-3' size='sm' variant='primary' onClick={handleAddClick}>Add</Button>}
                                        </div>
                                    </FloatingLabel>
                                )
                            })}
                            <Button className='ml-3 mr-3' size='md' variant='success'>Submit</Button>
                        </Form>


                    </div>
                </div>
            </div>

            <div className="split right">
                <div className="centered">
                    <div className='topRight'>
                        <h1 style={{ color: 'white' }}>User list</h1>
                    </div>
                    <div className='daTable'>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pengguna && pengguna.length && pengguna.map(
                                    (item, index) => {
                                        return (
                                            <tr key={index}><td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                                <td><Button size="sm" variant="primary">Edit</Button></td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </Table>
                    </div>
                    <div className='bottomRight'>
                        <h1 style={{ color: 'white' }}>Food list</h1>
                    </div>
                    <div className='daTable'>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Food Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {makan && makan.length && makan.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <ButtonGroup aria-label="Action">
                                                <Button size="sm" variant="primary" onClick={handleEditFood}>Edit</Button>
                                                <Button size="sm" variant="danger" >Delete</Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            <Modal show={showA} onHide={handleCloseA} bg='dark' text='light' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Edit food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditFood}>
                        <FloatingLabel
                            controlId="floatingName"
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Input name" value={''} onChange={(e) => setFoodName(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Email" className='mb-3'>
                            <Form.Control type="text" placeholder="Input email" value={''} onChange={(e) => setFoodDesc(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingUrl" label="Profile Url" className='mb-3'>
                            <Form.Control type="url" placeholder="Password" value={''} onChange={(e) => setFoodIMG(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPhoneNumber" label="Phone number" className='mb-3'>
                            <Form.Control type="number" placeholder="Number" value={''} onChange={(e) => setFoodIngre(e.target.value)} />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseA}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditFood}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}