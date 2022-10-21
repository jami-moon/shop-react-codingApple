import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

let Btn = styled.button`
	background: ${(props) => props.bg};
	color: ${(props) => (props.bg == "blue" ? "white" : "black")};
	padding: 10px;
`;

let NewBtn = styled(Btn)`
	background: ${(props) => props.bg || "red"};
`;

const Detail = (props) => {
	let [num, setNum] = useState("");
	let [Alert, setAlert] = useState(true);

	useEffect(() => {
		if (isNaN(num) === true) {
			alert(`숫자만 입력하시요`);
		}
	}, [num]);

	useEffect(() => {
		let timer = setTimeout(() => {
			setAlert(false);
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	let { urlParam } = useParams();
	let product = props.shoes.find((el) => {
		return el.id == urlParam;
	});

	return (
		<>
			{Alert === true ? (
				<div className="alert alert-warning">2초 후 사라지는 박스</div>
			) : null}
			<div className="container">
				<Btn bg="blue">props로 bg 색상이 전달되는 버튼</Btn>
				<NewBtn bg="yellow">
					bg props가 있으면 그것을 따르고, 없으면 빨간 바탕인 버튼
				</NewBtn>
				<div className="row">
					<div className="col-md-6">
						<img
							src={
								"https://codingapple1.github.io/shop/shoes" +
								(product.id + 1) +
								".jpg"
							}
							width="100%"
							alt="상품이미지"
						/>
					</div>
					<div className="col-md-6">
						<p>숫자만 입력하는 input</p>
						<input
							onChange={(e) => {
								setNum(e.target.value);
							}}></input>
						<h4 className="pt-5">{product.title}</h4>
						<p>{product.content}</p>
						<p>{product.price}</p>
						<button className="btn btn-danger">주문하기</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Detail;
