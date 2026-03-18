import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTORS = [
  'Food / Agri-Food', 'Construction / BTP', 'Textile', 'Kitchenware & HORECA',
  'Multisector', 'Investment', 'Electrical / Electronics', 'Engineering',
  'Medical / Healthcare', 'Mining', 'Cosmetics', 'Services', 'Other',
];

const COMPANY_TYPES = [
  'Importer', 'Exporter', 'Manufacturer', 'Distributor',
  'Retailer', 'Wholesaler', 'Logistics Provider',
  'E-commerce Platform', 'HORECA (Hotels, Restaurants, Catering)', 'Other',
];

const REGIONS = ['Morocco', 'Europe', 'Asia', 'Africa', 'Middle East', 'Other'];

const PHP_ENDPOINT = '/api/register.php';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
};

function CheckPill({ label, checked, onChange }) {
  return (
    <button
      type="button"
      className={`rf-pill ${checked ? 'rf-pill--on' : ''}`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span className="rf-pill-box">{checked && <span className="rf-pill-check">✓</span>}</span>
      {label}
    </button>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="rf-field">
      <label className="rf-label">
        {label}{required && <span className="rf-req">*</span>}
      </label>
      {children}
      {error && <span className="rf-error">{error}</span>}
    </div>
  );
}

function Step({ number, title, children, index }) {
  return (
    <motion.div className="rf-step" variants={fadeUp} custom={index} initial="hidden" animate="show">
      <div className="rf-step-header">
        <span className="rf-step-num">{number}</span>
        <h2 className="rf-step-title">{title}</h2>
      </div>
      <div className="rf-step-body">{children}</div>
    </motion.div>
  );
}

function SuccessScreen({ onReset }) {
  return (
    <motion.div
      className="rf-success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rf-success-icon">
        <motion.svg
          width="48" height="48" viewBox="0 0 48 48" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        >
          <circle cx="24" cy="24" r="22" stroke="var(--color-one)" strokeWidth="2" opacity="0.3" />
          <motion.path
            d="M14 24l7 7 13-14"
            stroke="var(--color-one)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          />
        </motion.svg>
      </div>
      <h2 className="rf-success-title">Registration Received</h2>
      <p className="rf-success-sub">
        Thank you for your interest. Our team will review your profile and reach out within <strong>2–3 business days</strong> to discuss the next steps and confirm your participation.
      </p>
      <p className="rf-success-note">
        Keep an eye on your inbox — and feel free to contact us if you have any questions in the meantime.
      </p>
      <button className="rf-success-btn" onClick={onReset}>Submit Another Registration</button>
    </motion.div>
  );
}

export default function RegisterForm() {
  const [form, setForm] = useState({
    companyName: '',
    sector: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    companyTypes: [],
    companyTypeOther: '',
    products: '',
    sourcingRegions: [],
    sourcingOther: '',
    exportRegions: [],
    exportOther: '',
    comments: '',
  });

  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleArr = (key, val) => setForm(f => ({
    ...f,
    [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val],
  }));

  const validate = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = 'Company name is required.';
    if (!form.contactName.trim()) e.contactName = 'Contact name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'A valid email is required.';
    if (form.companyTypes.length === 0) e.companyTypes = 'Please select at least one company type.';
    if (!form.products.trim()) e.products = 'Please describe your products.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await fetch(PHP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({
      companyName: '', sector: '', website: '', contactName: '', email: '',
      phone: '', companyTypes: [], companyTypeOther: '', products: '',
      sourcingRegions: [], sourcingOther: '', exportRegions: [], exportOther: '', comments: '',
    });
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="rf-wrap">
        <div className="rf-bg" />
        <div className="rf-noise" />

        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessScreen key="success" onReset={reset} />
          ) : (
            <motion.div key="form" className="rf-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              <motion.div className="rf-hero" variants={fadeUp} custom={0} initial="hidden" animate="show">
                <p className="rf-eyebrow">Wink B2B Agency</p>
                <h1 className="rf-page-title">Partner <span className="rf-accent">Registration</span></h1>
                <p className="rf-page-sub">Fill in the form below and our team will get back to you within 2–3 business days to confirm your participation.</p>
              </motion.div>

              <form className="rf-form" onSubmit={handleSubmit} noValidate>

                <Step number="01" title="Company Details" index={1}>
                  <div className="rf-grid-2">
                    <Field label="Company Name" required error={errors.companyName}>
                      <input className={`rf-input ${errors.companyName ? 'rf-input--err' : ''}`} value={form.companyName} onChange={e => set('companyName', e.target.value)} placeholder="Wink International Ltd." />
                    </Field>
                    <Field label="Sector of Activity">
                      <select className="rf-input rf-select" value={form.sector} onChange={e => set('sector', e.target.value)}>
                        <option value="">Select a sector…</option>
                        {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Company Website">
                    <input className="rf-input" value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://yourcompany.com" type="url" />
                  </Field>
                </Step>

                <Step number="02" title="Contact Information" index={2}>
                  <div className="rf-grid-2">
                    <Field label="Contact Name" required error={errors.contactName}>
                      <input className={`rf-input ${errors.contactName ? 'rf-input--err' : ''}`} value={form.contactName} onChange={e => set('contactName', e.target.value)} placeholder="Jane Doe" />
                    </Field>
                    <Field label="Email" required error={errors.email}>
                      <input className={`rf-input ${errors.email ? 'rf-input--err' : ''}`} value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@company.com" type="email" />
                    </Field>
                  </div>
                  <Field label="Phone Number">
                    <input className="rf-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 212 000 0000" type="tel" />
                  </Field>
                </Step>

                <Step number="03" title="Company Profile / Type" index={3}>
                  <p className="rf-step-hint">Please select all options that best describe your company.</p>
                  {errors.companyTypes && <span className="rf-error">{errors.companyTypes}</span>}
                  <div className="rf-pills">
                    {COMPANY_TYPES.map(t => (
                      <CheckPill
                        key={t}
                        label={t === 'Other' ? 'Other' : t}
                        checked={form.companyTypes.includes(t)}
                        onChange={() => toggleArr('companyTypes', t)}
                      />
                    ))}
                  </div>
                  {form.companyTypes.includes('Other') && (
                    <input className="rf-input rf-input--indent" value={form.companyTypeOther} onChange={e => set('companyTypeOther', e.target.value)} placeholder="Please specify…" />
                  )}
                </Step>

                <Step number="04" title="Products of Interest / Products Offered" index={4}>
                  <p className="rf-step-hint">Indicate the products you are interested in sourcing or the products you offer for export.</p>
                  <Field label="Products" required error={errors.products}>
                    <textarea className={`rf-input rf-textarea ${errors.products ? 'rf-input--err' : ''}`} value={form.products} onChange={e => set('products', e.target.value)} placeholder="e.g. Fresh citrus fruits, canned sardines, olive oil, argan oil…" rows={4} />
                  </Field>
                </Step>

                <Step number="05" title="Country of Sourcing" index={5}>
                  <p className="rf-step-hint">For importers — which regions are you interested in sourcing from?</p>
                  <div className="rf-pills">
                    {REGIONS.map(r => (
                      <CheckPill key={r} label={r} checked={form.sourcingRegions.includes(r)} onChange={() => toggleArr('sourcingRegions', r)} />
                    ))}
                  </div>
                  {form.sourcingRegions.includes('Other') && (
                    <input className="rf-input rf-input--indent" value={form.sourcingOther} onChange={e => set('sourcingOther', e.target.value)} placeholder="Please specify…" />
                  )}
                </Step>

                <Step number="06" title="Target Export Markets" index={6}>
                  <p className="rf-step-hint">For exporters — which markets or regions are you targeting?</p>
                  <div className="rf-pills">
                    {REGIONS.map(r => (
                      <CheckPill key={r} label={r} checked={form.exportRegions.includes(r)} onChange={() => toggleArr('exportRegions', r)} />
                    ))}
                  </div>
                  {form.exportRegions.includes('Other') && (
                    <input className="rf-input rf-input--indent" value={form.exportOther} onChange={e => set('exportOther', e.target.value)} placeholder="Please specify…" />
                  )}
                </Step>

                <Step number="07" title="Additional Comments" index={7}>
                  <Field label="Comments (optional)">
                    <textarea className="rf-input rf-textarea" value={form.comments} onChange={e => set('comments', e.target.value)} placeholder="Anything else you'd like us to know…" rows={4} />
                  </Field>
                </Step>

                <motion.div className="rf-submit-row" variants={fadeUp} custom={8} initial="hidden" animate="show">
                  <button className="rf-submit" type="submit" disabled={loading}>
                    {loading ? (
                      <span className="rf-spinner" />
                    ) : (
                      <>Submit Registration <span className="rf-arrow">→</span></>
                    )}
                  </button>
                  <p className="rf-disclaimer">Your information is kept confidential and used solely to match you with relevant B2B opportunities.</p>
                </motion.div>

              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700;800&display=swap');

  .rf-wrap { position: relative; min-height: 100vh; background: var(--color-two); color: var(--color-third); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  .rf-bg { position: fixed; inset: -20%; background: radial-gradient(ellipse 60% 50% at 20% 20%, rgba(0,206,193,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(0,63,92,0.3) 0%, transparent 55%); pointer-events: none; z-index: 0; }
  .rf-noise { position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E"); background-size: 200px; pointer-events: none; z-index: 0; mix-blend-mode: overlay; }

  .rf-container { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; padding: 6rem 2rem 8rem; }

  .rf-hero { text-align: center; margin-bottom: 4rem; }
  .rf-eyebrow { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--color-one); opacity: 0.8; margin-bottom: 1rem; }
  .rf-page-title { font-family: 'DM Serif Display', serif; font-size: clamp(2.4rem, 6vw, 4.5rem); line-height: 1.05; color: var(--color-third); letter-spacing: -0.02em; margin-bottom: 1rem; }
  .rf-accent { font-style: italic; background: linear-gradient(135deg, var(--color-one), var(--color-fourth)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .rf-page-sub { font-size: 0.95rem; color: var(--color-third); opacity: 0.55; line-height: 1.7; max-width: 500px; margin: 0 auto; }

  .rf-form { display: flex; flex-direction: column; gap: 2px; }

  .rf-step { border: 1px solid rgba(0,206,193,0.1); border-radius: 14px; overflow: hidden; background: rgba(0,206,193,0.02); margin-bottom: 1.25rem; transition: border-color 0.25s ease; }
  .rf-step:focus-within { border-color: rgba(0,206,193,0.25); }
  .rf-step-header { display: flex; align-items: center; gap: 1rem; padding: 1.4rem 1.8rem; border-bottom: 1px solid rgba(0,206,193,0.08); }
  .rf-step-num { font-size: 0.58rem; font-weight: 800; letter-spacing: 0.2em; color: var(--color-one); opacity: 0.6; background: rgba(0,206,193,0.08); border: 1px solid rgba(0,206,193,0.2); padding: 3px 8px; border-radius: 100px; flex-shrink: 0; }
  .rf-step-title { font-family: 'DM Serif Display', serif; font-size: 1.15rem; color: var(--color-third); margin: 0; font-weight: 400; letter-spacing: -0.01em; }
  .rf-step-body { padding: 1.8rem; display: flex; flex-direction: column; gap: 1.1rem; }
  .rf-step-hint { font-size: 0.78rem; color: var(--color-third); opacity: 0.45; line-height: 1.6; margin: 0; }

  .rf-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media (max-width: 560px) { .rf-grid-2 { grid-template-columns: 1fr; } }

  .rf-field { display: flex; flex-direction: column; gap: 0.4rem; }
  .rf-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-third); opacity: 0.55; }
  .rf-req { color: var(--color-one); margin-left: 2px; }
  .rf-error { font-size: 0.72rem; color: #ff6b6b; margin-top: 2px; }

  .rf-input { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(0,206,193,0.15); border-radius: 8px; padding: 0.72rem 1rem; font-size: 0.88rem; font-family: 'DM Sans', sans-serif; color: var(--color-third); outline: none; transition: border-color 0.2s ease, background 0.2s ease; }
  .rf-input::placeholder { color: var(--color-third); opacity: 0.25; }
  .rf-input:focus { border-color: rgba(0,206,193,0.5); background: rgba(0,206,193,0.04); }
  .rf-input--err { border-color: rgba(255,107,107,0.5); }
  .rf-input--indent { margin-top: 0.5rem; }
  .rf-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2300CEC1' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; cursor: pointer; }
  .rf-select option { background: #003F5C; color: #D1DBDC; }
  .rf-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }

  .rf-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .rf-pill { display: inline-flex; align-items: center; gap: 0.45rem; background: none; border: 1px solid rgba(0,206,193,0.15); border-radius: 100px; padding: 0.38rem 0.9rem; font-size: 0.75rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: var(--color-third); opacity: 0.55; cursor: pointer; transition: all 0.2s ease; }
  .rf-pill:hover { border-color: var(--color-one); color: var(--color-one); opacity: 1; }
  .rf-pill--on { background: rgba(0,206,193,0.08); border-color: var(--color-one); color: var(--color-one); opacity: 1; }
  .rf-pill-box { width: 14px; height: 14px; border: 1.5px solid currentColor; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.15s; }
  .rf-pill--on .rf-pill-box { background: var(--color-one); border-color: var(--color-one); }
  .rf-pill-check { font-size: 9px; color: var(--color-two); font-weight: 900; line-height: 1; }

  .rf-submit-row { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding-top: 1rem; }
  .rf-submit { display: inline-flex; align-items: center; gap: 0.6rem; background: var(--color-one); color: var(--color-two); border: none; padding: 1rem 2.8rem; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.16em; border-radius: 100px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.25s ease; position: relative; overflow: hidden; }
  .rf-submit::before { content: ''; position: absolute; inset: 0; background: var(--color-fourth); transform: translateX(-105%); transition: transform 0.4s cubic-bezier(0.22,1,0.36,1); z-index: 0; }
  .rf-submit:hover::before { transform: translateX(0); }
  .rf-submit:hover { box-shadow: 0 8px 32px rgba(0,206,193,0.35); transform: translateY(-2px); }
  .rf-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .rf-submit span, .rf-submit .rf-arrow { position: relative; z-index: 1; }
  .rf-arrow { transition: transform 0.25s ease; }
  .rf-submit:hover .rf-arrow { transform: translateX(4px); }
  .rf-spinner { width: 18px; height: 18px; border: 2px solid rgba(0,63,92,0.3); border-top-color: var(--color-two); border-radius: 50%; animation: rf-spin 0.7s linear infinite; }
  @keyframes rf-spin { to { transform: rotate(360deg); } }
  .rf-disclaimer { font-size: 0.7rem; color: var(--color-third); opacity: 0.35; text-align: center; max-width: 420px; line-height: 1.6; }

  .rf-success { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; padding: 8rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
  .rf-success-icon { width: 80px; height: 80px; border-radius: 50%; background: rgba(0,206,193,0.06); border: 1px solid rgba(0,206,193,0.2); display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem; }
  .rf-success-title { font-family: 'DM Serif Display', serif; font-size: clamp(1.8rem, 5vw, 3rem); color: var(--color-third); letter-spacing: -0.02em; margin: 0; }
  .rf-success-sub { font-size: 0.95rem; color: var(--color-third); opacity: 0.65; line-height: 1.8; margin: 0; }
  .rf-success-sub strong { color: var(--color-one); font-weight: 700; }
  .rf-success-note { font-size: 0.82rem; color: var(--color-third); opacity: 0.4; line-height: 1.7; margin: 0; }
  .rf-success-btn { background: none; border: 1px solid rgba(0,206,193,0.25); color: var(--color-one); padding: 0.65rem 1.6rem; border-radius: 100px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; cursor: pointer; margin-top: 0.5rem; transition: all 0.25s ease; }
  .rf-success-btn:hover { background: rgba(0,206,193,0.08); border-color: var(--color-one); }

  @media (max-width: 640px) {
    .rf-container { padding: 4rem 1.25rem 6rem; }
    .rf-step-body { padding: 1.25rem; }
    .rf-step-header { padding: 1.1rem 1.25rem; }
  }
`;