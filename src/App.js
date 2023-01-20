import "./css/App.css";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import { IconContext } from "react-icons/";
import getData from "./api_folder/ApiFood";
import getUser from "./api_folder/ApiGetUser";
import updateUser from "./api_folder/ApiUpdateUser";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function App() {
  const [food, setFood] = useState([]);
  const [foodIds, setFoodIds] = useState([]);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [img, setImg] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const [role, setRole] = useState();

  const [rating, setRating] = useState([]);

  const [daRating, setDaRating] = useState();
  const [daReview, setDaReview] = useState();

  const [showA, setShowA] = useState(false);
  const handleCloseA = () => setShowA(false);
  const handleShowA = (name, email, img, phoneNumber) => {
    setShowA(name);
    setName(name);
    setEmail(email);
    setImg(img);
    setPhoneNumber(phoneNumber);
  };
  const [showB, setShowB] = useState(false);
  const handleCloseB = () => setShowB(false);
  const handleShowB = () => setShowB(true);
  const [fullscreen, setFullscreen] = useState(true);

  const isLogin = Boolean(localStorage.getItem("token") || false);
  const isAdmin = Boolean(localStorage.getItem("role") === "admin");

  // api get all foods
  const GetFood = () => {
    getData().then((res) => {
      setFood(res.data.data);
    });
  };
  // api get food by id
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
      setFoodIds(res.data.data);
    } else {
      const res = await Axios({
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/foods/${foodId}`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
      });
      setFoodIds(res.data.data);
    }
  };
  // api get food rating by id
  const getRatings = async (foodId) => {
    const res = await Axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/food-rating/${foodId}`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setRating(res.data.data);
  };
  // create food rating by id
  const postRating = (foodId) => {
    if (isLogin) {
      return Axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/rate-food/${foodId}`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          rating: parseInt(daRating),
          review: daReview,
        },
      });
    } else {
      alert("Login first.");
      window.location.assign("/login");
    }
  };
  // api like and unlike
  const handleLike = (id, isLike) => {
    if (isLogin) {
      if (isLike) {
        return Axios({
          method: "post",
          url: `${process.env.REACT_APP_BASEURL}/api/v1/unlike`,
          headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: { foodId: id },
        }).then(() => {
          GetFood();
        });
      } else {
        return Axios({
          method: "post",
          url: `${process.env.REACT_APP_BASEURL}/api/v1/like`,
          headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: { foodId: id },
        }).then(() => {
          GetFood();
        });
      }
    } else {
      alert("login first");
      window.location.assign("/login");
    }
  };

  const handlePostReview = (foodId) => {
    handleCloseB();
    postRating(foodId);
    GetFood();
  };

  const handleGetRating = (foodId) => {
    setFullscreen(true);
    handleShowB();
    getRatings(foodId);
    getFoodId(foodId);
    localStorage.setItem("getFoodId", foodId);
  };

  const handleDots = () => {
    updateUser(name, email, img, phoneNumber).then(() => {
      handleCloseA();
      setName("");
      setEmail("");
      setImg("");
      setPhoneNumber("");
      getUserLogin();
    });
  };

  const getUserLogin = () => {
    if (isLogin) {
      getUser().then(function (res) {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setImg(res.data.user.profilePictureUrl);
        setPhoneNumber(res.data.user.phoneNumber);
        setRole(res.data.user.role);
      });
    }
  };

  useEffect(() => {
    GetFood();
    getUserLogin();
  }, []);

  return (
    <>
      <div className="zxc">
        <div className="c1">
          {isAdmin ? (
            <Link to="/admin">
              <div className="adminButton">
                <div className="teksAdmin">Admin Panel</div>
                <IconContext.Provider value={{ color: "white" }}>
                  <MdIcons.MdAdminPanelSettings />
                </IconContext.Provider>
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          {food.map((item, index) => {
            return (
              <Card key={index} text="light" bg="dark" border="secondary" onClick={() => handleGetRating(item.id)}>
                <Card.Header>
                  <div className="ccTitle">
                    <Card.Title>{item.name.toUpperCase()}</Card.Title>
                  </div>
                </Card.Header>
                <Card.Img
                  variant="mid"
                  src={item.imageUrl}
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    position: "relative",
                  }}
                />
                <Badge
                  pill
                  bg="light"
                  text="dark"
                  className="pillRating"
                  onClick={() => handleGetRating(item.id)}
                >
                  <IconContext.Provider value={{ color: "orange" }}>
                    <AiIcons.AiFillStar />
                    {item.rating}
                  </IconContext.Provider>
                </Badge>{" "}
                <Badge
                  pill
                  bg="light"
                  text="dark"
                  className="pillLikes"
                  onClick={() => handleLike(item.id, item.isLike)}
                >
                  <IconContext.Provider
                    value={{ color: `${item.isLike ? "red" : "grey"}` }}
                  >
                    <AiIcons.AiFillHeart />
                    {item.totalLikes}
                  </IconContext.Provider>
                </Badge>{" "}
                <Card.Body>
                  <Card.Title>
                    {item.name}
                    {item.isLike}
                  </Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    Ingredients
                  </Card.Subtitle>
                  <div className="wholePill">
                    {food.map((item0, i) => {
                      return (
                        <div key={i} className="pillBadge">
                          <div className="cPill">
                            <Badge pill bg="secondary" text="dark">
                              {item.ingredients[i]}
                            </Badge>{" "}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>

      {isLogin ? (
        <div className="kartu">
          <img
            src={img}
            alt="Profile Picture"
            style={{ width: "100%", objectFit: "cover" }}
          />

          <div
            className="titik"
            onClick={() => handleShowA(name, email, img, phoneNumber)}
          >
            <IconContext.Provider value={{ color: "black" }}>
              <HiIcons.HiOutlineDotsHorizontal />
            </IconContext.Provider>
          </div>

          <div className="kontainer">
            <h4 className="userr">{name}</h4>
            <p className="userr">{role}</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div></div>

      <Modal
        show={showA}
        onHide={handleCloseA}
        bg="dark"
        text="light"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDots}>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Input name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Input email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingUrl"
              label="Profile Url"
              className="mb-3"
            >
              <Form.Control
                type="url"
                placeholder="Password"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPhoneNumber"
              label="Phone number"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseA}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDots}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showB}
        onHide={handleCloseB}
        fullscreen={fullscreen}
        bg="dark"
        text="light"
      >
        <Modal.Body>
          <div className="split kiri">
            <div className="kartu2">
              <img
                src={foodIds.imageUrl}
                alt="John"
                style={{ width: "100%" }}
              />
              <h1>{foodIds.name}</h1>
              <p className="kartDesc">{foodIds.description}</p>
              {/* <li> */}
                <p>Ingredients</p>
                {foodIds.ingredients &&
                  foodIds.ingredients.map((item, i) => {
                    return <Badge key={i} pill bg="secondary">{item}</Badge>;
                  })}
              {/* </li> */}
            </div>
          </div>
          <div className="split kanan">
            <h1>Create review</h1>
            <FloatingLabel
              type="number"
              controlId="floatingSelect"
              label="Rating"
              onChange={(e) => setDaRating(e.target.value)}
            >
              <Form.Select aria-label="Floating label select example" disabled={!isLogin}>
                <option>Choose rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingReview"
              label="Review"
              className="mt-3 mb-3"
              onChange={(e) => setDaReview(e.target.value)}
            >
              <Form.Control type="text" placeholder="Review" disabled={!isLogin}/>
            </FloatingLabel>
            <Button
              variant="success"
              onClick={() => handlePostReview(localStorage.getItem("getFoodId"))}
              className="mb-3"
              disabled={!isLogin}
            >
              Post review
            </Button>
            <h1>Review</h1>
            <div className="dalemKanan">
              {rating &&
                rating.map((item, index) => {
                  return (
                    <div className="container" key={index}>
                      <img
                        src={item.user.profilePictureUrl}
                        alt="Avatar"
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                        }}
                      />
                      <p>
                        {item.user.name + " "}
                        <IconContext.Provider value={{ color: "orange" }}>
                          <AiIcons.AiFillStar />
                        </IconContext.Provider>
                        {item.rating}
                      </p>
                      <p>{item.review}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseB}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}