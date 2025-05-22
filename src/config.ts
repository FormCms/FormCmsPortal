export const configs = {
    apiURL: import.meta.env.VITE_REACT_APP_API_URL ??'/api',
    assetURL:import.meta.env.VITE_REACT_APP_ASSET_URL ??'',
    portalRouterPrefix: import.meta.env.VITE_REACT_APP_PORTAL ?? '/portal',
}
console.log({configs})