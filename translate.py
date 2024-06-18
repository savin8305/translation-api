import sys
import io
from googletrans import Translator

# Set the standard output to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def translate_text(text, target_language):
    translator = Translator()
    translation = translator.translate(text, dest=target_language)
    return translation.text

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: translate.py <text> <target_language>")
        sys.exit(1)

    text = sys.argv[1]
    target_language = sys.argv[2]
    translated_text = translate_text(text, target_language)
    print(translated_text)
