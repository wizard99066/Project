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
const LoadableBooks = Loadable({
	loader  : () => import('../containers/Books'),
	loading : () => <Loading />
})
const LoadableGenres = Loadable({
	loader  : () => import('../containers/Genres'),
	loading : () => <Loading />
})
const LoadablePublishings = Loadable({
	loader  : () => import('../containers/Publishings'),
	loading : () => <Loading />
})
const LoadableListBooks= Loadable({
	loader  : () => import('../containers/Books/List'),
	loading : () => <Loading />
})
const LoadableAccount= Loadable({
	loader  : () => import('../containers/Account/index'),
	loading : () => <Loading />
})

export const homeLoadables = {
	LoadableHome,
	LoadableAuthors,
	LoadableLogin,
	LoadablePasswordRecovery,
	LoadableBooks,
	LoadableGenres,
	LoadablePublishings,
	LoadableListBooks,
	LoadableAccount
}
