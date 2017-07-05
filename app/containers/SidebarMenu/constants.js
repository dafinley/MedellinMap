export const LOAD_ROUTES = 'medellin/SidebarMenu/LOAD_ROUTES';
export const LOAD_ROUTES_SUCCESS = 'medellin/SidebarMenu/LOAD_ROUTES_SUCCESS';
export const LOAD_ROUTES_ERROR = 'medellin/SidebarMenu/LOAD_ROUTES_ERROR';
export const URL_FUSION_TABLE = "https://www.googleapis.com/fusiontables/v1/query";
export const ID_FUSION_TABLE = "1_ihDJT-_zFRLXb526aaS0Ct3TiXTlcPDy_BlAz0";
export const KEY_FUSION_TABLE = "AIzaSyC59BP_KRtQDLeb5XM_x0eQNT_tdlBbHZc";
export const FUSION_ROUTE_URL = URL_FUSION_TABLE+"?sql=SELECT Nombre_Rut,CODIGO_RUT FROM "+ID_FUSION_TABLE+"&key="+KEY_FUSION_TABLE;
export const FUSION_GEO_URL = (routeName, fusionTable, fusionTableId, fusionTableKey) => `${fusionTable}?sql=SELECT geometry FROM ${fusionTableId} WHERE CODIGO_RUT='${routeName}'&key=${fusionTableKey}`;
