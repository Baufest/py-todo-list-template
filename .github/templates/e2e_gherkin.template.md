# Template - Archivo Gherkin E2E

> Template para generar el archivo `.feature` consolidado con los 30 escenarios
> E2E.
> Este archivo se genera en `reporting/[proyecto]-homologation-e2e.feature`

## Contenido del archivo .feature

```gherkin
# Generado automáticamente por E2E Gherkin Exporter - [Fecha]
# Proyecto: [Nombre del Proyecto]
# Repositorios: [Lista de repos analizados]

@e2e @regression @generated-by-e2e_gherkin_exporter
Feature: E2E [Nombre del Proyecto] - [Fecha]
  Suite completa de 30 escenarios E2E priorizados por criticidad.
  - Tier 1 (Críticos): 5 escenarios
  - Tier 2 (Importantes): 10 escenarios
  - Tier 3 (Complementarios): 15 escenarios

  Background:
    Given el usuario está autenticado en el sistema
    And los servicios backend están disponibles

  # ═══════════════════════════════════════════════════════════
  # TIER 1 - CRÍTICOS (5 escenarios)
  # ═══════════════════════════════════════════════════════════

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier1 @TEST-T1-001 @critical @smoke
  Scenario: [Nombre descriptivo del escenario T1-001]
    Given [precondición específica]
    When [acción del usuario]
    And [acción adicional si aplica]
    Then [resultado esperado principal]
    And [verificación adicional]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier1 @TEST-T1-002 @critical @smoke
  Scenario: [Nombre descriptivo del escenario T1-002]
    Given [precondición específica]
    When [acción del usuario]
    Then [resultado esperado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier1 @TEST-T1-003 @critical @smoke
  Scenario: [Nombre descriptivo del escenario T1-003]
    Given [precondición específica]
    When [acción del usuario]
    Then [resultado esperado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier1 @TEST-T1-004 @critical @smoke
  Scenario: [Nombre descriptivo del escenario T1-004]
    Given [precondición específica]
    When [acción del usuario]
    Then [resultado esperado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier1 @TEST-T1-005 @critical @smoke
  Scenario: [Nombre descriptivo del escenario T1-005]
    Given [precondición específica]
    When [acción del usuario]
    Then [resultado esperado]

  # ═══════════════════════════════════════════════════════════
  # TIER 2 - IMPORTANTES (10 escenarios)
  # ═══════════════════════════════════════════════════════════

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier2 @TEST-T2-001 @important
  Scenario: [Nombre descriptivo del escenario T2-001]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier2 @TEST-T2-002 @important
  Scenario: [Nombre descriptivo del escenario T2-002]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier2 @TEST-T2-003 @important
  Scenario: [Nombre descriptivo del escenario T2-003]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier2 @TEST-T2-004 @important
  Scenario: [Nombre descriptivo del escenario T2-004]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier2 @TEST-T2-005 @important
  Scenario: [Nombre descriptivo del escenario T2-005]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier2 @TEST-T2-006 @important
  Scenario: [Nombre descriptivo del escenario T2-006]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier2 @TEST-T2-007 @important
  Scenario: [Nombre descriptivo del escenario T2-007]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier2 @TEST-T2-008 @important
  Scenario: [Nombre descriptivo del escenario T2-008]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier2 @TEST-T2-009 @important
  Scenario: [Nombre descriptivo del escenario T2-009]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier2 @TEST-T2-010 @important
  Scenario: [Nombre descriptivo del escenario T2-010]
    Given [precondición]
    When [acción]
    Then [resultado]

  # ═══════════════════════════════════════════════════════════
  # TIER 3 - COMPLEMENTARIOS (15 escenarios)
  # ═══════════════════════════════════════════════════════════

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-001 @complementary
  Scenario: [Nombre descriptivo del escenario T3-001]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-002 @complementary
  Scenario: [Nombre descriptivo del escenario T3-002]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-003 @complementary
  Scenario: [Nombre descriptivo del escenario T3-003]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-004 @complementary
  Scenario: [Nombre descriptivo del escenario T3-004]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-005 @complementary
  Scenario: [Nombre descriptivo del escenario T3-005]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-006 @complementary
  Scenario: [Nombre descriptivo del escenario T3-006]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-007 @complementary
  Scenario: [Nombre descriptivo del escenario T3-007]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-008 @complementary
  Scenario: [Nombre descriptivo del escenario T3-008]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-009 @complementary
  Scenario: [Nombre descriptivo del escenario T3-009]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-010 @complementary
  Scenario: [Nombre descriptivo del escenario T3-010]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-011 @complementary
  Scenario: [Nombre descriptivo del escenario T3-011]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-012 @complementary
  Scenario: [Nombre descriptivo del escenario T3-012]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-013 @complementary
  Scenario: [Nombre descriptivo del escenario T3-013]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-014 @complementary
  Scenario: [Nombre descriptivo del escenario T3-014]
    Given [precondición]
    When [acción]
    Then [resultado]

  @e2e @regression @generated-by-e2e_gherkin_exporter @tier3 @TEST-T3-015 @complementary
  Scenario: [Nombre descriptivo del escenario T3-015]
    Given [precondición]
    When [acción]
    Then [resultado]
```

## Notas importantes

1. **Nombre del archivo final**: `reporting/[proyecto]-homologation-e2e.feature`
2. **Total de escenarios**: Exactamente 30 (5 + 10 + 15)
3. **Tags obligatorios**: `@e2e`, `@regression`,
   `@generated-by-e2e_gherkin_exporter`, `@tier{1|2|3}`, `@TEST-TX-00Y`, nivel
   de criticidad
4. **Background**: Precondiciones comunes a todos los escenarios
5. **Separadores visuales**: Usar líneas de comentarios para separar tiers

## Referencias

- **Guía de tags**: `.github/templates/gherkin_tags_guide.template.md`
- **Especificaciones funcionales**: `E2E-Functional-Specifications-[Proyecto]-[Fecha].md`
