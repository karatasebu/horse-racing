import { createStore } from 'vuex'
import { names, colors, distances } from '@/constants'
import { shuffleArray } from '@/utils'

const store = createStore({
  state () {
    return {
      horseList: [],
      program: [],
      results: [],
      isRunning: false,
      race: {
        round: null,
        positions: {},
        finishedHorses: []
      }
    }
  },
  getters: {
    ranking: state => {
      const sortedByPosition = Object.entries(state.race.positions)
          .filter(([id]) => !state.race.finishedHorses.includes(id))
          .sort(([, valA], [, valB]) => valB - valA)
          .map(([id]) => id)
      const sortedByFinish = state.race.finishedHorses
      const concatedArr = sortedByFinish.concat(sortedByPosition)

      return concatedArr.map(i => {
        const horse = state.horseList.find(h => h.id === i)
        return horse.name
      })
    }
  },
  mutations: {
    GENERATE_HORSE_LIST (state) {
      const shuffledNames = shuffleArray(names);
      const shuffledColors = shuffleArray(colors);
      const horses = [];

      for (let i = 0; i < 20; i++) {
        horses.push({
          id: crypto.randomUUID(),
          name: shuffledNames[i],
          color: shuffledColors[i],
          condition: Math.floor(Math.random() * 100) + 1,
        })
      }

      state.horseList = horses
    },
    GENERATE_PROGRAM (state) {
      state.program = distances.map((distance, index) => ({
        round: index + 1,
        distance,
        horses: shuffleArray(state.horseList).slice(0, 10)
      }))
    },
    GENERATE_RACE (state, payload) {
      state.race = {
        round: payload,
        finishedHorses: [],
        positions: state.program[payload - 1].horses.reduce((acc, horse) => {
          acc[horse.id] = 0
          return acc
        }, {}),
      }
    },
    SET_RESULTS (state, payload) {
      state.results = payload
    },
    SET_RACE (state, payload) {
      state.race = payload
    },
    SET_IS_RUNNING (state, payload) {
      state.isRunning = payload
    },
  },
  actions: {
    setResults ({ commit }, payload) {
      commit('SET_RESULTS', payload)
    },
    setIsRunning ({ commit }, payload) {
      commit('SET_IS_RUNNING', payload)
    },
    setRace ({ commit }, payload) {
      commit('SET_RACE', payload)
    },
    generateRace ({ commit }, payload) {
      commit('GENERATE_RACE', payload)
    },
    generateHorseList ({ commit }) {
      commit('GENERATE_HORSE_LIST')
    },
    initializeProgram ({ commit }) {
      commit('GENERATE_PROGRAM')
      commit('GENERATE_RACE', 1)
      commit('SET_RESULTS', [])
      commit('SET_IS_RUNNING', false)
    }
  }
})

export default store