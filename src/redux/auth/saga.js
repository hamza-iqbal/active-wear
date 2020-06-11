import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';
import { end_point } from '../../util/config'


export function* basic_fetch() {

    yield takeEvery('BASIC_FETCH', function* ({ payload }) {

        yield console.log('In Basic Fetch Saga..', payload)

        yield put({ type: actions.TOGGLE_LOADER, payload: true })

        try {
            const response = yield fetch('https://api.myjson.com/bins/1etsk2')
            console.log(`response ------------> `, response)
            yield put({ type: actions.TOGGLE_LOADER, payload: false })

        } catch (error) {
            console.log(`error ------------> `, error)
            yield put({ type: actions.TOGGLE_LOADER, payload: false })
        }

    })

}

export function* login() {

    yield takeEvery('LOGIN', function* ({ payload }) {

        yield console.log('In LOGIN Saga..', payload)

        yield put({ type: actions.TOGGLE_LOADER, payload: true })
        yield put({ type: actions.SAVE_LOGIN_DETAILS, payload })
        yield put(push('/main'))
        yield put({ type: actions.TOGGLE_LOADER, payload: false })
        /*
        try {
            // const response = yield fetch('https://api.myjson.com/bins/1etsk2')
            let response = yield fetch(end_point+'graphql',{
                method:'post',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify([])
            })
            response = yield response.json()
            console.log(`response ------------> `, response)
            yield put({ type: actions.TOGGLE_LOADER, payload: false })

        } catch (error) {
            console.log(`error ------------> `, error)
            yield put({ type: actions.TOGGLE_LOADER, payload: false })
        }
        */

    })

}


export default function* rootSaga() {
    yield all([
        fork(basic_fetch),
        fork(login)
    ])
}  