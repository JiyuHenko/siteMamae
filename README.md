# Fernanda Lemos · Nutricionista

Site institucional com identidade rosada, páginas estáticas e contato direto. HTML semântico, CSS e JavaScript modular, sem framework ou dependências de produção. Fontes, imagens e marcas locais.

Esta evolução está na branch **`codex/rosa-multipaginas-seo`**. Ela não altera a configuração do GitHub Pages nem publica em outro serviço.

## Executar e validar

Com Node.js 20 ou superior, sem precisar de `npm install`:

```bash
npm run build  # gera HTML, versões Markdown e arquivos de descoberta
npm run dev    # http://localhost:4173/siteMamae/
npm run check  # sintaxe, assets, links, âncoras, ARIA e metadados
npm test       # oito testes de interações, SEO e mapa
```

O servidor também atende na raiz. Após editar fontes, execute o build e atualize o navegador. `npm run seo` é um alias para a geração completa, mantendo páginas e metadados consistentes.

Os arquivos HTML gerados ficam versionados. O GitHub Pages pode servi-los diretamente, sem instalar pacotes ou executar um build na hospedagem.

## Páginas

| Caminho | Conteúdo |
| --- | --- |
| `/` | Apresentação e caminhos para explorar o site |
| `/sobre/` | Fernanda, registro profissional e proposta de cuidado |
| `/acompanhamento/` | Assuntos, etapas e primeiro contato |
| `/conteudos/` | Índice editorial para crescer com conteúdo real |
| `/conteudos/primeira-consulta/` | Guia prático para organizar o primeiro encontro |
| `/duvidas/` | Perguntas frequentes |
| `/contato/` | Contatos, endereço e mapa |
| `/privacidade.html` | Funcionamento do site e serviços externos |
| `/404.html` | Recuperação de endereços inexistentes |

Os caminhos são relativos à base configurada: `https://jiyuhenko.github.io/siteMamae/`.

## Editar

- **Dados profissionais e domínio:** `config.js`.
- **Rotas, títulos, descrições e datas:** `content/pages.js`.
- **Conteúdo:** `content/pages/*.html`.
- **Cabeçalho, rodapé, metadados e geração:** `scripts/build.mjs`.
- **Estilos:** `assets/css/styles.css` e `assets/css/pages.css`.
- **Interações:** `assets/js/`.

Edite as fontes e execute `npm run build`. Não edite diretamente o HTML gerado: a próxima geração substitui essas alterações. Consulte o [guia de conteúdo](docs/CONTENT.md).

## Contato e localização

Os dados fornecidos estão preenchidos: Fernanda Lemos, CRN 9-30894, WhatsApp `(35) 99981-9701`, `fernandamlsf@gmail.com`, Instagram `@nutri.fernandalemos` e Rua Boa Vista, 135, apto 301, Santa Casa, Passos/MG, CEP 37904-018.

Os contatos estão no HTML e funcionam sem JavaScript. O diálogo ajuda a escolher um assunto e abrir uma mensagem editável no WhatsApp. O site não envia mensagens nem confirma consultas.

O mapa do Google carrega sob escolha do visitante. Links para consultar o endereço e traçar rota ficam sempre disponíveis. A busca usa o endereço informado; não depende de um Perfil da Empresa já cadastrado.

## Revisar no GitHub Pages

Quando decidir exibir esta versão, escolha **Settings → Pages → Deploy from a branch → `codex/rosa-multipaginas-seo` → `/(root)`**. Essa troca fica sob controle do proprietário.

O workflow `site-quality.yml` verifica geração reproduzível, código, links e testes. Ele não faz deploy.

Ao usar domínio próprio, atualize `siteUrl` em `config.js`, execute `npm run build` e versione os resultados. O [guia de SEO](docs/SEO.md) explica canonical, sitemap, descoberta por IA e a particularidade do `robots.txt` em um projeto do GitHub Pages.

## Documentação

- [Direção de arte](docs/DESIGN.md)
- [Origem dos assets](docs/ASSETS.md)
- [Como adicionar conteúdo](docs/CONTENT.md)
- [SEO e descoberta](docs/SEO.md)
- [Validação e limites da revisão](docs/VALIDATION.md)
