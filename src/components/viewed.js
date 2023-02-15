import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Viewed(props) {
  const navigate = useNavigate();
  const viewedArr = JSON.parse(localStorage.getItem('viewed')) || [];

  return (
    <Row>
      <h2>최근 본 상품</h2>
      {viewedArr.map((a, i) => {
        return (
          <Col sm key={viewedArr[i]}>
            <img
              src={`https://codingapple1.github.io/shop/shoes${viewedArr[i] + 1}.jpg`}
              width="100%"
              alt="상품사진"
              onClick={() => {
                navigate(`/detail/${viewedArr[i]}`);
              }}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default Viewed;
