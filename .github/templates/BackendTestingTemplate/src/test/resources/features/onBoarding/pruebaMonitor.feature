@ejecutar
Feature: executeMonitorValidaciones

  Background:
    Given se configura "/fnetcore/servicios/parametros/configuracioncics"
    Then compruebo que la respuesta contiene estado 200
    And realizo el prelogin "/fnetcore/servicios/login/prelogin"
    And realizo el login "/fnetcore/servicios/login/postlogin"

  @Tier1
  Scenario: Tier1 - Valida status code de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que la respuesta contiene estado 200

  @Tier1
  Scenario: Tier1 - Valida status code de Sets
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/sets" con cookies y obtengo el response "responseMonitor"
    Then compruebo que la respuesta contiene estado 200

  @Tier1
  Scenario: Tier1 - Valida status code de Sets
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/sets" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.statusCode" es equivalente a "200"

  @Tier1
  Scenario: Tier1 - Valida status code de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.statusCode" es equivalente a "200"

  @Tier1
  Scenario: Tier1 - Valida ID de MonitoreoCanal de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.idCanal" es equivalente a "GL"

  @Tier2
  Scenario: Tier2 - Valida UsuariosOnline de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.usuariosOnline" no es nula

  @Tier2
  Scenario: Tier2 - Valida Elemento de la Lista de elementos SAM de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].elemento" es equivalente a "TRX BTK0"

  @Tier2
  Scenario: Tier2 - Valida descripcion de Lista de elementos SAM
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].descripcion" no es nula

  @Tier2
  Scenario: Tier2 - Valida Cantidad de Ejecuciones de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].cantidadEjecuciones" no es nula

  @Tier2
  Scenario: Tier2 - Valida Cantidad de Ejecuciones Exitosas de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].cantidadEjecucionesExitosas" no es nula

  @Tier2
  Scenario: Tier2 - Valida Cantidad de Errores de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].cantidadErrores" no es nula

  @Tier2
  Scenario: Tier2 - Valida tipo de elemento respuesta SAM
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[1].elemento" no es nula

  @Tier2
  Scenario: Tier2 - Valida cantidad de ejecuciones
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[1].cantidadEjecuciones" no es nula

  @Tier2
  Scenario: Tier2 - Valida el link de la lista de Elementos SAM
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].link" es equivalente a "http://wiki.arg.igrupobbva/desawiki/index.php/BTK0"

  @Tier2
  Scenario: Tier2 - Valida ultima fecha de ejecucion
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].fechaUltimaEjecucion" no es nula

  @Tier3
  Scenario: Tier3 - Valida ultima fecha de ejecucion exitosa
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].fechaUltimaEjecucionExitosa" no es nula

  @Tier3
  Scenario: Tier3 - Valida tiempo promedio de ejecucion
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].tiempoPromedioEjecucion" no es nula

  @Tier3
  Scenario: Tier3 - Valida fecha de inicio del servicio
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.fechaInicioServicio" no es nula

  @Tier3
  Scenario: Tier3 - Valida el tipo de respuesta del detalle de respuesta SAM
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].detalleRespuestaSAM[0].tipoRespuesta" es equivalente a "ERROR"

  @Tier3
  Scenario: Tier3 - Valida el codigo en el detalle de respuesta SAM
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].detalleRespuestaSAM[0].codigo" es equivalente a "ERRTECN"

  @Tier3
  Scenario: Tier3 - Valida mensaje en el detalle de respuesta SAM
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].detalleRespuestaSAM[0].mensaje" es equivalente a "VTAM SENSE 0000 DFH 0000"

  @Tier3
  Scenario: Tier3 - Valida el nombre de filtro de sets
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/sets" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result[0].nombreFiltro" es equivalente a "agregacion"

  @Tier3
  Scenario: Tier3 - Valida transacciones de sets
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/sets" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result[0].transacciones[0]" es equivalente a "WS ESB AGREGACION CANCELAR PROCESO"

  @Tier3
  Scenario: Tier3 - Valida el nombre de filtro de sets
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/sets" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result[1].nombreFiltro" es equivalente a "bancaporemail"

  @Tier3
  Scenario: Tier3 - Valida transacciones de sets
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/sets" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result[1].transacciones[1]" es equivalente a "TRX BTB1"

  @Tier3
  Scenario: Tier3 - Valida el nombre de filtro de sets
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/sets" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result[2].nombreFiltro" es equivalente a "biometria"

  @Tier3
  Scenario: Tier3 - Valida Elemento de la Lista de elementos SAM[0] de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].elemento[1]" no es nula

  @Tier3
  Scenario: Tier3 - Valida Elemento de la Lista de elementos SAM[0] de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].elemento[2]" no es nula

  @Tier3
  Scenario: Tier3 - Valida Elemento de la Lista de elementos SAM[0] de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].elemento[3]" no es nula

  @Tier3
  Scenario: Tier3 - Valida Elemento de la Lista de elementos SAM[0] de GL
    Then consulto "/fnetcore/servicios/monitoreo/monitorelementossam/GL" con cookies y obtengo el response "responseMonitor"
    Then compruebo que el valor de la propiedad "$responseMonitor.result.monitoreoCanal.rangoActualMonitoreoSAM.listaElementosSAM[0].elemento[4]" no es nula