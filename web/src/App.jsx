
import { useEffect, useRef, useState } from "react";
import {
  authenticateDemo,
  createDemoData,
  SESSION_DURATION_MS,
  validateEmail,
  validatePassword,
} from "./auth";
import "./App.css";

const INITIAL_FORM = { email: "", password: "" };

export default function App() {
  const [status, setStatus] = useState("login");
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldError, setFieldError] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const timerRef = useRef(null);

  function clearTimer() {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function clearSession() {
    clearTimer();
    setUser(null);
    setUserData(null);
    setExpiresAt(null);
  }

  function logout() {
    clearSession();
    setForm(INITIAL_FORM);
    setFieldError("");
    setMessage("");
    setStatus("login");
  }

  function expireSession() {
    clearSession();
    setFieldError("");
    setMessage("Oturum süreniz doldu. Lütfen yeniden giriş yapın.");
    setStatus("expired");
  }

  useEffect(() => {
    return () => clearTimer();
  }, []);

  useEffect(() => {
    if (status !== "authenticated" || expiresAt === null) {
      return undefined;
    }

    const remaining = Math.max(0, expiresAt - Date.now());
    timerRef.current = setTimeout(expireSession, remaining);

    return () => clearTimer();
  }, [status, expiresAt]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFieldError("");
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFieldError("");
    setMessage("");

    const email = form.email.trim();

    if (!validateEmail(email)) {
      setFieldError("Geçerli bir e-posta adresi girin.");
      return;
    }

    if (!validatePassword(form.password)) {
      setFieldError("Parola 8 ile 128 karakter arasında olmalıdır.");
      return;
    }

    const result = authenticateDemo(email, form.password);

    if (!result.ok) {
      // Hesabın mevcut olup olmadığını açıklama.
      setMessage("Bu e-posta veya parola hatalı");
      setStatus("login");
      return;
    }

    clearSession();

    setUser(result.user);
    setUserData(createDemoData(result.user.email));
    setExpiresAt(Date.now() + SESSION_DURATION_MS);
    setForm(INITIAL_FORM);
    setStatus("authenticated");
  }

  function addDemoItem() {
    if (status !== "authenticated" || !userData) {
      return;
    }

    setUserData((current) => {
      if (!current || current.ownerEmail !== user?.email) {
        return current;
      }

      return {
        ...current,
        items: [
          ...current.items,
          `Özel demo kaydı ${current.items.length + 1}`,
        ],
      };
    });
  }

  return (
    <main className="page">
      <section className="panel">
        <header className="header">
          <p className="eyebrow">GÜVENLİAKIŞ LABORATUVARI</p>
          <h1>Kimlik ve Oturum Yönetimi</h1>
          <p className="muted">
            React ile savunma amaçlı yerel arayüz demosu
          </p>
        </header>

        <div className="warning" role="note">
          Eğitim amaçlı sahte kimlik doğrulama. Gerçek hesaplarla
          kullanmayın. Bu uygulama sunucu tarafında kimlik doğrulamaz.
        </div>

        {status === "login" && (
          <form onSubmit={handleSubmit} noValidate>
            <h2>Giriş yap</h2>

            <label htmlFor="email">E-posta</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              value={form.email}
              onChange={handleChange}
              maxLength={254}
              required
            />

            <label htmlFor="password">Parola</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              maxLength={128}
              required
            />

            {fieldError && (
              <p className="error" role="alert">{fieldError}</p>
            )}

            {message && (
              <p className="error" role="alert">{message}</p>
            )}

            <button type="submit">Giriş yap</button>

            <div className="demo-accounts">
              <h3>Yerel demo hesapları</h3>
              <p>
                Ayşe: ayse@example.test / DemoAyse123!
              </p>
              <p>
                Mehmet: mehmet@example.test / DemoMehmet123!
              </p>
              <p className="muted">
                Bu bilgiler yalnızca eğitim içindir.
              </p>
            </div>
          </form>
        )}

        {status === "authenticated" && user && userData && (
          <section aria-labelledby="welcome-heading">
            <p className="success">Giriş başarılı</p>
            <h2 id="welcome-heading">
              Hoş geldin, {user.displayName}
            </h2>
            <p>Aktif hesap: {user.email}</p>

            <div className="data-card">
              <h3>Kullanıcıya özel demo verisi</h3>
              <p>{userData.note}</p>
              <p>
                Veri sahibi: <strong>{userData.ownerEmail}</strong>
              </p>
              <p>Eklenen kayıt sayısı: {userData.items.length}</p>

              <ul>
                {userData.items.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>

              <button type="button" onClick={addDemoItem}>
                Demo kaydı ekle
              </button>
            </div>

            <p className="muted">
              Oturum süresi bu demoda 60 saniyedir.
            </p>

            <button
              type="button"
              className="secondary"
              onClick={expireSession}
            >
              Oturum süresini dolmuş gibi göster
            </button>

            <button
              type="button"
              className="danger"
              onClick={logout}
            >
              Çıkış yap
            </button>
          </section>
        )}

        {status === "expired" && (
          <section aria-labelledby="expired-heading">
            <h2 id="expired-heading">Oturum süresi doldu</h2>
            <p role="alert" className="error">
              {message || "Oturum süreniz doldu. Lütfen yeniden giriş yapın."}
            </p>
            <p>
              Önceki oturuma ait kullanıcı verileri temizlendi.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("login");
                setMessage("");
                setForm(INITIAL_FORM);
              }}
            >
              Giriş ekranına dön
            </button>
          </section>
        )}
      </section>
    </main>
  );
}
