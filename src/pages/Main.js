import Card from "../components/card";
import { Row, Container } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

const Main = (props) => {
	let [btnCount, setBtnCount] = useState(0);

	return (
		<>
			<div className="main-bg"></div>
			{/* card component */}
			<Container>
				<Row>
					{props.shoes.map((a, i) => {
						return <Card shoes={props.shoes[i]}></Card>;
					})}
				</Row>``
			</Container>
			<button
				onClick={() => {
					btnCount += 1;
					setBtnCount(btnCount);

					if (btnCount === 1) {
						axios
							.get("https://codingapple1.github.io/shop/data2.json")
							.then((result) => {
								let copy = [...props.shoes, ...result.data];
								props.setShoes(copy);
							})
							.catch(() => {
								console.log(`실패함`);
							});
					} else if (btnCount === 2) {
						axios
							.get("https://codingapple1.github.io/shop/data3.json")
							.then((result) => {
								let copy = [...props.shoes, ...result.data];
								props.setShoes(copy);
							})
							.catch(() => {
								console.log(`실패함`);
							});
					} if (btnCount >= 3) {
						alert(`더 이상 데이터 없음`)
						console.log(btnCount);
					}
				}}>
				더보기
			</button>
		</>
	);
};
export default Main;
