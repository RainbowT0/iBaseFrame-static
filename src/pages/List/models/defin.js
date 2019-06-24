import { getDefinList } from '@/services/api';

export default {
  namespace: 'defin',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload,callback }, { call, put }) {
      const response = yield call( getDefinList, payload);
      yield put({
        type: 'save',
        payload: {
          list:response.data.records,
          pagination:{
            total:response.data.total,
            pageSize:response.data.size,
            current:response.data.current
          }},
      });
      if (callback) callback(response);
    },
    // *add({ payload, callback }, { call, put }) {
    //   const response = yield call(addRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback(response);
    // }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
