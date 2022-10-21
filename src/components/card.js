import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
	const navigate = useNavigate();
	const detailPagePath = `/detail/${props.shoes.id}`;

	return (
		<Col sm>
			<img
				src={"https://codingapple1.github.io/shop/shoes" + (props.shoes.id + 1) + ".jpg"}
				width="100%"
				alt="상품사진"
				onClick={() => {
					navigate(detailPagePath);
				}}
			/>
			<h4>{props.shoes.title}</h4>
			<h4>{props.shoes.price}</h4>
			<p>{props.shoes.content}</p>
		</Col>
	);
};

export default Card;
