import './css/App.css';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { useEffect, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from "react-icons/hi";
import { IconContext } from "react-icons/";
import getData from './api_folder/ApiFood';
import getUser from './api_folder/ApiGetUser';
import updateUser from './api_folder/ApiUpdateUser';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function App() {
  const [food, setFood] = useState([]);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [img, setImg] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const [role, setRole] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (name, email, img, phoneNumber) => {
    setShow(name)
    setName(name)
    setEmail(email)
    setImg(img)
    setPhoneNumber(phoneNumber)
  }

  const isLogin = Boolean(localStorage.getItem("token") || false)

  const GetFood = () => {
    getData().then(function (res) {
      setFood(res.data.data)
    });
  }

  const handleLike = (id, isLike) => {
    if (isLogin) {
      if (isLike) {
        return Axios({
          method: 'post',
          url: `${process.env.REACT_APP_BASEURL}/api/v1/unlike`,
          headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: { foodId: id },
        }).then(res => {
          GetFood();
        })
      } else {
        return Axios({
          method: 'post',
          url: `${process.env.REACT_APP_BASEURL}/api/v1/like`,
          headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: { foodId: id },
        }).then(res => {
          GetFood();
        })
      }
    } else {
      alert('login first');
      window.location.assign('/login');
    }
  }

  const handleDots = () => {
    updateUser(name, email, img, phoneNumber).then((res) => {
      handleClose();
      setName('')
      setEmail('')
      setImg('')
      setPhoneNumber('')
      getUserLogin();
    })
  }

  const getUserLogin = () => {
    if (isLogin) {
      getUser().then(function (res) {
        setName(res.data.user.name)
        setEmail(res.data.user.email)
        setImg(res.data.user.profilePictureUrl)
        setPhoneNumber(res.data.user.phoneNumber)
        setRole(res.data.user.role)
      })
    }
  }

  useEffect(() => {
    GetFood();
    getUserLogin();
  }, [])

  return (
    <>
      <div className='zxc'>
        <div className='c1'>
          {food.map((item, index) => {
            return (
              <Card key={index} text='light' bg='dark' border='secondary'>
                <Card.Header>
                  <div className='ccTitle'>
                    <Card.Title>{item.name.toUpperCase()}</Card.Title>
                  </div>
                </Card.Header>
                <Card.Img variant='mid' src={item.imageUrl} style={{ height: '300px', objectFit: 'cover', position: 'relative' }} />

                <Badge pill bg="light" text='dark' className='pillRating'>
                  <IconContext.Provider value={{ color: 'orange' }}>
                    <AiIcons.AiFillStar />
                    {item.rating}
                  </IconContext.Provider>
                </Badge>{' '}
                <Badge pill bg="light" text='dark' className='pillLikes' onClick={() => handleLike(item.id, item.isLike)}>
                  <IconContext.Provider value={{ color: `${item.isLike ? "red" : "grey"}` }}>
                    <AiIcons.AiFillHeart />
                    {item.totalLikes}
                  </IconContext.Provider>
                </Badge>{' '}

                <Card.Body>
                  <Card.Title>{item.name}{item.isLike}
                  </Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    Ingredients
                  </Card.Subtitle>
                  <div className='wholePill'>
                    {food.map((item0, i) => {
                      return (
                        <div key={i} className="pillBadge">
                          <div className='cPill'>
                            <Badge pill bg="secondary" text='dark'>
                              {item.ingredients[i]}
                            </Badge>{' '}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>

      {isLogin ?
        <div className='kartu'>
          <img src={img} alt='Profile Picture' style={{ width: '100%' }} />

          <div className='titik' onClick={() => handleShow(name, email, img, phoneNumber)}>
            <IconContext.Provider value={{ color: 'black' }} >
              <HiIcons.HiOutlineDotsHorizontal />
            </IconContext.Provider>
          </div>

          <div className='kontainer'>
            <h4 className='userr'>{name}</h4>
            <p className='userr'>{role}</p>
          </div>
        </div>
        : <div></div>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDots}>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Input name" value={name} onChange={(e) => setName(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingEmail" label="Email" className='mb-3'>
              <Form.Control type="text" placeholder="Input email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingUrl" label="Profile Url" className='mb-3'>
              <Form.Control type="url" placeholder="Password" value={img} onChange={(e) => setImg(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPhoneNumber" label="Phone number" className='mb-3'>
              <Form.Control type="number" placeholder="Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDots}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}