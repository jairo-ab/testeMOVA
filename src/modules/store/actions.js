import * as types from './mutations-types'
import axios from 'axios'

export const ActionAllData = async ({ dispatch },payload) => {
	payload
	const res = await axios.get('https://restcountries.com/v3.1/all')
	dispatch('ActionSetAllData', res.data)
}

export const ActionSetAllData = ({ commit }, payload) => {
	commit(types.ALL_DATA, payload)
}