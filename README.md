# blanket

Wrapper for warming up Google Cloud Functions and Firebase Functions
  
    npm i @foundryapp/blanket
<br/>

    yarn add @foundryapp/blanket


Use as a middleware:

    import blanket from '@foundryapp/blanket';
    
    const helloWorld = functions.https.onRequest((req, res) => {
      blanket(req, res, () => {
        // your function code
      });
    });

The middleware expects `warmUp` object in the request body that contains `url` of the function where is it used and `concurrency` which specifies the number of concurrent function instancs that you want to keep warm.

Corrrect warm up invocation ends with a 204 status code.

The `warmUp` object and the whole invocation handling will be handled by `@foundryapp/monitoring-cli` (https://github.com/fireshaker/blanket-cli) and `@foundryapp/monitoring-backend` (https://github.com/fireshaker/blanket-backend) packages. The initial function invocation could be handled on a server in the future.

Alternatives to current recursive invocation:
- add delay to all functions and invoke them in paralell
- let all functions connect to some endpoint before they can exit - when invoking in parallel add the condition that they can exit the endpoint only when there is x functions connected at the same time.

Inspired by personal need and:

- https://www.jeremydaly.com/lambda-warmer-optimize-aws-lambda-function-cold-starts/
- https://github.com/jeremydaly/lambda-warmer


