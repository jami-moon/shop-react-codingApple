import { useState, useEffect } from 'react';
import Card from '../components/card';
import Viewed from '../components/viewed';
import { Row, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setDefault, setViewed } from '../store';

function Main(props) {
  const state = useSelector((state) => state);
  const { shoes } = props;
  let [btnCount, setBtnCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const isArrayExist = localStorage.getItem('viewed') || false;

    if (!isArrayExist) {
      dispatch(setDefault());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setViewed(state.viewed));
    console.log(`실행`);
  }, [state, dispatch]);

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
        <Row>
          <h2>최근 본 상품</h2>
          <Row>
            {state.viewed.map((a, i) => {
              return <Viewed key={state.viewed[i]} shoes={shoes} viewItem={state.viewed[i]}></Viewed>;
            })}
          </Row>
        </Row>
      </Container>
    </>
  );
}
export default Main;
