import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Nav } from 'react-bootstrap';
import { Context1 } from '../App.js';
import { addToCart, addViewed } from '../store.js';

let Btn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg === 'blue' ? 'white' : 'black')};
  padding: 10px;
`;

let NewBtn = styled(Btn)`
  background: ${(props) => props.bg || 'red'};
`;

function Detail(props) {
  const { shoes } = useContext(Context1);

  let [num, setNum] = useState('');
  let [Alert, setAlert] = useState(1);
  let { urlParam } = useParams();
  let product = shoes.find((el) => {
    return el.id === Number(urlParam);
  });
  let [tab, setTab] = useState(0);
  let [detailFade, setDetailFade] = useState('');
  let dispatch = useDispatch();

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(0);
    }, 5000);

    setDetailFade('end');

    return () => {
      setDetailFade('');
      clearTimeout(timer);
    };
  }, []);

  // num 변할 때만 실행
  useEffect(() => {
    if (isNaN(num)) {
      alert(`숫자만 입력하시요`);
      setNum(``);
    }
  }, [num]);

  // 상품페이지 접속 시 로컬스토리지 watched에 id값 추가
  useEffect(() => {
    dispatch(addViewed(product.id));
  }, [dispatch, product]);

  if (product) {
    return (
      <div className={`start ${detailFade}`}>
        {Alert === 1 ? <div className="alert alert-warning">프로모션 박스 - 이 메시지는 5초 뒤 사라집니다!</div> : null}
        <div className="container">
          <Btn bg="blue">props로 bg 색상이 전달되는 버튼</Btn>
          <NewBtn bg="yellow">bg props가 있으면 그것을 따르고, 없으면 빨간 바탕인 버튼</NewBtn>
          <div className="row">
            <div className="col-md-6">
              <img src={'https://codingapple1.github.io/shop/shoes' + (Number(product.id) + 1) + '.jpg'} width="100%" alt="상품이미지" />
            </div>
            <div className="col-md-6">
              <p>숫자만 입력하는 input</p>
              <input
                onChange={(e) => {
                  setNum(e.target.value);
                }}
              />
              <h4 className="pt-5">{product.title}</h4>
              <p>{product.content}</p>
              <p>{product.price}</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(addToCart({ id: product.id, name: product.title, count: 1 }));
                }}
              >
                장바구니에 담기
              </button>
            </div>
          </div>

          <Nav variant="tabs" defaultActiveKey="link-1">
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setTab(0);
                }}
                eventKey="link-1"
              >
                버튼 0
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setTab(1);
                }}
                eventKey="link-2"
              >
                버튼 1
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setTab(2);
                }}
                eventKey="link-3"
              >
                버튼 2
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContent tab={tab} />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h2 style={{ padding: '100px' }}>올바르지 않은 주소입니다.</h2>
      </>
    );
  }
}

function TabContent({ tab }) {
  const [fade, setFade] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade('end');
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade('');
    };
  }, [tab]);

  return <div className={`start ${fade}`}>{[<div>내용1</div>, <div>내용2</div>, <div>내용3</div>][tab]}</div>;
}

export default Detail;
