import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increaseAge, addCount, removeFromCart } from '../store';

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  return (
    <div>
      <h2>
        {state.user.name}, {state.user.age}살의 장바구니
      </h2>
      <button
        onClick={() => {
          dispatch(increaseAge(1));
        }}
      >
        나이 늘리기!
      </button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>수량 추가하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cartItem.map((a, i) => (
            <tr key={state.cartItem[i].id}>
              <td>{state.cartItem[i].id}</td>
              <td>{state.cartItem[i].name}</td>
              <td>{state.cartItem[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(addCount(state.cartItem[i].id));
                  }}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(removeFromCart(state.cartItem[i].id));
                  }}
                >
                  삭제하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
