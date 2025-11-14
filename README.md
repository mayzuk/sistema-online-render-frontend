# Frontend - Sistema de Comunidades (React + Vite + Tailwind)

## Como usar localmente
1. `cd frontend-react`
2. `npm install`
3. Crie um arquivo `.env` com:
   ```
   VITE_API_URL=http://localhost:4000
   ```
4. `npm run dev`

## Como deployar
- Configure a variável de ambiente `VITE_API_URL` apontando para seu backend.
- Build: `npm run build`
- Diretório de publicação: `dist`

Este frontend foi gerado para se integrar ao backend que fornece as rotas `/api/*` descritas no projeto.
