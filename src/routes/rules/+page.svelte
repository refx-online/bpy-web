<script>
    import { onMount } from 'svelte';
    import { fade, slide } from 'svelte/transition';
    import { __ } from '$lib/language';
    import { userLanguage } from '$lib/storage';

    let currentPage = 'rules';

    function changePage(page) {
        currentPage = page;
    }

    function t(key) {
        return __(`${key}`, $userLanguage);
    }
</script>

<div class="content container mx-auto px-4 py-8">
    <div class="nav-buttons">
        <button 
            class="nav-button {currentPage === 'rules' ? 'active' : ''}" 
            on:click={() => changePage('rules')}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <!-- dear god -->
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Rules
        </button>
        <button 
            class="nav-button {currentPage === 'cheats' ? 'active' : ''}" 
            on:click={() => changePage('cheats')}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <!-- dear god -->
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Cheat Info
        </button>
    </div>

    <!-- TODO: use languages -->
    {#if currentPage === 'rules'}
        <section 
            class="section" 
            in:slide="{{ duration: 300, axis: 'x' }}"
            out:fade="{{ duration: 200 }}"
        >
            <div class="header-container">
                <div class="header-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" width="32" height="32">
                        <!-- dear god -->
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h1 class="text-4xl">{t('Rules')}</h1>
            </div>
            <p class="subtitle">{t("There's rules?")}</p>
            <ol class="list-decimal">
                <li>
                    <strong>{t('Use common sense')}</strong>
                    <p>
                        {t('This includes being respectful to each other when interacting, as well as not doing (or abusing) things that are unintended.')}
                        {t('If you happen to find bugs, please inform one of our developer on our discord.')}
                    </p>
                </li>
                <li>
                    <strong>{t("Don't create multiple accounts")}</strong>
                    <p>
                        {t('As you are probably used from the official osu! servers, creating more than one account per person is a bannable offense.')}
                    </p>
                </li>
                <li>
                    <strong>{t("Don't use auto")}</strong>
                    <p>
                        {t('Recent update from this server allows other client / stable be able to connect to our server,')}
                        {t('no rule for this yet but it should be obvious that auto is a bannable offense.')}
                    </p>
                </li>
            </ol>
            <h2 class="text-2xl mt-6 mb-4">{t('Additional Information')}</h2>
            <h3 class="text-xl mb-2"><strong>{t('Where do I report a user that breaks the rules?')}</strong></h3>
            <p>{t('To report a user, please report to a moderator on our Discord. Everything further will be handled with them')}</p>
            <h3 class="text-xl mt-4 mb-2"><strong>{t('How do I appeal my punishment?')}</strong></h3>
            <p>{t('To appeal your punishment, please direct message one of our moderator on our Discord. They will reach out to you, discussing your punishment and a more detailed appeal from your side.')}</p>
        </section>
    {:else if currentPage === 'cheats'}
        <section 
            class="section" 
            in:slide="{{ duration: 300, axis: 'x' }}"
            out:fade="{{ duration: 200 }}"
        >
            <div class="header-container">
                <div class="header-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" width="32" height="32">
                        <!-- dear god -->
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 class="text-4xl">{t('Cheats Info')}</h1>
            </div>
            <p class="subtitle">{t('That assists you!')}</p>
            <ol class="list-decimal">
                <li>
                    <strong>{t('What does "Aim Correction" do?')}</strong>
                    <p>{t('Aim correction is like "aim assist" but instead of assisting your aim, it teleports your cursor LITERALLY to the circles. it might breaks your muscle memory.')}</p>
                </li>
                <li>
                    <strong>{t('What is timewarp?')}</strong>
                    <p>{t('Basically just changed your game speed on maps. with a limit. the limit is 90! (Only works on Shaymi ranking!)')}</p>
                </li>
                <li>
                    <strong>{t('What is AR (Approach Rate) Changer?')}</strong>
                    <p>{t("Changes how approach rate do. It helps you if you're bad at reading fast circles or plays with double time!")}</p>
                </li>
                <li>
                    <strong>{t('What is CS (Circle Size) Changer?')}</strong>
                    <p>{t('Changes the circle size. Circle will be changed by -1 if you plays with hardrock, -0.77 if you plays without it. Ex. (CS 5 .2 -> 4.2 (HardRock), CS 4 -> 3.23 (Non HardRock)) (Only works on Shaymi ranking!)')}</p>
                </li>
                <li>
                    <strong>{t('What is HD (Hidden) Remover?')}</strong>
                    <p>{t('Turns off Hidden if you plays with Hidden. Easier to get pp!')}</p>
                </li>
                <li>
                    <strong>{t('And last but not least, Relax')}</strong>
                    <p>{t('It clicks circles for you! Uses Lazer Relax and really.. it just like relax mod.')}</p>
                </li>
            </ol>
        </section>
    {/if}
</div>

<style>
    :global(body) {
        background-color: #121212;
        color: #e0e0e0;
        overflow-x: hidden;
    }

    .content {
        position: relative;
        z-index: 10;
    }

    .nav-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .nav-button {
        background-color: rgba(74, 144, 226, 0.2);
        color: #4a90e2;
        border: 2px solid #4a90e2;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .nav-button:hover, .nav-button.active {
        background-color: #4a90e2;
        color: white;
    }

    .nav-button svg {
        width: 24px;
        height: 24px;
    }

    .section {
        background: rgba(30, 30, 30, 0.7);
        backdrop-filter: blur(15px);
        border-radius: 12px;
        padding: 2rem;
        margin-bottom: 1.5rem;
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        position: relative;
    }

    .header-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .header-logo {
        width: 48px;
        height: 48px;
        background-color: #4a90e2;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
    }

    h1 {
        color: #f0f0f0;
        font-weight: 700;
    }

    .subtitle {
        color: #4a90e2;
        margin-bottom: 1rem;
        font-style: italic;
    }

    p, li {
        color: #a0a0a0;
        line-height: 1.6;
        margin-bottom: 0.5rem;
    }

    .list-decimal {
        color: #4a90e2;
        padding-left: 2rem;
    }

    .list-decimal li {
        padding-left: 0.5rem;
        margin-bottom: 1rem;
    }

    strong {
        color: #4a90e2;
 }
</style>