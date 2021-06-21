function NhanVien () {
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.chucVu = '';
    this.heSoChucVu = '';
    this.luongCoBan = '';
    this.soGioLamTrongThang = '';
    this.tongLuong = function () {
        return this.luongCoBan * this.heSoChucVu;
    }
    this.xepLoaiNhanVien = function () {
        if(Number(this.soGioLamTrongThang > 120)){
            return 'Nhân viên xuất sắc';
        } else if(Number(this.soGioLamTrongThang > 100)){
            return 'Nhân viên giỏi';
        } else if(Number(this.soGioLamTrongThang > 80)){
            return 'Nhân viên khá';
        } else if(Number(this.soGioLamTrongThang > 50)){
            return 'Nhân viên trung bình';
        } else{
            return 'Không xếp loại được';
        }
    }
}