/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/meals`; params?: Router.UnknownInputParams; } | { pathname: `/workout`; params?: Router.UnknownInputParams; } | { pathname: `/comingsoon`; params?: Router.UnknownInputParams; } | { pathname: `/workoutscreen`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/meals`; params?: Router.UnknownOutputParams; } | { pathname: `/workout`; params?: Router.UnknownOutputParams; } | { pathname: `/comingsoon`; params?: Router.UnknownOutputParams; } | { pathname: `/workoutscreen`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/meals${`?${string}` | `#${string}` | ''}` | `/workout${`?${string}` | `#${string}` | ''}` | `/comingsoon${`?${string}` | `#${string}` | ''}` | `/workoutscreen${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/meals`; params?: Router.UnknownInputParams; } | { pathname: `/workout`; params?: Router.UnknownInputParams; } | { pathname: `/comingsoon`; params?: Router.UnknownInputParams; } | { pathname: `/workoutscreen`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
