# Domínio e GitHub Pages

Preparação realizada em 30/09/2026 para **https://nutri.fernandalemos.com.br/**. A hospedagem continua no GitHub Pages. O domínio principal `fernandalemos.com.br` e outros subdomínios podem receber projetos independentes.

## Configuração no repositório

- `config.js`: `siteUrl` aponta para `https://nutri.fernandalemos.com.br`.
- `CNAME`: contém somente `nutri.fernandalemos.com.br`, sem protocolo nem caminho.
- HTML, sitemap, robots, Markdown, llms e dados estruturados são gerados para a raiz do subdomínio, sem `/siteMamae/`.
- Links de navegação, CSS, JavaScript, fontes e imagens usam caminhos relativos. O visual e o conteúdo são preservados.
- `main` e `codex/rosa-multipaginas-seo` recebem a mesma configuração. A origem atual do Pages é a segunda branch, na raiz.

O GitHub Pages, quando publicado de uma branch, permite configurar o domínio pelo `CNAME` versionado. Não mudar para outro provedor de hospedagem nem para um workflow de deploy personalizado para esta conexão.

## Registro.br: DNS

No painel do domínio `fernandalemos.com.br`, abra a configuração de DNS e **Editar zona**. Se o painel estiver no modo simplificado, use **Modo avançado** para cadastrar o registro. Antes de salvar, preserve as entradas existentes de outros serviços.

Cadastre apenas esta entrada para o site:

| Tipo | Nome | Destino |
| --- | --- | --- |
| CNAME | `nutri` | `jiyuhenko.github.io` |

Se o painel pedir o nome completo, use `nutri.fernandalemos.com.br`. O destino é um hostname, sem `https://` e sem `/siteMamae`. Não cadastrar esse registro em `@`, `www` ou `*`. Se já existir outra entrada para o nome exato `nutri`, ela precisa ser revisada: um CNAME não pode coexistir com A, AAAA ou outro CNAME para o mesmo nome.

Se o Registro.br informar que o DNS é servido por outros servidores, a entrada deve ser criada no provedor desses servidores; não trocar os servidores de nomes para fazer esta alteração.

## Confirmar e ativar HTTPS

1. No repositório, abra **Settings → Pages** e confirme **Custom domain: `nutri.fernandalemos.com.br`**.
2. Salve o CNAME na zona DNS e aguarde a propagação. O GitHub informa que alterações DNS podem levar até 24 horas.
3. Quando o GitHub concluir a verificação DNS e emitir o certificado, habilite **Enforce HTTPS** se essa opção ainda não estiver marcada.
4. Confira a página inicial, `/contato/`, `/duvidas/`, `/robots.txt` e `/sitemap.xml` no novo endereço.

Enquanto o DNS não apontar para o GitHub Pages, o novo domínio não estará acessível. O endereço antigo do Pages pode redirecionar para o domínio configurado.

## SEO após a conexão

Verificar a propriedade do novo domínio no Search Console e enviar **https://nutri.fernandalemos.com.br/sitemap.xml**. O `robots.txt` passa a estar na raiz da origem do site. Futuras referências externas e o link da bio do Instagram devem usar o novo endereço.

## Referências

- [GitHub — gerenciar um domínio personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
- [GitHub — arquivo CNAME e solução de problemas](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages).

DNS, emissão do certificado e disponibilidade pública do domínio devem ser confirmados após a configuração no provedor; preparar o repositório não confirma essas etapas externas.
