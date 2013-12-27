
css:
	stylus sources/style/style.styl -o theme/

init:
	cd sources/style; npm install nib

ftp-deploy:
	clear
	bash util/ftp-push.sh

.PHONY: css ftp-deploy
