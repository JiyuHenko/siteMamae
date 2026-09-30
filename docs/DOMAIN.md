# Domínio e GitHub Pages

Preparação realizada em 30/09/2026 para **https://nutrifernandalemos.com.br/**. A hospedagem continua no GitHub Pages. Projetos futuros podem usar outros subdomínios desse domínio.

## Configuração no repositório

- `config.js`: `siteUrl` aponta para `https://nutrifernandalemos.com.br`.
- `CNAME`: contém somente `nutrifernandalemos.com.br`, sem protocolo nem caminho.
- HTML, sitemap, robots, Markdown, llms e dados estruturados são gerados para a raiz do domínio, sem `/siteMamae/`.
- Links de navegação, CSS, JavaScript, fontes e imagens usam caminhos relativos. O visual e o conteúdo são preservados.
- `main` e `codex/rosa-multipaginas-seo` recebem a mesma configuração. A origem atual do Pages é a segunda branch, na raiz.

O GitHub Pages, quando publicado de uma branch, permite configurar o domínio pelo `CNAME` versionado. O domínio anterior não será usado.

## Registro.br: DNS

O proprietário fará a compra e configurará o DNS quando o painel liberar a zona avançada. Não é necessário fornecer acesso à conta.

No painel de `nutrifernandalemos.com.br`, abra a configuração de DNS e **Editar zona**. Cadastre estas cinco entradas:

| Tipo | Nome | Destino |
| --- | --- | --- |
| A | raiz | `185.199.108.153` |
| A | raiz | `185.199.109.153` |
| A | raiz | `185.199.110.153` |
| A | raiz | `185.199.111.153` |
| CNAME | `www` | `jiyuhenko.github.io` |

Para a raiz, deixe o campo Nome vazio no Registro.br; em painéis que usam esse símbolo, a raiz é representada por `@`. O CNAME de `www` usa um hostname, sem `https://` e sem `/siteMamae`.

As quatro entradas A atendem o domínio sem `www`. O CNAME atende a versão com `www`, que o GitHub Pages redireciona para o domínio oficial sem `www`.

Se houver registros de estacionamento para a raiz ou para `www`, substitua apenas as entradas que conflitam com estas. Preserve registros de outros serviços, como e-mail. Não trocar os servidores de nomes nem criar um CNAME na raiz.

IPv6 é opcional. Se desejar ativá-lo, adicione também quatro registros AAAA na raiz: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` e `2606:50c0:8003::153`. Os cinco registros da tabela são suficientes para a conexão por IPv4.

## Confirmar e ativar HTTPS

1. No repositório, abra **Settings → Pages** e confirme **Custom domain: `nutrifernandalemos.com.br`**.
2. Salve os registros na zona DNS e aguarde a propagação. O GitHub informa que alterações DNS podem levar até 24 horas.
3. Quando o GitHub concluir a verificação DNS e emitir o certificado, habilite **Enforce HTTPS** se essa opção ainda não estiver marcada.
4. Confira a página inicial, `/contato/`, `/duvidas/`, `/robots.txt` e `/sitemap.xml` no novo endereço, além da versão com `www`.

Enquanto o DNS não apontar para o GitHub Pages, o novo domínio não estará acessível. O endereço antigo do Pages pode redirecionar para o domínio configurado.

## SEO após a conexão

Verificar a propriedade do novo domínio no Search Console e enviar **https://nutrifernandalemos.com.br/sitemap.xml**. O `robots.txt` passa a estar na raiz da origem do site. Futuras referências externas e o link da bio do Instagram devem usar o novo endereço.

## Referências

- [GitHub — gerenciar um domínio personalizado e registros A/CNAME](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
- [GitHub — arquivo CNAME e solução de problemas](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages).

DNS, emissão do certificado e disponibilidade pública do domínio devem ser confirmados após a configuração pelo proprietário; preparar o repositório não confirma essas etapas externas.
