let initialState = {
    snack: {
        open: false,
        severity: '', // possible options from MUI docs: error, warning, info, success
        message: ''
    },
}

export default function miscReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'OPEN_SNACKBAR':
            return { ...state, snack: payload }
        case 'CLOSE_SNACKBAR':
            // return initialState;
            return { ...state, snack: { open: false } }
        default:
            return state;
    }
}

export function openSnackbar(options) {
    return {
        type: 'OPEN_SNACKBAR',
        payload: options,
    }
}

export function closeSnackbar() {
    return {
        type: 'CLOSE_SNACKBAR',
    }
}
