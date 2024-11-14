import qrcodeParser from "qrcode-parser";
import { getSpecificData } from '@/firebase/database'

async function QRreaderUtils(e, setFilterQR,  ) {

    const res = await qrcodeParser(e.target.files[0])

    const data = await getSpecificData(`envios/${res}`, setFilterQR)
}

export { QRreaderUtils }