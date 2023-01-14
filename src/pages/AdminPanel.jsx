import "../css/AdminPanel.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import getData from "../api_folder/ApiFood";
import getAllUser from "../api_folder/ApiGetAllUser";
import createFood from "../api_folder/ApiCreateFood";

export default function AdminPanel() {
    const [makan, setMakan] = useState([]);
    const [idMakan, setIdMakan] = useState([]);
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
    };

    const [showB, setShowB] = useState(false);
    const handleCloseB = () => setShowB(false);
    const handleShowB = () => setShowB(true);

    const [showC, setShowC] = useState(false);
    const handleCloseC = () => setShowC(false);
    const handleShowC = () => setShowC(true);

    const [ingr, setIngr] = useState({
        ingredients: [''],
    });

    const isLogin = Boolean(localStorage.getItem("token") || false);

    const [inputList, setInputList] = useState([{ ingredients: "" }]);

    const getFoodId = async (foodId) => {
        if (isLogin) {
          const res = await Axios({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/api/v1/foods/${foodId}`,
            headers: {
              apiKey: `${process.env.REACT_APP_APIKEY}`,
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setIdMakan(res.data.data);
        } else {
          const res = await Axios({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/api/v1/foods/${foodId}`,
            headers: {
              apiKey: `${process.env.REACT_APP_APIKEY}`,
            },
          });
          setIdMakan(res.data.data);
        }
    };

    const getAllFood = () => {
        getData().then((res) => {
            setMakan(res.data.data);
            console.log(makan);
        });
    };
    
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { ingredients: "" }]);
    };


    const handleEditFood = (id, foodName, foodDesc, foodIMG, foodIngre) => {
        handleShowA(id);
        setFoodName(foodName)
        setFoodDesc(foodDesc)
        setFoodIMG(foodIMG)
        setFoodIngre(foodIngre)
    };

    const handleSaveEditFood = () => {
        // for submot edit food
    };

    const getEveryUser = () => {
        getAllUser().then((res) => {
            setPengguna(res.data.data);
            console.log(pengguna);
        });
    };

    const handlePostFood = (e) => {
        // handle create food
        e.preventDefault();


     };

    useEffect(() => {
        getAllFood();
        getEveryUser();
    }, []);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
                <h1 style={{ color: "white" }}>Work in Progress</h1>
            </div>
            <div className="centered">
                <div className="topRight">
                    <h1 style={{ color: "white" }}>User list</h1>
                </div>
                <div className="daTable">
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
                            {pengguna &&
                                pengguna.length &&
                                pengguna.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>
                                                <Button size="sm" variant="primary" onClick={handleShowC}>
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
                <div className="bottomRight">
                    <h1 style={{ color: "white" }}>
                        Food list{" "}
                        <Button size="md" variant="success" onClick={handleShowB}>
                            Add Food
                        </Button>
                    </h1>
                </div>
                <div className="daTable">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Food Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {makan &&
                                makan.length &&
                                makan.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <React.Fragment>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <ButtonGroup aria-label="Action">
                                                        <Button
                                                            size="sm"
                                                            variant="primary"
                                                            onClick={() => handleEditFood(item.id, item.name, item.description, item.imageUrl, item.ingredients)}>Edit</Button>
                                                        <Button size="sm" variant="danger">Delete</Button>
                                                    </ButtonGroup>
                                                </td>
                                            </React.Fragment>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
            </div>

            <Modal
                show={showA}
                onHide={handleCloseA}
                bg="dark"
                text="light"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSaveEditFood}>
                        <FloatingLabel
                            controlId=""
                            label="Food name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={foodName}
                                onChange={(e) => setFoodName(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId=""
                            label="Food Description"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={foodDesc}
                                onChange={(e) => setFoodDesc(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId=""
                            label="Image URL"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={foodIMG}
                                onChange={(e) => setFoodIMG(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId=""
                            label="Ingredients"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={foodIngre}
                                onChange={(e) => setFoodIngre(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseA}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveEditFood}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showB}
                onHide={handleCloseB}
                bg="dark"
                text="light"
                backdrop="static"
            >
                <Modal.Body>
                    <h1 style={{ color: "black" }}>Create food</h1>

                    <Form onSubmit={handlePostFood}>
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
                            controlId="floatingimgurl"
                            label="Image Url"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Enter image url" />
                        </FloatingLabel>

                        {inputList.map((x, i) => {
                            return (
                                <FloatingLabel
                                    controlId={"ingredients" + i}
                                    label="Ingredient"
                                    className="mb-3"
                                    key={i}
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter food Ingredient"
                                        onChange={(e) => handleInputChange(e, i)}
                                        className="mb-3"
                                    />
                                    <div>
                                        {inputList.length !== 1 && (
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                className="ml-3 mr-3"
                                                onClick={() => handleRemoveClick(i)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                        {inputList.length - 1 === i && (
                                            <Button
                                                className="ml-3 mr-3"
                                                size="sm"
                                                variant="primary"
                                                onClick={handleAddClick}
                                            >
                                                Add
                                            </Button>
                                        )}
                                    </div>
                                </FloatingLabel>
                            );
                        })}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseB}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handlePostFood}>
                        Submit food
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showC}
                onHide={handleCloseC}
                bg="dark"
                text="light"
                backdrop="static"
            >
                <Modal.Body>
                    <h1 style={{ color: "black" }}>Change role</h1>         
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseC}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseC}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
