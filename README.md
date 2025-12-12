# Synta Notes

> Um aplicativo web de produtividade moderno que combina Bullet Journal, Task Manager e Sistema de Notas em uma única plataforma intuitiva.

## Características Principais

### Múltiplos Tipos de Entradas
- **Notas**: Texto ilimitado com suporte a formatação
- **Tarefas**: Com limite de 140 caracteres (BuJo style)
- **Eventos**: Agendamento com datas e alertas
- **Reflexões**: Anotações reflexivas de até 280 caracteres
- **Ideias**: Captura rápida de conceitos (140 caracteres)

### Funcionalidades Avançadas
- **Hubs**: Organize por contextos (Pessoal, Trabalho, etc)
- **Coleções por Tags**: #hashtags para categorização automática
- **Sistema de Prioridades**: Marque com ✱ para priorização
- **Linking**: Use >> para vincular a Hubs ou executar buscas rápidas
- **Diário com Períodos**: Visualize Hoje, Todos os Itens ou Futuros
- **Calendário Interativo**: Visualize eventos por data
- **Busca Global**: Encontre qualquer item instantaneamente
- **Modo Visual e Clássico**: Escolha sua preferência de visualização
- **Dark Mode**: Tema claro/escuro
- **Backup & Restauração**: Exporte e importe dados em JSON
- **Google Drive Sync**: Backup na nuvem (Em Breve)

## Como Usar

### Iniciando
1. Acesse [Synta Notes](https://synta-notes.vercel.app/)
2. Dados são salvos localmente no seu navegador (localStorage)
3. Faça backup regularmente na seção Configurações

### Atalhos Principais
- **/** : Abre a entrada global de itens (funciona em qualquer lugar)
- **#tag** : Cria Coleções automaticamente
- **>>** : Cria links para Hubs ou executa buscas
- **✱** : Marca item como prioridade
- **Amanhã/Hoje/@dia/mês** : Interpreta datas naturais
- **Shift+Enter** : Quebra de linha em modo global
- **Esc** : Fecha menus e modais

## Estrutura do Projeto

```
synta_notes/
├── index.html      # HTML principal (interface)
├── app.js          # Logica completa da aplicacao
├── styles.css      # Estilos com Tailwind CSS
└── README.md       # Esta documentacao
```

### Componentes Principais (app.js)

#### Estado Global
- `state.entries`: Array de todas as notas/tarefas/eventos
- `state.hubs`: Contextos de organização
- `state.activeTab`: Aba atual (home, journal, hubs, collections, calendar)
- `state.prefs`: Preferências do usuário (tema, alertas, etc)

#### Funções Principais

**Gerenciamento de Entradas:**
- `addNewEntry()` : Adiciona nova entrada
- `toggleEntry(id)` : Marca como completo/incompleto
- `deleteEntry(id)` : Remove uma entrada
- `startEditEntry(id)` : Ativa edição inline
- `saveEditEntry(id, content)` : Salva edição

**Hubs e Contextos:**
- `createNewHub()` : Cria novo hub
- `openHub(hubId)` : Abre hub específico
- `deleteHub(hubId)` : Deleta hub

**Tags e Coleções:**
- `extractTags(content)` : Extrai #tags do texto
- `getUniqueTags()` : Retorna lista de tags únicas
- `openCollection(tagName)` : Abre coleção por tag
- `boostTagRelevance(tag)` : Incrementa relevância da tag

**Renderização:**
- `render()` : Função principal que renderiza a UI
- `renderEntry(entry)` : Renderiza item individual
- `getHomeHTML()` : Dashboard principal
- `getJournalHTML()` : View de diário
- `getCalendarHTML()` : Visualização em Calendário

**Dados:**
- `saveData()` : Persiste em localStorage
- `loadData()` : Carrega dados salvos
- `exportData()` : Exporta backup JSON
- `importData(file)` : Importa backup JSON

**Interface:**
- `handleGlobalKeydown(e)` : Listener global (/) 
- `openGlobalInput()` : Abre modal de entrada global
- `toggleTheme()` : Alterna tema claro/escuro
- `toggleViewMode()` : Alterna visual/clássico

## Tipos de Entradas (ENTRY_TYPES)

| Tipo | Label | Ícone | Limite | Símbolo |
|------|-------|-------|--------|----------|
| note | Nota | align-left | Ilimitado | — |
| task | Tarefa | check-square | 140 | • |
| event | Evento | calendar | 140 | ○ |
| reflection | Reflexão | moon | 280 | > |
| idea | Ideia | lightbulb | 140 | ! |

## Tecnologias

- **HTML5** : Estrutura
- **CSS3 + Tailwind CSS** : Estilos
- **JavaScript (Vanilla)** : Lógica
- **Lucide Icons** : Iconografia
- **LocalStorage** : Persistência
- **Vercel** : Deploy

## Roadmap

- [x] Modo offline com service workers (PWA)
- [ ] Sincronização Google Drive (Beta)
- [ ] Compartilhamento de hubs
- [ ] API REST
- [ ] Mobile app nativa
- [ ] Integração com Calendários
- [ ] Modo colaborativo

## Licença

MIT License - Veja LICENSE para detalhes

## Autor

**Jonatas Rocha** (@jonatas07rocha)
- GitHub: [github.com/jonatas07rocha](https://github.com/jonatas07rocha)
- Deployed: [synta-notes.vercel.app](https://synta-notes.vercel.app/)

---

**Versão**: 3.0.0  
**Última Atualização**: Dezembro 2025  
**Status**: Ativo e em desenvolvimento
