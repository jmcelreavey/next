import { useRouter } from "next/router";

/**
 * A smart wrapper around UrlSearchParams and useSearchParams
 *
 * Provides convenience functions to replace or blend existing search params
 * with new ones
 *
 * @returns
 * @param namespace An optional prefix to transparently prepend to query string params
 */
export const useSmartSearchParams = <T extends Record<string, string>>(namespace?: string) => {
  const router = useRouter();
  const allParams: Record<string, string | string[] | undefined> = {};

  Object.entries(router.query).forEach(([key, value]) => {
    if (namespace && key.startsWith(namespace + "-")) {
      allParams[key.replace(namespace + "-", "")] = value;
    } else {
      allParams[key] = value;
    }
  });

  const setSearchParams = (params: Record<string, string | string[] | undefined>) => {
    // Push the new query state to the router. This will cause a re-render which
    // will correctly register the params in the hook output below.
    void router.push({ ...router, query: params });
  };

  return {
    searchParams: allParams as Partial<T>,
    replaceSearchParams: (params: Record<string, string>) => {
      setSearchParams(namespaceParamRecord(namespace, params));
    },
    blendSearchParams: (newParams: Record<string, string>, paramsToRemove?: string[]) => {
      setSearchParams(
        mixSearchParams(
          allParams,
          namespaceParamRecord(namespace, newParams),
          namespaceParamList(namespace, paramsToRemove)
        )
      );
    },
    removeSearchParams: (paramNames: string[]) => {
      setSearchParams(mixSearchParams(allParams, {}, namespaceParamList(namespace, paramNames)));
    },
  };
};

function namespaceParamRecord(
  namespace = "",
  params: Record<string, string | string[] | undefined>
) {
  if (!namespace) {
    return params;
  }

  const output: Record<string, string | string[] | undefined> = {};
  for (const key of Object.keys(params)) {
    output[namespace + "-" + key] = params[key];
  }

  return output;
}

function namespaceParamList(namespace = "", params?: string[]) {
  if (!params) {
    return undefined;
  }

  if (!namespace) {
    return params;
  }

  return params.map((param) => namespace + "-" + param);
}

function mixSearchParams(
  oldParams: Record<string, string | string[] | undefined>,
  newParams: Record<string, string | string[] | undefined>,
  paramsToRemove: string[] = []
) {
  const newSet = { ...oldParams };

  for (const param of paramsToRemove) {
    delete newSet[param];
  }

  return { ...newSet, ...newParams };
}
