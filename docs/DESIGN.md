# Direção de arte

## Tese

Um espaço editorial calmo: papel, cerâmica, alimento e luz natural. O site apresenta Fernanda com proximidade, preservando a marca fornecida e evitando a estética de clínica genérica ou promessa de transformação corporal.

## Arquitetura de conteúdo

1. **Abertura:** “Nutrir o corpo. Acolher a vida.” e entrada para o acompanhamento.
2. **Meu olhar:** apresentação da profissional e da proposta de cuidado. A marca ocupa o espaço visual; não existe retrato artificial apresentado como Fernanda.
3. **Para você:** três pontos de partida, navegáveis por teclado, sem diagnosticar ou prescrever.
4. **Acompanhamento:** escuta, construção e continuidade.
5. **Manifesto visual:** espaço para o prazer e a vida à mesa.
6. **Dúvidas:** expectativas e orientações práticas para o primeiro contato.
7. **Contato:** canal só é ativado após o preenchimento do número real.

## Sistema visual

- Base de papel `#f6f4ed`; superfície secundária `#eeece2`.
- Verde-oliva `#4d573f`; fundo profundo `#394531`.
- Rosé de texto `#955a4d`, mais escuro para contraste; blush de superfície `#ead8ce`.
- Cormorant Garamond nos títulos; DM Sans na leitura e nos controles. Fontes locais.
- Fotografia com luz natural, linho e cerâmica. Nada de balanças, métricas inventadas, “antes e depois” ou depoimentos fictícios.

## Movimento

Assinatura: a órbita da marca avança conforme as três etapas entram na leitura. Ela orienta, não captura o scroll.

Apoio: enquadramento discreto da foto do hero e entradas suaves pontuais. As animações de scroll usam `requestAnimationFrame` sob demanda, sem loop permanente, sem biblioteca, sem interceptar wheel ou touch.

Em telas pequenas, a história vira uma sequência vertical e a órbita é removida. A foto fica estática. Com movimento reduzido, transformações e transições são desativadas e todo o conteúdo aparece.

## Referências estudadas, somente leitura

- **siteOficial:** arquitetura declarada, manifesto de design, cookbook, código de movimento, tratamento de movimento reduzido e distinção desktop/mobile.
- **siteCaligulas:** estrutura estática modular, configuração pública centralizada, menu, hero vinculado ao scroll e revelações com IntersectionObserver.
- **sitePatricia:** composição editorial, Cormorant/DM Sans e cuidado com CTA e leitura no mobile.
- **SiteLara:** microsite leve, assets WebP e interações pontuais.

A referência orienta o método. A paleta, as imagens, o ritmo, o conteúdo e os componentes foram criados para a identidade de Fernanda.

## Informações ainda não fornecidas

WhatsApp, CRN, perfil oficial de Instagram, endereço, modalidades, valores, currículo e retrato profissional. O site não preenche esses dados com suposições. A profissional deve validar a apresentação e a descrição do acompanhamento antes do lançamento.
