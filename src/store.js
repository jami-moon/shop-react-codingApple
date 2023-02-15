import { configureStore, createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { name: 'HA', age: 31 },
  reducers: {
    increaseAge(state, action) {
      state.age += action.payload;
    },
  },
});

let cartItem = createSlice({
  name: 'cartItem',
  initialState: [],
  reducers: {
    addCount(state, action) {
      let idx = state.findIndex((e) => {
        return e.id === action.payload;
      });
      state[idx].count++;
    },
    addToCart(state, action) {
      if (
        state.some((e) => {
          return e.id === action.payload.id;
        })
      ) {
        alert(`이미 추가된 상품입니다.`);
      } else {
        alert(`상품이 장바구니에 추가되었습니다.`);
        state.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      let targetIdx = state.findIndex((el) => el.id === action.payload);

      state.splice(targetIdx, 1);
    },
  },
});

// 최근 본 상품 로컬스토리지 관리 state
let viewed = createSlice({
  name: 'viewed',
  initialState: JSON.parse(localStorage.getItem('viewed')) || [],
  reducers: {
    setViewed(state, action) {
      const viewedArr = JSON.parse(localStorage.getItem('viewed'));
      state = viewedArr;
    },
    setDefault(state, action) {
      localStorage.setItem('viewed', JSON.stringify(state));
    },
    addViewed(state, action) {
      const viewedArr = JSON.parse(localStorage.getItem('viewed'));
      const currentId = action.payload;
      const targetIdx = viewedArr.findIndex((e) => e === currentId);
      const isAlreadyViewed = viewedArr.some((e) => {
        return e === currentId;
      });

      // 본 상품이 viewed에 없을 경우 - 요소 추가, 이미 viewed에 있을 경우 - 순서 수정
      if (!isAlreadyViewed) {
        viewedArr.push(currentId);
        localStorage.setItem('viewed', JSON.stringify(viewedArr));
        state = viewedArr;
      } else {
        viewedArr.splice(targetIdx, 1);
        viewedArr.push(currentId);
        localStorage.setItem('viewed', JSON.stringify(viewedArr));
        state = viewedArr;
      }
    },
  },
});

export let { increaseAge } = user.actions;
export let { addCount, addToCart, removeFromCart } = cartItem.actions;
export let { setViewed, setDefault, addViewed } = viewed.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cartItem: cartItem.reducer,
    viewed: viewed.reducer,
  },
});
