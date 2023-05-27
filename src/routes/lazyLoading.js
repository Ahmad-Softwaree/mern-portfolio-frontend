import { lazy } from "react";

export default function lazyLoading(path, name) {
  return lazy(() => {
    const promise = import(path);
    if (name == null) {
      return promise;
    } else {
      return promise.then((module) => ({
        default: module[name],
      }));
    }
  });
}
