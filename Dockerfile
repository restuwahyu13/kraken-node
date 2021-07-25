## BUILD STAGE ONE

FROM node:14-alpine as kraken-node
COPY package*.json \
	.coveralls.yml \
	.editorconfig \
	.gitignore \
	.npmignore \
	.prettierignore \
	.prettierrc \
	.eslintignore \
	.eslintrc \
	.travis.yml \
	config.ts \
	jest.config.ts \
	Makefile ./
COPY . ./
RUN apk add make \
	&& make install

## BUILD STAGE TWO

FROM kraken-node
WORKDIR /usr/src/app
COPY --from=kraken-node ./ /usr/src/app
RUN make build
CMD docker images