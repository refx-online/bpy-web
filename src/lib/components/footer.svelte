<script lang="ts">
    import { 
        appName, 
        githubUrl,
        //twitterUrl,
        //youtubeUrl,
        discordUrl
     } from '$lib/env';
    import { __ } from '$lib/language';
    import { userLanguage } from '$lib/storage';
    import { writable } from 'svelte/store';
    import { ChevronUp, ChevronDown } from 'svelte-feathers';
    import { slide } from 'svelte/transition';
    import { browser } from '$app/environment';

    const showFooter = writable(false);

    if (browser) {
        showFooter.subscribe(value => {
            localStorage.setItem('footerState', value.toString());
        });
    }
</script>

<div class="fixed bottom-0 left-0 right-0 z-50">
    <footer class="backdrop-blur-md">
        <button
            on:click={() => showFooter.update(n => !n)}
            class="w-full py-3 hover:bg-black/5 transition-colors flex justify-center items-center"
        >
            {#if $showFooter}
                <ChevronDown size={24} class="transform transition-transform duration-300" />
            {:else}
                <ChevronUp size={24} class="transform transition-transform duration-300" />
            {/if}
        </button>
        
        {#if $showFooter}
            <div transition:slide={{ duration: 300 }} class="bg-black/10">
                <div class="p-3">
                    <div class="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div>
                            <h3 class="font-semibold mb-1">{appName}</h3>
                            <p class="text-gray-300 text-sm">
                                {__('A community-driven osu! private server.', $userLanguage)}
                            </p>
                        </div>
                        
                        <div>
                            <h3 class="font-semibold mb-1">{__('Quick Links', $userLanguage)}</h3>
                            <ul class="space-y-0.5">
                                <li><a href="/" class="hover:text-primary-400 transition-colors">{__('Home', $userLanguage)}</a></li>
                                <li><a href="/donate" class="hover:text-primary-400 transition-colors">{__('Donate', $userLanguage)}</a></li>
                                <li><a href={`${githubUrl}/bpy-web`} target="_blank" rel="noopener noreferrer" class="hover:text-primary-400 transition-colors">Source Code</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-semibold mb-1">{__('Community', $userLanguage)}</h3>
                            <ul class="space-y-0.5">
                                <li><a href={discordUrl} target="_blank" rel="noopener noreferrer" class="hover:text-primary-400 transition-colors">Discord</a></li>
                                <!--<li><a href={twitterUrl} target="_blank" rel="noopener noreferrer" class="hover:text-primary-400 transition-colors">Twitter</a></li>-->
                                <!--<li><a href={youtubeUrl} target="_blank" rel="noopener noreferrer" class="hover:text-primary-400 transition-colors">Youtube</a></li>-->
                                <li><a href={githubUrl} target="_blank" rel="noopener noreferrer" class="hover:text-primary-400 transition-colors">GitHub</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-semibold mb-1">{__('Info', $userLanguage)}</h3>
                            <ul class="space-y-0.5">
                                <li><a href="/rules" class="hover:text-primary-400 transition-colors">{__('Rules', $userLanguage)}</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="border-t border-surface-700/50 pt-2 flex flex-col md:flex-row justify-between items-center text-2xs text-gray-300">
                        <p>© {new Date().getFullYear()} {appName}. {__('All rights reserved.', $userLanguage)}</p>
                        <p>{__('Not affiliated with ppy or osu!.', $userLanguage)}</p>
                    </div>
                </div>
            </div>
        {/if}
    </footer>
</div>

<style>
    footer {
        background: rgba(0, 0, 0, 0.1);
        color: white;
    }

    .text-2xs {
        font-size: 0.65rem;
        line-height: 1rem;
    }

    :global(.transform) {
        transform-origin: center;
    }
    
    button:hover :global(.transform) {
        transform: scale(1.2);
    }
</style>