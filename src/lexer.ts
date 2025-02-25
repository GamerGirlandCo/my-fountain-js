import { regex } from './regexes';

export class Lexer {
    reconstruct(script: string) {
        return script.replace(regex.boneyard, '\n$1\n')
            .replace(regex.standardizer, '\n')
            .replace(regex.cleaner, '')
            .replace(regex.whitespacer, '');
    }
}

export class InlineLexer extends Lexer {
    private inline = {
        note: '<!-- $1 -->',

        line_break: '<br />',

        bold_italic_underline: '<span class="fountain-marker bold italic underline">$2</span>',
        bold_underline: '<span class="fountain-marker bold underline">$2</span>',
        italic_underline: '<span class="fountain-marker italic underline">$2</span>',
        bold_italic: '<span class="fountain-marker bold italic">$2</span>',
        bold: '<span class="fountain-marker bold">$2</span>',
        italic: '<span class="fountain-marker italic">$2</span>',
        underline: '<span class="fountain-marker underline">$2</span>'
    };

    reconstruct(line: string) {
        if (!line) 
            return;

        let match: RegExp;
        const styles = ['bold_italic_underline', 'bold_underline', 'italic_underline', 'bold_italic', 'bold', 'italic', 'underline'];

        line = line.replace(regex.note_inline, this.inline.note)
            .replace(/\\\*/g, '[star]')
            .replace(/\\_/g, '[underline]')
            .replace(/\n/g, this.inline.line_break);

        for (let style of styles) {
            match = regex[style];

            if (match.test(line)) {
                line = line.replace(match, this.inline[style]);
            }
        }

        return line.replace(/\[star\]/g, '*').replace(/\[underline\]/g, '_').trim();
    }
}