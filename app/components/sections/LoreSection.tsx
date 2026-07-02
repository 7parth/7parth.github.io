import React from "react";
import { motion } from "framer-motion";

export default function LoreSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full min-h-[50vh] px-4 pb-0 pt-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-md mx-auto space-y-6"
      >
        <p className="font-[family-name:var(--font-ibm-plex)] text-[15px] leading-relaxed text-[#ECE7DD] italic engraved-text">
          You know...<br></br>
          Most portfolios are built<br />
          to impress recruiters.<br />
          <br />
          This one was built
          <br />
          to impress Kratos.
          <br /><br />
          Fortunately,<br />
          the recruiter gets to enjoy it too.
        </p>
      </motion.div>
      <p className="mt-3 mb-2 font-[family-name:var(--font-cinzel)] text-[11px] tracking-[0.2em] text-muted-gold/40 uppercase max-w-xs text-center engraved-text">
        Forged with unhealthy admiration for God of War.
      </p>

      <motion.div
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="flex flex-col items-center"
      >

        <div className="w-48 h-32 relative rounded border border-muted-gold/20 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <img
            src="/kratos-nod.gif"
            alt="Kratos sighing"
            className="object-cover w-full h-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none"></div>
        </div>


      </motion.div>
    </div>
  );
}
