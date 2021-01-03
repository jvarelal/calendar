import React from 'react'
import help1 from '../../../../assets/img/help1.png'
import help2 from '../../../../assets/img/help2.png'
import help3 from '../../../../assets/img/help3.png'
import help4 from '../../../../assets/img/help4.png'
import help5 from '../../../../assets/img/help5.png'
import help6 from '../../../../assets/img/help6.png'

const CalendarHelp = () => {
    return <div>
        <div>
            <div className="flex-center">
                <div className="col">
                    <p className="text-justify mtb-4">
                        El calendario presenta un listado de días de manera mensual, adjuntando
                        el <i>Santo</i> cristiano del día e iconografía para remarcar la fecha
                        de algunas festividades/efemerides.
                    </p>
                </div>
            </div>
            <div className="row mtb-8">
                <img src={help1} className="w90 m-auto" />
            </div>
            <div className="flex-center">
                <div className="col">
                    <p className="text-justify mtb-4">
                        El día actual (<i>Hoy</i>) se mostrará con un matíz esmeralda, mientras que el día seleccionado
                        con uno azulado. Para días anteriores al actual se visualizarán con un tono grisaceo.
                    </p>
                </div>
            </div>
        </div>
        <div className="bt-gray">
            <h3 className="text-center lighter m-6">Cambio de fecha y presentación</h3>
            <div className="flex-center">
                <div className="col">
                    <p className="text-justify mtb-4">
                        Para el control de la fecha se dispone en la parte superior
                        las opciones de Año y Mes, teniendo el primero opciones de 3 años
                        anteriores y posteriores al actual. Para fechas mayores a este rango se puede avanzar
                        por los controles de <i>Mes Anterior</i> y <i>Mes Siguiente</i> en la parte inferior
                        del listado de días.
                    </p>
                </div>
            </div>
            <div className="row mtb-8 flex-middle">
                <div className="col col2 text-center">
                    <img src={help2} alt="help2" className="m-auto" />
                </div>
                <div className="col">
                    <p className="text-justify mtb-4">
                        Para visualizar los meses se tienen los formatos <i>Grid</i>,
                        tabla presentando las semanas del mes, y <i>Lista</i>, que mostrará de manera vertical
                        los días del mes en selección.<br />
                        Estos serán alternados al hacer click en el botón correspondiente.
                    </p>
                </div>
            </div>
            <div className="flex-center">
                <div className="col">
                    <p className="text-justify mtb-4">
                        En el formato <i>Grid</i> se tiene plena operación con el Teclado. Teniendo en foco el
                        calendario se puede cambiar de fecha con las teclas de dirección.
                    </p>
                </div>
            </div>
            <div className="flex-center">
                <div className="col">
                    <img src={help5} alt="help5" className="block m-auto" />
                </div>
                <div className="col">
                    <img src={help4} alt="help4" className="w100" />
                </div>
            </div>
        </div>
        <h3 className="text-center lighter m-6">Nueva nota</h3>
        <div className="bt-gray">
            <div className="col">
                <p className="text-justify mtb-4">
                    En la presentación <i>Grid</i> y teniendo en foco el calendario con el teclado,
                    se podrá presionar la tecla Enter para generar una nueva nota.
                </p>
            </div>
            <div className="row mtb-8">
                <img src={help6} alt="help6" className="w90 m-auto" />
            </div>
            <div className="flex-center">
                <div className="col">
                    <p className="text-justify mtb-4">
                        Igualmente se podrá seleccionar la opción "+" en la esquina superior del listado de notas.
                    </p>
                </div>
                <div className="col text-center">
                    <img src={help3} alt="help3" className="m-auto" />
                </div>
            </div>
            <div className="col">
                <p className="text-justify mtb-4">
                    Si se esta en la presentación de <i>Lista</i>, se deberá hacer click en el día seleccionado.
                </p>
            </div>
            <div className="col">
                <p className="text-justify mtb-4">
                    <b>Estas opciones no estarán disponibles teniendo seleccionada una fecha con una antiguedad mayor al día en curso </b>
                </p>
            </div>
        </div>
    </div>
}

export default CalendarHelp