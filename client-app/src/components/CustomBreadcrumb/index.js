import React from 'react'
import {
	Breadcrumb
}from 'antd'
import {
	useLocation, Link
}from "react-router-dom"
import {
	useSelector
}from 'react-redux'
import './style.css'
import Separator from '../../../public/Vector.svg'
import links from './links'

const routes = {
	'AisMvManage'             : links.AisMvManage,
	'accessRights'            : links.AccessRights,
	'addNews'                 : links.addNews,
	'appeal'                  : links.appeal,
	'appealRequestForms'      : links.appealRequestForms,
	'appeals'                 : links.appeals,
	'appealsRegForm'          : links.appealRegForm,
	'calendar'                : links.calendar,
	'childOrgs'               : links.childOrgs,
	'constructure'            : links.constructure,
	'contentManagement'       : links.contentManagement,
	'controlSubsystem'     	  : links.subsystem,
	'createPost'              : links.createPost,
	'createReOrgReport'       : links.createReport,
	'disciplinaryActions'     : links.disciplinaryActions,
	'editNews'                : links.editNews,
	'inviteToReOrg'           : links.inviteToReOrg,
	'manageHelp'              : links.manageHelp,
	'messageTemplates'        : links.messageTemplates,
	'messageTemplatesAdmin'   : links.messageTemplatesAdmin,
	'messages'                : links.messages,
	'messagesToAdmin'         : links.messagesToAdmin,
	'modifyTags'              : links.modifyTags,
	'notifications'           : links.notifications,
	'nsi'                     : links.nsi,
	'nsiModify'               : links.nsiModify,
	'orgCalendar'             : links.orgCalendar,
	'orgManagement'           : links.orgManagement,
	'orgUnits'                : links.orgUnits,
	'orgUsers'                : links.orgUsers,
	'profile'                 : links.profile,
	'registerByAdmin'         : links.registerByAdmin,
	'registerByExternalAdmin' : links.registerByExternalAdmin,
	'reportsManagement'       : links.reportsManagement,
	'resolution'              : links.resolution,
	'services'                : links.services,
	'setContacts'             : links.setContacts,
	'tasks'                   : links.tasks,
	'user'                    : links.user,
	'users'                   : links.users,
	'webApi'                  : links.webApi,
	'workSchedule'            : links.workSchedule
}

const CustomBreadcrumb = () => {
	const location = useLocation()
	const route = location.pathname.split('/').slice(1)
	const isUserCurrent = route[0] == 'users' ? route[1] ? 'user' : 'users' : null
	const isHelp = route[0] == 'help' ? route[1] ? route[1] : route[0] : null
	const isControlSubsystem = route[0] == 'controlSubsystem' ? route.length > 1 : false

	// const isRegForm = route[0] == 'appealsRegForm' ? route[0] : null
	const isAdmin = useSelector((state) => state.userReducer.roles.includes("admin"))
	const crumbs = routes[isUserCurrent ?? isHelp ?? ((route[0] == 'messageTemplates' && isAdmin) ? "messageTemplatesAdmin" : route[0])]
	const isRu = useSelector((state) => state.globalReducer.isRu)
	const { oneOrgUser, oneUser } = useSelector((state) => state.managementReducer)
	const { resolution } = useSelector((state) => state.resolutionReducer)
	const backOptions = useSelector((state) => state.appealsReducer.backOptions)

	const getLink = (x) => {
		switch (route[0]){
			case 'resolution' :
				return x.link(`/appeal/${ resolution?.reOrgAppealId }`)
			case 'appeal' :{
				if (backOptions){
					const redirects = {
						1 : `/appeals/listIn/${ backOptions.matchParamsId }`,
						2 : `/appeals/listYou/${ backOptions.matchParamsId }`,
						3 : `/appeals/listControl/${ backOptions.matchParamsId }`,
						4 : `/appeals/case/${ backOptions.matchParamsId }`,

						// 5 : '/appeals/listAppointYou/9',
						6: '/appeals/collectiveAppeals'
					}
					return x.link(redirects[backOptions.tableIndex])
				}
				return x.link('/appeals')
			}
			case 'appealsRegForm' :{
				return x.link(`/appeal/${ route[1] }`)
			}
			default :
				return null
		}
	}

	const user = location.pathname.split('/').slice(1)[0] == 'orgUsers' ? oneOrgUser : oneUser

	return (
		crumbs && !isControlSubsystem ?
			(
				<Breadcrumb
					separator={
						(
							<img
								src={ Separator }
							/>
						)
					}
				>
					{
						crumbs.map((x, i) => {
							const isFunctionName = typeof x.name == 'function'
							const isFunctionLink = x.link ? typeof x.link == 'function' : false
							const name = isRu ? (isFunctionName ? x.name(user) : x.name) : (isFunctionName ? x.nameBel(user) : x.nameBel)
							return (
								<Breadcrumb.Item
									key="br_item"
									className={ x.back ? "back" : '' }
								>
									{
										x.link ?
											(
												<Link to={ isFunctionLink ? getLink(x) : x.link }>
													{ name }
												</Link>
											)
											: (name)
									}
								</Breadcrumb.Item>)
						})

					}
				</Breadcrumb>
			)
			: null
	)
}
export default CustomBreadcrumb