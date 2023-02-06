import { writeFile } from "fs/promises"

export default function writeTexTest(content : string) {
    
    writeFile("src/utils/resume_maker_util/files/Resume.tex", content,{encoding: "utf-8"})
}