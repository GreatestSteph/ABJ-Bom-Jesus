# ABJ - Administração Bom Jesus

## GRUPO 3

### Integrantes
- **Felipe Natan dos Santos** - RA: 9332414700
- **Stephanie Thawane Cavalcante Madia** - RA: 9332212023
- **Kayann Gabriel Justino Uoya** - RA: 9332111006

### Instituição
**Universidade do Oeste Paulista - Unoeste**
Curso: Engenharia de Software
Disciplina: Prática em Engenharia de Software

---

## Sobre o Projeto

O **ABJ - Administração Bom Jesus** é um sistema de gestão desenvolvido para a Associação Bom Jesus, entidade filantrópica localizada em Álvares Machado - SP, que oferece acolhimento temporário para pessoas em situação de vulnerabilidade social.

### Objetivo

Oferecer uma solução eficiente para o controle de hospedagem, segurança e consumo da associação, substituindo o processo manual por um sistema informatizado que proporcione:

- **Redução de custos operacionais** e tempo de atendimento
- **Gestão organizada** de hóspedes e recursos
- **Segurança de dados** com autenticação e controle de acesso
- **Rastreabilidade completa** de movimentações e histórico
- **Conformidade com a LGPD** no tratamento de dados sensíveis

### Contexto

A Associação Bom Jesus atende pessoas maiores de 18 anos em situação de vulnerabilidade, oferecendo:
- Hospedagem por uma noite (retorno apenas após 3 meses)
- Refeições (café da manhã, almoço, café da tarde, jantar)
- Kit de higiene (limitado a um por hóspede)
- Passagem de transporte (limitada a uma por hóspede)
- Peças de vestuário

O sistema digitaliza e otimiza todo esse processo de gestão.

---

## Funcionalidades Principais

### Gestão de Hóspedes
- Cadastro completo com dados pessoais e socioeconômicos
- Registro de entrada e saída
- Pesquisa de hóspedes cadastrados
- Histórico de hospedagens anteriores

### Controle de Comportamento e Segurança
- Registro de ocorrências e comportamentos
- Sistema de bloqueio automático e manual
- Bloqueio temporário

### Gestão de Recursos
- Controle de quartos e vagas disponíveis
- Registro de consumo (refeições, kits, roupas, transporte)
- Gerenciamento de entrada de produtos
- Controle diário com armazenamento por até 3 anos

### Relatórios Gerenciais
- Relatório de Hospedagens
- Relatório de Consumos
- Relatório de Hóspedes Bloqueados
- Relatório Socioeconômico
- Relatório de Ocorrências
- Geração de PDFs para impressão

---

## Estrutura do Projeto

O projeto está organizado em uma arquitetura cliente-servidor com separação clara entre backend e frontend:

```
ABJ-Bom-Jesus/
│
├── backend/              # API REST - Servidor Node.js
│   └── README.md         # Documentação completa do backend
│
├── frontend/             # Interface Web - Aplicação React
│   └── README.md         # Documentação completa do frontend
│
├── ERS - Associação Bom Jesus.pdf
└── README.md             # Este arquivo
```

### Documentação Técnica

Cada módulo possui sua própria documentação detalhada:

- **Backend**: Consulte [`backend/README.md`](./backend/README.md) para informações sobre:
  - Estrutura de pastas e arquivos
  - Configuração do ambiente
  - Modelos de dados e banco de dados
  - Rotas da API
  - Como executar e testar

- **Frontend**: Consulte [`frontend/README.md`](./frontend/README.md) para informações sobre:
  - Estrutura de componentes
  - Configuração do ambiente
  - Integração com a API
  - Como executar e fazer o build

---

## ERS

[ERS - Associação Bom Jesus](./ERS%20-%20Associação%20Bom%20Jesus.pdf)

## Vídeo de Apresentação
[Vídeo de Apresentação](https://drive.google.com/drive/folders/1m23dauatjJx2CrzCILMxLCcXjv8dFZ_9)

## Declaração de Encerramento das Atividades da Associação Bom Jesus

[Declaração de Encerramento das Atividades da Associação Bom Jesus](./carta-encerramento-da-associacao-bom-jesus.pdf)

## Implantação

Devido ao encerramento das atividades da Associação Bom Jesus, o sistema não pode ser implantado na instituição.

No entanto, fizemos o deploy do sistema em nuvem para demonstração do projeto desenvolvido.

[Deploy do Sistema](https://abj-bom-jesus.vercel.app/login)

Usuário: `admin`</br>
Senha: `123456`</br>
