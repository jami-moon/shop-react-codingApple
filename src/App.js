import { useState } from "react";
import { Col, Row, Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

import Detail from "./pages/Detail";
import Main from "./pages/Main";
import Event from "./pages/Event";

function App() {
	let [shoes, setShoes] = useState(data);
	let navigate = useNavigate();

	return (
		<div className="App">
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">SHOP</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link
							onClick={() => {
								navigate("/event");
							}}>
							Event
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Routes>
				<Route path="/" element={<Main shoes={shoes} setShoes={setShoes}></Main>} />

				<Route path="/detail/:urlParam" element={<Detail shoes={shoes} />} />

				<Route path="/event" element={<Event />}>
					<Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
					<Route path="two" element={<div>생일 기념 쿠폰 받기 </div>} />
				</Route>

				<Route path="*" element={<div>없는 페이지</div>} />
			</Routes>
		</div>
	);
}

export default App;
