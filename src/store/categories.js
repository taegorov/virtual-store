const initialState = {
  categoryList: [
    { _id: 1, name: 'All', description: 'All services' },
    { _id: 10, name: 'Accessibility', description: 'Accessibility improvements such as text-to-speech and color-blind friendliness' },
    { _id: 20, name: 'Web Design', description: 'Design services specifically for your website' },
    { _id: 30, name: 'Design', description: 'General design services such as logo and brand book creation' },
    { _id: 40, name: 'Apps', description: 'App creation and assistance' },
    { _id: 60, name: 'Tutoring', description: 'Hands-on teaching of various design- and coding-related services' },
    { _id: 60, name: 'Misc', description: 'Everything else' },
    { _id: 70, name: 'My Services', description: 'Your services and your services only' }
  ],

  activatedCategory: '',
  activatedDescription: 'All services',
  activatedUser: '',
}


export default function reducer(state = initialState, action) {
  // console.log('activated user is: ', initialState.activatedUser)

  const { type, payload } = action;
  switch (type) {
    case 'INACTIVE':
      return initialState;
    // return { ...state, activatedCategory: payload.category, activatedDescription: initialState.categoryList.find(item => item.name === payload.category).description }
    case 'ACTIVE':
      return { ...state, activatedCategory: payload.category, activatedDescription: initialState.categoryList.find(item => item.name === payload.category).description }
    case 'ALLPRODUCTS':
      return { payload, activatedDescription: initialState.categoryList.find(item => item.name === payload.category).description }
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
