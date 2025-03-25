// Load environment variables if not in production
import fastify from 'fastify';
import type { FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import dotenv from 'dotenv';

// const { FastifyInstance, FastifyReply, FastifyRequest } = fastify;

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Define server
const server: FastifyInstance = fastify({ 
  logger: true 
});

// Get environment variables with defaults
const PORT: number = parseInt(process.env.PORT || '3000');
const URL: string = process.env.URL || '0.0.0.0';

// Define route interface
interface IRouteResponse {
  message: string;
}

// Define routes
server.get('/', async (request: FastifyRequest, reply: FastifyReply): Promise<IRouteResponse> => {
  return { message: 'hello!' };
});

// Start the server
const start = async (): Promise<void> => {
  try {
    await server.listen({ port: PORT, host: URL });
    console.log(`Server is running on ${URL}:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
