# Despliegue en Servidor Apache

## Pasos para desplegar la aplicación

### 1. Construir la aplicación
Ejecuta el siguiente comando en tu terminal local:

```bash
npm run build
```

Este comando generará una carpeta `dist/` con todos los archivos optimizados y listos para producción.

### 2. Contenido de la carpeta dist/
Después del build, la carpeta `dist/` contendrá:
- `index.html` - Archivo HTML principal
- `assets/` - Archivos JavaScript, CSS e imágenes optimizados
- `.htaccess` - Configuración para Apache
- `robots.txt` - Configuración para motores de búsqueda

### 3. Subir archivos al servidor Apache

#### Opción A: Subir todo el contenido de dist/
1. Conecta a tu servidor via FTP, SFTP o panel de control
2. Navega a la carpeta pública (usualmente `public_html/`, `www/`, o `htdocs/`)
3. Sube **todo el contenido** de la carpeta `dist/` (NO la carpeta dist/ en sí)

#### Opción B: Subir a una subcarpeta
Si quieres que la app esté en `tudominio.com/portal/`:
1. Crea una carpeta `portal/` en tu directorio público
2. Sube el contenido de `dist/` a esa carpeta
3. Modifica el archivo `vite.config.ts` antes del build:
   ```typescript
   export default defineConfig(({ mode }) => ({
     base: '/portal/', // Añade esta línea
     server: {
       host: "::",
       port: 8080,
     },
     // ... resto de la configuración
   }))
   ```
4. Vuelve a ejecutar `npm run build`

### 4. Requisitos del servidor Apache

Asegúrate que tu servidor Apache tenga estos módulos habilitados:
- `mod_rewrite` (requerido para React Router)
- `mod_deflate` (opcional, para compresión)
- `mod_expires` (opcional, para caché)
- `mod_headers` (opcional, para headers de seguridad)

### 5. Verificar el despliegue

Visita tu dominio en el navegador:
- Si está en la raíz: `https://tudominio.com`
- Si está en subcarpeta: `https://tudominio.com/portal/`

### 6. Solución de problemas comunes

#### Error 404 al navegar entre páginas
- Verifica que el archivo `.htaccess` esté presente
- Confirma que `mod_rewrite` esté habilitado en Apache
- Revisa los permisos del archivo `.htaccess` (644)

#### Los estilos no cargan
- Verifica que la ruta base en `vite.config.ts` sea correcta
- Revisa los permisos de la carpeta `assets/` (755 para carpetas, 644 para archivos)

#### Imágenes no aparecen
- Asegúrate que todas las imágenes en `src/assets/` se hayan copiado correctamente
- Verifica las rutas de importación en los componentes

### 7. Actualizar la aplicación

Para actualizar la aplicación en el futuro:
1. Haz cambios en tu código local
2. Ejecuta `npm run build` nuevamente
3. Sube el nuevo contenido de `dist/` reemplazando los archivos anteriores

## Estructura final en el servidor

```
public_html/  (o www/ o htdocs/)
├── index.html
├── .htaccess
├── robots.txt
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── [imágenes y otros archivos]
```

## Notas importantes

- **NO subas** la carpeta `node_modules/`, `src/`, ni otros archivos de desarrollo
- **Solo sube** el contenido de la carpeta `dist/`
- El archivo `.htaccess` ya está configurado y se incluirá automáticamente en el build
- Para dominios con HTTPS, descomenta las líneas de redirección HTTPS en `.htaccess`
