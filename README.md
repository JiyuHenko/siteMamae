# Fernanda Lemos · Nutricionista

Site institucional estático criado exclusivamente no `siteMamae`, com a identidade visual enviada pela família. HTML semântico, CSS e JavaScript modular, sem framework, sem build e sem dependências de produção.

**Estado da entrega:** implementação pronta para publicação. WhatsApp, Instagram, CRN, e-mail e endereço profissional foram configurados com os dados confirmados de Fernanda Lemos. O fluxo de agendamento direciona para o WhatsApp e não existe formulário que finja enviar ou confirmar uma consulta.

## Executar

Com Node.js 20 ou superior:

```bash
npm run dev
```

Abra `http://localhost:4173/siteMamae/`. Também funciona na raiz do servidor. Não é necessário executar `npm install`.

```bash
npm run check  # arquivos, links, fontes, módulos, âncoras, ARIA e metadados
npm test       # lógica de contato e seleção de assuntos por teclado
```

Os testes não substituem revisão visual nem avaliação com leitor de tela.

## Dados profissionais

Os dados públicos ficam centralizados em `config.js`:

- Nome: Fernanda Lemos
- Registro: CRN 9-30894
- WhatsApp profissional: +55 35 99981-9701
- Instagram: `@nutri.fernandalemos`
- E-mail: `fernandamlsf@gmail.com`
- Endereço informado: Rua Boa Vista, 135, apto 301 · Santa Casa · Passos - MG · CEP 37904-018
- URL preparada para produção: `https://jiyuhenko.github.io/siteMamae`

O botão de contato monta uma mensagem inicial no WhatsApp conforme o assunto escolhido pelo visitante. Instagram, e-mail, telefone, endereço e identificação profissional também são apresentados no site.

Após definir ou alterar o domínio:

```bash
npm run seo
npm run check
```

Esse comando atualiza canonical, Open Graph, sitemap, robots e os caminhos absolutos da página 404. Não publica o site.

## Publicação

O projeto está pronto para hospedagem estática no GitHub Pages. No repositório, configure **Settings → Pages → Deploy from a branch → main → /(root)**. Depois de salvar, a URL esperada é:

`https://jiyuhenko.github.io/siteMamae/`

O workflow incluído verifica qualidade; a publicação do Pages continua controlada pelas configurações do próprio repositório.

## Estrutura

```text
index.html              Conteúdo, SEO inicial e estrutura semântica
privacidade.html        Explicação do funcionamento e dos dados
404.html                Página de erro com retorno ao início
config.js               Dados públicos de contato e URL
assets/css/styles.css   Tokens, seções, componentes e responsividade
assets/js/              Navegação, movimento, seletor e contato
assets/fonts/           Fontes locais e licenças
assets/img/             Marca otimizada, fotografias e ícones
assets/brand/           Arquivos originais da identidade, preservados
docs/                   Direção de arte, origem dos assets e validação
scripts/                Servidor local, checagens e sincronização de SEO
tests/                  Testes sem dependências externas
```

## Interações

- Entrada suave do hero e revelações pontuais de seção.
- Foto com deslocamento discreto em desktop; selo acompanha a rolagem.
- Órbita que indica o avanço nas três etapas do acompanhamento.
- Seletor de assuntos com clique, setas, Home e End.
- Menu móvel com fechamento por Escape, seleção de link e saída de foco.
- FAQ com `details` nativo.
- Diálogo de contato com foco contido pelo navegador e retorno ao botão de origem.
- `prefers-reduced-motion` respeitado, inclusive quando a preferência muda durante a visita.
- Com JavaScript desativado, conteúdo, navegação, FAQ e todos os painéis continuam acessíveis.

## Referências

Foram lidos `siteOficial`, `siteCaligulas`, `sitePatricia` e `SiteLara`. Nenhum deles foi alterado. A arquitetura e o uso comedido das animações foram estudados; não foram reaproveitados dados de contato ou conteúdo comercial de outros clientes.

Consulte [direção de arte](docs/DESIGN.md), [origem dos assets](docs/ASSETS.md) e [validação](docs/VALIDATION.md).