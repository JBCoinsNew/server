const http = require('http');
const fs = require('fs');
const path = require('path')

http.createServer((req, res) => {

	let filePath = path.join(__dirname, 'html', req.url === '/' ? 'home.html' : req.url)

	let contentType = 'text/html'

	const ext = path.extname(filePath)

        if (!ext) {
                filePath += '.html'
        }

	switch (ext) {
		case '.css':
			contentType = 'text/css'
			break
		case '.js':
                        contentType = 'text/javascript'
                        break
		default:
			contentType = 'text/html'
	}

	fs.readFile(filePath, (err, content) => {
		if (err) {
			fs.readFile(path.join(__dirname, 'html', 'error.html'), (err, data) => {
				if (err) {
					res.writeHead(500)
					res.end('Error')
				} else {
					res.writeHead(200, { 'Content-Type': 'text/html' })
					res.end(data)
				}
			})
		} else {
			res.writeHead(200, { 'Content-Type': contentType })		
			res.end(content)
		}
	})

}).listen(3000, () => console.log('Сервер работает'))

