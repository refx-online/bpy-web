<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    export let data;

    const modes = ['osu', 'taiko', 'catch', 'mania'];
    const types = ['vanilla', 'relax'];

    let currentType = $page.url.searchParams.get('type') || 'vanilla';
    let currentMode = $page.url.searchParams.get('mode') || 'osu';
    let currentPage = parseInt($page.url.searchParams.get('page') || '1');

    if (!types.includes(currentType)) currentType = 'vanilla';
    if (!modes.includes(currentMode)) currentMode = 'osu';
    if (isNaN(currentPage) || currentPage < 1) currentPage = 1;

    function getModeNumber(mode: string, type: string): number {
        let modeNum = 0;
        switch (mode) {
            case 'taiko': modeNum = 1; break;
            case 'catch': modeNum = 2; break;
            case 'mania': modeNum = 3; break;
        }
        if (type === 'relax') modeNum += 4;
        return modeNum;
    }

    function changeMode(newMode: string) {
        currentMode = newMode;
        const modeNum = getModeNumber(newMode, currentType);
        goto(`/top?mode=${modeNum}&page=1`);
    }

    function toggleType() {
        currentType = currentType === 'vanilla' ? 'relax' : 'vanilla';
        const modeNum = getModeNumber(currentMode, currentType);
        goto(`/top?mode=${modeNum}&page=1`);
    }

    function getBeatmapCoverUrl(setId: number) {
        return `https://assets.ppy.sh/beatmaps/${setId}/covers/cover.jpg`;
    }

    // TODO: use a better grade
    const gradeClasses = {
        ss: 'text-yellow-400',
        ssh: 'text-yellow-400',
        s: 'text-orange-400',
        sh: 'text-orange-400',
        a: 'text-green-500',
        b: 'text-blue-400',
        c: 'text-orange-500',
        d: 'text-red-500'
    };
</script>

<div class="min-h-screen bg-surface-900">
    <div class="container mx-auto p-4">
        <div class="flex justify-center gap-4 mb-8">
            <div class="flex gap-2">
                {#each modes as mode}
                    <button 
                        class="px-4 py-1 rounded text-sm font-medium transition-colors
                               {currentMode === mode ? 'bg-zinc-500 text-white' : 'bg-surface-900 text-zinc-400 hover:bg-zinc-700'}"
                        on:click={() => changeMode(mode)}
                    >
                        {mode === 'catch' ? 'ctb' : mode}
                    </button>
                {/each}
            </div>
            <div class="flex gap-2">
                <button 
                    class="px-4 py-1 rounded text-sm font-medium transition-colors
                           {currentType === 'vanilla' ? 'bg-zinc-500 text-white' : 'bg-surface-900 text-zinc-400 hover:bg-zinc-700'}"
                    on:click={toggleType}
                >
                    re;fx
                </button>
                <button 
                    class="px-4 py-1 rounded text-sm font-medium transition-colors
                           {currentType === 'relax' ? 'bg-zinc-500 text-white' : 'bg-surface-900 text-zinc-400 hover:bg-zinc-700'}"
                    on:click={toggleType}
                >
                    Shaymi
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {#each data.scores ?? [] as score, index}
                <div class="bg-zinc-900 rounded-lg overflow-hidden w-full">
                    <div class="relative h-32 bg-gray-500">
                        {#if getBeatmapCoverUrl(score.set_id)}
                            <img 
                                src={getBeatmapCoverUrl(score.set_id)} 
                                alt=""
                                class="w-full h-full object-cover"
                            />
                        {/if}
                        <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-white font-bold">#{(currentPage - 1) * 50 + index + 1}</span>
                                <span class="text-white text-sm">{score.pp.toFixed(2)}pp</span>
                            </div>
                            <a href="/u/{score.userid}" class="block text-white hover:text-blue-400 text-sm">
                                {score.username}
                            </a>
                        </div>
                    </div>
        
                    <div class="p-2">
                        <a href="/beatmaps/{score.map_id}" class="block hover:text-blue-400">
                            <div class="text-zinc-200 text-sm truncate">{score.title}</div>
                            <div class="text-zinc-400 text-xs">[{score.version}]</div>
                        </a>
                        <div class="flex justify-between items-center mt-2">
                            <span class={`font-bold ${gradeClasses[score.grade.toLowerCase()] || ''}`}>
                                {score.grade}
                            </span>
                            <div class="flex gap-1">
                                {#each score.mods as mod}
                                    <span class="bg-zinc-800 text-zinc-300 text-xs px-1 rounded">
                                        {mod.short_name}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>