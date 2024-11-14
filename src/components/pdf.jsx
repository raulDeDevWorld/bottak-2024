'use client'

import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useState, useRef, useEffect } from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from '../components/Button'
import { useUser } from '@/context/Context.js'


Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: '1cm',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0 0 5px 1px rgb(175, 175, 175)',
    },
    image: {
        boxSizing: 'border-box',
        position: 'relative',
        objectFit: 'cover'
    },

})

const PDFView = () => {
    const { user, userDB, setUserData, setUserSuccess, transactionDB, transferencia, fecha, setFecha, QRurl } = useUser()

    const [isCliente, setisCliente] = useState(false);

    useEffect(() => {
        setisCliente(true)
    });

    return (
        <div className="w-full height-[30px]">
            {isCliente && <PDFDownloadLink document={
                <Document>
                    <Page size='A4' style={styles.body} >

                        <View style={{ display: 'flex', width: '100%', flexDirection: 'row', padding: '2.5mm', flexWrap: 'wrap' }}>
                       
                        <Text style={{ fontSize: '12px', width: '100%', textAlign: 'center', paddingBottom: '12px' }}>BAUCHER BOTTAK</Text>

                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: '12px', alignText: 'center' }}>REPORTE</Text>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Remitente:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.remitente && transactionDB.remitente}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>DNI remitente:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB['dni remitente'] && transactionDB['dni remitente']}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Pais remitente</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB['pais remitente'] && transactionDB['pais remitente']}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Destinatario:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.destinatario && transactionDB.destinatario}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>DNI destinatario:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.dni && transactionDB.dni}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Pais destinatario:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.pais && transactionDB.pais}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Celular de destinatario:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.celular && transactionDB.celular}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Cuenta de destinatario:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB['cuenta destinatario'] && transactionDB['cuenta destinatario']}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Divisa de envio:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB['divisa de envio'] && (transactionDB['divisa de envio'] === 'USD'? 'USDT' :transactionDB['divisa de envio'])}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Importe:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.importe && transactionDB.importe}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Divisa de receptor:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB['divisa de receptor'] && (transactionDB['divisa de receptor'] === 'USD'? 'USDT' :transactionDB['divisa de receptor'])}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Importe Con el cambio aplicado:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.cambio && transactionDB.cambio}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Fecha:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.fecha && transactionDB.fecha}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Estado:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.estado && transactionDB.estado}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Operacion:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.operacion && transactionDB.operacion}</Text>
                                </View>
                                <View style={{ paddingTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>ID de tracking:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>{transactionDB.uuid}</Text>
                                </View>
                                <View style={{ height: '50px' }}></View>
                            </View>
                            <Image src={QRurl} style={{ height: '150px', width: '150px' }}></Image>

                        </View>
                    </Page>
                </Document>
            }
                fileName='Reporte'>

                {({ blob, url, loading, error }) =>
                    <Button theme={'Primary'}>Descargar PDF Baucher</Button>
                }
            </PDFDownloadLink>}
        </div>
    )
}

export default PDFView