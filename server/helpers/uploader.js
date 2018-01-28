const path = require('path');

module.exports = function(dir, name, file) {

	const ext = path.extname(file.name);
	const filename = `${name}${ext}`;
	const filepath = `public/img/${filename}`;

	return new Promise((res, rej) => {

		file.mv(`${dir}/${filepath}`, (err) => {

			if(err) {
				rej(err);
			} else {
				res(filepath);
			}

		});

	});

}