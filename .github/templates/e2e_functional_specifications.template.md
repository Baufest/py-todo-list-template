# Template - Especificación Funcional E2E

> Usar este template para **Tier 1 / Tier 2 / Tier 3**.
> Reemplazar los placeholders `T{X}` y `00X` según corresponda.

## TEST-T{X}-00X: [Nombre Descriptivo de la Funcionalidad]

### 📋 Información General

- **ID:** TEST-T{X}-00X
- **Tier:** [1 - Crítico | 2 - Importante | 3 - Complementario]
- **Prioridad:** [Alta | Media-Alta | Media | Baja]
- **Tipo:** Smoke Test / Regression
- **Estimación implementación:** [X horas]

### 🎯 Objetivo del Test

**Qué se prueba:**
[Descripción clara de qué funcionalidad se está probando]

**Por qué es crítico:**
[Explicar el impacto de negocio si esta funcionalidad falla]

### 🏗️ Arquitectura Involucrada

**Repositorios afectados:**

- **[Repo A - Frontend]**: `ruta/al/componente.ts` - [Descripción del rol]
- **[Repo B - Gateway/BFF]**: `ruta/al/endpoint.js` - [Descripción del rol]
- **[Repo C - Backend]**: `ruta/al/servicio.java` - [Descripción del rol]

**Flujo técnico:**

```text
1. Usuario → [Repo A] Componente → Acción
2. [Repo A] → [Repo B] POST /api/endpoint con {payload}
3. [Repo B] → [Repo C] Validación en Service
4. [Repo C] → BD: Operación
5. [Repo C] → [Repo B]: Respuesta
6. [Repo B] → [Repo A]: Datos procesados
7. [Repo A]: Actualizar UI y confirmar al usuario
```

### 📦 Detalle funcional por módulo (obligatorio)

Para cada módulo involucrado en este test, documentar una ficha funcional resumida.

- **Módulo:** [Nombre]
  - **Tipo:** [Frontend | BFF/Gateway | Backend | Host/Transacción | Librería/DTO]
  - **Propósito:** [Qué aporta al flujo desde negocio]
  - **Entradas:** [inputs relevantes]
  - **Salidas:** [outputs relevantes]
  - **Validaciones observadas:** [reglas/normalizaciones]
  - **Errores/mensajes:** [mensajes funcionales si se exponen]
  - **Dependencias:** [módulos/sistemas]
  - **Datos sensibles:** [sí/no + cuáles]

### 📄 Contratos y transacciones (obligatorio)

- **API:** [método] [path]
  - **Request:** [campos obligatorios/opcionales + normalizaciones]
  - **Response:** [campos críticos + estados]
- **Host:** [ID transacción si aplica]
  - **Propósito:** [qué resuelve]
  - **Campos clave (si existe XML/definición):** [lista]

### 📚 Fuentes revisadas (obligatorio)

- `ruta/al/archivo`
- `ruta/al/archivo`

### 📝 Comportamiento Esperado

#### Escenario Principal: Happy Path

**Precondiciones:**

- [ ] [Condición 1]
- [ ] [Condición 2]
- [ ] [Condición 3]

**Pasos del usuario:**

1. El usuario navega a [página] (URL: `/ruta`)
2. El usuario [acción 1]
3. El usuario [acción 2]
4. El sistema [proceso]
5. El usuario [resultado final]

**Resultado esperado:**

- ✅ [Verificación 1]
- ✅ [Verificación 2]
- ✅ [Verificación 3]
- ✅ Tiempo de respuesta < [X] segundos

**Datos de prueba necesarios:**

```json
{
  "escenario_principal": {
    "campo1": "valor1",
    "campo2": "valor2",
    "expected_result": "resultado_esperado"
  }
}
```

#### Escenario Alternativo 1: [Nombre del Escenario]

**Qué probar:**
[Descripción del caso alternativo]

**Pasos:**

1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

**Resultado esperado:**

- ❌ [Qué NO debe pasar]
- ✅ [Qué SÍ debe pasar]

#### Escenario Alternativo 2: [Nombre del Escenario]

**Qué probar:**
[Descripción del caso alternativo]

**Pasos:**

1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

**Resultado esperado:**

- ❌ [Qué NO debe pasar]
- ✅ [Qué SÍ debe pasar]

### 🔍 Validaciones Clave

**Frontend ([Repo A]):**

- [ ] [Validación 1]
- [ ] [Validación 2]
- [ ] [Validación 3]

**Backend ([Repo C]):**

- [ ] [Validación 1]
- [ ] [Validación 2]
- [ ] [Validación 3]

**Integración:**

- [ ] [Validación cross-sistema 1]
- [ ] [Validación cross-sistema 2]

### ⚠️ Puntos de Falla Críticos

**¿Qué puede fallar?**

1. **[Componente/Servicio] no responde**
   - Impacto: [Descripción del impacto]
   - Detección: [Cómo se detecta]
   - Mensaje esperado: "[Mensaje al usuario]"

2. **[Otro punto de falla]**
   - Impacto: [Descripción]
   - Detección: [Cómo se detecta]
   - Mensaje esperado: "[Mensaje]"

### 📊 Métricas a Capturar

- Tiempo de respuesta del flujo completo
- Tiempo de respuesta de cada microservicio
- Tasa de éxito/fallo
- Número de reintentos necesarios

### 🔗 Dependencias y Consideraciones

**Dependencias externas:**

- [Servicio/Sistema externo 1]
- [Servicio/Sistema externo 2]

**Consideraciones de ambiente:**

- [Consideración 1]
- [Consideración 2]

### 📚 Referencias

- **Documentación de negocio:** [Link]
- **API Docs:** [Link a Swagger/OpenAPI]
- **Tickets relacionados:** JIRA-XXXX
