
docker.build:
	docker build -f Dockerfile.converter -t recast/converter .

docker.test.build:
	docker build -f Dockerfile.converter --target builder -t recast/converter-deps .

docker.test:
	docker run --rm -e TEST_DIR=/tmp/tests -v "$$(pwd)/_test_artifacts_:/tmp/tests" -v $$(pwd):/usr/src/app -v /usr/src/app/node_modules -w /usr/src/app recast/converter-deps:latest pnpm test # -- -t "text/plain"

docker.test.artifacts:
	mkdir -p _test_artifacts_
	docker build -f Dockerfile.converter --build-arg BUILD_ENV=test -t recast/converter .
	docker run -e TEST_DIR=/tmp/tests -v "$$(pwd)/_test_artifacts_:/tmp/tests" recast/converter pnpm test

