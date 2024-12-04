<script lang="ts">
    import { __ } from '$lib/language';
    import { userLanguage } from '$lib/storage';
    import { onMount } from 'svelte';
    import { appName, avatarUrl } from '$lib/env';

    const donationOptions = [
        {
            name: 'kaupec1',
            description: 'Main Developer',
            kofiLink: 'https://ko-fi.com/kaupec1',
            avatar: avatarUrl + '/3' ,
            backgroundColor: 'bg-gradient-to-br from-blue-500 to-purple-600'
        },
        {
            name: 'anolet',
            description: 'Main Developer',
            kofiLink: 'https://ko-fi.com/anolet',
            avatar: avatarUrl + '/4',
            backgroundColor: 'bg-gradient-to-br from-green-500 to-teal-600'
        }
    ];

    let mounted = false;
    onMount(() => {
        mounted = true;
    });

</script>

<div class="min-h-screen bg-surface-50 dark:bg-surface-900 relative z-[1] overflow-hidden">
    {#if mounted}
        <div class="absolute inset-0 opacity-20 blur-3xl z-[0]">
            <div class="absolute w-80 h-80 bg-primary-500/50 rounded-full -top-10 -left-10"></div>
            <div class="absolute w-96 h-96 bg-secondary-500/50 rounded-full -bottom-20 -right-20"></div>
        </div>
    {/if}

    <div class="container mx-auto px-4 py-16 relative z-[2]">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4 dark:text-white">
                {__('Support the Project', $userLanguage)}
            </h1>
            <p class="text-xl text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
                {__('Your support helps us continue developing and improving {{val}}', $userLanguage, {
                    val: appName
                })}
            </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {#each donationOptions as donor}
                <div class="relative group">
                    <div class="{donor.backgroundColor} rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-4xl p-6">
                        <div class="flex items-center mb-6">
                            <img 
                                src={donor.avatar} 
                                alt="{donor.name}'s avatar" 
                                class="w-20 h-20 rounded-full border-4 border-white/30 mr-6 object-cover"
                            />
                            <div>
                                <h2 class="text-2xl font-bold text-white">{donor.name}</h2>
                                <p class="text-white/80">{donor.description}</p>
                            </div>
                        </div>

                        <div class="bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center">
                            <p class="text-white mb-4">
                                {__('Buy me a coffee to keep the code brewing!', $userLanguage)}
                            </p>
                            <a 
                                href={donor.kofiLink} 
                                target="_blank" 
                                class="inline-block bg-white text-primary-600 px-6 py-3 rounded-full font-bold hover:bg-primary-50 transition-all"
                            >
                                ☕ {__('Donate on Ko-Fi', $userLanguage)}
                            </a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <div class="text-center mt-12 max-w-2xl mx-auto">
            <h3 class="text-2xl font-semibold mb-4 dark:text-white">
                {__('Why Donate?', $userLanguage)}
            </h3>
            <p class="text-surface-600 dark:text-surface-300">
                {__('Your donations help us cover server costs, development time, and continue improving {{val}}. Every contribution, big or small, makes a difference!', $userLanguage, {
                    val: appName
                })}
            </p>
        </div>
    </div>

    {#if mounted}
        <div class="absolute bottom-0 left-0 opacity-20 pointer-events-none z-[0]">
            <svg width="200" height="200" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="brown" opacity="0.1"/>
            </svg>
        </div>
        <div class="absolute top-0 right-0 opacity-20 pointer-events-none z-[0]">
            <svg width="250" height="250" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" fill="brown" opacity="0.1"/>
            </svg>
        </div>
    {/if}
</div>