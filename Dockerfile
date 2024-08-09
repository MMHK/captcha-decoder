FROM node:alpine as builder

WORKDIR /home/captcha-decoder

COPY . .

RUN yarn global add @vercel/ncc \
    && yarn install \
    && yarn build

FROM node:alpine as runner

WORKDIR /home/captcha-decoder

ENV NODE_ENV production

COPY --from=builder /home/captcha-decoder/dist /home/captcha-decoder/dist

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && chown nextjs:nodejs /home/captcha-decoder


USER nextjs

EXPOSE 3000

ENV PORT=3000 \
OPENAI_API_KEY= \
AZURE_OPENAI_API_KEY= \
AZURE_OPENAI_API_INSTANCE_NAME= \
AZURE_OPENAI_DEPLOYMENT_NAME= \
AZURE_OPENAI_API_VERSION=

CMD node ./dist/index.js
