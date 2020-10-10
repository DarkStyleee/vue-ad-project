import * as fb from 'firebase'

class Ad {
    constructor (title, desc, ownerId, img = '', promo = false, id = null) {
        this.title = title
        this.desc = desc
        this.ownerId = ownerId
        this.img = img
        this.promo = promo
        this.id = id
    }
}

export default {
    state: {
        ads: []
    },
    mutations: {
        createAd (state, payload) {
            state.ads.push(payload)
        },
        loadAds (state, payload) {
            state.ads = payload
        },
        updateAd (state, {title, desc, id}) {
            const ad = state.ads.find(a => {
                return a.id === id
            })

            ad.title = title
            ad.desc = desc
        }
    },
    actions: {
        async createAd ({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)

            const image = payload.img

            try {
                const newAd = new Ad(payload.title, payload.desc, getters.user.id, '', payload.promo)

                const ad = await fb.database().ref('ads').push(newAd)
                const imgExt = image.name.slice(image.name.lastIndexOf('.'))

                const fileData = await fb.storage().ref(`ads/${ad.key}${imgExt}`).put(image)
                const imgSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()

                await fb.database().ref('ads').child(ad.key).update({
                    img: imgSrc
                })

                commit('setLoading', false)
                commit('createAd', {
                    ...newAd,
                    id: ad.key,
                    img: imgSrc
                })
            } catch (err) {
                commit('setError', err.message)
                commit('setLoading', false)
                throw err
            }
        },
        async fetchAds ({commit}) {
            commit('clearError')
            commit('setLoading', true)

            const resultAds = []

            try {
                const fbVal = await fb.database().ref('ads').once('value')
                const ads = fbVal.val()
                
                Object.keys(ads).forEach(key => {
                    const ad = ads[key]
                    resultAds.push(
                        new Ad(
                            ad.title, 
                            ad.desc, 
                            ad.ownerId,
                            ad.img,
                            ad.promo,
                            key)
                    )
                })


                commit('loadAds', resultAds)
                commit('setLoading', false)
            } catch (err) {
                commit('setError', err.message)
                commit('setLoading', false)
                throw err
            }
        },
        async updateAd ({commit}, {title, desc, id}) {
            commit('clearError')
            commit('setLoading', true)

            try {
                await fb.database().ref('ads').child(id).update({
                    title,
                    desc
                })
                commit('updateAd', {
                    title, desc, id
                })
                commit('setLoading', false)
            } catch (err) {
                commit('setError', err.message)
                commit('setLoading', false)
                throw err
            }
        }
    },
    getters: {
        ads (state) {
            return state.ads
        },
        promoAds (state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds (state, getters) {
            return state.ads.filter(ad => {
                return ad.ownerId === getters.user.id
            })
        },
        adById (state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }
}