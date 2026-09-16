# Validação da versão multipágina

Revisão realizada em 16/09/2026, na branch `codex/rosa-multipaginas-seo`.

## Verificação automatizada

- `npm run build`: nove páginas HTML, sete versões Markdown, sitemap, robots e llms gerados das fontes compartilhadas.
- `npm run check`: sintaxe de módulos, imports, assets locais, links, IDs, âncoras, referências ARIA, idioma, H1, metadados, JSON-LD e dimensões dos ícones.
- `npm test`: oito testes aprovados. Cobrem contato incompleto, codificação da mensagem, painéis e teclado, metadados exclusivos, rotas canônicas, cobertura do sitemap e Markdown, dados profissionais no schema, FAQ visível e carregamento opcional do mapa.
- Os testes dos painéis usam os módulos reais com um modelo mínimo de eventos DOM. Não simulam layout ou leitor de tela.
- HTTP local: raiz, subdiretório `/siteMamae/`, página profunda, Markdown, contato, sitemap e llms retornam 200; página inexistente retorna 404; arquivos internos do Git retornam 403.
- Geração determinística verificada: executar novamente o build não altera os arquivos já gerados. O workflow também confere essa condição antes das demais verificações.

## Revisão no navegador

- Abertura e rodapé no desktop: composição, navegação, contatos, endereço e retorno ao topo.
- Prévias com largura de 390 e 320 pixels: rodapé, contatos legíveis, menu e barra fixa de WhatsApp. Sem transbordamento horizontal detectado nessas páginas.
- Página de conteúdos em 768 pixels: cabeçalho, título e composição da leitura em destaque.
- Menu móvel: abertura, navegação entre páginas e fechamento com Escape.
- Assuntos: seleção de “Meu bem-estar”, navegação ao contato e preservação da escolha no diálogo e no destino do WhatsApp.
- Diálogo: alteração para “Outra dúvida”, atualização da mensagem e fechamento por Escape. Nenhuma mensagem foi enviada.
- Mapa: carregamento após clique, exibição em Passos e links independentes para abrir o mapa e traçar rota. Não representa validação cadastral de um Perfil da Empresa.

A revisão usa Chromium e prévias de largura limitada. Não equivale a teste em aparelhos físicos ou a uma auditoria completa de acessibilidade.

## Limites e próximos passos

- Sem auditoria Lighthouse, leitor de tela ou teste em todos os navegadores.
- O conteúdo e os contatos essenciais estão no HTML; os fallbacks sem JavaScript e para movimento reduzido foram preservados no código, mas não houve uma sessão separada com esses modos simulados.
- Não foram feitas verificações de rich results em produção, submissão ao Search Console, pedido de indexação ou cadastro no Google.
- A qualidade da geocodificação é responsabilidade do provedor do mapa. A página orienta confirmar local e horário ao agendar.
- A profissional e o proprietário devem revisar a apresentação, o endereço e o funcionamento do atendimento antes da publicação final.

## Publicação

A branch contém a implementação pronta para revisão. A configuração pública do Pages não foi alterada. A limitação do robots em subdiretórios está explicada em [SEO](SEO.md).
