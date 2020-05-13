export const models = {
    kepangkatan: {
        jabatan_funsional: 'text',
        pangkat: 'text',
        golongan: 'text',
        angka_kredit: 'number',
        file_surat_pengantar: 'file',
        file_sk_pengangkatan: 'file',
        file_sp_pendidikan_pengajaran: 'file',
        file_sp_Penelitian: 'file',
        file_sp_pengabdian_masyarakat: 'file',
        file_surat_penunjang_tri_dharma: 'file'
    },
    pendidikan: {
        no_ijazah: 'text',
        kategori_ijazah: 'text',
        nama_instansi_pendidikan: 'text',
        tanggal_ijazah: 'date',
        file_ijazah: 'file',
        file_transkrip: 'file',
    },
    pengabdian: {
        nama_kegiatan: 'text',
        no_surat_tugas: 'text',
        judul_laporan_pkm: 'text',
        file_surat_tugas: 'file',
        file_laporan_pkm: 'file'
    },
    pengajaran: {
        no_surat_mengajar: 'text',
        mata_kuliah: "text",
        tahun_ajaran: 'text',
        file_rps: 'file',
        file_gbpp: 'file',
        file_sap: 'file'
    },
    sertifikasi: {
        nama_kegiatan: 'text',
        no_sertifikat: 'text',
        bidang_kompetensi: 'text',
        jangka_waktu_berlaku: 'number',
        file_sertifikat: 'file',
        file_surat_tugas: 'file'
    }
}