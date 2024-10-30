<?php 
public function nuevoCaso()
        {
                $casoModel = new Casos();
                $tipoPIModel = new PropiedadIntelectual();
                $oficina = new Oficinas();
                $reqModel = new RequerimientoUsuario();
                $model_Auditoria_sistema_Model = new Auditoria_sistema_Model();
                $segModel = new Seguimientos();
                $Registro_cgr_Model = new Registro_cgr_Model();
                $Casos_denuncias = new Casos_denuncias_Model();
                //Arreglo para añadir el nuevo caso
                $newCase = array();
                //Arreglo de direccion de casos
                $dirCaso = array();
                //Arreglo con el tipo de propiedad intelectual
                $tipoPI = array();
                //Arreglo para el requerimiento del usuario
                $reqUsuario = array();
                if ($this->session->get('logged') and $this->request->isAJAX()) {
                        //Obtenemos los datos del formulario
                        $datos =json_decode(utf8_encode(base64_decode($this->request->getPost('data'))),TRUE);
                        //llenamos los datos iniciales del caso
                        $newCase["casofec"]     = $datos["date-entry"];//check
                        $newCase["casoced"]     = $datos["person-id"];//check
                        $newCase["caso_nacionalidad"]     = $datos["nacionalidad"];//check;
                        $newCase["casonom"]     = $datos["person-name"];//check;
                        $newCase["casoape"]     = $datos["person-lastname"];//check
                        $newCase["casotel"]     = $datos["telephone"];//check
                        $newCase["idest"]       = 1;//check
                        $pi_type = $datos["pi-type"];//check
                        $newCase["sexo"] = $datos["sexo"];//check
                        $newCase["tipo_beneficiario"]    = $datos["tipo_beneficiario"];//check
                        $newCase["correo"]    = $datos["correo"];//check;
                        $newCase["idrrss"]      = $datos["social_network"];//check
                        $newCase["casodesc"]    = $datos["user-requirement"];//chechk
                        $newCase["ofiid"]       = $datos["office"];//chechk
                        $newCase["id_tipo_atencion"]    = $datos["tipo-atencion-usu"];//chechk
                        $newCase["direccion"]    = $datos["direccion"];//chechk
                        $newCase["estadoid"]    = $datos["state"];//chechk
                        $newCase["municipioid"] = $datos["county"];//chechk
                        $newCase["parroquiaid"] = $datos["town"];//check
                        $newCase["idusuopr"]    = $this->session->get('iduser');
                        $newCase["ente_adscrito_id"]    = $datos["ente_adscrito"];
                        $bandera_cgr["bandera_cgr"]    = $datos["bandera_cgr"];
                        $bandera_denuncia["bandera_denuncia"]=$datos["bandera_denuncia"];
                        if (empty($datos["record-work"])) {
                                $newCase["casonumsol"] = 'No Aplica';
                        } else {
                                $newCase["casonumsol"] = $datos["record-work"];
                        }
                        //Realizamos la insercion en la tabla
                        $query_insertar_caso = $casoModel->insertarNuevoCaso($newCase);
                        if (isset($query_insertar_caso)) {
                                //Obtenemos el id insertado
                                $_obtener_utimo_id = $casoModel->obtener_utimo_id();
                                //Armamos el arreglo para insertar el tipo de propiedad intelectual del caso
                                if (empty($_obtener_utimo_id->getResult())) {
                                        $tipoPI[] = '0';
                                } else {
                                        foreach ($_obtener_utimo_id->getResult() as $fila) {
                                                $tipoPI['idcaso']      = $fila->ultimo_id;
                                                $tipoPI['idtippropint']  = $pi_type;
                                        }
                                }
                                $repuesta[] = '0';
                                //VERIFICAMOS SI ES UN  CASO DE ASESORIA PARA HACER LA INSERCION
                                if ($bandera_cgr["bandera_cgr"] == 'true') {
                                        $cgr['competencia_cgr']  = $datos["competencia_crg"];
                                        $cgr['asume_cgr']      = $datos["asume_crg"];
                                        $cgr['id_caso']      = $tipoPI['idcaso'];
                                        //Hacemos la insercion
                                        $query_Registro_cgr_Model =
$Registro_cgr_Model->insertarRegistro_cgr($cgr);
                                        //verificacion que se hiso la insercion del cgr
                                        if (isset($query_Registro_cgr_Model)) {
                                                //si se hiso la insercion del cgr , hacemos la insercion en el tipo de propiedad intelectual para el  caso
                                                $query_tipopimodel = $tipoPIModel->insertarTipoPICaso($tipoPI);
                                                if (isset($query_tipopimodel)) {
                                                        $repuesta['mensaje']      = 1;
                                                        $repuesta['idcaso']  = $fila->ultimo_id;
                                                        $auditoria['audi_user_id']   = session('iduser');
                                                        $auditoria['audi_accion']   = 'INGRESO UN NUEVO CASO Nª' .
$tipoPI['idcaso'];
                                                        $Auditoria_sistema_Model =
$model_Auditoria_sistema_Model->agregar($auditoria);
                                                        return json_encode($repuesta);
                                                } else {
                                                        $repuesta['mensaje'] = 2;
                                                        return json_encode($repuesta);
                                                }
                                        }
                                }
                                //VERIFICAMOS SI ES UN  CASO ES DE DENUNCIA PARA HACER LA INSERCION
                                if ($bandera_denuncia["bandera_denuncia"] == 'true') {
                                        $denuncia['denu_afecta_persona']=$datos["option_personal"];
                                        $denuncia['denu_afecta_comunidad']=$datos["option_comunidad"];
                                        $denuncia['denu_afecta_terceros']=$datos["option_terceros"];
                                        $denuncia['denu_fecha_hechos']=$datos["fecha_hechos"];
                                        $denuncia['denu_involucrados']=$datos["denu_involucrados"];
                                        $denuncia['denu_instancia_popular']=$datos["nombre_instancia"];
                                        $denuncia['denu_rif_instancia']= $datos["rif_instancia"];
                                        $denuncia['denu_ente_financiador']=$datos["ente_financiador"];
                                        $denuncia['denu_nombre_proyecto']= $datos["nombre_proyecto"];
                                        $denuncia['denu_monto_aprovado']= $datos["monto_aprovado"];
                                        $denuncia['denu_id_caso']= $tipoPI['idcaso'];
                                        //Hacemos la insercion
                                        $query_Casos_denuncias =
$Casos_denuncias->insertarCasos_Denuncias($denuncia);
                                        //verificacion que se hiso la insercion de los casos de denuncias
                                        if (isset($query_Casos_denuncias)) {
                                                //si se hiso la insercion del cgr , hacemos la insercion en el tipo de propiedad intelectual para el  caso
                                                $query_tipopimodel = $tipoPIModel->insertarTipoPICaso($tipoPI);
                                                if (isset($query_tipopimodel)) {
                                                        $repuesta['mensaje']      = 1;
                                                        $repuesta['idcaso']  = $fila->ultimo_id;
                                                        $auditoria['audi_user_id']   = session('iduser');
                                                        $auditoria['audi_accion']   = 'INGRESO UN NUEVO CASO Nª' .
$tipoPI['idcaso'];
                                                        $Auditoria_sistema_Model =
$model_Auditoria_sistema_Model->agregar($auditoria);
                                                        return json_encode($repuesta);
                                                } else {
                                                        $repuesta['mensaje'] = 2;
                                                        return json_encode($repuesta);
                                                }
                                        }
                                } else {
                                        $query_TipoPICaso = $tipoPIModel->insertarTipoPICaso($tipoPI);
                                        if (isset($query_TipoPICaso)) {
                                                $repuesta['mensaje']      = 1;
                                                $repuesta['idcaso']  = $fila->ultimo_id;
                                                $auditoria['audi_user_id']   = session('iduser');
                                                $auditoria['audi_accion']   = 'INGRESO UN NUEVO CASO Nª' .
$tipoPI['idcaso'];
                                                $Auditoria_sistema_Model =
$model_Auditoria_sistema_Model->agregar($auditoria);
                                                return json_encode($repuesta);
                                        } else {
                                                $repuesta['mensaje'] = 2;
                                                return json_encode($repuesta);
                                        }
                                }
                        }
                        //}
                } else {

                        return redirect()->to('/');
                }
        }

?>