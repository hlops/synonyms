import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { Storage } from './storage';

// const __dirname = path.resolve();

const opts: FastifyServerOptions = {
  logger: {
    level: 'error',
  },
};
const fastify: FastifyInstance = Fastify(opts);
fastify.register(require('fastify-cors'), {
  // put your options here
})

const storage = new Storage();

fastify.get('/word/:word', async (request, reply) => {
  const params = request.params as { word: string };
  return await storage.get(params.word);
});

export async function startServer(hostName: string, portNumber: number) {
  try {
    await fastify.listen(portNumber, hostName);

    const address = fastify.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    fastify.log.info(`server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
