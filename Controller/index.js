var arrNhanVien = [];
var kiemTra = new Validation();

document.querySelector('#btnThemNhanVien').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    console.log('Nhân viên', nhanVien);

    //Lấy giá trị inner của thẻ option được chọn từ thẻ select
    var slChucVu = document.querySelector('#chucVu');
    var viTriOptionChon = slChucVu.selectedIndex; //Lấy ra vị trí thẻ option được chọn từ select
    nhanVien.chucVu = slChucVu[viTriOptionChon].innerHTML;


    //---------------------------------------Validation------------------------------------------------
    var valid = true;

    //--------------------------------------Kiểm tra rỗng-----------------------------------------------
    valid &= kiemTra.kiemTraRong(nhanVien.maNhanVien,'#error_required_maNhanVien', 'Mã nhân viên') &
    kiemTra.kiemTraRong(nhanVien.tenNhanVien,'#error_required_tenNhanVien', 'Tên nhân viên') &
    kiemTra.kiemTraRong(nhanVien.luongCoBan,'#error_required_luongCoBan', 'Lương cơ bản') &
    kiemTra.kiemTraRong(nhanVien.soGioLamTrongThang,'#error_required_soGioLamTrongThang', 'Số giờ làm');
    
    //--------------------------------------Kiểm tra kí tự----------------------------------------------
    valid &= kiemTra.kiemTraChu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien', 'Tên nhân viên');

    //--------------------------------------Kiểm tra số----------------------------------------------
    valid &= kiemTra.kiemTraSo(nhanVien.maNhanVien, '#error_allNumber_maNhanVien', 'Mã nhân viên');

    //--------------------------------------Kiểm tra độ dài----------------------------------------------
    valid &= kiemTra.kiemTraDoDai(nhanVien.maNhanVien, '#error_min_max_length_maNhanVien',4,6,'Mã nhân viên');

    //--------------------------------------Kiểm tra độ dài----------------------------------------------
    valid &=  kiemTra.kiemTraGiaTri(nhanVien.luongCoBan, '#error_min_max_value_luongCoBan',1000000,20000000,'Lương cơ bản') &
    kiemTra.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#error_min_max_value_soGioLamTrongThang',50,150,'Số giờ làm');
    
    
    if(!valid){
        return;
    }

    arrNhanVien.push(nhanVien);
    renderTableNhanVien (arrNhanVien);

    luuStorage();

}


//-------------------------------------------Thêm Nhân Viên-------------------------------------
function renderTableNhanVien (arrNV) {
    var content = '';
    for(var index = 0; index < arrNV.length; index++){
        var nv = arrNV[index];

        //Gọi lại hàn NhanVien để có function
        var nhanVien = new NhanVien();
        nhanVien.maNhanVien = nv.maNhanVien;
        nhanVien.tenNhanVien = nv.tenNhanVien;
        nhanVien.heSoChucVu = nv.heSoChucVu;
        nhanVien.chucVu = nv.chucVu;
        nhanVien.luongCoBan = nv.luongCoBan;
        nhanVien.soGioLamTrongThang = nv.soGioLamTrongThang;

        var trNhanVien = `
        <tr>
            <td>${nhanVien.maNhanVien}</td>
            <td>${nhanVien.tenNhanVien}</td>
            <td>${nhanVien.chucVu}</td> 
            <td>${nhanVien.luongCoBan}</td>
            <td>${nhanVien.tongLuong()}</td>
            <td>${nhanVien.soGioLamTrongThang}</td>
            <td>${nhanVien.xepLoaiNhanVien()}</td>
            <td>
                <button onclick="xoaNhanVien('${nhanVien.maNhanVien}')" class="btn btn-danger">Xóa</button>
                <button onclick="chinhSuaNhanVien('${nhanVien.maNhanVien}')" class="btn btn-primary ml-2">Chỉnh sửa</button>
            </td>
        </tr>
        `;

        content += trNhanVien;
    }

    document.querySelector('#tblBody').innerHTML = content;
}


//-------------------------------------------Xóa Nhân Viên-------------------------------------
function xoaNhanVien (maNVClick) {
    for(var index = arrNhanVien.length -1; index >= 0; index--){
        var nhanVien = arrNhanVien[index];
        if(nhanVien.maNhanVien === maNVClick){
            arrNhanVien.splice(index,1);
        }
    }
    //Tạo lại table NV từ mảng đã xóa
    renderTableNhanVien(arrNhanVien);
}


//-------------------------------------------Chỉnh Sửa Nhân Viên-------------------------------------
function chinhSuaNhanVien (maNhanVienClick) {
    // alert(maNhanVienClick);
    for(var index = 0; index < arrNhanVien.length; index++){
        var nv = arrNhanVien[index];
        if(nv.maNhanVien === maNhanVienClick){
            document.querySelector('#maNhanVien').value = nv.maNhanVien;
            document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
            document.querySelector('#chucVu').value = nv.chucVu;  //
            document.querySelector('#chucVu').value = nv.heSoChucVu;
            document.querySelector('#luongCoBan').value = nv.luongCoBan;
            document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;
        }
    }

    //Khóa nút
    document.querySelector('#btnThemNhanVien').disabled = true;
    document.querySelector('#maNhanVien').disabled = true;
    document.querySelector('#btnCapNhatNhanVien').disabled = false;
}


//-------------------------------------------Cập Nhật Nhân Viên-------------------------------------
document.querySelector('#btnCapNhatNhanVien').onclick = function () {
    //Lấy ngược lại thông tin từ giao diện khi user đã thay đổi
    var nhanVienCapNhat = new NhanVien();

    nhanVienCapNhat.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVienCapNhat.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVienCapNhat.chucVu = document.querySelector('#chucVu').value; //
    nhanVienCapNhat.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVienCapNhat.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVienCapNhat.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    
    //Duyệt mảng tìm NV có mã trùng với NV được cập nhật
    for(var index = 0; index < arrNhanVien.length; index++){
        //Mỗi lần duyệt lấy ra 1 nhân viên
        var nhanVienTrongMang = arrNhanVien[index];
        if(nhanVienTrongMang.maNhanVien === nhanVienCapNhat.maNhanVien){
            nhanVienTrongMang.tenNhanVien = nhanVienCapNhat.tenNhanVien;
            nhanVienTrongMang.chucVu = nhanVienCapNhat.chucVu; //
            nhanVienTrongMang.heSoChucVu = nhanVienCapNhat.heSoChucVu;
            nhanVienTrongMang.luongCoBan = nhanVienCapNhat.luongCoBan;
            nhanVienTrongMang.soGioLamTrongThang = nhanVienCapNhat.soGioLamTrongThang;
        }
    }

    renderTableNhanVien(arrNhanVien);
    console.log('Nhân viên cập nhật', nhanVienCapNhat);

    //Khóa nút
    document.querySelector('#btnThemNhanVien').disabled = false;
    document.querySelector('#maNhanVien').disabled = false;
    document.querySelector('#btnCapNhatNhanVien').disabled = true;

    luuStorage();
}


//-----------------------------------Tạo Local Storage lưu data----------------------------------------
function luuStorage () {
    var stringArrNhanVien = JSON.stringify(arrNhanVien);
    localStorage.setItem('arrNhanVien',stringArrNhanVien);
}


function layStorage () {
    if(localStorage.getItem('arrNhanVien')){
        var stringArrNhanVien = localStorage.getItem('arrNhanVien');
        arrNhanVien = JSON.parse(stringArrNhanVien);

        renderTableNhanVien(arrNhanVien);
    }
}

layStorage();