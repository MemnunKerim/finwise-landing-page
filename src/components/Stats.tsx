'use client';

import { stats } from '@/data/stats';
import { motion } from 'framer-motion';

/**
 * PaletDepo – Hızlı İstatistikler
 * IStats = { title, icon, description }
 */
const Stats: React.FC = () => (
  <section
    id="stats"
    className="relative isolate overflow-hidden py-20"
  >
    <h2 className="sr-only">PaletDepo’nun Başlıca Rakamları</h2>
    {/* arka plan grid */}
    <div
      className="pointer-events-none absolute inset-0 -z-10
                 bg-[url('/images/grid.svg')] opacity-20
                 bg-[length:40px_40px]
                 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent)]"
    />

    <div className="max-w-6xl mx-auto px-4 grid gap-12 sm:grid-cols-3 text-center">
      {stats.map((item) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2"
        >
          {item.icon}
          <h3 className="text-3xl font-bold text-foreground">{item.title}</h3>
          <p className="text-sm text-foreground/70 max-w-xs">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Stats;