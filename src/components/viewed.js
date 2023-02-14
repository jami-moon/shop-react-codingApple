import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Viewed(props) {
  const navigate = useNavigate();
  const { viewItem } = props;
  const detailPagePath = `/detail/${viewItem}`;

  return (
    <Col sm>
      <img
        src={`https://codingapple1.github.io/shop/shoes${viewItem + 1}.jpg`}
        width="100%"
        alt="상품사진"
        onClick={() => {
          navigate(detailPagePath);
        }}
      />
    </Col>
  );
}

export default Viewed;
