import axios from 'axios';

async function httpsMiddleware(request: any, response: any, next: any) {
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

export default httpsMiddleware;