import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Card(props) {
  const { shoes } = props;
  const navigate = useNavigate();
  const detailPagePath = `/detail/${shoes.id}`;

  return (
    <Col sm>
      <img
        src={`https://codingapple1.github.io/shop/shoes${shoes.id + 1}.jpg`}q
        width="100%"
        alt="상품사진"
        onClick={() => {
          navigate(detailPagePath);
        }}
      />
      <h4>{shoes.title}</h4>
      <h4>{shoes.price}</h4>
      <p>{shoes.content}</p>
    </Col>
  );
}

export default Card;
