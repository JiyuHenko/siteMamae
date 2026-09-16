# Validação da entrega

## Verificado

- `npm run check`: sintaxe de todos os módulos JavaScript; existência de imagens, fontes e imports; IDs únicos; destinos das âncoras; referências de `aria-controls` e `aria-labelledby`; idioma; um H1 por página; JSON-LD; dimensões declaradas dos ícones.
- `npm test`: quatro testes aprovados para contatos incompletos, codificação segura da mensagem, estado exclusivo dos painéis e navegação por setas/Home/End.
- Os testes do seletor usam o HTML real e o módulo real em um modelo mínimo de eventos DOM. Não simulam layout, CSS ou leitor de tela.
- Todos os assets são locais. Imagens possuem dimensões explícitas, descrições e variantes responsivas. Somente a fotografia do hero recebe prioridade de carregamento.
- Contraste calculado dos tokens de texto: rosé `#955a4d` sobre papel `#f6f4ed`, 4,96:1; sobre superfície `#eeece2`, 4,61:1. Isso não constitui auditoria completa de acessibilidade.
- Código específico para 320–370 px, celular até 760 px, faixa intermediária de 761–900 px e desktop. Movimento reduzido possui fallback estático.
- Não há coleta de dados clínicos, formulários de envio, pixels, trackers, cookies de aplicação ou dados pessoais em armazenamento local.
- Nenhum dos quatro repositórios de referência recebeu alterações.

- Servidor local verificado por HTTP: início na raiz e no subdiretório, módulo JS e privacidade retornam 200; página inexistente retorna 404; arquivos internos do Git retornam 403.

## Limite da revisão

O navegador disponível na sessão bloqueou o acesso à prévia local. Portanto, **não foi realizada revisão visual renderizada em desktop, tablet ou celular**, nem auditoria Lighthouse ou teste com leitor de tela. Não foram inventadas capturas de tela ou pontuações.

Após publicar uma prévia, revisar 1440 px, 820 px, 390 px e 320 px, com foco nos títulos, enquadramento das fotos, menu, sequência de etapas, FAQ e diálogo de contato. Conferir foco e zoom de 200%, além de movimento reduzido e JavaScript desativado.

## Dados necessários para lançar o contato

Preencher o WhatsApp profissional e o CRN em `config.js`. Adicionar o perfil oficial de Instagram se desejado. Confirmar a URL definitiva e executar `npm run seo`. Validar com Fernanda o texto de apresentação e a descrição do acompanhamento.

O repositório contém a implementação. A configuração da hospedagem pública não foi alterada nesta entrega.
