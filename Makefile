
css:
	cp sources/style/components/necolas-normalize.css/normalize.css sources/style/deps/normalize.styl
	stylus sources/style/style.styl -o theme/

init:
	cd sources/style; npm install nib
	cd sources/style; component install necolas/normalize.css

ftp-deploy:
	clear
	bash util/ftp-push.sh

.PHONY: css ftp-deploy
