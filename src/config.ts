export const configs = {
    apiURL: import.meta.env.VITE_REACT_APP_API_URL ??'/api',
    assetURL:import.meta.env.VITE_REACT_APP_ASSET_URL ??'',
    authRouterPrefix:  import.meta.env.VITE_REACT_APP_AUTH_ROUTER_PREFIX ?? '/portal/auth',
    portalRouterPrefix: import.meta.env.VITE_REACT_APP_API_PORTAL ?? '/portal',
}
console.log({configs})