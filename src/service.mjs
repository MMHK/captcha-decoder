import fastify from 'fastify';
import { ChatInterface} from './llm.mjs';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const app = fastify();

await app.register(fastifySwagger, {
  swagger: {
      info: {
          title: 'Captcha Decoder API',
          description: 'API documentation for the Captcha Decoder service',
          version: '1.0.0'
      },
      tags: [
        { name: 'Captcha Decoder', description: 'API for decoding CAPTCHA images' }
      ],
      consumes: ['application/json'],
      produces: ['application/json'],
  }
});

await app.register(fastifySwaggerUi, {
  routePrefix: '/swagger',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next(); },
    preHandler: function (request, reply, next) { next(); }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  exposeRoute: true
});

app.post('/api/recognize', {
    schema: {
        tags: ['Captcha Decoder'],
        summary: 'Recognize a CAPTCHA image',
        description: 'Recognize a CAPTCHA image and return the result',
        body: {
            type: 'object',
            required: ['imageUrl'],
            properties: {
                imageUrl: {
                    type: 'string',
                    description: 'URL or Data URL of the CAPTCHA image to be recognized'
                }
            }
        },
        response: {
            default: {
                type: 'object',
                properties: {
                    text: { type: 'string' },
                    status: { type: 'boolean' }
                }
            }
        }
    },
}, async (request, reply) => {
    const { imageUrl } = request.body;

    try {
        const decoder = new ChatInterface();
        const result = await decoder.recognizeCaptcha(imageUrl);
        if (result) {
            return reply.send({ text: result, status: true });
        }
    } catch (error) {
        return reply.status(500).send({ error: error.message });
    }

    return reply.status(500).send({ error: 'Failed to recognize CAPTCHA' });
});

const StartService = async (port = null) => {
    if (!port) {
        port = process.env.PORT || 3000;
    }
    await app.ready()
    app.listen(port, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });

}

export default StartService;
export { StartService };
