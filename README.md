# GüvenliAkış Lab ️

React ve Vite kullanılarak geliştirilen, web uygulamalarında kimlik doğrulama arayüzü, oturum yönetimi ve kullanıcılar arası veri izolasyonunu incelemeyi amaçlayan eğitim projesi.

##  Projenin Amacı

Bu projenin amacı, web uygulamalarında güvenli kimlik doğrulama ve oturum yönetimi süreçlerinin temelini öğrenmek ve uygulamaktır.

Proje kapsamında:

- E-posta ve parola alanlarının doğrulanması
- Başarılı ve başarısız giriş durumlarının yönetilmesi
- Oturum süresinin dolmasının simüle edilmesi
- Çıkış sırasında kullanıcıya ait uygulama durumunun temizlenmesi
- Kullanıcılar arasında veri sızıntısının önlenmesine yönelik istemci tarafı kontrollerin test edilmesi
- Git ve GitHub ile sürüm kontrolü uygulanması

##  Kullanılan Teknolojiler

- **React:** Kullanıcı arayüzü ve durum yönetimi
- **Vite:** Geliştirme sunucusu ve üretim derlemesi
- **JavaScript:** Uygulama mantığı
- **CSS:** Arayüz tasarımı
- **Vitest:** Otomatik testler
- **Git:** Sürüm kontrolü
- **GitHub:** Kaynak kod ve proje geçmişinin yönetimi
- **Visual Studio Code:** Geliştirme ortamı

##  Proje Yapısı

```text
guvenli-akis-lab/
├── .gitignore
├── README.md
└── web/
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── vite.config.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   └── auth.js
    └── tests/
        └── auth.test.js
```

##  Kurulum

### Gereksinimler

- Node.js (Vite sürümünün desteklediği bir sürüm)
- npm
- Git
- Visual Studio Code

Node.js ve npm kurulumunu doğrulamak için:

```bash
node --version
npm --version
```

Git kurulumunu doğrulamak için:

```bash
git --version
```

### Projeyi çalıştırma

Terminali proje kök dizininde aç:

```bash
cd web
npm install
```

Geliştirme sunucusunu başlat:

```bash
npm run dev
```

Terminalde gösterilen yerel adresi tarayıcıda aç. Vite varsayılan olarak genellikle `http://localhost:5173/` adresini kullanır.

## Demo Kullanıcıları

Bu projede yalnızca arayüz akışını göstermek amacıyla iki yerel test kullanıcısı bulunmaktadır.

| Kullanıcı | E-posta | Demo parolası |
|---|---|---|
| Demo Ayşe | `ayse@example.test` | `DemoAyse123!` |
| Demo Mehmet | `mehmet@example.test` | `DemoMehmet123!` |

**Önemli:** Bu hesaplar ve parolalar yalnızca eğitim amaçlıdır. Gerçek kullanıcı hesapları veya gerçek parolalar kullanılmamalıdır.

## Uygulama Özellikleri

### 1. Giriş ekranı

Kullanıcıdan e-posta ve parola alınır. Giriş öncesinde temel alan doğrulamaları yapılır.

### 2. Giriş doğrulaması

E-posta biçimi ve parola uzunluğu kontrol edilir. Demo kullanıcı bilgileriyle eşleşme sağlanırsa başarılı giriş ekranı gösterilir.

### 3. Genel hata mesajı

Başarısız girişlerde aşağıdaki genel mesaj gösterilir:

`Bu e-posta veya parola hatalı`

Bu yaklaşım, arayüzde bir e-posta adresine ait hesabın bulunup bulunmadığının ayrı bir mesajla açıklanmasını önlemeye yardımcı olur.

### 4. Oturum süresinin dolması

Demo oturumunun süresi 60 saniye olarak belirlenmiştir. Ayrıca test amacıyla oturum süresi manuel olarak dolmuş gibi gösterilebilir.

Oturum süresi dolduğunda kullanıcıya ait uygulama durumu temizlenir ve oturumun sona erdiğini belirten ekran gösterilir.

### 5. Çıkış ve veri izolasyonu

Çıkış sırasında aktif kullanıcı, kullanıcıya ait demo verileri ve oturum zamanlayıcısı temizlenir.

İki farklı demo kullanıcıyla yapılan testlerde birinci kullanıcının geçici verilerinin ikinci kullanıcının ekranında kalmadığı kontrol edilir.

##  Testler

Otomatik testleri çalıştırmak için terminalde `web/` dizininde bulun:

```bash
npm test
```

Üretim derlemesini doğrulamak için:

```bash
npm run build
```

Testler şu konuları kapsar:

- Geçerli ve geçersiz e-posta adresleri
- Parola uzunluğu doğrulaması
- Başarılı demo girişi
- Hatalı girişlerde genel hata mesajı
- Kullanıcı verilerinin birbirinden bağımsız olması

### Manuel test senaryoları

1. Geçersiz e-posta ile giriş yapmayı dene.
2. Yanlış parola ile giriş yapmayı dene.
3. Ayşe hesabıyla giriş yap ve demo kaydı ekle.
4. Çıkış yap ve giriş ekranına döndüğünü doğrula.
5. Mehmet hesabıyla giriş yap.
6. Ayşe'ye ait demo kaydının Mehmet'in ekranında bulunmadığını doğrula.
7. Oturum süresini dolmuş gibi göster ve kullanıcı verilerinin temizlendiğini kontrol et.

## Güvenlik Notları

Bu proje, **gerçek bir kimlik doğrulama sistemi değildir**.

Demo kullanıcıları ve parolaları istemci tarafındaki kaynak kodda bulunur. Bu nedenle kodu inceleyen veya değiştiren biri demo kimlik bilgilerine erişebilir.

Gerçek uygulamalarda:

- Kimlik doğrulama sunucu tarafında gerçekleştirilmelidir.
- İstemci tarafındaki doğrulamalar güvenlik sınırı olarak kabul edilmemelidir.
- Korunan API isteklerinde sunucu tarafı yetkilendirme uygulanmalıdır.
- Oturum geçerliliği ve iptali güvenilir sunucu tarafında yönetilmelidir.
- Hassas bilgiler kaynak koda veya GitHub deposuna eklenmemelidir.
- HTTPS kullanılmalı ve oturum kimlik bilgilerinin saklanması dikkatle tasarlanmalıdır.

Bu proje yalnızca eğitim ve yerel test amacıyla kullanılmalıdır. Üretim ortamında doğrudan kullanılmak üzere tasarlanmamıştır.

## Öğrenme Hedefleri

- React ile form ve ekran durumu yönetimi
- Temel istemci tarafı giriş doğrulaması
- Oturum süresi ve çıkış akışları
- Kullanıcılar arasında geçici uygulama verisinin izolasyonu
- Otomatik test yazımı
- Git ve GitHub ile sürüm kontrolü



