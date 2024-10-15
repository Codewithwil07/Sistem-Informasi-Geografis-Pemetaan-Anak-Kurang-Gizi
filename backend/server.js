import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const app = express();
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const corsOption = {
  origin: 'http://localhost:5173',
  allowedHeaders: 'Content-Type, Authorization',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
};

app.use(
  session({
    name: 'session',
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    },
  })
);

app.use(cors(corsOption));

const prisma = new PrismaClient();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const checkAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.status(401).send({ msg: 'Not authenticated' });
};

app.get('/api/checkAuth', (req, res) => {
  const user = req.session.user;
  try {
    if (user) {
      return res.status(200).send({ msg: 'Authenticated', user: user });
    }
    return res.status(401).send({ msg: 'Not authenticated' });
  } catch (error) {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await prisma.user.findFirst({
      where: { username: username, password: password },
    });

    if (!data) return res.status(401).send({ msg: 'Unauthorized' });

    req.session.regenerate((err) => {
      if (err) res.status(500).send({ msg: 'Invalid to regenerate session' });
    });

    req.session.user = { username: 'admin', password: 'admin' };
    res.status(200).send({ msg: 'Login successful' });
  } catch (error) {
    console.error(error.message);
    res.status(404).send({ msg: 'Login invalid' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ msg: 'Logout failed' });
    }
  });
  res.clearCookie('session');
  res.status(200).send({ msg: 'Logout successful' });
});

// **CREATE** - Menambahkan data laporan gizi
app.post('/api/data/laporan-gizi', checkAuth, async (req, res) => {
  try {
    const {
      kecamatan,
      puskesmas,
      jumlah_balita_ditimbang,
      bb_u_kurang,
      jumlah_balita_diukur_tinggi_badan,
      tb_u_pendek,
      jumlah_balita_diukur_bb_tb,
      bb_tb_gizi_kurang,
      bb_tb_gizi_buruk,
      jumlah_gizi_kurang,
      persen_gizi_kurang,
      jumlah_gizi_buruk,
      persen_gizi_buruk,
      laporan_tanggal,
    } = req.body;

    const newLaporan = await prisma.laporan_status_gizi_balita.create({
      data: {
        kecamatan,
        puskesmas,
        jumlah_balita_ditimbang,
        bb_u_kurang,
        jumlah_balita_diukur_tinggi_badan,
        tb_u_pendek,
        jumlah_balita_diukur_bb_tb,
        bb_tb_gizi_kurang,
        bb_tb_gizi_buruk,
        jumlah_gizi_kurang,
        persen_gizi_kurang,
        jumlah_gizi_buruk,
        persen_gizi_buruk,
        laporan_tanggal: new Date(laporan_tanggal),
      },
    });
    res
      .status(201)
      .json({ message: 'Data created successfully', data: newLaporan });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error creating data' });
  }
});

// **READ** - Mengambil semua data laporan gizi
app.get('/api/data/laporan-gizi', checkAuth, async (req, res) => {
  try {
    const data = await prisma.laporan_status_gizi_balita.findMany();
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

app.get('/api/data/laporan-gizi/id', checkAuth, async (req, res) => {
  try {
    const data = await prisma.laporan_status_gizi_balita(req.params.id);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

// **READ by ID** - Mengambil data laporan gizi berdasarkan ID
app.get('/api/data/laporan-gizi/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.laporan_status_gizi_balita.findUnique({
      where: { id: parseInt(id) },
    });
    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

// **UPDATE** - Mengupdate data laporan gizi berdasarkan ID
app.put('/api/data/laporan-gizi/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  const {
    kecamatan,
    puskesmas,
    jumlah_balita_ditimbang,
    bb_u_kurang,
    jumlah_balita_diukur_tinggi_badan,
    tb_u_pendek,
    jumlah_balita_diukur_bb_tb,
    bb_tb_gizi_kurang,
    bb_tb_gizi_buruk,
    jumlah_gizi_kurang,
    persen_gizi_kurang,
    jumlah_gizi_buruk,
    persen_gizi_buruk,
    laporan_tanggal,
  } = req.body;

  try {
    const updatedLaporan = await prisma.laporan_status_gizi_balita.update({
      where: { id: parseInt(id) },
      data: {
        kecamatan,
        puskesmas,
        jumlah_balita_ditimbang,
        bb_u_kurang,
        jumlah_balita_diukur_tinggi_badan,
        tb_u_pendek,
        jumlah_balita_diukur_bb_tb,
        bb_tb_gizi_kurang,
        bb_tb_gizi_buruk,
        jumlah_gizi_kurang,
        persen_gizi_kurang,
        jumlah_gizi_buruk,
        persen_gizi_buruk,
        laporan_tanggal: new Date(laporan_tanggal),
      },
    });
    res
      .status(200)
      .json({ message: 'Data updated successfully', data: updatedLaporan });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error updating data' });
  }
});

// **DELETE** - Menghapus data laporan gizi berdasarkan ID
app.delete('/api/data/laporan-gizi/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLaporan = await prisma.laporan_status_gizi_balita.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(200)
      .json({ message: 'Data deleted successfully', data: deletedLaporan });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error deleting data' });
  }
});
