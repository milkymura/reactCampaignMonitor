export default {
  UPDATE_CARTLIST(state, { payload }) {
    return { 
      ...state, 
      cartList: { 
        ...payload
      }
    };
  },

  SHOW_CHECKOUT(state, { payload }) {
    return {
      ...state,
      isCheckout: payload
    }
  }
};
