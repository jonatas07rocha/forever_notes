// --- FUNÇÕES DE RENDERIZAÇÃO CORRIGIDAS (Símbolo Único) ---

function renderVisualEntry(entry) {
    const config = ENTRY_TYPES[entry.type];
    const isPriority = entry.isPriority; // Mantém estado, mas não duplica visual
    const isInspiration = entry.isInspiration;
    const contentHtml = formatContent(entry.content);
    
    // 1. Determina o Ícone Principal (Lógica de Precedência)
    let iconName = config.icon; // Padrão (square, circle, minus)
    let iconFill = "none";      // Padrão sem preenchimento

    // Significadores "roubam" o lugar do ícone padrão se a tarefa não estiver concluída
    if (entry.status === TASK_STATUS.INCOMPLETE) {
        if (isPriority) {
            iconName = 'star';
            // Em visual mode, prioridade geralmente não tem fill sólido para não confundir com botão de ação, 
            // mas podemos dar destaque via CSS/Cor.
        } else if (isInspiration) {
            iconName = 'alert-circle';
        }
    }
    
    // 2. Determina Estilos baseados no Status
    let statusClass = "text-stone-900 dark:text-stone-200";
    let iconClass = "text-stone-400 dark:text-stone-500 hover:text-black dark:hover:text-white transition-colors";
    
    if (entry.type === 'task') {
        switch(entry.status) {
            case TASK_STATUS.COMPLETED:
                iconName = 'check-square'; // Ou apenas 'check'
                statusClass = "line-through text-stone-400";
                iconClass = "text-stone-300"; // Ícone fica apagado quando feito
                break;
            case TASK_STATUS.MIGRATED:
                iconName = 'arrow-right-circle';
                iconClass = "text-stone-400";
                statusClass = "text-stone-400 italic";
                break;
            case TASK_STATUS.SCHEDULED:
                iconName = 'calendar-clock'; 
                iconClass = "text-stone-400";
                statusClass = "text-stone-400 italic";
                break;
        }
    }

    // Se for prioridade ativa, damos destaque na cor do ícone
    if (isPriority && entry.status === TASK_STATUS.INCOMPLETE) {
        iconClass = "text-black dark:text-white font-bold"; 
        iconFill = "currentColor"; // Estrela preenchida para destaque forte
    }
    // Se for inspiração ativa
    if (isInspiration && entry.status === TASK_STATUS.INCOMPLETE) {
        iconClass = "text-stone-800 dark:text-stone-200"; 
    }

    return `
        <div class="flex items-start gap-3 p-3 bg-white border border-stone-100 hover:border-stone-400 group transition-all dark:bg-stone-900 dark:border-stone-800 dark:hover:border-stone-600 relative">
            
            <button onclick="cycleTaskStatus(${entry.id})" class="mt-0.5 ${iconClass}">
                <i data-lucide="${iconName}" class="w-4 h-4" fill="${iconFill}"></i>
            </button>

            <div class="flex-1 min-w-0" onclick="startEditEntry(${entry.id})">
                <p class="text-sm ${statusClass} leading-relaxed font-medium cursor-pointer">
                    ${contentHtml}
                </p>
            </div>
            
            <div class="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2 bg-white dark:bg-stone-900 p-1 shadow-sm border border-stone-100 dark:border-stone-700 rounded z-10">
                ${entry.type === 'task' && entry.status === TASK_STATUS.INCOMPLETE ? `
                    <button onclick="handleMigration(state.entries.find(e=>e.id===${entry.id}))" class="text-stone-400 hover:text-black dark:hover:text-white" title="Migrar (>)">
                        <i data-lucide="arrow-right" class="w-3 h-3"></i>
                    </button>
                    <button onclick="handleScheduling(state.entries.find(e=>e.id===${entry.id}))" class="text-stone-400 hover:text-black dark:hover:text-white" title="Agendar (<)">
                        <i data-lucide="calendar" class="w-3 h-3"></i>
                    </button>
                ` : ''}
                <button onclick="deleteEntry(${entry.id})" class="text-stone-400 hover:text-red-600" title="Excluir">
                    <i data-lucide="trash-2" class="w-3 h-3"></i>
                </button>
            </div>
        </div>
    `;
}

function renderClassicEntry(entry) {
    const config = ENTRY_TYPES[entry.type];
    const isPriority = entry.isPriority;
    const isInspiration = entry.isInspiration;
    const contentHtml = formatContent(entry.content);
    
    // Lógica de Símbolo Único para o Modo Clássico
    let symbol = config.symbol; // Padrão: •
    
    // 1. Estados Especiais (X, >, <) têm precedência máxima
    if (entry.type === 'task') {
        if (entry.status === TASK_STATUS.COMPLETED) symbol = 'X';
        else if (entry.status === TASK_STATUS.MIGRATED) symbol = '>';
        else if (entry.status === TASK_STATUS.SCHEDULED) symbol = '<';
    }

    // 2. Se não tem estado especial (está incompleta), Significador substitui o Bullet
    if (entry.status === TASK_STATUS.INCOMPLETE) {
        if (isPriority) symbol = '*';
        else if (isInspiration) symbol = '!';
    }

    return `
        <div class="group flex items-baseline gap-2 py-1 px-1 hover:bg-stone-50 rounded -ml-1 transition-colors cursor-default dark:hover:bg-stone-800 font-mono text-sm">
            
            <div class="w-8 text-right select-none font-bold text-black dark:text-white flex-shrink-0">
                <button onclick="cycleTaskStatus(${entry.id})" class="hover:text-stone-500 transition-colors">
                    ${symbol}
                </button>
            </div>

            <div class="flex-1 min-w-0 ${entry.status === TASK_STATUS.COMPLETED ? 'line-through text-stone-400' : 'text-stone-800 dark:text-stone-300'}" 
                 onclick="startEditEntry(${entry.id})">
                ${contentHtml}
            </div>

            <div class="opacity-0 group-hover:opacity-100 flex gap-2 pl-2">
                ${entry.type === 'task' && entry.status === TASK_STATUS.INCOMPLETE ? `
                    <button onclick="handleMigration(state.entries.find(e=>e.id===${entry.id}))" class="text-stone-300 hover:text-black dark:hover:text-white">></button>
                    <button onclick="handleScheduling(state.entries.find(e=>e.id===${entry.id}))" class="text-stone-300 hover:text-black dark:hover:text-white"><</button>
                ` : ''}
                <button onclick="deleteEntry(${entry.id})" class="text-stone-300 hover:text-red-500">x</button>
            </div>
        </div>
    `;
}
