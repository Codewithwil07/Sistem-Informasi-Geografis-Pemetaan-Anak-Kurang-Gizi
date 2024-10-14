import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { username } = req.body;
  try {
    const data = await prisma.user.findFirst({
      where: { username: username },
    });
    if (!data) return res.status(404).send({ msg: 'User not found' });

    res.status(200).send({ msg: 'Login successful' });
  } catch (error) {
    console.error(error.message);
    res.status(404).send({ msg: 'Login invalid' });
  }
});

// **CREATE** - Menambahkan data laporan gizi
app.post('/api/data/laporan-gizi', async (req, res) => {
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
app.get('/api/data/laporan-gizi', async (req, res) => {
  try {
    const data = await prisma.laporan_status_gizi_balita.findMany();
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

app.get('/api/data/laporan-gizi/id', async (req, res) => {
  try {
    const data = await prisma.laporan_status_gizi_balita(req.params.id);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

// **READ by ID** - Mengambil data laporan gizi berdasarkan ID
app.get('/api/data/laporan-gizi/:id', async (req, res) => {
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
app.put('/api/data/laporan-gizi/:id', async (req, res) => {
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
app.delete('/api/data/laporan-gizi/:id', async (req, res) => {
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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
