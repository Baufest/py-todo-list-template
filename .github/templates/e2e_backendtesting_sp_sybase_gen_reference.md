---
name: e2e_backendtesting_sp_sybase_gen
description: Template de referencia con ejemplos concretos, errores comunes y checklist para el agente de automatización de tests backend sobre Stored Procedures Sybase en BBVA Argentina.
version: 4.0
---

# Template de Referencia - Automatización de Tests Backend para Stored Procedures Sybase

> **Versión 4.0** - Ejemplos concretos, errores comunes y checklist de validación. Las reglas, patrones y workflow completo están definidos en el agente (`e2e_backendtesting_sp_sybase_gen.agent.md`).

---

## 1. Ejemplo de Análisis de SP Productivo

```sql
-- FIRMA:
CREATE PROC SaldosCustodias @Canal  VARCHAR(10) = NULL,
                            @Ctas   VARCHAR(550),
                            @dbg    INT         = 0

-- BASE: USE PROD
-- TABLAS INTERNAS: #PosicionGlobal, #ctas, #Detalle, #Saldos, #especiesM_FchPr
-- TABLAS ORIGEN: PROD..Str, PROD..Cte, Custodia.._Cuenta, _Esp,
--                Custodia.._RelEspGrupo, Custodia.._ItemsDeTablas,
--                _OMSPrcPrecios, FCI, FCICierrePrecios, AssetClass,
--                SiglaSIB, _RendimientoCtaEsp, PROD..FCI
-- SUB-SP: EXEC Custodia..SdoDevCol_int, EXEC CloseFmSybase_Masivo_FchPr
-- SALIDA: SELECT ... FROM #Detalle ORDER BY CtaNro, Moneda, TipoEspecie, ...
-- TABLA TESTING: #Detalle -> #Detalle_TESTING (28 columnas)
```

---

## 2. Ejemplo de SP CLON

### Header del CLON

```sql
CREATE PROC <NombreSP>CLON @param1 TIPO = DEFAULT,
                           @param2 TIPO,
                           @param3 TIPO = DEFAULT
AS
/*----------------------------------------------------------------------
NOMBRE:     <NombreSP>CLON
FUNCION:    CLON del SP <NombreSP> para testing.
            <Descripción original del SP>

            MODIFICACION CLON: Al final, antes de la salida, se usa
            EXECUTE() para insertar datos en #NombreTabla_TESTING.
            El EXECUTE evita que Sybase valide las tablas en tiempo
            de compilacion.
            Esta tabla temporal debe ser creada por el test antes
            de ejecutar este SP.

CLON generado para testing automatizado - QA BBVA Argentina
----------------------------------------------------------------------*/
```

### Variables auxiliares de testing

```sql
-- ========================================================================
-- CLON: Variables adicionales para testing
-- ========================================================================
DECLARE @tblTesting VARCHAR(60), @sqlTesting VARCHAR(2000)
```

### Inyección EXECUTE() - Ejemplo real (SaldosCustodiasCLON)

```sql
SELECT @tblTesting = '#Detalle' + '_TESTING'

IF OBJECT_ID('tempdb..' + @tblTesting) IS NOT NULL
BEGIN
    SELECT @sqlTesting = 'INSERT INTO ' + @tblTesting +
        ' (IdTipoEspecie, TipoEspecie, SucNro, CtaNro, Abrev, Moneda, ' +
        '  Valorizado, Nominales, ValorizadoBloqueado, NominalesBloqueado, ' +
        '  Cotizacion, FechaCotizacion, GrEspCod, PlazoVenta, FNetOpera, ' +
        '  CodigoComercial, NombreComercial, AssetClass, OrdenFCI, ' +
        '  DescAssetClass, OrdenAssetClass, HabSuscripcion, HabRescate, ' +
        '  Sigla, Agenda, RendMonto, RendPorc, EsCERA) ' +
        ' SELECT IdTipoEspecie, TipoEspecie, SucNro, CtaNro, Abrev, Moneda, ' +
        '  Valorizado, Nominales, ValorizadoBloqueado, NominalesBloqueado, ' +
        '  Cotizacion, FechaCotizacion, GrEspCod, PlazoVenta, FNetOpera, ' +
        '  CodigoComercial, NombreComercial, AssetClass, OrdenFCI, ' +
        '  DescAssetClass, OrdenAssetClass, HabSuscripcion, HabRescate, ' +
        '  Sigla, Agenda, RendMonto, RendPorc, EsCERA ' +
        ' FROM #Detalle'
    EXECUTE(@sqlTesting)
END
```

### Concatenación obligatoria del nombre de tabla

```sql
-- CORRECTO: Sybase no intenta resolver la tabla en compilación
SELECT @tblTesting = '#NombreTabla' + '_TESTING'

-- INCORRECTO: Sybase intenta resolver la tabla en compilación y da error
INSERT INTO #NombreTabla_TESTING ...
```

---

## 3. Ejemplo de Datos de Prueba Verificados

| Parámetro | Valor | Resultado | Tests asignados |
|-----------|-------|-----------|-----------------|
| `@Canal='FNet', @Ctas='00005438819'` | Canal FNet + cuenta válida | EXEC OK con datos | Test 01, Test 06..08 |
| `@Canal=NULL, @Ctas='00005438819'` | Sin canal + cuenta válida | EXEC OK con datos | Test 02, Test 10..13 |
| `@Canal='FNet', @Ctas='99999999999'` | Canal FNet + cuenta inexistente | Sin datos | Test 03 |
| `@Canal='FNetEmp', @Ctas='00005438819'` | Canal FNetEmp | EXEC OK | Test 09, Test 20 |

---

## 4. Ejemplo de SP Cáscara

```sql
-- =====================================================================
-- Test: Test_SDOCUST_T1_01_EjecBasica
-- Tier: 1 - Crítico (solo si el .feature incluye clasificación de tier)
-- Objetivo: Validar ejecución básica con canal FNet y cuenta válida
-- SP: SaldosCustodiasCLON
-- Parámetros: @Canal='FNet', @Ctas='00005438819'
-- =====================================================================
USE PROD
GO
IF OBJECT_ID('dbo.Test_SDOCUST_T1_01_EjecBasica') IS NOT NULL
    DROP PROC dbo.Test_SDOCUST_T1_01_EjecBasica
GO
CREATE PROC dbo.Test_SDOCUST_T1_01_EjecBasica
AS
BEGIN
    -- 1. CREAR tabla temporal de TESTING
    CREATE TABLE #Detalle_TESTING
    (
        IdTipoEspecie       int          NULL,
        TipoEspecie         varchar(1)   NULL,
        SucNro              int          NULL,
        CtaNro              int          NULL,
        Abrev               varchar(10)  NULL,
        Moneda              varchar(10)  NULL,
        Valorizado          float        NULL,
        Nominales           float        NULL,
        ValorizadoBloqueado float        NULL,
        NominalesBloqueado  float        NULL,
        Cotizacion          float        NULL,
        FechaCotizacion     datetime     NULL,
        GrEspCod            int          NULL,
        PlazoVenta          int          NULL,
        FNetOpera           CHAR(1)      NULL,
        CodigoComercial     varchar(10)  NULL,
        NombreComercial     varchar(60)  NULL,
        AssetClass          int          NULL,
        OrdenFCI            int          NULL,
        DescAssetClass      varchar(32)  NULL,
        OrdenAssetClass     int          NULL,
        HabSuscripcion      VARCHAR(1)   NULL,
        HabRescate          VARCHAR(1)   NULL,
        Sigla               VARCHAR(10)  NULL,
        Agenda              VARCHAR(1)   NULL,
        RendMonto           float        NULL,
        RendPorc            float        NULL,
        EsCERA              VARCHAR(1)   NULL
    )

    -- 2. Declarar y setear parámetros
    DECLARE @Canal VARCHAR(10), @Ctas VARCHAR(550)
    SELECT @Canal = 'FNet'
    SELECT @Ctas = '00005438819'

    -- 3. Ejecutar el SP CLON
    EXEC dbo.SaldosCustodiasCLON @Canal, @Ctas

    -- 4. Validar que hay datos
    IF NOT EXISTS (SELECT 1 FROM #Detalle_TESTING)
    BEGIN
        DROP TABLE #Detalle_TESTING
        RETURN 1 -- Falla: Sin datos en tabla _TESTING
    END

    -- 5. Validación específica: campos clave no nulos
    IF EXISTS (SELECT 1 FROM #Detalle_TESTING WHERE Abrev IS NULL)
    BEGIN
        DROP TABLE #Detalle_TESTING
        RETURN 2 -- Falla: Abrev es NULL
    END

    -- 6. Éxito
    DROP TABLE #Detalle_TESTING
    RETURN 0
END
GO
GRANT EXECUTE ON dbo.Test_SDOCUST_T1_01_EjecBasica TO usr_trp_mule
GO
```

---

## 5. Ejemplo de JSON para Bruno/Mule

```json
{
    "environment": {
        "environment": "dist",
        "engine": "sybase",
        "dataBase": "<BaseDatos>",
        "url": "jdbc:sybase:Tds:BBVADESA01:9001/<BaseDatos>",
        "spReturnCode": "true"
    },
    "requestWithoutBucket": {
        "storeProcedure": "dbo.Test_<PREFIJO>_[NN]_<Desc>"
    }
}
```

| Campo | Valor | Descripción |
|-------|-------|-------------|
| `engine` | `sybase` | Motor de BD |
| `dataBase` | Depende del SP | `Custodia`, `PROD`, u otra base |
| `url` | `jdbc:sybase:Tds:BBVADESA01:9001/<DB>` | Servidor DSDESA01 |
| `spReturnCode` | `"true"` | **Crítico**: Habilita lectura del return code |
| `storeProcedure` | `dbo.Test_<nombre>` | Nombre completo del SP |

---

## 6. Ejemplo de Informe de Trazabilidad

```markdown
# Informe de Trazabilidad - <NombreSP>

## 1. SP Analizado
- Nombre: <NombreSP>
- Base de datos: <DB>
- Lógica de negocio: <resumen>

## 2. Artefactos Generados
| Artefacto | Archivo |
|-----------|---------|
| SP CLON | <NombreSP>CLON.sql |
| Script CREATE ALL | UNIFIED_CREATE_ALL_SP_<NombreSP>.sql |
| Informe | INFORME_<NombreSP>.md |

## 3. Tabla de Trazabilidad
| SP Cáscara | Escenario Gherkin | Tier | Qué Valida |
|------------|-------------------|------|------------|
| Test_XXX_01_Desc | Scenario: ... | (si aplica) | Ejecución básica |
| ... | ... | ... | ... |

## 4. Instrucciones de Despliegue
1. Ejecutar el SP CLON en la base <DB>
2. Ejecutar el script CREATE ALL en la base <DB>
3. Dar permisos a usr_trp_mule para todos los SPs
4. Verificar con: EXEC dbo.Test_XXX_01_Desc (debe retornar 0)

## 5. Permisos Requeridos
GRANT EXECUTE ON dbo.<NombreSP>CLON TO usr_trp_mule
GRANT EXECUTE ON dbo.Test_XXX_01_Desc TO usr_trp_mule
-- ... para cada SP ...
```

---

## 7. Ejemplo de Informe de Valor Comparativo

```markdown
# Informe de Valor - e2e_backendtesting_sp_sybase_gen

## 1. Resumen de la Tarea Ejecutada
- **SP(s) automatizado(s)**: <NombreSP> (y otros si aplica)
- **Artefactos generados**: SP CLON, N SPs cáscara, CREATE ALL, Informe
- **Fecha de ejecución**: <fecha>

## 2. Tiempo de Ejecución del Agente
| Fase | Duración |
|------|----------|
| Análisis del SP | X min |
| SP CLON | X min |
| Datos de prueba | X min |
| N SPs cáscara | X min |
| CREATE ALL | X min |
| Informe trazabilidad | X min |
| **Total agente** | **X min** |

## 3. Tabla Comparativa
| Perfil | Tiempo Estimado | Factor vs Agente | Ahorro |
|--------|----------------|-------------------|--------|
| **Agente IA** | X min | 1x (baseline) | - |
| **Junior** | Y horas | Nx | Z% |
| **Semi-Senior** | W horas | Mx | V% |
| **Senior** | U horas | Px | Q% |

## 4. Valor Aportado
Concluir con el valor cuantificado del uso del agente.
```

---

## 8. Errores Comunes y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `Implicit conversion from datatype INT to VARCHAR` | Se pasa un INT a un parámetro VARCHAR posicional | Usar parámetros con nombre (`@informar=1, @dbg=1`) |
| `X not found. Specify owner.objectname` | Falta el prefijo de base de datos (`PROD..`) | Verificar en el SP original dónde se referencia cada tabla |
| `#tabla_TESTING siempre vacía` | Las tablas temporales de sub-SPs no son visibles desde el scope padre | Insertar desde la tabla temporal del SP actual, no de sub-SPs |
| SP se trunca a 30 caracteres | Sybase trunca nombres de procedures mayor a 30 chars | Usar nombres cortos. Verificar longitud antes de crear |
| Parámetro no retorna datos | La cuenta/operación fue purgada o no existe en el ambiente | Siempre verificar con EXEC antes de usar. Documentar |

---

## 9. Checklist Final

- [ ] Archivo(s) `.feature` con escenarios Gherkin recibido(s) como input
- [ ] SP(s) productivo(s) recibido(s) completo(s)
- [ ] SP CLON creado sin modificar la lógica original
- [ ] Tabla `#NombreTabla_TESTING` definida con todas las columnas
- [ ] Parámetros de prueba verificados con EXEC y documentados
- [ ] N SPs cáscara generados (uno por cada escenario Gherkin)
- [ ] Script CREATE ALL con DROP IF EXISTS + CREATE + GRANT
- [ ] Todos los SPs con nombre de 30 caracteres o menos
- [ ] Prefijos de base de datos verificados en queries cross-DB
- [ ] Parámetros con nombre usados donde hay VARCHAR opcionales
- [ ] Permisos `usr_trp_mule` asignados a todos los SPs
- [ ] Informe de trazabilidad completo (SP cáscara ↔ escenario Gherkin)
- [ ] Informe de valor comparativo generado con tabla de tiempos
- [ ] DROP TABLE antes de cada RETURN en todos los SPs cáscara

---

## 10. Ejemplo Real Completado

### Proyecto: SaldosCustodiasCLON

| Ítem | Detalle |
|------|---------|
| SP Productivo | `SaldosCustodias` |
| SP CLON | `SaldosCustodiasCLON` |
| Base | `PROD` |
| Tabla testing | `#Detalle_TESTING` (28 columnas) |
| Prefijo SPs | `Test_SDOCUST_*` |
| Script CREATE ALL | `UNIFIED_CREATE_ALL_SP_SaldosCustodias.sql` |
| Parámetros | `@Canal`, `@Ctas`, `@dbg` |
| Sub-SPs | `Custodia..SdoDevCol_int`, `CloseFmSybase_Masivo_FchPr` |

### Tabla temporal #Detalle_TESTING (28 columnas)

```sql
CREATE TABLE #Detalle_TESTING
(
    IdTipoEspecie       int          NULL,
    TipoEspecie         varchar(1)   NULL,
    SucNro              int          NULL,
    CtaNro              int          NULL,
    Abrev               varchar(10)  NULL,
    Moneda              varchar(10)  NULL,
    Valorizado          float        NULL,
    Nominales           float        NULL,
    ValorizadoBloqueado float        NULL,
    NominalesBloqueado  float        NULL,
    Cotizacion          float        NULL,
    FechaCotizacion     datetime     NULL,
    GrEspCod            int          NULL,
    PlazoVenta          int          NULL,
    FNetOpera           CHAR(1)      NULL,
    CodigoComercial     varchar(10)  NULL,
    NombreComercial     varchar(60)  NULL,
    AssetClass          int          NULL,
    OrdenFCI            int          NULL,
    DescAssetClass      varchar(32)  NULL,
    OrdenAssetClass     int          NULL,
    HabSuscripcion      VARCHAR(1)   NULL,
    HabRescate          VARCHAR(1)   NULL,
    Sigla               VARCHAR(10)  NULL,
    Agenda              VARCHAR(1)   NULL,
    RendMonto           float        NULL,
    RendPorc            float        NULL,
    EsCERA              VARCHAR(1)   NULL
)
```
