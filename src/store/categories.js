const initialState = {
  categoryList: [
    { _id: 1, name: 'All', description: 'All Products' },
    { _id: 10, name: 'Accessibility', description: 'Category Description Goes Here' },
    { _id: 20, name: 'Web Design', description: 'Category Description Goes Here' },
    { _id: 30, name: 'Design', description: 'Category Description Goes Here' },
    { _id: 40, name: 'Apps', description: 'Category Description Goes Here' },
    { _id: 60, name: 'Tutoring', description: 'Category Description Goes Here' },
    { _id: 60, name: 'Misc', description: 'Category Description Goes Here' },
    { _id: 70, name: 'Your Services', description: 'Category Description Goes Here' }

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
    case 'ALLPRODUCTS':
      // return initialState;
      // return { payload }
      return { payload, activatedDescription: payload.description }
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

export const allProducts = (category, description) => {
  return {
    type: "ALLPRODUCTS",
    payload: {
      category,
      description
    }
  }
}