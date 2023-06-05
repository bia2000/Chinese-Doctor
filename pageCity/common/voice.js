let APIKey = 'X3SOvFWQGWWrSWmG6CtaS4FZ'
let SecretKey = 'G5PRlGp3LVe0AXZRj0V8yToCre3bOIEV'
const appkeys = 'vllmezmb2pem2iss6mk5vfvnvpo6ood7osek4vyp'
// const appkeys = '6ytfwe2nmqy6llbsml5zib5zqpfqpmtihcuz56ie'
//发音标准
export async function evaluateAudio(path, text) {
	let res = uni.uploadFile({
		url: 'https://cn-edu.hivoice.cn/eval/mp3',
		header: {
			"session-id": "59bd281a3d80429ba2ef0e0edbf1dada",
			"appkey": appkeys,
			"Wrap-Create-Time": true,
			"X-EngineType": "oral.zh_CH"
		},
		filePath: path,
		name: 'voice',
		formData: {
			'text': text,
			'mode': 'E',
		}
	})
	return res
}
