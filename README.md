# solid-rollup-aws-lambda

This project aims to render a [solidjs](https://www.solidjs.com) site as static html and return it from an AWS Lambda function, built using [aws sam](https://aws.amazon.com/serverless/sam/).

- hello-world - Code for the application's Lambda function written in TypeScript.
- template.yaml - AWS Sam serverless model

## Project setup

```
project
|   template.yml // aws sam serverless model
|
└───lambda
    │   tsconfig.json
    │   package.json  // with esbuild and @aws-sdk but no solid
    │   lambda.ts     // fetches data, imports the mjs from the ssg folder and is called on aws
    │
    └───site
    │   │   package.json // with solid and vite in this folder so I can develop locally
    │   |   tsconfig.json
    │   │   vite.config.ts.
    │   │
    │   └───src
    │       │   index.tsx
    │       │   App.tsx
    │       │   ...
    │
    └───site-js
    │   │   package.json // same as site, just as javascript
    │   |   jsconfig.json
    │   │   vite.config.ts.
    │   │
    │   └───src
    │       │   index.jsx
    │       │   App.js  // if we rename this to App.jsx the rollup won't succeed
    │       │   ...
    │
    └───ssg
        │   package.json // with solid, rollup and babel
        │   index.jsx // import App from "../site-js/src/App";
        │   index.tsx // import App from "../site/src/App";
        │   rollup.config.js // so I can run rollup -c rollup.config.js to create the cjs file I can import in the lambda.ts
```

## build the rollup-ssg module

```bash
cd lambda/ssg
yarn build
# or
npm run build
# or
rollup -c rollup.config.js
```

## Deploy the sample application

To use the SAM CLI, you need the following tools.

- SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Node.js - [Install Node.js 18](https://nodejs.org/en/), including the NPM package management tool.
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
solid-rollup-aws-lambda$ sam build
```

The SAM CLI installs dependencies defined in `hello-world/package.json`, compiles TypeScript with esbuild, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
solid-rollup-aws-lambda$ sam local invoke HelloWorldFunction --event events/event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
solid-rollup-aws-lambda$ sam local start-api
solid-rollup-aws-lambda$ curl http://localhost:3000/
```

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
Events:
  HelloWorld:
    Type: Api
    Properties:
      Path: /hello
      Method: get
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
