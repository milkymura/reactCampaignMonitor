export default {
  ADD_CAMPAIGN(state, {payload}) {
    return { 
      ...state, 
      campaignlist: [
        ...state.campaignlist,
        payload
      ]
    };
  },

  SET_SIDEBAR_VISIBILITY(state, { payload }) {
    return { 
      ...state, 
      isSidebarOpen: payload
    };
  },

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
