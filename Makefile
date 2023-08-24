
docker.build:
	docker build -f Dockerfile.converter -t recast/converter .

docker.test:
	docker build -f Dockerfile.converter --build-arg BUILD_ENV=test -t recast/converter .
	docker run recast/converter pnpm test

