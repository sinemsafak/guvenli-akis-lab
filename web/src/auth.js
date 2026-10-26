
export const SESSION_DURATION_MS = 60_000;

const DEMO_USERS = [
  {
    email: "ayse@example.test",
    password: "DemoAyse123!",
    displayName: "Demo Ayşe",
    demoNote: "Bu kayıt yalnızca Ayşe demo kullanıcısına aittir.",
  },
  {
    email: "mehmet@example.test",
    password: "DemoMehmet123!",
    displayName: "Demo Mehmet",
    demoNote: "Bu kayıt yalnızca Mehmet demo kullanıcısına aittir.",
  },
];

export function validateEmail(email) {
  const normalized = email.trim();

  return (
    normalized.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
  );
}

export function validatePassword(password) {
  return password.length >= 8 && password.length <= 128;
}

export function authenticateDemo(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = DEMO_USERS.find(
    (candidate) =>
      candidate.email.toLowerCase() === normalizedEmail &&
      candidate.password === password,
  );

  if (!user) {
    return {
      ok: false,
      message: "Bu e-posta veya parola hatalı",
    };
  }

  return {
    ok: true,
    user: {
      email: user.email,
      displayName: user.displayName,
    },
  };
}

export function createDemoData(email) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = DEMO_USERS.find(
    (candidate) => candidate.email.toLowerCase() === normalizedEmail,
  );

  if (!user) {
    throw new Error("Bilinmeyen demo kullanıcısı");
  }

  // Her çağrıda yeni nesne üret:
  // önceki kullanıcıya ait mutable state paylaşılmaz.
  return {
    ownerEmail: user.email,
    note: user.demoNote,
    items: [],
  };
}
