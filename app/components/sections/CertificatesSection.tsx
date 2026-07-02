// CertificatesSection — Sacred Seals
// 5 certificate cards with issuer, date, and credential ID
import EntryMarker from "../ui/EntryMarker";

const certs = [
  {
    id: 1,
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "Sep 2024",
    icon: "cloud",
    credId: "AWS-DEV-2024-XXXX",
    accent: "gold",
  },
  {
    id: 2,
    name: "Deep Learning Specialization",
    issuer: "Coursera · deeplearning.ai",
    date: "Jul 2024",
    icon: "model_training",
    credId: "COUR-DL-2024-XXXX",
    accent: "cyan",
  },
  {
    id: 3,
    name: "System Design Interview Pro",
    issuer: "Educative.io",
    date: "Jan 2024",
    icon: "architecture",
    credId: "EDU-SYS-2024-XXXX",
    accent: "gold",
  },
  {
    id: 4,
    name: "Kubernetes Application Developer",
    issuer: "CNCF — CKAD Certified",
    date: "Nov 2024",
    icon: "settings_applications",
    credId: "CKAD-2024-XXXX",
    accent: "cyan",
  },
  {
    id: 5,
    name: "Full Stack Web Development",
    issuer: "The Odin Project",
    date: "Mar 2023",
    icon: "web",
    credId: "TOP-FSWEB-2023-XXXX",
    accent: "gold",
  },
] as const;

export default function CertificatesSection() {
  return (
    <div className="flex flex-col gap-4 section-fade">
      <p className="font-body-md text-xs text-on-surface-variant/50 text-center engraved-text italic mb-2">
        Sacred seals bestowed by the masters of each realm — proof of trials
        completed and wisdom earned.
      </p>

      {certs.map((cert) => (
        <div
          key={cert.id}
          className="relative pb-6 mb-2 border-b last:border-b-0 border-faded-bronze/10"
        >
          <div className="flex flex-col">
            <div className="flex-1 min-w-0">
              <h3 className="font-headline-md text-sm text-white engraved-text tracking-wide leading-snug flex items-center">
                <EntryMarker />
                {cert.name}
              </h3>
              <p className="font-label-caps text-[9px] text-on-surface-variant/55 uppercase tracking-[0.15em] mt-0.5">
                {cert.issuer}
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="font-label-caps text-[8px] text-on-surface-variant/30 tracking-[0.1em]">
                  {cert.credId}
                </span>
                <span
                  className={`font-label-caps text-[8px] ${
                    cert.accent === "gold" ? "text-muted-gold/55" : "text-icy-cyan/55"
                  }`}
                >
                  {cert.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
