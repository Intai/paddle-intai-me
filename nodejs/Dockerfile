FROM public.ecr.aws/bitnami/node:16

ARG NODE_ENV
ARG NODE_CONFIG_ENV
ARG TIMESTAMP
ARG PORT

ENV NODE_ENV=${NODE_ENV:-production}
ENV NODE_CONFIG_ENV=$NODE_CONFIG_ENV
ENV TIMESTAMP=$TIMESTAMP
ENV PORT=${PORT:-8080}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install --include=dev
RUN npm run build
RUN npm prune

EXPOSE ${PORT:-8080}
CMD npm "$(if [ $NODE_ENV = 'production' ] ; then echo 'start' ; else echo 'run dev'; fi)"
