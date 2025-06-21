# Como hospedar o app independente do Replit

## Opção 1: Hospedar gratuitamente (Recomendado)

### Netlify (Gratuito)
1. Faça o build do projeto:
   ```bash
   npm run build
   ```
2. Acesse [netlify.com](https://netlify.com)
3. Arraste a pasta `dist` para o Netlify
4. Receba o link público gratuito

### Vercel (Gratuito)
1. Acesse [vercel.com](https://vercel.com)
2. Conecte este repositório
3. Deploy automático com link público

## Opção 2: Executar localmente

### No seu computador
```bash
npm install
npm run build
npm start
```
Acesse: http://localhost:5000

### Compartilhar na rede local
```bash
npm run dev -- --host 0.0.0.0
```
Outros dispositivos na mesma rede podem acessar via seu IP

## Opção 3: Exportar versão estática

Para criar uma versão que funciona apenas abrindo arquivos HTML:

1. Build do projeto:
   ```bash
   npm run build
   ```

2. A pasta `dist` conterá todos os arquivos necessários

3. Você pode:
   - Hospedar em qualquer servidor web
   - Abrir diretamente no navegador
   - Colocar em um pendrive e executar offline

## Arquivos importantes gerados:
- `dist/index.html` - Página principal
- `dist/assets/` - CSS, JS e outros recursos
- `dist/manifest.json` - Configuração do PWA
- `dist/sw.js` - Service Worker para funcionamento offline

## Para usar no celular:
1. Hospede os arquivos da pasta `dist` em qualquer servidor
2. Acesse o link no celular
3. Instale como PWA seguindo as instruções do app