const path = require('path');

module.exports = function(dir, name, file) {

	const ext = path.extname(file.name);
	const filename = `${name}${ext}`;
	const filepath = `${dir}/public/img/${filename}`;

	return new Promise((res, rej) => {

		file.mv(filepath, (err) => {

			if(err) {
				rej(err);
			} else {
				res(filename);
			}

		});

	});

}