import { Page, PageContext, pageProvider } from "@testing/wdio-page-objects";
import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';


export class Utils {

    async actualizarNumeroCargaMasiva() {
        const filePath = path.join(__dirname, '..','..','src','resources', 'cargaMasiva.txt'); // Ajusta la ruta a tu archivo
        // Lee el archivo
        const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
        // Procesa cada línea
        const updatedLines = lines.map(line => {
            if (!line.trim()) return line; // Ignora líneas vacías
            const parts = line.split(';');
            if (parts[0]) {
            //Incrementa el primer número y rellena con ceros si es necesario
            const num = (parseInt(parts[0], 10) + 7).toString().padStart(parts[0].length, '0');
            parts[0] = num;
            }
        return parts.join(';');
        });

        // Escribe el archivo actualizado
        fs.writeFileSync(filePath, updatedLines.join('\n'), { encoding: 'utf8' });
        console.log('Archivo actualizado correctamente.');
    }

    async obtenerPopUp() {
        await browser.waitUntil(
        async () => {
            try {
                await browser.getAlertText();
                return true;
            } catch {
                return false;
            }
        },
        {
            timeout: 10000,
            timeoutMsg: 'El pop-up no apareció en 10 segundos'
        }
    );
    }
}