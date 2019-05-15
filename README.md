## Bitbucket Pipeline Dashboard [![Build Status](https://travis-ci.com/sweetim/bitbucket_pipeline_dashboard.svg?branch=master)](https://travis-ci.com/sweetim/bitbucket_pipeline_dashboard)

This application is created to have a centralized view of the latest pipeline status for every selected repository

I developed this while waiting for [issue #12765](https://bitbucket.org/site/master/issues/12765/pipeline-wallboards) to be closed by the Bitbucket development team

### Running Locally

Install packages:

`npm install`

Then run

`npm run serve`

### Running with Docker

Build the docker image:

`docker build -t bb-pipeline-dashboard .`

And run with target port 8080:

```
docker run -d \
    --name bb-pipeline-dashboard \
    -p 8080:80 \
    --restart unless-stopped \
    bb-pipeline-dashboard
```

App will be available at `http://localhost:8080/bitbucket`
