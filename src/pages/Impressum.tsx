import Layout from "@/components/Layout";

const Impressum = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Impressum</h1>
          
          <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">Angaben gemäß § 5 TMG</h2>
              <p>
                BakeWell<br />
                [Vor- und Nachname / Firma]<br />
                [Straße und Hausnummer]<br />
                [PLZ Ort]<br />
                Deutschland
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">Kontakt</h2>
              <p>
                E-Mail: hello@bakewell.de<br />
                Telefon: [Telefonnummer]
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
                [USt-IdNr.]
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>
                [Vor- und Nachname]<br />
                [Adresse]
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Impressum;
