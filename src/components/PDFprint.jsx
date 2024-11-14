// components/MyPDFDocument.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode.react'; // Asegúrate de que este paquete esté instalado
import { useUser } from '@/context/Context.js'
import { PDFViewer } from '@react-pdf/renderer';
import { useState, useRef, useEffect } from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from '../components/Button'


const styles = StyleSheet.create({
    page: {
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
    header: {
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: '#1F2937',
        color: 'white',
        width: '100%',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    table: {
        backgroundColor: 'red',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    row: {

        flexDirection: 'row',
        borderBottom: '0.1px solid #00000020',
    },
    cell: {
        width: '50%',
        padding: 5,
        textAlign: 'left',
        color: 'black',
        backgroundColor: '#00000020',
        fontSize: '10px',
        fontWeight: 'bold'
    },
    cell2: {
        width: '50%',
        padding: 5,
        textAlign: 'left',
        color: 'black',
        fontSize: '10px'

    },
    qrCode: {
        marginVertical: 15,
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
});

const MyPDFDocument = ({ transactionDB, QRurl }) => {
    const [isCliente, setisCliente] = useState(false);

    useEffect(() => {
        setisCliente(true)
    });

    return (
        <div className="w-full height-[30px]">
            {isCliente && <PDFDownloadLink document={
                // <PDFViewer style={{ width: '100vw', height: '100vh' }}>

                <Document >
                    <Page size="A4" style={styles.page}>
                        <View style={styles.header}>

                            <Text>Baucher de Transacción</Text>
                            {QRurl &&
                                <Image src={QRurl} style={{ height: '150px', width: '150px', marginVertical: '10px' }}></Image>
                            }
                        </View>




                        {Object.entries(transactionDB).map(([key, value]) => (

                            <View style={styles.table}>


                                <View style={{...styles.row, backgroundColor: '#1F2937', color: 'white'}} key={key}>
                                    <Text style={{...styles.cell2, color: 'white'}}>  {key}</Text>
                                </View>

                                {Object.entries(value).map(([k, v]) =>
                                    <View style={styles.row} key={key}>
                                        <Text style={styles.cell}>{k}</Text>
                                        <Text style={styles.cell2}>{v}</Text>
                                    </View>
                                )}
                            </View>

                        ))}


                    </Page>
                </Document>
                // </PDFViewer>
            }
                fileName='Reporte'>

                {({ blob, url, loading, error }) =>
                    <button className="relative left-0 right-0 mx-auto mt-4 px-10 py-2  bg-red-500 text-white rounded">
                        Exportar a PDF
                    </button>}
            </PDFDownloadLink>}
        </div>


    );
};

export default MyPDFDocument;
