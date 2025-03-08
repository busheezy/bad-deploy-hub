<script lang="ts">
  import '../app.css';

  import IconMenu from 'virtual:icons/lucide/menu';
  import IconX from 'virtual:icons/lucide/x';
  import IconHome from 'virtual:icons/lucide/home';
  import IconTestTube from 'virtual:icons/lucide/test-tube';

  import { page } from '$app/state';
  import { cx } from '$lib/utils/styles';

  let { children } = $props();

  let sidebarOpen: boolean = $state(false);

  function isActive(href: string) {
    return href === page.url.pathname;
  }

  const routes = [
    {
      name: 'Dashboard',
      href: '/',
      icon: IconHome,
    },
    {
      name: 'Tests',
      href: '/test',
      icon: IconTestTube,
    },
  ];

  function getCurrentRoute() {
    const currentRoute = routes.find((route) => isActive(route.href));

    if (!currentRoute) {
      throw new Error('Route not found');
    }

    return currentRoute;
  }
</script>

<div>
  {#if sidebarOpen}
    <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-white/20" aria-hidden="true"></div>

      <div class="fixed inset-0 flex">
        <div class="relative mr-16 flex w-full max-w-xs flex-1">
          <div class="absolute top-0 left-full flex w-16 justify-center pt-5">
            <button
              type="button"
              class="-m-2.5 cursor-pointer p-2.5"
              onclick={() => {
                sidebarOpen = false;
              }}
            >
              <span class="sr-only">Close sidebar</span>
              <IconX class="size-6 text-gray-900" />
            </button>
          </div>

          <div
            class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10"
          >
            <nav class="mt-4 flex flex-1 flex-col">
              <ul role="list" class="-mx-2 space-y-1">
                <li>
                  {#each routes as route}
                    <a
                      href={route.href}
                      class={cx(
                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                        isActive(route.href)
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      )}
                      onclick={() => {
                        sidebarOpen = false;
                      }}
                    >
                      <route.icon class="size-6 shrink-0" />
                      {route.name}
                    </a>
                  {/each}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
      <nav class="mt-4 flex flex-1 flex-col">
        <ul role="list" class="-mx-2 space-y-1">
          <li>
            {#each routes as route}
              <a
                href={route.href}
                class={cx(
                  'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                  isActive(route.href)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                )}
                onclick={() => {
                  sidebarOpen = false;
                }}
              >
                <route.icon class="size-6 shrink-0" />
                {route.name}
              </a>
            {/each}
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div
    class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-xs sm:px-6 lg:hidden"
  >
    <button
      type="button"
      class="-m-2.5 cursor-pointer p-2.5 text-gray-400 lg:hidden"
      onclick={() => {
        sidebarOpen = true;
      }}
    >
      <span class="sr-only">Open sidebar</span>
      <IconMenu class="size-6" />
    </button>
    <div class="flex-1 text-sm/6 font-semibold text-white">{getCurrentRoute().name}</div>
  </div>

  <main class="lg:pl-72">
    <div class="px-4 py-4 sm:px-6 lg:px-8">
      {@render children()}
    </div>
  </main>
</div>
