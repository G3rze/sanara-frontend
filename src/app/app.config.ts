import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideBuilding2,
  lucideCheck,
  lucideFileText,
  lucideGitBranch,
  lucideHeartPulse,
  lucideMail,
  lucideShieldCheck,
  lucideMenu,
  lucideX,
} from '@ng-icons/lucide';

import { routes } from './app.routes';
import { ClerkService } from './services/clerk.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const clerk = inject(ClerkService);
      return clerk.load();
    }),
    provideIcons({
      lucideArrowRight,
      lucideBuilding2,
      lucideCheck,
      lucideFileText,
      lucideGitBranch,
      lucideHeartPulse,
      lucideMail,
      lucideShieldCheck,
      lucideMenu,
      lucideX,
    }),
  ],
};
