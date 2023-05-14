const useCreateReducer = () => {
    const createReducer = (initialState, handler) => {
        return (state = initialState, action) => {
            return handler?.hasOwnProperty(action.type)
                ? handler[action.type](state, action)
                : state
        }
    }

    return {
        createReducer,
    }
}

export default useCreateReducer
