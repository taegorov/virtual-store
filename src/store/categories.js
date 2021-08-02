const initialState = {
  categoryList: [
    { _id: 98765, name: 'Electronics', description: 'Category Description Goes Here' },
    { _id: 12345, name: 'Food', description: 'Category Description Goes Here' }
  ],
  activatedCategory: '',
  activatedDescription: '',
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'INACTIVE':
      return initialState;
    case 'ACTIVE':
      return { ...state, activatedCategory: payload.category, activatedDescription: payload.description }
    default:
      return state;
  }
}

export const inactive = () => {
  return {
    type: 'INACTIVE'
  }
}

export const active = (category, description) => {
  return {
    type: "ACTIVE",
    payload: {
      category,
      description
    }
  }
}
