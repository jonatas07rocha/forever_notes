function getFilteredEntries() {
    let filtered = state.entries;
    const now = new Date(); 
    now.setHours(0,0,0,0);

    if (state.searchQuery) {
        return filtered.filter(e => e.content.toLowerCase().includes(state.searchQuery.toLowerCase()))
                       .sort((a,b) => (b.targetDate || b.id) - (a.targetDate || a.id));
    }

    if (state.activeTab === 'collections' && state.activeTag) {
        return filtered.filter(e => e.content.includes(state.activeTag))
                       .sort((a,b) => (b.targetDate || b.id) - (a.targetDate || a.id));
    }

    if (state.activeTab === 'hubs' && state.activeHubId) {
        return filtered.filter(e => e.hubId == state.activeHubId)
                       .sort((a,b) => (b.targetDate || b.id) - (a.targetDate || a.id));
    }
    
    if (state.activeTab === 'journal') {
        if (state.activeJournalPeriod === 'Hoje') {
            // NOVO: Define o início do dia para comparação
            const todayStart = new Date(); 
            todayStart.setHours(0,0,0,0);
            const todayStartMs = todayStart.getTime();
            
            filtered = filtered.filter(e => {
                // 1. Sempre mostra itens completos (independente da data)
                if (e.completed) return true; 

                // 2. Calcula a data de referência da entrada (TargetDate ou Creation Date)
                const entryDate = new Date(e.targetDate || e.id);
                entryDate.setHours(0,0,0,0);
                const entryDateMs = entryDate.getTime();
                
                const isToday = entryDateMs === todayStartMs;
                const isPast = entryDateMs < todayStartMs;
                
                // 3. Aplica a lógica de 'roll-over' apenas para tarefas.
                if (e.type === 'task') { 
                    // TAREFAS: Aparecem se for de hoje ou do passado (migração/roll-over).
                    return isToday || isPast;
                }
                
                // 4. Outros tipos (Nota, Ideia, Reflexão, Evento): 
                // Não migram. Aparecem APENAS se a data for EXATAMENTE HOJE.
                return isToday;
            });
        } else if (state.activeJournalPeriod === 'Futuro') {
            filtered = filtered.filter(e => {
                const d = e.targetDate ? new Date(e.targetDate) : new Date(e.id);
                d.setHours(0,0,0,0);
                return d.getTime() > now.getTime();
            });
        }
    }

    return filtered.sort((a,b) => (b.targetDate || b.id) - (a.targetDate || a.id));
}
