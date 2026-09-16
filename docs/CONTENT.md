# Como continuar o conteúdo

## Alterar uma página

1. Edite o fragmento correspondente em `content/pages/`.
2. Revise título e descrição em `content/pages.js`.
3. Atualize `updated` somente se houve mudança significativa no conteúdo; não use a data de cada build.
4. Execute `npm run build`, `npm run check` e `npm test`.
5. Revise a página no navegador e versione fontes e arquivos gerados juntos.

O build gera HTML pronto para o Pages, metadados, sitemap, índice `llms.txt` e uma versão Markdown de cada página indexável. Cabeçalho, rodapé, identificação profissional e contatos são compartilhados.

## Adicionar uma página ou leitura

1. Acrescente uma entrada em `content/pages.js`, com `id` exclusivo, `path` com barra final, `label`, `title`, `description` e `updated`.
2. Crie `content/pages/<id>.html`. Para uma leitura dentro de Conteúdos, use `parent: 'conteudos'` e caminho `conteudos/<slug>/`.
3. Se declarar `heading`, o gerador cria o H1. O fragmento começa em H2. A página inicial é uma exceção e contém seu próprio H1.
4. Acrescente um link visível na página de conteúdos e em outras páginas relacionadas. Entrar no sitemap não substitui a navegação.
5. Gere e valide. Se remover uma rota, remova também os HTML e Markdown antigos: o gerador não apaga arquivos automaticamente.

Tokens disponíveis incluem `{{root}}`, `{{name}}`, `{{crn}}`, `{{email}}`, `{{phoneLabel}}`, `{{streetAddress}}`, `{{maps}}` e `{{directions}}`. `{{root}}` produz o caminho relativo adequado mesmo em páginas profundas. Valores são escapados para HTML pelo gerador.

Para dados repetidos, use `config.js`. Não mantenha contatos divergentes em vários lugares. Os campos de endereço detalhado e `address` devem ser atualizados juntos.

## Preparar materiais da profissional

- Apresentação e currículo: usar somente formação, experiência e serviços confirmados.
- Fotos: priorizar imagens reais, com autorização de uso, descrição adequada e versões otimizadas.
- Artigos de saúde: revisão de Fernanda, fontes confiáveis, autoria e data de revisão visíveis. A autoria profissional só deve ser atribuída quando verdadeira.
- Perguntas: acrescentar dúvidas reais sem expor dados de pacientes. O schema de FAQ é gerado das perguntas e respostas visíveis.
- Avaliações: não criar depoimentos, notas, resultados ou números fictícios.

O guia inicial de primeira consulta é informativo e administrativo. Não constitui uma biblioteca de orientações clínicas nem substitui a avaliação individual.

## Ao mudar o domínio

Atualize `siteUrl` em `config.js` e execute o build. Canonicals, dados estruturados, compartilhamento, sitemap e links de descoberta serão regenerados. O endereço base pode conter `/siteMamae/` ou ser a raiz de um domínio próprio.

Depois de publicar no novo domínio, confira os redirecionamentos, configure a propriedade correspondente no Search Console e envie o novo sitemap. Veja [SEO](SEO.md).
