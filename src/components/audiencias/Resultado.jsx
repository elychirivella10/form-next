import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
const { Paragraph, Text } = Typography;
const Resultado = ({audiencias, register, id_audiencia, solicitudes}) =>{
    return(
        <div className="box animate__animated animate__fadeInRight animate__faster">
            <Result
                status="success"
                title="Se ha registrado la audiencia correctamente"
                subTitle={`Nro de Audiencia: Nº${id_audiencia}, con una cantidad de solicitudes de ${solicitudes.length}`}
                extra={[
                <Button type="primary" key="console">
                    Ir al inicio
                </Button>,
                ]}
            />

            <div className="desc pr-6 pl-6">
                <Paragraph>
                    <Text
                    strong
                    style={{
                        fontSize: 16,
                    }}
                    >
                    Información de contacto registrada
                    </Text>
                </Paragraph>
                <Paragraph>
                    <CheckCircleOutlined className="site-result-demo-error-icon" />Nombre y Apellido: <a>{register.nombre_contacto+' '+register.apellido_contacto}</a>
                </Paragraph>
                <Paragraph>
                    <CheckCircleOutlined className="site-result-demo-error-icon" />Correo: <a>{register.correo_contacto}</a>
                </Paragraph>
                <Paragraph>
                    <CheckCircleOutlined className="site-result-demo-error-icon" />Teléfono: <a>{register.telefono_contacto}</a>
                </Paragraph>
            </div>
        </div>
    )
}

export default Resultado