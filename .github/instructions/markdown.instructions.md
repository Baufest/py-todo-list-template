---
description: "Reglas del formato markdown aplicable a archivos que esten en *.md"
applyTo: "**/*.md"
---
<!-- MD041 disabled: Se omite H1 porque lo genera el sistema -->

# Introducción

Esta guía reúne y organiza los conceptos básicos de la sintaxis **Markdown**. Al finalizar, podrás redactar documentos estructurados, legibles y fácilmente convertibles a otros formatos (HTML, PDF, RTF, etc.).

---

## Índice rápido (Cheat Sheet)

- Elementos de bloque
  - Párrafos y saltos de línea
  - Encabezados
  - Citas
  - Listas (desordenadas, ordenadas y anidadas)
  - Código de bloque
  - Regla horizontal
- Elementos en línea
  - Énfasis (cursiva, negrita, combinados)
  - Enlaces (en línea y por referencia)
  - Código en línea
  - Imágenes
- Elementos varios
  - Enlaces automáticos
  - Omitir/escapar sintaxis (caracteres especiales)

---

## Elementos de bloque

### Párrafos y saltos de línea

- Un nuevo párrafo se crea dejando **una línea en blanco** entre bloques de texto.
- Markdown no conserva múltiples líneas en blanco consecutivas: se colapsan en una sola.
- Para un **salto de línea dentro del mismo párrafo**, añade **dos espacios** al final de la línea y luego pulsa Enter.

Ejemplo (poema Haiku):

```markdown
Andando con sus patitas mojadas,␠␠
el gorrión␠␠
por la terraza de madera
```

### Encabezados

Hay dos estilos:

1. Con almohadillas `#` (preferido):

```markdown
# Encabezado 1
## Encabezado 2
### Encabezado 3
#### Encabezado 4
##### Encabezado 5
###### Encabezado 6
```

(Puedes opcionalmente cerrar: `### Encabezado 3 ###` — solo estético.)

1. Subrayados (solo nivel 1 y 2):

```markdown
Esto es un encabezado 1
=======================

Esto es un encabezado 2
-----------------------
```

(No importa el número exacto de `=` o `-`.)

### Citas

Se crean anteponiendo `>` al inicio del párrafo.

```markdown
> Un país, una civilización se puede juzgar por la forma en que trata a sus animales. — Mahatma Gandhi
```

Citas con varios párrafos:

```markdown
> Primer párrafo de la cita.
>
> Segundo párrafo de la misma cita.
```

Citas anidadas:

```markdown
> Cita principal
> 
> > Cita interna (anidada)
> 
> Continúa la cita principal.
```

### Listas

#### Listas desordenadas

Puedes usar `-`, `*` o `+` (se verán igual). Mezclarlas no altera el resultado.

```markdown
- Elemento 1
- Elemento 2
* Elemento 3
+ Elemento 4
```

Anidación: añade **cuatro espacios** antes del marcador del siguiente nivel.

```markdown
- Elemento 1
  - Sub elemento 1.1
    - Sub elemento 1.1.1
```

#### Listas ordenadas

Usa la forma `n.`

```markdown
1. Paso 1
2. Paso 2
3. Paso 3
```

Puedes mezclar listas ordenadas y desordenadas:

```markdown
1. Elemento 1
2. Elemento 2
  - Sub elemento A
  - Sub elemento B
    1. Sub-sub 1
    2. Sub-sub 2
```

### Código de bloque (fenced code blocks)

Encierra el bloque entre tres virgulillas `~~~` o tres acentos invertidos ```.

```markdown
~~~
Texto o código en bloque.
Puedes añadir múltiples líneas.
~~~
```

Con especificación de lenguaje (recomendado):

```markdown
```javascript
console.log('Hola Markdown');
```

```

(Escapa los ejemplos aquí mentalmente: se muestra la sintaxis.)

### Regla horizontal
Crea una separación visual usando tres (o más) de: `***`, `---` o `___`.
```markdown
***
---
___
```

También puedes espaciar: `* * *`, `- - -`, `_ _ _`.

---

## Elementos en línea

### Énfasis

Puedes usar `*` o `_`.

| Markdown | Resultado |
|----------|-----------|
| `*cursiva*` | cursiva |
| `_cursiva_` | cursiva |
| `**negrita**` | negrita |
| `__negrita__` | negrita |
| `***cursiva y negrita***` | cursiva y negrita |
| `___cursiva y negrita___` | cursiva y negrita |

### Enlaces en línea

```markdown
[Texto del enlace](https://ejemplo.com)
```

### Enlaces por referencia

Separas la definición del uso para limpiar el cuerpo del texto.

```markdown
Me llamo Javier y tengo un [blog sobre productividad][blog].
Visítalo para más recursos.

[blog]: https://limni.net/blog/
```

### Código en línea

Usa acentos invertidos:

```markdown
`una línea de código`
```

Ejemplo: `npm install`.

### Imágenes

Sintaxis básica:

```markdown
![Texto alternativo](/ruta/a/imagen.jpg)
```

Con título emergente:

```markdown
![Texto alternativo](/ruta/a/imagen.jpg "Título descriptivo")
```

Con referencia:

```markdown
![Logo][img1]
![Banner][img2]

[img1]: /ruta/logo.png "Logo"
[img2]: /ruta/banner.png "Banner"
```

---

## Elementos varios

### Enlaces automáticos

Rodea la URL con `< >` para mostrarla explícita:

```markdown
<https://ejemplo.com>
```

### Omitir / escapar sintaxis

Precede con `\` cualquier carácter que no quieras que se interprete:

```markdown
\* no es cursiva
\_ no es cursiva
\# no es encabezado
```

Lista de caracteres escapables:

```text
\  barra invertida
`  acento invertido
*  asterisco
_  guión bajo
{} llaves
[] corchetes
() paréntesis
#  almohadilla
+  suma
-  guión
.  punto
!  exclamación
```

---

## Buenas prácticas

- Mantén los encabezados jerárquicos (no saltes de H2 a H5 sin necesidad).
- Usa listas para agrupar ideas relacionadas.
- Especifica lenguaje en bloques de código para resaltar sintaxis.
- Añade texto alternativo significativo en imágenes (accesibilidad).
- Reúne referencias de enlaces al final para mejorar la legibilidad del cuerpo.
- Escapa caracteres cuando expliques sintaxis.

---

## Ejemplo completo

```markdown
## Proyecto Demo

Descripción breve del proyecto.

### Instalación
1. Clona el repositorio.
2. Instala dependencias: `npm install`
3. Ejecuta: `npm start`

### Código de ejemplo
```js
function saludar(nombre) {
  return `Hola, ${nombre}!`;
}
```

### Recursos

- [Documentación oficial](https://ejemplo.com/docs)
- ![Logo][logo]

[logo]: /assets/logo.png "Logo del Proyecto"

---

## Próximos pasos

Ahora que dominas la sintaxis esencial de Markdown, puedes:

- Crear documentación técnica.
- Escribir artículos y posts.
- Preparar README de proyectos.
- Generar notas limpias y versionables.

Ajusta los campos de la cabecera (front matter) antes de publicar: categorías, autor, alias y URL de imagen.

---

## Pendientes de personalización

- Reemplazar `PENDIENTE_CATEGORIA` por categorías válidas de `categories.txt`.
- Ajustar `author1`, `microsoft_alias`, `featured_image`.
- Verificar consistencia de enlaces e imágenes reales.

---
