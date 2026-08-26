import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
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
