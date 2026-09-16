# Fernanda Lemos · Nutricionista

Site institucional estático criado exclusivamente no `siteMamae`, com a identidade visual enviada pela família. HTML semântico, CSS e JavaScript modular, sem framework, sem build e sem dependências de produção.

**Estado da entrega:** implementação pronta; WhatsApp, Instagram e CRN aguardam os dados reais. O site informa que o canal de agendamento será divulgado em breve. Não existe formulário que finja enviar ou confirmar uma consulta.

## Executar

Com Node.js 20 ou superior:

```bash
npm run dev
```

Abra `http://localhost:4173/siteMamae/`. Também funciona na raiz do servidor. Não é necessário executar `npm install`.

```bash
npm run check  # arquivos, links, fontes, módulos, âncoras, ARIA e metadados
npm test      # lógica de contato e seleção de assuntos por teclado
```

Os testes não substituem revisão visual nem avaliação com leitor de tela. A revisão visual real ficou pendente porque o navegador disponibilizado na sessão bloqueou URLs locais.

## Configurar contato

Edite `config.js`:

- `whatsapp`: DDI 55 + DDD + número profissional. Com um número completo, o botão de agendamento ativa automaticamente a seleção de assunto e o link para WhatsApp.
- `instagram`: URL HTTPS completa do perfil oficial. O link só aparece se houver um endereço válido do Instagram.
- `crn`: identificação profissional confirmada. Aparece no rodapé após preenchimento.
- `siteUrl`: URL de produção, inicialmente preparada para `https://jiyuhenko.github.io/siteMamae`.

Sem esses dados, não são inventados telefone, especialidade, credenciais, endereço, valores, modalidades de atendimento ou depoimentos. O conteúdo de apresentação é uma proposta editorial e deve ser validado por Fernanda antes do lançamento.

Após definir ou alterar o domínio:

```bash
npm run seo
npm run check
```

Esse comando atualiza canonical, Open Graph, sitemap, robots e os caminhos absolutos da página 404. Não publica o site.

## Publicação

O projeto está pronto para hospedagem estática, inclusive GitHub Pages. Para usar Pages, configure **Settings → Pages → Deploy from a branch → main → /(root)** no próprio repositório. Não há domínio personalizado configurado nem publicação automática adicionada. O workflow incluído somente verifica qualidade.

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
