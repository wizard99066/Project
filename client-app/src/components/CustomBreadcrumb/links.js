/* eslint-disable sort-keys */
export default {
	AccessRights: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Доступ к обращениям',
			nameBel : 'Доступ да зваротаў',
			link    : null
		}
	],
	AisMvManage: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Cервисы',
			nameBel : 'Сэрвісы',
			link    : '/services'
		},
		{
			name    : 'Взаимодействие с АисМВ',
			nameBel : 'Кiраванне падпіскай АiсМв',
			link    : null
		}
	],
	appeals: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Обращения',
			nameBel : 'Звароты',
			link    : null
		}
	],
	appeal: [
		{
			back    : true,
			link    : null,
			name    : ' ',
			nameBel : ' '
		},
		{
			link    : (link) => link,
			name    : 'К списку обращений',
			nameBel : 'Да спісу зваротаў'
		}
	],
	appealRegForm: [
		{
			link    : (link) => link,
			name    : 'Карточка обращения',
			nameBel : 'Картка звароту'
		},
		{
			link    : null,
			name    : 'Регистрация обращения',
			nameBel : 'Рэгістрацыя звароту'
		}
	],
	createReport: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : '/services',
			name    : 'Сервисы',
			nameBel : 'Сервісы'
		},
		{
			link    : null,
			name    : 'Создать отчёт',
			nameBel : 'Стварыць справаздачу'
		}
	],
	inviteToReOrg: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : '/orgManagement',
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй'
		},
		{
			link    : null,
			name    : 'Пригласить пользователя',
			nameBel : 'Запрасіць карыстальніка'
		}
	],
	messages: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : null,
			name    : 'Сообщения',
			nameBel : 'Паведамленні'
		}
	],
	notifications: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : null,
			name    : 'Уведомления',
			nameBel : 'Апавяшчэнні'
		}
	],
	orgManagement: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : null,
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй'
		}
	],
	orgUsers: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : '/orgManagement',
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй'
		},
		{
			link    : null,
			name    : (user) => `${ user?.lastName ?? '' } ${ user?.firstName ?? '' } ${ user?.middleName ?? '' }`,
			nameBel : (user) => `${ user?.lastName ?? '' } ${ user?.firstName ?? '' } ${ user?.middleName ?? '' }`
		}
	],
	profile: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : null,
			name    : 'Профиль пользователя',
			nameBel : 'Профіль карыстальніка'
		}
	],
	registerByAdmin: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : null,
			name    : 'Добавить пользователя',
			nameBel : 'Дадаць карыстальніка'
		}
	],
	registerByExternalAdmin: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : '/orgManagement',
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй'
		},
		{
			link    : null,
			name    : 'Зарегистрировать пользователя',
			nameBel : 'Зарэгістраваць карыстальніка'
		}
	],
	reportsManagement: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : '/contentManagement',
			name    : 'Управление контентом',
			nameBel : 'Кіраванне кантэнтам'
		},
		{
			link    : null,
			name    : 'Отчёты',
			nameBel : 'Справаздачы'
		}
	],
	resolution: [
		{
			link    : (link) => link,
			name    : 'Карточка обращения',
			nameBel : 'Картка звароту'
		},
		{
			link    : null,
			name    : 'Резолюция',
			nameBel : 'Рэзалюцыя'
		}
	],
	services: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : null,
			name    : 'Сервисы',
			nameBel : 'Сервісы'
		}
	],
	subsystem: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : null,
			name    : 'Доступ к обращениям',
			nameBel : 'Доступ да зваротаў'
		}
	],
	webApi: [
		{
			link    : '/account',
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет'
		},
		{
			link    : '/orgManagement',
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй'
		},
		{
			link    : null,
			name    : 'API',
			nameBel : 'API'
		}
	],
	tasks: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Задачи',
			nameBel : 'Задачы',
			link    : null
		}
	],
	childOrgs: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй',
			link    : '/orgManagement'
		},
		{
			name    : 'Дочерние и подведомственные организации',
			nameBel : 'Даччыныя і падведамныя арганізацыі',
			link    : null
		}
	],
	workSchedule: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй',
			link    : '/orgManagement'
		},
		{
			name    : 'Время работы',
			nameBel : 'Час працы',
			link    : null
		}
	],
	constructure: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Сервисы',
			nameBel : 'Сервісы',
			link    : '/services'
		},
		{
			name    : 'Конструктор отчётов',
			nameBel : 'Канструктар справаздач',
			link    : null
		}
	],
	orgUnits: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй',
			link    : '/orgManagement'
		},
		{
			name    : 'Структурные подразделения организации',
			nameBel : 'Структурныя падраздзяленні арганізацыі',
			link    : null
		}
	],
	disciplinaryActions: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй',
			link    : '/orgManagement'
		},
		{
			name    : 'Дисциплинарные нарушения',
			nameBel : 'Дысцыплінарныя парушэнні',
			link    : null
		}
	],
	messageTemplates: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй',
			link    : '/orgManagement'
		},
		{
			name    : 'Шаблоны',
			nameBel : 'Шаблоны',
			link    : null
		}
	],
	messageTemplatesAdmin: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление контентом',
			nameBel : 'Кіраванне кантэнтам',
			link    : '/contentManagement'
		},
		{
			name    : 'Шаблоны',
			nameBel : 'Шаблоны',
			link    : null
		}
	],
	orgCalendar: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление организацией',
			nameBel : 'Кіраванне арганізацыяй',
			link    : '/orgManagement'
		},
		{
			name    : 'Календарь организации',
			nameBel : 'Каляндар арганізацыі',
			link    : null
		}
	],
	calendar: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Календарь',
			nameBel : 'Каляндар',
			link    : null
		}
	],
	nsi: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'НСИ',
			nameBel : 'НДІ',
			link    : null
		}
	],
	nsiModify: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление НСИ',
			nameBel : 'Кіраванне НДІ',
			link    : null
		}
	],
	appealRequestForms: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Запросы организации',
			nameBel : 'Запыты арганізацыі',
			link    : null
		}
	],
	messagesToAdmin: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Вопросы администратору',
			nameBel : 'Пытанні адміністратару',
			link    : null
		}
	],
	contentManagement: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление контентом',
			nameBel : 'Кіраванне кантэнтам',
			link    : null
		}
	],
	users: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Пользователи системы',
			nameBel : 'Карыстальнікі сістэмы',
			link    : null
		}
	],
	user: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Пользователи системы',
			nameBel : 'Карыстальнікі сістэмы',
			link    : '/users'
		},
		{
			name    : (user) => `${ user?.lastName ?? '' } ${ user?.firstName ?? '' } ${ user?.middleName ?? '' }`,
			nameBel : (user) => `${ user?.lastName ?? '' } ${ user?.firstName ?? '' } ${ user?.middleName ?? '' }`,
			link    : null
		}
	],
	addNews: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление контентом',
			nameBel : 'Кіраванне кантэнтам',
			link    : '/contentManagement'
		},
		{
			name    : 'Добавление новости',
			nameBel : 'Даданне навіны',
			link    : null
		}
	],
	editNews: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление контентом',
			nameBel : 'Кіраванне кантэнтам',
			link    : '/contentManagement'
		},
		{
			name    : 'Редактирование новости',
			nameBel : 'Рэдагаванне навіны',
			link    : null
		}
	],
	manageHelp: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление контентом',
			nameBel : 'Кіраванне кантэнтам',
			link    : '/contentManagement'
		},
		{
			name    : 'Помощь',
			nameBel : 'Дапамога',
			link    : null
		}
	],
	createPost: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление контентом',
			nameBel : 'Кіраванне кантэнтам',
			link    : '/contentManagement'
		},
		{
			name    : 'Помощь',
			nameBel : 'Дапамога',
			link    : '/help/manageHelp'
		},
		{
			name    : 'Добавить вопрос',
			nameBel : 'Дадаць пытанне',
			link    : null
		}
	],
	modifyTags: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление контентом',
			nameBel : 'Кіраванне кантэнтам',
			link    : '/contentManagement'
		},
		{
			name    : 'Помощь',
			nameBel : 'Дапамога',
			link    : '/help/manageHelp'
		},
		{
			name    : 'Управление тэгами',
			nameBel : 'Упраўленне тэгамі',
			link    : null
		}
	],
	setContacts: [
		{
			name    : 'Личный кабинет',
			nameBel : 'Асабісты кабінет',
			link    : '/account'
		},
		{
			name    : 'Управление контентом',
			nameBel : 'Кіраванне кантэнтам',
			link    : '/contentManagement'
		},
		{
			name    : 'Контакты',
			nameBel : 'Кантакты',
			link    : null
		}
	]
}