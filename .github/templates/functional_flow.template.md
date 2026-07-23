# Template - Flujo Funcional E2E

> Template para documentar funcionalidades identificadas durante el análisis de repositorios.
> Usar la versión "Mínima" para análisis rápido o "Extendida" para detalle completo.

## Versión Mínima

```markdown
**Funcionalidad:** [Nombre descriptivo]

**Descripción:** [Qué hace desde el punto de vista del usuario]

**Flujo técnico:**
1. Usuario inicia acción en [Repo A - Componente X]
2. Llamada a API en [Repo B - Endpoint Y]
3. Procesamiento en [Repo C - Servicio Z]
4. Respuesta y visualización en [Repo A]

**Datos involucrados:** [Qué información se manipula]

**Validaciones:** [Qué reglas de negocio se aplican]

**Puntos de falla posibles:**
- [Lista de qué podría fallar en cada paso]
```

## Versión Extendida (recomendada por defecto)

```markdown
**Funcionalidad:** [Nombre descriptivo]

**Descripción:** [Qué hace desde el punto de vista del usuario]

**Flujo técnico:**
1. Usuario inicia acción en [Repo A - Componente X]
2. Llamada a API en [Repo B - Endpoint Y]
3. Procesamiento en [Repo C - Servicio Z]
4. Respuesta y visualización en [Repo A]

**Contratos (API/Host):**
- Endpoint: [método] [path]
- Request: [campos obligatorios/opcionales + normalizaciones]
- Response: [campos críticos + estados]
- Host: [ID transacción si aplica] + [propósito]

**Reglas funcionales y validaciones (observadas):**
- [regla 1]
- [regla 2]

**Mensajes y errores funcionales:**
- [mensaje/condición]

**Datos involucrados:** [Qué información se manipula]

**Puntos de falla posibles:**
- [Lista de qué podría fallar en cada paso]

**Fuentes revisadas:**
- `ruta/al/archivo`
- `ruta/al/archivo`
```

## Guía de uso

### Cuándo usar cada versión

- **Mínima**: Para análisis exploratorio inicial o cuando el tiempo es limitado
- **Extendida**: Para documentación completa (obligatorio para Tier 1 y Tier 2)

### Campos obligatorios

- **Funcionalidad**: Nombre claro y descriptivo
- **Descripción**: Perspectiva del usuario final
- **Flujo técnico**: Paso a paso entre repositorios
- **Contratos** (en versión extendida): Endpoints y transacciones host
- **Fuentes revisadas** (en versión extendida): Archivos consultados

### Campos opcionales

- **Datos involucrados**: Si hay información sensible o crítica
- **Validaciones**: Reglas de negocio observadas
- **Mensajes y errores**: Si se exponen al usuario

## Ejemplo completo

```markdown
**Funcionalidad:** Alta de Trámite de Reclamo Autogestivo

**Descripción:** Permite a un cliente registrar un nuevo trámite de reclamo de forma autogestiva, incluyendo datos del contacto, productos afectados, movimientos reclamados y cuenta de devolución.

**Flujo técnico:**
1. Usuario completa formulario en [Frontend - Componente AltaTramite]
2. Llamada a [ASO - POST /v0/procedures]
3. Procesamiento en [ASO arg-claimsproceduresv0 - Business Layer]
4. Invocación de transacción host [APX - ASCRT310-01-AR]
5. Respuesta con ID de trámite y estado
6. Frontend muestra confirmación al usuario

**Contratos (API/Host):**
- Endpoint: POST /v0/procedures
- Request: input (clientApplication, contact), owner, tipology, products[], devolutionAccount
- Response: id (UUID), rccr (número de reclamo), status, resolution
- Host: ASCRT310-01-AR (Alta de trámite autogestivo)

**Reglas funcionales y validaciones (observadas):**
- customerId obligatorio en owner
- Tipología requiere: id, procedureTypeId, productServiceTypeId, reasonId
- Productos requieren al menos un movimiento con fecha de operación y monto
- Validación de formato de fecha (yyyy-MM-dd)

**Mensajes y errores funcionales:**
- ERROR TOKEN INFORMADO: Token inválido o expirado
- ERROR GENERAR DE TOKEN: Fallo en generación de nuevo token
- Mensajes de validación por campo (code, message, type en response)

**Datos involucrados:** 
- Datos personales del cliente (nombre, apellido, documento, email, teléfono)
- Datos financieros (productos, movimientos, montos, cuenta de devolución)
- Clasificación del reclamo (tipología)

**Puntos de falla posibles:**
- Host no disponible (ASCRT310 sin respuesta)
- Token inválido o expirado
- Validación de campos obligatorios en input
- Formato de fecha incorrecto en movimientos
- Producto no encontrado o inactivo

**Fuentes revisadas:**
- `/ASO/arg-claimsproceduresv0/src/main/java/.../SrvClaimsAPIProceduresV0.java`
- `/ASO/arg-claimsproceduresv0/src/main/java/.../ClaimsCreateProceduresV0Business.java`
- `/ASO/arg-claimsproceduresv0/ASCRT310-01-AR.xml`
- `/APX/alta_tramite_austogestivo_dto/README.md`
```
