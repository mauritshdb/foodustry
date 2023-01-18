import "../css/AdminPanel.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import React, { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import getData from "../api_folder/ApiFood";
import getAllUser from "../api_folder/ApiGetAllUser";
import createFood from "../api_folder/ApiCreateFood";
import * as Yup from "yup";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import FormF from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function AdminPanel() {
    const [makan, setMakan] = useState([]);
    const [idMakan, setIdMakan] = useState([]);
    const [pengguna, setPengguna] = useState([]);

    const [foodName, setFoodName] = useState();
    const [foodDesc, setFoodDesc] = useState();
    const [foodIMG, setFoodIMG] = useState();
    const [foodIngre, setFoodIngre] = useState([]);

    const [roleId, setRoleId] = useState();
    const [role, setRole] = useState();
    const [roleName, setRoleName] = useState();
    const [roleImg, setRoleImg] = useState();


    const [showA, setShowA] = useState(false);
    const handleCloseA = () => setShowA(false);
    const handleShowA = (nama, description, imageUrl, ingredients) => {
        setShowA(true);
        setFoodName(nama);
        setFoodDesc(description);
        setFoodIMG(imageUrl);
        setFoodIngre(ingredients);
    };

    const [showB, setShowB] = useState(false);
    const handleCloseB = () => setShowB(false);
    const handleShowB = () => setShowB(true);

    const [showC, setShowC] = useState(false);
    const handleCloseC = () => setShowC(false);
    const handleShowC = (roleId, role, name, roleImg) => {
        setShowC(roleId)
        setRoleId(roleId)
        setRoleName(name)
        setRoleImg(roleImg)
        setRole(role)
        localStorage.setItem("getUserRoleId", roleId);
    }

    const isLogin = Boolean(localStorage.getItem("token") || false);

    const InputText = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div>
                <FloatingLabel
                    controlId="floating"
                    htmlFor={props.id || props.name}
                    label={label}
                    className='mb-3 mt-3'
                >
                    <FormF.Control {...field} {...props} />
                </FloatingLabel>
                {/* <input {...field} {...props} />
                <label htmlFor={props.id || props.name}>{label}</label> */}
                {meta.touched && meta.error ? (
                    <div style={{ color: 'red' }}>{label + ' ' + meta.error}</div>
                ) : null}
            </div>
        )
    };

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

    const updateFood = async (foodId) => {
        if (isLogin) {
            return Axios({
                method: "post",
                url: `${process.env.REACT_APP_BASEURL}/api/v1/update-food/${foodId}`,
                headers: {
                    apiKey: `${process.env.REACT_APP_APIKEY}`,
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: {
                    name: foodName,
                    description: foodDesc,
                    imageUrl: foodIMG,
                    ingredients: foodIngre
                }
            });
        } else {
            return Axios({
                method: "post",
                url: `${process.env.REACT_APP_BASEURL}/api/v1/update-food/${foodId}`,
                headers: {
                    apiKey: `${process.env.REACT_APP_APIKEY}`,
                },
            });
        }
    };

    const updateUserRole = (userId) => {
        return Axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASEURL}/api/v1/update-user-role/${userId}`,
            headers: {
                apiKey: `${process.env.REACT_APP_APIKEY}`,
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: { role: role }
        })
    }

    const getAllFood = () => {
        getData().then((res) => {
            setMakan(res.data.data);
        });
    };

    const handleEditFood = (id, foodName, foodDesc, foodIMG, foodIngre) => {
        handleShowA(id);
        setFoodName(foodName)
        setFoodDesc(foodDesc)
        setFoodIMG(foodIMG)
        setFoodIngre([foodIngre])
        localStorage.setItem('getFoodId', id)
    };

    const handleSaveEditFood = (id) => {

        updateFood(id).then(() => {
            alert('Food updated!')
        })
    };

    const getEveryUser = () => {
        getAllUser().then((res) => {
            setPengguna(res.data.data);
        });
    };

    const handlePostFood = (neme, description, foodUrl, ingredients) => {
        createFood(neme, description, foodUrl, ingredients).then(() => {
            getAllFood();
            handleCloseB();
            alert('Food created!')
        })
    };

    const handleChangeRole = (userId) => {
        updateUserRole(userId);
        getEveryUser();
        handleCloseC();
    }

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
                <div className="daSquare">
                    {pengguna && pengguna.length && pengguna.map((item, index) => {
                        return (
                            <div className="userList" key={index}>
                                <img src={item.profilePictureUrl} alt="Avatar" className="avatar" style={{ objectFit: 'cover', width: '50px' }} />
                                <div className="clsLabel">
                                    <h4>{item.name}</h4>
                                    <h6 style={{ color: 'grey' }}>{item.role}</h6>
                                </div>
                                <div className="clsBtn">
                                    <Button variant="primary" onClick={() => handleShowC(item.id, item.role, item.name, item.profilePictureUrl)}>Edit role</Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* SEPERATOR */}
                <hr />

                <div className="bottomRight">
                    <h1 style={{ color: "white" }}>
                        Food list{" "}
                        <Button size="md" variant="success" onClick={handleShowB}>
                            Add Food
                        </Button>
                    </h1>
                </div>
                <div className="daSquare">

                    {makan && makan.map((m, i) => (
                        <Fragment key={i}>
                            <Formik initialValues={{
                                neme: m.name,
                                description: m.description,
                                imageUrl: m.imageUrl,
                                ingredients: [''],
                            }}
                                validationSchema={Yup.object({
                                    neme: Yup.string().required('Required'),
                                    description: Yup.string().required('Required'),
                                    imageUrl: Yup.string().required('Required'),
                                    ingredients: Yup.string().required('Required'),
                                })}

                                onSubmit={(values, actions) => {
                                    setTimeout(() => {

                                        alert(JSON.stringify(values, null, 2));
                                        actions.setSubmitting(true);
                                    }, 1000);
                                    handleEditFood(values.neme, values.description, values.imageUrl, values.ingredients)
                                }}
                            >
                                <Form>
                                    <div className="userList" key={i}>
                                        <img src={m.imageUrl} alt="Avatar" className="avatar" style={{ objectFit: 'cover', width: '50px' }} />
                                        <div className="clsLabel">
                                            <h4>{m.name}</h4>
                                            <h6 style={{ color: '#dedede' }}>{m.description}</h6>
                                            <h6 style={{ color: 'grey' }}>{' ' + m.ingredients}</h6>
                                        </div>
                                        <div className="clsBtn">
                                            <Button variant="primary" onClick={handleEditFood}>Edit food</Button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </Fragment>
                    ))}

                </div>
            </div>

            {/* MODAL EDIT FOOD */}
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

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseA}>
                        Close
                    </Button>
                </Modal.Footer>


            </Modal>

            {/* MODAL CREATE FOOD */}
            <Modal
                show={showB}
                onHide={handleCloseB}
                bg="dark"
                text="light"
                backdrop="static"
            >
                <Modal.Body>
                    <h1 style={{ color: "black" }}>Create food</h1>
                    <Formik initialValues={{
                        neme: '',
                        description: '',
                        imageUrl: '',
                        ingredients: [''],
                    }}
                        validationSchema={Yup.object({
                            neme: Yup.string().required('Required'),
                            description: Yup.string().required('Required'),
                            imageUrl: Yup.string().required('Required'),
                        })}

                        onSubmit={(values, actions) => {
                            setTimeout(() => {

                                alert(JSON.stringify(values, null, 2));
                                actions.setSubmitting(true);
                            }, 1000);
                            handlePostFood(values.neme, values.description, values.imageUrl, values.ingredients)
                        }}
                    >
                        <Form>
                            <InputText
                                label="Food name"
                                name="neme"
                                type='text'
                                placeholder='Food name'
                            />
                            <InputText
                                label="Description"
                                name="description"
                                type='text'
                                placeholder='Food description'
                            />

                            <InputText
                                label="Food Image URL"
                                name="imageUrl"
                                type='text'
                                placeholder='Food Image URL'
                            />

                            <FieldArray name="ingredients">
                                {(fieldArrayProps) => {
                                    const { push, remove, form } = fieldArrayProps;
                                    const { values } = form;
                                    const { ingredients } = values;
                                    return (
                                        <div>
                                            {ingredients.map((ingredient, index) => (
                                                <div
                                                    key={index}
                                                >
                                                    <Field
                                                        type='text'
                                                        name={`ingredients[${index}]`}
                                                        label={`Ingredient ${index + 1}`}
                                                        className='mb-3 mt-3'
                                                        placeholder={`Ingredient ${index + 1}`}
                                                    >
                                                    </Field>
                                                    {index > 0 && (
                                                        <Button type="button" variant="danger" className="mt-1 mb-1" onClick={() => remove(index)}>
                                                            Remove
                                                        </Button>
                                                    )}{' '}
                                                    <Button type="button" variant="success" className="mt-1 mb-1" onClick={() => push('')}>
                                                        Add
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }}
                            </FieldArray>
                            <Button type="submit" variant="success">Submit</Button>
                        </Form>
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseB}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* MODAL CHANGE ROLE */}
            <Modal
                show={showC}
                onHide={handleCloseC}
                bg="dark"
                text="light"
                backdrop="static"
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 style={{ color: "black" }}>Change role</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="userShow">
                        <img src={roleImg} alt="Avatar" className="avatarPop" style={{ objectFit: 'cover', width: '50px' }} />
                        <div className="clsLabelNem">
                            <h4>{roleName + ' ('+role+')'}</h4>
                            <FloatingLabel controlId="floatingSelect" label={role} onChange={(e) => setRole(e.target.value)}>
                                <FormF.Select aria-label="Floating label select example">
                                    <option>Choose</option>
                                    <option value="user">User</option>
                                    <option value="general">General</option>
                                    <option value="admin">Admin</option>
                                </FormF.Select>
                            </FloatingLabel>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseC}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleChangeRole(localStorage.getItem('getUserRoleId'))}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
