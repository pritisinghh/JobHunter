export const NEWLINE = '\\\\';
export const template2BroilerPlate = `%pdflatex
\\documentclass[11pt]{article}
\\newlength{\\outerbordwidth}
\\pagestyle{empty}
\\raggedbottom
\\raggedright
\\usepackage[svgnames]{xcolor}
\\usepackage{framed}
\\usepackage{tocloft}
\\usepackage{enumitem}
\\usepackage{textcomp}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\setlength{\\outerbordwidth}{3pt}  % Width of border outside of title bars
\\definecolor{shadecolor}{gray}{0.75}  % Outer background color of title bars (0 = black, 1 = white)
\\definecolor{shadecolorB}{gray}{0.93}  % Inner background color of title bars
\\setlength{\\evensidemargin}{-0.25in}
\\setlength{\\headheight}{0in}
\\setlength{\\headsep}{0in}
\\setlength{\\oddsidemargin}{-0.25in}
\\setlength{\\tabcolsep}{0in}
\\setlength{\\textheight}{9.5in}
\\setlength{\\textwidth}{7in}
\\setlength{\\topmargin}{-0.3in}
\\setlength{\\topskip}{0in}
\\setlength{\\voffset}{0.1in}
\\newcommand{\\resitem}[1]{\\item #1 \\vspace{-4pt}}
\\newcommand{\\resheading}[1]{
    \\parbox{\\textwidth}{\\setlength{\\FrameSep}{\\outerbordwidth}
        \\begin{shaded}
            \\setlength{\\fboxsep}{0pt}\\framebox[\\textwidth][l]{\\setlength{\\fboxsep}{4pt}\\fcolorbox{shadecolorB}{shadecolorB}{\\textbf{\\sffamily{\\mbox{~}\\makebox[6.762in][l]{\\large #1} \\vphantom{p\\^{E}}}}}}
        \\end{shaded}
    }\\vspace{-11pt}
}
\\newcommand{\\ressubheading}[4]{
    \\begin{tabular*}{6.5in}{l@{\\cftdotfill{\\cftsecdotsep}\\extracolsep{\\fill}}r}
        \\textbf{#1} & #2 \\\\
        \\textit{#3} & \\textit{#4} \\\\
    \\end{tabular*}\\vspace{-6pt}}
    \\newcommand{\\school}[4]{\\vspace{1.5mm}
    \\textbf{#1} \\hfill #2 \\textit{#3} \\hfill \\textit{#4} \\vspace{1.5mm}
  }
  
\\newcommand{\\job}[4]{
    \\textbf{#1} \\hfill #2 \\hfill \\textit{#3} \\hfill \\textit{#4}
}
\\newcommand{\\skill}[2]{
    \\textbf{#1} #2
}
\\newcommand{\\project}[4]{ \\vspace{1.5mm}
    \\textbf{#1} #2 \\hfill \\textit{#3}#4 \\vspace{1.5mm}
}
\\newcommand{\\award}[4]{ \\vspace{1.5mm}
    \\textbf{#1} #2 \\hfill \\textit{#3} #4 \\vspace{1.5mm}
}
\\begin{document}`;

