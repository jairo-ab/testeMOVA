import * as types from './mutations-types'

export default {
	[types.ALL_DATA](state, payload) {
		state.data = payload
	}
}