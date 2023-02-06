const latex = require('node-latex')
import {resolve } from 'path';
import { createReadStream, createWriteStream} from 'fs';

export default function topdf(compiler: string){
    const options = {
        inputs: resolve('src/utils/resume_maker_util/Templates/Template 1/assets'),
        fonts: resolve('src/utils/resume_maker_util/Templates/Template 1/assets'), 
        //errorLogs: resolve(''),
        cmd : compiler
    }
    const input = createReadStream('src/utils/resume_maker_util/files/resume.tex')
    const output = createWriteStream('src/utils/resume_maker_util/files/resume.pdf')
    const pdf = latex(input,options)

    pdf.pipe(output)
    pdf.on('error', err => console.error(err))
    pdf.on('finish', () => console.log('PDF generated!'))
}
