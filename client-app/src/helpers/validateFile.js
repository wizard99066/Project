import React from 'react'
import {
	Upload
}from "antd"
import i18nGlobal from "../localization"
import notice from "../components/Notice"

const validFormats = [
	'image/jpeg',
	'image/png',
	'application/pdf',
	'image/tiff',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //docx
	'application/msword', //doc
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' //xlsx
]

function validateFile(file, isRu){
	const isValidFormat = (validFormats.indexOf(file.type) != -1) || (file.type === 'application/vnd.ms-excel'&&(file.name.endsWith(".xls"))) //здесь дополнительно проверяю потому что такой тип имеет csv и xls файлы
	const isLess15MB = file.size / 1024 / 1024 < 15
	const errorMessage = `${ !isValidFormat ? i18nGlobal.fileTypeError[isRu] : `` }\n${ !isLess15MB ? i18nGlobal.downloadFileSizeError[isRu] : `` }`.trim()
	if (errorMessage){
		const description =(
			<span style={ { whiteSpace: "pre-wrap" } }>
				{ errorMessage }
			</span>
		)
		notice("error", i18nGlobal.attachFilesTitle[isRu], description)
	}
	return isLess15MB && isValidFormat? false : Upload.LIST_IGNORE
}

export default validateFile