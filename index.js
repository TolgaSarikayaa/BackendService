// Express modülünü projeye dahil ediyoruz
const express = require('express');

// Body-parser ile gelen POST isteklerinin gövdesini (body) isleyebiliyoruz
const bodyParser = require('body-parser');

// Cors: Baska bir cihaz ve uygulamadan gelen isteklere izin vermek icin kullanilir
const cors = require('cors');

// Express uygulamasini olusturuyoruz
const app = express();
app.use(bodyParser.json());  // JSON verilerini islemek icin body parser kullanilir
app.use(cors()); // Cors kullarini ac

// Port numarasini belirtiyoruz
const PORT = 3001;

// Kullanıcıları geçici olarak saklamak için bir dizi (normalde bir veritabanı kullanılır)
const users = [];

// Post istegi icin /login endpointini tanimliyoruz
// Login endpointi
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log(`Giriş denemesi: Kullanici Adi: ${username}, Şifre: ${password}`);

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        console.log(`Giriş Başarili: Kullanici Adi: ${username}, ID: ${user.id}`);
        res.status(200).json({
            message: 'Giriş başarili!',
            user: {
                id: user.id,
                username: user.username
            }
        });
    } else {
        console.log('Geçersiz giriş bilgileri.');
        res.status(401).json({ message: 'Geçersiz giriş bilgileri!' });
    }
});

// Kullanici kaydi icin '/register endpointi
app.post('/register', (req, res) => {
const { username, password } = req.body;

// Gecersiz giris kontrolü
if (!username || !password) {
    return res.status(400).json({ message: 'Kullanici adi ve sifre gerekiyor!' });
}
// Kullanicinin zaten kayitli olup olmadigini kontrol et 
const existingUser = users.find(user => user.name === username);
if (existingUser) {
    return res.status(409).json({ message: 'Bu kullanici adi zaten var!' });
}
const newUser = {
    id: users.length + 1,
    username,
    password
};

users.push(newUser);

console.log(`Yeni kullanici kaydedildi: ${JSON.stringify(newUser)}`);
res.status(201).json({ message: 'Kullanici basariyla kaydedildi!', user: newUser });

});

// Server'ı başlatıyoruz ve belirttiğimiz port numarasında dinliyoruz
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalişiyor...`);
});