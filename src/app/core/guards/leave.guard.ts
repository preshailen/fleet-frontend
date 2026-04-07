import { CanDeactivateFn } from '@angular/router';

export type DeactivatableComponent = {
  canDeactivate: () => boolean | Promise<boolean>;
};

export const leaveGuard: CanDeactivateFn<DeactivatableComponent> = (component) => {
  return component?.canDeactivate ? component.canDeactivate() : true;
};