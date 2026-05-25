# 🚀 Guía de Deploy a Vercel - Kura Chat (Casa Kura)

## Requisitos Previos

- Cuenta en [Vercel](https://vercel.com) (gratis)
- - Repositorio en GitHub
  - - API key de Anthropic (https://console.anthropic.com/settings/keys)
   
    - ## Pasos para Deploy Automático
   
    - ### 1. Conectar Repositorio a Vercel
   
    - 1. Inicia sesión en [Vercel.com](https://vercel.com)
      2. 2. Haz clic en "New Project"
         3. 3. Selecciona "Import Git Repository"
            4. 4. Conecta tu cuenta de GitHub
               5. 5. Selecciona el repositorio `Casa-Kura-app`
                  6. 6. Haz clic en "Import"
                    
                     7. ### 2. Configurar Variables de Entorno
                    
                     8. En la sección **Environment Variables** (durante o después del import):
                    
                     9. **Variable Name:** `VITE_ANTHROPIC_API_KEY`
                     10. **Value:** Tu API key de Anthropic (sk-ant-...)
                    
                     11. **Variable Name:** `VITE_CLAUDE_MODEL`
                     12. **Value:** `claude-opus-4-7`
                    
                     13. **Variable Name:** `VITE_MAX_TOKENS`
                     14. **Value:** `1024`
                    
                     15. ### 3. Deploy
                    
                     16. 1. Haz clic en "Deploy"
                         2. 2. Vercel compilará y desplegará automáticamente
                            3. 3. Tu app estará disponible en `https://[nombre-proyecto].vercel.app`
                              
                               4. ## Configuración Automática
                              
                               5. El archivo `vercel.json` configura automáticamente:
                              
                               6. - **Build Command:** `npm run build`
                                  - - **Output Directory:** `dist`
                                    - - **Node Version:** 18.x compatible
                                     
                                      - ## Después del Deploy
                                     
                                      - - El sitio se actualizará automáticamente con cada push a `main`
                                        - - Vercel proporciona automatización de CI/CD
                                          - - Los logs de build están disponibles en el dashboard de Vercel
                                           
                                            - ## Actualizar API Key en Producción
                                           
                                            - Si necesitas cambiar la API key:
                                           
                                            - 1. Ve a **Vercel Dashboard**
                                              2. 2. Selecciona tu proyecto
                                                 3. 3. **Settings** → **Environment Variables**
                                                    4. 4. Edita `VITE_ANTHROPIC_API_KEY`
                                                       5. 5. Haz un nuevo push a `main` para redeployar
                                                         
                                                          6. ## Notas de Seguridad
                                                         
                                                          7. ✅ API keys están seguras en variables de entorno de Vercel
                                                          8. ✅ No se exponen en el código fuente
                                                          9. ✅ .env está en .gitignore
                                                         
                                                          10. ## Troubleshooting
                                                         
                                                          11. **Error: API key no válido**
                                                          12. - Verifica que copié correctamente la key de Anthropic
                                                              - - Asegúrate que la key empieza con `sk-ant-`
                                                               
                                                                - **Error: Build fallido**
                                                                - - Revisa los logs en Vercel Dashboard
                                                                  - - Verifica que `npm install` y `npm run build` funcionan localmente
                                                                   
                                                                    - **Chat no funciona**
                                                                    - - Abre la consola del navegador (F12)
                                                                      - - Busca errores sobre la API de Anthropic
                                                                        - - Verifica que VITE_ANTHROPIC_API_KEY esté configurada
                                                                         
                                                                          - ¡Listo! Tu Kura Chat está en producción. 🎉
