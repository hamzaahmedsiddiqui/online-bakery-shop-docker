import Layout from "@/components/Layout";

const Datenschutz = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Datenschutzerklärung</h1>
          
          <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">1. Datenschutz auf einen Blick</h2>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-1">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">2. Verantwortliche Stelle</h2>
              <p>
                BakeWell<br />
                [Vollständige Adresse]<br />
                E-Mail: hello@bakewell.de
              </p>
              <p>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">3. Datenerfassung auf dieser Website</h2>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-1">Cookies</h3>
              <p>
                Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie richten keinen Schaden an. Wir verwenden Cookies, um unsere Website nutzerfreundlich zu gestalten. Einige Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen.
              </p>
              <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-1">Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">4. Ihre Rechte</h2>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">5. SSL- bzw. TLS-Verschlüsselung</h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Datenschutz;
