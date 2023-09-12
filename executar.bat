docker build -t database -f dockerfileData .
docker build -t backend -f dockerfileCode .
docker-compose up 