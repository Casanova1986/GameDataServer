FROM node:16-alpine3.12

# Create app directory
WORKDIR /home/rod
COPY package.json .
COPY tsconfig.json .
COPY src .
COPY build .

RUN npm install
RUN npm run build
COPY .env.example ./.env
# Dont know why this file got missed from build
COPY src/GameData/Reward/Rewards.json build/GameData/Reward/Rewards.json

ARG USER=apero
# add new user
RUN adduser -D $USER \
        && mkdir -p /etc/sudoers.d \
        && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
        && chmod 0440 /etc/sudoers.d/$USER
USER $USER

EXPOSE 80
CMD ["npm", "start"]
