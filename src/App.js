import { createContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import data from './data';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Detail from './routes/Detail';
import Main from './routes/Main';
import Event from './routes/Event';
import Cart from './routes/Cart';

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  const [stock] = useState([10, 11, 12]);
  let navigate = useNavigate();

  useEffect(() => {
    const isArrayExist = localStorage.getItem('viewed') || false;

    if (!isArrayExist) {
      localStorage.setItem('viewed', JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/event');
              }}
            >
              Event
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/cart');
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Main shoes={shoes} setShoes={setShoes}></Main>} />

        <Route
          path="/detail/:urlParam"
          element={
            <Context1.Provider value={{ stock, shoes }}>
              <Detail />
            </Context1.Provider>
          }
        />

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일 기념 쿠폰 받기 </div>} />
        </Route>

        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>
    </div>
  );
}

export default App;
