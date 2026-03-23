import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEmojiFlag, countries } from 'countries-list';

const CONTINENTS = [
  { id: 'AF', label: 'Africa',     },
  { id: 'EU', label: 'Europe',     },
  { id: 'AS', label: 'Asia',       },
  { id: 'ME', label: 'Middle East',},
  { id: 'AM', label: 'Americas',   },
  { id: 'OC', label: 'Oceania',    },
];

const CONTINENT_MAP = {
  MA:'AF',DZ:'AF',TN:'AF',EG:'AF',ZA:'AF',NG:'AF',KE:'AF',SN:'AF',CI:'AF',GH:'AF',
  ET:'AF',TZ:'AF',CM:'AF',AO:'AF',MZ:'AF',MG:'AF',ZW:'AF',UG:'AF',RW:'AF',MU:'AF',
  BJ:'AF',BF:'AF',ML:'AF',NE:'AF',TD:'AF',SD:'AF',SO:'AF',LY:'AF',GA:'AF',CG:'AF',
  FR:'EU',DE:'EU',ES:'EU',IT:'EU',GB:'EU',NL:'EU',BE:'EU',PT:'EU',CH:'EU',PL:'EU',
  SE:'EU',NO:'EU',DK:'EU',AT:'EU',CZ:'EU',RO:'EU',GR:'EU',HU:'EU',FI:'EU',SK:'EU',
  HR:'EU',BG:'EU',RS:'EU',LT:'EU',LV:'EU',EE:'EU',SI:'EU',IE:'EU',LU:'EU',MT:'EU',
  IS:'EU',AL:'EU',MK:'EU',BA:'EU',MD:'EU',UA:'EU',BY:'EU',
  SA:'ME',AE:'ME',QA:'ME',KW:'ME',BH:'ME',OM:'ME',JO:'ME',LB:'ME',IQ:'ME',IL:'ME',
  TR:'ME',IR:'ME',SY:'ME',YE:'ME',PS:'ME',
  CN:'AS',IN:'AS',JP:'AS',KR:'AS',VN:'AS',TH:'AS',ID:'AS',MY:'AS',SG:'AS',BD:'AS',
  PK:'AS',LK:'AS',PH:'AS',MM:'AS',KH:'AS',LA:'AS',NP:'AS',MN:'AS',KZ:'AS',UZ:'AS',
  TM:'AS',KG:'AS',TJ:'AS',HK:'AS',TW:'AS',
  US:'AM',CA:'AM',BR:'AM',MX:'AM',AR:'AM',CO:'AM',CL:'AM',PE:'AM',VE:'AM',EC:'AM',
  BO:'AM',PY:'AM',UY:'AM',GY:'AM',SR:'AM',CU:'AM',DO:'AM',HT:'AM',JM:'AM',TT:'AM',
  GT:'AM',HN:'AM',SV:'AM',NI:'AM',CR:'AM',PA:'AM',
  AU:'OC',NZ:'OC',PG:'OC',FJ:'OC',SB:'OC',VU:'OC',WS:'OC',TO:'OC',
};

const freshGeo = () => ({ continents: [], countries: [] });

const ALL_COUNTRIES = Object.entries(countries)
  .map(([code, data]) => ({
    code,
    name: data.name,
    flag: getEmojiFlag(code),
    continent: CONTINENT_MAP[code] || null,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

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

const PHP_ENDPOINT = '/api/register.php';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CheckPill({ label, checked, onChange }) {
  return (
    <button type="button" className={`rf-pill ${checked ? 'rf-pill--on' : ''}`} onClick={() => onChange(!checked)} aria-pressed={checked}>
      <span className="rf-pill-box">{checked && <span className="rf-pill-check">✓</span>}</span>
      {label}
    </button>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="rf-field">
      <label className="rf-label">{label}{required && <span className="rf-req">*</span>}</label>
      {children}
      {error && <span className="rf-error">{error}</span>}
    </div>
  );
}

function GeoSelect({ value, onChange, placeholder }) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState('');
  const containerRef        = useRef(null);
  const searchRef           = useRef(null);

  const selContinents = value.continents || [];
  const selCountries  = value.countries  || [];

  const visibleCountries = ALL_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) && !selCountries.includes(c.name)
  );

  const grouped = CONTINENTS.map(cont => ({
    ...cont,
    items: visibleCountries.filter(c => c.continent === cont.id),
  })).filter(g => g.items.length > 0);

  const toggleContinent = (id) => {
    const next = selContinents.includes(id)
      ? selContinents.filter(c => c !== id)
      : [...selContinents, id];
    onChange({ continents: next, countries: selCountries });
  };

  const toggleCountry = (name) => {
    const next = selCountries.includes(name)
      ? selCountries.filter(n => n !== name)
      : [...selCountries, name];
    onChange({ continents: selContinents, countries: next });
  };

  const removeCountry = (name, e) => { e.stopPropagation(); toggleCountry(name); };
  const clearAll = (e) => { e.stopPropagation(); onChange({ continents: [], countries: [] }); };
  const totalSelected = selContinents.length + selCountries.length;
  const getFlagFor = (name) => { const c = ALL_COUNTRIES.find(c => c.name === name); return c ? c.flag + ' ' : ''; };

  useEffect(() => {
    const h = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => { if (open && searchRef.current) searchRef.current.focus(); }, [open]);

  return (
    <div className="rf-mcs" ref={containerRef}>
      <div className="rf-cont-pills">
        {CONTINENTS.map(c => (
          <button key={c.id} type="button"
            className={`rf-cont-pill ${selContinents.includes(c.id) ? 'rf-cont-pill--on' : ''}`}
            onClick={() => toggleContinent(c.id)}
          >
            <span className="rf-cont-emoji">{c.emoji}</span> {c.label}
          </button>
        ))}
      </div>

      <div
        className={`rf-mcs-control ${open ? 'rf-mcs-control--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        role="combobox" aria-expanded={open} tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o); } }}
      >
        <div className="rf-mcs-values">
          {selCountries.length === 0 && (
            <span className="rf-mcs-placeholder">{placeholder || 'Or pick specific countries…'}</span>
          )}
          {selCountries.map(name => (
            <span key={name} className="rf-mcs-tag">
              {getFlagFor(name)}{name}
              <button type="button" className="rf-mcs-tag-remove" onClick={e => removeCountry(name, e)} aria-label={`Remove ${name}`}>×</button>
            </span>
          ))}
        </div>
        <span className={`rf-mcs-arrow ${open ? 'rf-mcs-arrow--up' : ''}`}>▾</span>
      </div>

      {open && (
        <div className="rf-mcs-dropdown">
          <div className="rf-mcs-search-wrap">
            <input
              ref={searchRef}
              className="rf-mcs-search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search countries…"
              onClick={e => e.stopPropagation()}
            />
          </div>
          <div className="rf-mcs-list">
            {visibleCountries.length === 0
              ? <div className="rf-mcs-empty">{search ? 'No results found.' : 'All countries selected.'}</div>
              : search
                ? visibleCountries.map(c => (
                    <div key={c.code} className="rf-mcs-option" onClick={e => { e.stopPropagation(); toggleCountry(c.name); }}>
                      {c.flag} {c.name}
                    </div>
                  ))
                : grouped.map(g => (
                    <div key={g.id}>
                      <div className="rf-mcs-group-header">{g.emoji} {g.label}</div>
                      {g.items.map(c => (
                        <div key={c.code} className="rf-mcs-option rf-mcs-option--indent"
                          onClick={e => { e.stopPropagation(); toggleCountry(c.name); }}>
                          {c.flag} {c.name}
                        </div>
                      ))}
                    </div>
                  ))
            }
          </div>
          {totalSelected > 0 && (
            <div className="rf-mcs-footer">
              <button type="button" className="rf-mcs-clear" onClick={clearAll}>
                Clear all ({totalSelected})
              </button>
            </div>
          )}
        </div>
      )}
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
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          <motion.path
            d="M14 24l7 7 13-14"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          />
        </svg>
      </div>
      <h2 className="rf-success-title">Registration Received</h2>
      <p className="rf-success-sub">
        Thank you for your interest. Our team will review your profile and reach out within{' '}
        <strong>2–3 business days</strong> to discuss the next steps and confirm your participation.
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
    companyName: '', sector: '', website: '',
    contactName: '', email: '', phone: '',
    companyTypes: [], companyTypeOther: '',
    products: '',
    sourcing: freshGeo(),
    export:   freshGeo(),
    comments: '',
  });

  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

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
      companyName: '', sector: '', website: '',
      contactName: '', email: '', phone: '',
      companyTypes: [], companyTypeOther: '',
      products: '',
      sourcing: freshGeo(),
      export:   freshGeo(),
      comments: '',
    });
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="rf-wrap">
        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessScreen key="success" onReset={reset} />
          ) : (
            <motion.div key="form" className="rf-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              <motion.div className="rf-hero" variants={fadeUp} custom={0} initial="hidden" animate="show">
                <p className="rf-eyebrow">Wink B2B Agency</p>
                <h1 className="rf-page-title">Registration</h1>
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
                      <CheckPill key={t} label={t} checked={form.companyTypes.includes(t)} onChange={() => toggleArr('companyTypes', t)} />
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
                  <p className="rf-step-hint">Select continents, specific countries, or both — these are the regions you want to source from.</p>
                  <GeoSelect value={form.sourcing} onChange={val => set('sourcing', val)} placeholder="Or pick specific countries…" />
                </Step>

                <Step number="06" title="Target Export Markets" index={6}>
                  <p className="rf-step-hint">Select continents, specific countries, or both — these are your target export markets.</p>
                  <GeoSelect value={form.export} onChange={val => set('export', val)} placeholder="Or pick specific countries…" />
                </Step>

                <Step number="07" title="Additional Comments" index={7}>
                  <Field label="Comments (optional)">
                    <textarea className="rf-input rf-textarea" value={form.comments} onChange={e => set('comments', e.target.value)} placeholder="Anything else you'd like us to know…" rows={4} />
                  </Field>
                </Step>

                <motion.div className="rf-submit-row" variants={fadeUp} custom={8} initial="hidden" animate="show">
                  <button className="rf-submit" type="submit" disabled={loading}>
                    {loading ? <span className="rf-spinner" /> : <>Submit Registration <span className="rf-arrow">→</span></>}
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

  .rf-wrap {
    --rf-accent:        var(--color-one);
    --rf-accent-dark:   var(--extra-color-two);
    --rf-accent-light:  color-mix(in srgb, var(--color-one) 12%, transparent);
    --rf-accent-border: color-mix(in srgb, var(--color-one) 35%, transparent);

    --rf-text:          var(--extra-color-one);
    --rf-text-muted:    color-mix(in srgb, var(--extra-color-one) 65%, transparent);
    --rf-text-faint:    color-mix(in srgb, var(--extra-color-one) 38%, transparent);

    --rf-surface:       color-mix(in srgb, var(--color-two) 90%, transparent);
    --rf-surface-sub:   color-mix(in srgb, var(--color-two) 70%, var(--extra-color-one) 30%);
    --rf-surface-page:  var(--color-two);

    --rf-border:        color-mix(in srgb, var(--color-third) 20%, transparent);
    --rf-border-mid:    color-mix(in srgb, var(--color-third) 35%, transparent);

    --rf-danger:        #f87171;
    --rf-danger-border: #fca5a5;
  }

  .rf-wrap {
    position: relative;
    min-height: 100vh;
    background: var(--rf-surface-page);
    color: var(--rf-text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  .rf-container {
    position: relative;
    z-index: 1;
    max-width: 780px;
    margin: 0 auto;
    padding: 6rem 2rem 8rem;
  }

  .rf-hero {
    text-align: center;
    margin-bottom: 4rem;
  }
  .rf-eyebrow {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--rf-accent);
    margin-bottom: 1rem;
  }
  .rf-page-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    line-height: 1.05;
    color: var(--rf-text);
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
  }
  .rf-page-sub {
    font-size: 0.95rem;
    color: var(--rf-text-muted);
    line-height: 1.7;
    max-width: 500px;
    margin: 0 auto;
  }

  .rf-form {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .rf-step {
    border: 1px solid var(--rf-border);
    border-radius: 14px;
    background: var(--rf-surface);
    margin-bottom: 1.25rem;
    overflow: visible;
    transition: border-color 0.25s ease;
  }
  .rf-step:focus-within {
    border-color: var(--rf-border-mid);
  }
  .rf-step-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.4rem 1.8rem;
    border-bottom: 1px solid var(--rf-border);
    border-radius: 14px 14px 0 0;
    background: var(--rf-surface-sub);
  }
  .rf-step-num {
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.2em;
    color: var(--rf-accent);
    background: var(--rf-accent-light);
    border: 1px solid var(--rf-accent-border);
    padding: 3px 8px;
    border-radius: 100px;
    flex-shrink: 0;
  }
  .rf-step-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.15rem;
    color: var(--rf-text);
    margin: 0;
    font-weight: 400;
    letter-spacing: -0.01em;
  }
  .rf-step-body {
    padding: 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    border-radius: 0 0 14px 14px;
  }
  .rf-step-hint {
    font-size: 0.78rem;
    color: var(--rf-text-faint);
    line-height: 1.6;
    margin: 0;
  }

  .rf-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media (max-width: 560px) {
    .rf-grid-2 { grid-template-columns: 1fr; }
  }

  .rf-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .rf-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--rf-text-muted);
  }
  .rf-req {
    color: var(--rf-accent);
    margin-left: 2px;
  }
  .rf-error {
    font-size: 0.72rem;
    color: var(--rf-danger);
    margin-top: 2px;
  }

  .rf-input {
    width: 100%;
    background: color-mix(in srgb, var(--color-two) 60%, transparent);
    border: 1px solid var(--rf-border);
    border-radius: 8px;
    padding: 0.72rem 1rem;
    font-size: 0.88rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--rf-text);
    outline: none;
    transition: border-color 0.2s ease, background 0.2s ease;
    box-sizing: border-box;
  }
  .rf-input::placeholder {
    color: var(--rf-text-faint);
  }
  .rf-input:focus {
    border-color: var(--rf-accent-border);
    background: var(--rf-accent-light);
  }
  .rf-input--err {
    border-color: var(--rf-danger-border);
  }
  .rf-input--indent {
    margin-top: 0.5rem;
  }
  .rf-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2300CEC1' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
    cursor: pointer;
  }
  .rf-select option {
    background: var(--color-two);
    color: var(--extra-color-one);
  }
  .rf-textarea {
    resize: vertical;
    min-height: 110px;
    line-height: 1.6;
  }

  .rf-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .rf-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    background: none;
    border: 1px solid var(--rf-border);
    border-radius: 100px;
    padding: 0.38rem 0.9rem;
    font-size: 0.75rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    color: var(--rf-text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .rf-pill:hover {
    border-color: var(--rf-accent-border);
    color: var(--rf-accent);
  }
  .rf-pill--on {
    background: var(--rf-accent-light);
    border-color: var(--rf-accent-border);
    color: var(--rf-accent);
  }
  .rf-pill-box {
    width: 14px;
    height: 14px;
    border: 1.5px solid currentColor;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .rf-pill--on .rf-pill-box {
    background: var(--rf-accent);
    border-color: var(--rf-accent);
  }
  .rf-pill-check {
    font-size: 9px;
    color: var(--color-two);
    font-weight: 900;
    line-height: 1;
  }

  .rf-cont-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-bottom: 0.65rem;
  }
  .rf-cont-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: color-mix(in srgb, var(--color-two) 60%, transparent);
    border: 1px solid var(--rf-border);
    border-radius: 100px;
    padding: 0.38rem 0.85rem;
    font-size: 0.76rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    color: var(--rf-text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .rf-cont-pill:hover {
    border-color: var(--rf-accent-border);
    color: var(--rf-accent);
    background: var(--rf-accent-light);
  }
  .rf-cont-pill--on {
    background: var(--rf-accent-light);
    border-color: var(--rf-accent-border);
    color: var(--rf-accent);
  }
  .rf-cont-emoji {
    font-size: 14px;
    line-height: 1;
  }

  .rf-mcs {
    position: relative;
    width: 100%;
  }
  .rf-mcs-control {
    width: 100%;
    min-height: 44px;
    background: color-mix(in srgb, var(--color-two) 60%, transparent);
    border: 1px solid var(--rf-border);
    border-radius: 8px;
    padding: 0.4rem 2.5rem 0.4rem 0.75rem;
    font-size: 0.88rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--rf-text);
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    transition: border-color 0.2s, background 0.2s;
    box-sizing: border-box;
    user-select: none;
  }
  .rf-mcs-control:focus {
    outline: none;
    border-color: var(--rf-accent-border);
  }
  .rf-mcs-control--open {
    border-color: var(--rf-accent-border);
    background: var(--rf-accent-light);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .rf-mcs-values {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    flex: 1;
    padding: 2px 0;
  }
  .rf-mcs-placeholder {
    color: var(--rf-text-faint);
    padding: 2px 0;
    font-size: 0.88rem;
    line-height: 1.6;
  }
  .rf-mcs-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--rf-accent-light);
    border: 1px solid var(--rf-accent-border);
    color: var(--rf-accent);
    border-radius: 100px;
    padding: 2px 8px 2px 10px;
    font-size: 0.72rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .rf-mcs-tag-remove {
    background: none;
    border: none;
    color: var(--rf-accent);
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    padding: 0;
    opacity: 0.6;
    display: flex;
    align-items: center;
    transition: opacity 0.15s;
  }
  .rf-mcs-tag-remove:hover { opacity: 1; }
  .rf-mcs-arrow {
    position: absolute;
    right: 1rem;
    top: 14px;
    color: var(--rf-text-muted);
    font-size: 12px;
    pointer-events: none;
    transition: transform 0.2s ease;
  }
  .rf-mcs-arrow--up {
    transform: rotate(180deg);
  }
  .rf-mcs-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--rf-surface);
    border: 1px solid var(--rf-accent-border);
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    z-index: 9999;
    overflow: hidden;
    box-shadow: 0 12px 32px color-mix(in srgb, var(--color-two) 60%, black);
  }
  .rf-mcs-search-wrap {
    padding: 8px;
    border-bottom: 1px solid var(--rf-border);
  }
  .rf-mcs-search {
    width: 100%;
    background: color-mix(in srgb, var(--color-two) 60%, transparent);
    border: 1px solid var(--rf-border);
    border-radius: 6px;
    padding: 0.5rem 0.8rem;
    font-size: 0.82rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--rf-text);
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .rf-mcs-search::placeholder { color: var(--rf-text-faint); }
  .rf-mcs-search:focus { border-color: var(--rf-accent-border); }
  .rf-mcs-list {
    max-height: 240px;
    overflow-y: auto;
    padding: 4px 0;
  }
  .rf-mcs-list::-webkit-scrollbar { width: 4px; }
  .rf-mcs-list::-webkit-scrollbar-track { background: transparent; }
  .rf-mcs-list::-webkit-scrollbar-thumb {
    background: var(--rf-border-mid);
    border-radius: 2px;
  }
  .rf-mcs-group-header {
    padding: 0.6rem 1rem 0.25rem;
    font-size: 0.64rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--rf-text-faint);
    border-top: 1px solid var(--rf-border);
    margin-top: 4px;
  }
  .rf-mcs-group-header:first-child {
    border-top: none;
    margin-top: 0;
  }
  .rf-mcs-option {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    color: var(--rf-text-muted);
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
  }
  .rf-mcs-option--indent { padding-left: 1.6rem; }
  .rf-mcs-option:hover {
    background: var(--rf-accent-light);
    color: var(--rf-accent);
  }
  .rf-mcs-empty {
    padding: 1rem;
    font-size: 0.82rem;
    color: var(--rf-text-faint);
    text-align: center;
  }
  .rf-mcs-footer {
    padding: 6px 8px;
    border-top: 1px solid var(--rf-border);
  }
  .rf-mcs-clear {
    background: none;
    border: none;
    color: var(--rf-accent);
    font-size: 0.72rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    opacity: 0.65;
    cursor: pointer;
    padding: 2px 4px;
    transition: opacity 0.15s;
  }
  .rf-mcs-clear:hover { opacity: 1; }

  .rf-submit-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-top: 1rem;
  }
  .rf-submit {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--rf-accent);
    color: var(--color-two);
    border: none;
    padding: 1rem 2.8rem;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    border-radius: 100px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: opacity 0.2s ease;
  }
  .rf-submit:hover:not(:disabled) { opacity: 0.85; }
  .rf-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  .rf-arrow { transition: transform 0.25s ease; }
  .rf-submit:hover:not(:disabled) .rf-arrow { transform: translateX(4px); }
  .rf-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid color-mix(in srgb, var(--color-two) 40%, transparent);
    border-top-color: var(--color-two);
    border-radius: 50%;
    animation: rf-spin 0.7s linear infinite;
  }
  @keyframes rf-spin { to { transform: rotate(360deg); } }
  .rf-disclaimer {
    font-size: 0.7rem;
    color: var(--rf-text-faint);
    text-align: center;
    max-width: 420px;
    line-height: 1.6;
  }

  .rf-success {
    max-width: 560px;
    margin: 0 auto;
    padding: 8rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .rf-success-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--rf-accent-light);
    border: 1px solid var(--rf-accent-border);
    color: var(--rf-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
  .rf-success-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(1.8rem, 5vw, 3rem);
    color: var(--rf-text);
    letter-spacing: -0.02em;
    margin: 0;
  }
  .rf-success-sub {
    font-size: 0.95rem;
    color: var(--rf-text-muted);
    line-height: 1.8;
    margin: 0;
  }
  .rf-success-sub strong {
    color: var(--rf-accent);
    font-weight: 700;
  }
  .rf-success-note {
    font-size: 0.82rem;
    color: var(--rf-text-faint);
    line-height: 1.7;
    margin: 0;
  }
  .rf-success-btn {
    background: none;
    border: 1px solid var(--rf-accent-border);
    color: var(--rf-accent);
    padding: 0.65rem 1.6rem;
    border-radius: 100px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background 0.2s ease;
  }
  .rf-success-btn:hover { background: var(--rf-accent-light); }

  @media (max-width: 640px) {
    .rf-container { padding: 4rem 1.25rem 6rem; }
    .rf-step-body { padding: 1.25rem; }
    .rf-step-header { padding: 1.1rem 1.25rem; }
  }
`;