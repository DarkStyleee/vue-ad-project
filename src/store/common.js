export default {
    state: {
        loading: false,
        error: null,
        themeColor: 'success',
        colorsList: [
            'success',
            'warning',
            'primary',
            'secondary',
            'accent',
            'error',
            'info',
            'purple',
            'teal',
            'cyan',
            'lime',
            'brown',
            'grey'
        ]
    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        },
        changeColor (state, payload) {
            state.themeColor = payload
        }
    },
    actions: {
        setLoading ({commit}, payload) {
            commit('setLoading', payload)
        },
        setError ({commit}, payload) {
            commit('setError', payload)
        },
        clearError ({commit}) {
            commit('clearError')
        },
        changeColor ({commit}, payload) {
            commit('changeColor', payload)
        }
    },
    getters: {
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        },
        themeColor (state) {
            return state.themeColor
        },
        colors (state) {
            return state.colorsList
        }
    }
}