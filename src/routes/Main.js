import { useState, useEffect } from 'react';
import Card from '../components/card';
import Viewed from '../components/viewed';
import { Row, Container } from 'react-bootstrap';
import axios from 'axios';

function Main(props) {
  const { shoes } = props;
  let [btnCount, setBtnCount] = useState(0);

  return (
    <>
      <div className="main-bg" />
      <Container>
        <Row>
          {shoes.map((a, i) => {
            return <Card key={shoes[i].id} shoes={shoes[i]}></Card>;
          })}
        </Row>
        <button
          onClick={() => {
            btnCount += 1;
            setBtnCount(btnCount);

            if (btnCount === 1) {
              axios
                .get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  let copy = [...shoes, ...result.data];
                  props.setShoes(copy);
                })
                .catch(() => {
                  console.log(`실패함`);
                });
            } else if (btnCount === 2) {
              axios
                .get('https://codingapple1.github.io/shop/data3.json')
                .then((result) => {
                  let copy = [...shoes, ...result.data];
                  props.setShoes(copy);
                })
                .catch(() => {
                  console.log(`실패함`);
                });
            }
            if (btnCount >= 3) {
              alert(`더 이상 데이터 없음`);
            }
          }}
        >
          더보기
        </button>
      </Container>
      <Container>
        <Viewed></Viewed>
      </Container>
    </>
  );
}
export default Main;
