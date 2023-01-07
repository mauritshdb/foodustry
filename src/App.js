import './App.css';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Axios from 'axios';

function App() {
  const [food, setFood] = useState([]);

  useEffect(() => {
    const getData = () => {
      Axios({
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/v1/foods`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        }
      })
        .then(function (response) {
          setFood(response.data.data);
        });
    }
    getData();
  }, [])
  return (
    <>
      <div className='zxc'>
        <div className='c1'>
          {food.map((item, index) => {
            return (
              <Card key={index}>
                <Card.Header>
                  <div className='ccTitle'>
                    <Card.Title>{item.name.toUpperCase()}</Card.Title>
                  </div>
                </Card.Header>
                <Card.Img variant='mid' src={item.imageUrl} style={{ height: '300px', objectFit: 'cover', position: 'relative' }} />
                <div className='oPill'>
                  <Badge pill bg="light" text='dark'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="orange" class="bi bi-star-fill" viewBox="0 0 16 19">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    {item.rating}
                  </Badge>{' '}
                </div>
                <div className='oPill2'>
                  <Badge pill bg="light" text='dark'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 19">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                    {item.totalLikes}
                  </Badge>{' '}
                </div>
                <Card.Body>
                  <Card.Title>{item.name}

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
                            <Badge pill bg="light" text='secondary'>
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
    </>
  );
}

export default App;
