import React from 'react'
import './style.scss'

const QuickTest = () => {
    const dimensiones = [
        {
            name: 'Carga Mental',
            level: 4,
            departments: [
                'Aduanas', 'ATV Produccion Ensamble', 'ATV Produccion Fabricacion', 'Calidad Juarez 1 Sorting',
                'Communication - Juarez', 'Engineering Logistics Juarez 1', 'Finanzas Juarez', 'Finanzas Juarez 1',
                'Global Services Juarez', 'GP Total Rewards - Juarez', 'Logistica Juarez 1', 'Road IE Fabricacion Juarez 1',
                'Seguridad y Medio Ambiente Juarez 1',
            ],
            controlMeasures: [
                {
                    name: 'Crear campañas para establecer y difundir información sobre cargas mentales',
                    responsibles: ['Maria Martinez', 'Juan Pérez'],
                    status: 'Programado',
                    date: '26-May-22',
                },
                {
                    name: 'Capacitar a los empleados sobre técnicas de relajación que puedan realizar en su área de trabajo.',
                    responsibles: ['Maria Martinez'],
                    status: 'En curso',
                    date: '26-May-22',
                },
                {
                    name: 'Analizar y revisar cada descripción de puesto.',
                    responsibles: ['Maria Martinez'],
                    status: 'realizado',
                    date: '26-May-22',
                },
            ]
        },
        {
            name: 'Falta de control y autonomía sobre el trabajo',
            level: 4,
            departments: [
                'Finanzas Juarez', 'Finanzas Juarez 1', 'Global Services Juarez', 'GP Total Rewards - Juarez',
                'Logistica Juarez 1', 'Logistica Juarez 2', 'Operaciones Motores', 'Planeacion Juarez 1',
                'Purchasing Non-Stock Juarez 1', 'Road IE Fabricacion Juarez 1', 'Seguridad y Medio Ambiente Juarez 1',
            ],
            controlMeasures: [
                {
                    name: 'Difundir e informar a los trabajadores publicidad sobre cargas de trabajo.',
                    responsibles: ['Maria Martinez'],
                    status: 'Programado',
                    date: '26-May-22',
                },
                {
                    name: 'Capacitar a los trabajadores sobre las funciones de su departamento y las responsabilidades que les corresponden.',
                    responsibles: ['Maria Martinez'],
                    status: 'En curso',
                    date: '26-May-22',
                },
                {
                    name: 'Establecer una rutina de revisión, para saber si los empleados tienen las mismas cantidades de actividades.',
                    responsibles: ['Maria Martinez'],
                    status: 'realizado',
                    date: '26-May-22',
                },
                {
                    name: 'Establecer una rutina de revisión, para saber si los empleados tienen las mismas cantidades de actividades.',
                    responsibles: ['Maria Martinez'],
                    status: 'realizado',
                    date: '26-May-22',
                },
            ]
        },
        {
            name: 'Falta de control y autonomía sobre el trabajo',
            level: 4,
            departments: [
                'Finanzas Juarez', 'Finanzas Juarez 1', 'Global Services Juarez', 'GP Total Rewards - Juarez',
                'Logistica Juarez 1', 'Logistica Juarez 2', 'Operaciones Motores', 'Planeacion Juarez 1',
                'Purchasing Non-Stock Juarez 1', 'Road IE Fabricacion Juarez 1', 'Seguridad y Medio Ambiente Juarez 1',
            ],
            controlMeasures: [
                {
                    name: 'Difundir e informar a los trabajadores publicidad sobre cargas de trabajo.',
                    responsibles: ['Maria Martinez'],
                    status: 'Programado',
                    date: '26-May-22',
                },
                {
                    name: 'Capacitar a los trabajadores sobre las funciones de su departamento y las responsabilidades que les corresponden.',
                    responsibles: ['Maria Martinez'],
                    status: 'En curso',
                    date: '26-May-22',
                },
                // {
                //     name: 'Establecer una rutina de revisión, para saber si los empleados tienen las mismas cantidades de actividades.',
                //     responsibles: ['Maria Martinez'],
                //     status: 'realizado',
                //     date: '26-May-22',
                // },
                // {
                //     name: 'Establecer una rutina de revisión, para saber si los empleados tienen las mismas cantidades de actividades.',
                //     responsibles: ['Maria Martinez'],
                //     status: 'realizado',
                //     date: '26-May-22',
                // },
            ]
        },
        {
            name: 'Falta de control y autonomía sobre el trabajo',
            level: 4,
            departments: [
                'Finanzas Juarez', 'Finanzas Juarez 1', 'Global Services Juarez', 'GP Total Rewards - Juarez',
                'Logistica Juarez 1', 'Logistica Juarez 2', 'Operaciones Motores', 'Planeacion Juarez 1',
                'Purchasing Non-Stock Juarez 1', 'Road IE Fabricacion Juarez 1', 'Seguridad y Medio Ambiente Juarez 1',
            ],
            controlMeasures: [
                {
                    name: 'Difundir e informar a los trabajadores publicidad sobre cargas de trabajo.',
                    responsibles: ['Maria Martinez'],
                    status: 'Programado',
                    date: '26-May-22',
                },
            ]
        },
    ]

    const lev = {
        0: { cn: 'na', txt: 'No Aplica', },
        1: { cn: 'n', txt: 'Nulo' },
        2: { cn: 'b', txt: 'BAJO' },
        3: { cn: 'm', txt: 'MEDIO' },
        4: { cn: 'a', txt: 'ALTO' },
        5: { cn: 'ma', txt: 'MUY ALTO' },
    }

    let prevRowStart = 2

    return (
        <div className='implementacion_dimensiones_table'>
            <div className='implementacion_dimensiones__grid' >
                <div className='implementacion_dimensiones__item'><p>Dimensión de los factores de riesgo psicosocial</p></div>
                <div className='implementacion_dimensiones__item'><p>Departamentos</p></div>
                <div className='implementacion_dimensiones__item'><p>Medidas de control y responsables</p></div>
                <div className='implementacion_dimensiones__item'><p>Estado de implementación</p></div>
                {dimensiones.map((dimension, i) => {
                    const { name, level, departments, controlMeasures } = dimension
                    const rowEnd = prevRowStart + controlMeasures.length
                    const gridRow = `${prevRowStart} / ${rowEnd}`
                    prevRowStart = rowEnd
                    return (
                        <React.Fragment>
                            <div key={`dim-${i}`} className='implementacion_dimensiones__item item_dimension' style={{ gridRow }}>
                                <p>{name}</p>
                                <p className={`${lev[level].txt}`}>Nivel: {lev[level].txt}</p>
                            </div>
                            <div key={`dep-${i}`} className='implementacion_dimensiones__item item_departments' style={{ gridRow }}>
                                <p>{departments.join(', ')}</p>
                            </div>

                            {controlMeasures.map((measure, j) => (
                                <React.Fragment>
                                    <div key={`mea-${i}-${j}`} className='implementacion_dimensiones__item item_measure'>
                                        <p>{measure.name}</p>
                                        <p>Responsables: <b>{measure.responsibles.join(', ')}</b></p>
                                    </div>
                                    <div key={`sta-${i}-${j}`} className='implementacion_dimensiones__item item_status'>
                                        <p>{measure.status}</p>
                                        <p>Fecha límite de implementación: <b>{measure.date}</b></p>
                                    </div>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default QuickTest
