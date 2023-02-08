import Card from '../components/card';
import { Row, Container } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

function Main(props) {
  let [btnCount, setBtnCount] = useState(0);
  const { shoes } = props;

  return (
    <>
      <div className="main-bg" />
      <Container>
        <Row>
          {shoes.map((a, i) => {
            return <Card key={shoes[i].id} shoes={shoes[i]}></Card>;
          })}
        </Row>
      </Container>
      <button
        onClick={() => {
          btnCount += 1;
          setBtnCount(btnCount);

          if (btnCount === 1) {
            console.log('로딩중메시지');
            axios
              .get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => {
                let copy = [...shoes, ...result.data];
                props.setShoes(copy);
                console.log('로딩중메시지 숨기기.');
              })
              .catch(() => {
                console.log('로딩중 메시지 숨기기.');
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
    </>
  );
}
export default Main;
