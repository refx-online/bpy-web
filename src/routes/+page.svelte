<script>
	import { appName } from '$lib/env';
	import { __ } from '$lib/language';
	import { userLanguage } from '$lib/storage';

	export let data;
</script>

<svelte:head>
	<title>{appName} :: home</title>
</svelte:head>

<div class="bg-container">
	<div class="overlay">
	  <div class="container mx-auto px-4 py-8">
		<div class="flex flex-col items-center justify-center min-h-[50vh] text-center">
		  <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
			{appName}
		  </h1>
		  <p class="text-lg md:text-xl text-white/90 max-w-2xl">
			yo we using <a href="https://github.com/HorizonCode/bpy-web">bpy-web</a>
		  </p>
		</div>
  
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
		  <div class="card p-6 variant-glass-surface">
			<h3 class="text-2xl font-semibold mb-4">
			  {__('online users', $userLanguage)}
			</h3>
			<p class="text-4xl font-bold">{data.userCounts?.counts.online ?? 0}</p>
		  </div>
  
		  <div class="card p-6 variant-glass-surface">
			<h3 class="text-2xl font-semibold mb-4">
			  {__('registered users', $userLanguage)}
			</h3>
			<p class="text-4xl font-bold">{data.userCounts?.counts.total ?? 0}</p>
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
	}
  
	.overlay {
	  background-color: rgba(0, 0, 0, 0.6);
	  min-height: 100vh;
	  width: 100%;
	}
  
	:global(.variant-glass-surface) {
	  background-color: rgba(var(--color-surface-500) / 0.8) !important;
	  backdrop-filter: blur(8px);
	}
  </style>