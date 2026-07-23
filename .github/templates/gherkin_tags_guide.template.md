# Guía de Tags y Ejecución - Gherkin E2E

> Esta guía complementa el template `e2e_gherkin.template.md` con información
> sobre tags, trazabilidad y ejecución.

## Tags Obligatorios

<!-- markdownlint-disable MD013 -->

| Tag              | Descripción                           | Uso                                     |
| ---------------- | ------------------------------------- | --------------------------------------- |
| `@tier1`         | Clasificación Tier 1 - Crítico        | Todos los escenarios T1                 |
| `@tier2`         | Clasificación Tier 2 - Importante     | Todos los escenarios T2                 |
| `@tier3`         | Clasificación Tier 3 - Complementario | Todos los escenarios T3                 |
| `@TEST-TX-00Y`   | ID único para trazabilidad Jira/Xray  | Todos los escenarios (X=tier, Y=número) |
| `@critical`      | Nivel de impacto crítico              | Opcional para Tier 1                    |
| `@important`     | Nivel de impacto importante           | Opcional para Tier 2                    |
| `@complementary` | Nivel de impacto complementario       | Opcional para Tier 3                    |
| `@smoke`         | Test de smoke (solo críticos)         | Opcional para Tier 1                    |
| `@e2e`           | Test end-to-end                       | Todos los escenarios                    |
| `@regression`    | Suite de regresión                    | Todos los escenarios                    |

<!-- markdownlint-enable MD013 -->

## Tags Opcionales

<!-- markdownlint-disable MD013 -->

| Tag                                  | Descripción                                                        | Ejemplo                                |
| ------------------------------------ | ------------------------------------------------------------------ | -------------------------------------- |
| `@generated-by-e2e_gherkin_exporter` | Identifica que el `.feature` fue generado por el agente exportador | `@generated-by-e2e_gherkin_exporter`   |
| `@repo-[nombre]`                     | Repositorio principal involucrado                                  | `@repo-frontend`, `@repo-backend`      |
| `@module-[nombre]`                   | Módulo funcional                                                   | `@module-claims`, `@module-procedures` |
| `@api-[nombre]`                      | API específica                                                     | `@api-procedures`, `@api-refunds`      |
| `@host-[txid]`                       | Transacción host                                                   | `@host-ASCRT310`, `@host-ASCRT120`     |

<!-- markdownlint-enable MD013 -->

## Ejemplos de Ejecución

### Ejecución por Tier

```bash
# Solo Tier 1 (smoke tests - críticos)
cucumber --tags "@tier1"

# Tier 1 + Tier 2 (regression diario)
cucumber --tags "@tier1 or @tier2"

# Suite completa (nightly/weekly)
cucumber --tags "@tier1 or @tier2 or @tier3"
```

### Ejecución por Funcionalidad

```bash
# Solo escenarios de un repositorio específico
cucumber --tags "@repo-frontend"

# Solo escenarios de una API específica
cucumber --tags "@api-procedures"

# Combinación: Tier 1 de un módulo específico
cucumber --tags "@tier1 and @module-claims"
```

### Ejecución Excluida

```bash
# Todos excepto Tier 3
cucumber --tags "not @tier3"

# Solo regresión sin smoke
cucumber --tags "@regression and not @smoke"
```

## Integración con Jira/Xray

### 1. Importar archivo Feature

```bash
# Xray REST API
curl -X POST "https://jira.company.com/rest/raven/2.0/import/feature" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@reporting/reclamos-homologation-e2e.feature"
```

### 2. Vincular con Test Cases

- Cada tag `@TEST-TX-00Y` se vincula automáticamente con el Test Case en Jira
- Ejemplo: `@TEST-T1-001` → Test Case `TEST-T1-001`

### 3. Ejecutar y Reportar

```bash
# Ejecutar tests y generar reporte JSON para Xray
cucumber --format json --out results.json

# Importar resultados a Xray
curl -X POST \
  "https://jira.company.com/rest/raven/2.0/import/execution/cucumber" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@results.json"
```

### 4. Trazabilidad con Requisitos

- Agregar tag adicional `@REQ-XXX` en el Feature/Scenario para vincular con
  User Stories
- Ejemplo: `@TEST-T1-001 @REQ-123` vincula el test con el requisito REQ-123

## Convenciones de Naming

### Escenarios

```gherkin
# Formato recomendado:
# [Acción] [Objeto] [Condición/Resultado esperado]

✅ Bueno: "Crear trámite de reclamo con datos válidos devuelve ID y confirmación"
✅ Bueno: "Consultar detalle de devolución con token válido retorna información completa"
❌ Malo: "Test 1"
❌ Malo: "Probar API"
```

### Background

```gherkin
# Usar Background para precondiciones comunes a todos los escenarios
Background:
  Given el usuario está autenticado en el sistema
  And los servicios backend están disponibles
  And la base de datos está en estado limpio
```

### Given/When/Then

```gherkin
# Given: Estado inicial / Precondiciones
Given el usuario está autenticado como "cliente_regular"
And existe un producto "4152110500000001" en estado activo

# When: Acción del usuario
When el usuario envía una solicitud de reclamo con los datos:
  | campo           | valor         |
  | procedureTypeId | "001"         |
  | reasonId        | "005"         |

# Then: Resultado esperado / Verificaciones
Then el sistema devuelve código HTTP 201
And la respuesta contiene un ID de trámite válido
And el estado del trámite es "REGISTRADO"
```

## Pipeline de CI/CD

### Ejemplo de configuración

```yaml
# .gitlab-ci.yml o .github/workflows/e2e-tests.yml
stages:
  - smoke
  - regression
  - full

smoke-tests:
  stage: smoke
  script:
    - cucumber --tags "@tier1"
  only:
    - merge_requests
    - main

regression-tests:
  stage: regression
  script:
    - cucumber --tags "@tier1 or @tier2"
  only:
    - schedules # Daily schedule

full-suite:
  stage: full
  script:
    - cucumber --tags "@tier1 or @tier2 or @tier3"
  only:
    - schedules # Weekly schedule
  when: manual
```

## Troubleshooting

### Tag duplicado

```gherkin
# ❌ Incorrecto (tag duplicado)
@tier1 @TEST-T1-001 @tier1
Scenario: Mi escenario

# ✅ Correcto
@tier1 @TEST-T1-001
Scenario: Mi escenario
```

### Background vs Given en cada Scenario

```gherkin
# Si la precondición es común a TODOS los escenarios → Background
# Si la precondición es específica de un escenario → Given en ese Scenario
```

### Escenarios muy largos

```gherkin
# Si un escenario tiene >10 pasos, considerar:
# 1. Dividir en múltiples escenarios
# 2. Usar Scenario Outline con Examples
# 3. Revisar si es realmente E2E o debería ser test de integración
```
