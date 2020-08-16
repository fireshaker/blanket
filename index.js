const axios = require('axios').default;

async function httpsMiddleware(request, response, next) {
  const warmUp = request.body.warmUp;
  if (warmUp) {
    const { concurrency, url } = warmUp;

    if (concurrency > 1) {
      try {
        const result = await axios.post(url, {
          ...request.body,
          warmUp: {
            ...warmUp,
            concurrency: warmUp.concurrency - 1,
          }
        });
        response.status(204).send(`Warm up instance: ${concurrency}`);
      } catch (error) {
        response.status(500).send(`Warm up error: ${error.message}`);
      }
    } else {
      response.status(204).send(`Warm up instance: ${concurrency}`);
    }
  } else {
    next(request, response);
  }
}

module.export = httpsMiddleware;