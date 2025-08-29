# 🎬 Catálogo de Shows - React Native

## 🚀 Cómo correr el proyecto

La app se desarrolló con **Expo (TypeScript, blank)** y está pensada para ser usada en dispositivos móviles (iOS y Android). 

### Pasos
1. Clonar el repositorio:  
```bash
git clone https://github.com/alassiamailen/catalogo-shows
````
Para levantarla:

2. Ejecutar en la terminal:
```bash
npm install
npx expo start
````
⚠️ Aclaración importante:
Si en Expo Go aparece el mensaje  
Unknown error: The internet connection appears to be offline  
ejecuta el siguiente comando en su lugar:  
npx expo start --tunnel

3. Instalar la app **Expo Go** en tu teléfono.  

4. Escanear el QR que aparece en la terminal o en el navegador con la cámara del celular.

## 🗄️ Funciones SQL implementadas

La app utiliza Supabase (Postgres) como base de datos.
Las funciones implementadas permiten obtener categorías, shows (novelas) y capítulos de manera simple y eficiente.

1. **Categorías**  
 Obtener todas las categorías  
SELECT * FROM categories;
- Uso: cargar el catálogo en la pantalla Home (cada categoría contiene un carrusel de shows).
2. **Shows**  
Obtener todas las novelas  
SELECT * FROM novels;

Obtener una novela por id  
SELECT * FROM novels
WHERE id = $1
LIMIT 1;  
- Uso:
getNovels: mostrar todas las novelas en los carruseles de Home.
- Uso:
    getNovelById: cargar la pantalla de detalle de una novela (título, poster, sinopsis).  

3. **Capítulos**  
Obtener capítulos de una novela por id, ordenados por número.  
SELECT *
FROM chapters
WHERE id_novel = $1
ORDER BY number ASC;  
- Uso: mostrar la lista de capítulos dentro del detalle de un show.        

**Flujo de datos en la app:**

Home: SELECT * FROM categories + SELECT * FROM novels

Detalle: SELECT * FROM novels WHERE id = $1 + SELECT * FROM chapters WHERE id_novel = $1 ORDER BY number ASC


## ⚙️ Decisiones técnicas

La app se desarrolló en **React Native con Expo (TypeScript, blank)** porque permite un desarrollo rápido y multiplataforma. La navegación se implementó con **Stack Navigation**, separando las pantallas de **Home** y **Detalle de Show**. Desde el Home se pasa el `id` de la novela como parámetro, que la pantalla de detalle utiliza para cargar la información correspondiente.

En el Home se utilizó **useEffect** para recuperar, al montar el componente, todas las novelas y las categorías asociadas, con dos consultas separadas. Se creó un **estado local** para guardar las categorías junto con sus novelas. En la pantalla de detalle (`ShowDetailScreen`) se recibe el `id` por props y se ejecuta un **useEffect** que realiza dos consultas: una para obtener los datos de la novela y otra para traer todos sus capítulos, guardando los resultados en dos estados locales distintos. La lógica de las consultas se ubicó en **servicios separados** para mantener los componentes limpios. No se implementaron joins complejos ni funciones almacenadas, ya que el proyecto era pequeño y la prioridad era la **funcionalidad y claridad del código**.

## 💡 Prompts usados en IA

Durante el desarrollo se utilizaron herramientas de IA para acelerar la implementación y explorar soluciones técnicas. Algunos de los prompts más importantes fueron:

- "Cómo implementar un carrusel horizontal en React Native utilizando reanimated-carousel".
- "Ejemplo de navegación con React Navigation, pasando parámetros entre pantalla Home y pantalla de Detalle".
- "Cómo consultar datos de Supabase desde React Native y manejar estados de carga y error".


## ⏩ Qué harías a continuación si tuvieras más tiempo

Si tuviera más tiempo, agregaría funcionalidades para mejorar la experiencia del usuario y la interacción con la app:

1. **Búsqueda de shows:** permitir al usuario buscar shows por título o filtrar por categoría, facilitando encontrar rápidamente lo que le interesa.

2. **Lista de favoritos:** agregar la opción de marcar novelas como favoritos y mantenerlos en una lista personal. Esto permitiría que los usuarios guarden las novelas que quieren ver más tarde, agregando personalización y valor a la app.  

---

¡Gracias por revisar mi proyecto! 🎬🍿
