
docker.build:
	docker build -f Dockerfile.converter -t recast/converter .

docker.test:
	docker build -f Dockerfile.converter --build-arg BUILD_ENV=test -t recast/converter .
	docker run recast/converter pnpm test

docker.test.artifacts:
	mkdir -p _test_artifacts_
	docker build -f Dockerfile.converter --build-arg BUILD_ENV=test -t recast/converter .
	docker run -e TEST_DIR=/tmp/tests -v "$$(pwd)/_test_artifacts_:/tmp/tests" recast/converter pnpm test

