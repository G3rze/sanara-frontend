import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

export type WaitlistStep = 'email' | 'loading' | 'done' | 'error';

@Injectable({ providedIn: 'root' })
export class ClerkService {
  private clerk: any;

  readonly step = signal<WaitlistStep>('email');
  readonly email = signal('');
  readonly error = signal<string | null>(null);

  async load(): Promise<void> {
    if (this.clerk) return;
    const { Clerk } = await import('@clerk/clerk-js');
    this.clerk = new Clerk(environment.clerkPublishableKey);
    await this.clerk.load();
  }

  async join(email: string): Promise<void> {
    this.step.set('loading');
    this.error.set(null);
    this.email.set(email);
    try {
      await this.clerk!.joinWaitlist({ emailAddress: email });
      this.step.set('done');
    } catch (err: any) {
      this.error.set(err?.errors?.[0]?.longMessage ?? err?.errors?.[0]?.message ?? err?.message ?? 'Error al unirse a la lista');
      this.step.set('error');
    }
  }

  reset(): void {
    this.step.set('email');
    this.email.set('');
    this.error.set(null);
  }
}