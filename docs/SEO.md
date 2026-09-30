# SEO e descoberta por mecanismos de busca e IA

## O que foi implementado

- Sete páginas indexáveis com URLs próprias, HTML completo e conteúdo legível sem JavaScript.
- Título e descrição específicos por página, idioma `pt-BR`, um H1, navegação interna e breadcrumbs.
- Canonical absoluto, Open Graph, cartão para compartilhamento e imagem local.
- JSON-LD consistente com o conteúdo: `Person`, `LocalBusiness`, `WebSite`, páginas e breadcrumbs; perguntas visíveis na página de dúvidas.
- Nome, CRN, telefone, e-mail e endereço no HTML. Sem notas, avaliações, especialidades, preços, horários ou coordenadas inventados.
- Sitemap com URLs canônicas e datas reais de alteração do conteúdo. Privacidade e 404 ficam fora dele e usam `noindex,follow`.
- Fontes locais, imagens responsivas, dimensões declaradas e carregamento tardio das imagens secundárias.
- `llms.txt`, versões Markdown e links de descoberta no HTML, gerados das mesmas fontes das páginas.

Não há promessa de indexação, posição em buscas ou recomendação por assistentes. A qualidade da informação, reputação real e consistência dos dados continuam essenciais.

## Domínio próprio e robots.txt

O endereço oficial configurado é **`https://nutrifernandalemos.com.br/`**, servido pelo GitHub Pages. Canonical, Open Graph, JSON-LD, sitemap, Markdown e llms usam esse domínio, sem o caminho `/siteMamae/`.

Depois da conexão DNS, o arquivo estará em **`https://nutrifernandalemos.com.br/robots.txt`**, na raiz da origem, onde suas regras são efetivas. A configuração do domínio e a ativação de HTTPS estão descritas em [Domínio e hospedagem](DOMAIN.md).

O endereço anterior `https://jiyuhenko.github.io/siteMamae/` usava um subdiretório: seu `robots.txt` não controlava a origem compartilhada. O repositório de usuário `JiyuHenko.github.io` continua independente deste projeto.

Referência: [Google — localização e criação do robots.txt](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt).

## Sitemap e Search Console

Após conectar o DNS e confirmar HTTPS:

1. Confirmar o endereço definitivo e verificar uma propriedade no Search Console.
2. Enviar `https://nutrifernandalemos.com.br/sitemap.xml`.
3. Inspecionar a página inicial, contato e as páginas principais; corrigir eventuais problemas indicados pelo Google.
4. Acompanhar indexação e pesquisas reais antes de ampliar conteúdo.

`lastmod` vem de `content/pages.js`; não muda a cada build. O sitemap é uma indicação de descoberta, não uma garantia. Referência: [Google — criar e enviar um sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## llms.txt e IA

`llms.txt` é uma proposta de formato para fornecer informações e links de forma legível. As versões Markdown são alternativas das páginas existentes; não contêm instruções escondidas para recomendar a profissional.

O Google informa que seus recursos de IA usam as práticas normais de SEO e não exigem um arquivo especial de IA. A presença de `llms.txt` não deve ser tratada como fator de posicionamento ou integração garantida com qualquer assistente.

O robots inclui permissão para `OAI-SearchBot`, responsável por descoberta em buscas da OpenAI. `GPTBot` tem finalidade distinta. A política geral atual permite rastreadores; qualquer decisão futura de bloqueio de treinamento deve ser tratada separadamente da busca e configurada em um robots efetivo.

Referências: [proposta llms.txt](https://llmstxt.org/), [Google — recursos de IA e o site](https://developers.google.com/search/docs/appearance/ai-features), [OpenAI — documentação dos robôs](https://developers.openai.com/api/docs/bots).

## Perfil da Empresa e próximos conteúdos

O cadastro no Google fica para o proprietário. Ao cadastrá-lo, manter nome profissional, endereço e telefone consistentes com o site e preencher horários e serviços reais. O mapa atual consulta o endereço; não afirma existir um cadastro comercial ou um ponto verificado.

Quando houver um link confirmado do Perfil da Empresa, ele poderá substituir a busca textual do mapa e ser acrescentado aos perfis oficiais nos dados estruturados.

Priorizar materiais úteis, perguntas reais e artigos revisados pela profissional. Publicar páginas repetidas para variações de palavras-chave ou inventar avaliações não melhora a qualidade do site. Veja [guia de conteúdo](CONTENT.md).

## O que não foi executado

A hospedagem continua no GitHub Pages. O repositório está preparado para `nutrifernandalemos.com.br`, com `CNAME` e URLs atualizados. DNS e certificado devem ser confirmados após a configuração no provedor. Não foi criada propriedade do Search Console, solicitação de indexação ou Perfil da Empresa.
