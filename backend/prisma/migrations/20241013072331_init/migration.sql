-- CreateTable
CREATE TABLE `laporan_status_gizi_balita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan` VARCHAR(100) NULL,
    `puskesmas` VARCHAR(100) NULL,
    `jumlah_balita_ditimbang` INTEGER NULL,
    `bb_u_kurang` INTEGER NULL,
    `jumlah_balita_diukur_tinggi_badan` INTEGER NULL,
    `tb_u_pendek` INTEGER NULL,
    `jumlah_balita_diukur_bb_tb` INTEGER NULL,
    `bb_tb_gizi_kurang` INTEGER NULL,
    `bb_tb_gizi_buruk` INTEGER NULL,
    `jumlah_gizi_kurang` INTEGER NULL,
    `persen_gizi_kurang` DECIMAL(5, 2) NULL,
    `jumlah_gizi_buruk` INTEGER NULL,
    `persen_gizi_buruk` DECIMAL(5, 2) NULL,
    `laporan_tanggal` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(32) NOT NULL,
    `password` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
