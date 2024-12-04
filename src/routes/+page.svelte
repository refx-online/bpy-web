<script lang="ts">
	import { appName } from '$lib/env';
	import { __ } from '$lib/language';
	import { userLanguage, userData } from '$lib/storage';
	import { onMount } from 'svelte';
	import { avatarUrl } from '$lib/env';
	import type { DBUser, PlayerCounts } from '$lib/types';
	import { ChevronsUp } from 'svelte-feathers';
	import { env } from '$env/dynamic/public';

	export let data: {
		userCounts?: PlayerCounts;
		recentAccounts?: DBUser [];
		rankedMapsCount?: number;
		ppRecords?: Array<{
			mode: number;
			pp: number;
			name: string;
			id: number;
		}>;
	};

	let animatedOnline = 0;
	let animatedTotal = 0;

	onMount(() => {
		// funney number coun ter aahha
		const animateCounter = (target: number, setter: (val: number) => void) => {
			const duration = 1500;
			const start = 0;
			const startTime = performance.now();

			const updateCounter = (currentTime: number) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const currentValue = Math.floor(progress * target);
				
				setter(currentValue);

				if (progress < 1) {
					requestAnimationFrame(updateCounter);
				}
			};

			requestAnimationFrame(updateCounter);
		};

		if (data.userCounts?.counts) {
			animateCounter(data.userCounts.counts.online, (val) => animatedOnline = val);
			animateCounter(data.userCounts.counts.total, (val) => animatedTotal = val);
		}
	});
</script>

<svelte:head>
	<title>{appName} :: home</title>
</svelte:head>

<div class="bg-container">
    <div class="overlay">
        <div class="container mx-auto px-4 py-8 relative z-[2]">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div class="col-span-1 md:col-span-4 variant-glass-surface rounded-2xl p-6">
                    <h2 class="text-xl md:text-2xl font-bold text-white mb-4">{appName}</h2>
                    <p class="text-white/80">
						we are another <strong>osu!</strong> cheating server, but with two different rulesets and leaderboards! 
						we also have a custom pp system that slightly punishes cheat usage!
                    </p>
                </div>

                <div class="col-span-1 md:col-span-4">			
					{#if data.userCounts?.counts}
						<div class="grid grid-cols-2 gap-4 mb-6">
							<div class="variant-glass-surface rounded-xl p-3 text-center hover-lift">
								<h3 class="text-sm text-white/80 mb-1">{__('Online Users', $userLanguage)}</h3>
								<p class="text-xl font-bold text-primary-400">
									{animatedOnline.toLocaleString()}
								</p>
							</div>
							<div class="variant-glass-surface rounded-xl p-3 text-center hover-lift">
								<h3 class="text-sm text-white/80 mb-1">{__('Registered Users', $userLanguage)}</h3>
								<p class="text-xl font-bold text-secondary-400">
									{animatedTotal.toLocaleString()}
								</p>
							</div>
						</div>
					{/if}

					{#if $userData}
						<div class="variant-glass-surface rounded-2xl p-4 mb-6 space-y-4">
							<div class="flex flex-col space-y-4">
								<a href="/u/{$userData.id}" class="btn variant-filled-primary w-full hover-button">
									{__('View Profile', $userLanguage)}
								</a>
								<a href="/settings" class="btn variant-soft-secondary w-full hover-button">
									{__('Settings', $userLanguage)}
								</a>
							</div>
						</div>
					{:else}
						<div class="variant-glass-surface rounded-2xl p-4 mb-6 space-y-4">
							<div class="flex flex-col space-y-4">
								<a href="/signup" class="btn variant-filled-primary w-full hover-button">
									{__('Sign Up', $userLanguage)}
								</a>
								<a href="/signin" class="btn variant-soft-secondary w-full hover-button">
									{__('Sign In', $userLanguage)}
								</a>
							</div>
						</div>
					{/if}

                    {#if data.rankedMapsCount}
                        <div class="variant-glass-surface rounded-2xl p-4 mb-6 flex items-center justify-between hover-lift">
                            <div>
                                <h3 class="text-lg font-semibold text-white/80 mb-2">
                                    {__('Maps Ranked', $userLanguage)}
                                </h3>
                                <p class="text-2xl md:text-3xl font-bold text-tertiary-400">
                                    {data.rankedMapsCount.toLocaleString()}
                                </p>
                            </div>
                            <ChevronsUp class="pointer-events-none text-blue-400" />
                        </div>
                    {/if}

                    {#if data.ppRecords && data.ppRecords.length}
                        <div class="variant-glass-surface rounded-2xl p-4">
                            <h2 class="text-lg font-bold text-white mb-4">{__('PP Records', $userLanguage)}</h2>
                            <div class="space-y-3">
                                {#each data.ppRecords as score}
                                    <div class="flex items-center bg-black/20 rounded-xl p-3 hover-glow">
                                        <img 
                                            src={`${avatarUrl}/${score.id}`}
                                            alt="{score.name}'s avatar" 
                                            class="w-10 h-10 rounded-full mr-3 object-cover"
                                        />
                                        <div class="flex-grow">
											<a href={`/u/${score.id}`} class="text-sm font-semibold text-white hover:text-primary-400 transition-colors">
												{score.name}
											</a>
                                            <p class="text-xs text-white/60">
                                                {['01;std', '01;taiko', '01;catch', '01;mania', '02!std', '02!taiko', '02!catch', '02!mania'][score.mode]}
                                            </p>
                                        </div>
                                        <span class="text-secondary-400 font-bold text-sm">
                                            {score.pp.toFixed(2)} PP
                                        </span>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>

                <div class="col-span-1 md:col-span-4">
					{#if data.recentAccounts && data.recentAccounts.length}
					<div class="variant-glass-surface rounded-2xl p-4 max-h-[500px] overflow-y-auto mb-4">
						<h2 class="text-lg font-bold text-white mb-4">{__('Recently Created Accounts', $userLanguage)}</h2>
							<div class="space-y-3">
								{#each data.recentAccounts as account}
									<div class="flex items-center bg-black/20 rounded-xl p-3 hover-glow">
										<img 
											src={`${avatarUrl}/${account.id}`}
											alt="{account.name}'s avatar" 
											class="w-10 h-10 rounded-full mr-3 object-cover"
										/>
										<div>
											<a href={`/u/${account.id}`} class="text-sm font-semibold text-white hover:text-primary-400 transition-colors truncate max-w-[150px]">
												{account.name}
											</a>
											<p class="text-xs text-white/60">
												{new Date(account.creation_time * 1000).toLocaleDateString()}
											</p>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<div class="variant-glass-surface rounded-2xl p-4 mb-6">
						<iframe 
							src="https://discord.com/widget?id={env.PUBLIC_DISCORD_SERVER_ID}&theme=dark" 
							width="100%" 
							height="300" 
							frameborder="0"
							title="disc"
							sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
							style="background-color: transparent;">
						</iframe>					
                    </div>
					
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
	.bg-container {
	  background-image: url('/main.jpg');
	  background-size: cover;
	  background-position: center;
	  background-repeat: no-repeat;
	  min-height: 100vh;
	  width: 100%;
	  position: relative;
	}
  
	.overlay {
	  background-color: rgba(0, 0, 0, 0.6);
	  min-height: 100vh;
	  width: 100%;
	  position: relative;
	  z-index: 1;
	}
  
	:global(.variant-glass-surface) {
	  background-color: rgba(var(--color-surface-500) / 0.8) !important;
	  backdrop-filter: blur(8px);
	}

	.hover-button {
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		
		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		}
		
		&:active {
			transform: translateY(0);
		}
	}

	.hover-lift {
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		
		&:hover {
			transform: translateY(-4px);
			box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
		}
	}

	.hover-glow {
		transition: all 0.3s ease;
		
		&:hover {
			background-color: rgba(0, 0, 0, 0.3);
			box-shadow: 0 0 12px rgba(255, 255, 255, 0.1);
			transform: translateX(4px);
		}
	}
  
	@media (max-width: 640px) {
		.text-xl {
			font-size: 1.5rem;
		}
		.text-lg {
			font-size: 1.25rem;
		}
		.text-sm {
			font-size: 0.875rem;
		}
	}
</style>