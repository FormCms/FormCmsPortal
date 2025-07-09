export const configs = {
    apiURL: import.meta.env.VITE_REACT_APP_API_URL ??'/api',
    assetURL:import.meta.env.VITE_REACT_APP_ASSET_URL ??'',
    portalRouterPrefix: import.meta.env.VITE_REACT_APP_PORTAL ?? '/portal',
    stripePublishableKey: import.meta.env.VITE_REACT_APP_STRING_PUBLISHABLE_KEY ?? '',
}
console.log({configs})