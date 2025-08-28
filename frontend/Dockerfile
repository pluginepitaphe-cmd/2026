# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json yarn.lock ./

# Installation des dépendances
RUN yarn install --frozen-lockfile

# Copie du code source
COPY . .

# Build de production
RUN yarn build

# Production stage
FROM node:18-alpine as production

WORKDIR /app

# Installation de serve pour servir les fichiers statiques
RUN yarn global add serve

# Copie des fichiers buildés
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["serve", "-s", "dist", "-l", "3000"]