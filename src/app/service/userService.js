import { provider, db, auth } from './firebase'
import { OK_RESPONSE } from '../util/const'

const userService = {
    register: (body, cb, cbError) => {
        try {
            auth.createUserWithEmailAndPassword(body.email, body.password)
                .then(credentials => {
                    if (credentials) {
                        credentials.user.updateProfile({ displayName: body.name })
                            .then(s => userService.validateNewUser(credentials, cb, cbError))
                    }
                }).catch(cbError)
        } catch (e) {
            console.log(e)
            cbError({ status: 500, message: e.message })
        }
    },
    login: (body, cb, cbError) => {
        try {
            auth.signInWithEmailAndPassword(body.email, body.password)
                .then(credentials => cb({ ...OK_RESPONSE, data: credentials })).catch(cbError);
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    logout: (body, cb, cbError) => {
        try {
            auth.signOut().then(() => cb({ ...OK_RESPONSE })).catch(cbError);
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    googleAuth: (body, cb, cbError) => {
        try {
            const googleProvider = new provider.GoogleAuthProvider();
            auth.signInWithPopup(googleProvider)
                .then(credentials => userService.validateNewUser(credentials, cb, cbError)).catch(cbError);
        } catch (e) {
            console.log(e)
            cbError({ status: 500, message: e.message })
        }
    },
    facebookAuth: (body, cb, cbError) => {
        try {
            const facebookProvider = new provider.FacebookAuthProvider();
            auth.signInWithPopup(facebookProvider)
                .then(credentials => userService.validateNewUser(credentials, cb, cbError)).catch(cbError);
        } catch (e) {
            console.log(e)
            cbError({ status: 500, message: e.message })
        }
    },
    checkSession: (body, cb, cbError) => {
        try {
            auth.onAuthStateChanged(user => cb({ ...OK_RESPONSE, data: { user: user || {} } }))
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    validateNewUser: async (credentials, cb, cbError) => {
        try {
            if (credentials.additionalUserInfo.isNewUser) {
                let { uid, email, displayName, photoURL } = credentials.user
                email = email.toLowerCase()
                await db.collection('users').doc(uid).set({ email, displayName, photoURL })
            }
            cb({ ...OK_RESPONSE, data: credentials })
        } catch (e) {
            console.log(e)
            cbError({ status: 500, message: e.message })
        }
    },
    searchUser: async (body, cb, cbError) => {
        try {
            console.log(body)
            let data = await db.collection('users').where(body.type, "==", body[body.type]).limit(1).get()
            let user = data.docs[0].data()
            if (user) {
                user.id = data.docs[0].id
                return cb({ ...OK_RESPONSE, message: 'Usuario encontrado', data: user });
            }
            return cb({ status: 404, message: 'No se encontro usuario' });
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    }
}

export default userService