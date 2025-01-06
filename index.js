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

// Post istegi icin /login endpointini tanimliyoruz
app.post('/login', (req, res) => {

    // Gelen istekteki kullanici adi ve sifreyi aliyoruz
    const { username, password } = req.body;

    // Terminalde bu bilgileri görmek için yazdırıyoruz
    //console.log(`Kullanici Adi: ${username}, Şifre: ${password}`);

     // Basit bir doğrulama işlemi yapıyoruz
     if (username === 'Test' && password === '12345') {
        console.log(`Giriş Başarili: Kullanici Adi: ${username}, ID: 1`);
        res.status(200).json({ 
            message: 'Giriş başarili!',
            user: {
                id: 1,
                name: 'Tolga Sarikaya',
            }
        });
     } else {
        res.status(401).json({ message: 'Gecersiz giris bilgileri' });
     }

});

// Server'ı başlatıyoruz ve belirttiğimiz port numarasında dinliyoruz
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalişiyor...`);
});