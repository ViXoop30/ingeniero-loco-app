import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export default function Privacy() {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
    >
      <div className="flex items-center space-x-4 mb-12">
        <div className="w-12 h-12 bg-accent/20 flex items-center justify-center rounded-xl border border-accent/30">
          <Shield className="w-6 h-6 text-accent" />
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter uppercase">{t('privacy.title')}</h1>
      </div>

      <div className="glass-card p-8 md:p-12 space-y-12 text-white/70 leading-relaxed">
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-black italic uppercase tracking-widest text-white">{t('privacy.confidentiality')}</h2>
          </div>
          <p className="mb-4">
            <Trans i18nKey="privacy.confidentiality_p1">
              En <strong>El Ingeniero Loco</strong>, operamos bajo un modelo de negocio transparente: generamos valor y beneficios a través de la excelencia técnica en nuestros servicios. Sin embargo, esto nunca compromete la integridad de su información.
            </Trans>
          </p>
          <p>
            <Trans i18nKey="privacy.confidentiality_p2">
              Toda la información, datos estratégicos, secretos comerciales y activos digitales proporcionados por nuestros clientes son tratados bajo <strong>estrictos protocolos de confidencialidad absoluta</strong>. Entendemos que su negocio es su ventaja competitiva, y protegemos su información con el mismo rigor que protegemos nuestra propia infraestructura.
            </Trans>
          </p>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-black italic uppercase tracking-widest text-white">{t('privacy.usage')}</h2>
          </div>
          <p>
            {t('privacy.usage_p1')}
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
            <li>{t('privacy.usage_li1')}</li>
            <li>{t('privacy.usage_li2')}</li>
            <li>{t('privacy.usage_li3')}</li>
            <li>{t('privacy.usage_li4')}</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-black italic uppercase tracking-widest text-white">{t('privacy.ip')}</h2>
          </div>
          <p>
            {t('privacy.ip_p1')}
          </p>
        </section>

        <section className="pt-8 border-t border-white/5">
          <p className="text-sm font-mono uppercase tracking-widest text-white/30">
            {t('privacy.last_update', { date: new Date().toLocaleDateString() })}
          </p>
        </section>
      </div>
    </motion.div>
  );
}
