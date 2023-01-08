import Loadable from '@axiomhq/react-loadable'
import React from 'react'
import Loading from '../components/Loading/Global'

const LoadableHome = Loadable({
	loader  : () => import('../containers/Home'),
	loading : () => <Loading />
})

const LoadableAuthors = Loadable({
	loader  : () => import('../containers/Authors'),
	loading : () => <Loading />
})

const LoadableLogin = Loadable({
	loader  : () => import('../containers/Login'),
	loading : () => <Loading />
})
const LoadablePasswordRecovery = Loadable({
	loader  : () => import('../containers/PasswordRecovery'),
	loading : () => <Loading />
})

export const homeLoadables = {
	LoadableHome,
	LoadableAuthors,
	LoadableLogin,
	LoadablePasswordRecovery
}
