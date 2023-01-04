export default function downloadFile(response, file, isExcel = false){
	function s2ab(s){
		const buf = new ArrayBuffer(s.length)
		const view = new Uint8Array(buf)
		for (let i=0; i!=s.length; ++i)
			view[i] = s.charCodeAt(i) & 0xFF
		return buf
	}
	if (file){
		if (window.navigator && window.navigator.msSaveOrOpenBlob){
		// IE variant
			window.navigator.msSaveOrOpenBlob(new Blob([isExcel ? s2ab(atob(response)) : response], { type: file.type ?? '' }), file.fileName + file.fileExtension)
		}
		else {
			const url = window.URL.createObjectURL(new Blob([isExcel ? s2ab(atob(response)) : response], { type: file.type ?? '' }))
			const link = document.createElement("a")
			link.href = url
			link.setAttribute("download", file.fileName + file.fileExtension)
			document.body.appendChild(link)
			link.click()
			link.remove()
		}
	}
	return true
}
