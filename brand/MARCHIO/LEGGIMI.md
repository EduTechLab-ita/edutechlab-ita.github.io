# Marchio EduTechLab — pacchetto completo

Generato l'11/08/2026. **Apri `MARCHIO.html`: è il manuale, con ogni file scaricabile con un clic e
scritto accanto quando si usa.** Questo file di testo serve solo a chi (o a quale Claude) deve rimetterci mano.

⚠️ Aperta con doppio clic dalla cartella (`file://`) la pagina si vede bene, ma Chrome **apre** immagini e
video invece di scaricarli: per i download veri va servita da un indirizzo web — o dal server locale
(`python -m http.server 8900` dentro questa cartella) o, meglio, pubblicandola su `edutechlab.it/brand/`
con `noindex`. In quel caso il logo lo si recupera anche da scuola o dal telefono.

**Font del nome: Outfit Light** (SIL Open Font, uso commerciale e incorporamento consentiti), in `font/`
sia in `.woff2` per il web sia in `.ttf` da installare sul computer.

---

## La regola in una riga

**Un solo segno, quattro versioni.** Quale usare non dipende dal gusto ma dal fondo su cui va:

| Versione | Dove si usa | File |
|---|---|---|
| **Colori su scuro** | sito, slide scure, schermo notturno | `marchio-colori-su-scuro` |
| **Colori su chiaro** | carta, Word, slide chiare, firma mail | `marchio-colori-su-chiaro` |
| **Nera piena** | stampa B/N, fotocopie, timbri, documenti protocollati | `marchio-nero` |
| **Bianca piena** | fotografie, fondi colorati pieni | `marchio-bianco` |
| *A filo (extra)* | incisioni, ricami, filigrane, carta colorata | `marchio-linea` |

**Perché due versioni a colori e non una.** I tre pastelli sono nati sul viola scuro dell'hero. In scala di
grigi valgono 203, 188 e 210 su 255: su carta bianca il marchio quasi sparisce e i tre colori non si
distinguono più fra loro. La versione "su chiaro" sono le stesse tinte più profonde, e il pixel torna al blu
istituzionale `#17324D` — colore ufficiale che sul viola non si poteva usare.

Ogni versione esiste **da sola** (solo il segno) e **con il nome** (`lockup-…`).

---

## Cosa c'è dentro

- **`svg/`** — 10 file, sorgente vettoriale. Sono questi che si usano dove è possibile (web, Word, slide): non perdono qualità a nessuna dimensione.
- **`png/`** — gli stessi a 1024 px (marchio) e 1600 px (marchio+nome), per chi non accetta gli SVG.
- **`icone-pwa/`** — `icona-192`, `icona-512`, `icona-512-maskable`, `apple-touch-icon`.
- **`favicon/`** — PNG 16/32/48/64 e `favicon.ico` multi-misura.
- **`firma-mail/`** — `firma.html` e il logo già alla misura giusta.
- **`animazioni/`** — MP4 e GIF, cinque tagli.

### Icone: perché hanno il fondo blu
Un'icona PWA trasparente su Android finisce su un fondo qualsiasi deciso dal telefono. Il fondo glielo diamo
noi: blu istituzionale con il marchio a pastelli. La versione **maskable** ha il segno più piccolo (62%)
perché il sistema le ritaglia i bordi per adattarle alla forma delle altre icone.

### Animazioni
Cinque file, in MP4 (PowerPoint, Gamma, Genially) e GIF (dove il video non si carica):

| File | Durata | Per cosa |
|---|---|---|
| `completo-con-payoff` | 5,2 s | apertura di un corso |
| `marchio-e-nome-scuro` / `-chiaro` | 4,0 s | intestazione di una presentazione |
| `marchio-solo-scuro` / `-chiaro` | 3,0 s | stacchi, angolo di slide |

Non sono registrate da schermo: ogni fotogramma è disegnato, quindi restano nitide su qualsiasi proiettore.
Il file più pesante è 128 KB.

### Firma mail — un passo in più prima di usarla
`firma-mail/firma.html` punta a `https://edutechlab.it/brand/logo-firma.png`, **che non esiste ancora**:
finché quel file non è online, chi riceve la mail vede un riquadro vuoto. Serve copiare
`firma-mail/logo-firma.png` in una cartella `brand/` del repo del sito e pubblicare. Poi: aprire `firma.html`
nel browser, Ctrl+A, Ctrl+C e incollare in Gmail → Impostazioni → Firma.

---

## Se un colore cambia

Non si ritoccano i file a mano: si cambia il colore in `_genera.js` (sezione `PALETTE`, in cima) e si lancia

```
cd "G:\Il mio Drive\Claude-Code\Projects\EDUTECHLAB-SITO\brand\MARCHIO"
node _genera.js      # SVG, PNG, icone, favicon
node _anima.js       # animazioni (più lento, ~1 minuto)
```

Tutto viene rigenerato da un'unica definizione, quindi le versioni non possono divergere fra loro.

## Gli strumenti (e come toglierli)

Servono `sharp` (da SVG a PNG), `png-to-ico` e `ffmpeg-static` (le animazioni), installati in
**`C:\Users\fabio\.local\tools-immagini`** — 114 MB in una sola cartella, di cui 80 sono ffmpeg.
Non toccano il registro né il PATH.

- **Per toglierli**: cancellare quella cartella. Nient'altro.
- **Per riaverli**: `cd C:\Users\fabio\.local\tools-immagini` e `npm install sharp png-to-ico ffmpeg-static`.
- Su un altro PC: stessa cosa, cambiando l'utente nel percorso (e in cima ai due script, variabile `MOD`).

## Nota tecnica: perché il testo passa da Chrome e non da sharp

I PNG che contengono la scritta non si possono generare con sharp: la sua libreria disegna il testo con i
font **installati nel sistema**, e Outfit non lo è. Passano quindi da Chrome in modalità headless, che carica
il `.woff2` della cartella `font/`. Nelle animazioni il nome e il payoff sono disegnati **una volta sola** con
Chrome e poi incollati dentro ogni fotogramma come immagine: nel filmato il testo non si deforma, fa solo
comparsa e scorrimento, quindi il risultato è identico e si evitano centinaia di chiamate a Chrome.

Provata prima la conversione del testo in tracciati con `opentype.js`: si blocca sulle tabelle tipografiche di
questo font (`lookupType 6 substFormat 2` non supportato). Strada abbandonata dopo tre tentativi.

**Conseguenza pratica**: gli **SVG** con il nome nominano il font `Outfit`. Su un computer dove non è
installato, la scritta appare con un altro font — per Word, PowerPoint e Canva usare i **PNG**, che sono
immagini e non dipendono da nulla. Oppure installare il font (è in `font/`, doppio clic e "Installa").

Le versioni precedenti del marchio (5 SVG del 28/07/2026) sono rimaste in `brand/` — superate da queste,
tenute finché non si è certi di non averne bisogno.
