FROM node:18-alpine as runner

WORKDIR /home/captcha-decoder

ENV NODE_ENV production

COPY . .

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && yarn set version stable \
  && chown nextjs:nodejs -Rf /home/captcha-decoder

USER nextjs

RUN yarn install

EXPOSE 3000

ENV PORT=3000 \
NODE_ENV=production \
OPENAI_API_KEY= \
AZURE_OPENAI_API_KEY= \
AZURE_OPENAI_API_INSTANCE_NAME= \
AZURE_OPENAI_DEPLOYMENT_NAME= \
AZURE_OPENAI_API_VERSION=

CMD yarn start
